import type { WindValue } from '@/lib/tiles';

interface TableViewProps {
  center: React.ReactNode;
  east?: React.ReactNode;
  south?: React.ReactNode;
  west?: React.ReactNode;
  north?: React.ReactNode;
  yourSeat?: WindValue;
  className?: string;
  aspectRatio?: string;
}

const WIND_LABELS: Record<WindValue, string> = {
  east: 'East',
  south: 'South',
  west: 'West',
  north: 'North',
};

// East = dealer = Player 1, then counter-clockwise
const PLAYER_NUMS: Record<WindValue, number> = {
  east: 1,
  south: 2,
  west: 3,
  north: 4,
};

const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

export function TableView({
  center,
  east,
  south,
  west,
  north,
  yourSeat = 'south',
  className = '',
  aspectRatio,
}: TableViewProps) {
  // Visual positions: bottom = you, right = next CCW, top = opposite, left = prev CCW
  const bottomWind = yourSeat;
  const rightWind  = rotateSeat(yourSeat, 1);
  const topWind    = rotateSeat(yourSeat, 2);
  const leftWind   = rotateSeat(yourSeat, 3);

  // Map wind → content slot
  const slotContent: Record<WindValue, React.ReactNode> = { east, south, west, north };

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: aspectRatio ?? '1.6 / 1' }}>
      {/* Felt */}
      <div className="absolute inset-4 rounded-2xl bg-brand-green/10 hairline-strong border border-brand-green/30" />

      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">{center}</div>
      </div>

      {/* Seat slots */}
      <SeatSlot position="bottom" wind={bottomWind} you>{slotContent[bottomWind]}</SeatSlot>
      <SeatSlot position="right"  wind={rightWind}>{slotContent[rightWind]}</SeatSlot>
      <SeatSlot position="top"    wind={topWind}>{slotContent[topWind]}</SeatSlot>
      <SeatSlot position="left"   wind={leftWind}>{slotContent[leftWind]}</SeatSlot>
    </div>
  );
}

function SeatSlot({
  position,
  wind,
  you = false,
  children,
}: {
  position: 'top' | 'bottom' | 'left' | 'right';
  wind: WindValue;
  you?: boolean;
  children?: React.ReactNode;
}) {
  const posClass: Record<typeof position, string> = {
    top:    'top-1 left-1/2 -translate-x-1/2 flex-col items-center',
    bottom: 'bottom-1 left-1/2 -translate-x-1/2 flex-col items-center',
    left:   'left-1 top-1/2 -translate-y-1/2 flex-col items-center',
    right:  'right-1 top-1/2 -translate-y-1/2 flex-col items-center',
  };

  return (
    <div className={`absolute ${posClass[position]} flex gap-1`}>
      <div
        className={`text-ui px-2 py-0.5 rounded-md leading-tight ${
          you
            ? 'bg-brand-green text-brand-cream'
            : 'text-secondary hairline border'
        }`}
      >
        <span className="font-medium">P{PLAYER_NUMS[wind]}</span>
        {' · '}
        {WIND_LABELS[wind]}
        {you && ' · you'}
      </div>
      {wind === 'east' && (
        <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/15 px-1.5 rounded">dealer</div>
      )}
      {children && <div>{children}</div>}
    </div>
  );
}
