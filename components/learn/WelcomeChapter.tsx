import Link from 'next/link';

const css = `
  .wc-path-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .wc-steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
  }
  .wc-why-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 40px;
    align-items: start;
  }
  .wc-footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .wc-kitchen-band {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px 48px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .wc-steps-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .wc-path-grid { grid-template-columns: 1fr; gap: 3px; }
    .wc-why-grid { grid-template-columns: 1fr; }
    .wc-footer-grid { grid-template-columns: 1fr; gap: 20px; }
    .wc-kitchen-band { grid-template-columns: 1fr; }
  }
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <div style={{ paddingTop: 32, paddingBottom: 48, borderBottom: '1px solid rgba(35,88,54,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
          CHAPTER 01
        </span>
        <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a', opacity: 0.5 }}>
          Introduction
        </span>
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#16170f', margin: '0 0 28px' }}>
        Congrats, you just got
        <br />
        <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>a seat at the table.</em>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.6, color: '#44463a', margin: 0, maxWidth: 560 }}>
          Hong Kong mahjong, taught in order. You'll play your first game after chapter&nbsp;4 — no scoring required.
        </p>
        <Link
          href="/cookbook"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#235836', textDecoration: 'none', paddingBottom: 4, whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          All chapters →
        </Link>
      </div>
    </div>
  );
}

// ─── What is HK mahjong (opening + why HK) ────────────────────────────────────

function WhatIsIt() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56, borderBottom: '1px solid rgba(35,88,54,0.12)' }}>
      <div className="wc-why-grid">
        {/* Left: opening paragraph */}
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.7, color: '#44463a', margin: '0 0 20px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 80, lineHeight: 0.75, float: 'left', marginRight: 6, marginTop: 10, color: '#1c4a2a' }}>H</span>
            ong Kong mahjong is a four-player tile game. Each player builds a hand of 14 tiles — drawing from a shared wall, discarding what they don't need, and occasionally claiming a tile someone else threw.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.7, color: '#44463a', margin: 0 }}>
            The first to complete their hand wins the round. It is fast to learn, slow to master, and genuinely more fun the more you understand it.
          </p>
        </div>

        {/* Right: why HK */}
        <div style={{ background: '#f5f8f5', border: '1.5px solid rgba(35,88,54,0.15)', borderRadius: 14, padding: '28px 28px 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#235836', marginBottom: 14 }}>
            WHY HONG KONG RULES?
          </div>
          <p style={{ fontSize: 15, color: '#44463a', lineHeight: 1.65, marginBottom: 12, marginTop: 0 }}>
            Mahjong has branched into many variants — Japanese Riichi, Taiwanese, Mainland Chinese, and more. Hong Kong mahjong is the version most diaspora communities play. If your family plays, or you've seen it at a club in North America, Australia, or Europe, this is almost certainly it.
          </p>
          <p style={{ fontSize: 15, color: '#44463a', lineHeight: 1.65, margin: 0 }}>
            Once you know HK rules, picking up other variants is easy — the tiles, the hand shape, and the draw/discard loop are identical. Only the scoring differs.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── How a round works ────────────────────────────────────────────────────────

const GAME_STEPS: Array<{ n: string; title: string; body: string }> = [
  {
    n: '01',
    title: 'Build the wall',
    body: '144 tiles are stacked face-down in a square wall. Each player draws 13 tiles; East (the dealer) takes 14.',
  },
  {
    n: '02',
    title: 'Draw and discard',
    body: "On your turn, draw a tile from the wall and discard one you don't need. You're always holding 13 tiles between turns.",
  },
  {
    n: '03',
    title: 'Call or let it go',
    body: "When someone discards a tile you need, you can claim it — but other players will see your exposed set.",
  },
  {
    n: '04',
    title: 'Complete your hand',
    body: "Hold 14 tiles in the winning shape — four melds and a pair — declare and win. Everyone pays.",
  },
];

function HowItWorks() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56, borderBottom: '1px solid rgba(35,88,54,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a' }}>
          HOW A ROUND WORKS
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(35,88,54,0.12)' }} />
      </div>

      <div className="wc-steps-grid">
        {GAME_STEPS.map((step, i) => (
          <div
            key={step.n}
            style={{
              background: '#fcfaf3',
              borderLeft: i === 0 ? '1px solid rgba(35,88,54,0.12)' : 'none',
              borderRight: '1px solid rgba(35,88,54,0.12)',
              borderTop: '1px solid rgba(35,88,54,0.12)',
              borderBottom: '1px solid rgba(35,88,54,0.12)',
              borderRadius: i === 0 ? '10px 0 0 10px' : i === 3 ? '0 10px 10px 0' : 0,
              padding: '24px 22px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34, color: 'rgba(35,88,54,0.13)', lineHeight: 1, display: 'block', marginBottom: 14 }}>
              {step.n}
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: '#1c4a2a', marginBottom: 8 }}>
              {step.title}
            </div>
            <p style={{ fontSize: 13.5, color: '#5a574f', lineHeight: 1.6, margin: 0 }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Learning path ────────────────────────────────────────────────────────────

const PATH_STAGES = [
  {
    level: 'Beginner',
    label: '0-point',
    sublabel: 'game',
    chapters: 'Ch. 1–4',
    goal: 'Play your first game tonight.',
    bg: '#f5f8f5',
    border: 'rgba(35,88,54,0.2)',
    accent: '#235836',
    items: ['The tiles', 'How a round flows', 'The winning shape', 'No scoring needed'],
  },
  {
    level: 'Intermediate',
    label: '3-point',
    sublabel: 'game',
    chapters: 'Ch. 5–10',
    goal: 'Win with purpose, not luck.',
    bg: '#fdf8f0',
    border: 'rgba(184,48,42,0.15)',
    accent: '#b8302a',
    items: ['Hands and bonuses', 'Reading your distance', 'Tile efficiency', 'Calls and table reads'],
  },
  {
    level: 'Advanced',
    label: 'Full',
    sublabel: 'strategy',
    chapters: 'Ch. 11–14',
    goal: 'Play all four hands, not just yours.',
    bg: '#f7f5fb',
    border: 'rgba(100,80,160,0.15)',
    accent: '#6450a0',
    items: ['Defense and folding', 'Reading discards', 'Hold vs. win decisions', 'Table dynamics'],
  },
];

function LearningPath() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56, borderBottom: '1px solid rgba(35,88,54,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a' }}>
          YOUR PATH
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(35,88,54,0.12)' }} />
        <Link href="/cookbook" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#235836', textDecoration: 'none' }}>
          Full cookbook →
        </Link>
      </div>

      <div className="wc-path-grid">
        {PATH_STAGES.map((s, i) => (
          <div
            key={s.level}
            style={{
              background: s.bg,
              border: `1.5px solid ${s.border}`,
              borderRadius: i === 0 ? '12px 0 0 12px' : i === 2 ? '0 12px 12px 0' : 0,
              padding: '28px 24px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.accent }} />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: s.accent, fontWeight: 600 }}>
                {s.level}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a7a6a' }}>
                {s.chapters}
              </span>
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, color: '#16170f', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {s.label}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: '#44463a', marginLeft: 6, lineHeight: 1 }}>
                {s.sublabel}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13.5, color: '#5a574f', margin: '8px 0 16px', lineHeight: 1.5 }}>
              {s.goal}
            </p>
            <div style={{ height: 1, background: 'rgba(35,88,54,0.1)', marginBottom: 14 }} />
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {s.items.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#44463a', lineHeight: 1.4 }}>
                  <span style={{ color: s.accent, flexShrink: 0, marginTop: 1, fontSize: 10 }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Next steps (Kitchen + Open Tables) ──────────────────────────────────────

function NextSteps() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a' }}>
          BEYOND THE CHAPTERS
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(35,88,54,0.12)' }} />
      </div>

      {/* Kitchen band */}
      <div
        style={{
          background: '#1c4a2a',
          borderRadius: '12px 12px 0 0',
          padding: '32px 36px',
        }}
        className="wc-kitchen-band"
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,227,0.45)', marginBottom: 12 }}>
            KITCHEN — PRACTICE
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.65, color: 'rgba(245,240,227,0.9)', margin: 0 }}>
            The Kitchen pairs with every chapter — read about tile efficiency, then drill it. Study a hand pattern, then see it play out in a full interactive round.{' '}
            <em style={{ color: '#a8d4a0' }}>Learning and applying, together.</em>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <Link href="/kitchen/drills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'rgba(245,240,227,0.08)', border: '1px solid rgba(245,240,227,0.15)', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', minWidth: 180 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: '#f5f0e3' }}>Drills</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245,240,227,0.4)' }}>→</span>
          </Link>
          <Link href="/kitchen/games" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'rgba(245,240,227,0.08)', border: '1px solid rgba(245,240,227,0.15)', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', minWidth: 180 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: '#f5f0e3' }}>Interactive games</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245,240,227,0.4)' }}>→</span>
          </Link>
        </div>
      </div>

      {/* Open Tables strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
        background: '#f5f8f5',
        border: '1.5px solid rgba(35,88,54,0.15)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        padding: '20px 36px',
      }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.65, color: '#5a574f', margin: 0 }}>
          When you're ready for a real table, find clubs and open games in NYC and beyond.
        </p>
        <Link href="/open-tables" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, fontWeight: 500, color: '#235836', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Open Tables →
        </Link>
      </div>
    </section>
  );
}

// ─── Chapter footer ───────────────────────────────────────────────────────────

function ChapterFooter() {
  return (
    <footer
      className="wc-footer-grid"
      style={{ paddingTop: 32, borderTop: '1px solid rgba(35,88,54,0.15)' }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7a6a', marginBottom: 8 }}>
          ← PREVIOUS
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: '#7a7a6a' }}>
          — (this is the first chapter)
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#235836', marginBottom: 8 }}>
          NEXT CHAPTER →
        </div>
        <Link
          href="/cookbook/tiles"
          style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: '#1c4a2a', textDecoration: 'none', display: 'block' }}
        >
          Chapter 02 → Meet the{' '}
          <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>ingredients.</em>
        </Link>
      </div>
    </footer>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function WelcomeChapter() {
  return (
    <>
      <style>{css}</style>
      <div style={{ maxWidth: 1080, margin: '0 auto', paddingBottom: 80 }}>
        <Hero />
        <WhatIsIt />
        <HowItWorks />
        <LearningPath />
        <NextSteps />
      </div>
    </>
  );
}
