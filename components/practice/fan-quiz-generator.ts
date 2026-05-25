/**
 * fan-quiz-generator.ts
 * Dynamically generates scored fan calculation questions for HK Mahjong.
 * Call generateFanQuestion() to get a fresh question each time.
 */

import type { TileFace, SuitedValue, WindValue, DragonValue } from '@/lib/tiles';

/* ─── Types ────────────────────────────────────────────────────────────── */

export type ConditionType = 'default' | 'win' | 'flower' | 'concealed' | 'open';
export interface Condition { label: string; value: string; type: ConditionType; }
export interface FanBreakdownItem { item: string; fan: number; category: 'hand' | 'condition'; }

export interface GeneratedFanQuestion {
  groups: TileFace[][];     // grouped tiles for display
  conditions: Condition[];
  correct: number;          // index into opts
  opts: string[];           // e.g. ['3 fan', '4 fan', '5 fan', '6 fan']
  breakdown: FanBreakdownItem[];
  total: number;
  handType: HandType;
}

/* ─── Suit / wind / dragon helpers ─────────────────────────────────────── */

type Suit3 = 'bamboo' | 'dot' | 'character';
const SUIT3: Suit3[] = ['bamboo', 'dot', 'character'];
const WINDS: WindValue[] = ['east', 'south', 'west', 'north'];
const DRAGONS: DragonValue[] = ['red', 'green', 'white'];

const WIND_LABEL: Record<WindValue, string> = {
  east: 'East', south: 'South', west: 'West', north: 'North',
};
const DRAGON_LABEL: Record<DragonValue, string> = {
  red: 'Red Dragon', green: 'Green Dragon', white: 'White Dragon',
};
const WIND_NUMBER: Record<WindValue, number> = {
  east: 1, south: 2, west: 3, north: 4,
};

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rng(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function suitedTile(suit: Suit3, v: number): TileFace {
  return { suit, value: v as SuitedValue };
}
function windTile(w: WindValue): TileFace { return { suit: 'wind', value: w }; }
function dragonTile(d: DragonValue): TileFace { return { suit: 'dragon', value: d }; }

/* ─── Tile counting helpers ──────────────────────────────────────────────── */

function tileKey(t: TileFace): string {
  return `${t.suit}-${t.value}`;
}

/** Returns true if no tile appears more than 4 times across all melds. */
function blueprintIsValid(melds: Meld[]): boolean {
  const counts = new Map<string, number>();
  for (const meld of melds) {
    for (const tile of meld.tiles) {
      const key = tileKey(tile);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      if ((counts.get(key) ?? 0) > 4) return false;
    }
  }
  return true;
}

/* ─── Meld builders ─────────────────────────────────────────────────────── */

interface Meld { tiles: TileFace[]; type: 'chow' | 'pung' | 'pair'; }

function makeChow(suit: Suit3, start: number): Meld {
  return {
    type: 'chow',
    tiles: [suitedTile(suit, start), suitedTile(suit, start + 1), suitedTile(suit, start + 2)],
  };
}
function makePung(tile: TileFace): Meld {
  return { type: 'pung', tiles: [tile, tile, tile] };
}
function makePair(tile: TileFace): Meld {
  return { type: 'pair', tiles: [tile, tile] };
}

/** Random chow where start ∈ [1,7] */
function randomChow(suit: Suit3): Meld {
  return makeChow(suit, rng(1, 7));
}

/** Random pung of a suited tile */
function randomSuitedPung(suit: Suit3): Meld {
  return makePung(suitedTile(suit, rng(1, 9)));
}

/** Random non-value pair (not a wind/dragon that would score) */
function randomNonValuePair(suit: Suit3): Meld {
  return makePair(suitedTile(suit, rng(1, 9)));
}

/* ─── Hand templates ─────────────────────────────────────────────────────
 *
 * Each template function returns { melds, handType } describing a winning
 * hand structure. Fan is calculated separately from conditions.
 *
 * handType codes used in scoring:
 *   'pinghu'        – all chows, non-value pair
 *   'allPungs'      – all pungs/kongs
 *   'sevenPairs'    – seven pairs
 *   'halfFlush'     – one suit + honors
 *   'fullFlush'     – one suit only
 *   'mixedHand'     – multi-suit, no special pattern (base = 1)
 */

type HandType = 'pinghu' | 'allPungs' | 'allSelfTriplets' | 'halfFlush' | 'fullFlush' | 'mixedHand';

interface HandBlueprint {
  melds: Meld[];
  handType: HandType;
  dragonPungs: DragonValue[];   // which dragons are punged
  windPungs: WindValue[];       // which winds are punged
  hasDragonPair: DragonValue | null;
  hasWindPair: WindValue | null;
}

/* Ping Hu: 4 chows + non-value suited pair, multi-suit */
function buildPingHu(): HandBlueprint {
  const suits = [...SUIT3];
  // 4 chows from 2–3 suits
  const melds: Meld[] = [
    randomChow(pick(suits)),
    randomChow(pick(suits)),
    randomChow(pick(suits)),
    randomChow(pick(suits)),
  ];
  const pairSuit = pick(suits);
  melds.push(randomNonValuePair(pairSuit));
  return { melds, handType: 'pinghu', dragonPungs: [], windPungs: [], hasDragonPair: null, hasWindPair: null };
}

/* All Pungs: 4 pungs + pair */
function buildAllPungs(seatWind: WindValue, roundWind: WindValue): HandBlueprint {
  const dragonPungs: DragonValue[] = [];
  const windPungs: WindValue[] = [];
  const melds: Meld[] = [];

  // 40% no honors | 35% 1 dragon | 15% 1 valuable wind | 10% dragon + wind
  const honorRoll = Math.random();
  if (honorRoll >= 0.4 && honorRoll < 0.75) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
  } else if (honorRoll >= 0.75 && honorRoll < 0.9) {
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  } else if (honorRoll >= 0.9) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  }

  // Fill remaining slots with suited pungs
  const suits = [...SUIT3].sort(() => Math.random() - 0.5);
  while (melds.length < 4) {
    melds.push(randomSuitedPung(suits[melds.length % 3]));
  }
  melds.push(randomNonValuePair(pick(SUIT3)));

  return { melds, handType: 'allPungs', dragonPungs, windPungs, hasDragonPair: null, hasWindPair: null };
}

/* All Self Triplets: 4 concealed pungs + pair — must be concealed, won by self-draw */
function buildAllSelfTriplets(seatWind: WindValue, roundWind: WindValue): HandBlueprint {
  const dragonPungs: DragonValue[] = [];
  const windPungs: WindValue[] = [];
  const melds: Meld[] = [];

  // 35% no honors | 35% 1 dragon | 15% 1 valuable wind | 15% dragon + wind
  const honorRoll = Math.random();
  if (honorRoll >= 0.35 && honorRoll < 0.70) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
  } else if (honorRoll >= 0.70 && honorRoll < 0.85) {
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  } else if (honorRoll >= 0.85) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  }

  const suits = [...SUIT3].sort(() => Math.random() - 0.5);
  while (melds.length < 4) {
    melds.push(randomSuitedPung(suits[melds.length % 3]));
  }
  melds.push(randomNonValuePair(pick(SUIT3)));

  return { melds, handType: 'allSelfTriplets', dragonPungs, windPungs, hasDragonPair: null, hasWindPair: null };
}

/* Half Flush: 1 suit + some honors, mix of chows/pungs */
function buildHalfFlush(seatWind: WindValue, roundWind: WindValue): HandBlueprint {
  const suit = pick(SUIT3);
  const dragonPungs: DragonValue[] = [];
  const windPungs: WindValue[] = [];
  const melds: Meld[] = [];

  // 40% 1 dragon | 25% 1 valuable wind | 20% dragon + wind | 15% no honors
  const honorRoll = Math.random();
  if (honorRoll < 0.4) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
  } else if (honorRoll < 0.65) {
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  } else if (honorRoll < 0.85) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  }
  // else: no honors (15%) — all one suit, no honors → this is a full flush, not half flush

  // Fill rest with chows/pungs of the chosen suit
  while (melds.length < 4) {
    melds.push(Math.random() < 0.5 ? randomChow(suit) : randomSuitedPung(suit));
  }
  melds.push(randomNonValuePair(suit));

  // Only a true half flush if honor tiles are actually present
  const hasHonors = dragonPungs.length > 0 || windPungs.length > 0;
  return { melds, handType: hasHonors ? 'halfFlush' : 'fullFlush', dragonPungs, windPungs, hasDragonPair: null, hasWindPair: null };
}

/* Full Flush (chow): all one suit, all sequences */
function buildFullFlush(): HandBlueprint {
  const suit = pick(SUIT3);
  const melds: Meld[] = [
    randomChow(suit),
    randomChow(suit),
    randomChow(suit),
    randomChow(suit),
    randomNonValuePair(suit),
  ];
  return { melds, handType: 'fullFlush', dragonPungs: [], windPungs: [], hasDragonPair: null, hasWindPair: null };
}

/* Full Flush (pung): all one suit, all triplets — scores Full Flush (7) + All Pungs (3) = 10 */
function buildFullFlushPungs(): HandBlueprint {
  const suit = pick(SUIT3);
  const melds: Meld[] = [
    randomSuitedPung(suit),
    randomSuitedPung(suit),
    randomSuitedPung(suit),
    randomSuitedPung(suit),
    randomNonValuePair(suit),
  ];
  return { melds, handType: 'fullFlush', dragonPungs: [], windPungs: [], hasDragonPair: null, hasWindPair: null };
}

/* Mixed hand: multi-suit, no big pattern — base 1 fan */
function buildMixedHand(seatWind: WindValue, roundWind: WindValue): HandBlueprint {
  const dragonPungs: DragonValue[] = [];
  const windPungs: WindValue[] = [];
  const melds: Meld[] = [];

  // 45% no honors | 30% 1 dragon | 15% 1 valuable wind | 10% dragon + wind
  const honorRoll = Math.random();
  if (honorRoll >= 0.45 && honorRoll < 0.75) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
  } else if (honorRoll >= 0.75 && honorRoll < 0.9) {
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  } else if (honorRoll >= 0.9) {
    const d = pick(DRAGONS);
    dragonPungs.push(d);
    melds.push(makePung(dragonTile(d)));
    const valuableWinds = [...new Set([seatWind, roundWind])];
    const w = pick(valuableWinds);
    windPungs.push(w);
    melds.push(makePung(windTile(w)));
  }

  const suits = [...SUIT3].sort(() => Math.random() - 0.5);
  while (melds.length < 4) {
    melds.push(randomChow(suits[melds.length % 3]));
  }
  melds.push(randomNonValuePair(pick(SUIT3)));

  // All chows + no honors = ping hu
  const handType = dragonPungs.length === 0 && windPungs.length === 0 ? 'pinghu' : 'mixedHand';
  return { melds, handType, dragonPungs, windPungs, hasDragonPair: null, hasWindPair: null };
}

/* ─── Fan calculator ────────────────────────────────────────────────────── */

type WinMethod = 'selfDraw' | 'discard' | 'lastWall';

interface ScoreInput {
  blueprint: HandBlueprint;
  seatWind: WindValue;
  roundWind: WindValue;
  concealed: boolean;
  winMethod: WinMethod;
  flowerCount: number;      // 0 = no flowers; >0 = matching seat flowers
}

interface ScoreResult {
  breakdown: FanBreakdownItem[];
  total: number;
}

function scoreFan(input: ScoreInput): ScoreResult {
  const { blueprint, seatWind, roundWind, concealed, winMethod, flowerCount } = input;
  const breakdown: FanBreakdownItem[] = [];
  let total = 0;

  function add(item: string, fan: number, category: 'hand' | 'condition') {
    breakdown.push({ item, fan, category });
    total += fan;
  }

  const { handType, dragonPungs, windPungs } = blueprint;

  const nonPairMelds = blueprint.melds.filter(m => m.type !== 'pair');
  // True when every non-pair meld is a chow (sequences only)
  const allChows = nonPairMelds.every(m => m.type === 'chow');
  // True when every non-pair meld is a pung/kong (triplets only)
  const allPungMelds = nonPairMelds.every(m => m.type === 'pung');

  /* ── Base hand pattern ── */
  if (handType === 'fullFlush') {
    add('Full Flush (清一色)', 7, 'hand');
    // All-chow pure-suit hand earns Ping Hu on top; all-pung earns All Pungs on top
    if (allChows) add('All Chows / Ping Hu (平胡)', 1, 'hand');
    else if (allPungMelds) add('All Pungs (碰碰胡)', 3, 'hand');
  } else if (handType === 'halfFlush') {
    add('Half Flush (混一色)', 3, 'hand');
  } else if (handType === 'allSelfTriplets') {
    add('All Self Triplets (全刻手)', 9, 'hand');
  } else if (handType === 'allPungs') {
    add('All Pungs (碰碰胡)', 3, 'hand');
  } else if (handType === 'pinghu') {
    add('Ping Hu (平胡)', 1, 'hand');
  }

  /* ── Dragon pungs ── */
  for (const d of dragonPungs) {
    add(`${DRAGON_LABEL[d]} pung`, 1, 'hand');
  }

  /* ── Wind pungs ── */
  for (const w of windPungs) {
    const isRound = w === roundWind;
    const isSeat = w === seatWind;
    const fan = isRound && isSeat ? 2 : 1;
    const tags: string[] = [];
    if (isRound) tags.push('round wind');
    if (isSeat) tags.push('seat wind');
    add(`${WIND_LABEL[w]} wind pung (${tags.join(' & ')})`, fan, 'hand');
  }

  /* ── Concealed bonus ── */
  if (handType === 'allSelfTriplets') {
    // 全刻手 already encodes concealed + self-draw — no separate bonus
    add('Concealed + self-draw (included in 全刻手)', 0, 'condition');
  } else if (concealed && handType !== 'allPungs') {
    // All Pungs (碰碰胡) is an open-meld pattern — a concealed version is
    // All Self Triplets (全刻手), not All Pungs + Concealed.
    add('Concealed', 1, 'condition');
  }

  /* ── Self-draw ── */
  if (handType !== 'allSelfTriplets' && (winMethod === 'selfDraw' || winMethod === 'lastWall')) {
    add('Self-draw', 1, 'condition');
  }

  /* ── Last wall tile ── */
  if (winMethod === 'lastWall') {
    add('Last wall tile', 1, 'condition');
  }

  /* ── Flowers ── */
  if (flowerCount === 0) {
    add('No flowers', 1, 'condition');
  } else {
    for (let i = 0; i < flowerCount; i++) {
      add(`Seat flower (Flower ${WIND_NUMBER[seatWind]})`, 1, 'condition');
    }
  }

  return { breakdown, total };
}

/* ─── Condition builder ─────────────────────────────────────────────────── */

function buildConditions(
  seatWind: WindValue,
  roundWind: WindValue,
  concealed: boolean,
  winMethod: WinMethod,
  flowerCount: number,
  seatWindNumber: number,
): Condition[] {
  const conds: Condition[] = [
    { label: 'Seat', value: WIND_LABEL[seatWind], type: 'default' },
    { label: 'Round', value: WIND_LABEL[roundWind], type: 'default' },
    { label: 'Hand', value: concealed ? 'Concealed' : 'Open', type: concealed ? 'concealed' : 'open' },
  ];

  if (winMethod === 'selfDraw') {
    conds.push({ label: 'Win', value: 'Self-draw', type: 'win' });
  } else if (winMethod === 'lastWall') {
    conds.push({ label: 'Win', value: 'Self-draw — last wall tile', type: 'win' });
  } else {
    conds.push({ label: 'Win', value: 'Discard from others', type: 'win' });
  }

  if (flowerCount === 0) {
    conds.push({ label: 'Flowers', value: 'None', type: 'default' });
  } else {
    conds.push({
      label: 'Flowers',
      value: `Flower ${seatWindNumber} — seat flower`,
      type: 'flower',
    });
  }

  return conds;
}

/* ─── Options builder ───────────────────────────────────────────────────── */

function buildOptions(total: number): { opts: string[]; correct: number } {
  // Create a set of 4 plausible options centred near the correct answer
  const offsets = [-2, -1, 1, 2].sort(() => Math.random() - 0.5);
  const distractors = new Set<number>();
  for (const off of offsets) {
    const v = total + off;
    if (v > 0 && !distractors.has(v)) distractors.add(v);
    if (distractors.size === 3) break;
  }
  // Fallback
  for (let off = 3; distractors.size < 3; off++) {
    const v = total + off;
    if (v > 0 && !distractors.has(v)) distractors.add(v);
    const u = total - off;
    if (u > 0 && !distractors.has(u) && distractors.size < 3) distractors.add(u);
  }

  const all = [total, ...distractors].sort((a, b) => a - b);
  const opts = all.map(n => `${n} faan`);
  const correct = all.indexOf(total);
  return { opts, correct };
}

/* ─── Main generator ────────────────────────────────────────────────────── */

export function generateFanQuestion(excludeHandType?: HandType): GeneratedFanQuestion {
  for (let attempt = 0; attempt < 50; attempt++) {
    const seatWind  = pick(WINDS);
    const roundWind = pick(WINDS);
    const concealed = Math.random() < 0.35;  // 35% concealed, 65% open
    const winRoll   = Math.random();
    // lastWall is self-draw on the last tile — valid for both open and concealed
    const winMethod: WinMethod = winRoll < 0.35 ? 'selfDraw' : winRoll < 0.45 ? 'lastWall' : 'discard';

    // Flowers: 70% chance of no flowers, 30% seat flower
    const flowerCount = Math.random() < 0.7 ? 0 : 1;

    // Pick a hand template
    // Open hands: only patterns worth playing open (allPungs, halfFlush, fullFlush)
    // Concealed hands: all patterns including pinghu, mixedHand, allSelfTriplets
    const templateRoll = Math.random();
    let blueprint: HandBlueprint;
    if (!concealed) {
      // Open hands: allPungs 15% | halfFlush 33% | fullFlush(chow) 22% | fullFlush(pung) 13% | pinghu 12% | mixedHand 5%
      if (templateRoll < 0.15) {
        blueprint = buildAllPungs(seatWind, roundWind);
      } else if (templateRoll < 0.48) {
        blueprint = buildHalfFlush(seatWind, roundWind);
      } else if (templateRoll < 0.70) {
        blueprint = buildFullFlush();
      } else if (templateRoll < 0.83) {
        blueprint = buildFullFlushPungs();
      } else if (templateRoll < 0.95) {
        blueprint = buildPingHu();
      } else {
        blueprint = buildMixedHand(seatWind, roundWind);
      }
    } else {
      // Concealed: allSelfTriplets 15% | pinghu 30% | halfFlush 20% | fullFlush 18% | mixed 17%
      // (No allPungs for concealed — a concealed all-pung hand is always allSelfTriplets)
      if (templateRoll < 0.15) {
        blueprint = buildAllSelfTriplets(seatWind, roundWind);
      } else if (templateRoll < 0.45) {
        blueprint = buildPingHu();
      } else if (templateRoll < 0.65) {
        blueprint = buildHalfFlush(seatWind, roundWind);
      } else if (templateRoll < 0.83) {
        blueprint = buildFullFlush();
      } else {
        blueprint = buildMixedHand(seatWind, roundWind);
      }
    }

    // Reject any blueprint where a tile appears more than 4 times (impossible hand)
    if (!blueprintIsValid(blueprint.melds)) continue;

    // All Self Triplets must be won by self-draw — the concealed pungs are built up in hand
    const effectiveWinMethod: WinMethod = blueprint.handType === 'allSelfTriplets' ? 'selfDraw' : winMethod;

    const { breakdown, total } = scoreFan({
      blueprint, seatWind, roundWind, concealed, winMethod: effectiveWinMethod, flowerCount,
    });

    // Skip degenerate hands: must have at least 1 faan and at least one scored item
    if (total < 1 || total > 13) continue;
    if (breakdown.length === 0) continue;
    if (excludeHandType && blueprint.handType === excludeHandType) continue;

    const conditions = buildConditions(
      seatWind, roundWind, concealed, effectiveWinMethod, flowerCount, WIND_NUMBER[seatWind],
    );

    const { opts, correct } = buildOptions(total);

    const groups = blueprint.melds.map(m => m.tiles);

    return { groups, conditions, correct, opts, breakdown, total, handType: blueprint.handType };
  }

  // Absolute fallback: simple Ping Hu self-draw no flowers
  return generateFanQuestion(excludeHandType);
}
