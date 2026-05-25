import type { Metadata } from 'next';
import Link from 'next/link';
import { listChapters, ChapterMeta } from '@/lib/chapters';

export const metadata: Metadata = {
  title: 'Hong Kong Mahjong Rules & Strategy | Faan Club',
  description: '14 chapters from your first game to advanced strategy. Learn Hong Kong mahjong at your own pace.',
};

/* ── Tokens ───────────────────────────────────────────────────────────────── */
const G800 = '#1c4a2a';
const G700 = '#235836';
const G200 = '#c8d8c9';
const INK  = '#16170f';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';
const RICE = '#faf6ec';
const CHECK = '#a04a2d';
const CHECK_50 = '#f5e8e0';

const WORDS = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty'];
function toWord(n: number): string { return WORDS[n] ?? String(n); }

/* ── Course definitions ───────────────────────────────────────────────────── */
const COURSES = [
  { roman: 'I',   label: 'Beginner',     tag: '0-point game',       min: 1,  max: 4.9 },
  { roman: 'II',  label: 'Intermediate', tag: '3-point game',       min: 5,  max: 9.9 },
  { roman: 'III', label: 'Advanced',     tag: 'win more, lose less', min: 10, max: 99  },
];

/* ── Italic-accent phrases per slug ───────────────────────────────────────── */
const ITALIC: Record<string, [string, string]> = {
  'welcome':           ['Welcome to ',                   'the table'   ],
  'tiles':             ['Meet the ',                     'ingredients' ],
  'how-a-round-flows': ['How a round ',                  'flows'       ],
  'hand':              ['The only hand ',                'you need'    ],
  'common-hands':      ['Hands, bonuses, and the ',      '3-faan floor'],
  'hand-selection':    ['Your starting ',                '13'          ],
  'tenpai-outs':       ['Are you close to ',             'winning?'    ],
  'tile-efficiency':   ['The discard ',                  'decision'    ],
  'call-strategy':     ['Open or ',                      'concealed'   ],
  'reading-the-table': ['The discard ',                  'river'       ],
  'discard-reading':   ['Modeling ',                     'opponents'   ],
  'defensive-play':    ['Defensive ',                    'play'        ],
  'winning-vs-holding':['Winning vs. ',                  'holding'     ],
  'table-dynamics':    ['Table ',                        'dynamics'    ],
};

function parseMin(t: string) { return parseInt(t) || 0; }
function isCheckpoint(c: ChapterMeta) { return !Number.isInteger(c.number); }

/* ── Title with italic-green accent ──────────────────────────────────────── */
function TitleH3({ slug, title, accent }: { slug: string; title: string; accent: string }) {
  const phrase = ITALIC[slug];
  return (
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.2 }}>
      {phrase ? (
        <>{phrase[0]}<em style={{ fontStyle: 'italic', color: accent }}>{phrase[1]}</em></>
      ) : title}
    </h3>
  );
}

/* ── Regular chapter row ──────────────────────────────────────────────────── */
function MenuRow({ chapter }: { chapter: ChapterMeta }) {
  const num = String(chapter.number).padStart(2, '0');
  return (
    <li>
      <Link href={`/cookbook/${chapter.slug}`} className="menu-row" style={{
        display: 'grid', gridTemplateColumns: '40px 1fr auto', columnGap: 18,
        padding: '18px 0', borderTop: '1px solid rgba(20,54,31,.1)',
        textDecoration: 'none', alignItems: 'flex-start',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: G800, textAlign: 'right', lineHeight: 1.1, paddingTop: 2 }}>
          {num}
        </span>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <TitleH3 slug={chapter.slug} title={chapter.title} accent={G800} />
            <div className="leader" style={{ flex: 1, borderBottom: '1.5px dotted rgba(20,54,31,.3)', position: 'relative', top: -6, margin: '0 10px' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK3, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {chapter.readingTime}
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15.5px', color: INK2, lineHeight: 1.45, margin: '6px 0 0', maxWidth: 740 }}>
            {chapter.description}
          </p>
        </div>
        <span className="row-arrow" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: G800, paddingTop: 2, transition: 'transform .15s' }}>→</span>
      </Link>
    </li>
  );
}

/* ── Checkpoint row ───────────────────────────────────────────────────────── */
function CheckpointRow({ chapter }: { chapter: ChapterMeta }) {
  const label = chapter.title.replace('Checkpoint — ', '');
  return (
    <li>
      <Link href={`/cookbook/${chapter.slug}`} className="menu-row" style={{
        display: 'grid', gridTemplateColumns: '40px 1fr auto', columnGap: 18,
        padding: '18px 0', borderTop: '1px solid rgba(20,54,31,.1)',
        textDecoration: 'none', alignItems: 'flex-start',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: CHECK, textAlign: 'right', lineHeight: 1.1, paddingTop: 2 }}>✓</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.2 }}>
              Checkpoint — <em style={{ fontStyle: 'italic', color: CHECK }}>{label}</em>
            </h3>
            <div className="leader" style={{ flex: 1, borderBottom: '1.5px dotted rgba(20,54,31,.3)', position: 'relative', top: -6, margin: '0 10px' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK3, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {chapter.readingTime}
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15.5px', color: INK2, lineHeight: 1.45, margin: '6px 0 0', maxWidth: 740 }}>
            {chapter.description}
          </p>
        </div>
        <span className="row-arrow" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: G800, paddingTop: 2, transition: 'transform .15s' }}>→</span>
      </Link>
    </li>
  );
}

/* ── Course (collapsible) ─────────────────────────────────────────────────── */
function CourseSection({ roman, label, tag, chapters }: {
  roman: string; label: string; tag: string; chapters: ChapterMeta[];
}) {
  const regular  = chapters.filter(c => !isCheckpoint(c));
  const totalMin = regular.reduce((s, c) => s + parseMin(c.readingTime), 0);

  return (
    <details className="course" open style={{ borderTop: '1px solid rgba(20,54,31,.18)' }}>
      <summary style={{ listStyle: 'none', cursor: 'pointer' }}>
        <div className="crs-head" style={{
          display: 'grid', gridTemplateColumns: '1fr auto auto',
          gap: 24, alignItems: 'baseline', padding: '36px 0 18px',
        }}>
          <span className="crs-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 34, color: INK, transition: 'color .15s' }}>
            Course {roman} — <em style={{ fontStyle: 'italic', color: G800 }}>{label}</em>
          </span>
          <span className="crs-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: INK3 }}>
            {regular.length} ch · {totalMin}m · {tag}
          </span>
          <span className="chev" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: G800, display: 'inline-block', transition: 'transform .2s' }}>›</span>
        </div>
      </summary>

      <ul className="menu-list" style={{ listStyle: 'none', padding: '0 0 30px', margin: 0, borderBottom: '1px solid rgba(20,54,31,.18)' }}>
        {regular.map(c => <MenuRow key={c.slug} chapter={c} />)}
      </ul>
    </details>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function CookbookPage() {
  const chapters  = listChapters();
  const regular   = chapters.filter(c => !isCheckpoint(c));
  const totalMin  = regular.reduce((s, c) => s + parseMin(c.readingTime), 0);

  return (
    <div style={{ background: RICE, minHeight: '100vh' }}>
      <style>{`
        /* suppress native marker */
        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }

        /* chevron open state */
        details[open] .chev { transform: rotate(90deg); }

        /* closed course */
        details:not([open]) .crs-title { opacity: .6; }
        details:not([open]) .crs-head  { padding-bottom: 36px; border-bottom: 1px solid rgba(20,54,31,.18); }

        /* course head hover */
        .crs-head:hover .crs-title { color: ${G800} !important; }

        /* row hover */
        .menu-row:hover {
          padding-left: 12px;
          padding-right: 12px;
          background: linear-gradient(90deg, transparent, rgba(35,88,54,.04) 50%, transparent);
        }
        .menu-row.checkpoint:hover { background: #ecddd8; }
        .menu-row:hover .row-arrow { transform: translateX(4px); }

        /* reveal stagger */
        details.course > .menu-list > li { opacity: 0; transform: translateY(-3px); }
        details[open]  > .menu-list > li { opacity: 1; transform: none; transition: opacity .2s, transform .2s; }
        details[open]  > .menu-list > li:nth-child(1) { transition-delay: .00s; }
        details[open]  > .menu-list > li:nth-child(2) { transition-delay: .04s; }
        details[open]  > .menu-list > li:nth-child(3) { transition-delay: .08s; }
        details[open]  > .menu-list > li:nth-child(4) { transition-delay: .12s; }
        details[open]  > .menu-list > li:nth-child(5) { transition-delay: .16s; }
        details[open]  > .menu-list > li:nth-child(6) { transition-delay: .20s; }
        details[open]  > .menu-list > li:nth-child(7) { transition-delay: .24s; }

        /* responsive */
        @media (max-width: 1024px) {
          .crs-tag  { display: none !important; }
          .leader   { display: none !important; }
          .row-arrow { display: none !important; }
        }
        @media (max-width: 640px) {
          .crs-title { font-size: 24px !important; }
          .cookbook-wrap { padding: 48px 24px 72px !important; }
        }
      `}</style>

      <div className="cookbook-wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 60px 100px' }}>

        {/* ── Header ── */}
        <header style={{ textAlign: 'center', paddingBottom: 50, borderBottom: '1px double rgba(20,54,31,.25)', marginBottom: 0 }}>
          {/* Marque */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: G800 }}>
            <div style={{ width: 60, height: 1, background: G800, flexShrink: 0 }} />
            The Cookbook
            <div style={{ width: 60, height: 1, background: G800, flexShrink: 0 }} />
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(42px, 6vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px', fontVariationSettings: "'SOFT' 50, 'opsz' 144", fontOpticalSizing: 'none' }}>
            {toWord(regular.length)} chapter{regular.length !== 1 ? 's' : ''},{' '}
            <em style={{ fontStyle: 'italic', color: G800 }}>in order.</em>
          </h1>

          {/* Lede */}
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: INK2, maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.55 }}>
            A tasting menu of Hong Kong mahjong — three courses, plated chapter by chapter.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { label: 'chapters',  value: String(regular.length) },
              { label: 'read time', value: `~${totalMin}m`        },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: INK3, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: G800 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ── Courses ── */}
        {COURSES.map(course => {
          const courseChapters = chapters.filter(c => c.number >= course.min && c.number <= course.max);
          if (courseChapters.length === 0) return null;
          return (
            <CourseSection
              key={course.label}
              roman={course.roman}
              label={course.label}
              tag={course.tag}
              chapters={courseChapters}
            />
          );
        })}

        {/* ── Footer ── */}
        <footer style={{ textAlign: 'center', paddingTop: 50 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: G700, marginBottom: 8 }}>⁂</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: INK3, margin: 0 }}>
            The kitchen serves nightly · prep what you've learned next door
          </p>
        </footer>

      </div>
    </div>
  );
}
