'use client';

const G8  = '#1c4a2a';
const G7  = '#235836';
const R   = '#b8302a';
const INK = '#16170f';
const INK2 = '#44463a';
const INK3 = '#7a7a6a';

const STEPS = [
  {
    n: '01',
    title: 'Draw',
    body: <>Take one tile from the front of the wall. Your hand is now 14 tiles. <em style={{ fontStyle: 'italic', color: INK2 }}>The only moment in the game where the future is unknown — anything could arrive.</em></>,
  },
  {
    n: '02',
    title: 'Decide',
    body: <>Look at the new tile. Does it improve your hand? Could it complete a set, finish a sequence, or become the pair you needed? <em style={{ fontStyle: 'italic', color: INK2 }}>This is where mahjong lives.</em></>,
  },
  {
    n: '03',
    title: 'Discard',
    body: <>Place one tile face-up in the center. Your hand is back to 13. Your turn is over — but <em style={{ fontStyle: 'italic', color: INK2 }}>the tile you threw doesn&apos;t disappear.</em></>,
  },
];

export function TurnLoop() {
  return (
    <div style={{ margin: '40px 0' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 32, height: 1, background: INK3, flexShrink: 0 }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: INK3,
        }}>
          Section · The Turn Loop
        </span>
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.1,
        letterSpacing: '-0.02em', color: INK, marginBottom: 16,
        fontVariationSettings: "'SOFT' 50, 'opsz' 144",
      }}>
        Every turn follows the same{' '}
        <em style={{ fontStyle: 'italic', color: G7 }}>three-beat rhythm.</em>
      </h2>

      {/* Subtext */}
      <p style={{
        fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.7,
        color: INK2, marginBottom: 32, maxWidth: 640,
      }}>
        Three steps repeat clockwise around the table — draw a tile, decide what to do with it, throw
        one back. The fourth &ldquo;beat&rdquo; is the loop itself: round after round,{' '}
        <em style={{ fontStyle: 'italic' }}>until someone wins.</em>
      </p>

      {/* Three cards + arrows */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        alignItems: 'stretch',
        gap: 0,
        marginBottom: 12,
      }}
        className="turn-grid"
      >
        {STEPS.map((step, i) => (
          <>
            {/* Card */}
            <div
              key={step.n}
              style={{
                border: `1.5px solid rgba(35,88,54,0.3)`,
                borderRadius: 12,
                padding: '24px 22px',
                background: 'rgba(35,88,54,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Number + title row */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600,
                  fontSize: 28, color: R, lineHeight: 1, flexShrink: 0,
                }}>{step.n}</span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 22, color: G7, lineHeight: 1.1,
                }}>{step.title}</span>
              </div>
              <div style={{ width: '100%', height: 1, background: 'rgba(35,88,54,0.1)' }} />
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 14.5, lineHeight: 1.7,
                color: INK2, margin: 0, flex: 1,
              }}>{step.body}</p>
            </div>

            {/* Arrow between cards */}
            {i < 2 && (
              <div
                key={`arrow-${i}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 6px', color: INK3, fontSize: 18,
                }}
              >
                →
              </div>
            )}
          </>
        ))}
      </div>

      {/* Loop card — full width */}
      <div style={{
        border: '1.5px dashed rgba(35,88,54,0.3)',
        borderRadius: 12,
        padding: '22px 28px',
        background: 'rgba(35,88,54,0.02)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 32,
      }}>
        {/* Infinity icon */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '1.5px solid rgba(35,88,54,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontSize: 20, color: G7,
        }}>
          ∞
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20,
            color: INK, margin: 0, lineHeight: 1.2,
          }}>
            And then again —{' '}
            <em style={{ fontStyle: 'italic', color: G7 }}>until someone wins.</em>
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 14, color: INK2,
            margin: '6px 0 0', lineHeight: 1.6,
          }}>
            One tile in, one tile out, repeated clockwise around the table until a player completes four sets and a pair.
          </p>
        </div>

        {/* Loop badge */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: INK3,
          border: '1px solid rgba(35,88,54,0.2)',
          borderRadius: 4, padding: '5px 10px',
          flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          Loop · 04
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .turn-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
