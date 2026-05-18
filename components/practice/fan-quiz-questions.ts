import type { TileFace, SuitedValue, WindValue, DragonValue } from '@/lib/tiles';

export type SpecSuit =
  | 'bam' | 'dot' | 'char'
  | 'east' | 'south' | 'west' | 'north'
  | 'red' | 'green' | 'white';

export interface SpecTile {
  v: string;
  s: SpecSuit;
  highlight?: boolean;
}

export type ConditionType = 'default' | 'win' | 'flower' | 'concealed' | 'open';
export interface Condition {
  label: string;
  value: string;
  type: ConditionType;
}

export interface FanBreakdownItem {
  item: string;
  fan: number;
}

export interface FanQuestion {
  id: string;
  groups: SpecTile[][];
  conditions: Condition[];
  correct: number;
  opts: string[];
  breakdown: FanBreakdownItem[];
  total: number;
}

export function toTileFace(t: SpecTile): TileFace {
  switch (t.s) {
    case 'bam':
      return { suit: 'bamboo', value: Number(t.v) as SuitedValue };
    case 'dot':
      return { suit: 'dot', value: Number(t.v) as SuitedValue };
    case 'char':
      return { suit: 'character', value: Number(t.v) as SuitedValue };
    case 'east':
    case 'south':
    case 'west':
    case 'north':
      return { suit: 'wind', value: t.s as WindValue };
    case 'red':
    case 'green':
    case 'white':
      return { suit: 'dragon', value: t.s as DragonValue };
  }
}

export const FAN_QUESTIONS: FanQuestion[] = [
  {
    id: 'q-01',
    groups: [
      [{ v: '1', s: 'bam' }, { v: '2', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '4', s: 'dot' }, { v: '5', s: 'dot' }, { v: '6', s: 'dot' }],
      [{ v: '3', s: 'char' }, { v: '4', s: 'char' }, { v: '5', s: 'char' }],
      [{ v: '7', s: 'bam' }, { v: '8', s: 'bam' }, { v: '9', s: 'bam' }],
      [{ v: '5', s: 'dot' }, { v: '5', s: 'dot' }],
    ],
    conditions: [
      { label: 'Seat', value: 'South', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Discard from others', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 1,
    opts: ['1 fan', '2 fan', '3 fan', '4 fan'],
    breakdown: [
      { item: 'Ping Hu — all chows, non-value pair, discard from others', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 2,
  },
  {
    id: 'q-02',
    groups: [
      [{ v: '2', s: 'bam' }, { v: '3', s: 'bam' }, { v: '4', s: 'bam' }],
      [{ v: '6', s: 'dot' }, { v: '7', s: 'dot' }, { v: '8', s: 'dot' }],
      [{ v: '3', s: 'char' }, { v: '4', s: 'char' }, { v: '5', s: 'char' }],
      [{ v: '', s: 'red' }, { v: '', s: 'red' }, { v: '', s: 'red' }],
      [{ v: '8', s: 'bam' }, { v: '8', s: 'bam' }],
    ],
    conditions: [
      { label: 'Seat', value: 'North', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Open', type: 'open' },
      { label: 'Win', value: 'Self-draw', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 2,
    opts: ['1 fan', '2 fan', '3 fan', '4 fan'],
    breakdown: [
      { item: 'Red Dragon pung', fan: 1 },
      { item: 'Self-draw', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 3,
  },
  {
    id: 'q-03',
    groups: [
      [{ v: '3', s: 'bam' }, { v: '3', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '7', s: 'dot' }, { v: '7', s: 'dot' }, { v: '7', s: 'dot' }],
      [{ v: '9', s: 'char' }, { v: '9', s: 'char' }, { v: '9', s: 'char' }],
      [{ v: '', s: 'west' }, { v: '', s: 'west' }, { v: '', s: 'west' }],
      [{ v: '5', s: 'bam' }, { v: '5', s: 'bam' }],
    ],
    conditions: [
      { label: 'Seat', value: 'West', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Open', type: 'open' },
      { label: 'Win', value: 'Self-draw', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 3,
    opts: ['3 fan', '4 fan', '5 fan', '6 fan'],
    breakdown: [
      { item: 'All Pungs', fan: 3 },
      { item: 'Seat wind pung — West', fan: 1 },
      { item: 'Self-draw', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 6,
  },
  {
    id: 'q-04',
    groups: [
      [{ v: '1', s: 'bam' }, { v: '2', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '5', s: 'dot' }, { v: '6', s: 'dot' }, { v: '7', s: 'dot' }],
      [{ v: '2', s: 'char' }, { v: '3', s: 'char' }, { v: '4', s: 'char' }],
      [{ v: '6', s: 'bam' }, { v: '7', s: 'bam' }, { v: '8', s: 'bam' }],
      [{ v: '3', s: 'dot' }, { v: '3', s: 'dot' }],
    ],
    conditions: [
      { label: 'Seat', value: 'South', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Discard from others', type: 'win' },
      { label: 'Flowers', value: 'Flower 2 — seat flower', type: 'flower' },
    ],
    correct: 1,
    opts: ['1 fan', '2 fan', '3 fan', '4 fan'],
    breakdown: [
      { item: 'Ping Hu — all chows, non-value pair, discard from others', fan: 1 },
      { item: 'Seat flower tile (South = Flower 2)', fan: 1 },
    ],
    total: 2,
  },
  {
    id: 'q-05',
    groups: [
      [{ v: '2', s: 'bam' }, { v: '3', s: 'bam' }, { v: '4', s: 'bam' }],
      [{ v: '6', s: 'bam' }, { v: '7', s: 'bam' }, { v: '8', s: 'bam' }],
      [{ v: '', s: 'red' }, { v: '', s: 'red' }, { v: '', s: 'red' }],
      [{ v: '', s: 'green' }, { v: '', s: 'green' }, { v: '', s: 'green' }],
      [{ v: '', s: 'white' }, { v: '', s: 'white' }],
    ],
    conditions: [
      { label: 'Seat', value: 'East', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Open', type: 'open' },
      { label: 'Win', value: 'Self-draw', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 3,
    opts: ['7 fan', '8 fan', '9 fan', '10 fan'],
    breakdown: [
      { item: 'Small Three Dragons (小三元) — pungs of Red & Green Dragon, pair of White', fan: 5 },
      { item: 'Half Flush — Bamboo suit + honor tiles', fan: 3 },
      { item: 'Self-draw', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 10,
  },
  {
    id: 'q-06',
    groups: [
      [{ v: '1', s: 'bam' }, { v: '2', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '4', s: 'bam' }, { v: '5', s: 'bam' }, { v: '6', s: 'bam' }],
      [{ v: '7', s: 'bam' }, { v: '8', s: 'bam' }, { v: '9', s: 'bam' }],
      [{ v: '2', s: 'bam' }, { v: '2', s: 'bam' }, { v: '2', s: 'bam' }],
      [{ v: '5', s: 'bam' }, { v: '5', s: 'bam' }],
    ],
    conditions: [
      { label: 'Seat', value: 'North', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Discard from others', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 2,
    opts: ['7 fan', '8 fan', '9 fan', '10 fan'],
    breakdown: [
      { item: 'Full Flush — all Bamboo (清一色)', fan: 7 },
      { item: 'Concealed hand — win by discard', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 9,
  },
  {
    id: 'q-07',
    groups: [
      [{ v: '', s: 'red' }, { v: '', s: 'red' }, { v: '', s: 'red' }],
      [{ v: '', s: 'green' }, { v: '', s: 'green' }, { v: '', s: 'green' }],
      [{ v: '3', s: 'bam' }, { v: '3', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '7', s: 'dot' }, { v: '7', s: 'dot' }, { v: '7', s: 'dot' }],
      [{ v: '9', s: 'char' }, { v: '9', s: 'char' }],
    ],
    conditions: [
      { label: 'Seat', value: 'South', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Open', type: 'open' },
      { label: 'Win', value: 'Discard from others', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 3,
    opts: ['3 fan', '4 fan', '5 fan', '6 fan'],
    breakdown: [
      { item: 'All Pungs', fan: 3 },
      { item: 'Red Dragon pung', fan: 1 },
      { item: 'Green Dragon pung', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 6,
  },
  {
    id: 'q-08',
    groups: [
      [{ v: '3', s: 'bam' }, { v: '4', s: 'bam' }, { v: '5', s: 'bam' }],
      [{ v: '6', s: 'dot' }, { v: '7', s: 'dot' }, { v: '8', s: 'dot' }],
      [{ v: '2', s: 'char' }, { v: '3', s: 'char' }, { v: '4', s: 'char' }],
      [{ v: '5', s: 'bam' }, { v: '6', s: 'bam' }, { v: '7', s: 'bam' }],
      [{ v: '9', s: 'dot' }, { v: '9', s: 'dot' }],
    ],
    conditions: [
      { label: 'Seat', value: 'West', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Self-draw — last wall tile', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 2,
    opts: ['3 fan', '4 fan', '5 fan', '6 fan'],
    breakdown: [
      { item: 'Ping Hu — all chows, non-value pair', fan: 1 },
      { item: 'Concealed hand — win by self-draw', fan: 1 },
      { item: 'Self-draw', fan: 1 },
      { item: 'Last wall tile bonus', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 5,
  },
  {
    id: 'q-09',
    groups: [
      [{ v: '', s: 'east' }, { v: '', s: 'east' }, { v: '', s: 'east' }],
      [{ v: '', s: 'north' }, { v: '', s: 'north' }, { v: '', s: 'north' }],
      [{ v: '', s: 'red' }, { v: '', s: 'red' }, { v: '', s: 'red' }],
      [{ v: '3', s: 'bam' }, { v: '3', s: 'bam' }, { v: '3', s: 'bam' }],
      [{ v: '5', s: 'dot' }, { v: '5', s: 'dot' }],
    ],
    conditions: [
      { label: 'Seat', value: 'North', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Open', type: 'open' },
      { label: 'Win', value: 'Self-draw', type: 'win' },
      { label: 'Flowers', value: 'None', type: 'default' },
    ],
    correct: 2,
    opts: ['6 fan', '7 fan', '8 fan', '9 fan'],
    breakdown: [
      { item: 'All Pungs (碰碰胡)', fan: 3 },
      { item: 'Round wind pung — East', fan: 1 },
      { item: 'Seat wind pung — North', fan: 1 },
      { item: 'Red Dragon pung', fan: 1 },
      { item: 'Self-draw', fan: 1 },
      { item: 'No flowers bonus', fan: 1 },
    ],
    total: 8,
  },
  {
    id: 'q-10',
    groups: [
      [{ v: '1', s: 'bam' }, { v: '1', s: 'bam' }],
      [{ v: '5', s: 'bam' }, { v: '5', s: 'bam' }],
      [{ v: '3', s: 'dot' }, { v: '3', s: 'dot' }],
      [{ v: '7', s: 'dot' }, { v: '7', s: 'dot' }],
      [{ v: '2', s: 'char' }, { v: '2', s: 'char' }],
      [{ v: '8', s: 'char' }, { v: '8', s: 'char' }],
      [{ v: '', s: 'east' }, { v: '', s: 'east' }],
    ],
    conditions: [
      { label: 'Seat', value: 'East', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Self-draw', type: 'win' },
      { label: 'Flowers', value: 'Flower 1 — seat flower', type: 'flower' },
    ],
    correct: 2,
    opts: ['4 fan', '5 fan', '6 fan', '7 fan'],
    breakdown: [
      { item: 'Seven Pairs', fan: 4 },
      { item: 'Self-draw', fan: 1 },
      { item: 'Seat flower tile (East = Flower 1)', fan: 1 },
    ],
    total: 6,
  },
  {
    id: 'q-11',
    groups: [
      [{ v: '2', s: 'bam' }, { v: '3', s: 'bam' }, { v: '4', s: 'bam' }],
      [{ v: '5', s: 'dot' }, { v: '6', s: 'dot' }, { v: '7', s: 'dot' }],
      [{ v: '3', s: 'char' }, { v: '4', s: 'char' }, { v: '5', s: 'char' }],
      [{ v: '7', s: 'bam' }, { v: '8', s: 'bam' }, { v: '9', s: 'bam' }],
      [{ v: '6', s: 'dot' }, { v: '6', s: 'dot' }],
    ],
    conditions: [
      { label: 'Seat', value: 'East', type: 'default' },
      { label: 'Round', value: 'East', type: 'default' },
      { label: 'Hand', value: 'Concealed', type: 'concealed' },
      { label: 'Win', value: 'Discard from others', type: 'win' },
      { label: 'Flowers', value: 'Flower 3, Flower 4 — not seat flowers', type: 'flower' },
    ],
    correct: 0,
    opts: ['1 fan', '2 fan', '3 fan', '4 fan'],
    breakdown: [
      { item: 'Ping Hu — all chows, non-value pair, discard from others', fan: 1 },
      { item: 'Flower 3, Flower 4 — not seat flowers, score 0', fan: 0 },
    ],
    total: 1,
  },
];
