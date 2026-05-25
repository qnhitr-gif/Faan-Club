'use client';

import React, { useState, useEffect, useRef } from 'react';
import { t } from './RoundDemo';
import { SuitFace } from '@/components/tile/TileFaces';
import { MahjongMat } from './MahjongMat';
import { SeatChip } from './PickSeats';
import type { WindValue } from '@/lib/tiles';
import type { GameStep, GameSeat } from './data/types';

// ─── Tile sort ────────────────────────────────────────────────────────────────
const BONUS_SET = new Set(['F1','F2','F3','F4','S1','S2','S3','S4']);
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
  const playable = hand.filter(t => !BONUS_SET.has(t));
  if (!drawnTile) return sortTiles(playable)
  // Keep drawn tile at end so its highlight (last-index marker) still works
  const without = [...playable]
  const idx = without.lastIndexOf(drawnTile)
  if (idx !== -1) without.splice(idx, 1)
  return [...sortTiles(without), drawnTile]
}

// ─── Types ────────────────────────────────────────────────────────────────────
export type { GameStep, GameSeat };

export interface GamePlayerState {
  step: number;
  steps: GameStep[];
  current: GameStep;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
  reset: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
const isPassStep = (s: GameStep) =>
  s.action === 'claim' && (!s.claimed || s.claimed.meld.length === 0);

export function useGamePlayer(steps: GameStep[]): GamePlayerState {
  const [step, setStep] = useState(0);

  function nextNonPass(from: number, dir: 1 | -1): number {
    let s = from + dir;
    while (s > 0 && s < steps.length - 1 && isPassStep(steps[s])) s += dir;
    return Math.max(0, Math.min(s, steps.length - 1));
  }

  return {
    step,
    steps,
    current: steps[step],
    total: steps.length,
    isFirst: step === 0,
    isLast: step >= steps.length - 1,
    next:  () => setStep(s => nextNonPass(s, 1)),
    prev:  () => setStep(s => nextNonPass(s, -1)),
    reset: () => setStep(0),
  };
}

// ─── Tile SVG components ──────────────────────────────────────────────────────
function HandTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={29} height={40} viewBox="0 0 60 84" aria-hidden
      style={{ width: 29, height: 40, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function MeldTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={26} height={36} viewBox="0 0 60 84" aria-hidden
      style={{ width: 26, height: 36, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function DiscardTile({ tileStr }: { tileStr: string }) {
  const face = t(tileStr);
  return (
    <svg width={22} height={30} viewBox="0 0 60 84" aria-hidden
      style={{ width: 22, height: 30, display: 'block', flexShrink: 0 }}>
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

// ─── Fan badge ────────────────────────────────────────────────────────────────
function FanBadge({ fan }: { fan: number | null }) {
  if (fan === null) return null;
  if (fan === 0) return (
    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-inkRed/15 text-brand-inkRed whitespace-nowrap">
      0 fan
    </span>
  );
  return (
    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-green/15 text-brand-green whitespace-nowrap">
      {fan} fan
    </span>
  );
}

// ─── Player area ──────────────────────────────────────────────────────────────
const SEAT_WIND: Record<GameSeat, WindValue> = { East: 'east', South: 'south', West: 'west', North: 'north' };

function PlayerArea({
  seat, you, reverse, num,
  hand, exposed, bonusTiles,
  fan, isActive, isWarning,
  drawnTile, discardedTile,
}: {
  seat: GameSeat;
  you?: boolean;
  reverse?: boolean;
  num: number;
  hand: string[];
  exposed: string[][];
  bonusTiles: string[];
  fan: number | null;
  isActive: boolean;
  isWarning: boolean;
  drawnTile?: string | null;
  discardedTile?: string | null;
}) {
  const chipFilter: React.CSSProperties = isActive
    ? { filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.8))' }
    : isWarning
    ? { filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }
    : {};

  const chipEl = (
    <div style={chipFilter}>
      <SeatChip wind={SEAT_WIND[seat]} isYou={you ?? false} num={num} />
    </div>
  );

  const fanBadge = <FanBadge fan={fan} />;

  const flowerTiles = bonusTiles.length > 0 ? (
    <div className="flex gap-px items-center">
      {bonusTiles.map((ts, i) => (
        <div key={i} style={{ filter: 'drop-shadow(0 0 2px rgba(200,168,107,0.8))' }}>
          <MeldTile tileStr={ts} />
        </div>
      ))}
    </div>
  ) : null;

  const pillRow = reverse ? (
    <div className="flex items-center gap-1.5 justify-end">
      {fanBadge}
      {flowerTiles}
      {chipEl}
    </div>
  ) : (
    <div className="flex items-center gap-1.5">
      {flowerTiles}
      {chipEl}
      {fanBadge}
    </div>
  );

  const handRow = (
    <div style={{ overflow: 'visible', display: 'flex', justifyContent: reverse ? 'flex-end' : 'flex-start' }}>
      <div className="flex gap-px items-end py-0.5 flex-nowrap">
        {hand.map((ts, i) => {
          const isDrawn     = drawnTile != null && i === hand.length - 1 && ts === drawnTile;
          // Mark the first occurrence of the discarded tile (not the drawn tile) with red glow
          const isDiscarded = discardedTile != null && ts === discardedTile &&
                              !(drawnTile != null && i === hand.length - 1 && ts === drawnTile) &&
                              !hand.slice(0, i).includes(ts);  // first occurrence only
          return isDrawn ? (
            <div key={i} style={{ marginLeft: 6, flexShrink: 0, transform: 'translateY(-5px)', filter: 'drop-shadow(0 4px 8px rgba(245,158,11,0.7))' }}>
              <HandTile tileStr={ts} />
            </div>
          ) : isDiscarded ? (
            <div key={i} style={{ flexShrink: 0, transform: 'translateY(-4px)', filter: 'drop-shadow(0 4px 10px rgba(220,38,38,0.85)) drop-shadow(0 0 3px rgba(220,38,38,0.5))' }}>
              <HandTile tileStr={ts} />
            </div>
          ) : <HandTile key={i} tileStr={ts} />;
        })}
      </div>
    </div>
  );

  const meldRow = exposed.length > 0 ? (
    <div style={{ height: 0, overflow: 'visible', alignSelf: reverse ? 'flex-end' : 'flex-start' }}>
      <div style={{ paddingTop: 5 }}>
        <div style={{ overflow: 'visible', display: 'flex', justifyContent: 'flex-start' }}>
          <div className="flex gap-1 items-center py-0.5">
            {exposed.map((meld, mi) => (
              <div key={mi} className="flex gap-px">
                {meld.map((ts, ti) => <MeldTile key={ti} tileStr={ts} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className={`flex flex-col ${reverse ? 'items-end' : 'items-start'}`}>
      <div style={{ marginBottom: 4 }}>{pillRow}</div>
      {handRow}
      {meldRow}
    </div>
  );
}

// ─── Discard pile ─────────────────────────────────────────────────────────────
const DISCARD_SEED: Record<GameSeat, number> = { East: 3, South: 11, West: 17, North: 7 };

function DiscardPile({ seat, tiles, highlightLast }: { seat: GameSeat; tiles: string[]; highlightLast?: boolean }) {
  const seed = DISCARD_SEED[seat];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {tiles.map((ts, i) => {
        const rot = ((i * 41 + seed * 13) % 28) - 14;
        const tx  = ((i * 19 + seed *  7) % 10) - 5;
        const ty  = ((i * 29 + seed * 11) %  8) - 4;
        const isLatest = highlightLast && i === tiles.length - 1;
        return (
          <div key={i} style={{
            flexShrink: 0,
            transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)`,
            filter: isLatest ? 'drop-shadow(0 0 5px rgba(220,38,38,0.9)) drop-shadow(0 0 2px rgba(220,38,38,0.6))' : undefined,
            zIndex: isLatest ? 10 : undefined,
            position: 'relative',
          }}>
            <DiscardTile tileStr={ts} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Step info panel ──────────────────────────────────────────────────────────
function StepInfo({ current, step, total }: {
  current: GameStep;
  step: number;
  total: number;
}) {
  return (
    <div className="rounded-lg bg-elev border border-brand-green/20 flex flex-col" style={{ maxHeight: 320 }}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 flex flex-col gap-2 min-h-0">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-ui font-medium text-primary text-[13px] leading-snug">{current.headline}</div>
            <div className="text-[11px] text-tertiary mt-0.5">Step {step} of {total - 1}</div>
          </div>
          {/* Tiles drawn/discarded */}
          {(current.drew || current.discarded) && (
            <div className="flex items-center gap-2 shrink-0">
              {current.drew && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-secondary">Drew</span>
                  <SmallTile tileStr={current.drew} />
                </div>
              )}
              {current.discarded && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-secondary">Discarded</span>
                  <SmallTile tileStr={current.discarded} />
                </div>
              )}
            </div>
          )}
          {/* Claim info */}
          {current.claimed && (
            <div className="shrink-0 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded border border-amber-400/30">
              Claimed {current.claimed.tile} from {current.claimed.from}
            </div>
          )}
        </div>


        {/* Strategy badge */}
        {current.strategy && (
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
              Strategy
            </span>
            <span
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: 'rgba(28,74,42,0.08)', color: '#1c4a2a', border: '1px solid rgba(28,74,42,0.18)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
            >
              {current.strategy}
            </span>
          </div>
        )}

        {/* Comment */}
        <p className="text-[11px] text-secondary leading-relaxed">{current.comment}</p>

        {/* Discard reason */}
        {current.discardReason && (
          <div className="flex gap-1.5 items-start">
            <span className="text-tertiary mt-0.5 shrink-0" style={{ fontSize: 10 }}>→</span>
            <p className="text-[11px] text-tertiary leading-relaxed">{current.discardReason}</p>
          </div>
        )}

        {/* Win breakdown */}
        {current.action === 'win' && current.breakdown && (
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-md px-3 py-2 flex flex-col gap-1">
            <div className="text-[11px] font-semibold text-brand-green mb-1">Winning hand breakdown</div>
            {current.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span className="text-secondary">{item.item}</span>
                <span className="font-medium text-primary">+{item.fan}</span>
              </div>
            ))}
            <div className="flex justify-between text-[12px] font-semibold border-t border-brand-green/20 pt-1 mt-1">
              <span className="text-primary">Total</span>
              <span className="text-brand-green">{current.total} fan</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── GameLog sidebar ──────────────────────────────────────────────────────────
function GameLog({ steps, currentStep, isFirst, isLast, onNext, onPrev, onReset, replayLocked }: {
  steps: GameStep[];
  currentStep: number;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  replayLocked?: boolean;
}) {
  const SEAT_SHORT: Record<GameSeat, string> = { East: 'E', South: 'S', West: 'W', North: 'N' };
  const entries = steps
    .slice(0, currentStep + 1)
    .filter(e => !isPassStep(e))
    .map((e, idx) => ({ entry: e, stepNum: idx }));

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-tertiary mb-1.5">Game log</div>
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col-reverse gap-0.5">
        {[...entries].reverse().map(({ entry, stepNum }, i) => {
          const isCurrent = i === 0;
          return (
            <div key={stepNum}
              className={`px-2 py-1.5 rounded text-[11px] leading-snug ${isCurrent ? 'bg-brand-green/10' : ''}`}>
              <div className={`text-[10px] leading-snug ${isCurrent ? 'text-primary' : 'text-secondary'}`}>
                <span className="font-medium text-tertiary">{stepNum} </span>
                {entry.action === 'setup' && <span>Game starts</span>}
                {entry.action === 'draw-discard' && entry.who && (
                  <span>
                    <span className="font-medium">{entry.who}</span>
                    {entry.drew && <> draws <span className="text-brand-green font-medium">{entry.drew}</span></>}
                    {entry.discarded && <> discards <span className="text-brand-inkRed font-medium">{entry.discarded}</span></>}
                  </span>
                )}
                {entry.action === 'claim' && entry.who && entry.claimed && (
                  <span>
                    <span className="font-medium">{entry.who}</span>
                    {' claims '}
                    <span className="text-amber-500 font-medium">{entry.claimed.tile}</span>
                    {entry.discarded && <> discards <span className="text-brand-inkRed font-medium">{entry.discarded}</span></>}
                  </span>
                )}
                {entry.action === 'win' && entry.who && (
                  <span>
                    <span className="font-medium">{entry.who}</span>
                    {' wins · '}
                    <span className="text-brand-green font-semibold">{entry.total} fan</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-2 pt-2 mt-2 border-t border-brand-green/20 shrink-0">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="flex-1 px-2 py-1.5 rounded-md border border-brand-green/30 text-secondary text-[11px] hover:text-primary hover:border-brand-green/60 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={onReset}
            disabled={replayLocked}
            className="flex-1 px-2 py-1.5 rounded-md border border-brand-green/40 text-brand-green text-[11px] font-medium hover:bg-brand-green/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Replay
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 px-2 py-1.5 rounded-md bg-brand-green text-brand-cream text-[11px] font-medium hover:bg-brand-greenDeep"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const MAT_OFFSET = 31;
const MAT_SIZE = 305;

// ─── Win popup ────────────────────────────────────────────────────────────────
function WinPopup({ current, onClose }: { current: GameStep; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-elevated, #fff)',
          border: '1px solid rgba(35,88,54,0.25)',
          borderRadius: 16, padding: '32px 40px', maxWidth: 340, width: '90%',
          textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a', marginBottom: 12 }}>
          Game End
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500, color: '#16170f', marginBottom: 6, lineHeight: 1.1 }}>
          {current.who} wins
        </div>
        {current.total != null && (
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: '#1c4a2a', marginBottom: 20 }}>
            {current.total} fan
            {current.breakdown && (
              <span style={{ color: '#7a7a6a', fontSize: 13, display: 'block', marginTop: 4 }}>
                {current.breakdown.map(b => b.item).join(' · ')}
              </span>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          style={{
            background: '#1c4a2a', color: '#f5f0e8', border: 'none',
            borderRadius: 8, padding: '8px 24px', fontSize: 13,
            fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'pointer',
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export function GamePlayer({
  state,
  yourSeat,
}: {
  state: GamePlayerState;
  yourSeat: GameSeat;
}) {
  const { step, steps, current, total, isFirst, isLast, next, prev, reset } = state;

  // Win popup state
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [replayLocked, setReplayLocked] = useState(false);
  const prevIsLast = useRef(false);

  useEffect(() => {
    if (isLast && !prevIsLast.current) {
      setShowWinPopup(true);
      setReplayLocked(true);
      const t = setTimeout(() => setReplayLocked(false), 2000);
      return () => clearTimeout(t);
    }
    if (!isLast) prevIsLast.current = false;
    if (isLast) prevIsLast.current = true;
  }, [isLast]);
  const { hands, exposed, discards, bonus, fan, who, action } = current;

  // Append the current discard to that player's pile so it shows immediately.
  // Exception: if the tile is still present in the player's hand (discard-highlight step),
  // don't add to the pile yet — it will appear there naturally in the next step.
  function pilesWithCurrent(): Record<GameSeat, string[]> {
    if (current.discarded && who && (action === 'draw-discard' || action === 'claim')) {
      if (action === 'draw-discard' && hands[who]?.includes(current.discarded)) {
        return discards; // tile still in hand — pile unchanged
      }
      return { ...discards, [who]: [...discards[who], current.discarded] };
    }
    return discards;
  }
  const piles = pilesWithCurrent();

  // Seat layout: yourSeat is at bottom
  const SEATS: GameSeat[] = ['East', 'South', 'West', 'North'];
  const yourIdx = SEATS.indexOf(yourSeat);
  const bottomSeat = yourSeat;
  const rightSeat  = SEATS[(yourIdx + 1) % 4];
  const topSeat    = SEATS[(yourIdx + 2) % 4];
  const leftSeat   = SEATS[(yourIdx + 3) % 4];

  function playerAreaProps(seat: GameSeat, num: number, you?: boolean, reverse?: boolean) {
    const isActive = who === seat;
    const isWarning = current.warning && who === seat;
    const drawnTile = (action === 'draw-discard' && isActive && current.drew) ? current.drew : null;
    // Show red glow on the discarded tile while it's still in hand (discard-highlight step)
    const discardedTile = (action === 'draw-discard' && isActive && !current.drew && current.discarded
                           && hands[seat]?.includes(current.discarded))
                          ? current.discarded : null;
    return {
      seat, you, reverse, num,
      hand: sortHandForDisplay(hands[seat], drawnTile),
      exposed: exposed[seat],
      bonusTiles: [
        ...(bonus?.[seat] ?? []),
        ...hands[seat].filter(ts => BONUS_SET.has(ts)),
      ],
      fan: fan[seat],
      isActive,
      isWarning,
      drawnTile,
      discardedTile,
    };
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Table + sidebar */}
      <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start" style={{ overflow: 'visible' }}>
        {/* Table */}
        <div className="flex-1 min-w-0 w-full md:w-auto" style={{ overflow: 'visible' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a7a6a' }}>Table wind: East · Scripted round</span>
          </div>
          <div className="flex flex-col gap-3 items-center" style={{ position: 'relative', overflow: 'visible' }}>
            <div className="grid gap-2" style={{
              gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
              gridTemplateColumns: '120px max-content 120px',
              gridTemplateRows: '120px max-content 120px',
            }}>
              {/* Left player */}
              <div style={{ gridArea: 'tl', marginLeft: '-180px', transform: 'translateY(14px)' }} className="flex flex-col items-start justify-end">
                <PlayerArea {...playerAreaProps(leftSeat, 4, false, false)} />
              </div>
              {/* Top player */}
              <div style={{ gridArea: 'tr', marginRight: '-180px', transform: 'translateY(14px)' }} className="flex flex-col items-end justify-end">
                <PlayerArea {...playerAreaProps(topSeat, 3, false, true)} />
              </div>

              {/* Center mat with discard piles */}
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
                  {(() => {
                    // Highlight the freshly discarded tile — only on discard-only steps
                    // (drew is null, discarded is set). This is the second half of a split turn.
                    const discardSeat = (!current.drew && current.discarded && action === 'draw-discard') ? who : null;
                    const hl = (s: GameSeat) => s === discardSeat;
                    return (<>
                  <div style={{ position: 'absolute', left: '50%', top: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={topSeat} tiles={piles[topSeat]} highlightLast={hl(topSeat)} />
                  </div>
                  <div style={{ position: 'absolute', top: '50%', left: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={leftSeat} tiles={piles[leftSeat]} highlightLast={hl(leftSeat)} />
                  </div>
                  <div style={{ position: 'absolute', top: '50%', right: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={rightSeat} tiles={piles[rightSeat]} highlightLast={hl(rightSeat)} />
                  </div>
                  <div style={{ position: 'absolute', left: '50%', bottom: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>
                    <DiscardPile seat={bottomSeat} tiles={piles[bottomSeat]} highlightLast={hl(bottomSeat)} />
                  </div>
                    </>);
                  })()}
                </div>
              </div>

              {/* Bottom player (you) */}
              <div style={{ gridArea: 'bl', marginLeft: '-180px', transform: 'translateY(-14px)' }} className="flex flex-col items-start justify-start">
                <PlayerArea {...playerAreaProps(bottomSeat, 1, true, false)} />
              </div>
              {/* Right player */}
              <div style={{ gridArea: 'br', marginRight: '-180px', transform: 'translateY(-14px)' }} className="flex flex-col items-end justify-start">
                <PlayerArea {...playerAreaProps(rightSeat, 2, false, true)} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: game log */}
        <div className="w-full md:w-[220px] shrink-0 md:self-stretch md:relative border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0">
          <div className="md:absolute md:inset-0 md:pl-6 flex flex-col overflow-hidden">
            <GameLog steps={steps} currentStep={step} isFirst={isFirst} isLast={isLast} onNext={next} onPrev={prev} onReset={reset} replayLocked={replayLocked} />
          </div>
        </div>
      </div>

      {/* Step info panel */}
      <StepInfo current={current} step={step} total={total} />

      {/* Win popup */}
      {showWinPopup && (
        <WinPopup current={current} onClose={() => setShowWinPopup(false)} />
      )}
    </div>
  );
}
