import type { TileFace } from '@/lib/tiles';
import { CHAR_NUMERALS, WIND_GLYPHS } from '@/lib/tiles';

const INK = '#2C2A26';
const INK_RED = '#A0392E';
const INK_BLUE = '#185FA5';
const BAMBOO_GREEN = '#3D6E2F';

const DOT_GRID: Record<number, Array<[number, number]>> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
  7: [[0.5, 0], [1.5, 0], [0, 1], [1, 1], [2, 1], [0.5, 2], [1.5, 2]],
  8: [[0, 0], [1, 0], [2, 0], [0, 1.2], [2, 1.2], [0, 2.4], [1, 2.4], [2, 2.4]],
  9: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
};

// Cell position helpers — face grid is 60×84 with face content area roughly x∈[8,52], y∈[6,72]
const FACE_X = 12;
const FACE_Y = 12;
const FACE_W = 36;
const FACE_H = 60;

function gridPos(col: number, row: number, cols = 2, rows = 2) {
  const cx = FACE_X + (col / cols) * FACE_W + FACE_W / (cols * 2);
  const cy = FACE_Y + (row / rows) * FACE_H + FACE_H / (rows * 2);
  return { cx, cy };
}

function dotPos(col: number, row: number) {
  // col, row in 0..2 (3-col, 3-row). col can be fractional (0.5, 1.5).
  const cx = FACE_X + (col + 0.5) * (FACE_W / 3);
  const cy = FACE_Y + (row + 0.5) * (FACE_H / 3);
  return { cx, cy };
}

export function DotFace({ value }: { value: number }) {
  const positions = DOT_GRID[value];
  return (
    <g>
      {positions.map(([c, r], i) => {
        const { cx, cy } = dotPos(c, r);
        const isCenterRed =
          (value === 5 && c === 1 && r === 1) ||
          (value === 9 && c === 1 && r === 1);
        const fill = isCenterRed ? INK_RED : INK_BLUE;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4.5} fill={fill} />
            <circle cx={cx} cy={cy} r={2.2} fill="#F5F0E1" />
          </g>
        );
      })}
    </g>
  );
}

export function BambooFace({ value }: { value: number }) {
  if (value === 1) {
    // Stylized sparrow placeholder — small bird silhouette.
    return (
      <g>
        <ellipse cx={30} cy={42} rx={9} ry={11} fill={INK_RED} />
        <circle cx={30} cy={30} r={5.5} fill={INK_RED} />
        <path d="M 24,42 Q 18,46 17,52 Q 22,48 26,48 Z" fill={INK_RED} />
        <circle cx={31.5} cy={29} r={1.2} fill="#F5F0E1" />
        <path d="M 35,30 L 39,30 L 35,32 Z" fill={INK_RED} />
        <path d="M 30,55 L 32,68 M 30,55 L 28,68" stroke={INK_RED} strokeWidth="1.2" fill="none" />
      </g>
    );
  }
  const positions = DOT_GRID[value];
  return (
    <g>
      {positions.map(([c, r], i) => {
        const { cx, cy } = dotPos(c, r);
        return <Stick key={i} cx={cx} cy={cy} />;
      })}
    </g>
  );
}

function Stick({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 1.6} y={cy - 6} width={3.2} height={12} rx={1.2} fill={BAMBOO_GREEN} />
      <rect x={cx - 1.6} y={cy - 6} width={3.2} height={2} rx={0.8} fill="#244416" />
      <rect x={cx - 1.6} y={cy + 4} width={3.2} height={2} rx={0.8} fill="#244416" />
    </g>
  );
}

export function CharacterFace({ value }: { value: number }) {
  return (
    <g>
      <text
        x={30}
        y={28}
        textAnchor="middle"
        fontFamily="serif"
        fontSize={18}
        fontWeight={500}
        fill={INK}
      >
        {CHAR_NUMERALS[value - 1]}
      </text>
      <text
        x={30}
        y={62}
        textAnchor="middle"
        fontFamily="serif"
        fontSize={20}
        fontWeight={500}
        fill={INK_RED}
      >
        萬
      </text>
    </g>
  );
}

export function WindFace({ value }: { value: 'east' | 'south' | 'west' | 'north' }) {
  return (
    <text
      x={30}
      y={52}
      textAnchor="middle"
      fontFamily="serif"
      fontSize={36}
      fontWeight={500}
      fill={INK}
    >
      {WIND_GLYPHS[value]}
    </text>
  );
}

export function DragonFace({ value }: { value: 'red' | 'green' | 'white' }) {
  if (value === 'white') {
    return (
      <rect
        x={14}
        y={20}
        width={32}
        height={44}
        rx={2}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
    );
  }
  const glyph = value === 'red' ? '中' : '發';
  const fill = value === 'red' ? INK_RED : BAMBOO_GREEN;
  return (
    <text
      x={30}
      y={52}
      textAnchor="middle"
      fontFamily="serif"
      fontSize={34}
      fontWeight={500}
      fill={fill}
    >
      {glyph}
    </text>
  );
}

export function BonusFace({ suit, value }: { suit: 'flower' | 'season'; value: number }) {
  const glyph = suit === 'flower' ? '花' : '季';
  const numFill = suit === 'flower' ? INK_RED : INK_BLUE;
  return (
    <g>
      <text
        x={30}
        y={32}
        textAnchor="middle"
        fontFamily="serif"
        fontSize={20}
        fontWeight={500}
        fill={numFill}
      >
        {value}
      </text>
      <text
        x={30}
        y={62}
        textAnchor="middle"
        fontFamily="serif"
        fontSize={20}
        fontWeight={500}
        fill={INK}
      >
        {glyph}
      </text>
    </g>
  );
}

export function SuitFace({ face }: { face: TileFace }) {
  switch (face.suit) {
    case 'dot':
      return <DotFace value={face.value} />;
    case 'bamboo':
      return <BambooFace value={face.value} />;
    case 'character':
      return <CharacterFace value={face.value} />;
    case 'wind':
      return <WindFace value={face.value} />;
    case 'dragon':
      return <DragonFace value={face.value} />;
    case 'flower':
    case 'season':
      return <BonusFace suit={face.suit} value={face.value} />;
  }
}
