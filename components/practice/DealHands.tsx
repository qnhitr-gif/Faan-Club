'use client';

import React, { useState } from 'react';
import type { WindValue } from '@/lib/tiles';
import { Dice, rollDie, type DiceValues } from './Dice';
import { PrimaryButton } from './PrimaryButton';
import { MahjongMat } from './MahjongMat';

export type Phase = 'await-roll' | 'await-deal' | 'dealing' | 'dealt';

export interface DealHandsState {
  phase: Phase;
  dice: DiceValues | null;
  counts: Record<WindValue, number>;
  dealStep: number;
  breakInfo: { wall: WindValue; pos: number } | null;
  diceSum: number;
  tilesDrawnTotal: number;
  activeDrawers: WindValue[];
  nextTileCount: number;
  roll: () => void;
  startDeal: () => void;
  nextStep: () => void;
  resetDeal: () => void;
}

export function useDealHands({ yourSeat, onComplete, onReset }: {
  yourSeat: WindValue;
  onComplete?: () => void;
  onReset?: () => void;
}): DealHandsState {
  const [phase, setPhase] = useState<Phase>('await-roll');
  const [dice, setDice] = useState<DiceValues | null>(null);
  const [counts, setCounts] = useState<Record<WindValue, number>>({ east: 0, south: 0, west: 0, north: 0 });
  const [dealStep, setDealStep] = useState(0);

  const diceSum = dice ? dice[0] + dice[1] + dice[2] : 0;
  const breakInfo = dice ? getBreak(diceSum) : null;
  const tilesDrawnTotal = counts.east + counts.south + counts.west + counts.north;
  const activeDrawers: WindValue[] = phase === 'dealing'
    ? (DEAL_STEPS[dealStep - 1]?.active as WindValue[] ?? [])
    : [];
  const nextTileCount = (() => {
    if (phase === 'await-deal') return Object.values(DEAL_STEPS[0].delta).reduce((a, b) => a + b, 0);
    if (phase === 'dealing' && dealStep < DEAL_STEPS.length)
      return Object.values(DEAL_STEPS[dealStep].delta).reduce((a, b) => a + b, 0);
    return 0;
  })();

  function applyDelta(prev: Record<WindValue, number>, delta: Partial<Record<WindValue, number>>) {
    const next = { ...prev };
    for (const [w, n] of Object.entries(delta) as Array<[WindValue, number]>) next[w] += n;
    return next;
  }

  function roll() {
    setDice([rollDie(), rollDie(), rollDie()]);
    setPhase('await-deal');
    setCounts({ east: 0, south: 0, west: 0, north: 0 });
    setDealStep(0);
    onReset?.();
  }

  function startDeal() {
    setCounts(prev => applyDelta(prev, DEAL_STEPS[0].delta));
    setDealStep(1);
    setPhase('dealing');
  }

  function nextStep() {
    if (dealStep >= DEAL_STEPS.length) { setPhase('dealt'); onComplete?.(); return; }
    setCounts(prev => applyDelta(prev, DEAL_STEPS[dealStep].delta));
    const ns = dealStep + 1;
    setDealStep(ns);
    if (ns >= DEAL_STEPS.length) { setPhase('dealt'); onComplete?.(); }
  }

  function resetDeal() {
    setPhase('await-roll');
    setDice(null);
    setCounts({ east: 0, south: 0, west: 0, north: 0 });
    setDealStep(0);
    onReset?.();
  }

  return { phase, dice, counts, dealStep, breakInfo, diceSum, tilesDrawnTotal, activeDrawers, nextTileCount, roll, startDeal, nextStep, resetDeal };
}

interface DealHandsProps { yourSeat: WindValue; state: DealHandsState; }

const WALL_BY_SEAT: WindValue[] = ['east', 'south', 'west', 'north'];

// Returns tile positions (1–18) on the first wall for a given wind
function dealSeq(wind: WindValue): string {
  const p = WALL_BY_SEAT.indexOf(wind); // 0=East,1=South,2=West,3=North
  const nums: number[] = [];
  for (let n = p + 1; n <= 18; n += 4) nums.push(n);
  return nums.join(', ');
}
const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const WIND_INITIAL: Record<WindValue, string> = { east: 'E', south: 'S', west: 'W', north: 'N' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];
function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

function getBreak(sum: number): { wall: WindValue; pos: number } {
  return { wall: WALL_BY_SEAT[(sum - 1) % 4], pos: ((sum - 1) % 18) + 1 };
}

// Clockwise deal: E → N → W → S × 3 rounds, then East+2, others+1
const DEAL_STEPS: ReadonlyArray<{
  active: WindValue[];
  delta: Partial<Record<WindValue, number>>;
  label: string;
}> = [
  // Round 1
  { active: ['east'],  delta: { east: 4 },  label: 'East draws 4' },
  { active: ['north'], delta: { north: 4 }, label: 'North draws 4' },
  { active: ['west'],  delta: { west: 4 },  label: 'West draws 4' },
  { active: ['south'], delta: { south: 4 }, label: 'South draws 4' },
  // Round 2
  { active: ['east'],  delta: { east: 4 },  label: 'East draws 4 more' },
  { active: ['north'], delta: { north: 4 }, label: 'North draws 4 more' },
  { active: ['west'],  delta: { west: 4 },  label: 'West draws 4 more' },
  { active: ['south'], delta: { south: 4 }, label: 'South draws 4 more' },
  // Round 3 — all reach 12
  { active: ['east'],  delta: { east: 4 },  label: 'East draws 4 more' },
  { active: ['north'], delta: { north: 4 }, label: 'North draws 4 more' },
  { active: ['west'],  delta: { west: 4 },  label: 'West draws 4 more' },
  { active: ['south'], delta: { south: 4 }, label: 'South draws 4 more' },
  // Final round — East draws 2, others draw 1
  { active: ['east'],  delta: { east: 2 },  label: 'East draws 2 (14 total)' },
  { active: ['north'], delta: { north: 1 }, label: 'North draws 1 (13 total)' },
  { active: ['west'],  delta: { west: 1 },  label: 'West draws 1 (13 total)' },
  { active: ['south'], delta: { south: 1 }, label: 'South draws 1 (13 total)' },
];

// Wall constants — match BuildWalls
const WALL_LEN = 18;
const TILE_W   = 14;  // tile width
const TILE_H   = 20;  // tile height (portrait ~3:4)
const GAP      = 1;
const WALL_PX  = WALL_LEN * TILE_W + (WALL_LEN - 1) * GAP; // 269
const STEP     = TILE_W + GAP;                               // 15
const GRID     = TILE_H + 2 + WALL_PX + 2 + TILE_H;         // 313
const OFF      = TILE_H + 2;                                 // 22
const INNER    = OFF + WALL_PX;                              // 291

type WallPos = 'top' | 'right' | 'bottom' | 'left';

// Clockwise draw directions
const POS_DRAW_DIR: Record<WallPos, 'left' | 'right' | 'up' | 'down'> = {
  top: 'right', right: 'down', bottom: 'left', left: 'up',
};

// CW visual order: top → right → bottom → left
const CW_VISUAL: WallPos[] = ['top', 'right', 'bottom', 'left'];

function getWallPositions(yourSeat: WindValue): Record<WallPos, WindValue> {
  const i = WALL_BY_SEAT.indexOf(yourSeat);
  return {
    bottom: WALL_BY_SEAT[i],
    right:  WALL_BY_SEAT[(i + 1) % 4],
    top:    WALL_BY_SEAT[(i + 2) % 4],
    left:   WALL_BY_SEAT[(i + 3) % 4],
  };
}

function wallVisualPos(wall: WindValue, wpos: Record<WallPos, WindValue>): WallPos {
  for (const p of CW_VISUAL) if (wpos[p] === wall) return p;
  return 'top';
}

function tileCenterForPos(pos: WallPos, idx: number): { x: number; y: number } {
  const c = OFF + idx * STEP + TILE_W / 2;
  switch (pos) {
    case 'top':    return { x: c, y: TILE_H / 2 };
    case 'bottom': return { x: c, y: GRID - TILE_H / 2 };
    case 'right':  return { x: GRID - TILE_H / 2, y: c };
    case 'left':   return { x: TILE_H / 2, y: c };
  }
}

function drawHereDot(wall: WindValue, gapIdx: number, wpos: Record<WallPos, WindValue>): { x: number; y: number } | null {
  const pos = wallVisualPos(wall, wpos);
  const dir = POS_DRAW_DIR[pos];
  const firstIdx = (dir === 'left' || dir === 'up') ? gapIdx - 1 : gapIdx + 1;
  if (firstIdx < 0 || firstIdx >= WALL_LEN) return null;
  return tileCenterForPos(pos, firstIdx);
}

function drawHereTextAnchor(pos: WallPos, dotX: number, dotY: number) {
  switch (pos) {
    case 'top':    return { x: dotX, y: dotY + 32, anchor: 'middle' as const };
    case 'bottom': return { x: dotX, y: dotY - 22, anchor: 'middle' as const };
    case 'right':  return { x: dotX - 22, y: dotY + 3, anchor: 'end'    as const };
    case 'left':   return { x: dotX + 22, y: dotY + 3, anchor: 'start'  as const };
  }
}

// Build ordered list of (wall, idx) slots in CW draw order starting from gap
function buildDrawSequence(
  breakWall: WindValue,
  gapIdx: number,
  wpos: Record<WallPos, WindValue>
): Array<{ wall: WindValue; idx: number }> {
  const seq: Array<{ wall: WindValue; idx: number }> = [];
  const startPos = wallVisualPos(breakWall, wpos);
  const startPosI = CW_VISUAL.indexOf(startPos);
  const dir0 = POS_DRAW_DIR[startPos];
  const fromFirst = dir0 === 'right' || dir0 === 'down';

  // First wall: tiles on draw side of gap
  if (fromFirst) {
    for (let i = gapIdx + 1; i < WALL_LEN; i++) seq.push({ wall: breakWall, idx: i });
  } else {
    for (let i = gapIdx - 1; i >= 0; i--) seq.push({ wall: breakWall, idx: i });
  }

  // Next 3 walls (full, in CW order)
  for (let p = 1; p < 4; p++) {
    const pos = CW_VISUAL[(startPosI + p) % 4];
    const w = wpos[pos];
    const d = POS_DRAW_DIR[pos];
    if (d === 'right' || d === 'down') {
      for (let i = 0; i < WALL_LEN; i++) seq.push({ wall: w, idx: i });
    } else {
      for (let i = WALL_LEN - 1; i >= 0; i--) seq.push({ wall: w, idx: i });
    }
  }

  // First wall: remaining tiles on other side of gap
  if (fromFirst) {
    for (let i = 0; i < gapIdx; i++) seq.push({ wall: breakWall, idx: i });
  } else {
    for (let i = WALL_LEN - 1; i > gapIdx; i--) seq.push({ wall: breakWall, idx: i });
  }

  return seq;
}

function EmptySlot({ landscape }: { landscape?: boolean }) {
  return landscape ? (
    <svg width={TILE_H} height={TILE_W} viewBox="0 0 20 14" aria-hidden>
      <rect width={20} height={14} rx={2} fill="#0f1f0a" fillOpacity={0.5} />
    </svg>
  ) : (
    <svg width={TILE_W} height={TILE_H} viewBox="0 0 14 20" aria-hidden>
      <rect width={14} height={20} rx={2} fill="#0f1f0a" fillOpacity={0.5} />
    </svg>
  );
}

function NormalTile({ lit, next, lightNext, landscape }: { lit?: boolean; next?: boolean; lightNext?: boolean; landscape?: boolean }) {
  const fill = next ? '#7bc458' : lightNext ? '#a0d080' : lit ? '#2d6b44' : '#235836';
  const opacity = next ? 0.15 : lightNext ? 0.2 : 0.4;
  if (landscape) {
    return (
      <svg width={TILE_H} height={TILE_W} viewBox="0 0 20 14" aria-hidden
        style={next ? { filter: 'drop-shadow(0 0 3px rgba(255,210,60,0.9))' } : undefined}>
        <rect width={20} height={14} rx={2} fill={fill} />
        <rect x={1.5} y={1.5} width={17} height={11} rx={1.5} fill="none"
          stroke="#1c4a2a" strokeOpacity={opacity} strokeWidth={0.5} />
        <line x1={10} y1={1.5} x2={10} y2={12.5}
          stroke="#1c4a2a" strokeOpacity={next ? 0.1 : lightNext ? 0.15 : 0.25} strokeWidth={0.5} />
      </svg>
    );
  }
  return (
    <svg width={TILE_W} height={TILE_H} viewBox="0 0 14 20" aria-hidden
      style={next ? { filter: 'drop-shadow(0 0 3px rgba(255,210,60,0.9))' } : undefined}>
      <rect width={14} height={20} rx={2} fill={fill} />
      <rect x={1.5} y={1.5} width={11} height={17} rx={1.5} fill="none"
        stroke="#1c4a2a" strokeOpacity={opacity} strokeWidth={0.5} />
      <line x1={1.5} y1={10} x2={12.5} y2={10}
        stroke="#1c4a2a" strokeOpacity={next ? 0.1 : lightNext ? 0.15 : 0.25} strokeWidth={0.5} />
    </svg>
  );
}

function WallRow({ wall, breakWall, depleted, upcoming, lightUpcoming, gapAfter, frontIdx, backIdx }: {
  wall: WindValue; breakWall: WindValue | null;
  depleted?: Set<number>; upcoming?: Set<number>; lightUpcoming?: Set<number>; gapAfter?: number;
  frontIdx?: number; backIdx?: number;
}) {
  const active = breakWall === wall;
  return (
    <div className="flex" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) => {
        const extraRight = gapAfter === i ? 7 : 0;
        const label = i === frontIdx ? 'F' : i === backIdx ? 'B' : null;
        const tileEl = depleted?.has(i) ? <EmptySlot /> : <NormalTile lit={active} next={upcoming?.has(i)} lightNext={lightUpcoming?.has(i)} />;
        const inner = label ? (
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            {tileEl}
            <span style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 'bold', color: '#faf6ec',
              fontFamily: 'sans-serif', lineHeight: 1, pointerEvents: 'none',
            }}>{label}</span>
          </div>
        ) : tileEl;
        return extraRight
          ? <div key={i} style={{ marginRight: extraRight }}>{inner}</div>
          : <React.Fragment key={i}>{inner}</React.Fragment>;
      })}
    </div>
  );
}

function WallCol({ wall, breakWall, depleted, upcoming, lightUpcoming, gapAfter, frontIdx, backIdx }: {
  wall: WindValue; breakWall: WindValue | null;
  depleted?: Set<number>; upcoming?: Set<number>; lightUpcoming?: Set<number>; gapAfter?: number;
  frontIdx?: number; backIdx?: number;
}) {
  const active = breakWall === wall;
  return (
    <div className="flex flex-col" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) => {
        const extraBottom = gapAfter === i ? 7 : 0;
        const label = i === frontIdx ? 'F' : i === backIdx ? 'B' : null;
        const tileEl = depleted?.has(i) ? <EmptySlot landscape /> : <NormalTile lit={active} next={upcoming?.has(i)} lightNext={lightUpcoming?.has(i)} landscape />;
        const inner = label ? (
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            {tileEl}
            <span style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 'bold', color: '#faf6ec',
              fontFamily: 'sans-serif', lineHeight: 1, pointerEvents: 'none',
            }}>{label}</span>
          </div>
        ) : tileEl;
        return extraBottom
          ? <div key={i} style={{ marginBottom: extraBottom }}>{inner}</div>
          : <React.Fragment key={i}>{inner}</React.Fragment>;
      })}
    </div>
  );
}

export function WallsWithBreak({ breakWall, breakPos, yourSeat, tilesDrawn, showDealArrow, showMarkers, nextTileCount, extraFront = 0, extraBack = 0, dealerJump = false }: {
  breakWall: WindValue | null; breakPos: number; yourSeat: WindValue; tilesDrawn: number;
  showDealArrow: boolean; showMarkers: boolean; nextTileCount: number;
  extraFront?: number; extraBack?: number; dealerJump?: boolean;
}) {
  const wpos = getWallPositions(yourSeat);
  // gapIdx depends on which end of the wall is East's "right".
  // For walls drawn rightward/downward (fromFirst=true), index 0 is East's right,
  // so gapIdx = breakPos - 1.  For leftward/upward walls, index WALL_LEN-1 is
  // East's right, so gapIdx = WALL_LEN - breakPos.
  const breakVisPos  = breakWall ? wallVisualPos(breakWall, wpos) : 'bottom';
  const breakDir     = POS_DRAW_DIR[breakVisPos];
  const breakFromFirst = breakDir === 'right' || breakDir === 'down';
  const gapIdx = breakWall
    ? (breakFromFirst ? breakPos - 1 : WALL_LEN - breakPos)
    : -1;
  // Visual gap separating the first 2 drawn tiles from the rest of the wall.
  // fromFirst: drawing goes up in index, so gap goes after tile gapIdx+2 (2nd drawn tile).
  // !fromFirst: drawing goes down in index, gap goes after tile gapIdx-3 (right of 3rd drawn tile).
  // Place the visual gap right at the break opening:
  // fromFirst=true  → gap after break tile (between break and 1st drawn)
  // fromFirst=false → gap after 1st drawn tile (between 1st drawn and break)
  const gapAfterForBreak = gapIdx < 0 ? undefined
    : breakFromFirst
      ? (gapIdx < WALL_LEN - 1  ? gapIdx     : undefined)
      : (gapIdx > 0             ? gapIdx - 1 : undefined);
  // "draw here" only shows before any tiles have been dealt
  const dHere  = breakWall && gapIdx >= 0 && tilesDrawn === 0
    ? drawHereDot(breakWall, gapIdx, wpos) : null;
  const dHerePos = breakWall ? wallVisualPos(breakWall, wpos) : 'bottom';

  const slotsConsumed = Math.floor(tilesDrawn / 2) + extraFront;
  const drawSeq = breakWall && gapIdx >= 0 ? buildDrawSequence(breakWall, gapIdx, wpos) : [];
  const depletedByWall: Partial<Record<WindValue, Set<number>>> = {};
  for (const { wall, idx } of drawSeq.slice(0, slotsConsumed)) {
    if (!depletedByWall[wall]) depletedByWall[wall] = new Set();
    depletedByWall[wall]!.add(idx);
  }
  // Back-tile depletion: the first "back draw" consumes the gap itself (already visualized
  // as a distinct slot); subsequent back draws deplete back-side tiles starting from drawSeq tail.
  if (extraBack > 1) {
    for (const { wall, idx } of drawSeq.slice(Math.max(0, drawSeq.length - (extraBack - 1)))) {
      if (!depletedByWall[wall]) depletedByWall[wall] = new Set();
      depletedByWall[wall]!.add(idx);
    }
  }

  // Upcoming tiles: the next batch to be drawn (highlighted in bright green)
  const upcomingByWall: Partial<Record<WindValue, Set<number>>> = {};
  // Light upcoming: dealer's jump — all 3 columns in softer green ([1'][3'] for East, [1][2][2'] for others)
  const lightUpcomingByWall: Partial<Record<WindValue, Set<number>>> = {};
  if (nextTileCount > 0) {
    if (dealerJump && nextTileCount === 2) {
      // Columns 1 and 3 lit in lighter green (East [1'][3'], South [1] from col 1)
      for (const slot of [drawSeq[slotsConsumed], drawSeq[slotsConsumed + 2]]) {
        if (slot) {
          if (!lightUpcomingByWall[slot.wall]) lightUpcomingByWall[slot.wall] = new Set();
          lightUpcomingByWall[slot.wall]!.add(slot.idx);
        }
      }
    } else {
      const nextSlots = nextTileCount <= 2 ? nextTileCount : Math.ceil(nextTileCount / 2);
      for (const { wall, idx } of drawSeq.slice(slotsConsumed, slotsConsumed + nextSlots)) {
        if (!upcomingByWall[wall]) upcomingByWall[wall] = new Set();
        upcomingByWall[wall]!.add(idx);
      }
    }
  }

  const labelData: Array<{ x: number; y: number; wall: WindValue; rotate?: string }> = [
    { x: GRID / 2, y: TILE_H / 2 + 3,          wall: wpos.top },
    { x: GRID / 2, y: GRID - TILE_H / 2 + 3,   wall: wpos.bottom },
    { x: GRID - TILE_H / 2, y: GRID / 2, wall: wpos.right, rotate: `rotate(90,${GRID - TILE_H / 2},${GRID / 2})` },
    { x: TILE_H / 2,        y: GRID / 2, wall: wpos.left,  rotate: `rotate(90,${TILE_H / 2},${GRID / 2})` },
  ];

  // Front / back positions shown after dealing completes
  const frontSlot = showMarkers && drawSeq.length > slotsConsumed ? drawSeq[slotsConsumed] : null;
  // Back tracker: starts on the gap itself (the "first back tile") and advances along
  // the back side of the active wall as replacement tiles are drawn.
  const backSlot  = showMarkers
    ? (extraBack === 0
        ? (breakWall && gapIdx >= 0 ? { wall: breakWall, idx: gapIdx } : null)
        : (extraBack <= drawSeq.length ? drawSeq[drawSeq.length - extraBack] : null))
    : null;

  return (
    <div className="relative" style={{ width: GRID, height: GRID }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${TILE_H}px ${WALL_PX}px ${TILE_H}px`,
        gridTemplateRows: `${TILE_H}px ${WALL_PX}px ${TILE_H}px`,
        gap: 2,
      }}>
        <span /><div style={{ transform: 'rotate(-17deg) translateY(37px)', transformOrigin: 'center' }}><WallRow wall={wpos.top}    breakWall={breakWall} depleted={depletedByWall[wpos.top]}    upcoming={upcomingByWall[wpos.top]}    lightUpcoming={lightUpcomingByWall[wpos.top]}    gapAfter={breakWall === wpos.top    ? gapAfterForBreak : undefined} frontIdx={frontSlot?.wall === wpos.top    ? frontSlot.idx : undefined} backIdx={backSlot?.wall === wpos.top    ? backSlot.idx : undefined} /></div><span />
        <div style={{ transform: 'rotate(-17deg) translateX(37px)', transformOrigin: 'center' }}><WallCol wall={wpos.left}  breakWall={breakWall} depleted={depletedByWall[wpos.left]}   upcoming={upcomingByWall[wpos.left]}   lightUpcoming={lightUpcomingByWall[wpos.left]}   gapAfter={breakWall === wpos.left   ? gapAfterForBreak : undefined} frontIdx={frontSlot?.wall === wpos.left   ? frontSlot.idx : undefined} backIdx={backSlot?.wall === wpos.left   ? backSlot.idx : undefined} /></div>
        <div style={{ width: WALL_PX, height: WALL_PX }} />
        <div style={{ transform: 'rotate(-17deg) translateX(-37px)', transformOrigin: 'center' }}><WallCol wall={wpos.right} breakWall={breakWall} depleted={depletedByWall[wpos.right]}  upcoming={upcomingByWall[wpos.right]}  lightUpcoming={lightUpcomingByWall[wpos.right]}  gapAfter={breakWall === wpos.right  ? gapAfterForBreak : undefined} frontIdx={frontSlot?.wall === wpos.right  ? frontSlot.idx : undefined} backIdx={backSlot?.wall === wpos.right  ? backSlot.idx : undefined} /></div>
        <span /><div style={{ transform: 'rotate(-17deg) translateY(-37px)', transformOrigin: 'center' }}><WallRow wall={wpos.bottom} breakWall={breakWall} depleted={depletedByWall[wpos.bottom]} upcoming={upcomingByWall[wpos.bottom]} lightUpcoming={lightUpcomingByWall[wpos.bottom]} gapAfter={breakWall === wpos.bottom ? gapAfterForBreak : undefined} frontIdx={frontSlot?.wall === wpos.bottom ? frontSlot.idx : undefined} backIdx={backSlot?.wall === wpos.bottom ? backSlot.idx : undefined} /></div><span />
      </div>

      <svg className="absolute inset-0 pointer-events-none overflow-visible"
        width={GRID} height={GRID} viewBox={`0 0 ${GRID} ${GRID}`}>
        {labelData.map(({ x, y, wall, rotate }, i) => (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize={7} fill="white" fillOpacity={0.7} fontFamily="sans-serif" fontWeight="bold"
            transform={rotate}>
            {WIND_INITIAL[wall]}
          </text>
        ))}
        {/* 18×2 labels outside each wall */}
        <text x={GRID / 2} y={-5} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.45)" fontFamily="sans-serif">18×2</text>
        <text x={GRID / 2} y={GRID + 10} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.45)" fontFamily="sans-serif">18×2</text>
        <text x={GRID + 10} y={GRID / 2} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" transform={`rotate(90,${GRID + 10},${GRID / 2})`}>18×2</text>
        <text x={-10} y={GRID / 2} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" transform={`rotate(90,-10,${GRID / 2})`}>18×2</text>
      </svg>

      {breakWall && (
        <svg className="absolute inset-0 pointer-events-none overflow-visible"
          width={GRID} height={GRID} viewBox={`0 0 ${GRID} ${GRID}`}>
          <defs>
            <marker id="arr-blue" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto">
              <path d="M 0,1 L 6,3.5 L 0,6 Z" fill="#185FA5" opacity={0.85} />
            </marker>
          </defs>




          {/* Front / back labels after dealing */}
        </svg>
      )}
    </div>
  );
}


// Static direction arrow
function DirArrow({ dir }: { dir: 'right' | 'up' | 'left' | 'down' }) {
  const data: Record<string, { arc: string; head: string; headTransform: string }> = {
    right: { arc: 'M 1,10 Q 14,17 27,10', head: 'M 21,5 L 27,10 L 21,16',  headTransform: 'rotate(-25,27,10)'  },
    up:    { arc: 'M 10,27 Q 17,14 10,1',  head: 'M 5,7  L 10,1  L 16,6',   headTransform: 'rotate(-25,10,1)'   },
    left:  { arc: 'M 27,18 Q 14,11 1,18',  head: 'M 7,23 L 1,18  L 7,12',   headTransform: 'rotate(-25,1,18)'   },
    down:  { arc: 'M 18,1  Q 11,14 18,27', head: 'M 23,21 L 18,27 L 12,21', headTransform: 'rotate(-25,18,27)'  },
  };
  const { arc, head, headTransform } = data[dir];
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none"
      stroke="rgba(28,74,42,0.65)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={arc} />
      <path d={head} transform={headTransform} />
    </svg>
  );
}

function TwoByTwoIcon() {
  return (
    <span className="inline-grid grid-cols-2 gap-px align-middle" style={{ gap: 1 }}>
      {[0,1,2,3].map(i => (
        <svg key={i} width={8} height={11} viewBox="0 0 60 84" aria-hidden>
          <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#C2B493" />
          <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#235836" />
        </svg>
      ))}
    </span>
  );
}

function MiniBack({ landscape }: { landscape?: boolean }) {
  if (landscape) {
    return (
      <svg width={27} height={20} viewBox="0 0 84 60" aria-hidden
        style={{ width: 27, height: 20, display: 'block', flexShrink: 0 }}>
        <g transform="matrix(0,-1,1,0,0,60)">
          <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#C2B493" />
          <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#235836" />
        </g>
      </svg>
    );
  }
  return (
    <svg width={20} height={27} viewBox="0 0 60 84" aria-hidden
      style={{ width: 20, height: 27, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#C2B493" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#3D6E2F" />
    </svg>
  );
}

function HandStack({ count, highlight, drawing, vertical }: { count: number; highlight: boolean; drawing?: boolean; vertical?: boolean }) {
  if (count === 0) return null;
  const ringClass = drawing
    ? 'ring-2 ring-brand-green bg-elev'
    : highlight
      ? 'bg-elev ring-1 ring-brand-green/60'
      : 'bg-elev';
  return (
    <div className={`${vertical ? 'inline-flex flex-col gap-px px-0.5 py-1' : 'inline-flex gap-px px-1 py-0.5'} rounded-md ${ringClass}`}
      aria-label={`${count} tiles dealt`}>
      {Array.from({ length: Math.min(count, 14) }).map((_, i) => <MiniBack key={i} landscape={vertical} />)}
    </div>
  );
}

const BADGE_CLS = 'text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded whitespace-nowrap';

const PILL_W = 115;

function SeatArea({ wind, isYou, count, drawing, vertical, reverse }: {
  wind: WindValue; isYou: boolean; count: number; drawing: boolean; vertical?: boolean; reverse?: boolean;
}) {
  const badges = (
    <>
      {wind === 'east' && <span className={BADGE_CLS}>dealer</span>}
    </>
  );

  const pill = (
    <span style={{ minWidth: PILL_W, display: 'inline-block' }} className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
      wind === 'east' ? 'bg-brand-green text-brand-cream' : 'border border-brand-green/30 text-secondary'
    }`}>
      <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
      {' · '}{WIND_LABELS[wind]}
    </span>
  );

  return (
    <div className={`flex flex-col gap-1.5 ${reverse ? 'items-end' : 'items-start'}`}>
      {reverse ? (
        <div className="relative w-fit">
          <div className="absolute left-full inset-y-0 flex items-center gap-1 pl-1.5">
            {badges}
          </div>
          {pill}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {pill}
          {badges}
        </div>
      )}
      {count > 0 && (
        <div style={{ width: PILL_W, overflow: 'visible', display: 'flex', justifyContent: 'center' }}>
          <HandStack count={count} highlight={isYou} drawing={drawing} vertical={vertical} />
        </div>
      )}
    </div>
  );
}

export function DealHands({ yourSeat, state }: DealHandsProps) {
  const { phase, breakInfo, diceSum, tilesDrawnTotal, activeDrawers, nextTileCount, counts } = state;

  // Dealer's jump: East draws tile 1 and tile 3, skipping tile 2.
  // nextTileCount === 2 uniquely identifies this step (DEAL_STEPS[12]).
  const isDealerJump = phase === 'dealing' && nextTileCount === 2;

  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);

  const showArrows = phase !== 'await-roll';

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="grid gap-2" style={{
        gridTemplateAreas: '"tl tmid tr" "lmid center rmid" "bl bmid br"',
        gridTemplateColumns: '80px max-content 80px',
        gridTemplateRows: '80px max-content 80px',
      }}>
        <div style={{ gridArea: 'tl', marginLeft: '-44px' }} className="flex flex-col items-start justify-end gap-0.5">
          {phase === 'await-deal' && <span className="text-[10px] text-tertiary pl-1" style={{ fontFamily: 'var(--font-mono)' }}>{dealSeq(leftWind)}</span>}
          <SeatArea wind={leftWind} isYou={leftWind === yourSeat} count={counts[leftWind]} drawing={activeDrawers.includes(leftWind)} />
        </div>
        <div style={{ gridArea: 'tmid', position: 'relative', zIndex: 2, transform: 'translateY(-35px)' }} className="flex items-center justify-center">
          {showArrows && <DirArrow dir="left" />}
        </div>
        <div style={{ gridArea: 'tr', marginRight: '-44px' }} className="flex flex-col items-end justify-end gap-0.5">
          {phase === 'await-deal' && <span className="text-[10px] text-tertiary pr-1" style={{ fontFamily: 'var(--font-mono)' }}>{dealSeq(topWind)}</span>}
          <SeatArea wind={topWind} isYou={topWind === yourSeat} count={counts[topWind]} drawing={activeDrawers.includes(topWind)} reverse />
        </div>
        <div style={{ gridArea: 'lmid', position: 'relative', zIndex: 2, transform: 'translateX(-35px)' }} className="flex items-center justify-center">
          {showArrows && <DirArrow dir="down" />}
        </div>
        <div style={{ gridArea: 'center', position: 'relative', width: 367, height: 367 }}>
          <MahjongMat size={367}>
            <WallsWithBreak
              breakWall={breakInfo?.wall ?? null}
              breakPos={breakInfo?.pos ?? 0}
              yourSeat={yourSeat}
              tilesDrawn={tilesDrawnTotal}
              showDealArrow={phase === 'await-deal'}
              showMarkers={phase === 'dealt'}
              nextTileCount={nextTileCount}
              dealerJump={isDealerJump}
            />
          </MahjongMat>
          <button
            type="button"
            onClick={state.resetDeal}
            title="Reset deal"
            aria-label="Reset deal"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              width: 64, height: 64,
              borderRadius: '50%',
              background: 'transparent',
              border: '1px solid rgba(28,74,42,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
            className="hover:border-brand-green/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none"
              stroke="#b8302a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: 'scaleY(-1)' }}>
              <path d="M3.5 15a9 9 0 1 0 8.5-12 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
        <div style={{ gridArea: 'rmid', position: 'relative', zIndex: 2, transform: 'translateX(35px)' }} className="flex items-center justify-center">
          {showArrows && <DirArrow dir="up" />}
        </div>
        <div style={{ gridArea: 'bl', marginLeft: '-44px' }} className="flex flex-col items-start justify-start gap-0.5">
          {phase === 'await-deal' && <span className="text-[10px] text-tertiary pl-1" style={{ fontFamily: 'var(--font-mono)' }}>{dealSeq(bottomWind)}</span>}
          <SeatArea wind={bottomWind} isYou={bottomWind === yourSeat} count={counts[bottomWind]} drawing={activeDrawers.includes(bottomWind)} />
        </div>
        <div style={{ gridArea: 'bmid', position: 'relative', zIndex: 2, transform: 'translateY(35px)' }} className="flex items-center justify-center">
          {showArrows && <DirArrow dir="right" />}
        </div>
        <div style={{ gridArea: 'br', marginRight: '-44px' }} className="flex flex-col items-end justify-start gap-0.5">
          {phase === 'await-deal' && <span className="text-[10px] text-tertiary pr-1" style={{ fontFamily: 'var(--font-mono)' }}>{dealSeq(rightWind)}</span>}
          <SeatArea wind={rightWind} isYou={rightWind === yourSeat} count={counts[rightWind]} drawing={activeDrawers.includes(rightWind)} reverse />
        </div>
      </div>
    </div>
  );
}

export function WallsBuiltView({ yourSeat }: { yourSeat: WindValue }) {
  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="grid gap-2" style={{
        gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
        gridTemplateColumns: '80px max-content 80px',
        gridTemplateRows: '80px max-content 80px',
      }}>
        <div style={{ gridArea: 'tl', marginLeft: '-44px' }} className="flex flex-col items-start justify-end">
          <SeatArea wind={leftWind} isYou={leftWind === yourSeat} count={0} drawing={false} />
        </div>
        <div style={{ gridArea: 'tr', marginRight: '-44px' }} className="flex flex-col items-end justify-end">
          <SeatArea wind={topWind} isYou={topWind === yourSeat} count={0} drawing={false} reverse />
        </div>
        <div style={{ gridArea: 'center' }}>
          <MahjongMat size={367}>
            <WallsWithBreak
              breakWall={null} breakPos={0} yourSeat={yourSeat}
              tilesDrawn={0} showDealArrow={false} showMarkers={false} nextTileCount={0}
            />
          </MahjongMat>
        </div>
        <div style={{ gridArea: 'bl', marginLeft: '-44px' }} className="flex flex-col items-start justify-start">
          <SeatArea wind={bottomWind} isYou={bottomWind === yourSeat} count={0} drawing={false} />
        </div>
        <div style={{ gridArea: 'br', marginRight: '-44px' }} className="flex flex-col items-end justify-start">
          <SeatArea wind={rightWind} isYou={rightWind === yourSeat} count={0} drawing={false} reverse />
        </div>
      </div>
    </div>
  );
}

const PHASE_NOTES: Record<Phase, string> = {
  'await-roll': 'Roll the dice. The sum of all three determines which wall breaks and where the deal begins.',
  'await-deal': '',
  'dealing': 'Deal 4 tiles at a time, clockwise: East → North → West → South. Keep going until everyone has their starting hand.',
  'dealt': 'All tiles dealt. East holds 14, everyone else 13. F marks where players draw tiles next. B marks where replacement tiles are drawn (for flowers or kongs).',
};

// CW deal order: East→North→West→South. CW-next from each wall:
const CW_NEXT: Record<WindValue, WindValue> = { east: 'north', south: 'east', west: 'south', north: 'west' };

function breakExplanation(sum: number, wall: WindValue, pos: number): string {
  const wallPos = (sum - 1) % 4 + 1; // 1=East, 2=right(South), 3=across(West), 4=left(North)
  const wallLabel = WIND_LABELS[wall];
  const relLabel =
    wallPos === 1 ? "East's own wall"
    : wallPos === 2 ? "the wall to East's right"
    : wallPos === 3 ? "the wall across from East"
    : "the wall to East's left";

  const opening =
    pos === WALL_LEN
      ? `Counting ${pos} takes you through the entire ${wallLabel} wall — so dealing begins at ${WIND_LABELS[CW_NEXT[wall]]}'s wall instead.`
      : `Count ${pos} tiles from the right of that wall — that's where it opens.`;

  return `East rolled ${sum}. Count anti-clockwise from East's wall — East is 1, the player to East's right is 2, and so on. ${sum} lands on player ${wallPos} — ${relLabel} (${wallLabel}). ${opening}`;
}

export function DealHandsAction({ state, footer, back }: { state: DealHandsState; footer?: React.ReactNode; back?: React.ReactNode }) {
  const { phase, dice, diceSum, dealStep, breakInfo, nextTileCount, roll, startDeal, nextStep } = state;
  const isDealerJump = phase === 'dealing' && nextTileCount === 2;
  return (
    <div className="flex-1 flex flex-col gap-3">
      {phase === 'await-roll' && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-ui font-medium text-primary text-[13px]">Roll to break wall</div>
            {back}
          </div>
          <button type="button" onClick={roll}
            className="hover:opacity-75 transition-opacity cursor-pointer self-start"
            aria-label="Roll dice to break the wall">
            <Dice values={dice} size={22} />
          </button>
        </>
      )}
      {phase !== 'await-roll' && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-ui font-medium text-primary text-[13px]">Click &ldquo;Back&rdquo; to re-roll</div>
            {back}
          </div>
          <div className="flex items-center gap-3">
            <div className="opacity-40">
              <Dice values={dice} size={22} />
            </div>
            {diceSum > 0 && <span className="text-ui font-medium text-primary">{diceSum}</span>}
          </div>
        </>
      )}
      {phase === 'await-deal' && breakInfo && (
        <div className="rounded-lg border border-brand-green/20 bg-elev px-2.5 py-1.5">
          <div className="text-ui text-tertiary text-[11px]">Break point</div>
          <div className="text-ui font-medium text-primary text-[12px]">{WIND_LABELS[breakInfo.wall]} wall · {breakInfo.pos} from east (dealer)</div>
        </div>
      )}
      {phase === 'dealing' && (
        <div className="bg-elev border border-brand-green/20 rounded-lg px-2.5 py-1.5">
          <div className="text-ui font-medium text-primary text-[12px]">{DEAL_STEPS[dealStep - 1]?.label}</div>
        </div>
      )}
      {phase === 'dealt' && (
        <div className="bg-elev border border-brand-green/20 rounded-lg px-2.5 py-1.5">
          <div className="text-ui font-medium text-primary text-[12px]">All tiles dealt.</div>
        </div>
      )}
      <div className="border-t border-brand-green/20 pt-1">
        <p className="text-[11px] text-secondary leading-relaxed">
          {phase === 'await-deal' && breakInfo
            ? breakExplanation(diceSum, breakInfo.wall, breakInfo.pos)
            : isDealerJump
              ? 'East jumps — takes the 1st tile, skips the 2nd, then takes the 3rd. The skipped tile stays in place for North to draw next.'
              : PHASE_NOTES[phase]}
        </p>
      </div>
      <div className="flex-1 min-h-0" />
      <div className="border-t border-brand-green/20 pt-2">
        {phase === 'await-roll'  && footer}
        {phase === 'await-deal' && <PrimaryButton onClick={startDeal}>Start dealing</PrimaryButton>}
        {phase === 'dealing'    && <PrimaryButton onClick={nextStep}>Keep dealing</PrimaryButton>}
        {phase === 'dealt'      && footer}
      </div>
    </div>
  );
}
