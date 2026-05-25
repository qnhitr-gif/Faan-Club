'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { GamePlayer, useGamePlayer } from './GamePlayer';
import { STEPS as STEPS_CURATED } from './data/game-curated-3pt';
import type { GameSeat } from './data/types';
import { saveGameCompletion } from '@/lib/savedGames';

const meta = {
  pattern: 'Concealed',
  chinese: '門清',
  fan: 3,
  winner: 'West',
  winType: 'self_draw' as const,
  breakdown: 'Concealed (1) + Self-draw (1) + No Flowers (1)',
};

function AutoPlayGame({ userId }: { userId?: string | null }) {
  const seat  = 'East' as GameSeat;
  const state = useGamePlayer(STEPS_CURATED);

  const savedRef = useRef(false);
  useEffect(() => {
    if (state.isFirst) { savedRef.current = false; return; }
    if (state.isLast && userId && !savedRef.current) {
      savedRef.current = true;
      saveGameCompletion(userId, 'three-point-min', meta.winner, meta.fan, meta.winType);
    }
  }, [state.isLast, state.isFirst, userId]);

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

export function ThreePtRoom({ userId }: { userId?: string | null }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 pt-6 mb-7 text-[12px] text-tertiary" style={{ fontFamily: 'var(--font-mono)' }}>
        <Link href="/kitchen" className="hover:text-primary">Practice</Link>
        <span>/</span>
        <Link href="/kitchen/games" className="hover:text-primary">Interactive games</Link>
        <span>/</span>
        <span className="text-secondary">3-point min</span>
      </div>

      {/* Eyebrow + back link */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
            Section 02
          </span>
        </div>
        <Link href="/kitchen/games" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: '#235836' }}>← 0-point game</span>
          <span style={{ width: 1, height: 12, background: 'rgba(28,74,42,0.2)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a7a6a' }}>Section 02</span>
        </Link>
      </div>

      <div className="flex items-start justify-between gap-6 mb-3">
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#16170f', marginBottom: 8 }}>
            3-point min game
          </h1>
        </div>
      </div>

      {/* Content */}
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#2C2A26', marginBottom: 24 }}>
          Standard rules with a 3-faan floor. Watch how a winning hand is built and scored when there&apos;s a minimum to meet.
        </p>
        {userId ? (
          <AutoPlayGame userId={userId} />
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
              href="/login?next=/kitchen/games/three-point"
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

    </div>
  );
}
