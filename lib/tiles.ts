export type Suit =
  | 'dot'
  | 'bamboo'
  | 'character'
  | 'wind'
  | 'dragon'
  | 'flower'
  | 'season';

export type SuitedValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type WindValue = 'east' | 'south' | 'west' | 'north';
export type DragonValue = 'red' | 'green' | 'white';
export type BonusValue = 1 | 2 | 3 | 4;

export type TileFace =
  | { suit: 'dot' | 'bamboo' | 'character'; value: SuitedValue }
  | { suit: 'wind'; value: WindValue }
  | { suit: 'dragon'; value: DragonValue }
  | { suit: 'flower' | 'season'; value: BonusValue };

export const WINDS: WindValue[] = ['east', 'south', 'west', 'north'];
export const WIND_GLYPHS: Record<WindValue, string> = {
  east: '東',
  south: '南',
  west: '西',
  north: '北',
};

export const DRAGONS: DragonValue[] = ['red', 'green', 'white'];

export const CHAR_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

export function buildAllTiles(): TileFace[] {
  const tiles: TileFace[] = [];
  (['dot', 'bamboo', 'character'] as const).forEach((suit) => {
    for (let v = 1 as SuitedValue; v <= 9; v = (v + 1) as SuitedValue) {
      tiles.push({ suit, value: v });
    }
  });
  WINDS.forEach((value) => tiles.push({ suit: 'wind', value }));
  DRAGONS.forEach((value) => tiles.push({ suit: 'dragon', value }));
  for (let v = 1 as BonusValue; v <= 4; v = (v + 1) as BonusValue) {
    tiles.push({ suit: 'flower', value: v });
    tiles.push({ suit: 'season', value: v });
  }
  return tiles;
}

export function tileLabel(face: TileFace): string {
  switch (face.suit) {
    case 'dot':
      return `${face.value} dot`;
    case 'bamboo':
      return `${face.value} bamboo`;
    case 'character':
      return `${face.value} character`;
    case 'wind':
      return `${face.value} wind`;
    case 'dragon':
      return `${face.value} dragon`;
    case 'flower':
      return `flower ${face.value}`;
    case 'season':
      return `season ${face.value}`;
  }
}

const WIND_NUM: Record<WindValue, number> = { east: 1, south: 2, west: 3, north: 4 };
const DRAGON_NUM: Record<DragonValue, number> = { red: 1, green: 2, white: 3 };

export function tileFileName(face: TileFace): string {
  switch (face.suit) {
    case 'bamboo':
      return `MJs${face.value}-.svg`;
    case 'character':
      return `MJw${face.value}-.svg`;
    case 'dot':
      return `MJt${face.value}-.svg`;
    case 'wind':
      return `MJf${WIND_NUM[face.value]}-.svg`;
    case 'dragon':
      return `MJd${DRAGON_NUM[face.value]}-.svg`;
    case 'flower':
      return `MJh${face.value}j-.svg`;
    case 'season':
      return `MJh${face.value + 4}j-.svg`;
  }
}

export function tileImageUrl(face: TileFace): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${tileFileName(face)}`;
}

export function tileChinese(face: TileFace): string {
  switch (face.suit) {
    case 'dot':
      return `${CHAR_NUMERALS[face.value - 1]}筒`;
    case 'bamboo':
      return `${CHAR_NUMERALS[face.value - 1]}索`;
    case 'character':
      return `${CHAR_NUMERALS[face.value - 1]}萬`;
    case 'wind':
      return WIND_GLYPHS[face.value];
    case 'dragon':
      return face.value === 'red' ? '紅中' : face.value === 'green' ? '青發' : '白板';
    case 'flower':
      return `${face.value}花`;
    case 'season':
      return `${face.value}季`;
  }
}
