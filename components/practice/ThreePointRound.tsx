'use client';

import { useState } from 'react';
import { STEPS } from './data/game-script';
import { GamePlayer, useGamePlayer } from './GamePlayer';
import { InteractiveGame } from './InteractiveGame';

export function useThreePointRound() {
  return useGamePlayer(STEPS);
}

export function ThreePointRound() {
  const state = useThreePointRound();
  const [mode, setMode] = useState<'auto' | 'interactive'>('auto');

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex items-center gap-0 mb-5 rounded-lg overflow-hidden border border-brand-green/30 self-start w-fit">
        <button
          type="button"
          onClick={() => setMode('auto')}
          className={`px-4 py-2 text-[12px] font-medium transition-colors ${
            mode === 'auto'
              ? 'bg-brand-green text-brand-cream'
              : 'bg-transparent text-secondary hover:text-primary'
          }`}
        >
          Auto-play
        </button>
        <button
          type="button"
          onClick={() => setMode('interactive')}
          className={`px-4 py-2 text-[12px] font-medium transition-colors ${
            mode === 'interactive'
              ? 'bg-brand-green text-brand-cream'
              : 'bg-transparent text-secondary hover:text-primary'
          }`}
        >
          Interactive
        </button>
      </div>

      {mode === 'auto' ? (
        <>
          <GamePlayer state={state} yourSeat="East" />

          {/* Scoring breakdown */}
          <div className="mt-4 rounded-lg bg-elev hairline border p-4 flex flex-wrap gap-6">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Pattern</div>
              <div className="font-serif text-[15px] text-primary">Seven Pairs <span className="text-secondary text-[13px]">(七對)</span></div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Faan</div>
              <div className="font-serif text-[15px] text-brand-green font-medium">5 faan</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Winner</div>
              <div className="font-serif text-[15px] text-primary">East</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Breakdown</div>
              <div className="font-serif text-[13px] text-secondary">Seven Pairs (4) + Matching flower F1 (1)</div>
            </div>
          </div>
        </>
      ) : (
        <InteractiveGame />
      )}
    </div>
  );
}
