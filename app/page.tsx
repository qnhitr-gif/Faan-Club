import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn Hong Kong Mahjong — Free Guide | Faan Club',
  description: 'A patient guide to Hong Kong mahjong, taught at the table. 14 chapters from beginner to advanced.',
};

/* ── shared tokens ─────────────────────────────────────────────────────────── */
const R  = '#b8302a';       // red accent
const G8 = '#1c4a2a';       // green-800
const G7 = '#235836';       // green-700
const INK  = '#16170f';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';
const BLUE = '#1e3a8a';
const RICE = '#faf6ec';
const PW   = '#fcfaf3';     // paper-white

const FF_D = 'var(--font-display), Georgia, serif';  // Fraunces
const FF_S = 'var(--font-serif), Georgia, serif';    // Newsreader
const FF_M = 'var(--font-mono), monospace';           // JetBrains Mono
const FF_T = '"Noto Serif SC", "Noto CJK SC", serif'; // tile faces

/* ── page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{
      background: RICE,
      backgroundImage: 'radial-gradient(circle, rgba(28,74,42,0.13) 1px, transparent 1px)',
      backgroundSize: '22px 22px',
    }}>
      <HeroSection />
      <CoversSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ overflow: 'hidden' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr .95fr',
            minHeight: '80vh',
            alignItems: 'center',
            gap: 48,
          }}
          className="hero-grid"
        >

          {/* ── Left copy ── */}
          <div style={{ paddingTop: 72, paddingBottom: 72 }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: R, flexShrink: 0 }} />
              <div style={{ height: 1, width: 36, background: '#c8d8c9', flexShrink: 0 }} />
              <span style={{
                fontFamily: FF_M, fontSize: 10.5,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: G8,
              }}>
                Hong Kong rules
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: FF_D, fontWeight: 600,
              fontSize: 'clamp(64px, 7vw, 128px)',
              lineHeight: 1.04, letterSpacing: '-0.035em',
              color: INK, marginBottom: 28,
              fontVariationSettings: "'SOFT' 50, 'opsz' 144",
            } as React.CSSProperties}>
              Learn{' '}
              <em style={{ color: R, fontStyle: 'italic' }}>mahjong,</em>
              <br />
              one{' '}
              {/* "bite" with red-tinted highlight behind */}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{
                  position: 'absolute', bottom: '8%', left: '-2%', right: '-2%',
                  height: '28%', background: 'rgba(184,48,42,.2)',
                  borderRadius: 3, zIndex: 0,
                }} />
                <em style={{ position: 'relative', zIndex: 1, fontStyle: 'italic', color: '#1c4a2a' }}>bite</em>
              </span>
              {' '}at a time.
            </h1>

            {/* Lede — em = non-italic red */}
            <p style={{
              fontFamily: FF_S, fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.65,
              color: INK2, maxWidth: 600, marginBottom: 44,
            }}>
              A warm corner of the internet for anyone curious about Hong Kong mahjong. Clear visuals, simple explanations, your own pace.{' '}
              <span style={{ fontStyle: 'normal', color: R }}>Come curious.</span>
              {' '}Stay a regular.
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56 }}>
              <Link href="/cookbook/welcome" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '14px 28px', background: G7, color: '#f5f0e3',
                borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: 'none', fontFamily: 'var(--font-sans), system-ui',
                letterSpacing: '0.01em',
              }}>
                Start chapter 1 →
              </Link>
              <Link href="/kitchen" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '14px 28px', background: 'transparent',
                border: '1.5px solid rgba(28,74,42,0.35)', color: G8,
                borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: 'none', fontFamily: 'var(--font-sans), system-ui',
              }}>
                Practice room
              </Link>
            </div>

            {/* Stats — italic Fraunces numerals in red */}
            <div style={{
              borderTop: '1px solid rgba(28,74,42,0.12)', paddingTop: 24,
              display: 'flex', gap: 44, flexWrap: 'wrap',
            }}>
              {([
                { num: '14',                   label: 'Chapters' },
                { num: 'Beginner → Advanced',  label: 'Level'    },
              ] as const).map(({ num, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: FF_D, fontStyle: 'italic', fontWeight: 600,
                    fontSize: 38, color: R, lineHeight: 1,
                  }}>{num}</div>
                  <div style={{
                    fontFamily: FF_M, fontSize: 10, letterSpacing: '0.13em',
                    textTransform: 'uppercase', color: INK3, marginTop: 6,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — tile pyramid motif ── */}
          <div
            className="hidden md:flex"
            style={{ justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'stretch', paddingTop: 60 }}
          >
            <HeroMotif />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Plate + 8 tiles + tea cups SVG ───────────────────────────────────────── */
function HeroMotif() {
  return (
    <div aria-hidden="true" style={{ width: '100%', maxWidth: 640 }}>
      <svg width="100%" viewBox="-50 -50 700 700" role="img" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <title>Faan Club — eight mahjong tiles spread on a plate</title>
        <desc>Eight mahjong tiles spread across a white plate on a green felt table.</desc>
        <defs>
          <pattern id="diamondDots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45, 300, 300)">
            <circle cx="9" cy="9" r="1.1" fill="rgba(255,255,255,0.12)" />
          </pattern>
          <style>{`
            @keyframes tileIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            .tile { animation: tileIn 0.5s ease-out both; }
            .tile-0 { animation-delay: 0.1s; }
            .tile-1 { animation-delay: 0.25s; }
            .tile-2 { animation-delay: 0.4s; }
            .tile-3 { animation-delay: 0.55s; }
            .tile-4 { animation-delay: 0.7s; }
            .tile-5 { animation-delay: 0.85s; }
            .tile-6 { animation-delay: 1.0s; }
            .tile-7 { animation-delay: 1.15s; }
          `}</style>
        </defs>

        {/* Diamond table — 30% bigger square rotated 45° */}
        <rect x="64" y="64" width="472" height="472" rx="10" fill="#1A5C35" transform="rotate(45, 300, 300)"/>
        <rect x="64" y="64" width="472" height="472" rx="10" fill="url(#diamondDots)" transform="rotate(45, 300, 300)"/>

        {/* E S W N — placed inside the green diamond near each tip */}
        <text x="300" y="32"  textAnchor="middle" dominantBaseline="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" fontWeight="600" fill="#faf6ec" letterSpacing="0.2em">N</text>
        <text x="570" y="300" textAnchor="middle" dominantBaseline="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" fontWeight="600" fill="#faf6ec" letterSpacing="0.2em">E</text>
        <text x="300" y="568" textAnchor="middle" dominantBaseline="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" fontWeight="600" fill="#faf6ec" letterSpacing="0.2em">S</text>
        <text x="30"  y="300" textAnchor="middle" dominantBaseline="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" fontWeight="600" fill="#faf6ec" letterSpacing="0.2em">W</text>

        {/* Plate + tiles */}
        <g transform="translate(-128.4, 25.32) scale(1.26)">
          <circle cx="340" cy="218" r="122" fill="#E5E2D8"/>
          <circle cx="340" cy="218" r="114" fill="#F8F7F2"/>
          <circle cx="340" cy="218" r="106" fill="none" stroke="#b8302a" strokeWidth="2"/>

          <g transform="rotate(-28, 268, 182)" className="tile tile-0">
            <rect x="239" y="144" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="244" y="149" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <text x="268" y="191" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="28" fill="#1D6B30">發</text>
          </g>
          <g transform="rotate(-3, 340, 158)" className="tile tile-1">
            <rect x="311" y="120" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="316" y="125" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <text x="340" y="167" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="30" fill="#D85A30">中</text>
          </g>
          <g transform="rotate(26, 412, 180)" className="tile tile-2">
            <rect x="383" y="142" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="388" y="147" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <circle cx="412" cy="162" r="7" fill="#2D7A3A"/>
            <circle cx="412" cy="180" r="7" fill="#2D7A3A"/>
            <circle cx="412" cy="198" r="7" fill="#2D7A3A"/>
          </g>
          <g transform="rotate(-20, 282, 210)" className="tile tile-3">
            <rect x="253" y="172" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="258" y="177" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <text x="282" y="220" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="28" fill="#2D7A3A">壽</text>
          </g>
          <g transform="rotate(18, 395, 208)" className="tile tile-4">
            <rect x="366" y="170" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="371" y="175" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <circle cx="383" cy="191" r="5" fill="#2D7A3A"/>
            <circle cx="403" cy="191" r="5" fill="#2D7A3A"/>
            <circle cx="383" cy="208" r="5" fill="#2D7A3A"/>
            <circle cx="403" cy="208" r="5" fill="#2D7A3A"/>
            <circle cx="383" cy="225" r="5" fill="#2D7A3A"/>
            <circle cx="403" cy="225" r="5" fill="#2D7A3A"/>
          </g>
          <g transform="rotate(-10, 295, 248)" className="tile tile-5">
            <rect x="266" y="210" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="271" y="215" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <text x="295" y="244" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="22" fill="#D85A30">八</text>
            <text x="295" y="268" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="17" fill="#D85A30">萬</text>
          </g>
          <g transform="rotate(14, 388, 252)" className="tile tile-6">
            <rect x="359" y="214" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="364" y="219" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <circle cx="388" cy="234" r="7" fill="none" stroke="#2D7A3A" strokeWidth="1.5"/>
            <circle cx="388" cy="252" r="7" fill="none" stroke="#2D7A3A" strokeWidth="1.5"/>
            <circle cx="388" cy="270" r="7" fill="none" stroke="#2D7A3A" strokeWidth="1.5"/>
            <circle cx="388" cy="234" r="3" fill="#2D7A3A"/>
            <circle cx="388" cy="252" r="3" fill="#2D7A3A"/>
            <circle cx="388" cy="270" r="3" fill="#2D7A3A"/>
          </g>
          <g transform="rotate(5, 340, 260)" className="tile tile-7">
            <rect x="311" y="222" width="58" height="76" rx="8" fill="#FEFCF7" stroke="#D4C9A8" strokeWidth="1.2"/>
            <rect x="316" y="227" width="48" height="66" rx="4" fill="none" stroke="#D4C9A8" strokeWidth="0.5"/>
            <text x="340" y="270" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="34" fill="#D85A30">飯</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   WHAT THIS COVERS — 3 cards
══════════════════════════════════════════════════════════════════════════════ */
const COVERS = [
  {
    num: '01',
    section: 'Cookbook',
    glyphs: ['發', '中', '東'] as const,
    glyphColors: [G8, R, BLUE] as const,
    h3First: 'The ',
    h3Em: 'cookbook',
    desc: <>Everything you need to go from "what's a pung?" to winning your first hand. Go in order or order à la carte — <span style={{ fontStyle: 'normal', color: R }}>no judgment either way.</span></>,
    footer: '14 chapters',
    href: '/cookbook',
  },
  {
    num: '02',
    section: 'Kitchen',
    glyphs: ['⊙', '⊙', '⊙'] as const,
    glyphColors: [G8, G8, G8] as const,
    h3First: 'The ',
    h3Em: 'kitchen',
    desc: <>Practice without an audience. Make your mistakes here, not at the table. Nobody's watching, nobody's sighing, and <span style={{ fontStyle: 'normal', color: R }}>the tiles won't tell.</span></>,
    footer: 'Drills · Games',
    href: '/kitchen',
  },
  {
    num: '03',
    section: 'Open Tables',
    glyphs: ['東', '南', '西'] as const,
    glyphColors: [G8, G8, G8] as const,
    h3First: 'Open ',
    h3Em: 'tables',
    desc: <>Real tables, real people, real games. Find a club near you or start your own — mahjong is always better with <span style={{ fontStyle: 'normal', color: R }}>three other people who actually want to be there.</span></>,
    footer: 'New York',
    href: '/open-tables',
  },
];

function CoversSection() {
  return (
    <section style={{ background: RICE }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

        {/* Section eyebrow — red dot + red hairline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingTop: 12 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: R, flexShrink: 0 }} />
          <div style={{ height: 1, width: 36, background: 'rgba(184,48,42,0.3)', flexShrink: 0 }} />
          <span style={{
            fontFamily: FF_M, fontSize: 10.5, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: R,
          }}>
            Explore
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            paddingBottom: 96,
          }}
          className="covers-grid"
        >
          {COVERS.map((c) => (
            <Link
              key={c.num}
              href={c.href}
              className="cover-card"
              style={{
                display: 'block', textDecoration: 'none',
                background: PW,
                border: '1px solid rgba(28,74,42,0.14)',
                borderRadius: 12,
                padding: '28px 28px 24px',
              }}
            >
              {/* Index + section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{
                  fontFamily: FF_M, fontSize: 11, color: R,
                  letterSpacing: '0.1em',
                }}>{c.num}</span>
                <div style={{ height: 1, flex: 1, background: 'rgba(184,48,42,0.18)' }} />
                <span style={{
                  fontFamily: FF_M, fontSize: 10, color: INK3,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{c.section}</span>
              </div>

              {/* Glyph strip — 3 mini tiles with tilts */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 24, alignItems: 'flex-end' }}>
                {c.glyphs.map((glyph, i) => (
                  <div
                    key={i}
                    style={{
                      width: 36, height: 50, borderRadius: 4,
                      border: `1px solid ${G8}`,
                      background: 'linear-gradient(160deg, #FEFCF7 0%, #EDE5CE 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, fontFamily: FF_T,
                      color: c.glyphColors[i],
                      flexShrink: 0,
                      transform: i === 0 ? 'rotate(-6deg) translateY(3px)' :
                                  i === 1 ? 'translateY(-4px)' :
                                            'rotate(6deg) translateY(3px)',
                      boxShadow: '0 3px 8px rgba(14,39,22,0.12)',
                    }}
                  >
                    {glyph === '⊙'
                      ? <div style={{ width: 10, height: 10, borderRadius: '50%', background: G8 }} />
                      : glyph
                    }
                  </div>
                ))}
              </div>

              {/* H3 — Fraunces 600, italic word in red */}
              <h3 style={{
                fontFamily: FF_D, fontWeight: 600, fontSize: 28,
                color: INK, marginBottom: 12, lineHeight: 1.2,
              }}>
                {c.h3First}
                <em style={{ color: R, fontStyle: 'italic' }}>{c.h3Em}</em>
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: FF_S, fontStyle: 'italic',
                fontSize: 15, lineHeight: 1.65, color: INK2, marginBottom: 24,
              }}>
                {c.desc}
              </p>

              {/* Card footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: '1px solid rgba(28,74,42,0.1)', paddingTop: 14,
              }}>
                <span style={{
                  fontFamily: FF_M, fontSize: 10, color: INK3,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{c.footer}</span>
                <span style={{
                  fontFamily: FF_S, fontStyle: 'italic',
                  fontSize: 14, color: G7, fontWeight: 500,
                }}>Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   THREE WAYS IN — editorial list
══════════════════════════════════════════════════════════════════════════════ */
const WAYS = [
  {
    num: '01.',
    kicker: 'Read at your pace',
    h3First: 'Read the ',
    h3Em: 'chapters',
    tags: ['14 chapters', 'Beginner → Advanced'],
    href: '/cookbook',
  },
  {
    num: '02.',
    kicker: 'Watch it unfold',
    h3First: 'Walk through ',
    h3Em: 'setup',
    tags: ['Interactive', '3 steps'],
    href: '/kitchen/games',
  },
  {
    num: '03.',
    kicker: 'Sharpen your eye',
    h3First: 'Tile efficiency ',
    h3Em: 'drills',
    tags: ['Drill mode', 'Timed'],
    href: '/kitchen/drills',
  },
];

function WaysSection() {
  return (
    <section style={{ background: RICE }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px 96px' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: R, flexShrink: 0 }} />
          <div style={{ height: 1, width: 36, background: 'rgba(184,48,42,0.3)', flexShrink: 0 }} />
          <span style={{
            fontFamily: FF_M, fontSize: 10.5, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: R,
          }}>
            Three ways in
          </span>
        </div>

        <div>
          {WAYS.map((w) => (
            <Link
              key={w.num}
              href={w.href}
              className="way-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'center',
                gap: 32,
                borderTop: '1px solid rgba(28,74,42,0.1)',
                padding: '28px 0',
                textDecoration: 'none',
                borderRadius: 4,
              }}
            >
              {/* Numeral — italic Fraunces 64px red */}
              <div style={{
                fontFamily: FF_D, fontStyle: 'italic', fontWeight: 600,
                fontSize: 64, color: R, lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {w.num}
              </div>

              {/* Centre — kicker + h3 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: R, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: FF_M, fontSize: 10, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: R,
                  }}>{w.kicker}</span>
                </div>
                <h3 style={{
                  fontFamily: FF_D, fontWeight: 600, fontSize: 34,
                  color: INK, lineHeight: 1.1, letterSpacing: '-0.02em',
                }}>
                  {w.h3First}
                  <em style={{ color: R, fontStyle: 'italic' }}>{w.h3Em}</em>
                </h3>
              </div>

              {/* Right — tags + circular arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="hidden md:flex" style={{ gap: 8, display: 'flex' }}>
                  {w.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: FF_M, fontSize: 10.5,
                      letterSpacing: '0.06em',
                      color: G8, background: 'rgba(28,74,42,0.07)',
                      padding: '5px 12px', borderRadius: 4,
                    }}>{tag}</span>
                  ))}
                </div>
                {/* Circular arrow button */}
                <div
                  className="way-arrow"
                  style={{
                    width: 46, height: 46, borderRadius: '50%',
                    border: '1.5px solid rgba(28,74,42,0.25)',
                    background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: G8, fontSize: 18, flexShrink: 0,
                  }}
                >
                  →
                </div>
              </div>
            </Link>
          ))}
          {/* closing hairline */}
          <div style={{ height: 1, background: 'rgba(28,74,42,0.1)' }} />
        </div>
      </div>
    </section>
  );
}
