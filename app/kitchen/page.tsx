import Link from 'next/link';

export const metadata = { title: 'Kitchen — Faan Club' };

const R   = '#b8302a';
const G8  = '#1c4a2a';
const G7  = '#235836';
const INK = '#16170f';
const INK2 = '#2C2A26';
const INK3 = '#7a7a6a';
const RICE = '#faf6ec';
const PW   = '#fcfaf3';
const FF_D = 'var(--font-display), Georgia, serif';
const FF_S = 'var(--font-serif), Georgia, serif';
const FF_M = 'var(--font-mono), monospace';

const SECTIONS = [
  {
    href: '/kitchen/drills',
    number: '01',
    kicker: 'Focused reps',
    title: 'Drills',
    titleEm: null,
    desc: 'Short exercises that sharpen one skill at a time. Tile efficiency, pattern recognition, faan calculation — each drill takes under five minutes.',
    items: [
      { label: 'Tile efficiency', icon: '◈', desc: 'Learn which tiles to keep and which to drop.' },
      { label: 'Pattern building', icon: '◉', desc: 'Spot melds, pairs, and partial sets fast.' },
      { label: 'Faan calculation', icon: '◎', desc: 'Count your faan before you call the win.' },
    ],
    accent: G7,
    featured: false,
  },
  {
    href: '/kitchen/games',
    number: '02',
    kicker: 'Full rounds',
    title: 'Interactive',
    titleEm: 'games',
    desc: 'Step through a complete round from shuffle to win. Watch how seats are assigned, the wall is built, and every decision unfolds in real time.',
    items: [
      { label: 'Set up a game', icon: '⬡', desc: 'Dice rolls, seat winds, and building the wall.' },
      { label: '0-point round', icon: '⬡', desc: 'A full hand with no minimum — just learn the flow.' },
      { label: '3-point min', icon: '⬡', desc: 'Standard rules with a faan floor to win.' },
    ],
    accent: R,
    featured: true,
  },
];

export default function PracticePage() {
  return (
    <div style={{ background: RICE, minHeight: '100vh' }}>
      <style>{`
        .kitchen-card {
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .kitchen-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(28,74,42,0.13);
          border-color: rgba(28,74,42,0.35) !important;
        }
        .kitchen-card-green:hover {
          box-shadow: 0 12px 32px rgba(28,74,42,0.25);
          border-color: transparent !important;
        }
        .kitchen-card .card-arrow {
          transition: transform 0.18s ease;
        }
        .kitchen-card:hover .card-arrow {
          transform: translateX(4px);
        }
      `}</style>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px 100px' }}>

        {/* ── Header ── */}
        <header style={{ paddingTop: 64, paddingBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: R, flexShrink: 0 }} />
            <span style={{ fontFamily: FF_M, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: G8 }}>
              Kitchen
            </span>
            <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 40 }}>
            <div>
              <h1 style={{
                fontFamily: FF_S,
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 500, lineHeight: 1.05,
                letterSpacing: '-0.02em', color: INK,
                marginBottom: 20,
              }}>
                Snack or feast —{' '}
                <em style={{ fontStyle: 'italic', color: G7 }}>you pick the pace.</em>
              </h1>
              <p style={{
                fontFamily: FF_S, fontStyle: 'italic',
                fontSize: 20, lineHeight: 1.65, color: INK2, maxWidth: 560,
              }}>
                Two ways to build skill. Come for five minutes or stay for a full round.
              </p>
            </div>
            <div style={{
              fontFamily: FF_M, fontSize: 10, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: INK3,
              paddingBottom: 6, whiteSpace: 'nowrap',
            }}>
              2 sections
            </div>
          </div>
        </header>

        {/* ── Section cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`kitchen-card${s.featured ? ' kitchen-card-green' : ''}`}
              style={{
                display: 'block', textDecoration: 'none',
                background: s.featured ? '#2d6b44' : PW,
                border: `1px solid ${s.featured ? 'transparent' : 'rgba(28,74,42,0.14)'}`,
                borderRadius: 11,
                padding: '32px 32px 24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Section number */}
              <div style={{
                fontFamily: FF_M, fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: s.featured ? 'rgba(245,240,227,0.7)' : INK3,
                marginBottom: 24,
              }}>
                Section {s.number}
              </div>

              {/* Kicker */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.featured ? 'rgba(245,240,227,0.8)' : R, flexShrink: 0 }} />
                <span style={{
                  fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: s.featured ? 'rgba(245,240,227,0.8)' : R,
                }}>{s.kicker}</span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: FF_D, fontWeight: 600,
                fontSize: 'clamp(28px, 2.8vw, 44px)',
                lineHeight: 1.05, letterSpacing: '-0.025em',
                color: s.featured ? '#F5F0E3' : INK,
                marginBottom: 16,
              }}>
                {s.title}{s.titleEm && (
                  <> <em style={{ color: s.featured ? 'rgba(245,240,227,0.9)' : R, fontStyle: 'italic' }}>{s.titleEm}</em></>
                )}
              </h2>

              {/* Description */}
              <p style={{
                fontFamily: FF_S, fontStyle: 'italic',
                fontSize: 14, lineHeight: 1.7,
                color: s.featured ? 'rgba(245,240,227,0.9)' : '#44463a',
                marginBottom: 28, maxWidth: 420,
              }}>
                {s.desc}
              </p>

              {/* Item list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {s.items.map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 3,
                      background: s.featured ? 'rgba(245,240,227,0.1)' : 'rgba(28,74,42,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10,
                      color: s.featured ? 'rgba(245,240,227,0.7)' : G8,
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: FF_M, fontSize: 12, letterSpacing: '0.04em',
                        color: s.featured ? 'rgba(245,240,227,0.95)' : G8,
                        flexShrink: 0,
                      }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontFamily: FF_S, fontStyle: 'italic', fontSize: 14,
                        color: s.featured ? 'rgba(245,240,227,0.75)' : INK3,
                      }}>
                        — {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: `1px solid ${s.featured ? 'rgba(245,240,227,0.12)' : 'rgba(28,74,42,0.1)'}`,
                paddingTop: 16,
              }}>
                <span style={{
                  fontFamily: FF_S, fontStyle: 'italic',
                  fontSize: 13, fontWeight: 500,
                  color: s.featured ? '#F5F0E3' : G7,
                }}>
                  Enter →
                </span>
                <div
                  className="card-arrow"
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    border: `1.5px solid ${s.featured ? 'rgba(245,240,227,0.25)' : 'rgba(28,74,42,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.featured ? 'rgba(245,240,227,0.7)' : G8,
                    fontSize: 14,
                  }}
                >
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
