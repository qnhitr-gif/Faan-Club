'use client';

import type { TileFace, WindValue } from '@/lib/tiles';
import { SuitFace } from '@/components/tile/TileFaces';
import type { DiceValues } from './Dice';

interface PickSeatsProps {
  yourSeat: WindValue | null;
  dice: DiceValues | null;
  onRoll: () => void;
}

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

export function WindTile({ wind, size = 26 }: { wind: WindValue; size?: number }) {
  const face: TileFace = { suit: 'wind', value: wind };
  const h = Math.round(size * 84 / 60);
  return (
    <svg width={size} height={h} viewBox="0 0 60 84" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z" fill="#D4C5A2" />
      <path d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z" fill="#F5F0E1" />
      <SuitFace face={face} />
    </svg>
  );
}

function SeatLabel({ wind, you }: { wind: WindValue; you?: boolean }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      <span className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
        you ? 'bg-brand-green text-brand-cream' : 'text-secondary hairline border'
      }`}>
        <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
        {' · '}{WIND_LABELS[wind]}
        {you && ' · you'}
      </span>
      {wind === 'east' && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded whitespace-nowrap">dealer</span>
      )}
    </div>
  );
}

function GenericLabel({ num, you }: { num: number; you?: boolean }) {
  return (
    <span className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
      you ? 'bg-brand-green text-brand-cream' : 'text-secondary hairline border'
    }`}>
      <span className="font-medium">Player {num}</span>
      {you && ' · you'}
    </span>
  );
}

export function PickSeats({ yourSeat }: Pick<PickSeatsProps, 'yourSeat'>) {
  const perspective = yourSeat ?? 'south';
  const bottomWind = perspective;
  const rightWind  = rotateSeat(perspective, 1);
  const topWind    = rotateSeat(perspective, 2);
  const leftWind   = rotateSeat(perspective, 3);

  return (
    <div className="grid gap-2" style={{
      gridTemplateAreas: '"top top top" "left center right" "bottom bottom bottom"',
      gridTemplateColumns: 'minmax(140px, 1fr) auto minmax(140px, 1fr)',
      gridTemplateRows: '60px auto 60px',
    }}>
      <div style={{ gridArea: 'top' }} className="flex flex-col items-center justify-end pb-2">
        {yourSeat ? <SeatLabel wind={topWind} /> : <GenericLabel num={3} />}
      </div>

      <div style={{ gridArea: 'left' }} className="flex flex-col items-center justify-center gap-1.5 pr-3">
        {yourSeat ? <SeatLabel wind={leftWind} /> : <GenericLabel num={4} />}
      </div>

      <div style={{ gridArea: 'center', width: 325, height: 325 }}
        className="bg-brand-green/10 border border-brand-green/30 rounded-2xl" />

      <div style={{ gridArea: 'right' }} className="flex flex-col items-center justify-center gap-1.5 pl-3">
        {yourSeat ? <SeatLabel wind={rightWind} /> : <GenericLabel num={2} />}
      </div>

      <div style={{ gridArea: 'bottom' }} className="flex flex-col items-center justify-start pt-2">
        {yourSeat ? <SeatLabel wind={bottomWind} you /> : <GenericLabel num={1} you />}
      </div>
    </div>
  );
}
