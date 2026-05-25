// Shared types for all generated game data files.
// GamePlayer.tsx and generated data files both import from here.

export type GameSeat = 'East' | 'South' | 'West' | 'North';
export type GameAction = 'setup' | 'draw-discard' | 'claim' | 'win' | 'opponents';

export interface GameStep {
  who: GameSeat | null;
  action: GameAction;
  drew: string | null;
  discarded: string | null;
  bonusDrawn?: string | null;
  claimed: { from: GameSeat; tile: string; meld: string[] } | null;
  discardReason: string | null;
  strategy?: string | null;
  warning: boolean;
  headline: string;
  comment: string;
  hands: Record<GameSeat, string[]>;
  exposed: Record<GameSeat, string[][]>;
  discards: Record<GameSeat, string[]>;
  bonus?: Record<GameSeat, string[]>;
  fan: Record<GameSeat, number | null>;
  breakdown: { item: string; fan: number }[] | null;
  total: number | null;
  learningFlags?: {
    isTenpai?: boolean;
    isWarning?: boolean;
    goodTableRead?: boolean;
    fanCalcMoment?: boolean;
  };
}

export interface LearningContent {
  fanCalc: {
    hand: string[] | { concealed: string[]; exposed: string[][]; winningTile?: string; winBy?: string };
    conditions: { seat: string; round: string; winBy: string; bonus: string[]; prevailingWind?: string };
    answer: { total: number; sources: { item: string; fan: number }[] };
    commonMistake: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  tableRead: {
    stepIdx: number;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
  patternBuild: {
    stepIdx: number;
    hand: string[];
    exposed?: string[][];
    question: string;
    answer: string;
    explanation: string;
  }[];
}

export interface GameMetadata {
  winner: string;
  pattern: string;
  suit: string;
  honor: string;
  roundWind: string;
  totalFan: number;
  fanSources: { item: string; fan: number }[];
  generatedAt: string;
}
