'use client';

import { useState } from 'react';
import type { WindValue } from '@/lib/tiles';
import { TableView } from './TableView';

const WALL_LEN = 18;
const TILE = 14;    // px — square tiles, all walls same visual length
const GAP  = 1;
const WALL_PX = WALL_LEN * TILE + (WALL_LEN - 1) * GAP; // 269

function MiniTile() {
  return (
    <svg width={TILE} height={TILE} viewBox="0 0 14 14" aria-hidden>
      <rect width={14} height={14} rx={2} fill="#3D6E2F" />
      <rect x={1.5} y={1.5} width={11} height={11} rx={1.5} fill="none"
        stroke="#244416" strokeOpacity={0.45} strokeWidth={0.5} />
      {/* mid-line hinting at 2-tile height */}
      <line x1={1.5} y1={7} x2={12.5} y2={7}
        stroke="#244416" strokeOpacity={0.3} strokeWidth={0.5} />
    </svg>
  );
}

function HWall({ built }: { built: boolean }) {
  return (
    <div className={`flex transition-opacity duration-500 ${built ? 'opacity-100' : 'opacity-0'}`} style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) => <MiniTile key={i} />)}
    </div>
  );
}

function VWall({ built }: { built: boolean }) {
  return (
    <div className={`flex flex-col transition-opacity duration-500 ${built ? 'opacity-100' : 'opacity-0'}`} style={{ gap: GAP }}>
      {Array.from({ length: WALL_LEN }).map((_, i) => <MiniTile key={i} />)}
    </div>
  );
}

export function BuildWalls({ yourSeat }: { yourSeat: WindValue }) {
  const [built, setBuilt] = useState(false);

  return (
    <TableView
      yourSeat={yourSeat}
      center={
        <div className="flex flex-col items-center gap-4">
          <div style={{
            display: 'grid',
            gridTemplateColumns: `${TILE}px ${WALL_PX}px ${TILE}px`,
            gridTemplateRows: `${TILE}px ${WALL_PX}px ${TILE}px`,
            gap: 2,
          }}>
            <span /><HWall built={built} /><span />
            <VWall built={built} />
            <div className="flex items-center justify-center text-ui text-tertiary text-center"
              style={{ width: WALL_PX, height: WALL_PX }}>
              {built ? `4 walls · ${WALL_LEN * 4 * 2} tiles` : 'Click Build'}
            </div>
            <VWall built={built} />
            <span /><HWall built={built} /><span />
          </div>

          <button type="button" onClick={() => setBuilt(b => !b)}
            className="px-4 py-2 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep transition-colors">
            {built ? 'Replay' : 'Build'}
          </button>
        </div>
      }
    />
  );
}
