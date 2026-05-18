'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { GamePlayer, useGamePlayer } from './GamePlayer';
import { InteractiveGame } from './InteractiveGame';
import { SetupStepper } from './SetupStepper';
import { RoundDemo, GameLog, useRoundDemo } from './RoundDemo';
import { STEPS as STEPS_SEVEN_PAIRS } from './data/game-script';
import { STEPS as STEPS_HF } from './data/game-south-hf-bamboo';
import type { GameSeat } from './data/types';
import { saveGameCompletion } from '@/lib/savedGames';

type GameMode = 'setup' | '0pt' | '3pt';

const MODES: { id: GameMode; label: string }[] = [
  { id: 'setup', label: 'Set up' },
  { id: '0pt',   label: '0-point game' },
  { id: '3pt',   label: '3-point min game' },
];

function ZeroPtGame() {
  const [phase, setPhase] = useState<'round' | 'game'>('round');
  const roundState = useRoundDemo();

  if (phase === 'game') return <AutoPlayGame mode="0pt" />;

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#2C2A26', marginBottom: 24 }}>
        Watch the first round. Step through a scripted round: players draw from the front wall, reveal flowers, and draw replacements from the back.
      </p>
      <div className="mb-6">
        <div className="rounded-lg bg-elev hairline-strong border px-6 pt-10 pb-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0 md:min-h-[483px]">
            <RoundDemo yourSeat="east" state={roundState} />
          </div>
          <div className="w-full md:w-[180px] shrink-0 md:self-stretch md:relative border-t md:border-t-0 md:border-l border-brand-green/20 pt-4 md:pt-0">
            <div className="md:absolute md:inset-0 md:pl-5 flex flex-col overflow-hidden">
              <GameLog
                state={roundState}
                onRestart={roundState.resetRound}
                footer={
                  <button
                    type="button"
                    onClick={() => setPhase('game')}
                    className="w-full rounded-md px-3 py-2 text-[11px] font-medium tracking-wider uppercase transition-colors"
                    style={{ fontFamily: 'var(--font-mono)', background: '#1c4a2a', color: '#faf6ec', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}
                  >
                    Continue to game →
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoPlayGame({ mode, userId }: { mode: '0pt' | '3pt'; userId?: string | null }) {
  const steps = mode === '0pt' ? STEPS_SEVEN_PAIRS : STEPS_HF;
  const seat  = (mode === '0pt' ? 'East' : 'South') as GameSeat;
  const state = useGamePlayer(steps);
  const meta  = mode === '0pt'
    ? { pattern: 'Seven Pairs', chinese: '七對',  fan: 5, winner: 'East',  breakdown: 'Seven Pairs (4) + Matching flower F1 (1)' }
    : { pattern: 'Half Flush · Bamboo', chinese: '混一色', fan: 7, winner: 'South', breakdown: 'Half Flush (3) + WD pung (1) + All Triplets (3)' };

  const savedRef = useRef(false);
  useEffect(() => {
    if (state.isFirst) { savedRef.current = false; return; }
    if (mode === '3pt' && state.isLast && userId && !savedRef.current) {
      savedRef.current = true;
      saveGameCompletion(userId, 'three-point-min', meta.winner, meta.fan, 'discard');
    }
  }, [state.isLast, state.isFirst]);

  return (
    <div>
      <GamePlayer state={state} yourSeat={seat} />
      <div className="mt-4 rounded-lg bg-elev hairline border p-4 flex flex-wrap gap-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Pattern</div>
          <div className="font-serif text-[15px] text-primary">{meta.pattern}</div>
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

export function GamesRoom({ userId }: { userId?: string | null }) {
  const [mode, setMode] = useState<GameMode>('setup');

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 pt-6 mb-7 text-[12px] text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
        <Link href="/kitchen" className="hover:text-primary">Practice</Link>
        <span>/</span>
        <span className="text-secondary">Interactive games</span>
      </div>

      {/* Eyebrow + section nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
            Section 02
          </span>
        </div>
        <Link href="/kitchen/drills" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: '#235836' }}>← Drills</span>
          <span style={{ width: 1, height: 12, background: 'rgba(28,74,42,0.2)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a7a6a' }}>Section 01</span>
        </Link>
      </div>

      <div className="flex items-start justify-between gap-6 mb-3">
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#16170f', marginBottom: 8 }}>
            Interactive games
          </h1>
        </div>

        {/* Pill nav — top right */}
        <div className="flex gap-1.5 flex-wrap justify-end shrink-0 mt-1">
          {MODES.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-full px-4 py-1.5 text-[12px] font-medium border transition-colors ${
                mode === m.id
                  ? 'bg-brand-green text-brand-cream border-brand-green'
                  : 'border-brand-green/30 text-secondary hover:border-brand-green/60 hover:text-primary'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {mode === 'setup' && <SetupStepper onComplete={() => setMode('0pt')} />}
      {mode === '0pt'   && <ZeroPtGame />}
      {mode === '3pt'   && (
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#2C2A26', marginBottom: 24 }}>
            Standard rules with a 3-faan floor. Watch how a winning hand is built and scored when there&apos;s a minimum to meet.
          </p>
          {userId ? (
            <AutoPlayGame mode="3pt" userId={userId} />
          ) : (
            <div style={{
              padding: '32px',
              borderRadius: 11,
              border: '1px solid rgba(28,74,42,0.14)',
              background: '#fcfaf3',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: '#2C2A26', marginBottom: 16 }}>
                Sign in to access the 3-point min game.
              </p>
              <a
                href="/login?next=/kitchen/games"
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: 6,
                  background: '#1c4a2a',
                  color: '#faf6ec',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                }}
              >
                Sign in →
              </a>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
