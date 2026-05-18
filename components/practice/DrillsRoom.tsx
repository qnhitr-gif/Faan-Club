'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DRILLS } from '@/lib/drills';
export type { DrillId } from '@/lib/drills';

const R    = '#b8302a';
const G8   = '#1c4a2a';
const G7   = '#235836';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

export function DrillsRoom() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const questionCount = loggedIn ? 10 : 5;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px 100px' }}>

      {/* Breadcrumb */}
      <div style={{ paddingTop: 32, marginBottom: 40, fontFamily: FF_M, fontSize: 12, color: INK3, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/kitchen" style={{ color: INK3, textDecoration: 'none' }}>Kitchen</Link>
        <span>/</span>
        <span style={{ color: INK2 }}>Drills</span>
      </div>

      {/* Header */}
      <header style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: R, flexShrink: 0 }} />
            <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: G8 }}>
              Section 01
            </span>
            <div style={{ height: 1, width: 32, background: '#c8d8c9', flexShrink: 0 }} />
          </div>
          <Link href="/kitchen/games" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK3 }}>Section 02</span>
            <span style={{ width: 1, height: 12, background: 'rgba(28,74,42,0.2)' }} />
            <span style={{ fontFamily: FF_S, fontSize: 14, fontWeight: 500, color: G7 }}>Interactive games →</span>
          </Link>
        </div>

        <h1 style={{
          fontFamily: FF_S, fontSize: 'clamp(36px, 4.5vw, 64px)',
          fontWeight: 500, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: INK, marginBottom: 16,
        }}>
          Pick a <em style={{ fontStyle: 'italic', color: G7 }}>drill.</em>
        </h1>
        <p style={{ fontFamily: FF_S, fontStyle: 'normal', fontSize: 18, lineHeight: 1.65, color: INK2, whiteSpace: 'nowrap' }}>
          Each one sharpens a different skill. {questionCount} questions, a few minutes, no setup.
        </p>
      </header>

      {/* Drill cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {DRILLS.map((d) => (
          <Link
            key={d.id}
            href={`/kitchen/drills/${d.id}`}
            style={{
              display: 'block', textDecoration: 'none',
              background: PW,
              border: '1px solid rgba(28,74,42,0.14)',
              borderRadius: 11,
              padding: '28px 28px 24px',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(28,74,42,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(28,74,42,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(28,74,42,0.14)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK3, marginBottom: 28 }}>
              {d.num}
            </div>

            <h2 style={{
              fontFamily: FF_D, fontWeight: 600,
              fontSize: 'clamp(24px, 2.2vw, 36px)',
              lineHeight: 1.05, letterSpacing: '-0.02em',
              color: INK, marginBottom: 12,
            }}>
              {d.label}{' '}
              <em style={{ color: R, fontStyle: 'italic' }}>{d.labelEm}</em>
            </h2>

            <p style={{
              fontFamily: FF_S, fontStyle: 'normal',
              fontSize: 14, lineHeight: 1.7, color: INK2,
              marginBottom: 28,
            }}>
              {d.detail}
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid rgba(28,74,42,0.1)', paddingTop: 16,
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.08em', color: INK3, background: 'rgba(28,74,42,0.06)', padding: '3px 8px', borderRadius: 3 }}>
                  {questionCount} questions
                </span>
                <span style={{ fontFamily: FF_M, fontSize: 10, letterSpacing: '0.08em', color: INK3, background: 'rgba(28,74,42,0.06)', padding: '3px 8px', borderRadius: 3 }}>
                  {d.time}
                </span>
              </div>
              <span style={{ fontFamily: FF_S, fontStyle: 'italic', fontSize: 13, fontWeight: 500, color: G7 }}>
                Start →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
