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

/* ── Section 1: 1-4-7 rule ───────────────────────────────────────────────── */
function SafeGroupGrid() {
  const suits = ['dot', 'bamboo', 'character'] as const;
  const suitLabels = { dot: 'Dots', bamboo: 'Bamboo', character: 'Characters' };
  const groups = [[1, 4, 7], [2, 5, 8], [3, 6, 9]] as const;

  return (
    <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 24px', margin: '16px 0 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Safety families — each suit</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {suits.map((suit) => (
          <div key={suit} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3, width: 72, flexShrink: 0 }}>{suitLabels[suit]}</span>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {groups.map((g, gi) => (
                <div key={gi} style={{
                  display: 'flex', gap: 3, padding: '8px 10px', borderRadius: 8,
                  background: gi === 0 ? G50 : gi === 1 ? '#fef9ec' : '#fdf4f3',
                  border: `1px solid ${gi === 0 ? G200 : gi === 1 ? '#e8c96a' : '#e8c4bf'}`,
                }}>
                  {g.map((v) => (
                    <T key={v} face={{ suit, value: v as 1|2|3|4|5|6|7|8|9 }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: INK3, margin: '16px 0 0', lineHeight: 1.5 }}>
        If a 4 was just discarded, the 1 and 7 in that suit are relatively safer — whoever threw the 4 wasn't building chow sequences that need them.
      </p>
    </div>
  );
}

/* ── Section 2: Dead tile tracking ───────────────────────────────────────── */
function DeadTileTracker() {
  const rows = [
    { seen: '0 seen', remaining: 4, pct: 100, tone: 'red' as const,   note: 'Fully live — could be anyone\'s wait' },
    { seen: '1 seen', remaining: 3, pct: 75,  tone: 'red' as const,   note: 'Mostly live' },
    { seen: '2 seen', remaining: 2, pct: 50,  tone: 'amber' as const, note: 'Getting safer' },
    { seen: '3 seen', remaining: 1, pct: 25,  tone: 'amber' as const, note: 'One copy left in the game' },
    { seen: '4 seen', remaining: 0, pct: 0,   tone: 'green' as const, note: 'Dead — completely safe' },
  ];
  const barColor = { red: RED, amber: AMB, green: G700 };

  return (
    <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 24px', margin: '16px 0 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: INK3, marginBottom: 18 }}>Copies visible → danger level</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 200px', gap: 16, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: INK3 }}>{r.seen}</span>
            <div style={{ height: 8, background: PAPER3, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: barColor[r.tone], width: `${r.pct}%`, borderRadius: 4 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: INK3 }}>{r.note}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: INK3, borderTop: `1px dashed rgba(20,54,31,.15)`, paddingTop: 14, marginTop: 16, marginBottom: 0, lineHeight: 1.5 }}>
        Danger climbs as the wall shrinks. A tile safe on turn 6 can be lethal on turn 14 — fewer rounds remain before hands close.
      </p>
    </div>
  );
}

/* ── Section 3: Exposure tells ────────────────────────────────────────────── */
function ExposureCards() {
  const stages = [
    {
      n: 1, tone: 'green' as const,
      name: 'One exposure',
      desc: 'Commit it to memory but don\'t react yet. Watch what suit they\'re keeping vs. discarding — the pattern over the next two turns tells you more than the set itself.',
    },
    {
      n: 2, tone: 'amber' as const,
      name: 'Two exposures',
      desc: 'Their hand shape is becoming visible. If one suit disappears from their discards, they\'re likely building into it. Start avoiding tiles from that suit.',
    },
    {
      n: 3, tone: 'red' as const,
      name: 'Three exposures',
      desc: 'Danger state. They need only one more set and a pair. Any tile you throw is far more likely to complete their hand than yours. Break up your own hand and discard safe tiles only.',
    },
  ];

  const toneStyle = {
    green: { pill: { color: G800, background: G50 },       bar: G700 },
    amber: { pill: { color: AMB,  background: '#fbe9c8' }, bar: AMB },
    red:   { pill: { color: RED,  background: '#f3d8d4' }, bar: RED },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, margin: '16px 0 20px' }} className="arc-grid">
      {stages.map((s) => {
        const col = toneStyle[s.tone];
        return (
          <div key={s.n} style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 8px', borderRadius: 4, alignSelf: 'flex-start', ...col.pill }}>
              {s.n} set{s.n > 1 ? 's' : ''} exposed
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: INK, marginBottom: 6 }}>{s.name}</div>
              <div style={{ height: 3, background: PAPER3, borderRadius: 2, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', background: col.bar, width: `${s.n === 1 ? 33 : s.n === 2 ? 66 : 100}%`, borderRadius: 2 }} />
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>{s.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Section 4: Suit pattern reading ─────────────────────────────────────── */
function SuitPatternCards() {
  const patterns = [
    {
      signal: 'Early honor discards',
      meaning: 'Building a suited hand, not collecting honors.',
      implication: 'Safe to throw back the same honors they\'ve already discarded.',
      tone: 'neutral' as const,
    },
    {
      signal: 'Early terminal discards (1s, 9s)',
      meaning: 'Keeping mid-tiles — likely chow-heavy hand.',
      implication: 'Mid-tiles in their kept suits become more dangerous as they develop.',
      tone: 'caution' as const,
    },
    {
      signal: 'One suit disappears from their river',
      meaning: 'They\'re keeping that suit entirely.',
      implication: 'Mixed or pure one-suit in progress. Tiles from that suit become progressively more dangerous.',
      tone: 'caution' as const,
    },
    {
      signal: 'Late honor discards (turn 9+)',
      meaning: 'Pivoting from a failed plan, or folding under pressure.',
      implication: 'Watch the next two discards for the new direction.',
      tone: 'neutral' as const,
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0 0' }} className="outs-grid">
      {patterns.map((p, i) => (
        <div key={i} style={{
          background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`,
          borderRadius: 12, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: p.tone === 'caution' ? AMB : INK3 }}>
            {p.signal}
          </div>
          <p style={{ margin: 0, fontSize: 15, color: INK, fontWeight: 500, lineHeight: 1.4 }}>{p.meaning}</p>
          <p style={{ margin: 0, fontSize: 15, color: INK2, lineHeight: 1.5 }}>{p.implication}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function ReadingTheTableChapter() {
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
            Chapter 10
          </span>
          <div style={{ height: 1, width: 40, background: G200, flexShrink: 0 }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px' }}>
          What do the discards <em style={{ fontStyle: 'italic', color: G800 }}>tell you?</em>
        </h1>
        <p style={{ maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: INK2, margin: 0 }}>
          Playing your own hand well gets you halfway. The other half is watching what everyone else is doing. Every discard is public information — face-up on the table. Reading it consistently is one of the highest-value habits in the game.
        </p>
      </div>

      <ChapSection n={1} title={<>The <em style={{ fontStyle: 'italic', color: G800 }}>1-4-7</em> rule</>} tag="Safety estimate">
        <BodyP>
          When you need to discard and aren't sure what's safe, tiles fall into three safety families per suit. A player who discarded a tile from one family probably wasn't building sequences that need the others in the same family.
        </BodyP>
        <SafeGroupGrid />
        <BodyP style={{ fontSize: '15px', color: INK2, background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: 0 }}>
          This is a probability estimate, not a guarantee. Use it when you're short on cleaner information — never as a substitute for tracking actual discards.
        </BodyP>
      </ChapSection>

      <ChapSection n={2} title={<>Tracking <em style={{ fontStyle: 'italic', color: G800 }}>dead tiles</em></>} tag="Live count">
        <BodyP>
          For any tile you might discard, count how many copies are visible — in the discard rivers, in exposed sets, or in your own hand. Every copy you can see is a copy that can't be someone's winning tile.
        </BodyP>
        <DeadTileTracker />
      </ChapSection>

      <ChapSection n={3} title={<>Exposure <em style={{ fontStyle: 'italic', color: G800 }}>tells</em></>} tag="Meld count">
        <BodyP>
          Every exposed set is a signal. The more sets a player has showing, the more you can infer — and the more dangerous they are.
        </BodyP>
        <ExposureCards />
        <div style={{ background: '#fbeeec', border: '1.5px solid #e8c4bf', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: RED, marginBottom: 8 }}>Never feed a third exposure</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>
            Break up your own hand before you discard into a player with three exposed sets — even if it means abandoning a nearly-complete hand. This discipline separates winning players from losing ones.
          </p>
        </div>
      </ChapSection>

      <ChapSection n={4} title={<>Reading <em style={{ fontStyle: 'italic', color: G800 }}>suit patterns</em></>} tag="Discard river">
        <BodyP>
          The discard river tells you what a player <em>doesn't</em> need. These four patterns cover the most common signals.
        </BodyP>
        <SuitPatternCards />
        <BodyP style={{ fontSize: '15px', color: INK2, background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '20px 0 0' }}>
          Start with one signal: when someone reaches three exposures, stop throwing tiles from the suit they're building. Add the other patterns once that habit is automatic.
        </BodyP>
      </ChapSection>
    </>
  );
}
