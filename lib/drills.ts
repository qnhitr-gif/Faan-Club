export const DRILLS = [
  {
    id: 'tile-efficiency' as const,
    num: '01',
    label: 'Tile',
    labelEm: 'efficiency',
    desc: 'Which tiles improve your hand the most?',
    detail: 'Given a 13-tile hand, identify the best tile to discard to maximise your chances of winning. Trains the instinct every experienced player relies on.',
    time: '~3 min',
    questions: '5 questions',
  },
  {
    id: 'pattern-building' as const,
    num: '02',
    label: 'Pattern',
    labelEm: 'building',
    desc: 'Identify winning hand shapes.',
    detail: 'Spot melds, pairs, and incomplete sets in a hand. Learn to read a hand at a glance — the skill that separates fast players from slow ones.',
    time: '~4 min',
    questions: '5 questions',
  },
  {
    id: 'fan-calculation' as const,
    num: '03',
    label: 'Faan',
    labelEm: 'calculation',
    desc: 'Score the hand correctly.',
    detail: 'Given a winning hand, calculate the correct faan total. Covers common patterns, honor bonuses, and win methods.',
    time: '~5 min',
    questions: '5 questions',
  },
];

export type DrillId = typeof DRILLS[number]['id'];
