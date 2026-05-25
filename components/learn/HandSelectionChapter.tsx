import type { TileFace } from '@/lib/tiles';
import { Tile } from '@/components/Tile';

/* ── Colour tokens ────────────────────────────────────────────────────────── */
const G800 = '#1c4a2a';
const G700 = '#235836';
const G200 = '#c8d8c9';
const G100 = '#dde6d6';
const G50  = '#eef0e2';
const INK  = '#16170f';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';
const RED  = '#b8302a';
const AMB  = '#c98a2b';
const PAPER_WHITE = '#fcfaf3';
const PAPER3      = '#e2d8bf';

/* ── Tile helper ──────────────────────────────────────────────────────────── */
function T({ face }: { face: TileFace }) {
  return <Tile face={face} size="sm" />;
}

/* ── Section layout ───────────────────────────────────────────────────────── */
function ChapSection({
  n, title, tag, children,
}: {
  n: number; title: React.ReactNode; tag: string; children: React.ReactNode;
}) {
  const nStr = String(n).padStart(2, '0');
  return (
    <section style={{
      paddingTop: 48, paddingBottom: 48,
      borderTop: '1px solid rgba(20,54,31,.18)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 220px) 1fr',
      gap: '0 56px',
      alignItems: 'flex-start',
    }} className="sec-two-col">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 30, alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 46, color: G800, letterSpacing: '-.02em', lineHeight: .9 }}>{nStr}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, letterSpacing: '-.015em', lineHeight: 1.1 }}>{title}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: INK3, display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <span style={{ width: 24, height: 1, background: G700, opacity: .5, display: 'inline-block' }} />
          {tag}
        </span>
      </div>
      <div style={{ fontSize: '17px', lineHeight: 1.65, color: INK, minWidth: 0 }}>{children}</div>
    </section>
  );
}

function BodyP({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ margin: '0 0 16px', ...style }}>{children}</p>;
}

/* ── Section 1: Arc of a hand ─────────────────────────────────────────────── */
function ArcCards() {
  const stages = [
    {
      n: 1, name: 'Develop', wall: '> 100 tiles', tone: 'green' as const,
      points: [
        'Discard isolated terminals (1s, 9s) first',
        'Then isolated honors that aren\'t seat or round wind',
        'Hold seat & round winds even as singletons',
        'Don\'t call discards — you haven\'t picked a plan yet',
        'Many pairs early? Consider All Pungs or Seven Pairs',
      ],
    },
    {
      n: 2, name: 'Attack', wall: '50 – 100 tiles', tone: 'amber' as const,
      points: [
        'Commit to one plan — don\'t wander between shapes',
        'Push hard toward tenpai',
        'Protect the pair — re-pairing is harder later',
        'Start tracking opponent discards',
        'Call only if it advances a hand you\'ve committed to',
      ],
    },
    {
      n: 3, name: 'Defend', wall: '< 50 tiles', tone: 'red' as const,
      points: [
        'Safe discards beat advancing by one tile',
        'If a win is unreachable, break up and discard safely',
        'Watch for any player with three exposed sets',
        'Speed beats score — call if it reaches tenpai now',
      ],
    },
  ];

  const toneStyle = {
    green: { bar: G700,  pill: { color: G800, background: G50 } },
    amber: { bar: AMB,   pill: { color: AMB,  background: '#fbe9c8' } },
    red:   { bar: RED,   pill: { color: RED,  background: '#f3d8d4' } },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, margin: '8px 0 0' }} className="arc-grid">
      {stages.map((s) => {
        const col = toneStyle[s.tone];
        return (
          <div key={s.n} style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 8px', borderRadius: 4, ...col.pill }}>Stage {s.n}</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: INK, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3 }}>{s.wall}</div>
            </div>
            <div style={{ height: 3, background: PAPER3, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: col.bar, width: s.n === 1 ? '78%' : s.n === 2 ? '44%' : '14%', borderRadius: 2 }} />
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {s.points.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 15, color: INK2, lineHeight: 1.45 }}>
                  <span style={{ color: col.bar, flexShrink: 0, fontSize: 9, marginTop: 4 }}>▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ── Section 2: Hand principles ───────────────────────────────────────────── */
function HandPillars() {
  const cards = [
    {
      n: 1,
      title: 'Chows over pungs',
      body: 'Suit tiles outnumber honors three-to-one. A chow fragment waits on two tile values (up to 8 outs); a pung waits on two copies of one. Bias toward chow shapes unless honors are already paired.',
    },
    {
      n: 2,
      title: 'Protect the pair',
      body: "Don't pung your pair just because the third copy appears. Re-pairing later is harder than letting a good pair develop. Only pung if it clearly closes the hand.",
    },
    {
      n: 3,
      title: 'Aim for multi-way waits',
      body: 'The more tiles that complete your hand, the more likely you win first. Always shape toward two or more outs. Single-tile waits are a last resort.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '8px 0 0' }}>
      {cards.map((c) => (
        <div key={c.n} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 12, padding: '18px 20px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, color: G200, lineHeight: 1, flexShrink: 0, minWidth: 22 }}>{c.n}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK, marginBottom: 5 }}>{c.title}</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>{c.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Section 3: Starting hand assessment ──────────────────────────────────── */
function StartingHandGrid() {
  const signals = [
    {
      label: 'Count your pairs',
      body: '3+ pairs → lean toward Seven Pairs or All Pungs. 1 pair → build chow-heavy. 0 pairs → find the most connected tiles and grow a pair from there.',
      tone: 'green' as const,
    },
    {
      label: 'Count your partial melds',
      body: 'Two-sided fragments (4-5, waiting on 3 or 6) are worth 8 outs each. Kanchan gaps (4-6, waiting on 5) give 4 outs. Isolated tiles give 0. Maximise fragments.',
      tone: 'green' as const,
    },
    {
      label: 'Check your honors',
      body: 'Seat wind and round wind: keep, they score. Other winds and dragons: keep only if you already have a pair. Isolated single honors: discard early.',
      tone: 'amber' as const,
    },
    {
      label: 'Spot a forced direction',
      body: 'Four tiles of one suit with good connectivity? That\'s your anchor suit. A near-complete pung of a scoring honor? Commit to it. Early convergence beats late pivoting.',
      tone: 'amber' as const,
    },
  ];

  const toneColor = { green: G700, amber: AMB };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '8px 0 0' }} className="outs-grid">
      {signals.map((s, i) => (
        <div key={i} style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: toneColor[s.tone], flexShrink: 0, display: 'inline-block' }} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK }}>{s.label}</div>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function HandSelectionChapter() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sec-two-col { grid-template-columns: 1fr !important; }
          .outs-grid   { grid-template-columns: 1fr !important; }
          .arc-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Chapter header */}
      <div style={{ paddingTop: 32, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: RED, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: G800 }}>
            Chapter 06
          </span>
          <div style={{ height: 1, width: 40, background: G200, flexShrink: 0 }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px' }}>
          Your starting <em style={{ fontStyle: 'italic', color: G800 }}>13.</em>
        </h1>
        <p style={{ maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: INK2, margin: 0 }}>
          Before the first discard, you already have decisions to make. What you build, what you keep, and when you change plans — these choices determine whether the rest of the hand flows or fights you.
        </p>
      </div>

      <ChapSection n={1} title={<>The arc of <em style={{ fontStyle: 'italic', color: G800 }}>a hand</em></>} tag="Develop · Attack · Defend">
        <BodyP>Every hand passes through three phases. The wall tells you which one you're in.</BodyP>
        <ArcCards />
      </ChapSection>

      <ChapSection n={2} title={<>Hand <em style={{ fontStyle: 'italic', color: G800 }}>principles</em></>} tag="The three rules">
        <BodyP>Three ideas that apply across all phases and all hand types.</BodyP>
        <HandPillars />
      </ChapSection>

      <ChapSection n={3} title={<>Reading your <em style={{ fontStyle: 'italic', color: G800 }}>starting 13</em></>} tag="First look">
        <BodyP>
          You have four things to check before you throw your first tile. Do them in order — they take about ten seconds and orient the entire hand.
        </BodyP>
        <StartingHandGrid />
        <BodyP style={{ background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '20px 0 0', fontSize: '15px', color: INK2 }}>
          You won't always find a clear signal. If the hand is genuinely ambiguous after 10 seconds, default to the develop phase rules: discard isolated terminals first and let the draw sort out the plan.
        </BodyP>
      </ChapSection>
    </>
  );
}
