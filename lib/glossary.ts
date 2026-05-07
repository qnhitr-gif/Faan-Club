import type { TileFace } from './tiles';

export type GlossaryCategory = 'tile' | 'term' | 'call' | 'scoring';

export interface GlossaryEntry {
  id: string;
  category: GlossaryCategory;
  english: string;
  chinese?: string;
  pinyin?: string;
  definition: string;
  tile?: TileFace;
}

export const GLOSSARY: GlossaryEntry[] = [
  // Tiles — suits
  {
    id: 'dot',
    category: 'tile',
    english: 'Dots',
    chinese: '筒',
    pinyin: 'tǒng',
    definition: 'One of the three suits, ranked 1–9. Identified by circles on the face.',
    tile: { suit: 'dot', value: 5 },
  },
  {
    id: 'bamboo',
    category: 'tile',
    english: 'Bamboo',
    chinese: '索',
    pinyin: 'suǒ',
    definition: 'One of the three suits. Vertical sticks for 2–9; the 1 is a stylized sparrow.',
    tile: { suit: 'bamboo', value: 5 },
  },
  {
    id: 'character',
    category: 'tile',
    english: 'Character',
    chinese: '萬',
    pinyin: 'wàn',
    definition: 'One of the three suits. Numeral on top, the character 萬 ("ten thousand") on the bottom.',
    tile: { suit: 'character', value: 5 },
  },

  // Tiles — winds
  {
    id: 'east-wind',
    category: 'tile',
    english: 'East wind',
    chinese: '東',
    pinyin: 'dōng',
    definition: 'The dealer\'s wind, and the first round\'s wind. East starts every hand.',
    tile: { suit: 'wind', value: 'east' },
  },
  {
    id: 'south-wind',
    category: 'tile',
    english: 'South wind',
    chinese: '南',
    pinyin: 'nán',
    definition: 'Seat to the right of East at a Chinese-style table. The second round\'s wind.',
    tile: { suit: 'wind', value: 'south' },
  },
  {
    id: 'west-wind',
    category: 'tile',
    english: 'West wind',
    chinese: '西',
    pinyin: 'xī',
    definition: 'Seat opposite East. The third round\'s wind.',
    tile: { suit: 'wind', value: 'west' },
  },
  {
    id: 'north-wind',
    category: 'tile',
    english: 'North wind',
    chinese: '北',
    pinyin: 'běi',
    definition: 'Seat to the left of East. The fourth round\'s wind.',
    tile: { suit: 'wind', value: 'north' },
  },

  // Tiles — dragons
  {
    id: 'red-dragon',
    category: 'tile',
    english: 'Red dragon',
    chinese: '中',
    pinyin: 'zhōng',
    definition: 'One of three dragon tiles. A pung of red dragon scores 1 faan.',
    tile: { suit: 'dragon', value: 'red' },
  },
  {
    id: 'green-dragon',
    category: 'tile',
    english: 'Green dragon',
    chinese: '發',
    pinyin: 'fā',
    definition: 'One of three dragon tiles. A pung of green dragon scores 1 faan.',
    tile: { suit: 'dragon', value: 'green' },
  },
  {
    id: 'white-dragon',
    category: 'tile',
    english: 'White dragon',
    chinese: '白板',
    pinyin: 'bái bǎn',
    definition: 'One of three dragon tiles. A blank face with a thin border.',
    tile: { suit: 'dragon', value: 'white' },
  },

  // Calls
  {
    id: 'pung',
    category: 'call',
    english: 'Pung',
    chinese: '碰',
    pinyin: 'pèng',
    definition: 'A set of three identical tiles. Can be claimed from any player\'s discard.',
  },
  {
    id: 'chow',
    category: 'call',
    english: 'Chow',
    chinese: '上',
    pinyin: 'shàng',
    definition: 'A set of three consecutive tiles in the same suit. Can only be claimed from the player on your right.',
  },
  {
    id: 'kong',
    category: 'call',
    english: 'Kong',
    chinese: '槓',
    pinyin: 'gàng',
    definition: 'A set of all four copies of a tile. Triggers a replacement draw.',
  },

  // Terms
  {
    id: 'faan',
    category: 'scoring',
    english: 'Faan',
    chinese: '番',
    pinyin: 'fān',
    definition: 'Pattern points. A winning hand\'s faan total determines its payout.',
  },
  {
    id: 'self-draw',
    category: 'term',
    english: 'Self-draw',
    chinese: '自摸',
    pinyin: 'zì mō',
    definition: 'Winning by drawing your last needed tile yourself, rather than claiming it from a discard.',
  },
  {
    id: 'wall',
    category: 'term',
    english: 'Wall',
    chinese: '牌牆',
    pinyin: 'pái qiáng',
    definition: 'The four lines of stacked face-down tiles built before the deal — 18 long, 2 high, on each side.',
  },
  {
    id: 'discard',
    category: 'term',
    english: 'Discard',
    chinese: '打牌',
    pinyin: 'dǎ pái',
    definition: 'A tile thrown face-up into the center of the table at the end of a player\'s turn.',
  },
  {
    id: 'flower',
    category: 'tile',
    english: 'Flower',
    chinese: '花',
    pinyin: 'huā',
    definition: 'A bonus tile. Set aside immediately when drawn; replaced from the back of the wall.',
    tile: { suit: 'flower', value: 1 },
  },
  {
    id: 'season',
    category: 'tile',
    english: 'Season',
    chinese: '季',
    pinyin: 'jì',
    definition: 'A bonus tile. Like flowers, set aside and replaced when drawn.',
    tile: { suit: 'season', value: 1 },
  },
  {
    id: 'common-hand',
    category: 'scoring',
    english: 'Common hand',
    chinese: '平糊',
    pinyin: 'píng hú',
    definition: 'A hand made entirely of chows with a non-honor pair. Worth 1 faan.',
  },
  {
    id: 'all-pungs',
    category: 'scoring',
    english: 'All pungs',
    chinese: '對對糊',
    pinyin: 'duì duì hú',
    definition: 'A hand made of four pungs (or kongs) and a pair. Worth 3 faan.',
  },
  {
    id: 'pure-one-suit',
    category: 'scoring',
    english: 'Pure one-suit',
    chinese: '清一色',
    pinyin: 'qīng yī sè',
    definition: 'A hand made entirely from a single suit, no honors. Worth 7 faan.',
  },
  {
    id: 'mixed-one-suit',
    category: 'scoring',
    english: 'Mixed one-suit',
    chinese: '混一色',
    pinyin: 'hùn yī sè',
    definition: 'A hand made from a single suit plus honor tiles. Worth 3 faan.',
  },
];

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  tile: 'Tiles',
  term: 'Terms',
  call: 'Calls',
  scoring: 'Scoring',
};
