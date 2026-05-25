import Link from 'next/link';
import type { TileFace } from '@/lib/tiles';
import { Tile } from '@/components/Tile';

/* ── Colour tokens (mirroring standalone) ─────────────────────────────── */
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

/* ── Small tile wrapper using existing Tile component ─────────────────── */
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

/* ── Section layout: two-column (sticky sidebar + body) ──────────────── */
function ChapSection({
  n, title, tag, children, full = false,
}: {
  n: number; title: React.ReactNode; tag: string; children: React.ReactNode; full?: boolean;
}) {
  const nStr = String(n).padStart(2, '0');
  if (full) {
    return (
      <section style={{
        paddingTop: 48, paddingBottom: 48,
        borderTop: '1px solid rgba(20,54,31,.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 22, marginBottom: 28, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 38, color: G800, letterSpacing: '-.02em', lineHeight: .9 }}>{nStr}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 28, letterSpacing: '-.015em', lineHeight: 1.1, flex: 1 }}>{title}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: INK3, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: G700, opacity: .5, display: 'inline-block' }} />
            {tag}
          </span>
        </div>
        <div style={{ fontSize: '17px', lineHeight: 1.65, color: INK }}>{children}</div>
      </section>
    );
  }
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
      {/* Sticky sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 30, alignSelf: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 46, color: G800, letterSpacing: '-.02em', lineHeight: .9 }}>{nStr}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, letterSpacing: '-.015em', lineHeight: 1.1 }}>{title}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: INK3, display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <span style={{ width: 24, height: 1, background: G700, opacity: .5, display: 'inline-block' }} />
          {tag}
        </span>
      </div>
      {/* Body */}
      <div style={{ fontSize: '17px', lineHeight: 1.65, color: INK, minWidth: 0 }}>{children}</div>
    </section>
  );
}

function BodyP({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ margin: '0 0 16px', ...style }}>{children}</p>;
}

/* ── Hand row (tiles + optional note) ───────────────────────────────────*/
function Hand({ tiles, note }: { tiles: TileFace[]; note?: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'flex-end', padding: '18px 0 14px' }}>
        {tiles.map((f, i) => <T key={i} face={f} />)}
      </div>
      {note && (
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15.5px', color: INK2, margin: '0 0 16px', lineHeight: 1.6 }}>
          {note}
        </p>
      )}
    </div>
  );
}

/* ── Shanten stage cards ─────────────────────────────────────────────── */
const STAGE_COLORS = {
  s0: { pill: { background: G100, color: G800 }, bar: G700 },
  s1: { pill: { background: '#fbe9c8', color: AMB }, bar: AMB },
  s2: { pill: { background: '#f3d8d4', color: RED }, bar: RED },
};

function ShantenCards() {
  const cards = [
    { key: 's0' as const, label: 'Stage 0', name: 'Tenpai', barPct: 55, desc: 'Distance zero. One tile wins.' },
    { key: 's1' as const, label: 'Stage 1', name: '1-shanten', barPct: 38, desc: 'One good draw puts you in tenpai. Most hands spend a few turns here.' },
    { key: 's2' as const, label: 'Stage 2', name: '2-shanten', barPct: 22, desc: 'Two good draws needed. Still buildable early; dangerous past turn 12.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, margin: '8px 0 28px' }} className="shanten-grid">
      {cards.map((c) => {
        const col = STAGE_COLORS[c.key];
        return (
          <div key={c.key} style={{
            background: PAPER_WHITE, border: '1px solid rgba(20,54,31,.15)',
            borderRadius: 14, padding: '22px 24px',
            display: 'flex', flexDirection: 'column', gap: 14, minHeight: 180,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 5, fontWeight: 600, ...col.pill }}>
                {c.label}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600, color: INK, lineHeight: 1 }}>{c.name}</span>
            <div style={{ height: 5, background: PAPER3, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, background: col.bar, width: `${c.barPct}%` }} />
            </div>
            <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.5, color: INK2 }}>{c.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ── Outs grid ───────────────────────────────────────────────────────── */
function OutsGrid() {
  const cards: Array<{
    tiles: TileFace[];
    title: string;
    desc: React.ReactNode;
  }> = [
    {
      tiles: [{ suit: 'dot', value: 5 }, { suit: 'dot', value: 6 }],
      title: 'Two-sided wait — up to 8 outs',
      desc: <>Completes on 4-Dot or 7-Dot. <strong>The strongest common tenpai shape</strong> — always prefer this over a gap or edge wait.</>,
    },
    {
      tiles: [{ suit: 'bamboo', value: 4 }, { suit: 'bamboo', value: 6 }],
      title: 'Gap wait — up to 4 outs',
      desc: 'Completes only on 5-Bamboo. Half as many outs as two-sided. Acceptable when nothing better is possible.',
    },
    {
      tiles: [{ suit: 'character', value: 1 }, { suit: 'character', value: 2 }],
      title: 'Edge wait — up to 4 outs',
      desc: <>Completes only on 3-Character (or 8–9 → 7 only). No two-sided option. <strong>Avoid deliberately building into this.</strong></>,
    },
    {
      tiles: [{ suit: 'dragon', value: 'red' }, { suit: 'dragon', value: 'red' }],
      title: 'Pair wait — 2 outs',
      desc: <>Waiting on a third copy to complete a pung. <strong>The weakest tenpai shape</strong> — build toward anything else if you can.</>,
    },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, margin: '18px 0 22px' }} className="outs-grid">
      {cards.map((c, i) => (
        <div key={i} style={{
          background: PAPER_WHITE, border: '1px solid rgba(20,54,31,.15)',
          borderRadius: 14, padding: '22px 24px',
          display: 'flex', gap: 20, alignItems: 'flex-start',
        }}>
          <TileGroup tiles={c.tiles} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, margin: '0 0 6px', lineHeight: 1.2, color: INK }}>{c.title}</h4>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Section 4: Outs shrink visuals ─────────────────────────────────── */
function DecayTimeline() {
  const rows = [
    { turn: 'Turn 4',  pct: 100, count: '8', style: 'good' as const },
    { turn: 'Turn 6',  pct: 88,  count: '7', style: 'good' as const },
    { turn: 'Turn 8',  pct: 63,  count: '5', style: 'warn' as const },
    { turn: 'Turn 10', pct: 50,  count: '4', style: 'warn' as const },
    { turn: 'Turn 12', pct: 25,  count: '2', style: 'bad' as const },
    { turn: 'Turn 14', pct: 12,  count: '1', style: 'bad' as const },
  ];
  const barColor = { good: `linear-gradient(90deg, ${G700}, #3d8456)`, warn: `linear-gradient(90deg, ${AMB}, #e1b04a)`, bad: `linear-gradient(90deg, #8a201a, ${RED})` };
  return (
    <div style={{ background: PAPER_WHITE, border: '1px solid rgba(20,54,31,.15)', borderRadius: 14, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, margin: 0, color: INK }}>The wait, turn by turn</h4>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '14.5px', color: INK2, margin: '-8px 0 0', lineHeight: 1.4 }}>Starting with 8 live outs — a healthy two-sided wait.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
        {rows.map((r) => (
          <div key={r.turn} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 56px', gap: 14, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3 }}>{r.turn}</span>
            <div style={{ height: 10, background: PAPER3, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 5, background: barColor[r.style], width: `${r.pct}%` }} />
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18, color: INK, textAlign: 'right', letterSpacing: '-.01em' }}>
              {r.count} <em style={{ fontStyle: 'italic', color: INK3, fontWeight: 500, fontSize: 14, marginLeft: 2 }}>/ 8</em>
            </span>
          </div>
        ))}
      </div>
      <p style={{ paddingTop: 10, borderTop: '1px dashed rgba(20,54,31,.18)', fontFamily: 'var(--font-serif)', fontSize: '14.5px', color: INK2, fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
        By turn 12 your <strong style={{ fontStyle: 'normal', fontWeight: 600, color: RED }}>once-strong wait</strong> has bled to two live tiles. Past this point, the wall itself runs out before your tile arrives.
      </p>
    </div>
  );
}

function PivotSplit() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, margin: '18px 0 24px' }} className="pivot-split">
      <div style={{ borderRadius: 14, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10, background: G50, border: `1px solid ${G200}` }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600, color: G800, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          ✓ Pivot
        </span>
        <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18, letterSpacing: '-.005em', margin: 0, color: INK, lineHeight: 1.2 }}>
          Drop the gap wait at <em style={{ fontStyle: 'italic', color: G800 }}>turn 9</em>
        </h5>
        <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: INK2 }}>Reshape toward a two-sided wait elsewhere. You lose a turn but gain a wait with 6+ live outs.</p>
      </div>
      <div style={{ borderRadius: 14, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10, background: '#fbeeec', border: '1px solid #e8c4bf' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600, color: RED, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          ✕ Ghost
        </span>
        <h5 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18, letterSpacing: '-.005em', margin: 0, color: INK, lineHeight: 1.2 }}>
          Push the dead wait to <em style={{ fontStyle: 'italic', color: RED }}>turn 16</em>
        </h5>
        <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: INK2 }}>You reach tenpai right as the wall empties. The 1 live out you're chasing is sitting in another player's hand.</p>
      </div>
    </div>
  );
}

/* ── Main chapter component ──────────────────────────────────────────── */
export function TenpaiOutsChapter() {
  const tenpaiHand: TileFace[] = [
    { suit: 'dot', value: 1 },
    { suit: 'dot', value: 2 },
    { suit: 'dot', value: 3 },
    { suit: 'bamboo', value: 6 },
    { suit: 'bamboo', value: 7 },
    { suit: 'bamboo', value: 8 },
    { suit: 'character', value: 2 },
    { suit: 'character', value: 3 },
    { suit: 'character', value: 4 },
    { suit: 'wind', value: 'east' },
    { suit: 'wind', value: 'east' },
    { suit: 'wind', value: 'east' },
    { suit: 'dot', value: 7 },
  ];

  const shantenHand: TileFace[] = [
    { suit: 'dot', value: 1 },
    { suit: 'dot', value: 2 },
    { suit: 'dot', value: 3 },
    { suit: 'bamboo', value: 6 },
    { suit: 'bamboo', value: 7 },
    { suit: 'bamboo', value: 8 },
    { suit: 'character', value: 2 },
    { suit: 'character', value: 3 },
    { suit: 'character', value: 4 },
    { suit: 'wind', value: 'east' },
    { suit: 'wind', value: 'east' },
    { suit: 'wind', value: 'east' },
    { suit: 'dot', value: 9 },
  ];

  return (
    <>
      {/* Responsive section layout style */}
      <style>{`
        @media (max-width: 768px) {
          .sec-two-col {
            grid-template-columns: 1fr !important;
          }
          .shanten-grid {
            grid-template-columns: 1fr !important;
          }
          .outs-grid {
            grid-template-columns: 1fr !important;
          }
          .pivot-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Chapter eyebrow + title */}
      <div style={{ paddingTop: 32, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: RED, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: G800 }}>
            Chapter 07
          </span>
          <div style={{ height: 1, width: 40, background: G200, flexShrink: 0 }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px' }}>
          One tile <em style={{ fontStyle: 'italic', color: G800 }}>away.</em>
        </h1>
        <div style={{ maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: INK2, marginBottom: 16 }}>
          <p style={{ margin: '0 0 14px' }}>
            The terms in this chapter — <em>tenpai</em>, <em>shanten</em>, <em>outs</em> — come from Japanese mahjong. HK mahjong doesn't use them officially, but every serious HK player who thinks analytically borrows them, because they're the clearest language we have for a universal problem: <em>how close am I, and what gets me there?</em>
          </p>
          <p style={{ margin: 0 }}>
            The underlying math is identical across all mahjong variants. A 5–6 Bamboo fragment waits on 4 or 7 whether you're playing HK rules or Japanese rules. The concepts describe the tiles, not the ruleset.
          </p>
        </div>
      </div>

      {/* Section 1 — Tenpai */}
      <ChapSection n={1} title={<>Tenpai — the <em style={{ fontStyle: 'italic', color: G800 }}>ready state</em></>} tag="Distance · 0">
        <BodyP>
          <strong>Tenpai</strong> (聽牌) means your 13-tile hand is exactly one tile short of winning. Here's a hand in tenpai:
        </BodyP>
        <Hand
          tiles={tenpaiHand}
          note={<>Three complete melds, one pung, one isolated tile (7 Dot). Waiting for a <strong>second 7 Dot</strong> to form the pair. Draw it or claim it — you win.</>}
        />
        <BodyP>
          In Japanese mahjong you declare tenpai publicly (riichi) and lock your hand for a bonus. In HK mahjong there's no declaration — you hold tenpai silently and win when the tile arrives.
        </BodyP>
      </ChapSection>

      {/* Section 2 — Shanten */}
      <ChapSection n={2} title={<>Shanten — <em style={{ fontStyle: 'italic', color: G800 }}>measuring the distance</em></>} tag="Distance · n">
        <BodyP>
          <strong>Shanten</strong> counts the minimum number of useful tile swaps needed to reach tenpai. Tenpai is 0-shanten — the destination. Most hands start a round at 3–4 shanten and work down.
        </BodyP>
        <ShantenCards />
        <BodyP>
          A hand at 1-shanten — three complete melds, a pair, one tile that doesn't yet belong anywhere:
        </BodyP>
        <Hand
          tiles={shantenHand}
          note="One useful draw puts this in tenpai: pair the 9 Dot, or find a new pair and discard it."
        />
        <BodyP style={{ marginTop: 8 }}>
          <strong>Reading it quickly:</strong> count orphans — tiles with no connection to anything else in your hand. One orphan → likely 1-shanten. Two or more → likely 2-shanten.
        </BodyP>
        <BodyP style={{ fontSize: '15px', color: INK2, background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '4px 0 0' }}>
          <strong style={{ color: G800 }}>Optional arithmetic:</strong> shanten = 8 − (2 × complete melds) − (partial sets) − (1 if you have a pair). Don't count a tile twice.
        </BodyP>
      </ChapSection>

      {/* Section 3 — Outs */}
      <ChapSection n={3} title={<>Outs — the tiles that <em style={{ fontStyle: 'italic', color: G800 }}>win the round</em></>} tag="2 – 8 tiles">
        <BodyP>
          An <strong>out</strong> is any tile that completes your hand at tenpai. There are 4 copies of every tile — subtract what's visible to get the live count. The shape of your tenpai wait determines how many outs you have.
        </BodyP>
        <OutsGrid />
        <BodyP style={{ marginTop: 4 }}>
          Every tile discarded face-up kills one potential out. A 5-Bamboo thrown by any opponent removes one of your gap-wait outs. <strong>Track discards even before you're in tenpai</strong> — a wait that starts with 8 live outs may be down to 3 by the time you arrive.
        </BodyP>
        <DecayTimeline />
      </ChapSection>

      {/* Section 4 — Strategy: play the distance */}
      <ChapSection n={4} title={<>Playing your <em style={{ fontStyle: 'italic', color: G800 }}>distance</em></>} tag="Strategy">
        <p style={{ maxWidth: 840, margin: '0 0 28px', fontSize: '17px', lineHeight: 1.65, color: INK }}>
          Your shanten number changes what matters. At 2-shanten the only goal is maximizing outs. At 1-shanten the goal shifts to the quality of the tenpai you're about to enter. If your best wait is already mostly dead, <em>pivot to a different shape earlier</em> rather than reaching tenpai and discovering you're waiting on a ghost.
        </p>

        <PivotSplit />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 28 }} className="outs-grid">
          <div style={{ background: PAPER_WHITE, border: '1px solid rgba(20,54,31,.15)', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: AMB, fontWeight: 600, marginBottom: 14 }}>1-SHANTEN — one draw away</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Choose the better tenpai', body: 'You often have two paths to tenpai. Ask which gives more outs. A two-sided wait (8 outs) beats a single-tile wait (4 outs) — worth an extra draw.' },
                { title: 'Calls become worthwhile', body: 'One claimed tile can move you directly to tenpai. Weigh the faan cost against the speed gain.' },
                { title: 'Start watching the table', body: 'Tiles discarded by multiple players are safer when you eventually need to discard defensively.' },
              ].map((p) => (
                <div key={p.title}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK, marginBottom: 3 }}>{p.title}</div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK2 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: PAPER_WHITE, border: '1px solid rgba(20,54,31,.15)', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: RED, fontWeight: 600, marginBottom: 14 }}>2-SHANTEN — two draws away</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'Maximize connections', body: 'Each draw either fills a fragment or lands as an orphan. Prioritize tiles that connect to the most other tiles in your hand.' },
                { title: "Don't call from 2-shanten", body: 'Claiming costs your concealed bonus and usually only moves you to 1-shanten — not tenpai. Rarely worth it.' },
                { title: 'Protect flexibility', body: "Keep tiles that work in multiple configurations — you can't yet see the final shape of your tenpai." },
              ].map((p) => (
                <div key={p.title}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK, marginBottom: 3 }}>{p.title}</div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK2 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChapSection>
    </>
  );
}
