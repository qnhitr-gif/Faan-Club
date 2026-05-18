import { TileRow } from '@/components/TileRow';
import type { TileFace } from '@/lib/tiles';

type LooseTile = { suit: string; value: number | string };

// ── Section layout (two-column sidebar style matching HandSelectionChapter) ──

export function ScoringSection({
  n, title, tag, children,
}: {
  n: number; title: string; tag?: string; children: React.ReactNode;
}) {
  const nStr = String(n).padStart(2, '0');
  return (
    <>
      <style>{`@media(max-width:768px){.scoring-sec{grid-template-columns:1fr!important;}}`}</style>
      <section style={{
        paddingTop: 48, paddingBottom: 48,
        borderTop: '1px solid rgba(20,54,31,.18)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,220px) minmax(0,1fr)',
        gap: '0 56px',
        alignItems: 'flex-start',
      }} className="scoring-sec">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 72, alignSelf: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 46, color: '#1c4a2a', letterSpacing: '-.02em', lineHeight: .9 }}>{nStr}</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500, color: '#16170f', lineHeight: 1.2 }}>{title}</span>
          {tag && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a7a6a' }}>— {tag}</span>}
        </div>
        <div>{children}</div>
      </section>
    </>
  );
}

// ── Pattern grid + card ───────────────────────────────────────────────────────

export function PatternGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 | 3 }) {
  const colClass = cols === 3 ? 'md:grid-cols-3' : cols === 2 ? 'md:grid-cols-2' : '';
  return (
    <div className={`my-6 grid grid-cols-1 gap-5 ${colClass}`}>
      {children}
    </div>
  );
}

export function PatternCard({
  name,
  chinese,
  faan,
  faanMax,
  limit = false,
  tiles,
  description,
}: {
  name: string;
  chinese: string;
  faan: number;
  faanMax?: number;
  limit?: boolean;
  tiles: LooseTile[];
  description?: string;
}) {
  return (
    <div style={{ borderRadius: 10, border: '1px solid var(--border-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '7px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: '2px solid #235836', margin: 6, borderRadius: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: '#1c4a2a', lineHeight: 1 }}>{name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(28,74,42,0.5)' }}>{chinese}</div>
        </div>
        {limit ? (
          <span className="shrink-0 px-2.5 py-1 rounded-md text-ui font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
            Limit
          </span>
        ) : (
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#1c4a2a', whiteSpace: 'nowrap' }}>
            {faan === 0 ? '0 faan' : faanMax ? `${faan}–${faanMax} faan` : `${faan} faan`}
          </span>
        )}
      </div>
      {/* Tiles */}
      <div className="px-5 py-3 overflow-x-auto" style={{ background: 'rgba(35,88,54,0.025)' }}>
        <TileRow tiles={tiles as TileFace[]} size="xs" gap="tight" nowrap />
      </div>
      {/* Description */}
      {description && (
        <p className="px-5 pb-4 pt-2 text-[13px] text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

// ── Honor bonus grid + card ───────────────────────────────────────────────────

export function HonorGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">{children}</div>;
}

export function HonorCard({
  label,
  faan,
  tiles,
  tileGroups,
  note,
}: {
  label: string;
  faan: number;
  tiles: LooseTile[];
  tileGroups?: LooseTile[][];
  note?: string;
}) {
  const groups = tileGroups ?? (tiles.length > 0 ? [tiles] : []);
  return (
    <div style={{ borderRadius: 10, border: '1px solid var(--border-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '7px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: '2px solid #235836', margin: 6, borderRadius: 6 }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: '#1c4a2a', lineHeight: 1 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#1c4a2a', whiteSpace: 'nowrap' }}>+{faan} faan</span>
      </div>
      {/* Tiles */}
      {groups.length > 0 && (
        <div className="px-5 py-3 overflow-x-auto" style={{ background: 'rgba(35,88,54,0.025)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {groups.map((group, i) => (
            <>
              <TileRow key={i} tiles={group as TileFace[]} size="sm" gap="tight" />
              {i < groups.length - 1 && (
                <span key={`or-${i}`} style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12, color: '#7a7a6a', flexShrink: 0 }}>or</span>
              )}
            </>
          ))}
        </div>
      )}
      {/* Note */}
      {note && (
        <p className="px-5 pb-4 pt-2 text-[13px] text-secondary leading-relaxed">{note}</p>
      )}
    </div>
  );
}

// ── Win methods ───────────────────────────────────────────────────────────────

// ── Rare hand grid + card ─────────────────────────────────────────────────────

export function RareHandGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </div>
  );
}

export function RareHandCard({
  name,
  chinese,
  faan,
  faanMax,
  tiles,
  description,
}: {
  name: string;
  chinese: string;
  faan: number;
  faanMax?: number;
  tiles: LooseTile[];
  description?: string;
}) {
  const hasRange = faanMax !== undefined && faanMax !== faan;
  return (
    <div style={{ borderRadius: 10, border: '1px solid var(--border-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '7px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: '2px solid #235836', margin: 6, borderRadius: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: '#1c4a2a', lineHeight: 1 }}>{name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(28,74,42,0.5)' }}>{chinese}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,74,42,0.45)', marginBottom: 2 }}>base</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#1c4a2a', lineHeight: 1 }}>{faan}</div>
            </div>
            <div style={{ color: 'rgba(28,74,42,0.2)', fontSize: 12, lineHeight: 1 }}>|</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,74,42,0.45)', marginBottom: 2 }}>max</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#1c4a2a', lineHeight: 1 }}>{faanMax ?? faan}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Tiles */}
      <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(35,88,54,0.12)', background: 'rgba(35,88,54,0.03)', overflowX: 'auto' }}>
        <TileRow tiles={tiles as TileFace[]} size="xs" gap="tight" nowrap />
      </div>
      {/* Description */}
      {description && (
        <p style={{ padding: '10px 18px 14px', fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function WinMethods({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">{children}</div>;
}

export function WinMethod({
  label,
  chinese,
  faan,
  limit = false,
  description,
}: {
  label: string;
  chinese: string;
  faan: number | string;
  limit?: boolean;
  description: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 0, borderRadius: 10, border: '1px solid var(--border-secondary)', overflow: 'hidden' }}>
      {/* Faan column */}
      <div style={{
        flexShrink: 0, width: 64,
        background: limit ? 'rgba(184,48,42,0.07)' : 'rgba(35,88,54,0.07)',
        borderRight: `2px solid ${limit ? 'rgba(184,48,42,0.25)' : '#235836'}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '12px 0', gap: 2,
      }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, color: limit ? '#b8302a' : '#1c4a2a', lineHeight: 1 }}>
          {limit ? faan : `+${faan}`}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: limit ? 'rgba(184,48,42,0.5)' : 'rgba(28,74,42,0.45)' }}>
          faan
        </span>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500, color: '#1c4a2a' }}>{label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(28,74,42,0.45)' }}>{chinese}</span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

// ── Payout rules ──────────────────────────────────────────────────────────────

export function PayoutRules() {
  const rows = [
    {
      label: 'Win by discard',
      chinese: '食糊',
      who: 'The discarder pays the full amount alone.',
      note: 'The other two players pay nothing.',
    },
    {
      label: 'Win by self-draw',
      chinese: '自摸',
      who: 'All three opponents each pay the full amount.',
      note: 'Three separate payments — self-draw always pays more overall.',
    },
    {
      label: 'Dealer bonus',
      chinese: '莊家',
      who: 'East pays and receives double.',
      note: 'The biggest single payout at the table.',
    },
  ];

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {rows.map((r) => (
        <div key={r.label} style={{ borderRadius: 10, border: '1px solid var(--border-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(35,88,54,0.025)' }}>
          {/* Top accent */}
          <div style={{ height: 3, background: '#235836', flexShrink: 0 }} />
          {/* Content */}
          <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 500, color: '#1c4a2a' }}>{r.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(28,74,42,0.45)', whiteSpace: 'nowrap' }}>{r.chinese}</span>
            </div>
            <div style={{ width: '100%', height: 1, background: 'rgba(35,88,54,0.15)' }} />
            <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.55 }}>{r.who}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{r.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Faan scale ────────────────────────────────────────────────────────────────

export function FaanScale() {
  const rows = [
    { faan: 1,  units: 0.25, label: '¼' },
    { faan: 2,  units: 0.5,  label: '½' },
    { faan: 3,  units: 1,    label: '1' },
    { faan: 4,  units: 2,    label: '2' },
    { faan: 5,  units: 4,    label: '4' },
    { faan: 6,  units: 8,    label: '8' },
    { faan: 7,  units: 16,   label: '16' },
    { faan: 8,  units: 24,   label: '24' },
    { faan: 9,  units: 32,   label: '32' },
    { faan: 10, units: 48,   label: '48' },
    { faan: 11, units: 64,   label: '64', cap: true },
  ] as const;

  const max = 64;

  return (
    <div className="my-6" style={{ borderRadius: 12, border: '1px solid var(--border-secondary)', overflow: 'hidden' }}>
      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 56px', alignItems: 'center', gap: 12, padding: '8px 20px', background: 'rgba(35,88,54,0.06)', borderBottom: '1px solid rgba(35,88,54,0.12)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,74,42,0.5)' }}>Faan</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,74,42,0.5)' }}>Scale</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(28,74,42,0.5)', textAlign: 'right' }}>Units</div>
      </div>

      {rows.map((r, i) => {
        const isCap = 'cap' in r && r.cap;
        const pct = (r.units / max) * 100;
        return (
          <div
            key={r.faan}
            style={{
              display: 'grid', gridTemplateColumns: '48px 1fr 56px', alignItems: 'center', gap: 12,
              padding: '9px 20px',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(35,88,54,0.07)' : 'none',
              background: isCap ? 'rgba(184,48,42,0.04)' : 'transparent',
            }}
          >
            {/* Faan number */}
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 500, color: isCap ? '#b8302a' : '#1c4a2a', lineHeight: 1 }}>
              {r.faan}
            </div>
            {/* Bar */}
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(35,88,54,0.08)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                background: isCap ? '#b8302a' : '#235836',
                width: `${pct}%`,
                minWidth: r.units > 0 ? 4 : 0,
                opacity: isCap ? 0.5 : 0.45,
              }} />
            </div>
            {/* Units */}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: isCap ? '#b8302a' : '#1c4a2a', textAlign: 'right', lineHeight: 1 }}>
              {r.label}
              {isCap && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(184,48,42,0.5)', marginLeft: 3 }}>cap</span>}
            </div>
          </div>
        );
      })}

      <div style={{ padding: '8px 20px', borderTop: '1px solid rgba(35,88,54,0.12)', background: 'rgba(35,88,54,0.025)', fontSize: 12, color: 'var(--text-tertiary)' }}>
        House rules vary — some tables double at each faan step, others use a fixed schedule like this.
      </div>
    </div>
  );
}
