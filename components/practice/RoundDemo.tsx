'use client';

import React, { useState } from 'react';
import type { TileFace, WindValue } from '@/lib/tiles';
import { SuitFace } from '@/components/tile/TileFaces';
import { WallsWithBreak } from './DealHands';

const OFF = 16;
const WALL_PX = 269;
const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW: WindValue[] = ['east', 'south', 'west', 'north'];
const FIXED_BREAK = { wall: 'east' as WindValue, pos: 7 };

function rotateSeat(seat: WindValue, n: number): WindValue {
  return CCW[(CCW.indexOf(seat) + n) % 4];
}

// ─── Tile shorthand ────────────────────────────────────────────────────────────
function t(s: string): TileFace {
  if (/^\d+b$/.test(s)) return { suit: 'bamboo', value: parseInt(s) as any };
  if (/^\d+d$/.test(s)) return { suit: 'dot',    value: parseInt(s) as any };
  if (/^\d+c$/.test(s)) return { suit: 'character', value: parseInt(s) as any };
  const MAP: Record<string, TileFace> = {
    EW: { suit: 'wind', value: 'east'  }, SW: { suit: 'wind', value: 'south' },
    WW: { suit: 'wind', value: 'west'  }, NW: { suit: 'wind', value: 'north' },
    RD: { suit: 'dragon', value: 'red' }, GD: { suit: 'dragon', value: 'green' },
    WD: { suit: 'dragon', value: 'white' },
  };
  if (MAP[s]) return MAP[s];
  if (/^F\d+$/.test(s)) return { suit: 'flower', value: parseInt(s.slice(1)) as any };
  throw new Error(`Unknown tile: ${s}`);
}
function ts(...ns: string[]): TileFace[] { return ns.map(t); }

// ─── SVG tile components ───────────────────────────────────────────────────────
function HandTile({ face }: { face: TileFace }) {
  return (
    <svg width={11} height={15} viewBox="0 0 60 84" aria-hidden
      style={{ width: 11, height: 15, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
      <SuitFace face={face} />
    </svg>
  );
}

function MeldTile({ face }: { face: TileFace }) {
  return (
    <svg width={13} height={18} viewBox="0 0 60 84" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
      <SuitFace face={face} />
    </svg>
  );
}

function SmallTile({ face, flower }: { face: TileFace; flower?: boolean }) {
  return (
    <svg width={10} height={14} viewBox="0 0 60 84" aria-hidden
      style={{ width: 10, height: 14, display: 'block', flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill={flower ? '#C8A86B' : '#D4C5A2'} />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill={flower ? '#FFF8E8' : '#F5F0E1'} />
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
type EventAction = 'deal' | 'draw' | 'draw-flower' | 'draw-back' | 'discard' | 'pong' | 'win';

interface ScriptStep {
  player: WindValue;
  action: EventAction;
  tile?: TileFace;
  label: string;
  note?: string;
  frontDraws: number;
  backDraws: number;
  hands: Record<WindValue, TileFace[]>;
  melds: Record<WindValue, TileFace[][]>;
  flowers: Record<WindValue, TileFace[]>;
  discards: Record<WindValue, TileFace[]>;
}

// Deal state
const DH = {
  east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD','RD'),
  south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD','EW'),
  west:  ts('1b','3b','5b','2d','3d','7d','8d','1c','1c','5c','8c','SW','WW'),
  north: ts('4b','6b','9b','1d','9d','4c','7c','9c','WD','EW','SW','WW','NW'),
};
const NM = (): Record<WindValue, TileFace[][]> => ({ east: [], south: [], west: [], north: [] });
const NF = (): Record<WindValue, TileFace[]>   => ({ east: [], south: [], west: [], north: [] });
const ND = (): Record<WindValue, TileFace[]>   => ({ east: [], south: [], west: [], north: [] });

const SCRIPT: ScriptStep[] = [
  // 0 — Deal
  {
    player: 'east', action: 'deal',
    label: 'Deal complete. East has 14 tiles; others 13.',
    note: 'East goes first — no draw needed.',
    frontDraws: 0, backDraws: 0,
    hands: DH, melds: NM(), flowers: NF(), discards: ND(),
  },
  // 1 — East discards RD
  {
    player: 'east', action: 'discard', tile: t('RD'),
    label: 'East discards Red Dragon',
    frontDraws: 0, backDraws: 0,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: DH.south, west: DH.west, north: DH.north,
    },
    melds: NM(), flowers: NF(),
    discards: { east: ts('RD'), south: [], west: [], north: [] },
  },
  // 2 — South draws F2 (flower)
  {
    player: 'south', action: 'draw-flower', tile: t('F2'),
    label: 'South draws a flower tile! (F2)',
    note: 'Flowers are set aside immediately — South draws a replacement from the back wall next.',
    frontDraws: 1, backDraws: 0,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: DH.south, west: DH.west, north: DH.north,
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: [], west: [], north: [] },
  },
  // 3 — South draws 3d from back wall
  {
    player: 'south', action: 'draw-back', tile: t('3d'),
    label: 'South draws 3 Dot from the back wall',
    note: 'Replacement tiles always come from the back wall, not the front.',
    frontDraws: 1, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD','EW'),
      west: DH.west, north: DH.north,
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: [], west: [], north: [] },
  },
  // 4 — South discards EW
  {
    player: 'south', action: 'discard', tile: t('EW'),
    label: 'South discards East Wind',
    frontDraws: 1, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD'),
      west: DH.west, north: DH.north,
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: [], north: [] },
  },
  // 5 — West draws 6b
  {
    player: 'west', action: 'draw', tile: t('6b'),
    label: 'West draws 6 Bamboo',
    frontDraws: 2, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW','WW'),
      north: DH.north,
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: [], north: [] },
  },
  // 6 — West discards WW
  {
    player: 'west', action: 'discard', tile: t('WW'),
    label: 'West discards West Wind',
    frontDraws: 2, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: DH.north,
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: [] },
  },
  // 7 — North draws 2c
  {
    player: 'north', action: 'draw', tile: t('2c'),
    label: 'North draws 2 Character',
    frontDraws: 3, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','WD','EW','SW','WW','NW'),
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: [] },
  },
  // 8 — North discards WD
  {
    player: 'north', action: 'discard', tile: t('WD'),
    label: 'North discards White Dragon',
    frontDraws: 3, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c','WD','WD'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: ts('WD') },
  },
  // 9 — South pongs WD
  {
    player: 'south', action: 'pong', tile: t('WD'),
    label: 'South pongs White Dragon!',
    note: 'South has two White Dragons in hand — claims North\'s discard to complete the pong.',
    frontDraws: 3, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','3d','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: ts('WD') },
  },
  // 10 — South discards 3d
  {
    player: 'south', action: 'discard', tile: t('3d'),
    label: 'South discards 3 Dot',
    note: 'After a pong, the player must discard one tile before play continues.',
    frontDraws: 3, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW'), north: ts('WD') },
  },
  // 11 — West draws 4d
  {
    player: 'west', action: 'draw', tile: t('4d'),
    label: 'West draws 4 Dot',
    frontDraws: 4, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW'), north: ts('WD') },
  },
  // 12 — West discards SW
  {
    player: 'west', action: 'discard', tile: t('SW'),
    label: 'West discards South Wind',
    frontDraws: 4, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('WD') },
  },
  // 13 — North draws 8c
  {
    player: 'north', action: 'draw', tile: t('8c'),
    label: 'North draws 8 Character',
    frontDraws: 5, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('WD') },
  },
  // 14 — North discards NW
  {
    player: 'north', action: 'discard', tile: t('NW'),
    label: 'North discards North Wind',
    frontDraws: 5, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('WD','NW') },
  },
  // 15 — East draws 5c
  {
    player: 'east', action: 'draw', tile: t('5c'),
    label: 'East draws 5 Character',
    frontDraws: 6, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','5c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('WD','NW') },
  },
  // 16 — East discards 3b → South wins
  {
    player: 'south', action: 'win', tile: t('3b'),
    label: 'South wins! 胡 (Hu)!',
    note: 'East discards 3 Bamboo. South completes 1b–2b–3b to finish the hand.',
    frontDraws: 6, backDraws: 1,
    hands: {
      east:  ts('7b','8b','9b','2d','4d','5d','6d','2c','4c','5c','6c','NW','GD'),
      south: ts('1b','2b','3b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD','3b'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('WD','NW') },
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
export interface RoundDemoState {
  step: number;
  isComplete: boolean;
  current: ScriptStep;
  total: number;
  next: () => void;
  replay: () => void;
  resetRound: () => void;
}

export function useRoundDemo(): RoundDemoState {
  const [step, setStep] = useState(0);
  const isComplete = step >= SCRIPT.length - 1;
  return {
    step, isComplete,
    current: SCRIPT[step],
    total: SCRIPT.length,
    next: () => setStep(s => Math.min(s + 1, SCRIPT.length - 1)),
    replay: () => setStep(0),
    resetRound: () => setStep(0),
  };
}

// ─── Action panel ─────────────────────────────────────────────────────────────
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
function PlayerArea({ wind, you, hand, melds, flowers, action, isActive }: {
  wind: WindValue; you?: boolean;
  hand: TileFace[]; melds: TileFace[][]; flowers: TileFace[];
  action?: EventAction; isActive?: boolean;
}) {
  const ringClass = !isActive ? '' :
    action === 'draw-flower' ? 'ring-1 ring-amber-500 bg-amber-500/10' :
    action === 'pong'        ? 'ring-1 ring-amber-500 bg-amber-500/10' :
    action === 'win'         ? 'ring-2 ring-brand-green bg-brand-green/10' :
    'ring-1 ring-brand-green bg-brand-green/10';

  return (
    <div className="flex flex-col items-center gap-1">
      <SeatLabel wind={wind} you={you} />
      {flowers.length > 0 && (
        <div className="flex gap-px">
          {flowers.map((f, i) => <SmallTile key={i} face={f} flower />)}
        </div>
      )}
      <div className={`flex flex-wrap items-end gap-px px-1 py-0.5 rounded ${ringClass}`}>
        {hand.map((face, i) => <HandTile key={i} face={face} />)}
        {melds.map((meld, mi) => (
          <React.Fragment key={`m${mi}`}>
            <span style={{ display: 'inline-block', width: 4 }} />
            <div className="flex gap-px border-l border-brand-green/30 pl-1">
              {meld.map((face, ti) => <MeldTile key={ti} face={face} />)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function RoundDemo({ yourSeat, state }: { yourSeat: WindValue; state: RoundDemoState }) {
  const { current } = state;
  const { hands, melds, flowers, discards, player, action } = current;

  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);

  function pa(wind: WindValue, you?: boolean) {
    return (
      <PlayerArea
        wind={wind} you={you}
        hand={hands[wind]} melds={melds[wind]} flowers={flowers[wind]}
        action={action} isActive={player === wind}
      />
    );
  }

  function discardZone(wind: WindValue) {
    const tiles = discards[wind];
    if (!tiles.length) return null;
    return tiles.map((d, i) => <SmallTile key={i} face={d} />);
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
        {pa(topWind)}
      </div>

      <div style={{ gridArea: 'left' }} className="flex flex-col items-center justify-center pr-3">
        {pa(leftWind)}
      </div>

      <div style={{ gridArea: 'center' }}
        className="bg-brand-green/10 border border-brand-green/30 rounded-2xl p-3">
        <div className="relative">
          <WallsWithBreak
            breakWall={FIXED_BREAK.wall} breakPos={FIXED_BREAK.pos}
            yourSeat={yourSeat} tilesDrawn={53}
            showDealArrow={false} showMarkers={true}
            nextTileCount={0} extraFront={current.frontDraws} extraBack={current.backDraws}
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
        {pa(rightWind)}
      </div>

      <div style={{ gridArea: 'bottom' }} className="flex flex-col items-center justify-start pt-2">
        {pa(bottomWind, true)}
      </div>
    </div>
  );
}

// ─── Action card ──────────────────────────────────────────────────────────────
function ActionCard({ current, step, isComplete }: {
  current: ScriptStep; step: number; isComplete: boolean;
}) {
  if (step === 0) {
    return (
      <div className="max-w-[180px]">
        <div className="text-ui text-secondary text-[12px]">{current.label}</div>
        <div className="text-ui text-tertiary text-[11px] mt-0.5">{current.note}</div>
      </div>
    );
  }
  if (isComplete) {
    const { current: c } = { current };
    return (
      <div className="flex flex-col gap-2 max-w-[200px]">
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg px-3 py-2">
          <div className="text-ui font-medium text-brand-green text-[12px]">{current.label}</div>
          {current.note && (
            <div className="text-ui text-tertiary text-[11px] mt-1 leading-snug">{current.note}</div>
          )}
        </div>
        <div className="text-ui text-tertiary text-[11px] leading-snug">
          Meld: WD WD WD · Sets: 1b–3b, 4b–6b, 7d–9d · Pair: 3c
        </div>
      </div>
    );
  }
  if (current.action === 'draw-flower') {
    return (
      <div className="bg-amber-50/95 dark:bg-amber-950/80 border border-amber-400/50 rounded-lg px-3 py-2 flex items-start gap-2 max-w-[200px]">
        {current.tile && <ActionTile face={current.tile} flower />}
        <div>
          <div className="text-ui font-medium text-amber-700 dark:text-amber-300 text-[12px] leading-snug">{current.label}</div>
          {current.note && <div className="text-ui text-amber-600/80 dark:text-amber-400/80 text-[11px] mt-0.5 leading-snug">{current.note}</div>}
        </div>
      </div>
    );
  }
  if (current.action === 'pong') {
    return (
      <div className="bg-amber-50/95 dark:bg-amber-950/80 border border-amber-400/50 rounded-lg px-3 py-2 flex items-start gap-2 max-w-[200px]">
        {current.tile && <ActionTile face={current.tile} />}
        <div>
          <div className="text-ui font-medium text-amber-700 dark:text-amber-300 text-[12px] leading-snug">{current.label}</div>
          {current.note && <div className="text-ui text-amber-600/80 dark:text-amber-400/80 text-[11px] mt-0.5 leading-snug">{current.note}</div>}
        </div>
      </div>
    );
  }
  if (current.action === 'discard' || current.action === 'draw' || current.action === 'draw-back') {
    return (
      <div className="bg-elev border border-brand-green/20 rounded-lg px-3 py-2 flex items-start gap-2 max-w-[200px]">
        {current.tile && <ActionTile face={current.tile} />}
        <div>
          <div className="text-ui font-medium text-primary text-[12px] leading-snug">{current.label}</div>
          {current.note && <div className="text-ui text-tertiary text-[11px] mt-0.5 leading-snug">{current.note}</div>}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-elev border border-brand-green/20 rounded-lg px-3 py-2 max-w-[180px]">
      <div className="text-ui font-medium text-primary text-[12px]">{current.label}</div>
    </div>
  );
}
