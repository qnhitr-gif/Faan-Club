import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TileDrill } from '@/components/practice/TileDrill';
import { PatternQuiz } from '@/components/practice/PatternQuiz';
import { FanQuiz } from '@/components/practice/FanQuiz';
import { DRILLS } from '@/lib/drills';
import { createClient } from '@/lib/supabase/server';

const R    = '#b8302a';
const G7   = '#235836';
const INK  = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

export default async function DrillPage({ params }: { params: Promise<{ drill: string }> }) {
  const { drill } = await params;
  const idx = DRILLS.findIndex(d => d.id === drill);
  if (idx === -1) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? null;

  const current = DRILLS[idx];
  const next = DRILLS[idx + 1] ?? null;
  const prev = DRILLS[idx - 1] ?? null;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px 100px' }}>

      {/* Breadcrumb */}
      <div style={{ paddingTop: 32, marginBottom: 32, fontFamily: FF_M, fontSize: 12, color: INK3, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/kitchen" style={{ color: INK3, textDecoration: 'none' }}>Kitchen</Link>
        <span>/</span>
        <Link href="/kitchen/drills" style={{ color: INK3, textDecoration: 'none' }}>Drills</Link>
        <span>/</span>
        <span style={{ color: INK2 }}>{current.label} {current.labelEm}</span>
      </div>

      {/* Back + title */}
      <div style={{ marginBottom: 36 }}>
        <Link
          href="/kitchen/drills"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: FF_M, fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: INK3,
            textDecoration: 'none', marginBottom: 16,
            padding: '6px 12px',
            border: '1px solid rgba(28,74,42,0.15)',
            borderRadius: 6,
          }}
        >
          ← All drills
        </Link>
        <h1 style={{
          fontFamily: FF_S, fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 500, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: INK,
        }}>
          {current.label}{' '}
          <em style={{ fontStyle: 'italic', color: R }}>{current.labelEm}</em>
        </h1>
      </div>

      {/* Drill content */}
      {current.id === 'tile-efficiency' && <TileDrill userId={userId} />}
      {current.id === 'pattern-building' && <PatternQuiz userId={userId} />}
      {current.id === 'fan-calculation' && <FanQuiz userId={userId} />}

      {/* Drill footer nav */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 24, marginTop: 64,
        paddingTop: 28, borderTop: '1px solid rgba(28,74,42,0.12)',
      }}>
        {/* Prev */}
        <div>
          {prev ? (
            <Link href={`/kitchen/drills/${prev.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>
                ← Previous drill
              </div>
              <div style={{ fontFamily: FF_S, fontSize: 18, fontWeight: 500, color: G7 }}>
                {prev.label} <em style={{ fontStyle: 'italic' }}>{prev.labelEm}</em>
              </div>
            </Link>
          ) : (
            <Link href="/kitchen/drills" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>
                ← Back
              </div>
              <div style={{ fontFamily: FF_S, fontSize: 18, fontWeight: 500, color: G7 }}>
                All drills
              </div>
            </Link>
          )}
        </div>

        {/* Next */}
        <div style={{ textAlign: 'right' }}>
          {next ? (
            <Link href={`/kitchen/drills/${next.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: G7, marginBottom: 8 }}>
                Next drill →
              </div>
              <div style={{ fontFamily: FF_S, fontSize: 18, fontWeight: 500, color: G7 }}>
                {next.label} <em style={{ fontStyle: 'italic' }}>{next.labelEm}</em>
              </div>
            </Link>
          ) : (
            <Link href="/kitchen/games" style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: FF_M, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: G7, marginBottom: 8 }}>
                Up next →
              </div>
              <div style={{ fontFamily: FF_S, fontSize: 18, fontWeight: 500, color: G7 }}>
                Interactive <em style={{ fontStyle: 'italic' }}>games</em>
              </div>
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
