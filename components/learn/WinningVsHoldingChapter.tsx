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

/* ── Section 1: Take vs Hold ─────────────────────────────────────────────── */
const TAKE_REASONS = [
  'Wall has 20 or fewer tiles remaining.',
  'The upgrade tile has 3 or 4 copies already visible.',
  'An opponent has 2 or more exposed sets.',
  'The upgrade requires 2 or more specific tiles in sequence.',
  'You are behind and need guaranteed points now.',
];

const HOLD_REASONS = [
  'Wall has more than 20 tiles remaining.',
  'The upgrade needs only 1 specific tile.',
  'That tile has 2 or more live copies in the wall.',
  'No opponent has more than 1 exposure.',
  'Holding does not force a dangerous discard.',
];

function TakeHoldGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '4px 0 20px' }} className="outs-grid">
      {/* Take */}
      <div style={{
        borderRadius: 12, border: '1.5px solid rgba(28,74,42,0.2)',
        background: 'rgba(28,74,42,0.04)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid rgba(28,74,42,0.12)',
          background: 'rgba(28,74,42,0.07)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: G700, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK }}>
            Take the win
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: INK3, letterSpacing: '.12em', textTransform: 'uppercase', marginLeft: 'auto' }}>
            any one applies
          </span>
        </div>
        <ul style={{ margin: 0, padding: '14px 18px 14px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TAKE_REASONS.map((r, i) => (
            <li key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: INK2 }}>{r}</li>
          ))}
        </ul>
      </div>

      {/* Hold */}
      <div style={{
        borderRadius: 12, border: '1.5px solid rgba(184,48,42,0.2)',
        background: 'rgba(184,48,42,0.03)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid rgba(184,48,42,0.12)',
          background: 'rgba(184,48,42,0.06)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: RED, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: INK }}>
            Hold for bigger
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: INK3, letterSpacing: '.12em', textTransform: 'uppercase', marginLeft: 'auto' }}>
            all must apply
          </span>
        </div>
        <ul style={{ margin: 0, padding: '14px 18px 14px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HOLD_REASONS.map((r, i) => (
            <li key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: INK2 }}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Section 2: Upgrade tile problem ─────────────────────────────────────── */
const UPGRADE_CASES = [
  {
    label: 'One tile needed',
    color: G700,
    bg: 'rgba(28,74,42,0.05)',
    border: 'rgba(28,74,42,0.15)',
    body: 'Count live copies. If 5-Bamboo is your upgrade and two are visible in discards, only 2 remain among roughly 20 wall tiles — about 10% per draw. Ask yourself whether that chance justifies passing a guaranteed win.',
  },
  {
    label: 'Two tiles needed',
    color: AMB,
    bg: 'rgba(201,138,43,0.05)',
    border: 'rgba(201,138,43,0.2)',
    body: 'You need a sequence: draw A, then B. The probability compounds. A 10% chance becomes roughly 1% over two draws. Almost never worth holding past the midgame.',
  },
  {
    label: 'The forced discard',
    color: RED,
    bg: 'rgba(184,48,42,0.04)',
    border: 'rgba(184,48,42,0.16)',
    body: 'Holding for an upgrade means drawing a tile and discarding one. If that discard is dangerous to an opponent, you are risking a loss — not just a missed upgrade. Only hold if you can identify a safe discard for whatever you draw next.',
  },
];

function UpgradeCases() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '4px 0 20px' }}>
      {UPGRADE_CASES.map((c) => (
        <div key={c.label} style={{
          borderRadius: 10, border: `1.5px solid ${c.border}`,
          background: c.bg, padding: '14px 18px',
          display: 'flex', gap: 16, alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.14em',
            textTransform: 'uppercase', color: c.color, fontWeight: 700,
            whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2,
          }}>
            {c.label}
          </span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK2 }}>{c.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Section 3: Worked example ───────────────────────────────────────────── */
function WorkedExample() {
  const checks: { label: string; pass: boolean; note: string }[] = [
    { label: 'Wall > 20',            pass: true,  note: '28 tiles remaining' },
    { label: 'Upgrade: 1 tile',      pass: true,  note: '8-Dot only' },
    { label: '2+ live copies',       pass: true,  note: 'One seen, three remain' },
    { label: 'Opponents quiet',      pass: true,  note: 'Nobody past 1 exposure' },
    { label: 'Safe discard ready',   pass: true,  note: 'Characters are cold' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '4px 0 20px' }}>
      {/* Scenario */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.14)',
        background: PAPER, padding: '16px 20px',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.15em', textTransform: 'uppercase', color: INK3, marginBottom: 10 }}>
          Scenario
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: INK2 }}>
          Wall: <strong style={{ color: INK }}>28 tiles.</strong> Tenpai waiting on 6-Dot — common hand + self-draw = <strong style={{ color: INK }}>3 faan.</strong> Drawing 8-Dot instead would complete pure one-suit = <strong style={{ color: INK }}>7 faan.</strong>
        </p>
      </div>

      {/* Checklist */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.14)',
        background: PAPER, overflow: 'hidden',
      }}>
        {checks.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '11px 18px',
            borderBottom: i < checks.length - 1 ? '1px solid rgba(28,74,42,0.08)' : 'none',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: c.pass ? 'rgba(28,74,42,0.12)' : 'rgba(184,48,42,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, color: c.pass ? G700 : RED }}>{c.pass ? '✓' : '✕'}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, color: INK, flex: '0 0 160px' }}>{c.label}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: INK3 }}>{c.note}</span>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(28,74,42,0.2)',
        background: 'rgba(28,74,42,0.06)', padding: '14px 20px',
        display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.15em', textTransform: 'uppercase', color: G700, fontWeight: 700, flexShrink: 0 }}>
          Verdict
        </span>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: INK2 }}>
          All five conditions pass. <strong style={{ color: INK }}>Hold for the upgrade.</strong> Change the wall to 15 tiles and condition one fails — <strong style={{ color: RED }}>take the win.</strong>
        </p>
      </div>

      {/* Note */}
      <div style={{
        borderRadius: 10, border: '1.5px solid rgba(184,48,42,0.15)',
        background: 'rgba(184,48,42,0.03)', padding: '14px 20px',
      }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: INK2 }}>
          <strong style={{ color: INK }}>Don't romanticize the big hand.</strong> Limit hands make great stories. They also require passing many smaller wins and create opportunities to deal into opponents. Consistent play beats heroic play over time.
        </p>
      </div>
    </div>
  );
}

/* ── Chapter export ──────────────────────────────────────────────────────── */
export function WinningVsHoldingChapter() {
  return (
    <div style={{ marginTop: 8 }}>
      <ChapSection n={1} title="The decision framework" tag="core concept">
        <P>
          You're at tenpai. Someone discards your winning tile. The hand is worth 3 faan — enough to win. But one more tile could take you to 5. Do you take it or hold?
        </P>
        <P>
          The conditions for holding require every factor to align. The conditions for taking require only one. In practice, at tenpai, at least one hold condition has usually failed.
        </P>
        <TakeHoldGrid />
      </ChapSection>

      <ChapSection n={2} title="The upgrade tile problem" tag="probability">
        <P>
          When calculating whether to hold, be precise about what you're actually waiting for.
        </P>
        <UpgradeCases />
      </ChapSection>

      <ChapSection n={3} title="Worked example" tag="applied">
        <WorkedExample />
      </ChapSection>
    </div>
  );
}
