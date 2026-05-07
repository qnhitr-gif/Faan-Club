'use client';

import React, { useState, useMemo } from 'react';
import type { TileFace, WindValue } from '@/lib/tiles';
import { SuitFace } from '@/components/tile/TileFaces';
import { WallsWithBreak } from './DealHands';

const OFF = 16;
const WALL_PX = 269;
const WALL_BY_SEAT: WindValue[] = ['east', 'south', 'west', 'north'];
const HAND_COUNT: Record<WindValue, number> = { east: 14, south: 13, west: 13, north: 13 };
const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

// ─── Tile components ──────────────────────────────────────────────────────────
function MiniTile() {
  return (
    <svg width={13} height={18} viewBox="0 0 60 84" aria-hidden
      style={{ width: 13, height: 18, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#3D6E2F" />
    </svg>
  );
}

function DiscardTile({ face }: { face: TileFace }) {
  return (
    <svg width={10} height={14} viewBox="0 0 60 84" aria-hidden
      style={{ width: 10, height: 14, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
      <SuitFace face={face} />
    </svg>
  );
}

function FlowerTile({ face }: { face: TileFace }) {
  return (
    <svg width={10} height={14} viewBox="0 0 60 84" aria-hidden
      style={{ width: 10, height: 14, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#C8A86B" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#FFF8E8" />
      <SuitFace face={face} />
    </svg>
  );
}

function ActionTile({ face, flower }: { face: TileFace; flower?: boolean }) {
  return (
    <svg width={22} height={30} viewBox="0 0 60 84" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill={flower ? '#C8A86B' : '#D4C5A2'} />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill={flower ? '#FFF8E8' : '#F5F0E1'} />
      <SuitFace face={face} />
    </svg>
  );
}

// ─── Script ───────────────────────────────────────────────────────────────────
function randomBreak() {
  const sum =
    Math.floor(Math.random() * 6) + 1 +
    Math.floor(Math.random() * 6) + 1 +
    Math.floor(Math.random() * 6) + 1;
  return { wall: WALL_BY_SEAT[(sum - 1) % 4] as WindValue, pos: ((sum - 1) % 18) + 1 };
}

type Action = 'draw-normal' | 'draw-flower' | 'draw-back' | 'discard';

type ScriptEvent =
  | { action: 'draw-normal' | 'draw-back'; player: WindValue; label: string }
  | { action: 'draw-flower'; player: WindValue; label: string; tile: TileFace }
  | { action: 'discard';     player: WindValue; label: string; tile: TileFace };

const SCRIPT: ScriptEvent[] = [
  { action: 'draw-normal', player: 'east',  label: 'East draws from the front wall' },
  { action: 'discard',     player: 'east',  label: 'East discards',
    tile: { suit: 'character', value: 5 } },
  { action: 'draw-flower', player: 'south', label: 'South draws Spring — a flower!',
    tile: { suit: 'flower', value: 1 } },
  { action: 'draw-back',   player: 'south', label: 'South draws a replacement from the back wall' },
  { action: 'discard',     player: 'south', label: 'South discards',
    tile: { suit: 'character', value: 9 } },
  { action: 'draw-normal', player: 'west',  label: 'West draws from the front wall' },
  { action: 'discard',     player: 'west',  label: 'West discards',
    tile: { suit: 'wind', value: 'north' } },
  { action: 'draw-normal', player: 'north', label: 'North draws from the front wall' },
  { action: 'discard',     player: 'north', label: 'North discards',
    tile: { suit: 'dragon', value: 'red' } },
  { action: 'draw-normal', player: 'east',  label: 'East draws from the front wall' },
  { action: 'discard',     player: 'east',  label: 'East discards',
    tile: { suit: 'dot', value: 4 } },
  { action: 'draw-normal', player: 'south', label: 'South draws from the front wall' },
  { action: 'discard',     player: 'south', label: 'South discards',
    tile: { suit: 'dot', value: 8 } },
  { action: 'draw-flower', player: 'west',  label: 'West draws Lotus — a season tile!',
    tile: { suit: 'season', value: 2 } },
  { action: 'draw-back',   player: 'west',  label: 'West draws a replacement from the back wall' },
  { action: 'discard',     player: 'west',  label: 'West discards',
    tile: { suit: 'bamboo', value: 3 } },
  { action: 'draw-normal', player: 'north', label: 'North draws the winning tile — 胡 (hu)!' },
];

// ─── Seat label ───────────────────────────────────────────────────────────────
function SeatLabel({ wind, you }: { wind: WindValue; you?: boolean }) {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      <span className={`text-ui px-2 py-0.5 rounded-md leading-tight ${
        you ? 'bg-brand-green text-brand-cream' : 'text-secondary hairline border'
      }`}>
        <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
        {' · '}{WIND_LABELS[wind]}
        {you && ' · you'}
      </span>
      {wind === 'east' && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded">dealer</span>
      )}
    </div>
  );
}

// ─── Player area ──────────────────────────────────────────────────────────────
function PlayerArea({ wind, you, handCount, activeAction, vertical, flowers }: {
  wind: WindValue; you?: boolean;
  handCount: number; activeAction?: Action; vertical?: boolean;
  flowers?: TileFace[];
}) {
  const isFlower = activeAction === 'draw-flower';
  const ringClass = activeAction
    ? isFlower ? 'ring-1 ring-amber-500 bg-amber-500/10' : 'ring-1 ring-brand-green bg-brand-green/10'
    : '';
  return (
    <div className="flex flex-col items-center gap-1.5">
      <SeatLabel wind={wind} you={you} />
      <div className={`${vertical ? 'inline-flex flex-col gap-px px-0.5 py-1' : 'inline-flex gap-px px-1 py-0.5'} rounded ${ringClass}`}>
        {Array.from({ length: handCount }).map((_, i) => <MiniTile key={i} />)}
      </div>
    </div>
  );
}

// ─── Hook & action panel ─────────────────────────────────────────────────────
export interface RoundDemoState {
  step: number;
  isComplete: boolean;
  current: ScriptEvent | null;
  breakInfo: { wall: WindValue; pos: number };
  next: () => void;
  replay: () => void;
  resetRound: () => void;
}

export function useRoundDemo(): RoundDemoState {
  const [step, setStep] = useState(0);
  const breakInfo = useMemo(randomBreak, []);
  const isComplete = step >= SCRIPT.length;
  const current = isComplete ? null : SCRIPT[step];
  return {
    step, isComplete, current, breakInfo,
    next: () => setStep(s => s + 1),
    replay: () => setStep(0),
    resetRound: () => setStep(0),
  };
}

export function RoundDemoAction({ state, footer }: { state: RoundDemoState; footer?: React.ReactNode }) {
  const { current, step, isComplete, next, replay } = state;
  return (
    <div className="self-stretch bg-elev border border-brand-green/20 rounded-xl px-4 flex flex-col items-start gap-3 min-w-[190px] pt-[84px] md:pt-[92px] pb-4">
      <ActionCard current={current} step={step} isComplete={isComplete} />
      {!isComplete ? (
        <button type="button" onClick={next}
          className="px-3 py-1.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep">
          Next →
        </button>
      ) : (
        <button type="button" onClick={replay}
          className="px-3 py-1.5 rounded-md border border-brand-green/40 text-brand-green text-ui font-medium hover:bg-brand-green/10">
          Replay
        </button>
      )}
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function RoundDemo({ yourSeat, state }: { yourSeat: WindValue; state: RoundDemoState }) {
  const { step, isComplete, current, breakInfo } = state;

  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);

  const done = SCRIPT.slice(0, step);
  const frontDrawn = done.filter(s => s.action === 'draw-normal' || s.action === 'draw-flower').length;
  const backDrawn  = done.filter(s => s.action === 'draw-back').length;

  // Include current step's discard/flower immediately so they appear as soon as the step is shown
  const visible = current
    ? [...done, ...(current.action === 'discard' || current.action === 'draw-flower' ? [current] : [])]
    : done;

  const flowersByPlayer: Record<WindValue, TileFace[]> = { east: [], south: [], west: [], north: [] };
  const discardsByPlayer: Record<WindValue, TileFace[]> = { east: [], south: [], west: [], north: [] };
  for (const ev of visible) {
    if (ev.action === 'draw-flower') flowersByPlayer[ev.player].push(ev.tile);
    if (ev.action === 'discard')     discardsByPlayer[ev.player].push(ev.tile);
  }

  function activeFor(w: WindValue): Action | undefined {
    if (isComplete || current!.player !== w) return undefined;
    return current!.action;
  }

  function playerProps(w: WindValue, vertical?: boolean) {
    return { wind: w, handCount: HAND_COUNT[w], activeAction: activeFor(w), vertical, flowers: flowersByPlayer[w] };
  }

  function discardZone(wind: WindValue) {
    const flowers = flowersByPlayer[wind];
    const discards = discardsByPlayer[wind];
    if (!flowers.length && !discards.length) return null;
    return (
      <>
        {flowers.map((f, i) => <FlowerTile key={`f${i}`} face={f} />)}
        {discards.map((d, i) => <DiscardTile key={`d${i}`} face={d} />)}
      </>
    );
  }

  const topZone    = discardZone(topWind);
  const bottomZone = discardZone(bottomWind);
  const leftZone   = discardZone(leftWind);
  const rightZone  = discardZone(rightWind);

  return (
    <div className="grid gap-2" style={{
      gridTemplateAreas: '"top top top" "left center right" "bottom bottom bottom"',
      gridTemplateColumns: 'minmax(140px, 1fr) auto minmax(140px, 1fr)',
      gridTemplateRows: '60px auto 60px',
    }}>
      <div style={{ gridArea: 'top' }} className="flex flex-col items-center justify-end pb-2">
        <PlayerArea {...playerProps(topWind)} />
      </div>

      <div style={{ gridArea: 'left' }} className="flex flex-col items-center justify-center pr-3">
        <PlayerArea {...playerProps(leftWind, true)} />
      </div>

      <div style={{ gridArea: 'center' }}
        className="bg-brand-green/10 border border-brand-green/30 rounded-2xl p-3">
        <div className="relative">
          <WallsWithBreak
            breakWall={breakInfo.wall} breakPos={breakInfo.pos}
            yourSeat={yourSeat} tilesDrawn={53}
            showDealArrow={false} showMarkers={true}
            nextTileCount={0} extraFront={frontDrawn} extraBack={backDrawn}
          />
          <div className="absolute pointer-events-none"
            style={{ top: OFF, left: OFF, width: WALL_PX, height: WALL_PX }}>
            {topZone && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <div className="flex flex-wrap gap-px justify-center" style={{ maxWidth: 130 }}>
                  {topZone}
                </div>
              </div>
            )}
            {bottomZone && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <div className="flex flex-wrap gap-px justify-center" style={{ maxWidth: 130 }}>
                  {bottomZone}
                </div>
              </div>
            )}
            {leftZone && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-px">{leftZone}</div>
              </div>
            )}
            {rightZone && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-px">{rightZone}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ gridArea: 'right' }} className="flex flex-col items-center justify-center pl-3">
        <PlayerArea {...playerProps(rightWind, true)} />
      </div>

      <div style={{ gridArea: 'bottom' }} className="flex flex-col items-center justify-start pt-2">
        <PlayerArea {...playerProps(bottomWind)} you />
      </div>
    </div>
  );
}

function ActionCard({ current, step, isComplete }: {
  current: ScriptEvent | null;
  step: number;
  isComplete: boolean;
}) {
  if (step === 0) {
    return (
      <div className="max-w-[180px]">
        <div className="text-ui text-secondary text-[12px]">Setup complete. East has 14 tiles; others 13.</div>
        <div className="text-ui text-tertiary text-[11px] mt-0.5">Click Next to begin.</div>
      </div>
    );
  }
  if (isComplete) {
    return (
      <div className="bg-elev border border-brand-green/20 rounded-lg px-3 py-2">
        <div className="text-ui font-medium text-primary">Round complete! 🎉</div>
      </div>
    );
  }
  if (current?.action === 'draw-flower') {
    return (
      <div className="bg-amber-50/95 dark:bg-amber-950/80 border border-amber-400/50 rounded-lg px-3 py-2 flex items-center gap-2 max-w-[200px]">
        <ActionTile face={current.tile} flower />
        <div className="text-ui font-medium text-amber-700 dark:text-amber-300 text-[12px] leading-snug">{current.label}</div>
      </div>
    );
  }
  if (current?.action === 'discard') {
    return (
      <div className="bg-elev border border-brand-green/20 rounded-lg px-3 py-2 flex items-center gap-2 max-w-[200px]">
        <ActionTile face={current.tile} />
        <div className="text-ui text-secondary text-[12px] leading-snug">{current.label}</div>
      </div>
    );
  }
  return (
    <div className="bg-elev border border-brand-green/20 rounded-lg px-3 py-2 max-w-[180px]">
      <div className="text-ui font-medium text-primary text-[12px]">{current?.label}</div>
    </div>
  );
}
