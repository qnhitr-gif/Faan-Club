'use client';

import { useState, useMemo } from 'react';
import type { WindValue } from '@/lib/tiles';
import { WallsBuiltView } from './DealHands';
import { PickSeats } from './PickSeats';
import { PrimaryButton } from './PrimaryButton';

// Sunflower spiral filling the diamond (|x|+|y| ≤ 170px)
const PHI = (1 + Math.sqrt(5)) / 2;
const TILE_COUNT = 144;
const BASE_TILES = Array.from({ length: TILE_COUNT }, (_, i) => {
  const angle = i * 2 * Math.PI / PHI;
  const maxR = 180 / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
  const r = Math.sqrt(i / TILE_COUNT) * maxR;
  const rot = (Math.sin(i * 47.3 + 13.7) * 43758.5453 % 1) * 180 - 90;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
    r: rot,
  };
});

export interface BuildWallsStateType {
  shuffleCount: number;
  wallsBuilt: boolean;
  animKey: number;
  canBuild: boolean;
  shuffle: () => void;
  buildWalls: () => void;
  reset: () => void;
}

export function useBuildWalls(): BuildWallsStateType {
  const [shuffleCount, setShuffleCount] = useState(0);
  const [wallsBuilt, setWallsBuilt] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  function shuffle() {
    if (wallsBuilt || shuffleCount >= 3) return;
    setShuffleCount(c => c + 1);
    setAnimKey(k => k + 1);
  }

  function buildWalls() { setWallsBuilt(true); }

  function reset() {
    setShuffleCount(0);
    setWallsBuilt(false);
    setAnimKey(0);
  }

  return { shuffleCount, wallsBuilt, animKey, canBuild: shuffleCount >= 3, shuffle, buildWalls, reset };
}

function rand(seed: number): number {
  return Math.abs((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1);
}

function TilePile({ animKey, onClick, done }: { animKey: number; onClick: () => void; done: boolean }) {
  const tiles = useMemo(() => {
    if (animKey === 0) return BASE_TILES.map(t => ({ x: t.x, y: t.y, r: t.r }));
    return BASE_TILES.map((_, i) => {
      const seed = animKey * 7919 + i * 137;
      const angle = rand(seed) * Math.PI * 2;
      const maxR = 180 / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
      const r = Math.sqrt(rand(seed + 1)) * maxR;
      const rot = (rand(seed + 2) * 2 - 1) * 90;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        r: rot,
      };
    });
  }, [animKey]);

  return (
    <div
      className={`absolute inset-0 select-none ${done ? '' : 'cursor-pointer'}`}
      onClick={done ? undefined : onClick}
      role={done ? undefined : 'button'}
      aria-label={done ? undefined : 'Click to shuffle tiles'}
      tabIndex={done ? undefined : 0}
      onKeyDown={done ? undefined : (e) => { if (e.key === 'Enter') onClick(); }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          className="absolute rounded-[2px] transition-all duration-300"
          style={{
            width: 22,
            height: 30,
            background: '#235836',
            boxShadow: 'inset 0 0 0 1px rgba(36,68,22,0.5)',
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px)) rotate(${t.r}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function BuildWallsDisplay({ yourSeat, state }: { yourSeat: WindValue; state: BuildWallsStateType }) {
  const { wallsBuilt, animKey, shuffle, canBuild } = state;

  if (wallsBuilt) {
    return (
      <div className="relative" style={{ overflow: 'visible' }}>
        <WallsBuiltView yourSeat={yourSeat} />
      </div>
    );
  }

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      <PickSeats yourSeat={yourSeat} />
      <TilePile animKey={animKey} onClick={shuffle} done={canBuild} />
    </div>
  );
}

export function BuildWallsAction({
  state,
  onContinue,
  back,
}: {
  state: BuildWallsStateType;
  onContinue: () => void;
  back: () => void;
}) {
  const { wallsBuilt, canBuild, buildWalls } = state;

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-ui font-medium text-primary text-[13px]">
          {wallsBuilt ? '4 walls · 18 × 2' : 'Click tiles to shuffle'}
        </div>
        <button type="button" onClick={back} className="text-ui text-[11px] text-tertiary hover:text-primary">←</button>
      </div>

      {wallsBuilt && (
        <div className="bg-elev border border-brand-green/20 rounded-lg px-2.5 py-1.5">
          <div className="text-ui font-medium text-primary text-[12px]">Walls are set.</div>
        </div>
      )}

      <div className="border-t border-brand-green/20 pt-1">
        <p className="text-[11px] text-secondary leading-relaxed">
          {wallsBuilt
            ? 'Each player built a wall 18 tiles wide and 2 tiles high. Together they form a closed square.'
            : 'Shuffle all tiles face-down so no one knows what’s where. Click the pile 3 times to mix them up.'}
        </p>
      </div>

      <div className="flex-1 min-h-0" />

      <div className="border-t border-brand-green/20 pt-2">
        {wallsBuilt
          ? <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
          : <PrimaryButton onClick={buildWalls} disabled={!canBuild}>Build walls</PrimaryButton>
        }
      </div>
    </div>
  );
}
