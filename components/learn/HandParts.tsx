import { Tile } from '@/components/Tile';
import type { TileFace } from '@/lib/tiles';

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

// ── Meld type grid + card ─────────────────────────────────────────────────────

export function MeldGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="px-5 pb-4 flex gap-1">
        {tiles.map((t, i) => (
          <Tile key={i} face={t as TileFace} size="md" />
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
