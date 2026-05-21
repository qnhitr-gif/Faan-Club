'use client';

import type { TileFace, WindValue } from '@/lib/tiles';
import { SuitFace } from '@/components/tile/TileFaces';
import { MahjongMat } from './MahjongMat';
import type { DiceValues } from './Dice';

interface PickSeatsProps {
  yourSeat: WindValue | null;
  dice: DiceValues | null;
  onRoll: () => void;
}

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];
const BADGE_CLS = 'text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded whitespace-nowrap';

function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

export function WindTile({ wind, size = 26 }: { wind: WindValue; size?: number }) {
  const face: TileFace = { suit: 'wind', value: wind };
  const h = Math.round(size * 84 / 60);
  return (
    <svg width={size} height={h} viewBox="0 0 60 84" aria-hidden style={{ flexShrink: 0 }}>
      <SuitFace face={face} />
    </svg>
  );
}

function SeatLabel({ wind, you, reverse }: { wind: WindValue; you?: boolean; reverse?: boolean }) {
  const pill = (
    <span
      style={{ display: 'inline-block', minWidth: '115px' }}
      className={`text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap ${
        wind === 'east' ? 'bg-brand-green text-brand-cream' : 'border border-brand-green/30 text-secondary'
      }`}
    >
      <span className="font-medium">Player {PLAYER_NUMS[wind]}</span>
      {' · '}{WIND_LABELS[wind]}
    </span>
  );

  if (reverse) {
    return (
      <div className="relative w-fit">
        {wind === 'east' && (
          <div className="absolute left-full inset-y-0 flex items-center gap-1 pl-1.5">
            <span className={BADGE_CLS}>dealer</span>
          </div>
        )}
        {pill}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 justify-center">
      {pill}
      {wind === 'east' && <span className={BADGE_CLS}>dealer</span>}
    </div>
  );
}

function GenericLabel({ num, you }: { num: number; you?: boolean }) {
  return (
    <span style={{ display: 'inline-block', minWidth: '115px' }} className="text-ui px-2 py-0.5 rounded-md leading-tight whitespace-nowrap border border-brand-green/30 text-secondary">
      <span className="font-medium">Player {num}</span>
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
    <div className="flex flex-col items-center">
      <div className="grid gap-2" style={{
        gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
        gridTemplateColumns: '80px max-content 80px',
        gridTemplateRows: '80px max-content 80px',
      }}>
        <div style={{ gridArea: 'tl', marginLeft: '-44px' }} className="flex flex-col items-start justify-end">
          {yourSeat ? <SeatLabel wind={leftWind} /> : <GenericLabel num={4} />}
        </div>
        <div style={{ gridArea: 'tr', marginRight: '-44px' }} className="flex flex-col items-end justify-end">
          {yourSeat ? <SeatLabel wind={topWind} reverse /> : <GenericLabel num={3} />}
        </div>
        <div style={{ gridArea: 'center', width: 367, height: 367 }} className="flex items-center justify-center">
          <MahjongMat size={367} />
        </div>
        <div style={{ gridArea: 'bl', marginLeft: '-44px' }} className="flex flex-col items-start justify-start">
          {yourSeat ? <SeatLabel wind={bottomWind} you /> : <GenericLabel num={1} you />}
        </div>
        <div style={{ gridArea: 'br', marginRight: '-44px' }} className="flex flex-col items-end justify-start">
          {yourSeat ? <SeatLabel wind={rightWind} reverse /> : <GenericLabel num={2} />}
        </div>
      </div>
    </div>
  );
}
