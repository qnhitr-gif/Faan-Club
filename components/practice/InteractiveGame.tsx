'use client';

import React from 'react';
import { t } from './RoundDemo';
import { SuitFace } from '@/components/tile/TileFaces';
import { MahjongMat } from './MahjongMat';
import { useInteractiveGame } from './useInteractiveGame';
import { STEPS } from './data/game-script';
import type { GameSeat } from './data/types';
import type { ClaimOption } from './useInteractiveGame';

// ─── Tile sort ────────────────────────────────────────────────────────────────
const SUIT_ORDER: Record<string, number> = { b: 0, d: 1, c: 2 }
const HONOUR_ORDER: Record<string, number> = { EW: 0, SW: 1, WW: 2, NW: 3, RD: 4, GD: 5, WD: 6 }

function sortTiles(tiles: string[]): string[] {
  return [...tiles].sort((a, b) => {
    const sA = SUIT_ORDER[a.slice(-1)] ?? 3
    const sB = SUIT_ORDER[b.slice(-1)] ?? 3
    if (sA !== sB) return sA - sB
    if (sA === 3) return (HONOUR_ORDER[a] ?? 99) - (HONOUR_ORDER[b] ?? 99)
    return (parseInt(a) || 0) - (parseInt(b) || 0)
  })
}

function sortHandForDisplay(hand: string[], drawnTile: string | null | undefined): string[] {
  if (!drawnTile) return sortTiles(hand)
  // Keep drawn tile at end so its highlight (last-index marker) still works
  const without = [...hand]
  const idx = without.lastIndexOf(drawnTile)
  if (idx !== -1) without.splice(idx, 1)
  return [...sortTiles(without), drawnTile]
}

// ─── Tile rendering ───────────────────────────────────────────────────────────
function HandTile({
  tileStr,
  highlighted,
  clickable,
  onClick,
}: {
  tileStr: string;
  highlighted?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}) {
  const face = t(tileStr);
  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        transform: highlighted ? 'translateY(-5px)' : undefined,
        filter: highlighted ? 'drop-shadow(0 4px 8px rgba(245,158,11,0.7))' : undefined,
        marginLeft: highlighted ? 4 : undefined,
        cursor: clickable ? 'pointer' : 'default',
        transition: 'transform 0.15s, filter 0.15s',
      }}
      className={clickable ? 'hover:opacity-80' : ''}
      title={clickable ? `Discard ${tileStr}` : tileStr}
    >
      <svg width={29} height={40} viewBox="0 0 60 84" aria-hidden
        style={{ width: 29, height: 40, display: 'block' }}>
        <SuitFace face={face} />
      </svg>
    </div>
  );
}

function MeldTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={24} height={33} viewBox="0 0 60 84" aria-hidden
      style={{ width: 24, height: 33, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function DiscardTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={20} height={27} viewBox="0 0 60 84" aria-hidden
      style={{ width: 20, height: 27, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function SmallTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={17} height={23} viewBox="0 0 60 84" aria-hidden
      style={{ width: 17, height: 23, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

// ─── Discard pile ─────────────────────────────────────────────────────────────
const DISCARD_SEED: Record<GameSeat, number> = { East: 3, South: 11, West: 17, North: 7 };

function DiscardPile({ seat, tiles }: { seat: GameSeat; tiles: string[] }) {
  const seed = DISCARD_SEED[seat];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {tiles.map((ts, i) => {
        const rot = ((i * 41 + seed * 13) % 28) - 14;
        const tx  = ((i * 19 + seed *  7) % 10) - 5;
        const ty  = ((i * 29 + seed * 11) %  8) - 4;
        return (
          <div key={i} style={{ flexShrink: 0, transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)` }}>
            <DiscardTile tileStr={ts} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Player area ──────────────────────────────────────────────────────────────
const SEAT_NUMS: Record<GameSeat, number> = { East: 1, South: 2, West: 3, North: 4 };
const PILL_W = 120;

function PlayerArea({
  seat,
  you,
  reverse,
  hand,
  exposed,
  bonus,
  isActive,
  drawnTile,
  clickableHand,
  onDiscardTile,
}: {
  seat: GameSeat;
  you?: boolean;
  reverse?: boolean;
  hand: string[];
  exposed: string[][];
  bonus: string[];
  isActive: boolean;
  drawnTile?: string | null;
  clickableHand?: boolean;
  onDiscardTile?: (tile: string) => void;
}) {
  const pillGlow: React.CSSProperties = isActive
    ? { boxShadow: '0 0 10px rgba(245,158,11,0.8), 0 0 4px rgba(245,158,11,0.5)' }
    : {};

  const pill = (
    <span
      style={{ ...pillGlow, minWidth: PILL_W, display: 'inline-block' }}
      className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
        'border border-brand-green/30 text-secondary'
      } ${isActive ? 'ring-1 ring-amber-400/80' : ''}`}
    >
      <span className="font-medium">P{SEAT_NUMS[seat]}</span>
      {' · '}{seat}
      {seat === 'East' && <span className="ml-1 text-[9px] opacity-70">dealer</span>}
    </span>
  );

  const pillRow = reverse ? (
    <div className="flex items-center gap-1 justify-end">
      {pill}
    </div>
  ) : (
    <div className="flex items-center gap-1">
      {pill}
    </div>
  );

  const handRow = (
    <div style={{ width: PILL_W, overflow: 'visible', display: 'flex', justifyContent: 'center' }}>
      <div className="flex gap-px items-end py-0.5 flex-nowrap">
        {hand.map((ts, i) => {
          const isDrawn = drawnTile != null && i === hand.length - 1 && ts === drawnTile;
          return (
            <HandTile
              key={i}
              tileStr={ts}
              highlighted={isDrawn}
              clickable={clickableHand}
              onClick={() => onDiscardTile?.(ts)}
            />
          );
        })}
      </div>
    </div>
  );

  const meldRow = exposed.length > 0 ? (
    <div style={{ height: 0, overflow: 'visible', alignSelf: reverse ? 'flex-end' : 'flex-start' }}>
      <div style={{ paddingTop: 4 }}>
        <div style={{ width: PILL_W, overflow: 'visible', display: 'flex', justifyContent: 'flex-start' }}>
          <div className="flex gap-1 items-center py-0.5">
            {exposed.map((meld, mi) => (
              <div key={mi} className="flex gap-px border border-brand-green/20 rounded px-0.5 py-0.5">
                {meld.map((ts, ti) => <MeldTile key={ti} tileStr={ts} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  const bonusRow = bonus.length > 0 ? (
    <div className="flex gap-0.5 flex-wrap mt-0.5">
      {bonus.map((b, i) => (
        <span key={i} className="text-[9px] font-medium px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300/40">
          {b}
        </span>
      ))}
    </div>
  ) : null;

  return (
    <div className={`flex flex-col ${reverse ? 'items-end' : 'items-start'}`}>
      <div style={{ marginBottom: 3 }}>{pillRow}</div>
      {handRow}
      {meldRow}
      {bonusRow}
    </div>
  );
}

// ─── Phase banner ─────────────────────────────────────────────────────────────
function PhaseBanner({
  phase,
  turn,
  lastDiscard,
  pendingClaims,
  wallRemaining,
  winner,
  winFan,
  winBy,
  onDrawTile,
  onAcceptClaim,
  onRejectClaim,
  onReset,
  onStart,
}: {
  phase: string;
  turn: GameSeat;
  lastDiscard: { tile: string; by: GameSeat } | null;
  pendingClaims: ClaimOption[];
  wallRemaining: number;
  winner: GameSeat | null;
  winFan: number | null;
  winBy: 'self-draw' | 'discard' | null;
  onDrawTile: () => void;
  onAcceptClaim: (o: ClaimOption) => void;
  onRejectClaim: () => void;
  onReset: () => void;
  onStart: () => void;
}) {
  if (phase === 'setup') {
    return (
      <div className="flex flex-col gap-3 items-start">
        <div className="text-[12px] text-secondary">
          Starting position — East has 14 tiles and discards first. Click any tile in East's hand to begin.
        </div>
        <button
          type="button"
          onClick={onStart}
          className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-[12px] font-semibold hover:bg-brand-greenDeep transition-colors"
        >
          Start Game →
        </button>
        <div className="text-[11px] text-tertiary italic">
          Tip: clicking "Start Game" or any tile in East's hand begins the first discard.
        </div>
      </div>
    );
  }

  if (phase === 'draw') {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[12px] text-primary font-medium">{turn}'s turn to draw</span>
        <span className="text-[11px] text-tertiary">Wall: {wallRemaining} tiles</span>
        <button
          type="button"
          onClick={onDrawTile}
          className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-[12px] font-semibold hover:bg-brand-greenDeep transition-colors"
        >
          Draw Tile
        </button>
      </div>
    );
  }

  if (phase === 'discard') {
    return (
      <div className="text-[12px] text-primary font-medium">
        {turn} — click a tile in your hand to discard it
        <span className="ml-2 text-[11px] font-normal text-tertiary">Wall: {wallRemaining}</span>
      </div>
    );
  }

  if (phase === 'claim' && pendingClaims.length > 0) {
    const claim = pendingClaims[0];
    return (
      <div className="flex flex-col gap-2">
        {lastDiscard && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-secondary">Discarded by {lastDiscard.by}:</span>
            <SmallTile tileStr={lastDiscard.tile} />
            <span className="font-medium text-[12px] text-brand-inkRed">{lastDiscard.tile}</span>
          </div>
        )}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[12px] font-medium text-primary">
            {claim.player}{' '}
            {claim.type === 'win' ? (
              <span className="text-brand-green font-bold">can Win!</span>
            ) : claim.type === 'pung' ? (
              <>can Pung <span className="text-amber-600 dark:text-amber-400">{lastDiscard?.tile}</span> ({claim.meld.join(' ')})</>
            ) : (
              <>can Chow <span className="text-amber-600 dark:text-amber-400">{lastDiscard?.tile}</span> ({claim.meld.join(' ')})</>
            )}
          </span>
          <button
            type="button"
            onClick={() => onAcceptClaim(claim)}
            className={`px-3 py-1.5 rounded-md text-brand-cream text-[11px] font-semibold ${
              claim.type === 'win'
                ? 'bg-brand-inkRed hover:opacity-90'
                : 'bg-brand-green hover:bg-brand-greenDeep'
            }`}
          >
            {claim.type === 'win' ? 'Win! ✓' : 'Claim ✓'}
          </button>
          <button
            type="button"
            onClick={onRejectClaim}
            className="px-3 py-1.5 rounded-md border border-brand-green/30 text-secondary text-[11px] hover:text-primary hover:border-brand-green/60"
          >
            Pass ✗
          </button>
          <span className="text-[10px] text-tertiary">{pendingClaims.length} claim(s) pending</span>
        </div>
      </div>
    );
  }

  if (phase === 'win' && winner) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[14px] font-bold text-brand-green">{winner} wins!</span>
          <span className="px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-green text-[12px] font-semibold">{winFan} fan</span>
          <span className="text-[11px] text-secondary capitalize">{winBy?.replace('-', ' ')}</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="self-start px-3 py-1.5 rounded-md border border-brand-green/40 text-brand-green text-[11px] font-medium hover:bg-brand-green/10"
        >
          Play Again
        </button>
      </div>
    );
  }

  return null;
}

// ─── Log panel ────────────────────────────────────────────────────────────────
function LogPanel({ log }: { log: string[] }) {
  return (
    <div className="flex flex-col min-h-0">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-tertiary mb-1.5">Log</div>
      <div className="flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 180 }}>
        {log.slice(0, 8).map((entry, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded text-[11px] leading-snug ${i === 0 ? 'bg-brand-green/10 text-primary' : 'text-secondary'}`}
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const MAT_OFFSET = 31;
const MAT_SIZE = 305;

export function InteractiveGame() {
  const startingHands = STEPS[0].hands;

  const game = useInteractiveGame(startingHands);

  const {
    phase, turn, hands, exposed, discards, bonus,
    wallRemaining, drawnTile, lastDiscard,
    pendingClaims, winner, winFan, winBy, log,
    drawTile, discardTile, acceptClaim, rejectClaim, reset,
  } = game;

  // Layout: South = bottom (you), West = right, North = top, East = left
  // Matching existing GamePlayer layout with yourSeat = South
  const yourSeat: GameSeat = 'South';
  const SEATS: GameSeat[] = ['East', 'South', 'West', 'North'];
  const yourIdx = SEATS.indexOf(yourSeat);
  const bottomSeat = yourSeat;
  const rightSeat  = SEATS[(yourIdx + 1) % 4] as GameSeat;
  const topSeat    = SEATS[(yourIdx + 2) % 4] as GameSeat;
  const leftSeat   = SEATS[(yourIdx + 3) % 4] as GameSeat;

  function playerAreaProps(seat: GameSeat, you?: boolean, reverse?: boolean) {
    const isActive = turn === seat && (phase === 'discard' || phase === 'draw');
    const showDrawn = drawnTile != null && turn === seat && phase === 'discard';
    const isDiscardPhase = phase === 'discard' || phase === 'setup';
    const clickable = isDiscardPhase && turn === seat;

    return {
      seat,
      you,
      reverse,
      hand: sortHandForDisplay(hands[seat], showDrawn ? drawnTile : null),
      exposed: exposed[seat],
      bonus: bonus[seat],
      isActive,
      drawnTile: showDrawn ? drawnTile : null,
      clickableHand: clickable,
      onDiscardTile: clickable ? discardTile : undefined,
    };
  }

  // "Start game" picks a random tile from East's hand to discard.
  function handleStart() {
    const eastHand = hands['East'];
    if (eastHand.length > 0) {
      const tile = eastHand[Math.floor(Math.random() * eastHand.length)];
      discardTile(tile);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Phase banner */}
      <div className="rounded-lg bg-elev hairline border border-brand-green/20 px-4 py-3">
        <PhaseBanner
          phase={phase}
          turn={turn}
          lastDiscard={lastDiscard}
          pendingClaims={pendingClaims}
          wallRemaining={wallRemaining}
          winner={winner}
          winFan={winFan}
          winBy={winBy}
          onDrawTile={drawTile}
          onAcceptClaim={acceptClaim}
          onRejectClaim={rejectClaim}
          onReset={reset}
          onStart={handleStart}
        />
      </div>

      {/* Table + sidebar */}
      <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start">
        {/* Table */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex flex-col gap-3 items-center" style={{ position: 'relative' }}>
            <div className="grid gap-2" style={{
              gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
              gridTemplateColumns: '80px max-content 80px',
              gridTemplateRows: '80px max-content 80px',
            }}>
              {/* Left player */}
              <div style={{ gridArea: 'tl', marginLeft: '-90px', transform: 'translateY(14px)' }} className="flex flex-col items-start justify-end">
                <PlayerArea {...playerAreaProps(leftSeat, false, false)} />
              </div>
              {/* Top player */}
              <div style={{ gridArea: 'tr', marginRight: '-90px', transform: 'translateY(14px)' }} className="flex flex-col items-end justify-end">
                <PlayerArea {...playerAreaProps(topSeat, false, true)} />
              </div>

              {/* Center mat */}
              <div style={{ gridArea: 'center', position: 'relative' }}>
                <MahjongMat size={367}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ opacity: 0.12, fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', transform: 'rotate(-45deg)' }}>
                      East round
                    </div>
                  </div>
                </MahjongMat>
                <div style={{
                  position: 'absolute', left: MAT_OFFSET, top: MAT_OFFSET,
                  width: MAT_SIZE, height: MAT_SIZE,
                  pointerEvents: 'none',
                }}>
                  <div style={{ position: 'absolute', left: '50%', top: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={topSeat} tiles={discards[topSeat]} />
                  </div>
                  <div style={{ position: 'absolute', top: '50%', left: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={leftSeat} tiles={discards[leftSeat]} />
                  </div>
                  <div style={{ position: 'absolute', top: '50%', right: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={rightSeat} tiles={discards[rightSeat]} />
                  </div>
                  <div style={{ position: 'absolute', left: '50%', bottom: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={bottomSeat} tiles={discards[bottomSeat]} />
                  </div>
                </div>
              </div>

              {/* Bottom player (you) */}
              <div style={{ gridArea: 'bl', marginLeft: '-90px', transform: 'translateY(-40px)' }} className="flex flex-col items-start justify-start">
                <PlayerArea {...playerAreaProps(bottomSeat, true, false)} />
              </div>
              {/* Right player */}
              <div style={{ gridArea: 'br', marginRight: '-90px', transform: 'translateY(-40px)' }} className="flex flex-col items-end justify-start">
                <PlayerArea {...playerAreaProps(rightSeat, false, true)} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: log */}
        <div className="w-full md:w-[180px] shrink-0 md:self-stretch md:relative border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0">
          <div className="md:absolute md:inset-0 md:pl-5 flex flex-col overflow-hidden">
            <LogPanel log={log} />

            {/* Wall indicator */}
            <div className="mt-auto pt-3 border-t border-brand-green/20 text-[11px] text-tertiary flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-sm bg-brand-green/30"></span>
              Wall: {wallRemaining} tiles
            </div>

            {/* Reset button */}
            {phase !== 'setup' && (
              <button
                type="button"
                onClick={reset}
                className="mt-2 text-[10px] text-tertiary hover:text-secondary border border-brand-green/20 rounded px-2 py-1 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Win panel */}
      {phase === 'win' && winner && (
        <div className="rounded-lg bg-brand-green/5 border border-brand-green/30 px-4 py-3 flex flex-col gap-2">
          <div className="text-[13px] font-semibold text-brand-green">{winner} wins with {winFan} fan ({winBy?.replace('-', ' ')})</div>
          <div className="flex gap-1 flex-wrap">
            {hands[winner].map((ts, i) => (
              <span key={i} className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                {ts}
              </span>
            ))}
            {exposed[winner].map((meld, mi) => (
              <span key={`m${mi}`} className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300/40">
                [{meld.join(' ')}]
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
