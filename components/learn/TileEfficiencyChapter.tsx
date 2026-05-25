import Link from 'next/link';
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

/* ── Tile helpers ─────────────────────────────────────────────────────────── */
function T({ face }: { face: TileFace }) {
  return <Tile face={face} size="sm" />;
}

function TileGroup({ tiles }: { tiles: TileFace[] }) {
  return (
    <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
      {tiles.map((f, i) => <T key={i} face={f} />)}
    </div>
  );
}

/* ── Section layout (mirrors TenpaiOutsChapter) ───────────────────────────── */
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
    }}
      className="sec-two-col"
    >
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

/* ── Section 1: Five Block Diagram ───────────────────────────────────────── */
function FiveBlockDiagram() {
  const blocks: Array<{
    tiles: TileFace[];
    label: string;
    note: string;
    tone: 'complete' | 'building' | 'pair';
  }> = [
    {
      tiles: [{ suit: 'dot', value: 1 }, { suit: 'dot', value: 2 }, { suit: 'dot', value: 3 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'bamboo', value: 5 }, { suit: 'bamboo', value: 6 }, { suit: 'bamboo', value: 7 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'character', value: 3 }, { suit: 'character', value: 4 }, { suit: 'character', value: 5 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 3 }],
      label: 'Fragment', note: 'needs 1 or 4', tone: 'building',
    },
    {
      tiles: [{ suit: 'wind', value: 'east' }, { suit: 'wind', value: 'east' }],
      label: 'Pair', note: 'complete', tone: 'pair',
    },
  ];

  return (
    <div style={{ margin: '20px 0 28px' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{
                display: 'flex', gap: 3, padding: '10px 12px', borderRadius: 10,
                background: b.tone === 'building' ? '#fef9ec' : b.tone === 'pair' ? '#f0f5f0' : PAPER_WHITE,
                border: b.tone === 'building' ? `1.5px solid #e8c96a` : `1.5px solid ${G100}`,
              }}>
                {b.tiles.map((f, j) => <T key={j} face={f} />)}
                {b.tone === 'building' && (
                  <div style={{
                    width: 30, height: 40, border: `1.5px dashed ${AMB}`, borderRadius: 5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 1,
                  }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: AMB, lineHeight: 1 }}>?</span>
                  </div>
                )}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em',
                textTransform: 'uppercase', fontWeight: 600,
                color: b.tone === 'building' ? AMB : G700,
              }}>
                {b.label}
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 11, color: INK3, marginTop: -4 }}>
                {b.note}
              </span>
            </div>
            {i < blocks.length - 1 && (
              <span style={{ color: '#aaa8a0', fontSize: 16, marginBottom: 28, flexShrink: 0 }}>+</span>
            )}
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: INK3, marginTop: 14, marginBottom: 0, lineHeight: 1.5 }}>
        This hand is in tenpai — four blocks settled, one fragment waiting on 1 or 4 Bamboo to complete.
      </p>
    </div>
  );
}

function IsolatedCompare() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '20px 0 0' }} className="outs-grid">
      <div style={{ background: '#f0f5f0', border: `1.5px solid ${G200}`, borderRadius: 12, padding: '18px 20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: G800, marginBottom: 10 }}>✓ Keep — developing</div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>Connects to tiles you already hold. Could complete a chow, build a pair, or extend a fragment. Contributes to a block.</p>
      </div>
      <div style={{ background: '#fbeeec', border: '1.5px solid #e8c4bf', borderRadius: 12, padding: '18px 20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: RED, marginBottom: 10 }}>✕ Discard — isolated</div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>No neighbors within 2 in the same suit. No pair partner. No pung plan. Wastes a block slot.</p>
      </div>
    </div>
  );
}

/* ── Section 2: Competing blocks ─────────────────────────────────────────── */
function BlockChoiceGrid() {
  const options = [
    {
      tiles: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 2 }] as TileFace[],
      label: 'Pair',
      outsCount: 2,
      desc: 'Only one tile value completes this. At most two copies remain in the wall.',
      tone: 'weak' as const,
    },
    {
      tiles: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 3 }] as TileFace[],
      label: 'Two-sided wait',
      outsCount: 8,
      desc: 'Two tile values complete this — four copies of each. Four times as many outs.',
      tone: 'strong' as const,
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '8px 0 20px' }} className="outs-grid">
      {options.map((o, i) => (
        <div key={i} style={{
          background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`,
          borderRadius: 14, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <TileGroup tiles={o.tiles} />
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: INK }}>{o.label}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                color: o.tone === 'strong' ? G700 : RED,
              }}>
                {o.outsCount} outs
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK2 }}>{o.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WaitExample() {
  const fragment: TileFace[] = [
    { suit: 'bamboo', value: 2 },
    { suit: 'bamboo', value: 2 },
    { suit: 'bamboo', value: 3 },
  ];
  const options = [
    {
      label: 'Discard 3-Bamboo → keep the pair',
      remaining: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 2 }] as TileFace[],
      outs: [{ suit: 'bamboo', value: 2 }] as TileFace[],
      outsCount: 2,
      tone: 'weak' as const,
    },
    {
      label: 'Discard one 2-Bamboo → keep the fragment',
      remaining: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 3 }] as TileFace[],
      outs: [{ suit: 'bamboo', value: 1 }, { suit: 'bamboo', value: 4 }] as TileFace[],
      outsCount: 8,
      tone: 'strong' as const,
    },
  ];

  return (
    <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 24px', margin: '4px 0 16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: INK3, marginBottom: 14 }}>Hand fragment</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
        {fragment.map((f, i) => <T key={i} face={f} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="outs-grid">
        {options.map((o, i) => (
          <div key={i} style={{
            borderRadius: 10, padding: '16px 18px',
            background: o.tone === 'strong' ? G50 : '#fbeeec',
            border: `1px solid ${o.tone === 'strong' ? G200 : '#e8c4bf'}`,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3, marginBottom: 10 }}>{o.label}</div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
              {o.remaining.map((f, j) => <T key={j} face={f} />)}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3, marginBottom: 8 }}>Outs</div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
              {o.outs.map((f, j) => <T key={j} face={f} />)}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: o.tone === 'strong' ? G800 : RED, lineHeight: 1 }}>
              {o.outsCount} <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 400, color: INK3 }}>outs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section 3: Concept cards ────────────────────────────────────────────── */
function ConceptCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '8px 0 20px' }} className="outs-grid">
      <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: AMB, background: '#fbe9c8', padding: '4px 8px', borderRadius: 4, alignSelf: 'flex-start' }}>Shanten · Distance</span>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: INK, marginBottom: 6, lineHeight: 1.2 }}>How far from tenpai?</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>The minimum number of useful tile swaps needed to reach a winning wait. Shanten 2 = two ideal draws away. Every discard should move it down.</p>
        </div>
      </div>
      <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: G800, background: G50, padding: '4px 8px', borderRadius: 4, alignSelf: 'flex-start' }}>Uke-ire · Acceptance</span>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: INK, marginBottom: 6, lineHeight: 1.2 }}>How many tiles improve you?</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>The count of tiles remaining in the wall that reduce your shanten. Before each discard, ask: which tile to remove leaves the highest uke-ire?</p>
        </div>
      </div>
    </div>
  );
}

/* ── Section 4: Multi-way cards ──────────────────────────────────────────── */
function MultiWayCards() {
  const cards = [
    {
      n: 1,
      title: "Don't complete your fourth meld too early",
      body: 'Lock in three solid melds, keep the fourth flexible. A flexible fragment stays open to more outs than a completed set that closes your hand to a single wait.',
    },
    {
      n: 2,
      title: 'Maintain flexibility',
      body: 'Avoid locking your hand into a rigid final shape prematurely. Keep floating middle tiles open — they let you transition into faster or higher-scoring shapes based on what opponents discard.',
    },
    {
      n: 3,
      title: 'Balance speed and value',
      body: "Blindly chasing the highest uke-ire can make your hand predictable and leave you defenseless. Assess whether slowing down slightly for a better-scoring hand or safer defense is worth the extra shanten.",
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '8px 0 0' }}>
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

/* ── Section 5: Discard ladder ───────────────────────────────────────────── */
function DiscardLadder() {
  const rows: Array<{
    priority: string;
    title: string;
    tiles: TileFace[];
    reason: string;
    tone: 'red' | 'amber' | 'green';
  }> = [
    {
      priority: '1st to go',
      title: 'Honors and terminals',
      tiles: [
        { suit: 'wind', value: 'west' },
        { suit: 'dragon', value: 'red' },
        { suit: 'bamboo', value: 1 },
        { suit: 'dot', value: 9 },
      ],
      reason: "Winds and dragons can't form sequences. 1s and 9s connect in only one direction. Isolated copies are dead weight.",
      tone: 'red',
    },
    {
      priority: 'Hold longer',
      title: 'Floating middle tiles',
      tiles: [
        { suit: 'dot', value: 5 },
        { suit: 'bamboo', value: 4 },
        { suit: 'character', value: 6 },
      ],
      reason: 'A lone 4, 5, or 6 connects in up to four directions as future draws arrive. Their potential is hidden — hold over terminals.',
      tone: 'amber',
    },
    {
      priority: 'When forced',
      title: 'Choose the weakest partial set',
      tiles: [],
      reason: 'Edge waits (1–2, 8–9) → fewest outs. Closed waits (gap like 4–6) → more tile copies available. Two-sided waits → most outs. Break the weakest shape first.',
      tone: 'green',
    },
  ];

  const toneColors = {
    red:   { pill: { background: '#f3d8d4', color: RED },  line: RED },
    amber: { pill: { background: '#fbe9c8', color: AMB },  line: AMB },
    green: { pill: { background: G50,        color: G800 }, line: G700 },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, margin: '18px 0 0' }}>
      {rows.map((r, i) => {
        const col = toneColors[r.tone];
        return (
          <div key={i} style={{
            background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`,
            borderRadius: 12, padding: '18px 20px',
            display: 'flex', gap: 16, alignItems: 'flex-start',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0, width: 58 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.12em',
                textTransform: 'uppercase', fontWeight: 600, padding: '4px 6px',
                borderRadius: 4, textAlign: 'center', lineHeight: 1.4,
                ...col.pill,
              }}>
                {r.priority}
              </span>
              {i < rows.length - 1 && (
                <div style={{ width: 2, height: 24, background: col.line, opacity: 0.25, borderRadius: 1 }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK, marginBottom: r.tiles.length > 0 ? 10 : 6 }}>{r.title}</div>
              {r.tiles.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  {r.tiles.map((f, j) => <T key={j} face={f} />)}
                </div>
              )}
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>{r.reason}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DrillCallout() {
  return (
    <div style={{ background: G50, border: `1.5px solid ${G200}`, borderRadius: 12, padding: '20px 22px', marginTop: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: G800, fontWeight: 600, marginBottom: 8 }}>
        Tile Efficiency Drill
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.6, color: INK2 }}>
        The drill shows you a partial hand and asks you to identify the best discard. Every session builds the pattern recognition that makes efficiency feel automatic.
      </p>
      <Link href="/kitchen/drills/tile-efficiency" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: G800, textDecoration: 'none', fontWeight: 600 }}>
        Go to the drill →
      </Link>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function TileEfficiencyChapter() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sec-two-col { grid-template-columns: 1fr !important; }
          .outs-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Chapter header */}
      <div style={{ paddingTop: 32, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: RED, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: G800 }}>
            Chapter 08
          </span>
          <div style={{ height: 1, width: 40, background: G200, flexShrink: 0 }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px' }}>
          The discard <em style={{ fontStyle: 'italic', color: G800 }}>decision.</em>
        </h1>
        <p style={{ maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: INK2, margin: 0 }}>
          Tile efficiency is the discipline of choosing the discard that leaves you the most routes forward. Over many games, consistently efficient discards mean you reach tenpai faster and more often than your opponents.
        </p>
      </div>

      <ChapSection n={1} title={<>Five Block <em style={{ fontStyle: 'italic', color: G800 }}>Theory</em></>} tag="Structure">
        <BodyP>
          A winning hand needs four melds and one pair — <strong>five blocks total</strong>. Organise your 13 tiles into five blocks as early as possible. If you count more than five, discard the weakest. If you're short, hold versatile middle tiles (4–6) that can slot into multiple configurations as future draws arrive.
        </BodyP>
        <FiveBlockDiagram />
        <IsolatedCompare />
      </ChapSection>

      <ChapSection n={2} title={<>Competing blocks — <em style={{ fontStyle: 'italic', color: G800 }}>count your outs</em></>} tag="Outs">
        <BodyP>
          When tiles overlap and you can't keep all of them, you must choose which block to keep. The rule: <strong>keep the configuration that leaves you with more outs</strong>.
        </BodyP>
        <BlockChoiceGrid />
        <BodyP>The 2-2-3 fragment forces exactly this choice. The outs make the answer clear:</BodyP>
        <WaitExample />
        <BodyP style={{ marginTop: 4 }}>
          Unless the pair is a high-value honor (seat wind, round wind, dragon), <strong>keep the chow fragment</strong>. A two-sided wait with 8 outs is rare and worth protecting.
        </BodyP>
      </ChapSection>

      <ChapSection n={3} title={<>Shanten <em style={{ fontStyle: 'italic', color: G800 }}>&amp; uke-ire</em></>} tag="Vocabulary">
        <BodyP>Two terms that formalise what you've already been doing intuitively:</BodyP>
        <ConceptCards />
        <BodyP style={{ fontSize: '15px', color: INK2, background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: 0 }}>
          Chapter 6 covers shanten in full — how to count it and how it shapes strategy at each stage of the round.
        </BodyP>
      </ChapSection>

      <ChapSection n={4} title={<>Multi-way waits — <em style={{ fontStyle: 'italic', color: G800 }}>the ideal</em></>} tag="Tenpai shape">
        <BodyP>
          The most efficient tenpai hands have two or more winning tiles. Every additional winning tile makes you harder to defend against and more likely to win first.
        </BodyP>
        <MultiWayCards />
      </ChapSection>

      <ChapSection n={5} title={<>Discard <em style={{ fontStyle: 'italic', color: G800 }}>hierarchy</em></>} tag="Decision order">
        <BodyP>
          When you must discard, work through this order — weaker tiles first, more connected tiles last.
        </BodyP>
        <DiscardLadder />
        <DrillCallout />
      </ChapSection>
    </>
  );
}
