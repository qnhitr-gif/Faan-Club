const STEPS = [
  { label: 'Shuffle',        desc: 'All 144 tiles mixed face-down' },
  { label: 'Build walls',    desc: '18 tiles wide, 2 high per player' },
  { label: 'Deal',           desc: 'East gets 14 tiles, others 13' },
  { label: 'Draw & discard', desc: 'One tile in, one tile out per turn' },
  { label: 'Win',            desc: 'Complete a valid 14-tile hand' },
];

export function GameFlow() {
  return (
    <div className="my-6 flex flex-col md:flex-row items-stretch">
      {STEPS.map((s, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center md:items-stretch flex-1 min-w-0">
          <div className="flex-1 rounded-lg bg-elev hairline border px-4 py-3 flex flex-col">
            <div
              className="text-tertiary mb-2"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="font-serif text-[15px] font-medium text-primary leading-snug mb-1">
              {s.label}
            </div>
            <div className="text-[12px] text-secondary leading-snug mt-auto">
              {s.desc}
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex items-center justify-center px-1 py-1 md:py-0 shrink-0 text-brand-green/25 text-[11px]">
              <span className="hidden md:block">→</span>
              <span className="md:hidden">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Welcome intro ─────────────────────────────────────────────────────────────

export function WelcomeIntro({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: 40, borderBottom: '1px solid rgba(35,88,54,0.15)', marginBottom: 48 }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.6, color: '#2C2A26', maxWidth: 680 }}>
        {children}
      </div>
    </div>
  );
}

// ── Two column split ──────────────────────────────────────────────────────────

export function Split({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {children}
    </div>
  );
}

export function SplitCol({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 3, height: 28, background: '#235836', borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#1c4a2a' }}>{label}</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  );
}

// ── Mission block ─────────────────────────────────────────────────────────────

export function MissionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      margin: '48px 0',
      padding: '36px 40px',
      borderRadius: 14,
      background: 'rgba(35,88,54,0.05)',
      border: '1px solid rgba(35,88,54,0.15)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -1, left: 40, right: 40, height: 3,
        background: 'linear-gradient(90deg, #235836, rgba(35,88,54,0.1))',
        borderRadius: '0 0 2px 2px',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 3, height: 28, background: '#235836', borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#1c4a2a' }}>Why we built this</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  );
}
