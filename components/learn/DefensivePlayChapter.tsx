import React from 'react';

/* ── Colour tokens ─────────────────────────────────────────────────────────── */
const G800  = '#1c4a2a';
const G700  = '#235836';
const INK   = '#16170f';
const INK2  = '#44463a';
const INK3  = '#7a7a6a';
const RED   = '#b8302a';
const AMB   = '#c98a2b';
const PAPER = '#fcfaf3';

/* ── Layout helpers ─────────────────────────────────────────────────────────── */
function ChapSection({
  n, title, tag, children,
}: {
  n: number; title: React.ReactNode; tag: string; children: React.ReactNode;
}) {
  return (
    <section style={{
      paddingTop: 48, paddingBottom: 48,
      borderTop: '1px solid rgba(20,54,31,.18)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 220px) 1fr',
      gap: '0 56px',
      alignItems: 'flex-start',
    }} className="sec-two-col">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 30 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 46, color: G800, letterSpacing: '-.02em', lineHeight: .9 }}>
          {String(n).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, letterSpacing: '-.015em', lineHeight: 1.1 }}>
          {title}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: INK3, display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <span style={{ width: 24, height: 1, background: G700, opacity: .5, display: 'inline-block' }} />
          {tag}
        </span>
      </div>
      <div style={{ fontSize: 16, lineHeight: 1.7, color: INK, minWidth: 0 }}>{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.7, color: INK2 }}>{children}</p>;
}

/* ── Section 1: When to fold ─────────────────────────────────────────────── */
const FOLD_SIGNALS = [
  {
    urgency: 'Fold immediately',
    color: RED,
    bg: 'rgba(184,48,42,0.05)',
    border: 'rgba(184,48,42,0.2)',
    dot: RED,
    body: 'Any opponent has three exposed sets. They need only one tile to win. Any discard from you is high-risk.',
  },
  {
    urgency: 'Strong case to fold',
    color: AMB,
    bg: 'rgba(201,138,43,0.05)',
    border: 'rgba(201,138,43,0.2)',
    dot: AMB,
    body: 'Wall is under 20 tiles and your hand is still 2 or more shanten from tenpai. You almost certainly won\'t finish in time.',
  },
  {
    urgency: 'Evaluate',
    color: G700,
    bg: 'rgba(28,74,42,0.04)',
    border: 'rgba(28,74,42,0.14)',
    dot: G700,
    body: 'You are holding demonstrably dangerous tiles with a marginal hand. Weigh the potential win against the payment risk.',
  },
];

function FoldSignals() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '4px 0 16px' }}>
      {FOLD_SIGNALS.map((s) => (
        <div key={s.urgency} style={{
          borderRadius: 10, border: `1.5px solid ${s.border}`,
          background: s.bg, padding: '14px 18px',
          display: 'flex', gap: 16, alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.14em',
            textTransform: 'uppercase', color: s.color, fontWeight: 700,
            whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2,
          }}>
            {s.urgency}
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK2 }}>{s.body}</p>
        </div>
      ))}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.12)',
        background: 'rgba(28,74,42,0.04)', padding: '12px 18px',
      }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK2 }}>
          <strong style={{ color: INK }}>Folding is not giving up.</strong> A fold that avoids paying 6 faan is worth more than winning at 3. Players who can't fold when they should consistently overpay across a session.
        </p>
      </div>
    </div>
  );
}

/* ── Section 2: Safe tiles ───────────────────────────────────────────────── */
const SAFE_TILE_TYPES = [
  {
    label: 'Already-discarded',
    note: 'Safest category',
    body: 'If an opponent has already thrown a tile, that exact tile is almost never their winning tile. Copy their discards back under pressure.',
    color: G700,
  },
  {
    label: 'Dead tiles',
    note: '3–4 copies visible',
    body: 'A tile with 3 copies visible has only 1 remaining. Four copies visible means completely safe — it cannot be anyone\'s wait.',
    color: G700,
  },
  {
    label: 'Suji neighbours',
    note: '1-4-7 / 2-5-8 / 3-6-9',
    body: 'If an opponent discarded a 4, tiles 1 and 7 in the same suit are probably not their winning tiles either — they had no use for those sequences.',
    color: AMB,
  },
  {
    label: 'Pair duplicates',
    note: 'Your own pairs',
    body: 'Discarding one tile from your own pair is relatively safe when folding — you know exactly how many copies are live.',
    color: AMB,
  },
];

function SafeTileGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '4px 0 16px' }} className="outs-grid">
      {SAFE_TILE_TYPES.map((t) => (
        <div key={t.label} style={{
          borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.13)',
          background: PAPER, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 600, color: INK }}>{t.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: t.color }}>{t.note}</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: INK2 }}>{t.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Section 3: Suji ─────────────────────────────────────────────────────── */
const SUJI_FAMILIES = [
  { family: '1 · 4 · 7', tiles: ['1', '4', '7'] },
  { family: '2 · 5 · 8', tiles: ['2', '5', '8'] },
  { family: '3 · 6 · 9', tiles: ['3', '6', '9'] },
];

function SujiGrid() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '4px 0 16px' }}>
      {/* Families */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.13)',
        background: PAPER, padding: '16px 20px',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.15em', textTransform: 'uppercase', color: INK3, marginBottom: 14 }}>
          The six suji pairs
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {SUJI_FAMILIES.map((f) => (
            <div key={f.family} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {f.tiles.map((t, i) => (
                <React.Fragment key={t}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 6,
                    border: '1.5px solid rgba(28,74,42,0.18)',
                    background: 'rgba(28,74,42,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: G800,
                  }}>
                    {t}
                  </div>
                  {i < f.tiles.length - 1 && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: INK3 }}>↔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.13)',
        background: PAPER, padding: '14px 20px',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.15em', textTransform: 'uppercase', color: G700, marginBottom: 8 }}>
          How it works
        </div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: INK2 }}>
          If an opponent discarded a <strong style={{ color: INK }}>4</strong>, they weren't holding 2–3 (they'd have wanted the 4 for 2–3–4) or 5–6 (they'd have wanted it for 4–5–6). So <strong style={{ color: INK }}>1</strong> and <strong style={{ color: INK }}>7</strong> in the same suit are likely safe — suji of the 4.
        </p>
      </div>

      {/* Limits */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(184,48,42,0.15)',
        background: 'rgba(184,48,42,0.03)', padding: '14px 20px',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.15em', textTransform: 'uppercase', color: RED, marginBottom: 8 }}>
          When suji fails
        </div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: INK2 }}>
          Suji doesn't cover pair waits, edge waits, or special hand shapes. An opponent could be waiting on an isolated pair that breaks the chow-logic assumption entirely. Treat suji as a probability filter, not a guarantee.
        </p>
      </div>
    </div>
  );
}

/* ── Section 4: Managing a losing hand ──────────────────────────────────── */
const LOSS_RULES = [
  'Stop advancing your hand. Every new tile goes into safe-discard evaluation, not building.',
  'Prioritize tiles that have been discarded by the most dangerous player.',
  'Hold onto your safe tiles longer than feels right — being stuck beats paying.',
  'If two players are both dangerous, find the tile that is safe against both and hold it as long as possible.',
];

function LossManagement() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '4px 0 16px' }}>
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.13)',
        background: PAPER, overflow: 'hidden',
      }}>
        {LOSS_RULES.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: 14,
            padding: '12px 18px',
            borderBottom: i < LOSS_RULES.length - 1 ? '1px solid rgba(28,74,42,0.08)' : 'none',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              color: G700, flexShrink: 0, minWidth: 20,
            }}>
              {i + 1}
            </span>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK2 }}>{r}</p>
          </div>
        ))}
      </div>
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.12)',
        background: 'rgba(28,74,42,0.04)', padding: '12px 18px',
      }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK2 }}>
          <strong style={{ color: INK }}>Defense improves gradually.</strong> Most players develop offensive skills first and defensive skills years later. If you consciously practice the fold decision — even just recognizing three exposures — you are ahead of most beginners at the table.
        </p>
      </div>
    </div>
  );
}

/* ── Chapter export ──────────────────────────────────────────────────────── */
export function DefensivePlayChapter() {
  return (
    <div style={{ marginTop: 8 }}>
      <ChapSection n={1} title="When to fold" tag="read the table">
        <P>
          Folding means abandoning your hand plan and switching to purely safe discards. It costs you the win but protects against large payments. Over a long session, the players who lose least tend to finish ahead of the players who win most.
        </P>
        <FoldSignals />
      </ChapSection>

      <ChapSection n={2} title="Finding safe tiles" tag="tile reading">
        <P>
          Not all tiles are equally dangerous to discard. There is a rough hierarchy — use it when you're under pressure.
        </P>
        <SafeTileGrid />
      </ChapSection>

      <ChapSection n={3} title={<>Suji</>} tag="inference">
        <P>
          Suji extends the neighbour logic into a structured system. When you know which tiles an opponent threw away, you can infer which tiles they are probably not waiting on.
        </P>
        <SujiGrid />
      </ChapSection>

      <ChapSection n={4} title="Managing a losing hand" tag="discipline">
        <P>
          When your hand clearly won't win — too far from tenpai, dangerous tiles to hold, strong opponents building fast — manage the loss rather than chase the win.
        </P>
        <LossManagement />
      </ChapSection>
    </div>
  );
}
