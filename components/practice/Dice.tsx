export type DiceValues = [number, number, number];

interface DieProps {
  value: number;
  size?: number;
}

const PIPS: Record<number, Array<[number, number]>> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
};

function Die({ value, size = 32 }: DieProps) {
  const pad = size * 0.18;
  const inner = size - pad * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`die showing ${value}`}>
      <rect width={size} height={size} rx={size * 0.18} fill="#F5F0E1" stroke="#2C2A26" strokeOpacity={0.22} />
      {PIPS[value]?.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={pad + (cx / 2) * inner}
          cy={pad + (cy / 2) * inner}
          r={size * 0.09}
          fill="#A0392E"
        />
      ))}
    </svg>
  );
}

export function Dice({ values, size = 32 }: { values: DiceValues | null; size?: number }) {
  return (
    <div className="inline-flex gap-1.5" aria-label={values ? `dice showing ${values.join(', ')}, sum ${values.reduce((a, b) => a + b, 0)}` : 'unrolled dice'}>
      <Die value={values?.[0] ?? 1} size={size} />
      <Die value={values?.[1] ?? 1} size={size} />
      <Die value={values?.[2] ?? 1} size={size} />
    </div>
  );
}

export function rollDie(): number {
  return 1 + Math.floor(Math.random() * 6);
}
