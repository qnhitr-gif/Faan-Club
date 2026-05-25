import { Tile } from '@/components/Tile';
import type { TileFace } from '@/lib/tiles';

const G7  = '#235836';
const G8  = '#1c4a2a';
const R   = '#b8302a';
const INK = '#16170f';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';
const RICE = '#faf6ec';

type Status = 'done' | 'needs' | 'pair' | 'discard';

interface TileGroup {
  tiles: TileFace[];
  status: Status;
  label: string;
  note: string;
}

const STATUS: Record<Status, { color: string; bg: string; icon: string }> = {
  done:    { color: G7,        bg: 'rgba(35,88,54,0.1)',     icon: '✓' },
  needs:   { color: '#8a5200', bg: 'rgba(176,106,16,0.1)',   icon: '…' },
  pair:    { color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)',   icon: '⇌' },
  discard: { color: R,         bg: 'rgba(184,48,42,0.08)',   icon: '✕' },
};

const GROUPS: TileGroup[] = [
  {
    tiles: [
      { suit: 'dot', value: 3 },
      { suit: 'dot', value: 4 },
      { suit: 'dot', value: 5 },
    ],
    status: 'done',
    label: '3–4–5 Dots',
    note: 'Complete chow',
  },
  {
    tiles: [
      { suit: 'dragon', value: 'green' },
      { suit: 'dragon', value: 'green' },
      { suit: 'dragon', value: 'green' },
    ],
    status: 'done',
    label: 'Green Dragon ×3',
    note: 'Complete pung',
  },
  {
    tiles: [
      { suit: 'bamboo', value: 7 },
      { suit: 'bamboo', value: 8 },
    ],
    status: 'needs',
    label: '7–8 Bamboo',
    note: 'Needs 6 or 9',
  },
  {
    tiles: [
      { suit: 'character', value: 1 },
      { suit: 'character', value: 2 },
    ],
    status: 'needs',
    label: '1–2 Character',
    note: 'Needs 3',
  },
  {
    tiles: [
      { suit: 'dragon', value: 'red' },
      { suit: 'dragon', value: 'red' },
    ],
    status: 'pair',
    label: 'Red Dragon ×2',
    note: 'Your pair',
  },
  {
    tiles: [{ suit: 'dot', value: 9 }],
    status: 'discard',
    label: '9 Dot',
    note: 'Discard',
  },
];

export function HandReading() {
  return (
    <div style={{ margin: '8px 0 32px' }}>

      {/* Intro text */}
      <p style={{
        fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.75,
        color: INK2, margin: '0 0 28px',
      }}>
        While you&apos;re playing, you hold <strong style={{ fontWeight: 600, color: INK }}>13 tiles</strong> — always one short of the winning shape.
        The core question every turn: which tiles are closest to finishing a meld?
      </p>

      {/* Hand container */}
      <div style={{
        borderRadius: 14,
        border: '1px solid rgba(28,74,42,0.14)',
        background: '#fcfaf3',
        overflow: 'hidden',
      }}>

        {/* Header strip */}
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid rgba(28,74,42,0.1)',
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(28,74,42,0.03)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: G8 }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: INK3,
          }}>
            Mid-game hand · 13 tiles
          </span>
        </div>

        {/* Tile groups row */}
        <div style={{
          padding: '24px 20px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          {GROUPS.map((group, i) => {
            const s = STATUS[group.status];
            const isDiscard = group.status === 'discard';
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  opacity: isDiscard ? 0.6 : 1,
                  position: 'relative',
                }}
              >
                {/* Tiles */}
                <div style={{
                  display: 'flex',
                  gap: 3,
                  padding: '8px 10px',
                  borderRadius: 9,
                  border: `1.5px solid ${isDiscard ? 'rgba(184,48,42,0.3)' : 'rgba(28,74,42,0.12)'}`,
                  background: isDiscard ? 'rgba(184,48,42,0.04)' : RICE,
                  boxShadow: isDiscard ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  {group.tiles.map((face, j) => (
                    <Tile key={j} face={face} size="sm" />
                  ))}
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px', borderRadius: 20,
                  background: s.bg,
                }}>
                  <span style={{ fontSize: 10, color: s.color, lineHeight: 1 }}>{s.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 11,
                    fontWeight: 500, color: s.color, whiteSpace: 'nowrap',
                  }}>{group.note}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid rgba(28,74,42,0.08)',
          display: 'flex', flexWrap: 'wrap', gap: 16,
          background: 'rgba(28,74,42,0.02)',
        }}>
          {(Object.entries(STATUS) as [Status, typeof STATUS[Status]][]).map(([key, s]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9.5,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: INK3,
              }}>
                {key === 'done' ? 'Complete' : key === 'needs' ? 'Needs a tile' : key === 'pair' ? 'Pair' : 'Discard'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Takeaway */}
      <div style={{
        marginTop: 16,
        padding: '14px 18px',
        borderRadius: 9,
        border: '1px solid rgba(184,48,42,0.2)',
        background: 'rgba(184,48,42,0.03)',
        fontFamily: 'var(--font-serif)', fontSize: 15,
        lineHeight: 1.65, color: INK2,
        display: 'flex', alignItems: 'baseline', gap: 10,
      }}>
        <span style={{ color: R, fontWeight: 600, fontStyle: 'normal', flexShrink: 0 }}>→</span>
        Discard the 9 Dot. You&apos;re <strong style={{ fontWeight: 600, color: INK }}>two tiles from winning</strong> — one to finish each open chow.
      </div>

    </div>
  );
}
