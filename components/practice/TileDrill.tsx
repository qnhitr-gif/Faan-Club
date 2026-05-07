'use client';

import { useState } from 'react';
import type { TileFace, SuitedValue } from '@/lib/tiles';
import { tileLabel } from '@/lib/tiles';
import { Tile } from '@/components/Tile';

// ─── Helpers ────────────────────────────────────────────────────────────────
type SuitedFace = { suit: 'bamboo' | 'character' | 'dot'; value: SuitedValue };
const SUIT_ORDER = ['bamboo', 'character', 'dot'] as const;

function randomHand(): SuitedFace[] {
  const deck: SuitedFace[] = [];
  for (const suit of SUIT_ORDER) {
    for (let v = 1; v <= 9; v++) {
      for (let c = 0; c < 4; c++) deck.push({ suit, value: v as SuitedValue });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, 13).sort((a, b) => {
    const ai = SUIT_ORDER.indexOf(a.suit), bi = SUIT_ORDER.indexOf(b.suit);
    return ai !== bi ? ai - bi : a.value - b.value;
  });
}

function analyze(hand: SuitedFace[]) {
  // Pairs
  const counts = new Map<string, number>();
  for (const t of hand) counts.set(`${t.suit}:${t.value}`, (counts.get(`${t.suit}:${t.value}`) ?? 0) + 1);
  let pairs = 0;
  for (const v of counts.values()) pairs += Math.floor(v / 2);

  // Connected: tile has a neighbour within 2 in same suit
  let connected = 0;
  for (let i = 0; i < hand.length; i++) {
    for (let j = 0; j < hand.length; j++) {
      if (i === j || hand[i].suit !== hand[j].suit) continue;
      if (Math.abs(hand[i].value - hand[j].value) <= 2) { connected++; break; }
    }
  }
  const isolated = hand.length - connected;
  return { pairs, connected, isolated };
}

// ─── Component ──────────────────────────────────────────────────────────────
export function TileDrill() {
  const [hand, setHand] = useState<SuitedFace[]>(() => randomHand());
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  function newHand() { setHand(randomHand()); setSelectedIdx(null); }
  function toggle(i: number) { setSelectedIdx(prev => prev === i ? null : i); }

  const remaining = selectedIdx !== null ? hand.filter((_, i) => i !== selectedIdx) : hand;
  const before = analyze(hand);
  const after  = selectedIdx !== null ? analyze(remaining) : null;
  const selected = selectedIdx !== null ? hand[selectedIdx] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 space-y-6">
      <header>
        <nav className="text-ui text-tertiary mb-4">
          <span>Practice</span>
          <span className="mx-1.5">›</span>
          <span className="text-secondary">Tile efficiency</span>
        </nav>
        <h1 className="font-serif text-h1 font-medium mb-1">Tile efficiency</h1>
        <p className="font-serif italic text-lead text-secondary">
          Which tile would you discard to improve your hand? Look for pairs, runs, and tiles that don't connect to anything.
        </p>
      </header>

      {/* Hand */}
      <div className="rounded-lg bg-elev hairline-strong border p-4 md:p-6">
        <div className="text-ui text-tertiary mb-3">Your hand · 13 tiles</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hand.map((tile, i) => (
            <Tile
              key={i}
              face={tile as TileFace}
              size="sm"
              selected={selectedIdx === i}
              onClick={() => toggle(i)}
              className={selectedIdx !== null && selectedIdx !== i ? 'opacity-60' : ''}
            />
          ))}
        </div>
        <p className="text-ui text-tertiary">
          {selectedIdx === null
            ? 'Click a tile to mark it for discard.'
            : 'Click again to deselect. Click another tile to switch.'}
        </p>
      </div>

      {/* Discard confirmation */}
      {selected && (
        <div className="rounded-lg bg-elev hairline-strong border p-4 flex items-center gap-4">
          <Tile face={selected as TileFace} size="sm" selected />
          <div>
            <div className="text-ui font-medium text-primary capitalize">
              Discarding: {tileLabel(selected as TileFace)}
            </div>
            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              className="text-ui text-tertiary hover:text-primary mt-0.5"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Analysis */}
      <div className="rounded-lg bg-elev hairline-strong border p-4 md:p-6">
        <div className="text-ui font-medium text-primary mb-4">Hand analysis</div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard label="Pairs" before={before.pairs} after={after?.pairs} />
          <StatCard label="Connected" before={before.connected} after={after?.connected} />
          <StatCard label="Isolated" before={before.isolated} after={after?.isolated} lowerIsBetter />
        </div>
        <div className="rounded-md bg-brand-green/5 border border-brand-green/20 px-3 py-2.5 flex items-start gap-2">
          <span className="text-brand-green mt-px">→</span>
          <div>
            <div className="text-ui font-medium text-primary">Best discard</div>
            <div className="text-ui text-secondary">
              Full efficiency algorithm coming soon. For now: discard isolated tiles first — tiles that share no suit with neighbours within 2 of their value.
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={newHand}
          className="px-4 py-2 rounded-md hairline-strong border text-ui text-primary hover:bg-info transition-colors"
        >
          Deal new hand
        </button>
        <button
          type="button"
          disabled
          className="px-4 py-2 rounded-md bg-brand-green/30 text-brand-cream text-ui font-medium cursor-not-allowed select-none"
          title="Coming soon"
        >
          Show best discard →
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, before, after, lowerIsBetter = false }: {
  label: string; before: number; after: number | undefined; lowerIsBetter?: boolean;
}) {
  const changed = after !== undefined && after !== before;
  const improved = after !== undefined && (lowerIsBetter ? after < before : after > before);
  const worsened = after !== undefined && (lowerIsBetter ? after > before : after < before);

  return (
    <div className="rounded-md hairline border p-3 flex flex-col gap-1">
      <div className="text-ui text-tertiary">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-h3 font-medium text-primary">{before}</span>
        {changed && (
          <span className={`text-ui font-medium ${improved ? 'text-brand-green' : worsened ? 'text-red-500' : ''}`}>
            → {after}
          </span>
        )}
      </div>
    </div>
  );
}
