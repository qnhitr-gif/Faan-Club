'use client';

import { useState } from 'react';
import { TileDrill } from './TileDrill';
import { PatternQuiz } from './PatternQuiz';
import { FanQuiz } from './FanQuiz';
import { GamePlayer, useGamePlayer } from './GamePlayer';
import { InteractiveGame } from './InteractiveGame';
import { SetupStepper } from './SetupStepper';
import { STEPS as STEPS_SEVEN_PAIRS } from './data/game-script';
import { STEPS as STEPS_HF } from './data/game-south-hf-bamboo';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Drill = 'efficiency' | 'patterns' | 'fan';
type GameMode = 'setup' | '0pt' | '3pt';

// ─── Auto-play game ────────────────────────────────────────────────────────────
function AutoPlayGame({ mode }: { mode: '0pt' | '3pt' }) {
  const steps  = mode === '0pt' ? STEPS_SEVEN_PAIRS : STEPS_HF;
  const seat   = mode === '0pt' ? 'East' : 'South';
  const state  = useGamePlayer(steps);
  const meta   = mode === '0pt'
    ? { pattern: 'Seven Pairs', chinese: '七對',  fan: 5, winner: 'East',  breakdown: 'Seven Pairs (4) + Matching flower F1 (1)' }
    : { pattern: 'Half Flush · Bamboo', chinese: '混一色', fan: 7, winner: 'South', breakdown: 'Half Flush (3) + WD pung (1) + All Triplets (3)' };

  return (
    <div>
      <GamePlayer state={state} yourSeat={seat as any} />
      <div className="mt-4 rounded-lg bg-elev hairline border p-4 flex flex-wrap gap-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Pattern</div>
          <div className="font-serif text-[15px] text-primary">{meta.pattern} <span className="text-secondary text-[13px]">({meta.chinese})</span></div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Faan</div>
          <div className="font-serif text-[15px] text-brand-green font-medium">{meta.fan} faan</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Winner</div>
          <div className="font-serif text-[15px] text-primary">{meta.winner}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Breakdown</div>
          <div className="font-serif text-[13px] text-secondary">{meta.breakdown}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="mb-6">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
          {label}
        </span>
      </div>
      <h2 className="font-serif text-[26px] font-medium text-primary mb-1 tracking-tight">{title}</h2>
      <p className="text-body text-secondary">{desc}</p>
    </div>
  );
}

// ─── Pill nav ──────────────────────────────────────────────────────────────────
function PillNav<T extends string>({
  options,
  active,
  onSelect,
}: {
  options: { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-6">
      {options.map(o => (
        <button
          key={o.id}
          type="button"
          onClick={() => onSelect(o.id)}
          className={`rounded-full px-4 py-1.5 text-[12px] font-medium border transition-colors ${
            active === o.id
              ? 'bg-brand-green text-brand-cream border-brand-green'
              : 'border-brand-green/30 text-secondary hover:border-brand-green/60 hover:text-primary'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main layout ───────────────────────────────────────────────────────────────
export function PracticeRoom() {
  const [drill, setDrill]     = useState<Drill>('efficiency');
  const [gameMode, setGameMode] = useState<GameMode>('setup');

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">

      {/* Page eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 64, marginBottom: 56 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1c4a2a' }}>
          Practice room
        </span>
        <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
      </div>

      {/* ── 1. Drills ── */}
      <section className="mb-20">
        <SectionHeader
          label="Section 01"
          title="Drills"
          desc="Short focused exercises to sharpen one skill at a time."
        />

        <PillNav<Drill>
          options={[
            { id: 'efficiency', label: 'Tile efficiency' },
            { id: 'patterns',   label: 'Pattern building' },
            { id: 'fan',        label: 'Faan calculation' },
          ]}
          active={drill}
          onSelect={setDrill}
        />

        {drill === 'efficiency' && <TileDrill />}
        {drill === 'patterns'   && <PatternQuiz />}
        {drill === 'fan'        && <FanQuiz />}
      </section>

      {/* Divider */}
      <div className="border-t border-brand-green/15 mb-20" />

      {/* ── 2. Interactive games ── */}
      <section>
        <SectionHeader
          label="Section 02"
          title="Interactive games"
          desc="Step through full rounds or play hands yourself."
        />

        <PillNav<GameMode>
          options={[
            { id: 'setup', label: 'Set up' },
            { id: '0pt',   label: '0-point game' },
            { id: '3pt',   label: '3-point min game' },
          ]}
          active={gameMode}
          onSelect={setGameMode}
        />

        {gameMode === 'setup' && <SetupStepper />}
        {gameMode === '0pt'   && <AutoPlayGame mode="0pt" />}
        {gameMode === '3pt'   && <AutoPlayGame mode="3pt" />}
      </section>

    </div>
  );
}
