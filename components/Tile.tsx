'use client';

import type { TileFace } from '@/lib/tiles';
import { tileLabel } from '@/lib/tiles';
import { SuitFace } from './tile/TileFaces';

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { w: number; h: number }> = {
  sm: { w: 40, h: 56 },
  md: { w: 60, h: 84 },
  lg: { w: 80, h: 112 },
};

export interface TileProps {
  face?: TileFace;
  size?: Size;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  rotate?: number;
  ariaLabel?: string;
}

export function Tile({
  face,
  size = 'md',
  selected = false,
  onClick,
  className = '',
  rotate,
  ariaLabel,
}: TileProps) {
  const { w, h } = SIZES[size];
  const interactive = Boolean(onClick);
  const label = ariaLabel ?? (face ? tileLabel(face) : 'face-down tile');

  const faceFill = face ? '#F5F0E1' : '#3D6E2F';
  const sideFill = face ? '#D4C5A2' : '#C2B493';

  const inner = (
    <svg
      viewBox="0 0 60 84"
      width={w}
      height={h}
      className={`block ${selected ? 'drop-shadow-[0_0_0_2px_rgba(61,110,47,0.6)]' : ''}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.10))',
      }}
      aria-hidden={interactive ? undefined : true}
      role={interactive ? undefined : 'img'}
    >
      <title>{label}</title>
      {/* side */}
      <path
        d="M 0,6 H 60 V 79 Q 60,84 55,84 H 5 Q 0,84 0,79 Z"
        fill={sideFill}
      />
      {/* face */}
      <path
        d="M 5,0 H 55 Q 60,0 60,5 V 78 H 0 V 5 Q 0,0 5,0 Z"
        fill={faceFill}
      />
      {/* face-down inset rect or face content */}
      {!face ? (
        <rect
          x={4}
          y={4}
          width={52}
          height={70}
          rx={2}
          fill="none"
          stroke="#244416"
          strokeWidth={0.5}
          opacity={0.55}
        />
      ) : (
        <SuitFace face={face} />
      )}
      {/* selected ring */}
      {selected && (
        <rect
          x={1}
          y={1}
          width={58}
          height={82}
          rx={5}
          fill="none"
          stroke="#3D6E2F"
          strokeWidth={2}
        />
      )}
    </svg>
  );

  if (!interactive) {
    return <span className={`inline-block ${className}`} aria-label={label}>{inner}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={`inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {inner}
    </button>
  );
}
