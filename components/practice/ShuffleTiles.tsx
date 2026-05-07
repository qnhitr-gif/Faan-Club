'use client';

import { useMemo, useState } from 'react';
import { Tile } from '@/components/Tile';
import { TableView } from './TableView';
import type { WindValue } from '@/lib/tiles';

const COUNT = 36;

function makeScatter(seed: number) {
  // Simple deterministic-ish scatter from seed.
  const rng = mulberry32(seed);
  return Array.from({ length: COUNT }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    rot: -25 + rng() * 50,
  }));
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function ShuffleTiles({ yourSeat }: { yourSeat: WindValue }) {
  const [seed, setSeed] = useState(1);
  const positions = useMemo(() => makeScatter(seed), [seed]);

  return (
    <TableView
      yourSeat={yourSeat}
      center={
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative"
            style={{ width: 280, height: 200 }}
            aria-label="Tiles scattered face-down on the table"
          >
            {positions.map((p, i) => (
              <div
                key={i}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                }}
              >
                <Tile size="sm" />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep transition-colors"
          >
            Shuffle
          </button>
        </div>
      }
    />
  );
}
