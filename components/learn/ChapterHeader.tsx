// Reusable styled chapter header for MDX chapters that set hideHeader: true
// Usage: <ChapterHeader n={5} plain="Count your" italic="faan." />

interface ChapterHeaderProps {
  n: number;
  plain: string;
  mid?: string;
  italic: string;
}

export function ChapterHeader({ n, plain, mid, italic }: ChapterHeaderProps) {
  return (
    <div style={{ paddingTop: 32, marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>
          CHAPTER {String(n).padStart(2, '0')}
        </span>
        <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 4.5vw, 68px)',
        fontWeight: 600,
        lineHeight: 1.0,
        letterSpacing: '-0.02em',
        color: '#16170f',
        marginBottom: 32,
      }}>
        {plain}{mid ? <> {mid}</> : null}{' '}
        <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>{italic}</em>
      </h1>
    </div>
  );
}
