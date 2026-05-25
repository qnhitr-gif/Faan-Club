import { Tile } from '@/components/Tile';
import type { TileFace } from '@/lib/tiles';
import React from 'react';

type LooseTile = { suit: string; value: number | string };

// ── Winning hand demo ─────────────────────────────────────────────────────────

const DEMO_GROUPS: { type: string; chinese: string; tiles: LooseTile[]; pair?: boolean }[] = [
  {
    type: 'Chow',
    chinese: '上',
    tiles: [
      { suit: 'dot', value: 2 },
      { suit: 'dot', value: 3 },
      { suit: 'dot', value: 4 },
    ],
  },
  {
    type: 'Chow',
    chinese: '上',
    tiles: [
      { suit: 'bamboo', value: 6 },
      { suit: 'bamboo', value: 7 },
      { suit: 'bamboo', value: 8 },
    ],
  },
  {
    type: 'Pung',
    chinese: '碰',
    tiles: [
      { suit: 'character', value: 9 },
      { suit: 'character', value: 9 },
      { suit: 'character', value: 9 },
    ],
  },
  {
    type: 'Pung',
    chinese: '碰',
    tiles: [
      { suit: 'dragon', value: 'green' },
      { suit: 'dragon', value: 'green' },
      { suit: 'dragon', value: 'green' },
    ],
  },
  {
    type: 'Pair',
    chinese: '雀',
    tiles: [
      { suit: 'wind', value: 'east' },
      { suit: 'wind', value: 'east' },
    ],
    pair: true,
  },
];

export function WinningHand() {
  return (
    <>
      <div className="my-6 rounded-lg bg-elev hairline-strong border overflow-hidden">
      {/* Groups */}
      <div className="px-6 pt-6 pb-4 flex items-end gap-4 overflow-x-auto">
        {DEMO_GROUPS.map((g, i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0">
            {/* Separator before pair */}
            {g.pair && (
              <div className="absolute" style={{ display: 'none' }} />
            )}
            <div className={`flex gap-1 ${g.pair ? 'pl-3 border-l-2 border-brand-green/20' : ''}`}>
              {g.tiles.map((t, ti) => (
                <Tile key={ti} face={t as TileFace} size="md" />
              ))}
            </div>
            {/* Label */}
            <div className="text-center">
              <div className="text-[12px] font-medium text-brand-green">{g.type}</div>
              <div className="text-[10px] text-tertiary" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                {g.chinese}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="px-6 py-3 border-t border-brand-green/10 flex items-center gap-3 flex-wrap">
        <span className="text-ui text-secondary">
          4 melds <span className="text-tertiary mx-1">×</span> 3 tiles
        </span>
        <span className="text-tertiary text-ui">+</span>
        <span className="text-ui text-secondary">
          1 pair <span className="text-tertiary mx-1">×</span> 2 tiles
        </span>
        <span className="text-tertiary text-ui">=</span>
        <span className="text-ui font-medium text-primary">14 tiles</span>
      </div>
    </div>
    </>
  );
}

// ── Hand formula ─────────────────────────────────────────────────────────────

export function HandFormula() {
  return (
    <p style={{
      fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.7,
      color: '#44463a', margin: '12px 0 4px',
    }}>
      Each meld is either a chow or a pung/kong.
      The pair is <em style={{ fontStyle: 'italic' }}>separate</em>: exactly one, no more, no less.
    </p>
  );
}

// ── Meld type grid + card ─────────────────────────────────────────────────────

export function MeldGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const colClass = cols === 4 ? 'md:grid-cols-4' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  return (
    <div className={`my-6 grid grid-cols-1 gap-4 ${colClass}`}>
      {children}
    </div>
  );
}

export function MeldCard({
  name,
  chinese,
  tiles,
  children,
}: {
  name: string;
  chinese: string;
  tiles: LooseTile[];
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-elev hairline-strong border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-baseline justify-between gap-2">
        <div className="font-serif text-[18px] font-medium text-primary">{name}</div>
        <div
          className="text-tertiary shrink-0"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em' }}
        >
          {chinese}
        </div>
      </div>
      {/* Tiles */}
      <div className="px-5 pb-4 flex gap-1 flex-wrap">
        {tiles.map((t, i) => (
          <Tile key={i} face={t as TileFace} size="sm" />
        ))}
      </div>
      {/* Description */}
      {children && (
        <div className="px-5 py-3 border-t border-brand-green/10 text-[13px] text-secondary leading-relaxed mt-auto">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Claim rules ───────────────────────────────────────────────────────────────

const CLAIMS: {
  name: string;
  chinese: string;
  canClaim: boolean;
  who: string;
  what: string;
  rule: string;
  exception?: string;
  tiles: LooseTile[];
}[] = [
  {
    name: 'Pung',
    chinese: '碰',
    canClaim: true,
    who: 'Anyone at the table',
    what: 'Three identical tiles. Works with any tile: numbered suits, winds, or dragons.',
    rule: 'When anyone discards the third, call pung. Take it, expose all three face-up, then discard one tile.',
    tiles: [
      { suit: 'dot', value: 6 },
      { suit: 'dot', value: 6 },
      { suit: 'dot', value: 6 },
    ],
  },
  {
    name: 'Chow',
    chinese: '上',
    canClaim: true,
    who: 'Left-hand player only',
    what: 'Three consecutive tiles in the same suit. Never across suits, and never with winds or dragons.',
    rule: 'Call chow on the discard that completes your sequence, but only from the player on your left.',
    tiles: [
      { suit: 'bamboo', value: 4 },
      { suit: 'bamboo', value: 5 },
      { suit: 'bamboo', value: 6 },
    ],
  },
  {
    name: 'Kong',
    chinese: '槓',
    canClaim: true,
    who: 'Anyone at the table',
    what: 'All four copies of the same tile. Counts as one meld, but you draw a replacement tile from the back of the wall.',
    rule: 'When anyone discards the fourth, call kong. Expose all four, draw a replacement tile from the back of the wall, then discard.',
    tiles: [
      { suit: 'wind', value: 'west' },
      { suit: 'wind', value: 'west' },
      { suit: 'wind', value: 'west' },
      { suit: 'wind', value: 'west' },
    ],
  },
  {
    name: 'Pair',
    chinese: '雀',
    canClaim: false,
    who: 'Cannot be claimed mid-game',
    what: 'Two identical tiles. Your hand needs exactly one. It holds the shape together but cannot double as a meld.',
    rule: 'You cannot call a discard to form your pair during play.',
    exception: 'Exception: if the discard completes your pair and wins the hand, you can call it.',
    tiles: [
      { suit: 'dragon', value: 'white' },
      { suit: 'dragon', value: 'white' },
    ],
  },
];

const G = '#1c4a2a';
const R = '#b8302a';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';

export function ClaimRules() {
  return (
    <div style={{ margin: '8px 0 28px' }}>
      {/*
        Each card spans all 6 row tracks; subgrid inherits those tracks
        so the same row (header / tiles / what / divider / who / rule)
        lines up across every column.
      */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto auto auto 1px auto auto',
        columnGap: 12,
        rowGap: 0,
      }}>
        {CLAIMS.map((c, idx) => {
          const accent = c.canClaim ? G : R;
          const accentBg = c.canClaim ? 'rgba(28,74,42,0.07)' : 'rgba(184,48,42,0.06)';
          const borderColor = c.canClaim ? 'rgba(28,74,42,0.14)' : 'rgba(184,48,42,0.2)';
          return (
            <div
              key={c.name}
              style={{
                gridColumn: idx + 1,
                gridRow: '1 / 7',
                display: 'grid',
                gridTemplateRows: 'subgrid',
                borderRadius: 12,
                border: `1.5px solid ${borderColor}`,
                background: '#fcfaf3',
                overflow: 'hidden',
              }}
            >
              {/* Row 1 — Header */}
              <div style={{
                padding: '12px 16px 10px',
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                background: accentBg,
                alignSelf: 'stretch',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#16170f' }}>
                    {c.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: INK3, letterSpacing: '0.1em' }}>
                    {c.chinese}
                  </span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '3px 8px', borderRadius: 20, flexShrink: 0,
                  background: c.canClaim ? 'rgba(28,74,42,0.12)' : 'rgba(184,48,42,0.1)',
                }}>
                  <span style={{ fontSize: 9, color: accent }}>{c.canClaim ? '✓' : '✕'}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 500, color: accent, whiteSpace: 'nowrap' }}>
                    {c.canClaim ? 'Can claim' : 'No claim'}
                  </span>
                </div>
              </div>

              {/* Row 2 — Tiles */}
              <div style={{ padding: '14px 16px 10px', display: 'flex', gap: 4, flexWrap: 'wrap', alignSelf: 'start' }}>
                {c.tiles.map((t, i) => (
                  <Tile key={i} face={t as TileFace} size="sm" />
                ))}
              </div>

              {/* Row 3 — What it is */}
              <div style={{ padding: '0 16px 12px', alignSelf: 'start' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.6, color: INK2, margin: 0 }}>
                  {c.what}
                </p>
              </div>

              {/* Row 4 — Divider */}
              <div style={{ margin: '0 16px', borderTop: `1px solid ${borderColor}`, alignSelf: 'center' }} />

              {/* Row 5 — Who label */}
              <div style={{ padding: '10px 16px 4px', alignSelf: 'start' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: accent, fontWeight: 600,
                }}>
                  {c.who}
                </div>
              </div>

              {/* Row 6 — Claim rule */}
              <div style={{ padding: '0 16px 14px', alignSelf: 'start' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.6, color: INK2, margin: 0 }}>
                  {c.rule}
                  {c.exception && (
                    <> <strong style={{ fontWeight: 600, color: '#16170f' }}>{c.exception}</strong></>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Wall breakdown ────────────────────────────────────────────────────────────

const WALL_SEGMENTS = [
  { label: 'Dealt out', count: 53, color: 'rgba(28,74,42,0.12)', text: INK3,  note: '13 each · East gets 14' },
  { label: 'Live wall', count: 83, color: 'rgba(28,74,42,0.55)', text: '#fff', note: 'Draw from here each turn. Kong replacements come from the back of this wall.' },
];
const TOTAL = 136;

export function WallBreakdown() {
  return (
    <div style={{ margin: '8px 0 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Segmented bar */}
      <div style={{
        borderRadius: 12, border: '1.5px solid rgba(28,74,42,0.14)',
        background: '#fcfaf3', overflow: 'hidden',
        padding: '20px 24px',
      }}>
        {/* Label row */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: INK3, marginBottom: 12,
        }}>
          136 tiles · one wall
        </div>

        {/* Bar */}
        <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 36 }}>
          {WALL_SEGMENTS.map((s) => (
            <div
              key={s.label}
              style={{
                flex: s.count,
                background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: s.text,
                whiteSpace: 'nowrap',
              }}>
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 0, marginTop: 14 }}>
          {WALL_SEGMENTS.map((s, i) => (
            <div key={s.label} style={{ flex: s.count, minWidth: 0, paddingRight: i < WALL_SEGMENTS.length - 1 ? 12 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: '#16170f', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: INK2, lineHeight: 1.4 }}>
                {s.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* When wall empties */}
      <div style={{
        borderRadius: 12, border: '1.5px solid rgba(184,48,42,0.18)',
        background: 'rgba(184,48,42,0.03)', padding: '18px 22px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: R, fontWeight: 600,
        }}>
          When the live wall runs out
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.65, color: INK2, margin: 0 }}>
          The round ends in a <strong style={{ color: '#16170f', fontWeight: 600 }}>draw</strong> — sometimes called a goulash. No points change hands. East stays East and the round replays. Only a win by another player rotates the wind seat.
        </p>
      </div>

    </div>
  );
}

// ── Call priority ─────────────────────────────────────────────────────────────

export function CallPriority() {
  return (
    <div style={{
      margin: '8px 0 28px',
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 28px',
      borderRadius: 12,
      border: '1.5px solid rgba(28,74,42,0.14)',
      background: '#fcfaf3',
      flexWrap: 'wrap',
    }}>
      {[
        { label: 'Winning hand', color: R },
        { label: 'Pung / Kong', color: G },
        { label: 'Chow', color: '#6b5a00' },
      ].map((item, i, arr) => (
        <React.Fragment key={item.label}>
          <span style={{
            fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600,
            color: item.color,
          }}>
            {item.label}
          </span>
          {i < arr.length - 1 && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: INK3 }}>{'>'}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
