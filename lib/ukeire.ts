/**
 * Ukeire (tile acceptance) calculator for HK Mahjong.
 *
 * Given a hand and a wall, computes which tiles would improve shanten
 * and how many such tiles remain in the wall.
 */

import { calculateShanten, type TileCounts } from './shanten';

export interface UkeireResult {
  /** Total number of useful tiles remaining in the wall. */
  count: number;
  /** Tile indices (0–33) that are useful draws. */
  tiles: number[];
}

export interface DiscardOption {
  /** Tile index to discard. */
  discard: number;
  /** Shanten of the hand after this discard. */
  shanten: number;
  /** Number of useful wall tiles after this discard. */
  ukeire: number;
  /** Which tile indices are useful draws. */
  ukireTiles: number[];
}

/**
 * Calculates ukeire for a 13-tile hand.
 * `hand` and `wall` are mutated in place for speed then restored — pass copies
 * if you need the originals unchanged.
 */
export function calculateUkeire(hand: TileCounts, wall: TileCounts): UkeireResult {
  const base = calculateShanten(hand);
  const tiles: number[] = [];

  for (let i = 0; i < 34; i++) {
    if (wall[i] === 0) continue;
    hand[i]++;
    if (calculateShanten(hand) < base) tiles.push(i);
    hand[i]--;
  }

  const count = tiles.reduce((s, i) => s + wall[i], 0);
  return { count, tiles };
}

/**
 * Evaluates every possible discard from a 14-tile hand.
 * Returns options sorted by shanten asc, then ukeire desc.
 */
export function evaluateDiscards(hand: TileCounts, wall: TileCounts): DiscardOption[] {
  const h = hand.slice();
  const w = wall.slice();
  const options: DiscardOption[] = [];

  for (let i = 0; i < 34; i++) {
    if (h[i] === 0) continue;
    h[i]--; w[i]++;
    const shanten = calculateShanten(h);
    const { count, tiles } = calculateUkeire(h, w);
    w[i]--; h[i]++;
    options.push({ discard: i, shanten, ukeire: count, ukireTiles: tiles });
  }

  return options.sort((a, b) =>
    a.shanten !== b.shanten ? a.shanten - b.shanten : b.ukeire - a.ukeire,
  );
}

/** Build a wall from a 14-tile hand (all tiles not in hand). */
export function buildWall(hand14: TileCounts): TileCounts {
  return hand14.map((c) => Math.max(0, 4 - c));
}
