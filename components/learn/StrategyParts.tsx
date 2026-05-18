import type { TileFace, SuitedValue } from '@/lib/tiles';
import { Tile } from '@/components/Tile';

export function Section({
  n, title, children, defaultOpen = true,
}: {
  n: number; title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group mt-12 pt-5 border-t border-brand-green/30 [&_summary::-webkit-details-marker]:hidden">
      <summary className="list-none cursor-pointer flex items-baseline gap-3 select-none">
        <span className="font-serif text-[26px] leading-tight font-medium tracking-tight text-brand-green tabular-nums shrink-0">
          {String(n).padStart(2, '0')}
        </span>
        <span className="font-serif text-[26px] leading-tight font-medium tracking-tight text-primary">
          {title}
        </span>
        <span className="ml-auto text-tertiary transition-transform duration-200 group-open:rotate-180" aria-hidden>▾</span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

export function Pillars({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const colClass = cols === 4 ? 'md:grid-cols-4' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <div className={`grid grid-cols-1 gap-3 my-6 ${colClass}`}>
      {children}
    </div>
  );
}

export function Pillar({ n, title, href, children }: { n: number; title: string; href?: string; children: React.ReactNode }) {
  const inner = (
    <div style={{
      borderRadius: 12,
      border: '1.5px solid rgba(35,88,54,0.3)',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(35,88,54,0.04)',
      transition: 'border-color 0.15s, box-shadow 0.15s',
    }}
      className={href ? 'hover:border-brand-green/50 hover:shadow-sm group' : ''}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: '#235836', flexShrink: 0 }} />
      {/* Content */}
      <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.08em',
            background: 'rgba(184,48,42,0.08)', color: '#b8302a',
            borderRadius: 4, padding: '3px 9px', lineHeight: '22px', flexShrink: 0,
          }}>{String(n).padStart(2, '0')}</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: '#235836', lineHeight: 1.2 }}
            className={href ? 'group-hover:text-brand-green transition-colors' : ''}
          >{title}</span>
          {href && <span style={{ marginLeft: 'auto', color: 'rgba(35,88,54,0.3)', fontSize: 16 }} className="group-hover:text-brand-green transition-colors">→</span>}
        </div>
        <div style={{ width: '100%', height: 1, background: 'rgba(35,88,54,0.1)' }} />
        <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', flex: 1 }}>{children}</div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>{inner}</a>;
  }
  return inner;
}

export function Stages({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">{children}</div>;
}

function WallMeter({ pct, tone }: { pct: number; tone: 'green' | 'amber' | 'red' }) {
  const fill =
    tone === 'amber' ? 'bg-amber-500' :
    tone === 'red'   ? 'bg-brand-inkRed' :
                       'bg-brand-green';
  return (
    <div className="my-3" aria-label={`Wall remaining: ${pct}%`}>
      <div className="h-1.5 rounded-full bg-brand-green/10 overflow-hidden">
        <div className={`h-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const STAGE_PCT: Record<'green' | 'amber' | 'red', number> = { green: 78, amber: 42, red: 14 };

export function Stage({
  n, name, wall, turns, tone = 'green', children,
}: {
  n: number; name: string; wall: string; turns: string;
  tone?: 'green' | 'amber' | 'red';
  children: React.ReactNode;
}) {
  const toneCls =
    tone === 'amber' ? 'text-amber-600 bg-amber-500/15 border-amber-500/30' :
    tone === 'red'   ? 'text-brand-inkRed bg-brand-inkRed/10 border-brand-inkRed/30' :
                       'text-brand-green bg-brand-green/15 border-brand-green/30';
  return (
    <div className="rounded-lg p-4 bg-elev hairline-strong border h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`text-ui font-medium px-2 py-0.5 rounded border ${toneCls}`}>Stage {n}</span>
        <span className="font-sans text-h3 font-medium text-primary">{name}</span>
      </div>
      <div className="text-ui text-tertiary">Wall {wall} · Turns {turns}</div>
      <WallMeter pct={STAGE_PCT[tone]} tone={tone} />
      <div className="text-body text-secondary">{children}</div>
    </div>
  );
}

export function WaitPattern({
  pattern, options,
}: {
  pattern: TileFace[];
  options: Array<{ discard: TileFace; remaining: TileFace[]; outs: TileFace[]; outsCount: number; label: string }>;
}) {
  return (
    <div className="my-6 rounded-lg bg-elev hairline-strong border p-4">
      <div className="text-ui text-tertiary mb-2">Hand fragment</div>
      <div className="flex gap-1 mb-4">
        {pattern.map((t, i) => <Tile key={i} face={t} size="sm" />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <div key={i} className="rounded-lg border border-brand-green/20 bg-info p-3">
            <div className="text-ui text-tertiary mb-2">{opt.label}</div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-ui text-secondary">discard</span>
              <Tile face={opt.discard} size="sm" />
              <span className="text-ui text-secondary">→ wait</span>
              <div className="flex gap-1">
                {opt.remaining.map((t, j) => <Tile key={j} face={t} size="sm" />)}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-ui text-secondary">wins on</span>
              <div className="flex gap-1">
                {opt.outs.map((t, j) => <Tile key={j} face={t} size="sm" />)}
              </div>
              <span className="font-serif text-h3 text-brand-green tabular-nums ml-auto">≈{opt.outsCount} outs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickRef({ items }: { items: Array<{ tiles?: TileFace[]; icon?: string; title: string; note: string }> }) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg bg-elev hairline-strong border p-4 flex gap-4 items-start">
          {it.icon ? (
            <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-[22px] mt-0.5">
              {it.icon}
            </div>
          ) : (
            <div className="flex gap-1 shrink-0 pt-0.5">
              {(it.tiles ?? []).map((t, j) => <Tile key={j} face={t} size="sm" />)}
            </div>
          )}
          <div>
            <div className="font-sans text-h3 font-medium text-primary mb-1">{it.title}</div>
            <div className="text-body text-secondary">{it.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Compare({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">{children}</div>;
}

export function CompareSide({
  title, tone = 'neutral', children,
}: {
  title: string; tone?: 'positive' | 'cautious' | 'neutral'; children: React.ReactNode;
}) {
  const accent =
    tone === 'positive' ? 'border-brand-green/40' :
    tone === 'cautious' ? 'border-brand-inkRed/30' : '';
  const headColor =
    tone === 'positive' ? 'text-brand-green' :
    tone === 'cautious' ? 'text-brand-inkRed' : 'text-primary';
  return (
    <div className={`rounded-lg p-4 bg-elev hairline-strong border ${accent} h-full`}>
      <div className={`font-sans text-h3 font-medium mb-2 ${headColor}`}>{title}</div>
      <div className="text-body text-secondary">{children}</div>
    </div>
  );
}

const SAFE_GROUPS: Array<{ values: number[] }> = [
  { values: [1, 4, 7] },
  { values: [2, 5, 8] },
  { values: [3, 6, 9] },
];

export function SafeSequences() {
  return (
    <div className="my-6 rounded-lg bg-elev hairline-strong border p-4">
      <div className="text-ui text-tertiary mb-3">Safe-discard groups (using bamboo as illustration)</div>
      <div className="flex flex-col gap-2">
        {SAFE_GROUPS.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="text-ui text-secondary w-12 shrink-0">{g.values.join('-')}</div>
            <div className="flex gap-1">
              {g.values.map((v) => (
                <Tile key={v} face={{ suit: 'bamboo', value: v as SuitedValue }} size="sm" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-ui text-secondary mt-3 leading-relaxed">
        If any tile in a group has been discarded, the others in that same group are <em className="font-serif italic">relatively</em> safer to follow with.
      </div>
    </div>
  );
}

const DANGER_LEVELS: Array<{ count: string; label: string; tone: string; note: string }> = [
  { count: '0',  label: 'Dead — safe',   tone: 'bg-brand-green/15 text-brand-green border-brand-green/30',     note: 'All four copies seen. Cannot complete a set.' },
  { count: '1',  label: 'Dangerous',      tone: 'bg-brand-inkRed/10 text-brand-inkRed border-brand-inkRed/30',  note: 'Last copy is likely in someone’s hand.' },
  { count: '2',  label: 'Moderate',       tone: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30', note: 'Risk grows fast as the wall shrinks.' },
  { count: '3+', label: 'Lower risk',     tone: 'bg-brand-green/10 text-secondary border-brand-green/20',       note: 'Mostly OK in early game; recheck in defend.' },
];

export function DangerScale() {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-4 gap-2">
      {DANGER_LEVELS.map((d) => (
        <div key={d.count} className={`rounded-lg p-3 border ${d.tone}`}>
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-ui text-tertiary">copies left</div>
            <div className="font-serif text-h2 leading-none">{d.count}</div>
          </div>
          <div className="font-sans text-ui font-medium mb-1">{d.label}</div>
          <div className="text-ui text-secondary leading-snug">{d.note}</div>
        </div>
      ))}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ol className="my-6 grid grid-cols-1 gap-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 rounded-lg bg-elev hairline-strong border p-3">
          <span className="font-serif text-h3 text-brand-green leading-none mt-1 shrink-0 w-5 text-center">{i + 1}</span>
          <span className="text-body text-primary">{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function FiveBlockDiagram() {
  const blocks: Array<{
    tiles: TileFace[];
    label: string;
    note: string;
    tone: 'complete' | 'building' | 'pair';
  }> = [
    {
      tiles: [{ suit: 'dot', value: 1 }, { suit: 'dot', value: 2 }, { suit: 'dot', value: 3 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'bamboo', value: 5 }, { suit: 'bamboo', value: 6 }, { suit: 'bamboo', value: 7 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'character', value: 3 }, { suit: 'character', value: 4 }, { suit: 'character', value: 5 }],
      label: 'Meld', note: 'complete', tone: 'complete',
    },
    {
      tiles: [{ suit: 'bamboo', value: 2 }, { suit: 'bamboo', value: 3 }],
      label: 'Fragment', note: 'needs 1 or 4', tone: 'building',
    },
    {
      tiles: [{ suit: 'wind', value: 'east' }, { suit: 'wind', value: 'east' }],
      label: 'Pair', note: 'complete', tone: 'pair',
    },
  ];

  return (
    <div style={{ margin: '20px 0 28px' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{
                display: 'flex', gap: 3, padding: '10px 12px', borderRadius: 10,
                background: b.tone === 'building' ? '#fef9ec' : b.tone === 'pair' ? '#f0f5f0' : '#fcfaf3',
                border: b.tone === 'building' ? '1.5px solid #e8c96a' : '1.5px solid rgba(28,74,42,0.15)',
              }}>
                {b.tiles.map((f, j) => <Tile key={j} face={f} size="sm" />)}
                {b.tone === 'building' && (
                  <div style={{
                    width: 30, height: 40, border: '1.5px dashed #c98a2b', borderRadius: 5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 1,
                  }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: '#c98a2b', lineHeight: 1 }}>?</span>
                  </div>
                )}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.16em',
                textTransform: 'uppercase', fontWeight: 600,
                color: b.tone === 'building' ? '#c98a2b' : '#235836',
              }}>
                {b.label}
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 11, color: '#7a7a6a', marginTop: -4 }}>
                {b.note}
              </span>
            </div>
            {i < blocks.length - 1 && (
              <span style={{ color: '#aaa8a0', fontSize: 16, marginBottom: 28, flexShrink: 0 }}>+</span>
            )}
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: '#7a7a6a', marginTop: 14, marginBottom: 0, lineHeight: 1.5 }}>
        This hand is in tenpai — four blocks settled, one fragment waiting on 1 or 4 Bamboo to become a complete meld.
      </p>
    </div>
  );
}
