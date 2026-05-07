'use client';

import React, { useState } from 'react';
import type { WindValue } from '@/lib/tiles';
import { Dice, rollDie, type DiceValues } from './Dice';

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
const TILE     = 14;
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

// Arrow paths for gap tile (viewBox 0 0 14 14)
const ARROW_PATH: Record<string, string> = {
  left:  'M 11,7 L 4,7 M 4,7 L 7,4 M 4,7 L 7,10',
  right: 'M 3,7 L 10,7 M 10,7 L 7,4 M 10,7 L 7,10',
  up:    'M 7,11 L 7,4 M 7,4 L 4,7 M 7,4 L 10,7',
  down:  'M 7,3 L 7,10 M 7,10 L 4,7 M 7,10 L 10,7',
};

function GapTile({ dir }: { dir: 'left' | 'right' | 'up' | 'down' }) {
  return (
    <svg width={TILE} height={TILE} viewBox="0 0 14 14" aria-hidden>
      <rect width={14} height={14} rx={2} fill="#A0392E" />
      <path d={ARROW_PATH[dir]} stroke="#fff" strokeWidth={1.4} fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
      <rect width={14} height={14} rx={2} fill={next ? '#7bc458' : lit ? '#4a7a38' : '#3D6E2F'} />
      <rect x={1.5} y={1.5} width={11} height={11} rx={1.5} fill="none"
        stroke="#244416" strokeOpacity={next ? 0.15 : 0.4} strokeWidth={0.5} />
      <line x1={1.5} y1={7} x2={12.5} y2={7}
        stroke="#244416" strokeOpacity={next ? 0.1 : 0.25} strokeWidth={0.5} />
    </svg>
  );
}

function WallRow({ wall, breakWall, breakPos, drawDir, depleted, upcoming }: {
  wall: WindValue; breakWall: WindValue | null; breakPos: number;
  drawDir: 'left' | 'right' | 'up' | 'down'; depleted?: Set<number>; upcoming?: Set<number>;
}) {
  const active = breakWall === wall;
  const gapIdx = active ? WALL_LEN - breakPos : -1;
  return (
    <div className="flex" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) =>
        i === gapIdx         ? <GapTile key={i} dir={drawDir} />
          : depleted?.has(i) ? <EmptySlot key={i} />
          : <NormalTile key={i} lit={active} next={upcoming?.has(i)} />
      )}
    </div>
  );
}

function WallCol({ wall, breakWall, breakPos, drawDir, depleted, upcoming }: {
  wall: WindValue; breakWall: WindValue | null; breakPos: number;
  drawDir: 'left' | 'right' | 'up' | 'down'; depleted?: Set<number>; upcoming?: Set<number>;
}) {
  const active = breakWall === wall;
  const gapIdx = active ? WALL_LEN - breakPos : -1;
  return (
    <div className="flex flex-col" style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) =>
        i === gapIdx         ? <GapTile key={i} dir={drawDir} />
          : depleted?.has(i) ? <EmptySlot key={i} />
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
  const gapIdx = breakWall ? WALL_LEN - breakPos : -1;
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
  if (extraBack > 0) {
    for (const { wall, idx } of drawSeq.slice(Math.max(0, drawSeq.length - extraBack))) {
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
  const backSlot  = showMarkers && extraBack < drawSeq.length
    ? drawSeq[drawSeq.length - 1 - extraBack] : null;

  return (
    <div className="relative" style={{ width: GRID, height: GRID }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${TILE}px ${WALL_PX}px ${TILE}px`,
        gridTemplateRows: `${TILE}px ${WALL_PX}px ${TILE}px`,
        gap: 2,
      }}>
        <span /><WallRow wall={wpos.top}    breakWall={breakWall} breakPos={breakPos} drawDir={POS_DRAW_DIR.top}    depleted={depletedByWall[wpos.top]}    upcoming={upcomingByWall[wpos.top]} /><span />
        <WallCol wall={wpos.left}  breakWall={breakWall} breakPos={breakPos} drawDir={POS_DRAW_DIR.left}   depleted={depletedByWall[wpos.left]}   upcoming={upcomingByWall[wpos.left]} />
        <div style={{ width: WALL_PX, height: WALL_PX }} />
        <WallCol wall={wpos.right} breakWall={breakWall} breakPos={breakPos} drawDir={POS_DRAW_DIR.right}  depleted={depletedByWall[wpos.right]}  upcoming={upcomingByWall[wpos.right]} />
        <span /><WallRow wall={wpos.bottom} breakWall={breakWall} breakPos={breakPos} drawDir={POS_DRAW_DIR.bottom} depleted={depletedByWall[wpos.bottom]} upcoming={upcomingByWall[wpos.bottom]} /><span />
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
                <circle cx={fc.x} cy={fc.y} r={5.5} fill="rgba(61,110,47,0.25)" stroke="#3D6E2F" strokeWidth={1.5} />
                <text x={fta.x} y={fta.y} textAnchor={fta.anchor}
                  fontSize={7} fill="#3D6E2F" fontFamily="sans-serif" fontWeight="bold">front</text>
              </>
            );
          })()}
          {backSlot && (() => {
            const bpos = wallVisualPos(backSlot.wall, wpos);
            const bc   = tileCenterForPos(bpos, backSlot.idx);
            const bta  = drawHereTextAnchor(bpos, bc.x, bc.y);
            return (
              <>
                <circle cx={bc.x} cy={bc.y} r={5.5} fill="rgba(196,122,30,0.25)" stroke="#C47A1E" strokeWidth={1.5} />
                <text x={bta.x} y={bta.y} textAnchor={bta.anchor}
                  fontSize={7} fill="#C47A1E" fontFamily="sans-serif" fontWeight="bold">back</text>
              </>
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
          <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#3D6E2F" />
        </svg>
      ))}
    </span>
  );
}

function MiniBack() {
  return (
    <svg width={13} height={18} viewBox="0 0 60 84" aria-hidden
      style={{ width: 13, height: 18, display: 'block', flexShrink: 0 }}>
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
      {Array.from({ length: Math.min(count, 14) }).map((_, i) => <MiniBack key={i} />)}
    </div>
  );
}

function SeatArea({ wind, isYou, count, drawing, vertical }: {
  wind: WindValue; isYou: boolean; count: number; drawing: boolean; vertical?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1 justify-center">
        <span className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
          isYou ? 'bg-brand-green text-brand-cream' : 'text-secondary hairline border'
        }`}>
          <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
          {' · '}{WIND_LABELS[wind]}{isYou && ' · you'}
        </span>
        {wind === 'east' && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded whitespace-nowrap">dealer</span>
        )}
      </div>
      <HandStack count={count} highlight={isYou} drawing={drawing} vertical={vertical} />
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
    <div className="flex flex-col gap-3">
      <div className="grid gap-2" style={{
        gridTemplateAreas: '"top top top" "left center right" "bottom bottom bottom"',
        gridTemplateColumns: 'minmax(140px, 1fr) auto minmax(140px, 1fr)',
        gridTemplateRows: '60px auto 60px',
      }}>
        <div style={{ gridArea: 'top' }} className="flex flex-col items-center justify-end pb-2">
          <SeatArea wind={topWind} isYou={topWind === yourSeat} count={counts[topWind]} drawing={activeDrawers.includes(topWind)} />
        </div>
        <div style={{ gridArea: 'left' }} className="flex flex-col items-center justify-center pr-3">
          <SeatArea wind={leftWind} isYou={leftWind === yourSeat} count={counts[leftWind]} drawing={activeDrawers.includes(leftWind)} vertical />
        </div>
        <div style={{ gridArea: 'center' }}
          className="bg-brand-green/10 border border-brand-green/30 rounded-2xl p-3">
          <WallsWithBreak
            breakWall={breakInfo?.wall ?? null}
            breakPos={breakInfo?.pos ?? 0}
            yourSeat={yourSeat}
            tilesDrawn={tilesDrawnTotal}
            showDealArrow={phase === 'await-deal'}
            showMarkers={phase === 'dealt'}
            nextTileCount={nextTileCount}
          />
        </div>
        <div style={{ gridArea: 'right' }} className="flex flex-col items-center justify-center pl-3">
          <SeatArea wind={rightWind} isYou={rightWind === yourSeat} count={counts[rightWind]} drawing={activeDrawers.includes(rightWind)} vertical />
        </div>
        <div style={{ gridArea: 'bottom' }} className="flex flex-col items-center justify-start pt-2">
          <SeatArea wind={bottomWind} isYou={bottomWind === yourSeat} count={counts[bottomWind]} drawing={activeDrawers.includes(bottomWind)} />
        </div>
      </div>
    </div>
  );
}

export function DealHandsAction({ state, footer }: { state: DealHandsState; footer?: React.ReactNode }) {
  const { phase, dice, diceSum, dealStep, breakInfo, roll, startDeal, nextStep } = state;
  return (
    <div className="self-stretch bg-elev border border-brand-green/20 rounded-xl px-4 flex flex-col items-start gap-3 min-w-[190px] pt-[84px] md:pt-[92px] pb-4">
      {phase === 'await-roll' && (
        <>
          <div className="text-ui font-medium text-primary text-[13px] whitespace-nowrap">Roll to break wall</div>
          <button type="button" onClick={roll}
            className="hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Roll dice to break the wall">
            <Dice values={dice} size={22} />
          </button>
        </>
      )}
      {phase !== 'await-roll' && (
        <>
          <div className="text-ui font-medium text-primary text-[13px] whitespace-nowrap">Click &ldquo;Back&rdquo; to re-roll</div>
          <div className="flex items-center gap-3">
            <div className="opacity-40">
              <Dice values={dice} size={22} />
            </div>
            {diceSum > 0 && <span className="text-ui font-medium text-primary">{diceSum}</span>}
          </div>
        </>
      )}
      {phase === 'await-deal' && (
        <button type="button" onClick={startDeal}
          className="px-3 py-1.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep whitespace-nowrap">
          Start dealing
        </button>
      )}
      {phase === 'dealing' && (
        <>
          <button type="button" onClick={nextStep}
            className="px-3 py-1.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep">
            Keep dealing
          </button>
          <div className="bg-elev border border-brand-green/20 rounded-lg px-2.5 py-1.5 max-w-[160px]">
            <div className="text-ui font-medium text-primary text-[12px]">{DEAL_STEPS[dealStep - 1]?.label}</div>
          </div>
        </>
      )}
      {phase === 'await-deal' && breakInfo && (
        <div className="rounded-lg border border-brand-green/20 bg-elev px-2.5 py-1.5 max-w-[160px]">
          <div className="text-ui text-tertiary text-[11px]">Break point</div>
          <div className="text-ui font-medium text-primary text-[12px]">{WIND_LABELS[breakInfo.wall]} wall · {breakInfo.pos} from right</div>
        </div>
      )}
      {phase === 'dealt' && (
        <div className="bg-elev border border-brand-green/20 rounded-lg px-2.5 py-1.5">
          <div className="text-ui font-medium text-primary text-[12px]">All tiles dealt.</div>
        </div>
      )}
      {footer && <div className="mt-auto">{footer}</div>}
    </div>
  );
}
