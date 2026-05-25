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

/* ── Section 1: Call decisions ────────────────────────────────────────────── */
function CallCostGrid() {
  const costs = [
    { label: 'Information', body: 'Every exposed set shows opponents your tiles and hand shape. They will stop throwing tiles that help you.' },
    { label: 'Faan', body: 'Common hand (平糊) is worth 1 faan only when fully concealed. One call and that bonus disappears — potentially dropping below the 3-faan floor.' },
    { label: 'Flexibility', body: 'Exposed sets are locked. You can\'t rearrange, pivot, or abandon the shape. You\'re stuck with the hand you committed to when you called.' },
    { label: 'Turn order', body: 'Chow is restricted to the player on your right and loses to any pung or win claim on the same tile.' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '8px 0 20px' }} className="outs-grid">
      {costs.map((c, i) => (
        <div key={i} style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: RED, marginBottom: 8 }}>{c.label}</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK2 }}>{c.body}</p>
        </div>
      ))}
    </div>
  );
}

function FaanExample() {
  const hand: TileFace[] = [
    { suit: 'dot', value: 1 }, { suit: 'dot', value: 2 }, { suit: 'dot', value: 3 },
    { suit: 'dot', value: 4 }, { suit: 'dot', value: 5 }, { suit: 'dot', value: 6 },
    { suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 3 }, { suit: 'bamboo', value: 4 },
    { suit: 'character', value: 7 }, { suit: 'character', value: 8 }, { suit: 'character', value: 9 },
    { suit: 'dot', value: 8 }, { suit: 'dot', value: 8 },
  ];

  const rows = [
    { label: 'Fully concealed', calc: 'Common hand (1) + self-draw (1)', result: '2 faan', tone: 'good' as const },
    { label: 'After one chow call', calc: 'Common hand bonus gone + self-draw (1)', result: '1 faan — can\'t win', tone: 'bad' as const },
  ];

  return (
    <div style={{ background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 14, padding: '20px 22px', margin: '4px 0 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: INK3, marginBottom: 14 }}>Example hand</div>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 20 }}>
        {hand.map((f, i) => <T key={i} face={f} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
            borderRadius: 8, padding: '12px 16px',
            background: r.tone === 'good' ? G50 : '#fbeeec',
            border: `1px solid ${r.tone === 'good' ? G200 : '#e8c4bf'}`,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: INK3, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 15, color: INK2 }}>{r.calc}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: r.tone === 'good' ? G800 : RED, lineHeight: 1, flexShrink: 0 }}>
              {r.result}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: INK3, margin: '14px 0 0', lineHeight: 1.5 }}>
        The call that felt like progress actually killed the hand.
      </p>
    </div>
  );
}

function WhenToCallGrid() {
  const items = [
    { title: 'You\'re calling to win', body: 'Already at tenpai and the winning tile appears. Always call — the game is over, costs are irrelevant.' },
    { title: 'Building a pung-heavy hand', body: 'All Pungs (對對糊) has no concealed bonus. Calling pungs openly costs nothing in faan and gets you there faster.' },
    { title: 'The call adds more faan than it removes', body: 'A dragon pung (+1 faan) in a hand that doesn\'t rely on the concealed bonus is pure profit. Do the math before and after.' },
    { title: 'The wall is short and you\'re stuck', body: 'Under 50 tiles remaining and still 1-shanten? Speed beats score. Call if it puts you in tenpai now.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '8px 0 20px' }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: G50, border: `1px solid ${G200}`, borderRadius: 10, padding: '14px 16px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: G200, lineHeight: 1, flexShrink: 0, minWidth: 18 }}>{i + 1}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: G800, marginBottom: 4 }}>{it.title}</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK2 }}>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PungTrap() {
  const tiles: TileFace[] = [{ suit: 'wind', value: 'south' }, { suit: 'wind', value: 'south' }];
  return (
    <div style={{ background: '#fbeeec', border: '1.5px solid #e8c4bf', borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, color: RED, marginBottom: 12 }}>The pung trap</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {tiles.map((f, i) => <T key={i} face={f} />)}
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.55, color: INK2 }}>
        You hold two South Winds seated North in the East round — South Wind is neither your seat wind nor the round wind. An opponent discards one. Should you call?
      </p>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: INK2 }}>
        The pung adds <strong>0 bonus faan</strong>. It exposes your shape, locks the set, and kills the concealed bonus on any chow-based hand. The third South Wind will likely arrive from the wall anyway.
      </p>
      <div style={{ marginTop: 12, fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 15, color: RED }}>Don't call. Hold the pair. Wait.</div>
    </div>
  );
}

/* ── Section 5: Win now or wait? ──────────────────────────────────────────── */
function WinHoldCompare() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '8px 0 0' }} className="outs-grid">
      <div style={{ background: G50, border: `1.5px solid ${G200}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: G800, marginBottom: 14 }}>✓ Take the cheap win — if any is true</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Wall has ≤ 20 tiles remaining',
            'The upgrade tile is dead (all 4 seen)',
            'An opponent has 2+ exposures',
            'The upgrade needs 2 or more specific tiles',
            'Anyone shows a third exposure',
          ].map((p, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, fontSize: 15, color: INK2, lineHeight: 1.4 }}>
              <span style={{ color: G700, flexShrink: 0, fontSize: 10, marginTop: 3 }}>▸</span>{p}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ background: '#fbeeec', border: '1.5px solid #e8c4bf', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: RED, marginBottom: 14 }}>Hold out — only when all are true</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Wall has > 20 tiles remaining',
            'Upgrade needs only 1 specific tile',
            'That tile has 2+ live copies',
            'No opponent has more than 1 exposure',
            'Holding doesn\'t force a dangerous discard',
          ].map((p, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, fontSize: 15, color: INK2, lineHeight: 1.4 }}>
              <span style={{ color: RED, flexShrink: 0, fontSize: 10, marginTop: 3 }}>▸</span>{p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Section 6: Turn checklist ────────────────────────────────────────────── */
function TurnChecklist() {
  const items = [
    'Does the new tile improve my hand? If yes, what do I drop?',
    'If I drop tile X, does it match a recent discard or sit in a 1-4-7 group with one?',
    'Has anyone exposed three sets? If so, only discard safe tiles.',
    'What stage am I in — develop, attack, or defend?',
    'Is a call worth making? Does it add more than it costs?',
    'If I\'m close to winning, is the upgrade realistic, or should I take what I have?',
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '8px 0 0' }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: PAPER_WHITE, border: `1px solid rgba(20,54,31,.15)`, borderRadius: 10, padding: '14px 18px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: G200, lineHeight: 1, flexShrink: 0, minWidth: 20 }}>{i + 1}</span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: INK }}>{it}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function InGameStrategyChapter() {
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
            Chapter 09
          </span>
          <div style={{ height: 1, width: 40, background: G200, flexShrink: 0 }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 68px)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, margin: '0 0 32px' }}>
          Open or <em style={{ fontStyle: 'italic', color: G800 }}>concealed.</em>
        </h1>
        <p style={{ maxWidth: 760, fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: INK2, margin: 0 }}>
          Every discard is also a call decision. Most beginners call too often and open too easily. Learning when to stay concealed — and when opening is clearly worth it — is where intermediate play begins.
        </p>
      </div>

      <ChapSection n={1} title={<>Call <em style={{ fontStyle: 'italic', color: G800 }}>decisions</em></>} tag="When to claim">
        <BodyP>
          Every call is a trade. You get a tile immediately — but you give up information, faan, and flexibility. Stay concealed until the cost is clearly worth paying.
        </BodyP>
        <BodyP style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 15, color: INK, margin: '0 0 8px' }}>What a call costs</BodyP>
        <CallCostGrid />
        <BodyP style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 15, color: INK, margin: '4px 0 8px' }}>The concealed faan in practice</BodyP>
        <FaanExample />
        <BodyP style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 15, color: INK, margin: '4px 0 8px' }}>When calling makes sense</BodyP>
        <WhenToCallGrid />
        <PungTrap />
      </ChapSection>

      <ChapSection n={2} title={<>Reading <em style={{ fontStyle: 'italic', color: G800 }}>the table</em></>} tag="Tracking & safety">
        <BodyP>
          Every discard is public information — and most players ignore it. The key signals: tiles in the same 1-4-7, 2-5-8, or 3-6-9 group as a recent discard are relatively safe; a player who threw 4 wasn't building sequences that need 1 or 7. Track how many copies of a tile are visible — at 3 seen, only one copy remains in play.
        </BodyP>
        <BodyP>
          Watch exposed sets closely. One exposure: note it. Two: their hand shape is becoming clear. Three: danger — any tile you throw is far more likely to complete their hand than yours. Break up your own hand before discarding into a third exposure. This habit separates winning players from losing ones.
        </BodyP>
        <BodyP style={{ background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '16px 0 0', fontSize: '15px', color: INK2 }}>
          Full coverage — the 1-4-7 grid, copy-count tracking, and suit pattern reading — is in <strong>Chapter 10: The discard river</strong>.
        </BodyP>
      </ChapSection>

      <ChapSection n={3} title={<>Win now <em style={{ fontStyle: 'italic', color: G800 }}>or wait?</em></>} tag="The hold decision">
        <BodyP>
          You're one tile from a small win. Should you take it or hold for a higher-faan upgrade? A steady stream of small wins beats chasing big hands and losing. Don't romanticize the limit hand.
        </BodyP>
        <WinHoldCompare />
      </ChapSection>

      <ChapSection n={4} title={<>On your <em style={{ fontStyle: 'italic', color: G800 }}>turn</em></>} tag="The checklist">
        <BodyP>Run through these in order. Start with the first two — let the rest develop over a few games.</BodyP>
        <TurnChecklist />
        <BodyP style={{ fontSize: '15px', color: INK2, background: G50, borderLeft: `3px solid ${G700}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', margin: '24px 0 0' }}>
          You don't have to apply all of this at once. The table itself becomes the teacher.
        </BodyP>
      </ChapSection>
    </>
  );
}
