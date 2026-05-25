'use client';

import type { WindValue } from '@/lib/tiles';
import { MahjongMat } from './MahjongMat';

const WIND_LABELS: Record<WindValue, string> = { east: 'East', south: 'South', west: 'West', north: 'North' };
const PLAYER_NUMS: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const CN_WIND: Record<WindValue, string> = { east: '東', south: '南', west: '西', north: '北' };
const CCW_ORDER: WindValue[] = ['east', 'south', 'west', 'north'];

function rotateSeat(seat: WindValue, n: number): WindValue {
  const i = CCW_ORDER.indexOf(seat);
  return CCW_ORDER[(i + n) % 4];
}

/** Single face-down tile placeholder */
function FaceDownTile() {
  return (
    <svg width={18} height={25} viewBox="0 0 14 20" aria-hidden style={{ display: 'block', flexShrink: 0 }}>
      <rect width={14} height={20} rx={2} fill="#235836" />
      <rect x={1.5} y={1.5} width={11} height={17} rx={1.5} fill="none"
        stroke="#1c4a2a" strokeOpacity={0.35} strokeWidth={0.5} />
      <line x1={1.5} y1={10} x2={12.5} y2={10}
        stroke="#1c4a2a" strokeOpacity={0.2} strokeWidth={0.5} />
    </svg>
  );
}

function TileRow() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 13 }).map((_, i) => <FaceDownTile key={i} />)}
    </div>
  );
}

export function SeatChip({ wind, isYou, num }: { wind: WindValue; isYou: boolean; num?: number }) {
  const isDealer = wind === 'east';
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 9px 5px 7px',
      borderRadius: 10,
      background: isDealer ? '#1c4a2a' : '#fcfaf3',
      border: `1px solid ${isDealer ? 'transparent' : 'rgba(28,74,42,0.18)'}`,
      whiteSpace: 'nowrap',
      boxShadow: isDealer ? '0 2px 8px rgba(28,74,42,0.25)' : '0 1px 3px rgba(28,74,42,0.08)',
    }}>
      {/* Chinese wind glyph */}
      <span style={{
        fontFamily: "'Noto Serif SC', 'Noto Serif CJK SC', 'Noto Serif', serif",
        fontSize: 17,
        fontWeight: 700,
        color: isDealer ? 'rgba(250,246,236,0.75)' : '#235836',
        lineHeight: 1,
        letterSpacing: 0,
      }}>
        {CN_WIND[wind]}
      </span>
      {/* Player number + wind label */}
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 13.5,
        fontWeight: 500,
        color: isDealer ? '#faf6ec' : '#2C2A26',
      }}>
        <span style={{ opacity: isDealer ? 0.6 : 0.5, fontSize: 11, fontWeight: 400 }}>P{num ?? PLAYER_NUMS[wind]} · </span>{WIND_LABELS[wind]}
      </span>
      {/* Badge — Dealer for East only */}
      {isDealer && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8.5,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '2px 5px',
          borderRadius: 4,
          background: 'rgba(250,246,236,0.13)',
          color: 'rgba(250,246,236,0.85)',
          border: '1px solid rgba(250,246,236,0.18)',
        }}>
          Dealer
        </span>
      )}
    </div>
  );
}

function GenericChip({ num }: { num: number }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      borderRadius: 10,
      background: '#fcfaf3',
      border: '1px solid rgba(28,74,42,0.14)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: '#7a7a6a' }}>
        Player {num}
      </span>
    </div>
  );
}

export function PickSeats({ yourSeat }: { yourSeat: WindValue | null }) {
  const perspective = yourSeat ?? 'south';
  const bottomWind = perspective;
  const rightWind  = rotateSeat(perspective, 1);
  const topWind    = rotateSeat(perspective, 2);
  const leftWind   = rotateSeat(perspective, 3);
  const rolled = Boolean(yourSeat);

  const matSize = 367;

  return (
    <div>


      <div className="flex flex-col gap-3 items-center" style={{ overflow: 'visible' }}>
        <div className="grid gap-2" style={{
          gridTemplateAreas: '"tl . tr" ". center ." "bl . br"',
          gridTemplateColumns: '120px max-content 120px',
          gridTemplateRows: '120px max-content 120px',
        }}>
          {/* Top-left seat */}
          <div style={{ gridArea: 'tl', marginLeft: '-170px', transform: 'translateY(14px)' }} className="flex flex-col items-start justify-end">
            <div style={{ marginBottom: 4 }}>{rolled ? <SeatChip wind={leftWind} isYou={leftWind === yourSeat} num={4} /> : <GenericChip num={4} />}</div>
            <TileRow />
          </div>
          {/* Top-right seat */}
          <div style={{ gridArea: 'tr', marginRight: '-170px', transform: 'translateY(14px)' }} className="flex flex-col items-end justify-end">
            <div style={{ marginBottom: 4 }}>{rolled ? <SeatChip wind={topWind} isYou={topWind === yourSeat} num={3} /> : <GenericChip num={3} />}</div>
            <TileRow />
          </div>

          {/* Center — table */}
          <div style={{ gridArea: 'center', position: 'relative', width: matSize, height: matSize }}>
            <MahjongMat size={matSize} />
          </div>

          {/* Bottom-left seat */}
          <div style={{ gridArea: 'bl', marginLeft: '-170px', transform: 'translateY(-14px)' }} className="flex flex-col items-start justify-start">
            <TileRow />
            <div style={{ marginTop: 4 }}>{rolled ? <SeatChip wind={bottomWind} isYou={bottomWind === yourSeat} num={1} /> : <GenericChip num={1} />}</div>
          </div>
          {/* Bottom-right seat */}
          <div style={{ gridArea: 'br', marginRight: '-170px', transform: 'translateY(-14px)' }} className="flex flex-col items-end justify-start">
            <TileRow />
            <div style={{ marginTop: 4 }}>{rolled ? <SeatChip wind={rightWind} isYou={rightWind === yourSeat} num={2} /> : <GenericChip num={2} />}</div>
          </div>
        </div>
      </div>

      {/* Bottom hint — always rendered so height stays consistent */}
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12, color: '#9d9d8a', marginTop: 10, textAlign: 'center', margin: '10px 0 0', visibility: rolled ? 'visible' : 'hidden' }}>
        Seats fill counter-clockwise after the roll. East is always dealer.
      </p>
    </div>
  );
}
