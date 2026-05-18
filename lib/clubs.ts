export interface Club {
  name: string;
  styles: ('hk' | 'riichi' | 'american')[];
  loc: string;
  price: string | null;
  desc: string;
  insta: string | null;
  session: string | null; // next / recurring session note
}

export type Borough = 'manhattan' | 'brooklyn' | 'queens' | 'bronx' | 'staten-island';

export const BOROUGHS: { id: Borough; label: string; zh: string }[] = [
  { id: 'manhattan',    label: 'Manhattan',    zh: '曼哈頓' },
  { id: 'brooklyn',     label: 'Brooklyn',     zh: '布魯克林' },
  { id: 'queens',       label: 'Queens',       zh: '皇后區' },
  { id: 'bronx',        label: 'The Bronx',    zh: '布朗克斯' },
  { id: 'staten-island',label: 'Staten Island',zh: '史泰登島' },
];

export const CLUBS: Record<Borough, Club[]> = {
  manhattan: [
    {
      name: 'Mahjong Palace NYC',
      styles: ['hk'],
      loc: 'Various Manhattan venues',
      price: 'Ticketed',
      desc: 'Sessions at art galleries, cultural spaces, and restaurants. All levels, drinks and snacks included.',
      insta: 'mahjongpalace',
      session: 'Monthly pop-ups',
    },
    {
      name: 'Manhattan Mah Jongg Club',
      styles: ['american'],
      loc: 'Manhattan',
      price: null,
      desc: 'Weekly Mah Jongg Mondays. Private and group lessons available.',
      insta: null,
      session: 'Mondays weekly',
    },
    {
      name: 'Riichi Nomi NYC',
      styles: ['riichi'],
      loc: 'Midtown Manhattan',
      price: 'Free',
      desc: 'Weekly in-person meetups, tournaments, Discord community, and member coaching. All skill levels welcome.',
      insta: 'nycriichinomi',
      session: 'Sundays 12–8pm',
    },
    {
      name: "Sparrow's Nest Studio",
      styles: ['riichi', 'hk', 'american'],
      loc: 'Midtown Manhattan',
      price: '$5 / hr',
      desc: "NYC's first dedicated mahjong studio. Walk-in open play, beginner lessons, and classes across all styles.",
      insta: 'sparrowsneststudio',
      session: 'Thu–Sun open play',
    },
  ],
  brooklyn: [
    {
      name: 'Brooklyn Mahjong',
      styles: ['hk'],
      loc: 'Brooklyn',
      price: null,
      desc: 'Community-focused mahjong gatherings around Brooklyn. Casual and welcoming.',
      insta: 'bkmahjong',
      session: null,
    },
    {
      name: 'Green Tile Social Club',
      styles: ['hk'],
      loc: 'Various Brooklyn venues',
      price: '~$25 / ticket',
      desc: 'Founded in 2022 by four Asian-American friends. Pop-up events, supper clubs, and large-scale gatherings citywide.',
      insta: 'greentilesocialclub',
      session: 'Periodic pop-ups',
    },
    {
      name: 'Land to Sea',
      styles: ['hk'],
      loc: 'East Williamsburg, Brooklyn',
      price: 'Ticketed',
      desc: 'Asian American women-owned coffee shop and creative space with Hong Kong-inspired decor. Hosts beginner mahjong lessons (6:30–9:30pm) and advanced pop-ups.',
      insta: 'landtoseanyc',
      session: 'Ticketed · 6:30–9:30pm',
    },
    {
      name: 'Mahjong King',
      styles: [],
      loc: 'Brooklyn',
      price: null,
      desc: 'Community gatherings pairing mahjong with food and music.',
      insta: 'mahjongking.nyc',
      session: null,
    },
  ],
  queens: [
    {
      name: 'Lately Cafe',
      styles: [],
      loc: 'Long Island City, Queens',
      price: '~$25 / ticket',
      desc: 'Café, bistro, and bar — daytime coffee shop that becomes a bar/bistro at night. Hosts mahjong nights.',
      insta: 'latelycafe',
      session: 'Mahjong nights',
    },
  ],
  bronx: [],
  'staten-island': [],
};

export const STYLE_META = {
  hk: {
    label: 'HK',
    color: '#235836',
    bg: '#eef0e2',
    text: '#14361f',
  },
  riichi: {
    label: 'Riichi',
    color: '#5a4a8a',
    bg: '#f0eef8',
    text: '#3a2d6a',
  },
  american: {
    label: 'American',
    color: '#a06b1a',
    bg: '#fdf3e3',
    text: '#6b4410',
  },
} as const;

export const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
