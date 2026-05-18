import type { ReactNode } from 'react';

interface Props {
  /** Fixed pixel size when the mat is purely decorative (no children).
   *  When children are passed, the mat sizes to fit them. */
  size?: number;
  /** Content rendered inside the mat (e.g. wall tiles). Rotated with the mat. */
  children?: ReactNode;
  /** Extra classes (e.g. p-3 for inner padding around children). */
  className?: string;
}

// Palette tuned to a warm tan / walnut mahjong mat.
const FRAME = '#3D2E1F';
const SURFACE = '#B5945E';
const ACCENT = '#4F3D27';

export function MahjongMat({ size, children, className = '' }: Props) {
  const sizeStyle = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`relative rotate-45 ${size ? 'inline-block' : ''} ${className}`}
      style={sizeStyle}
    >
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        {/* outer frame */}
        <rect x={0} y={0} width={200} height={200} rx={6} fill={FRAME} />
        {/* tan surface */}
        <rect x={5} y={5} width={190} height={190} rx={4} fill={SURFACE} />
        {/* inset frame */}
        <rect
          x={11}
          y={11}
          width={178}
          height={178}
          rx={3}
          fill="none"
          stroke={ACCENT}
          strokeWidth={0.5}
          opacity={0.45}
        />
        {/* diagonals */}
        <line x1={11} y1={11} x2={189} y2={189} stroke={ACCENT} strokeWidth={0.4} opacity={0.25} />
        <line x1={189} y1={11} x2={11} y2={189} stroke={ACCENT} strokeWidth={0.4} opacity={0.25} />
        {/* corner dots */}
        {[[20, 20], [180, 20], [20, 180], [180, 180]].map(([cx, cy], i) => (
          <circle key={`c${i}`} cx={cx} cy={cy} r={2.4} fill={ACCENT} opacity={0.55} />
        ))}
        {/* midpoint dots */}
        {[[100, 20], [180, 100], [100, 180], [20, 100]].map(([cx, cy], i) => (
          <circle key={`m${i}`} cx={cx} cy={cy} r={1.6} fill={ACCENT} opacity={0.4} />
        ))}
        {/* small centre marker */}
        <circle cx={100} cy={100} r={1.6} fill={ACCENT} opacity={0.4} />
      </svg>

      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  );
}
