'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PrimaryButton } from './PrimaryButton';
import type { TileFace, WindValue } from '@/lib/tiles';
import { SuitFace } from '@/components/tile/TileFaces';
import { WallsWithBreak } from './DealHands';
import { MahjongMat } from './MahjongMat';

const OFF = 18;
const WALL_PX = 305;
const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const WIND_SHORT: Record<WindValue, string> = { east: 'E', south: 'S', west: 'W', north: 'N' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW: WindValue[] = ['east', 'south', 'west', 'north'];
const FIXED_BREAK = { wall: 'east' as WindValue, pos: 7 };

function rotateSeat(seat: WindValue, n: number): WindValue {
  return CCW[(CCW.indexOf(seat) + n) % 4];
}

// ─── Tile shorthand ────────────────────────────────────────────────────────────
export function t(s: string): TileFace {
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
  if (/^S\d+$/.test(s)) return { suit: 'season', value: parseInt(s.slice(1)) as any };
  throw new Error(`Unknown tile: ${s}`);
}
export function ts(...ns: string[]): TileFace[] { return ns.map(t); }

// ─── SVG tile components ───────────────────────────────────────────────────────
function HandTile({ face }: { face: TileFace }) {
  return (
    <svg width={29} height={40} viewBox="0 0 60 84" aria-hidden
      style={{ width: 29, height: 40, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function MeldTile({ face }: { face: TileFace }) {
  return (
    <svg width={26} height={36} viewBox="0 0 60 84" aria-hidden
      style={{ width: 26, height: 36, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function SmallTile({ face, flower }: { face: TileFace; flower?: boolean }) {
  return (
    <svg width={17} height={23} viewBox="0 0 60 84" aria-hidden
      style={{ width: 17, height: 23, display: 'block', flexShrink: 0, filter: flower ? 'drop-shadow(0 0 1.5px #C8A86B)' : undefined }}>
      <SuitFace face={face} />
    </svg>
  );
}

function DiscardTile({ face }: { face: TileFace }) {
  return (
    <svg width={22} height={30} viewBox="0 0 60 84" aria-hidden
      style={{ width: 22, height: 30, display: 'block', flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function ActionTile({ face, flower }: { face: TileFace; flower?: boolean }) {
  return (
    <svg width={22} height={30} viewBox="0 0 60 84" aria-hidden style={{ flexShrink: 0, filter: flower ? 'drop-shadow(0 0 1.5px #C8A86B)' : undefined }}>
      <SuitFace face={face} />
    </svg>
  );
}

function PlaceholderTile() {
  return (
    <svg width={29} height={40} viewBox="0 0 60 84" aria-hidden
      style={{ width: 29, height: 40, display: 'block', flexShrink: 0, opacity: 0.22 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
    </svg>
  );
}

// ─── Script ───────────────────────────────────────────────────────────────────
export type EventAction = 'deal' | 'draw' | 'draw-flower' | 'draw-back' | 'discard' | 'pong' | 'win';

export interface ScriptStep {
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
  winGroups?: TileFace[][];
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD','EW'),
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD'),
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD'),
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD'),
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD'),
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
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c','WD','WD'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: NM(),
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: ts('WD') },
  },
  // 9 — South pongs WD (WD removed from North's discard pile — claimed)
  {
    player: 'south', action: 'pong', tile: t('WD'),
    label: 'South pongs White Dragon!',
    note: 'South has two White Dragons in hand — claims North\'s discard to complete the pong.',
    frontDraws: 3, backDraws: 1,
    hands: {
      east:  ts('3b','7b','8b','9b','2d','4d','5d','6d','2c','4c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','3d','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','7d','8d','1c','1c','5c','8c','SW'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','9c','EW','SW','WW','NW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW'), west: ts('WW'), north: [] },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW'), north: [] },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW'), north: [] },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: [] },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: [] },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('NW') },
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
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('NW') },
  },
  // 16 — East discards 3b
  {
    player: 'east', action: 'discard', tile: t('3b'),
    label: 'East discards 3 Bamboo',
    frontDraws: 6, backDraws: 1,
    hands: {
      east:  ts('7b','8b','9b','2d','4d','5d','6d','2c','4c','5c','6c','NW','GD'),
      south: ts('1b','2b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD','3b'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('NW') },
  },
  // 17 — South wins (3b claimed from East's discard — removed from pile)
  {
    player: 'south', action: 'win', tile: t('3b'),
    label: 'South wins!',
    note: 'South claims East\'s 3 Bamboo to complete 1b–2b–3b and finish the hand.',
    frontDraws: 6, backDraws: 1,
    hands: {
      east:  ts('7b','8b','9b','2d','4d','5d','6d','2c','4c','5c','6c','NW','GD'),
      south: ts('1b','2b','3b','4b','5b','6b','7d','8d','9d','3c','3c'),
      west:  ts('1b','3b','5b','6b','2d','3d','4d','7d','8d','1c','1c','5c','8c'),
      north: ts('4b','6b','9b','1d','9d','2c','4c','7c','8c','9c','EW','SW','WW'),
    },
    melds: { east: [], south: [ts('WD','WD','WD')], west: [], north: [] },
    flowers: { east: [], south: ts('F2'), west: [], north: [] },
    discards: { east: ts('RD'), south: ts('EW','3d'), west: ts('WW','SW'), north: ts('NW') },
    winGroups: [
      ts('1b','2b','3b'),
      ts('4b','5b','6b'),
      ts('7d','8d','9d'),
      ts('WD','WD','WD'),
      ts('3c','3c'),
    ],
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
export interface RoundDemoState {
  step: number;
  isComplete: boolean;
  current: ScriptStep;
  total: number;
  script: ScriptStep[];
  next: () => void;
  prev: () => void;
  replay: () => void;
  resetRound: () => void;
}

export function useRoundDemo(customScript?: ScriptStep[]): RoundDemoState {
  const script = customScript ?? SCRIPT;
  const [step, setStep] = useState(0);
  const isComplete = step >= script.length - 1;
  return {
    step, isComplete,
    current: script[step],
    total: script.length,
    script,
    next: () => setStep(s => Math.min(s + 1, script.length - 1)),
    prev: () => setStep(s => Math.max(s - 1, 0)),
    replay: () => setStep(0),
    resetRound: () => setStep(0),
  };
}

// ─── Action panel ─────────────────────────────────────────────────────────────
export function RoundDemoAction({ state, footer }: { state: RoundDemoState; footer?: React.ReactNode }) {
  const { current, step, isComplete, next, replay } = state;
  return (
    <div className="bg-elev border border-brand-green/20 rounded-xl px-4 py-3 flex flex-row items-center gap-4 flex-wrap">
      <ActionCard current={current} step={step} isComplete={isComplete} />
      {!isComplete ? (
        <button type="button" onClick={next}
          className="px-3 py-1.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep shrink-0">
          Next →
        </button>
      ) : (
        <button type="button" onClick={replay}
          className="px-3 py-1.5 rounded-md border border-brand-green/40 text-brand-green text-ui font-medium hover:bg-brand-green/10 shrink-0">
          Replay
        </button>
      )}
      {footer && <div className="ml-auto shrink-0">{footer}</div>}
    </div>
  );
}

// ─── Game log ─────────────────────────────────────────────────────────────────
const ACTION_DOT: Record<EventAction, string> = {
  deal:        'bg-secondary',
  draw:        'bg-brand-inkBlue',
  'draw-flower': 'bg-amber-500',
  'draw-back': 'bg-amber-400',
  discard:     'bg-brand-inkRed',
  pong:        'bg-amber-500',
  win:         'bg-brand-green',
};

export function GameLog({ state, footer, onRestart, back }: { state: RoundDemoState; footer?: React.ReactNode; onRestart?: () => void; back?: React.ReactNode }) {
  const entries = state.script.slice(0, state.step + 1);
  const { current, isComplete, next, replay } = state;

  const [restartLocked, setRestartLocked] = useState(false);
  const wasComplete = useRef(false);
  useEffect(() => {
    if (isComplete && !wasComplete.current) {
      wasComplete.current = true;
      setRestartLocked(true);
      const t = setTimeout(() => setRestartLocked(false), 2000);
      return () => clearTimeout(t);
    }
    if (!isComplete) wasComplete.current = false;
  }, [isComplete]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* top half — scrollable log */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-tertiary">Game log</div>
          {back}
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col-reverse gap-0.5">
          {[...entries].reverse().map((entry, i) => {
            const isCurrent = i === 0;
            const stepNum = entries.length - 1 - i;
            return (
              <div key={stepNum}
                className={`px-2 py-1.5 rounded text-[11px] leading-snug ${isCurrent ? 'bg-brand-green/10' : ''}`}>
                <span className={isCurrent ? 'text-primary' : 'text-secondary'}>
                  <span className="font-medium text-tertiary">Step {stepNum}</span>
                  {' '}<span className="font-medium">{WIND_SHORT[entry.player]}</span>
                  {' '}{entry.label.replace(/^(East|South|West|North)\s+/, '')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-brand-green/20 my-3 shrink-0" />

      {/* bottom half — explanation */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-tertiary mb-1.5">Explanation</div>
        <div className="flex-1 overflow-y-auto min-h-0">
          {current.note
            ? <p className="text-[11px] text-secondary leading-relaxed">{current.note}</p>
            : <p className="text-[11px] text-tertiary italic">—</p>
          }
        </div>
      </div>

      {/* bottom actions */}
      <div className="shrink-0 pt-3 mt-3 border-t border-brand-green/20">
        {!isComplete ? (
          <PrimaryButton onClick={next}>Continue</PrimaryButton>
        ) : (
          <button type="button" onClick={onRestart ?? replay} disabled={restartLocked}
            className="w-full px-3 py-1.5 rounded-md border border-brand-green/40 text-brand-green text-ui font-medium hover:bg-brand-green/10 text-center disabled:opacity-40 disabled:cursor-not-allowed">
            Restart tutorial
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Player area ──────────────────────────────────────────────────────────────
const BADGE_CLS = 'text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded whitespace-nowrap';
const PILL_W = 115;

function PlayerArea({ wind, you, reverse, hand, melds, flowers, isActive, drawnIdx, winGroups, topRow }: {
  wind: WindValue; you?: boolean; reverse?: boolean;
  hand: TileFace[]; melds: TileFace[][]; flowers: TileFace[];
  isActive?: boolean; drawnIdx?: number; winGroups?: TileFace[][]; topRow?: boolean;
}) {
  const [meldFlash, setMeldFlash] = useState(false);
  const prevMeldsLen = useRef(0);
  useEffect(() => {
    if (melds.length > prevMeldsLen.current) {
      setMeldFlash(true);
      const timer = setTimeout(() => setMeldFlash(false), 2000);
      prevMeldsLen.current = melds.length;
      return () => clearTimeout(timer);
    }
    prevMeldsLen.current = melds.length;
  }, [melds.length]);

  const pillGlow: React.CSSProperties = isActive
    ? { boxShadow: '0 0 10px rgba(245,158,11,0.8), 0 0 4px rgba(245,158,11,0.5)' }
    : {};

  const badges = (
    <>
      {you && <span className={BADGE_CLS}>you</span>}
      {wind === 'east' && <span className={BADGE_CLS}>dealer</span>}
    </>
  );

  const pill = (
    <span
      style={{ ...pillGlow, minWidth: PILL_W, display: 'inline-block' }}
      className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
        you ? 'bg-brand-green text-brand-cream' : 'border border-brand-green/30 text-secondary'
      } ${isActive ? 'ring-1 ring-amber-400/80' : ''}`}
    >
      <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
      {' · '}{WIND_LABELS[wind]}
    </span>
  );

  const flowerTiles = flowers.length > 0 ? (
    <div className="flex gap-1">
      {flowers.map((f, i) => <SmallTile key={i} face={f} flower />)}
    </div>
  ) : null;

  function centeredRow(children: React.ReactNode) {
    return (
      <div style={{ width: PILL_W, overflow: 'visible', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    );
  }

  const pillRow = reverse ? (
    <div className="relative w-fit">
      <div className="absolute right-full inset-y-0 flex items-center gap-1 pr-1.5">
        {flowerTiles}
      </div>
      <div className="absolute left-full inset-y-0 flex items-center gap-1 pl-1.5">
        {badges}
      </div>
      {pill}
    </div>
  ) : (
    <div className="flex items-center gap-1">
      {flowerTiles}
      {pill}
      {badges}
    </div>
  );

  const handRow = centeredRow(
    <div className="flex gap-px items-end py-0.5">
      {hand.map((face, i) => {
        const floating = drawnIdx !== undefined && drawnIdx >= 0 && i === drawnIdx;
        return floating ? (
          <div key={i} style={{ marginLeft: 6, flexShrink: 0, transform: 'translateY(-5px)', filter: 'drop-shadow(0 4px 8px rgba(245,158,11,0.7))' }}>
            <HandTile face={face} />
          </div>
        ) : <HandTile key={i} face={face} />;
      })}
    </div>
  );

  // Meld row: zero height so it doesn't push hand or pill position
  const meldRow = melds.length > 0 ? (
    <div style={{ height: 0, overflow: 'visible', alignSelf: reverse ? 'flex-end' : 'flex-start' }}>
      <div style={{ paddingTop: 5 }}>
        <style>{`
          @keyframes meldPong {
            0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
            15%  { box-shadow: 0 0 18px 5px rgba(245,158,11,0.85); }
            100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
          }
        `}</style>
        <div style={{ width: PILL_W, overflow: 'visible', display: 'flex', justifyContent: 'flex-start' }}>
          <div
            className="flex gap-1 items-center py-0.5"
            style={{ animation: meldFlash ? 'meldPong 2s ease-out forwards' : 'none', borderRadius: 4 }}
          >
            {melds.map((meld, mi) => (
              <div key={mi} className="flex gap-px">
                {meld.map((face, ti) => <MeldTile key={ti} face={face} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (winGroups) {
    const sets = winGroups.slice(0, -1);
    const pair = winGroups[winGroups.length - 1];
    const winGroupEl = (group: TileFace[], key: number) => (
      <div key={key} className="flex" style={{ gap: 0, borderBottom: '2px solid #235836', paddingBottom: 2 }}>
        {group.map((face, ti) => <HandTile key={ti} face={face} />)}
      </div>
    );
    return (
      <div className={`flex flex-col ${reverse ? 'items-end' : 'items-start'}`}>
        <div style={{ marginBottom: 6 }}>{pillRow}</div>
        <div style={{ position: 'relative' }}>
          <div style={{ visibility: 'hidden' }}>{handRow}</div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {sets.map((g, gi) => winGroupEl(g, gi))}
              {winGroupEl(pair, sets.length)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${reverse ? 'items-end' : 'items-start'}`}>
      <div style={{ marginBottom: 6 }}>{pillRow}</div>
      {handRow}
      {meldRow}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function RoundDemo({ yourSeat, state, breakInfo }: {
  yourSeat: WindValue;
  state: RoundDemoState;
  breakInfo?: { wall: WindValue; pos: number };
}) {
  const breakPoint = breakInfo ?? FIXED_BREAK;
  const { current } = state;
  const { hands, melds, flowers, discards, player } = current;

  const [showGameEnd, setShowGameEnd] = useState(false);
  const gameEndShown = useRef(false);
  useEffect(() => {
    if (state.isComplete && !gameEndShown.current) {
      gameEndShown.current = true;
      setShowGameEnd(true);
      const t = setTimeout(() => setShowGameEnd(false), 2000);
      return () => clearTimeout(t);
    }
    if (!state.isComplete) gameEndShown.current = false;
  }, [state.isComplete]);

  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);

  function pa(wind: WindValue, you?: boolean, reverse?: boolean, topRow?: boolean) {
    const isActive = player === wind;
    const h = hands[wind];
    const isDrawAction = isActive && (current.action === 'draw' || current.action === 'draw-back');
    let drawnIdx = -1;
    if (isDrawAction && current.tile) {
      const { suit, value } = current.tile;
      drawnIdx = h.findIndex(f => f.suit === suit && f.value === value);
    }
    const winGroups = (current.action === 'win' && player === wind) ? current.winGroups : undefined;
    return (
      <PlayerArea
        wind={wind} you={you} reverse={reverse}
        hand={h} melds={melds[wind]}
        flowers={flowers[wind]}
        isActive={isActive}
        drawnIdx={drawnIdx}
        winGroups={winGroups}
        topRow={topRow}
      />
    );
  }

  const MAT_OFFSET = 31;
  const MAT_SIZE = 305;

  const DISCARD_SEED: Record<WindValue, number> = { east: 3, south: 11, west: 17, north: 7 };

  function discardPile(wind: WindValue) {
    const seed = DISCARD_SEED[wind];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {discards[wind].map((d, i) => {
          const rot  = ((i * 41 + seed * 13) % 28) - 14;
          const tx   = ((i * 19 + seed *  7) % 10) - 5;
          const ty   = ((i * 29 + seed * 11) %  8) - 4;
          return (
            <div key={i} style={{ flexShrink: 0, transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)` }}>
              <DiscardTile face={d} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center" style={{ position: 'relative' }}>
      {showGameEnd && (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(20,30,20,0.82)', borderRadius: 20, padding: '28px 56px',
            backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{ color: '#F5F0E1', fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, textAlign: 'center', letterSpacing: '0.02em' }}>
              Game ended
            </div>
          </div>
        </div>
      )}
      <div className="grid gap-2" style={{
        gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
        gridTemplateColumns: '80px max-content 80px',
        gridTemplateRows: '80px max-content 80px',
      }}>
        <div style={{ gridArea: 'tl', marginLeft: '-90px', transform: 'translateY(14px)' }} className="flex flex-col items-start justify-end">
          {pa(leftWind, false, false, true)}
        </div>
        <div style={{ gridArea: 'tr', marginRight: '-90px', transform: 'translateY(14px)' }} className="flex flex-col items-end justify-end">
          {pa(topWind, false, true, true)}
        </div>
        <div style={{ gridArea: 'center', position: 'relative' }}>
          <MahjongMat className="p-3">
            <WallsWithBreak
              breakWall={breakPoint.wall} breakPos={breakPoint.pos}
              yourSeat={yourSeat} tilesDrawn={53}
              showDealArrow={false} showMarkers={true}
              nextTileCount={0} extraFront={current.frontDraws} extraBack={current.backDraws}
            />
          </MahjongMat>
          <div style={{
            position: 'absolute', left: MAT_OFFSET, top: MAT_OFFSET,
            width: MAT_SIZE, height: MAT_SIZE,
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'absolute', left: '50%', top: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>{discardPile(topWind)}</div>
            <div style={{ position: 'absolute', top: '50%', left: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>{discardPile(leftWind)}</div>
            <div style={{ position: 'absolute', top: '50%', right: 60, transform: 'translateY(-50%)', maxWidth: 110 }}>{discardPile(rightWind)}</div>
            <div style={{ position: 'absolute', left: '50%', bottom: 72, transform: 'translateX(-50%)', maxWidth: 110 }}>{discardPile(bottomWind)}</div>
          </div>
        </div>
        <div style={{ gridArea: 'bl', marginLeft: '-90px', transform: 'translateY(-14px)' }} className="flex flex-col items-start justify-start">
          {pa(bottomWind, true)}
        </div>
        <div style={{ gridArea: 'br', marginRight: '-90px', transform: 'translateY(-14px)' }} className="flex flex-col items-end justify-start">
          {pa(rightWind, false, true)}
        </div>
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
    return (
      <div className="flex flex-col gap-2 max-w-[200px]">
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg px-3 py-2">
          <div className="text-ui font-medium text-brand-green text-[12px]">{current.label}</div>
          {current.note && (
            <div className="text-ui text-tertiary text-[11px] mt-1 leading-snug">{current.note}</div>
          )}
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
