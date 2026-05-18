import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Faan Club — Learn Hong Kong Mahjong';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  // Load Fraunces italic from Google Fonts
  const fontRes = await fetch(
    'https://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemj05p_8OKz_-A.woff2'
  ).catch(() => null);
  const fontData = fontRes ? await fontRes.arrayBuffer() : null;

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
        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Red corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 220, height: 220,
          background: '#b8302a',
          borderRadius: '0 0 0 100%',
          display: 'flex',
          opacity: 0.9,
        }} />

        {/* Top row: eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, zIndex: 1,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#faf6ec', display: 'flex',
          }} />
          <div style={{
            fontSize: 16, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(250,246,236,0.6)', fontFamily: 'monospace',
          }}>
            Hong Kong Rules · faanclub.vercel.app
          </div>
        </div>

        {/* Centre: big title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
          <div style={{
            fontSize: 96, fontWeight: 700, lineHeight: 0.95,
            color: '#faf6ec',
            fontFamily: fontData ? 'Fraunces' : 'Georgia, serif',
            fontStyle: 'italic',
          }}>
            Faan Club
          </div>
          <div style={{
            fontSize: 30, color: 'rgba(250,246,236,0.75)',
            fontStyle: 'italic', lineHeight: 1.4, maxWidth: 680,
            fontFamily: 'Georgia, serif',
          }}>
            A patient guide to Hong Kong mahjong,<br />taught at the table.
          </div>
        </div>

        {/* Bottom row: stats */}
        <div style={{
          display: 'flex', gap: 0, zIndex: 1,
          borderTop: '1px solid rgba(250,246,236,0.15)',
          paddingTop: 28,
        }}>
          {[
            { num: '14', label: 'Chapters' },
            { num: 'Beginner → Advanced', label: 'Level' },
            { num: 'Free', label: 'Always' },
          ].map(({ num, label }, i) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', gap: 6,
              paddingRight: 48,
              borderRight: i < 2 ? '1px solid rgba(250,246,236,0.15)' : 'none',
              marginRight: i < 2 ? 48 : 0,
            }}>
              <div style={{
                fontSize: i === 0 ? 40 : 28,
                fontWeight: 700, fontStyle: 'italic',
                color: '#faf6ec', lineHeight: 1,
                fontFamily: 'Georgia, serif',
              }}>{num}</div>
              <div style={{
                fontSize: 12, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,236,0.5)',
                fontFamily: 'monospace',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData ? [{ name: 'Fraunces', data: fontData, style: 'italic', weight: 700 }] : [],
    }
  );
}
