'use client';

import { useEffect, useState } from 'react';
export const GUEST_QUESTIONS  = 5;
export const MEMBER_QUESTIONS = 10;

const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const G7   = '#235836';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

function getResetCountdown(): string {
  const now    = new Date();
  const estNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const midnight = new Date(estNow);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - estNow.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m} minutes`;
}

interface StatCard { label: string; value: string; sub: string; }

export function DailyLock({
  userId,
  noun = 'sessions',
  completedQuestions,
  stat1,
  stat2,
}: {
  userId: string | null;
  noun?: string;
  completedQuestions?: number;
  stat1: StatCard;
  stat2: StatCard;
}) {
  const [countdown, setCountdown] = useState(getResetCountdown());
  useEffect(() => {
    const id = setInterval(() => setCountdown(getResetCountdown()), 60_000);
    return () => clearInterval(id);
  }, []);

  const limit = completedQuestions ?? (userId ? MEMBER_QUESTIONS : GUEST_QUESTIONS);

  return (
    <div style={{ maxWidth: 480, paddingTop: 16 }}>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(28,74,42,0.15)' }} />
        <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: INK3 }}>
          daily limit
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(28,74,42,0.15)' }} />
      </div>

      <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 22, color: INK2, lineHeight: 1.5, marginBottom: 8, textAlign: 'center' }}>
        {limit} {noun} complete.
      </p>
      <p style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK3, textAlign: 'center', marginBottom: 42 }}>
        Resets at midnight EST &middot; {countdown} from now
      </p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
        {[stat1, stat2].map((s) => (
          <div key={s.label} style={{ background: PW, border: '1px solid rgba(28,74,42,0.12)', borderRadius: 10, padding: '18px 21px' }}>
            <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3, marginBottom: 9 }}>{s.label}</div>
            <div style={{ fontFamily: FF_D, fontStyle: 'italic', fontSize: 42, color: G7, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: FF_M, fontSize: 11, color: INK3, marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {!userId && (
        <div style={{ borderTop: '1px solid rgba(28,74,42,0.1)', paddingTop: 25, textAlign: 'center' }}>
          <p style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 16, color: INK3, marginBottom: 16 }}>
            Get {MEMBER_QUESTIONS} {noun} a day by logging in.
          </p>
          <a
            href="/login"
            style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: G7, textDecoration: 'none', border: '1px solid rgba(28,74,42,0.25)', borderRadius: 6, padding: '9px 18px' }}
          >
            Log in / Sign up →
          </a>
        </div>
      )}

    </div>
  );
}
