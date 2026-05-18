import React from 'react';
import { tileImageUrl, TileFace } from '@/lib/tiles';

// ── Shared design tokens ───────────────────────────────────────────────────────

const FONT_MONO = 'var(--font-mono)';
const FONT_SERIF = 'var(--font-serif)';
const COLOR_GREEN = '#2f6b44';
const COLOR_GREEN_DARK = '#1c4a2a';
const COLOR_RED = '#b8302a';
const COLOR_TABLE_BG = '#eef4ee';
const COLOR_TABLE_BORDER = '#c8d8c9';

const S = {
  eyebrow: {
    fontFamily: FONT_MONO,
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-tertiary)',
    margin: '0 0 6px',
  },
  heading: {
    fontFamily: FONT_SERIF,
    fontSize: 20,
    fontWeight: 500,
    color: '#16170f',
    margin: '0 0 6px',
  },
  body: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  captionWrap: {
    marginTop: 16,
    textAlign: 'center' as const,
  },
};

// ── DiagramCaption ─────────────────────────────────────────────────────────────

function DiagramCaption({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div style={S.captionWrap}>
      <p style={S.eyebrow}>{eyebrow}</p>
      <h3 style={S.heading}>{title}</h3>
      <p style={S.body}>{body}</p>
    </div>
  );
}

// ── Tile helpers ───────────────────────────────────────────────────────────────

function BackTile({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y + 3} width={36} height={49} rx={4} fill="#C2B493" />
      <rect x={x} y={y} width={36} height={51} rx={5} fill="#3d8456" stroke="#235836" strokeWidth={1} />
      <rect x={x + 2} y={y + 2} width={32} height={47} rx={3} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
    </g>
  ); 
}

function FaceTile({ x, y, face }: { x: number; y: number; face: TileFace }) {
  return <image href={tileImageUrl(face)} x={x} y={y} width={36} height={52} />;
}

// ── Small diagram SVGs ─────────────────────────────────────────────────────────

function SmallSvgDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <pattern id={`${idPrefix}-hwall`} width="14" height="11" patternUnits="userSpaceOnUse">
        <rect width="12" height="11" rx="1.5" fill="#2f6b44" stroke="#235836" strokeWidth="0.5" />
      </pattern>
      <pattern id={`${idPrefix}-vwall`} width="11" height="14" patternUnits="userSpaceOnUse">
        <rect width="11" height="12" rx="1.5" fill="#2f6b44" stroke="#235836" strokeWidth="0.5" />
      </pattern>
    </defs>
  );
}

function PinwheelWalls({ idPrefix }: { idPrefix: string }) {
  return (
    <g>
      {/* Top */}
      <g transform="translate(74,78)">
        <rect width={151} height={11} transform="rotate(20,76,5)" fill={`url(#${idPrefix}-hwall)`} />
      </g>
      {/* Right */}
      <g transform="translate(211,74)">
        <rect width={11} height={151} transform="rotate(20,5,76)" fill={`url(#${idPrefix}-vwall)`} />
      </g>
      {/* Bottom */}
      <g transform="translate(74,211)">
        <rect width={151} height={11} transform="rotate(20,76,5)" fill={`url(#${idPrefix}-hwall)`} />
      </g>
      {/* Left */}
      <g transform="translate(78,74)">
        <rect width={11} height={151} transform="rotate(20,5,76)" fill={`url(#${idPrefix}-vwall)`} />
      </g>
    </g>
  );
}

function CompassLetters() {
  return (
    <g style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: 22, fill: COLOR_GREEN_DARK }}>
      {/* East = bottom = dealer */}
      <text x={150} y={285} textAnchor="middle">E</text>
      {/* South = right */}
      <text x={285} y={155} textAnchor="middle">S</text>
      {/* West = top */}
      <text x={150} y={22} textAnchor="middle">W</text>
      {/* North = left */}
      <text x={22} y={155} textAnchor="middle">N</text>
    </g>
  );
}

function Diagram0() {
  const tiles = [
    // row 1 (y≈68)
    { cx: 68,  cy: 70,  rot:  42 },
    { cx: 90,  cy: 66,  rot: -15 },
    { cx: 111, cy: 71,  rot:  78 },
    { cx: 130, cy: 67,  rot: -50 },
    { cx: 151, cy: 70,  rot:  20 },
    { cx: 170, cy: 65,  rot: -80 },
    { cx: 191, cy: 69,  rot:  35 },
    { cx: 210, cy: 67,  rot: -25 },
    { cx: 229, cy: 71,  rot:  55 },
    { cx: 243, cy: 67,  rot: -40 },
    // row 2 (y≈89)
    { cx: 62,  cy: 88,  rot: -60 },
    { cx: 82,  cy: 85,  rot:  30 },
    { cx: 102, cy: 90,  rot: -12 },
    { cx: 121, cy: 86,  rot:  65 },
    { cx: 141, cy: 89,  rot: -40 },
    { cx: 161, cy: 85,  rot:  18 },
    { cx: 181, cy: 89,  rot: -70 },
    { cx: 200, cy: 86,  rot:  48 },
    { cx: 220, cy: 90,  rot: -20 },
    { cx: 240, cy: 86,  rot:  38 },
    // row 3 (y≈109)
    { cx: 67,  cy: 107, rot:  55 },
    { cx: 87,  cy: 104, rot: -35 },
    { cx: 107, cy: 108, rot:  10 },
    { cx: 126, cy: 104, rot: -75 },
    { cx: 146, cy: 107, rot:  45 },
    { cx: 166, cy: 103, rot: -22 },
    { cx: 186, cy: 107, rot:  68 },
    { cx: 205, cy: 104, rot: -42 },
    { cx: 225, cy: 108, rot:  22 },
    { cx: 244, cy: 104, rot: -65 },
    // row 4 (y≈128)
    { cx: 62,  cy: 127, rot: -18 },
    { cx: 82,  cy: 124, rot:  72 },
    { cx: 102, cy: 128, rot: -55 },
    { cx: 122, cy: 124, rot:  28 },
    { cx: 142, cy: 127, rot: -38 },
    { cx: 162, cy: 123, rot:  58 },
    { cx: 182, cy: 127, rot: -12 },
    { cx: 201, cy: 124, rot:  38 },
    { cx: 221, cy: 128, rot: -70 },
    { cx: 241, cy: 124, rot:  20 },
    // row 5 (y≈148)
    { cx: 67,  cy: 146, rot:  40 },
    { cx: 87,  cy: 143, rot: -65 },
    { cx: 107, cy: 147, rot:  15 },
    { cx: 126, cy: 143, rot: -30 },
    { cx: 146, cy: 147, rot:  80 },
    { cx: 166, cy: 143, rot: -50 },
    { cx: 186, cy: 147, rot:  22 },
    { cx: 205, cy: 143, rot: -75 },
    { cx: 225, cy: 147, rot:  48 },
    { cx: 244, cy: 143, rot: -18 },
    // row 6 (y≈167)
    { cx: 62,  cy: 166, rot:  60 },
    { cx: 82,  cy: 163, rot: -25 },
    { cx: 102, cy: 167, rot:  38 },
    { cx: 122, cy: 163, rot: -68 },
    { cx: 142, cy: 167, rot:  12 },
    { cx: 162, cy: 163, rot: -45 },
    { cx: 182, cy: 167, rot:  70 },
    { cx: 201, cy: 163, rot: -18 },
    { cx: 221, cy: 167, rot:  42 },
    { cx: 241, cy: 163, rot: -62 },
    // row 7 (y≈186)
    { cx: 67,  cy: 185, rot: -40 },
    { cx: 87,  cy: 182, rot:  55 },
    { cx: 107, cy: 186, rot: -20 },
    { cx: 126, cy: 182, rot:  42 },
    { cx: 146, cy: 186, rot: -72 },
    { cx: 166, cy: 182, rot:  28 },
    { cx: 186, cy: 186, rot: -35 },
    { cx: 205, cy: 182, rot:  62 },
    { cx: 225, cy: 186, rot: -10 },
    { cx: 244, cy: 182, rot:  50 },
    // row 8 (y≈205)
    { cx: 62,  cy: 204, rot:  20 },
    { cx: 82,  cy: 201, rot: -58 },
    { cx: 102, cy: 205, rot:  75 },
    { cx: 122, cy: 201, rot: -15 },
    { cx: 142, cy: 205, rot:  48 },
    { cx: 162, cy: 201, rot: -62 },
    { cx: 182, cy: 205, rot:  30 },
    { cx: 201, cy: 201, rot: -48 },
    { cx: 221, cy: 205, rot:  68 },
    { cx: 241, cy: 201, rot: -28 },
    // row 9 (y≈224)
    { cx: 67,  cy: 222, rot: -30 },
    { cx: 87,  cy: 219, rot:  65 },
    { cx: 107, cy: 223, rot: -10 },
    { cx: 126, cy: 219, rot:  52 },
    { cx: 146, cy: 223, rot: -78 },
    { cx: 166, cy: 219, rot:  18 },
    { cx: 186, cy: 223, rot: -55 },
    { cx: 205, cy: 219, rot:  40 },
    { cx: 225, cy: 223, rot: -22 },
    { cx: 244, cy: 219, rot:  72 },
    // row 10 (y≈238)
    { cx: 72,  cy: 238, rot:  70 },
    { cx: 94,  cy: 235, rot: -38 },
    { cx: 116, cy: 239, rot:  25 },
    { cx: 138, cy: 235, rot: -62 },
    { cx: 158, cy: 238, rot:  45 },
    { cx: 178, cy: 234, rot: -20 },
    { cx: 198, cy: 238, rot:  58 },
    { cx: 218, cy: 234, rot: -45 },
    { cx: 236, cy: 238, rot:  15 },
    { cx: 244, cy: 234, rot: -62 },
  ];
  const anims = [
    { tx:  5, ty: -4, dr:  9 },
    { tx: -4, ty:  5, dr: -7 },
    { tx:  3, ty:  6, dr: 11 },
    { tx: -6, ty: -3, dr: -8 },
    { tx:  6, ty:  2, dr: -12},
    { tx: -3, ty: -6, dr:  7 },
  ];

  return (
    <svg viewBox="0 0 300 300" width={300} height={300} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <style>{`
          ${anims.map((a, i) => `
            @keyframes td${i} {
              0%   { transform: translate(0px,0px) rotate(0deg); }
              100% { transform: translate(${a.tx}px,${a.ty}px) rotate(${a.dr}deg); }
            }
          `).join('')}
        `}</style>
      </defs>
      {/* Table background */}
      <rect x={50} y={50} width={200} height={200} rx={8} fill="#eef4ee" stroke="#c8d8c9" strokeWidth={1} />
      {/* Scattered face-down tiles */}
      {tiles.map((t, i) => {
        const a = i % anims.length;
        const dur  = (1.0 + (i % 7) * 0.18).toFixed(2);
        const del  = ((i * 0.11) % 1.6).toFixed(2);
        return (
          <g
            key={i}
            style={{
              animation: `td${a} ${dur}s ${del}s ease-in-out infinite alternate`,
              transformBox: 'fill-box' as any,
              transformOrigin: 'center',
            }}
          >
            <g transform={`translate(${t.cx}, ${t.cy}) rotate(${t.rot}) scale(0.5) translate(-18, -25)`}>
              <BackTile x={0} y={0} />
            </g>
          </g>
        );
      })}
      <CompassLetters />
    </svg>
  );
}

function Diagram1() {
  return (
    <svg viewBox="0 0 300 300" width={300} height={300} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <SmallSvgDefs idPrefix="sm1" />
      {/* Table background */}
      <rect x={50} y={50} width={200} height={200} rx={8} fill="#eef4ee" stroke="#c8d8c9" strokeWidth={1} />
      <PinwheelWalls idPrefix="sm1" />
      <CompassLetters />
    </svg>
  );
}

function Diagram2() {
  return (
    <svg viewBox="0 0 300 300" width={300} height={300} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <SmallSvgDefs idPrefix="sm2" />
      <rect x={50} y={50} width={200} height={200} rx={8} fill="#eef4ee" stroke="#c8d8c9" strokeWidth={1} />
      <PinwheelWalls idPrefix="sm2" />
      <CompassLetters />
      {/* Spinning CW arrow in centre */}
      <defs>
        <marker id="arrow-cw" markerWidth="20" markerHeight="20" refX="13" refY="10" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,2 L18,10 L0,18 Z" fill="#2f6b44" />
        </marker>
        <style>{`
          @keyframes spin-cw {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </defs>
      <g style={{ transformOrigin: '150px 150px', animation: 'spin-cw 2.4s linear infinite' } as React.CSSProperties}>
        {/* 270° arc: top → right → bottom, arrowhead points CW */}
        <path
          d="M 150,120 A 30,30 0 1 1 120,150"
          fill="none"
          stroke="#2f6b44"
          strokeWidth={5}
          strokeLinecap="round"
          markerEnd="url(#arrow-cw)"
        />
      </g>
      {/* DRAW label */}
      <text
        x={150}
        y={160}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#1c4a2a', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}
      >
        DRAW
      </text>
    </svg>
  );
}

function Diagram3() {
  return (
    <svg viewBox="0 0 300 300" width={300} height={300} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <SmallSvgDefs idPrefix="sm3" />
      <rect x={50} y={50} width={200} height={200} rx={8} fill="#eef4ee" stroke="#c8d8c9" strokeWidth={1} />
      <PinwheelWalls idPrefix="sm3" />
      <CompassLetters />
      {/* Spinning CCW arrow in centre */}
      <defs>
        <marker id="arrow-ccw" markerWidth="20" markerHeight="20" refX="13" refY="10" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,2 L18,10 L0,18 Z" fill="#b8302a" />
        </marker>
        <style>{`
          @keyframes spin-ccw {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
        `}</style>
      </defs>
      <g style={{ transformOrigin: '150px 150px', animation: 'spin-ccw 2.4s linear infinite' } as React.CSSProperties}>
        {/* 270° arc CCW: top → left → bottom, arrowhead points CCW */}
        <path
          d="M 150,120 A 30,30 0 1 1 120,150"
          fill="none"
          stroke="#b8302a"
          strokeWidth={5}
          strokeLinecap="round"
          markerEnd="url(#arrow-ccw)"
        />
      </g>
      {/* PLAY label */}
      <text
        x={150}
        y={160}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#b8302a', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}
      >
        PLAY
      </text>
    </svg>
  );
}

// ── Big table SVG ──────────────────────────────────────────────────────────────

// West hand tiles (13): top, horizontal, y=55, x starting 192, stride 40
const westTiles: Array<{ back: true } | { face: TileFace }> = [
  { face: { suit: 'wind', value: 'east' } },
  { face: { suit: 'wind', value: 'east' } },
  { face: { suit: 'wind', value: 'east' } },
  { face: { suit: 'dot', value: 7 } },
  { face: { suit: 'dot', value: 8 } },
  { face: { suit: 'dot', value: 9 } },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { face: { suit: 'character', value: 5 } },
  { face: { suit: 'flower', value: 1 } },
  { face: { suit: 'flower', value: 2 } },
];

// North hand tiles (12): left, vertical, rotated 90°, x=55, y starting 212, stride 40
const northTiles: Array<{ back: true } | { face: TileFace }> = [
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { face: { suit: 'character', value: 2 } },
  { face: { suit: 'character', value: 2 } },
  { face: { suit: 'character', value: 2 } },
  { face: { suit: 'season', value: 1 } },
];

// South hand tiles (12): right, vertical, rotated -90°, x=809, y starting 212, stride 40
const southTiles: Array<{ back: true } | { face: TileFace }> = [
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { face: { suit: 'bamboo', value: 4 } },
  { face: { suit: 'bamboo', value: 5 } },
  { face: { suit: 'bamboo', value: 6 } },
  { face: { suit: 'flower', value: 3 } },
];

// East winning hand (14): bottom, horizontal, x starting 172, y=738, stride 40
const eastTiles: Array<TileFace> = [
  { suit: 'wind', value: 'south' },
  { suit: 'wind', value: 'south' },
  { suit: 'wind', value: 'south' },
  { suit: 'dot', value: 4 },
  { suit: 'dot', value: 5 },
  { suit: 'dot', value: 6 },
  { suit: 'character', value: 7 },
  { suit: 'character', value: 7 },
  { suit: 'character', value: 7 },
  { suit: 'bamboo', value: 3 },
  { suit: 'bamboo', value: 4 },
  { suit: 'bamboo', value: 5 },
  { suit: 'bamboo', value: 1 },
  { suit: 'bamboo', value: 1 },
];

function BigTableSvg() {
  const GAP = 30;           // consistent gap between table edge and tile edge
  const TABLE_TOP = 150;
  const TABLE_BOTTOM = 750;
  const TABLE_LEFT = 150;
  const TABLE_RIGHT = 750;
  const TABLE_CX = 450;
  const TABLE_CY = 450;

  const TILE_W = 36;
  const TILE_H = 52;
  const STRIDE = 40;

  // West (top): tiles sit GAP above the table
  const westY = TABLE_TOP - GAP - TILE_H;              // 68
  const westXStart = TABLE_CX - (13 * STRIDE - 4) / 2; // centred: 192

  // East (bottom): tiles sit GAP below the table
  const eastY = TABLE_BOTTOM + GAP;                    // 780
  const eastXStart = TABLE_CX - (14 * STRIDE - 4) / 2; // centred: 172

  // North (left): rotated tile right edge = northXBase + 18 + 26 = northXBase + 44
  const northXBase = TABLE_LEFT - GAP - 44;             // right edge lands exactly GAP from table
  const northYStart = TABLE_CY - (12 * STRIDE - 4) / 2; // centred: 206

  // South (right): rotated tile left edge = southXBase + 18 - 26 = southXBase - 8
  const southXBase = TABLE_RIGHT + GAP + 8;             // left edge lands exactly GAP from table
  const southYStart = TABLE_CY - (12 * STRIDE - 4) / 2; // centred: 206

  // Separator x positions after tile groups (after tiles 3, 6, 9, 12 — 0-indexed 2, 5, 8, 11)
  const sepXPositions = [
    eastXStart + 3 * 40 - 2,   // 290 — after group 1
    eastXStart + 6 * 40 - 2,   // 410 — after group 2
    eastXStart + 9 * 40 - 2,   // 530 — after group 3
    eastXStart + 12 * 40 - 2,  // 650 — after group 4
  ];

  // Group label centers
  const groupCenters = [
    230,  // group 1: tiles 0-2, left=172, right=172+2*40+36=288 → (172+288)/2=230
    350,  // group 2: tiles 3-5, left=292, right=292+2*40+36=408 → (292+408)/2=350
    470,  // group 3: tiles 6-8, left=412, right=412+2*40+36=528 → (412+528)/2=470
    590,  // group 4: tiles 9-11, left=532, right=532+2*40+36=648 → (532+648)/2=590
    690,  // group 5: tiles 12-13, left=652, right=652+40+36=728 → (652+728)/2=690
  ];
  const groupLabels = ['pung', 'chow', 'pung', 'chow', 'pair'];

  return (
    <svg
      viewBox="0 0 900 900"
      width="100%"
      height="auto"
      style={{ display: 'block' }}
      aria-label="Full round flow diagram showing all four player hands and the table"
    >
      <defs>
        {/* Gradient for tile face */}
        <linearGradient id="tile-face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbf6e4" />
          <stop offset="100%" stopColor="#f0e5c1" />
        </linearGradient>
        {/* Horizontal wall pattern */}
        <pattern id="hwall-tiles" width="24" height="32" patternUnits="userSpaceOnUse">
          <rect width="22" height="32" rx="2.5" fill="#2f6b44" stroke="#235836" strokeWidth="0.8" />
        </pattern>
        {/* Vertical wall pattern */}
        <pattern id="vwall-tiles" width="32" height="24" patternUnits="userSpaceOnUse">
          <rect width="32" height="22" rx="2.5" fill="#2f6b44" stroke="#235836" strokeWidth="0.8" />
        </pattern>
        {/* Ghost tiles (drawn section) */}
        <pattern id="ghost-tiles" width="24" height="32" patternUnits="userSpaceOnUse">
          <rect width="22" height="32" rx="2.5" fill="#dde6d6" stroke="#235836" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* ── Table background ── */}
      <rect x={150} y={150} width={600} height={600} rx={12} fill="#eef4ee" />
      <rect x={150} y={150} width={600} height={600} rx={12} fill="none" stroke="#c8d8c9" strokeWidth={1} />

      {/* ── Wall bars ── */}
      {/* Top bar */}
      <g transform="translate(223,234) rotate(20,227,16)">
        <rect width={454} height={32} fill="url(#hwall-tiles)" />
        {/* Ghost overlay — drawn section */}
        <rect x={336} y={0} width={94} height={32} fill="url(#ghost-tiles)" />
      </g>
      {/* Right bar */}
      <g transform="translate(634,223) rotate(20,16,227)">
        <rect width={32} height={454} fill="url(#vwall-tiles)" />
      </g>
      {/* Bottom bar */}
      <g transform="translate(223,634) rotate(20,227,16)">
        <rect width={454} height={32} fill="url(#hwall-tiles)" />
      </g>
      {/* Left bar */}
      <g transform="translate(234,223) rotate(20,16,227)">
        <rect width={32} height={454} fill="url(#vwall-tiles)" />
      </g>

      {/* ── Player labels ── */}
      {/* gap of 28px from nearest tile edge on every side */}
      {(() => {
        const LABEL_GAP = 28;
        const TURN_GAP = 12;
        // actual outer tile edges (after rotation)
        const northTileLeft  = northXBase - 8;   // cx - TILE_H/2
        const southTileRight = southXBase + 44;  // cx + TILE_H/2
        const labelNorthX = northTileLeft  - LABEL_GAP;
        const labelSouthX = southTileRight + LABEL_GAP;
        const turnNorthX  = northTileLeft  - TURN_GAP;
        const turnSouthX  = southTileRight + TURN_GAP;
        return (
          <>
            <g style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 26, fill: '#1c4a2a' }}>
              <text x={TABLE_CX} y={westY - LABEL_GAP} textAnchor="middle">West Player</text>
              <text x={TABLE_CX} y={eastY + TILE_H + LABEL_GAP} textAnchor="middle">East Player</text>
              <text x={labelNorthX} y={TABLE_CY} textAnchor="middle" transform={`rotate(-90,${labelNorthX},${TABLE_CY})`}>North Player</text>
              <text x={labelSouthX} y={TABLE_CY} textAnchor="middle" transform={`rotate(90,${labelSouthX},${TABLE_CY})`}>South Player</text>
            </g>
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fill: '#2f6b44' }}>
              <text x={TABLE_CX} y={westY - TURN_GAP} textAnchor="middle">draws · 3 · 7 · 11 · 15 · 19</text>
              <text x={TABLE_CX} y={eastY + TILE_H + TURN_GAP} textAnchor="middle">draws · 1 · 5 · 9 · 13 · 17</text>
              <text x={turnNorthX} y={TABLE_CY} textAnchor="middle" transform={`rotate(-90,${turnNorthX},${TABLE_CY})`}>draws · 4 · 8 · 12 · 16 · 20</text>
              <text x={turnSouthX} y={TABLE_CY} textAnchor="middle" transform={`rotate(90,${turnSouthX},${TABLE_CY})`}>draws · 2 · 6 · 10 · 14 · 18</text>
            </g>
          </>
        );
      })()}

      {/* ── West hand (top, horizontal) ── */}
      <g>
        {westTiles.map((t, i) => {
          const x = westXStart + i * 40;
          const y = westY;
          if ('back' in t) return <BackTile key={i} x={x} y={y} />;
          return <FaceTile key={i} x={x} y={y} face={t.face} />;
        })}
      </g>

      {/* ── North hand (left, vertical, rotated 90°) ── */}
      <g>
        {northTiles.map((t, i) => {
          const tileY = northYStart + i * 40;
          // center of tile
          const cx = northXBase + 18;
          const cy = tileY + 26;
          if ('back' in t) {
            return (
              <g key={i} transform={`rotate(90,${cx},${cy})`}>
                <BackTile x={northXBase} y={tileY} />
              </g>
            );
          }
          return (
            <g key={i} transform={`rotate(90,${cx},${cy})`}>
              <FaceTile x={northXBase} y={tileY} face={t.face} />
            </g>
          );
        })}
      </g>

      {/* ── South hand (right, vertical, rotated -90°) ── */}
      <g>
        {southTiles.map((t, i) => {
          const tileY = southYStart + i * 40;
          const cx = southXBase + 18;
          const cy = tileY + 26;
          if ('back' in t) {
            return (
              <g key={i} transform={`rotate(-90,${cx},${cy})`}>
                <BackTile x={southXBase} y={tileY} />
              </g>
            );
          }
          return (
            <g key={i} transform={`rotate(-90,${cx},${cy})`}>
              <FaceTile x={southXBase} y={tileY} face={t.face} />
            </g>
          );
        })}
      </g>

      {/* ── Discard area (center) ── */}
      <FaceTile x={390} y={430} face={{ suit: 'dragon', value: 'white' }} />
      <FaceTile x={432} y={430} face={{ suit: 'wind', value: 'north' }} />
      <FaceTile x={474} y={430} face={{ suit: 'character', value: 9 }} />
      <text
        x={525}
        y={460}
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, fill: '#7a7a6a' }}
      >
        discards
      </text>

      {/* ── East's winning hand (bottom, horizontal) ── */}
      {/* Caption above */}
      <text
        x={450}
        y={eastY - 12}
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#2f6b44' }}
      >
        east&apos;s winning hand · 14 tiles
      </text>

      {/* Tiles */}
      <g>
        {eastTiles.map((face, i) => (
          <FaceTile key={i} x={eastXStart + i * 40} y={eastY} face={face} />
        ))}
      </g>

      {/* Group separators */}
      {sepXPositions.map((sx, i) => (
        <line
          key={i}
          x1={sx}
          y1={eastY}
          x2={sx}
          y2={eastY + 52}
          stroke="#c8d8c9"
          strokeWidth={1.5}
        />
      ))}

      {/* Group labels */}
      {groupLabels.map((label, i) => (
        <text
          key={i}
          x={groupCenters[i]}
          y={800}
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#2f6b44' }}
        >
          {label}
        </text>
      ))}


    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function HowARoundFlows() {
  return (
    <div style={{ padding: '0 0 48px' }}>

      {/* ── Triplet small diagrams ── */}
      <div className="round-flow-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 230px)',
        gap: 64,
        justifyContent: 'center',
      }}>
        {/* Diagram 0: Shuffle */}
        <div>
          <Diagram0 />
          <DiagramCaption
            eyebrow="01 · shuffle"
            title="Shuffle the tiles"
            body="All 144 tiles go face-down and players mix them together in the centre."
          />
        </div>

        {/* Diagram 1: The wall */}
        <div>
          <Diagram1 />
          <DiagramCaption
            eyebrow="02 · the wall"
            title="Build the wall"
            body="144 tiles stacked two deep around the four sides of the table."
          />
        </div>

        {/* Diagram 2: The draw */}
        <div>
          <Diagram2 />
          <DiagramCaption
            eyebrow="03 · the draw"
            title="Draw clockwise"
            body="Each player takes tiles CW from the wall — 4 at a time, 3 rounds, then 1 more each."
          />
        </div>

        {/* Diagram 3: The play */}
        <div>
          <Diagram3 />
          <DiagramCaption
            eyebrow="04 · the play"
            title="Play counter-clockwise"
            body="After the deal, turns proceed CCW: East → South → West → North, one tile in, one tile out."
          />
        </div>
      </div>

      {/* ── Responsive override for small screens ── */}
      <style>{`
        @media (max-width: 767px) {
          .round-flow-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'var(--border-tertiary)', margin: '56px 0' }} />

      {/* ── Big table diagram ── */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginBottom: 8,
        }}>
          Full table view · East wins
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 16,
          color: 'var(--text-secondary)',
          marginBottom: 24,
          lineHeight: 1.6,
        }}>
          A snapshot mid-round: three hidden hands, a few discards in the center, and East&apos;s winning 14-tile hand
          laid out below.
        </p>
      </div>

      <div style={{ width: '60%', margin: '0 auto' }}>
        <BigTableSvg />
      </div>
    </div>
  );
}
