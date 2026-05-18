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
          background: '#faf6ec',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Dot pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(28,74,42,0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          display: 'flex',
        }} />

        {/* Green accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: '100%', background: '#1c4a2a', display: 'flex' }} />

        {/* Eyebrow */}
        <div style={{
          fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#1c4a2a', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', display: 'flex' }} />
          Hong Kong rules
        </div>

        {/* Title */}
        <div style={{
          fontSize: 88, fontWeight: 700, lineHeight: 1,
          color: '#16170f', marginBottom: 32, display: 'flex', flexDirection: 'column',
        }}>
          <span>Faan</span>
          <span style={{ color: '#b8302a', fontStyle: 'italic' }}>Club</span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: 28, fontStyle: 'italic', color: '#44463a',
          lineHeight: 1.5, maxWidth: 700, display: 'flex',
        }}>
          A patient guide to Hong Kong mahjong, taught at the table.
        </div>

        {/* Stats row */}
        <div style={{
          marginTop: 52, display: 'flex', gap: 48,
          borderTop: '1px solid rgba(28,74,42,0.15)', paddingTop: 32,
        }}>
          {[
            { num: '14', label: 'Chapters' },
            { num: 'Beginner → Advanced', label: 'Level' },
          ].map(({ num, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 36, fontWeight: 700, fontStyle: 'italic', color: '#b8302a', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7a6a' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
