'use client';

import { useState, useCallback } from 'react';
import type { GameSeat } from './data/types';

// ─── Tile definitions ──────────────────────────────────────────────────────────
const STANDARD_TILES = [
  '1b','2b','3b','4b','5b','6b','7b','8b','9b',
  '1d','2d','3d','4d','5d','6d','7d','8d','9d',
  '1c','2c','3c','4c','5c','6c','7c','8c','9c',
  'EW','SW','WW','NW','RD','GD','WD',
];
const BONUS_TILES = ['F1','F2','F3','F4','S1','S2','S3','S4'];

const TURN_ORDER: GameSeat[] = ['East','South','West','North'];

// ─── Types ─────────────────────────────────────────────────────────────────────
export type GamePhase =
  | 'setup'
  | 'discard'
  | 'draw'
  | 'claim'
  | 'win';

export interface ClaimOption {
  player: GameSeat;
  type: 'pung' | 'chow' | 'win';
  meld: string[];
}

interface GameState {
  phase: GamePhase;
  turn: GameSeat;
  hands: Record<GameSeat, string[]>;
  exposed: Record<GameSeat, string[][]>;
  discards: Record<GameSeat, string[]>;
  bonus: Record<GameSeat, string[]>;
  wall: string[];
  drawnTile: string | null;
  lastDiscard: { tile: string; by: GameSeat } | null;
  pendingClaims: ClaimOption[];
  winner: GameSeat | null;
  winFan: number | null;
  winBy: 'self-draw' | 'discard' | null;
  log: string[];
}

export interface InteractiveGameReturn {
  phase: GamePhase;
  turn: GameSeat;
  hands: Record<GameSeat, string[]>;
  exposed: Record<GameSeat, string[][]>;
  discards: Record<GameSeat, string[]>;
  bonus: Record<GameSeat, string[]>;
  wallRemaining: number;
  drawnTile: string | null;
  lastDiscard: { tile: string; by: GameSeat } | null;
  pendingClaims: ClaimOption[];
  winner: GameSeat | null;
  winFan: number | null;
  winBy: 'self-draw' | 'discard' | null;
  log: string[];
  drawTile: () => void;
  discardTile: (tile: string) => void;
  acceptClaim: (option: ClaimOption) => void;
  rejectClaim: () => void;
  reset: () => void;
}

// ─── Shuffle ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Tile helpers ─────────────────────────────────────────────────────────────
function isBonus(tile: string): boolean {
  return BONUS_TILES.includes(tile);
}

function getSuit(tile: string): string {
  return tile.slice(-1);
}

function getValue(tile: string): number {
  return parseInt(tile);
}

function isHonor(tile: string): boolean {
  const suit = getSuit(tile);
  return !['b','d','c'].includes(suit);
}

// ─── Claim detection ──────────────────────────────────────────────────────────
function canPung(hand: string[], tile: string): boolean {
  return hand.filter(t => t === tile).length >= 2;
}

function canChow(hand: string[], tile: string): boolean {
  if (isHonor(tile)) return false;
  const suit = getSuit(tile);
  const val = getValue(tile);

  // All three possible chow patterns that include this tile
  const patterns = [
    [val - 2, val - 1, val],
    [val - 1, val, val + 1],
    [val, val + 1, val + 2],
  ];

  return patterns.some(([a, b, c]) => {
    if (a < 1 || c > 9) return false;
    const need1 = `${a}${suit}`;
    const need2 = `${b}${suit}`;
    const need3 = `${c}${suit}`;
    // tile is one of these — remove it and check the other two
    const others = [need1, need2, need3].filter(t => t !== tile);
    // handle case where tile appears in the pattern at position val
    // we need to find the other two
    const handCopy = [...hand];
    return others.every(need => {
      const idx = handCopy.indexOf(need);
      if (idx === -1) return false;
      handCopy.splice(idx, 1);
      return true;
    });
  });
}

function bestChowMeld(hand: string[], tile: string): string[] {
  if (isHonor(tile)) return [];
  const suit = getSuit(tile);
  const val = getValue(tile);

  const patterns = [
    [val - 2, val - 1, val],
    [val - 1, val, val + 1],
    [val, val + 1, val + 2],
  ];

  for (const [a, b, c] of patterns) {
    if (a < 1 || c > 9) continue;
    const need1 = `${a}${suit}`;
    const need2 = `${b}${suit}`;
    const need3 = `${c}${suit}`;
    const others = [need1, need2, need3].filter(t => t !== tile);
    const handCopy = [...hand];
    const found = others.every(need => {
      const idx = handCopy.indexOf(need);
      if (idx === -1) return false;
      handCopy.splice(idx, 1);
      return true;
    });
    if (found) return [need1, need2, need3];
  }
  return [];
}

// ─── Win detection ────────────────────────────────────────────────────────────
function isSevenPairs(hand: string[]): boolean {
  if (hand.length !== 14) return false;
  const counts: Record<string, number> = {};
  for (const t of hand) counts[t] = (counts[t] || 0) + 1;
  return Object.values(counts).every(n => n === 2) && Object.keys(counts).length === 7;
}

function tryDecompose(tiles: string[], setsNeeded: number, pairsFound: number): boolean {
  if (tiles.length === 0) return pairsFound === 1 && setsNeeded === 0;
  if (setsNeeded < 0 || pairsFound > 1) return false;

  const tile = tiles[0];

  // Try as pair
  if (pairsFound === 0) {
    const idx = tiles.indexOf(tile, 1);
    if (idx !== -1) {
      const next = tiles.filter((_, i) => i !== 0 && i !== idx);
      if (tryDecompose(next, setsNeeded, 1)) return true;
    }
  }

  // Try as pung
  const count = tiles.filter(t => t === tile).length;
  if (count >= 3) {
    let removed = 0;
    const next = tiles.filter(t => {
      if (t === tile && removed < 3) { removed++; return false; }
      return true;
    });
    if (tryDecompose(next, setsNeeded - 1, pairsFound)) return true;
  }

  // Try as chow
  if (!isHonor(tile)) {
    const suit = getSuit(tile);
    const val = getValue(tile);
    const t2 = `${val + 1}${suit}`, t3 = `${val + 2}${suit}`;
    const i2 = tiles.indexOf(t2), i3 = tiles.indexOf(t3);
    if (i2 !== -1 && i3 !== -1) {
      const next = tiles.filter((_, i) => i !== 0 && i !== i2 && i !== i3);
      if (tryDecompose(next, setsNeeded - 1, pairsFound)) return true;
    }
  }

  return false;
}

function isWinningHand(hand: string[], exposed: string[][]): boolean {
  const totalTiles = hand.length + exposed.flat().length;
  if (totalTiles !== 14) return false;

  if (isSevenPairs(hand) && exposed.length === 0) return true;

  const setsNeeded = 4 - exposed.length;
  return tryDecompose([...hand], setsNeeded, 0);
}

// ─── Fan calculation ──────────────────────────────────────────────────────────
function getPungedSets(hand: string[], exposed: string[][]): string[] {
  const allPungs: string[] = [];

  for (const meld of exposed) {
    if (meld.length === 3 && meld[0] === meld[1] && meld[1] === meld[2]) {
      allPungs.push(meld[0]);
    }
  }

  const counts: Record<string, number> = {};
  for (const t of hand) counts[t] = (counts[t] || 0) + 1;
  for (const [tile, n] of Object.entries(counts)) {
    if (n >= 3) allPungs.push(tile);
  }

  return allPungs;
}

function isHalfFlush(hand: string[], exposed: string[][]): boolean {
  const allTiles = [...hand, ...exposed.flat()];
  const suits = new Set(allTiles.map(t => isHonor(t) ? 'honor' : getSuit(t)));
  const suitTiles = [...suits].filter(s => s !== 'honor');
  return suitTiles.length === 1 && suits.has('honor');
}

function isFullFlush(hand: string[], exposed: string[][]): boolean {
  const allTiles = [...hand, ...exposed.flat()];
  const suits = new Set(allTiles.map(t => getSuit(t)));
  return suits.size === 1 && !suits.has('honor');
}

function isAllPungs(hand: string[], exposed: string[][]): boolean {
  const exposedChows = exposed.filter(m => m.length === 3 && !(m[0] === m[1] && m[1] === m[2]));
  if (exposedChows.length > 0) return false;
  const exposedPungs = exposed.filter(m => m.length === 3 && m[0] === m[1] && m[1] === m[2]);

  const counts: Record<string, number> = {};
  for (const t of hand) counts[t] = (counts[t] || 0) + 1;
  const pungs = Object.values(counts).filter(n => n >= 3).length;
  const pairs = Object.values(counts).filter(n => n === 2).length;
  return (pungs + exposedPungs.length === 4) && pairs >= 1;
}

interface FanConditions {
  seat: GameSeat;
  winBy: 'self-draw' | 'discard';
  bonus: string[];
}

function calculateFan(hand: string[], exposed: string[][], conditions: FanConditions): { total: number; sources: { item: string; fan: number }[] } {
  const sources: { item: string; fan: number }[] = [];

  // Seven pairs
  if (isSevenPairs(hand) && exposed.length === 0) {
    sources.push({ item: 'Seven Pairs (七對)', fan: 4 });
    if (conditions.winBy === 'self-draw') sources.push({ item: 'Self-draw (自摸)', fan: 1 });
    return { total: sources.reduce((s, x) => s + x.fan, 0), sources };
  }

  // Flush patterns
  if (isFullFlush(hand, exposed)) {
    sources.push({ item: 'Full Flush (清一色)', fan: 7 });
  } else if (isHalfFlush(hand, exposed)) {
    sources.push({ item: 'Half Flush (混一色)', fan: 3 });
  }

  // All pungs
  if (isAllPungs(hand, exposed)) {
    sources.push({ item: 'All Pungs (碰碰和)', fan: 3 });
  }

  // Dragon pungs
  const pungs = getPungedSets(hand, exposed);
  const dragonNames: Record<string, string> = { RD: 'Red Dragon (中)', GD: 'Green Dragon (發)', WD: 'White Dragon (白板)' };
  for (const tile of ['RD','GD','WD']) {
    if (pungs.includes(tile)) {
      sources.push({ item: `${dragonNames[tile]} pung`, fan: 1 });
    }
  }

  // Wind pungs
  const seatWindMap: Record<GameSeat, string> = { East: 'EW', South: 'SW', West: 'WW', North: 'NW' };
  const seatWindTile = seatWindMap[conditions.seat];
  const windNames: Record<string, string> = { EW: 'East Wind', SW: 'South Wind', WW: 'West Wind', NW: 'North Wind' };
  for (const tile of ['EW','SW','WW','NW']) {
    if (pungs.includes(tile)) {
      let windFan = 0;
      if (tile === seatWindTile) windFan += 1;
      // East round wind is EW
      if (tile === 'EW') windFan += 1;
      if (windFan > 0) {
        const reasons: string[] = [];
        if (tile === seatWindTile) reasons.push('seat wind');
        if (tile === 'EW') reasons.push('round wind');
        sources.push({ item: `${windNames[tile]} pung (${reasons.join(' + ')})`, fan: windFan });
      }
    }
  }

  // Self-draw
  if (conditions.winBy === 'self-draw') {
    sources.push({ item: 'Self-draw (自摸)', fan: 1 });
  }

  // Bonus tiles
  const seatIndex: Record<GameSeat, number> = { East: 1, South: 2, West: 3, North: 4 };
  const idx = seatIndex[conditions.seat];
  const bonusTiles = conditions.bonus || [];
  if (bonusTiles.includes(`F${idx}`)) sources.push({ item: `Flower F${idx} (seat match)`, fan: 1 });
  if (bonusTiles.includes(`S${idx}`)) sources.push({ item: `Season S${idx} (seat match)`, fan: 1 });
  if (['F1','F2','F3','F4'].every(f => bonusTiles.includes(f))) sources.push({ item: 'All 4 flowers', fan: 1 });
  if (['S1','S2','S3','S4'].every(s => bonusTiles.includes(s))) sources.push({ item: 'All 4 seasons', fan: 1 });

  const total = sources.reduce((s, x) => s + x.fan, 0);
  return { total, sources };
}

function removeFromHand(hand: string[], tile: string): string[] {
  const idx = hand.indexOf(tile);
  if (idx === -1) return hand;
  return [...hand.slice(0, idx), ...hand.slice(idx + 1)];
}

// ─── Initial state builder ────────────────────────────────────────────────────
function buildInitialState(startingHands: Record<GameSeat, string[]>): GameState {
  // Build wall from all tiles minus starting hands
  const fullWall = shuffle(
    STANDARD_TILES.flatMap(t => [t, t, t, t]).concat(BONUS_TILES)
  );

  // Remove tiles in starting hands from wall
  const usedTiles: string[] = Object.values(startingHands).flat();
  const wall: string[] = [];
  const usedCopy = [...usedTiles];
  for (const tile of fullWall) {
    const idx = usedCopy.indexOf(tile);
    if (idx !== -1) {
      usedCopy.splice(idx, 1);
    } else {
      wall.push(tile);
    }
  }

  const emptyRecord = (): Record<GameSeat, string[]> => ({
    East: [], South: [], West: [], North: [],
  });

  return {
    phase: 'setup',
    turn: 'East',
    hands: {
      East: [...startingHands.East],
      South: [...startingHands.South],
      West: [...startingHands.West],
      North: [...startingHands.North],
    },
    exposed: { East: [], South: [], West: [], North: [] },
    discards: emptyRecord(),
    bonus: emptyRecord(),
    wall,
    drawnTile: null,
    lastDiscard: null,
    pendingClaims: [],
    winner: null,
    winFan: null,
    winBy: null,
    log: ['Game ready — East has 14 tiles and discards first'],
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useInteractiveGame(
  startingHands: Record<GameSeat, string[]>
): InteractiveGameReturn {
  const [state, setState] = useState<GameState>(() => buildInitialState(startingHands));

  const addLog = (s: GameState, msg: string): string[] =>
    [msg, ...s.log].slice(0, 50);

  // ── Start game: Setup → Discard ──────────────────────────────────────────
  // This is implicitly triggered by calling discardTile in setup phase.
  // We expose a special "startGame" path via the phase transition.

  // ── Draw tile ────────────────────────────────────────────────────────────
  const drawTile = useCallback(() => {
    setState(s => {
      if (s.phase !== 'draw') return s;
      if (s.wall.length === 0) return { ...s, log: addLog(s, 'Wall is empty — game over') };

      const [drawn, ...remainingWall] = s.wall;

      // Bonus tile: auto-draw replacement
      if (isBonus(drawn)) {
        // Keep drawing until non-bonus
        let tile = drawn;
        let wall = remainingWall;
        const newBonus = [...s.bonus[s.turn]];
        while (isBonus(tile) && wall.length > 0) {
          newBonus.push(tile);
          [tile, ...wall] = wall;
        }
        const newBonus2 = { ...s.bonus, [s.turn]: newBonus };
        const newLog = addLog(s, `${s.turn} draws bonus ${drawn}, replaces with ${tile}`);

        // Check self-draw win after bonus replacement
        const newHand = [...s.hands[s.turn], tile];
        const winResult = checkWinState(newHand, s.exposed[s.turn], s.turn, 'self-draw', newBonus2[s.turn]);
        if (winResult) {
          return {
            ...s,
            phase: 'win',
            hands: { ...s.hands, [s.turn]: newHand },
            bonus: newBonus2,
            wall,
            drawnTile: tile,
            winner: s.turn,
            winFan: winResult.total,
            winBy: 'self-draw',
            log: addLog({ ...s, log: newLog }, `${s.turn} wins by self-draw! ${winResult.total} fan`),
          };
        }

        return {
          ...s,
          phase: 'discard',
          hands: { ...s.hands, [s.turn]: newHand },
          bonus: newBonus2,
          wall,
          drawnTile: tile,
          log: newLog,
        };
      }

      const newHand = [...s.hands[s.turn], drawn];

      // Check self-draw win
      const winResult = checkWinState(newHand, s.exposed[s.turn], s.turn, 'self-draw', s.bonus[s.turn]);
      if (winResult) {
        return {
          ...s,
          phase: 'win',
          hands: { ...s.hands, [s.turn]: newHand },
          wall: remainingWall,
          drawnTile: drawn,
          winner: s.turn,
          winFan: winResult.total,
          winBy: 'self-draw',
          log: addLog(s, `${s.turn} draws ${drawn} and wins by self-draw! ${winResult.total} fan`),
        };
      }

      return {
        ...s,
        phase: 'discard',
        hands: { ...s.hands, [s.turn]: newHand },
        wall: remainingWall,
        drawnTile: drawn,
        log: addLog(s, `${s.turn} draws ${drawn}`),
      };
    });
  }, []);

  // ── Discard tile ─────────────────────────────────────────────────────────
  const discardTile = useCallback((tile: string) => {
    setState(s => {
      const validPhase = s.phase === 'discard' || s.phase === 'setup';
      if (!validPhase) return s;

      const currentHand = s.hands[s.turn];
      if (!currentHand.includes(tile)) return s;

      // Remove one copy of tile from hand
      const newHand = removeFromHand(currentHand, tile);
      const newDiscards = {
        ...s.discards,
        [s.turn]: [...s.discards[s.turn], tile],
      };
      const discarder = s.turn;

      // Find all possible claims from other players
      const otherPlayers = TURN_ORDER.filter(p => p !== discarder);

      // Build claims in priority: pung (all players in turn order after discarder) > chow (next only)
      // But win-check also happens here: any player can win on a discard
      const claimOptions: ClaimOption[] = [];

      // Check win claims first — any player with a complete hand
      // Then pung, then chow
      // We'll process them sequentially via pendingClaims, win > pung > chow

      // Sort players in turn order starting from the player after the discarder
      const discarderIdx = TURN_ORDER.indexOf(discarder);
      const orderedOthers = [
        TURN_ORDER[(discarderIdx + 1) % 4],
        TURN_ORDER[(discarderIdx + 2) % 4],
        TURN_ORDER[(discarderIdx + 3) % 4],
      ];

      const nextPlayer = TURN_ORDER[(discarderIdx + 1) % 4];

      for (const player of orderedOthers) {
        const pHand = s.hands[player];
        // Win check: if adding the discarded tile completes a winning hand (≥3 fan)
        const testHand = [...pHand, tile];
        const winResult = checkWinState(testHand, s.exposed[player], player, 'discard', s.bonus[player]);
        if (winResult) {
          // Win takes priority — add a win claim so the banner shows "Win!"
          claimOptions.push({ player, type: 'win', meld: [tile] });
        } else if (canPung(pHand, tile)) {
          claimOptions.push({ player, type: 'pung', meld: [tile, tile, tile] });
        }
      }

      // Chow: next player only (already in orderedOthers[0])
      if (canChow(s.hands[nextPlayer], tile)) {
        const meld = bestChowMeld(s.hands[nextPlayer], tile);
        if (meld.length === 3) {
          // Only add chow if not already added as pung
          const alreadyHasPung = claimOptions.some(c => c.player === nextPlayer && c.type === 'pung');
          if (!alreadyHasPung) {
            claimOptions.push({ player: nextPlayer, type: 'chow', meld });
          }
        }
      }

      const newState: GameState = {
        ...s,
        phase: claimOptions.length > 0 ? 'claim' : 'draw',
        hands: { ...s.hands, [s.turn]: newHand },
        discards: newDiscards,
        drawnTile: null,
        lastDiscard: { tile, by: discarder },
        pendingClaims: claimOptions,
        log: addLog(s, `${discarder} discards ${tile}`),
      };

      // If no claims, advance turn to next player
      if (claimOptions.length === 0) {
        const nextIdx = (TURN_ORDER.indexOf(discarder) + 1) % 4;
        newState.turn = TURN_ORDER[nextIdx];
      }

      return newState;
    });
  }, []);

  // ── Accept claim ─────────────────────────────────────────────────────────
  const acceptClaim = useCallback((option: ClaimOption) => {
    setState(s => {
      if (s.phase !== 'claim') return s;
      if (!s.lastDiscard) return s;

      const { tile, by: discarder } = s.lastDiscard;
      const { player, type, meld } = option;
      const claimerHand = s.hands[player];

      // Check if this is a winning discard
      const testHand = [...claimerHand, tile];
      const winResult = checkWinState(testHand, s.exposed[player], player, 'discard', s.bonus[player]);
      if (winResult) {
        return {
          ...s,
          phase: 'win',
          hands: { ...s.hands, [player]: testHand },
          winner: player,
          winFan: winResult.total,
          winBy: 'discard',
          pendingClaims: [],
          log: addLog(s, `${player} claims ${tile} and wins! ${winResult.total} fan`),
        };
      }

      // If this was a 'win' type claim but checkWinState returned null, bail out
      if (type === 'win') return s;

      // Regular claim: remove tiles from hand, add to exposed
      let newHand = [...claimerHand];

      if (type === 'pung') {
        newHand = removeFromHand(removeFromHand(newHand, tile), tile);
      } else {
        // chow: remove the two hand tiles that form meld with discarded tile
        const meldTiles = meld.filter(t => t !== tile);
        for (const t of meldTiles) {
          newHand = removeFromHand(newHand, t);
        }
      }

      const newExposed = [...s.exposed[player], meld];

      const logMsg = `${player} ${type === 'pung' ? 'pungs' : 'chows'} ${tile}`;

      return {
        ...s,
        phase: 'discard',
        turn: player,
        hands: { ...s.hands, [player]: newHand },
        exposed: { ...s.exposed, [player]: newExposed },
        pendingClaims: [],
        log: addLog(s, logMsg),
      };
    });
  }, []);

  // ── Reject claim ─────────────────────────────────────────────────────────
  const rejectClaim = useCallback(() => {
    setState(s => {
      if (s.phase !== 'claim') return s;
      if (!s.lastDiscard) return s;

      const remaining = s.pendingClaims.slice(1);

      if (remaining.length > 0) {
        const next = remaining[0];
        return {
          ...s,
          pendingClaims: remaining,
          log: addLog(s, `${s.pendingClaims[0].player} passes`),
        };
      }

      // All claims passed — advance to draw for next player after discarder
      const discarderIdx = TURN_ORDER.indexOf(s.lastDiscard.by);
      const nextPlayer = TURN_ORDER[(discarderIdx + 1) % 4];

      return {
        ...s,
        phase: 'draw',
        turn: nextPlayer,
        pendingClaims: [],
        log: addLog(s, `${s.pendingClaims[0]?.player ?? 'All'} passes — ${nextPlayer} draws`),
      };
    });
  }, []);

  // ── Reset ────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setState(buildInitialState(startingHands));
  }, [startingHands]);

  return {
    phase: state.phase,
    turn: state.turn,
    hands: state.hands,
    exposed: state.exposed,
    discards: state.discards,
    bonus: state.bonus,
    wallRemaining: state.wall.length,
    drawnTile: state.drawnTile,
    lastDiscard: state.lastDiscard,
    pendingClaims: state.pendingClaims,
    winner: state.winner,
    winFan: state.winFan,
    winBy: state.winBy,
    log: state.log,
    drawTile,
    discardTile,
    acceptClaim,
    rejectClaim,
    reset,
  };
}

// ─── Win check helper ─────────────────────────────────────────────────────────
function checkWinState(
  hand: string[],
  exposed: string[][],
  seat: GameSeat,
  winBy: 'self-draw' | 'discard',
  bonus: string[],
): { total: number; sources: { item: string; fan: number }[] } | null {
  if (!isWinningHand(hand, exposed)) return null;
  const result = calculateFan(hand, exposed, { seat, winBy, bonus });
  if (result.total >= 3) return result;
  return null;
}
