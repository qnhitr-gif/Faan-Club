import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Faan Club — Learn Hong Kong Mahjong';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1c4a2a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Red corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 200, height: 200,
          background: '#b8302a',
          borderRadius: '0 0 0 100%',
          display: 'flex',
        }} />

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#faf6ec', display: 'flex' }} />
          <div style={{
            fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(250,246,236,0.55)', fontFamily: 'monospace',
          }}>
            Hong Kong Rules · faanclub.co
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, zIndex: 1 }}>
          <div style={{
            fontSize: 100, fontWeight: 700, lineHeight: 0.92,
            color: '#faf6ec', fontStyle: 'italic',
          }}>
            Faan Club
          </div>
          <div style={{
            fontSize: 28, color: 'rgba(250,246,236,0.7)',
            fontStyle: 'italic', lineHeight: 1.45, maxWidth: 660,
          }}>
            A patient guide to Hong Kong mahjong,
            taught at the table.
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 0, zIndex: 1,
          borderTop: '1px solid rgba(250,246,236,0.15)',
          paddingTop: 28,
        }}>
          {[
            { num: '14',                  label: 'Chapters' },
            { num: 'Beginner → Advanced', label: 'Level'    },
            { num: 'Free',                label: 'Always'   },
          ].map(({ num, label }, i) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', gap: 7,
              paddingRight: 44,
              borderRight: i < 2 ? '1px solid rgba(250,246,236,0.15)' : 'none',
              marginRight: i < 2 ? 44 : 0,
            }}>
              <div style={{
                fontSize: i === 0 ? 42 : 26,
                fontWeight: 700, fontStyle: 'italic',
                color: '#faf6ec', lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontSize: 11, letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,236,0.45)',
                fontFamily: 'monospace',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
