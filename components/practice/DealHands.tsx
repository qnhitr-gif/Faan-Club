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

// East=1,5,9,13,17 | South=2,6,10,14,18 | West=3,7,11,15 | North=4,8,12,16
const WALL_BY_SEAT: WindValue[] = ['east', 'south', 'west', 'north'];
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
const TILE     = 16;
const GAP      = 1;
const WALL_PX  = WALL_LEN * TILE + (WALL_LEN - 1) * GAP; // 269
const STEP     = TILE + GAP;                               // 15
const GRID     = TILE + 2 + WALL_PX + 2 + TILE;           // 301
const OFF      = TILE + 2;                                 // 16
const INNER    = OFF + WALL_PX;                            // 285

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
  const c = OFF + idx * STEP + TILE / 2;
  switch (pos) {
    case 'top':    return { x: c, y: TILE / 2 };
    case 'bottom': return { x: c, y: GRID - TILE / 2 };
    case 'right':  return { x: GRID - TILE / 2, y: c };
    case 'left':   return { x: TILE / 2, y: c };
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

function EmptySlot() {
  return (
    <svg width={TILE} height={TILE} viewBox="0 0 14 14" aria-hidden>
      <rect width={14} height={14} rx={2} fill="#0f1f0a" fillOpacity={0.5} />
    </svg>
  );
}

function NormalTile({ lit, next }: { lit?: boolean; next?: boolean }) {
  return (
    <svg width={TILE} height={TILE} viewBox="0 0 14 14" aria-hidden
      style={next ? { filter: 'drop-shadow(0 0 3px rgba(255,210,60,0.9))' } : undefined}>
      <rect width={14} height={14} rx={2} fill={next ? '#7bc458' : lit ? '#2d6b44' : '#235836'} />
      <rect x={1.5} y={1.5} width={11} height={11} rx={1.5} fill="none"
        stroke="#1c4a2a" strokeOpacity={next ? 0.15 : 0.4} strokeWidth={0.5} />
      <line x1={1.5} y1={7} x2={12.5} y2={7}
        stroke="#1c4a2a" strokeOpacity={next ? 0.1 : 0.25} strokeWidth={0.5} />
    </svg>
  );
}

function WallRow({ wall, breakWall, depleted, upcoming }: {
  wall: WindValue; breakWall: WindValue | null;
  depleted?: Set<number>; upcoming?: Set<number>;
}) {
  const active = breakWall === wall;
  return (
    <div className="flex" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) =>
        depleted?.has(i) ? <EmptySlot key={i} />
          : <NormalTile key={i} lit={active} next={upcoming?.has(i)} />
      )}
    </div>
  );
}

function WallCol({ wall, breakWall, depleted, upcoming }: {
  wall: WindValue; breakWall: WindValue | null;
  depleted?: Set<number>; upcoming?: Set<number>;
}) {
  const active = breakWall === wall;
  return (
    <div className="flex flex-col" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) =>
        depleted?.has(i) ? <EmptySlot key={i} />
          : <NormalTile key={i} lit={active} next={upcoming?.has(i)} />
      )}
    </div>
  );
}

export function WallsWithBreak({ breakWall, breakPos, yourSeat, tilesDrawn, showDealArrow, showMarkers, nextTileCount, extraFront = 0, extraBack = 0 }: {
  breakWall: WindValue | null; breakPos: number; yourSeat: WindValue; tilesDrawn: number;
  showDealArrow: boolean; showMarkers: boolean; nextTileCount: number;
  extraFront?: number; extraBack?: number;
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
  if (nextTileCount > 0) {
    const nextSlots = Math.ceil(nextTileCount / 2);
    for (const { wall, idx } of drawSeq.slice(slotsConsumed, slotsConsumed + nextSlots)) {
      if (!upcomingByWall[wall]) upcomingByWall[wall] = new Set();
      upcomingByWall[wall]!.add(idx);
    }
  }

  // Clockwise path: top-left → top-right → bottom-right → bottom-left → up
  const cwPath = `M ${OFF + 4},${OFF} L ${INNER},${OFF} L ${INNER},${INNER} L ${OFF},${INNER} L ${OFF},${INNER - 8}`;

  const labelData: Array<{ x: number; y: number; wall: WindValue; rotate?: string }> = [
    { x: GRID / 2, y: TILE / 2 + 3,          wall: wpos.top },
    { x: GRID / 2, y: GRID - TILE / 2 + 3,   wall: wpos.bottom },
    { x: GRID - TILE / 2, y: GRID / 2, wall: wpos.right, rotate: `rotate(90,${GRID - TILE / 2},${GRID / 2})` },
    { x: TILE / 2,        y: GRID / 2, wall: wpos.left,  rotate: `rotate(90,${TILE / 2},${GRID / 2})` },
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
        gridTemplateColumns: `${TILE}px ${WALL_PX}px ${TILE}px`,
        gridTemplateRows: `${TILE}px ${WALL_PX}px ${TILE}px`,
        gap: 2,
      }}>
        <span /><WallRow wall={wpos.top}    breakWall={breakWall} depleted={depletedByWall[wpos.top]}    upcoming={upcomingByWall[wpos.top]} /><span />
        <WallCol wall={wpos.left}  breakWall={breakWall} depleted={depletedByWall[wpos.left]}   upcoming={upcomingByWall[wpos.left]} />
        <div style={{ width: WALL_PX, height: WALL_PX }} />
        <WallCol wall={wpos.right} breakWall={breakWall} depleted={depletedByWall[wpos.right]}  upcoming={upcomingByWall[wpos.right]} />
        <span /><WallRow wall={wpos.bottom} breakWall={breakWall} depleted={depletedByWall[wpos.bottom]} upcoming={upcomingByWall[wpos.bottom]} /><span />
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

          {showDealArrow && (
            <path d={cwPath} stroke="#185FA5" strokeWidth={1.5} strokeDasharray="5 3"
              fill="none" strokeOpacity={0.7} markerEnd="url(#arr-blue)" strokeLinecap="round" />
          )}
          {showDealArrow && (
            <text x={OFF + 2} y={OFF - 3} textAnchor="start"
              fontSize={8} fill="#185FA5" fillOpacity={0.8} fontFamily="sans-serif">
              ↻ deal order
            </text>
          )}

          {dHere && (() => {
            const ta = drawHereTextAnchor(dHerePos, dHere.x, dHere.y);
            return (
              <text x={ta.x} y={ta.y} textAnchor={ta.anchor}
                fontSize={7} fill="#A0392E" fontFamily="sans-serif">
                draw here
              </text>
            );
          })()}

          {/* Front / back labels after dealing */}
          {frontSlot && (() => {
            const fpos = wallVisualPos(frontSlot.wall, wpos);
            const fc   = tileCenterForPos(fpos, frontSlot.idx);
            const fta  = drawHereTextAnchor(fpos, fc.x, fc.y);
            return (
              <>
                <circle cx={fc.x} cy={fc.y} r={5.5} fill="rgba(35,88,54,0.25)" stroke="#235836" strokeWidth={1.5} />
                <text x={fta.x} y={fta.y} textAnchor={fta.anchor}
                  fontSize={7} fill="#235836" fontFamily="sans-serif" fontWeight="bold">front</text>
              </>
            );
          })()}
          {backSlot && (() => {
            const bpos = wallVisualPos(backSlot.wall, wpos);
            const bc   = tileCenterForPos(bpos, backSlot.idx);
            const bta  = drawHereTextAnchor(bpos, bc.x, bc.y);
            return (
              <text x={bta.x} y={bta.y} textAnchor={bta.anchor}
                fontSize={7} fill="#C47A1E" fontFamily="sans-serif" fontWeight="bold">back</text>
            );
          })()}
        </svg>
      )}
    </div>
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
      {isYou && <span className={BADGE_CLS}>you</span>}
      {wind === 'east' && <span className={BADGE_CLS}>dealer</span>}
    </>
  );

  const pill = (
    <span style={{ minWidth: PILL_W, display: 'inline-block' }} className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
      isYou ? 'bg-brand-green text-brand-cream' : 'border border-brand-green/30 text-secondary'
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
          <SeatArea wind={leftWind} isYou={leftWind === yourSeat} count={counts[leftWind]} drawing={activeDrawers.includes(leftWind)} />
        </div>
        <div style={{ gridArea: 'tr', marginRight: '-44px' }} className="flex flex-col items-end justify-end">
          <SeatArea wind={topWind} isYou={topWind === yourSeat} count={counts[topWind]} drawing={activeDrawers.includes(topWind)} reverse />
        </div>
        <div style={{ gridArea: 'center' }}>
          <MahjongMat className="p-3">
            <WallsWithBreak
              breakWall={breakInfo?.wall ?? null}
              breakPos={breakInfo?.pos ?? 0}
              yourSeat={yourSeat}
              tilesDrawn={tilesDrawnTotal}
              showDealArrow={phase === 'await-deal'}
              showMarkers={phase === 'dealt'}
              nextTileCount={nextTileCount}
            />
          </MahjongMat>
        </div>
        <div style={{ gridArea: 'bl', marginLeft: '-44px' }} className="flex flex-col items-start justify-start">
          <SeatArea wind={bottomWind} isYou={bottomWind === yourSeat} count={counts[bottomWind]} drawing={activeDrawers.includes(bottomWind)} />
        </div>
        <div style={{ gridArea: 'br', marginRight: '-44px' }} className="flex flex-col items-end justify-start">
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
          <MahjongMat className="p-3">
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
  'dealt': 'All tiles dealt. East holds 14, everyone else 13. Any flower tiles drawn will be swapped for replacements from the back wall.',
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
  const { phase, dice, diceSum, dealStep, breakInfo, roll, startDeal, nextStep } = state;
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
          <div className="text-ui font-medium text-primary text-[12px]">{WIND_LABELS[breakInfo.wall]} wall · {breakInfo.pos} from right</div>
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
