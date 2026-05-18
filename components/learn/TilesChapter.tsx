'use client';

import { useState } from 'react';
import { SuitFace } from '@/components/tile/TileFaces';
import type { TileFace, SuitedValue, WindValue, DragonValue } from '@/lib/tiles';

// ── Types ─────────────────────────────────────────────────────────────────────

type TabId = 'dots' | 'bamboo' | 'characters' | 'honors' | 'bonus';

interface StatRow { label: string; value: string }

interface TabData {
  id: TabId;
  num: string;
  label: string;
  chinese: string;
  romanization: string;
  description: string;
  stats: StatRow[];
  tiles: TileFace[];
  tileLabels: string[];
  cols: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const SUIT_NUMS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

function suitTiles(suit: 'dot' | 'bamboo' | 'character'): TileFace[] {
  return Array.from({ length: 9 }, (_, i) => ({
    suit,
    value: (i + 1) as SuitedValue,
  }));
}

const TABS: TabData[] = [
  {
    id: 'dots',
    num: '01',
    label: 'Dots',
    chinese: '筒子',
    romanization: 'Tung Tsz',
    description:
      'Round dots arranged in patterns from 1 to 9. The single dot looks like a coin — and that\'s the idea. Each number repeats four times in a full set.',
    stats: [
      { label: 'Count',    value: '36 tiles · 9 × 4' },
      { label: 'Forms',    value: 'Runs (1·2·3) & triplets (5·5·5)' },
      { label: 'Nickname', value: '"Coins" — the oldest suit' },
    ],
    tiles: suitTiles('dot'),
    tileLabels: SUIT_NUMS,
    cols: 5,
  },
  {
    id: 'bamboo',
    num: '02',
    label: 'Bamboo',
    chinese: '索子',
    romanization: 'Sok Tsz',
    description:
      'Vertical sticks in standard arrangements. The 1-bamboo is the exception — traditionally a stylized sparrow rather than a single stick.',
    stats: [
      { label: 'Count',    value: '36 tiles · 9 × 4' },
      { label: 'Forms',    value: 'Runs (1·2·3) & triplets (5·5·5)' },
      { label: 'Nickname', value: '"Sticks" or "Bamboo"' },
    ],
    tiles: suitTiles('bamboo'),
    tileLabels: SUIT_NUMS,
    cols: 5,
  },
  {
    id: 'characters',
    num: '03',
    label: 'Characters',
    chinese: '萬子',
    romanization: 'Maan Tsz',
    description:
      'Chinese numerals (一–九) on top, 萬 ("ten thousand") on the bottom. Ones and nines are called terminals — they score more in the right hand.',
    stats: [
      { label: 'Count',    value: '36 tiles · 9 × 4' },
      { label: 'Forms',    value: 'Runs (1·2·3) & triplets (5·5·5)' },
      { label: 'Nickname', value: '"Cracks" or "Wan"' },
    ],
    tiles: suitTiles('character'),
    tileLabels: SUIT_NUMS,
    cols: 5,
  },
  {
    id: 'honors',
    num: '04',
    label: 'Honors',
    chinese: '字牌',
    romanization: 'Jih Paai',
    description:
      'Four winds and three dragons — 28 tiles in all. Honors can\'t form runs, only triplets. A pung of dragons or your seat wind scores automatically.',
    stats: [
      { label: 'Count', value: '28 tiles · 7 × 4' },
      { label: 'Forms', value: 'Triplets only (5·5·5) — no runs' },
      { label: 'Types', value: 'Four winds + three dragons' },
    ],
    tiles: [
      { suit: 'wind',   value: 'east'  as WindValue },
      { suit: 'wind',   value: 'south' as WindValue },
      { suit: 'wind',   value: 'west'  as WindValue },
      { suit: 'wind',   value: 'north' as WindValue },
      { suit: 'dragon', value: 'red'   as DragonValue },
      { suit: 'dragon', value: 'green' as DragonValue },
      { suit: 'dragon', value: 'white' as DragonValue },
    ],
    tileLabels: ['東', '南', '西', '北', '中', '發', '白'],
    cols: 4,
  },
  {
    id: 'bonus',
    num: '05',
    label: 'Bonus',
    chinese: '花季',
    romanization: 'Faa Gwai',
    description:
      'Eight bonus tiles — four flowers and four seasons, one copy each. When you draw one, set it aside and take a free replacement from the back of the wall.',
    stats: [
      { label: 'Count',  value: '8 tiles · 1 each' },
      { label: 'Forms',  value: 'Not used in melds — bonus only' },
      { label: 'Scoring', value: 'Matched seat number doubles the bonus' },
    ],
    tiles: [
      { suit: 'flower', value: 1 as const },
      { suit: 'flower', value: 2 as const },
      { suit: 'flower', value: 3 as const },
      { suit: 'flower', value: 4 as const },
      { suit: 'season', value: 1 as const },
      { suit: 'season', value: 2 as const },
      { suit: 'season', value: 3 as const },
      { suit: 'season', value: 4 as const },
    ],
    tileLabels: ['梅', '蘭', '菊', '竹', '春', '夏', '秋', '冬'],
    cols: 4,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function TileCard({ face, index, subLabel }: { face: TileFace; index: string; subLabel: string }) {
  return (
    <div className="rounded-xl bg-[#F8F3E2] border border-brand-green/15 p-3 flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between leading-none">
        <span className="text-[10px] text-[#B0A07A] font-mono">{index}</span>
        <span className="text-[12px] text-[#8A7A60]" style={{ fontFamily: 'var(--font-serif)' }}>{subLabel}</span>
      </div>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 60 84" width={90} height={126} aria-hidden style={{ display: 'block' }}>
          {/* Tile shadow edge */}
          <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
          {/* Tile face */}
          <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
          {/* Inner frame */}
          <rect x={4} y={4} width={52} height={70} rx={2} fill="none" stroke="#1c4a2a" strokeWidth={0.5} opacity={0.45} />
          <SuitFace face={face} />
        </svg>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TilesChapter() {
  const [activeId, setActiveId] = useState<TabId>('dots');
  const tab = TABS.find((t) => t.id === activeId)!;

  return (
    <div style={{ paddingTop: 32 }}>
      {/* H1 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#b8302a', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1c4a2a' }}>CHAPTER 02</span>
        <div style={{ height: 1, width: 40, background: '#c8d8c9', flexShrink: 0 }} />
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(44px, 6.5vw, 96px)',
        fontWeight: 600, lineHeight: 1.0,
        letterSpacing: '-0.02em', color: '#16170f',
        marginBottom: 32,
      }}>
        Meet the{' '}
        <em style={{ fontStyle: 'italic', color: '#1c4a2a' }}>ingredients.</em>
      </h1>

      {/* Header row */}
      <div className="flex items-center justify-end mb-5">
        <span className="text-[11px] tracking-[0.15em] uppercase text-tertiary">
          144 tiles total
        </span>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 rounded-2xl p-1.5 mb-10 border border-brand-green/10"
        style={{ background: 'rgba(248,243,226,0.6)' }}
        role="tablist"
        aria-label="Tile groups"
      >
        {TABS.map((t) => {
          const isActive = t.id === activeId;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(t.id)}
              className={[
                'flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150',
                isActive
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50',
              ].join(' ')}
            >
              <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-tertiary' : 'text-tertiary/50'}`}>
                {t.num}
              </span>
              <span className={`text-body font-medium shrink-0 ${isActive ? 'text-primary' : 'text-secondary'}`}>
                {t.label}
              </span>
              <span className={`text-body shrink-0 ${isActive ? 'text-secondary' : 'text-tertiary'}`}>
                {t.chinese}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex gap-12 items-start">

        {/* Left — description + stats */}
        <div className="w-[300px] shrink-0">
          <h2
            className="font-serif font-medium leading-none mb-3 text-primary"
            style={{ fontSize: 60, marginTop: 0, borderTop: 'none', paddingTop: 0 }}
          >
            {tab.label}
          </h2>
          <p className="text-[15px] text-secondary mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            {tab.chinese} · {tab.romanization}
          </p>
          <p className="text-body text-secondary leading-relaxed mb-8">
            {tab.description}
          </p>

          <div className="space-y-0 border-t border-brand-green/20">
            {tab.stats.map((stat) => (
              <div key={stat.label} className="border-b border-brand-green/10 py-4">
                <div className="text-[10px] uppercase tracking-[0.12em] text-tertiary mb-1.5">
                  {stat.label}
                </div>
                <div className="text-body text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — tile grid */}
        <div className="flex-1 min-w-0">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${tab.cols}, minmax(0, 1fr))` }}
            role="tabpanel"
          >
            {tab.tiles.map((face, i) => (
              <TileCard
                key={i}
                face={face}
                index={String(i + 1).padStart(2, '0')}
                subLabel={tab.tileLabels[i]}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
