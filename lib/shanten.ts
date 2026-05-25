/**
 * Hong Kong Mahjong shanten calculator.
 *
 * Tile index encoding (0–33):
 *   0– 8  Characters (man) 1–9
 *   9–17  Dots (pin) 1–9
 *  18–26  Bamboo (sou) 1–9
 *  27–30  Winds: East, South, West, North
 *  31–33  Dragons: Red (chun), Green (hatsu), White (haku)
 *
 * Returns -1 for a complete hand, 0 for tenpai, N for N tiles away.
 *
 * Includes 七對 (Seven Pairs) path, which is valid in HK mahjong.
 * Algorithm based on Euophrys/Riichi-Trainer (MIT), adapted for HK rules.
 */

export type TileCounts = number[]; // length 34

/** Sum of tile counts from index `from` to 33 (inclusive). */
function sumFrom(t: TileCounts, from: number): number {
  let n = 0;
  for (let i = from; i < 34; i++) n += t[i];
  return n;
}

/** Seven Pairs (七對) shanten: 6 - number of unique pairs in hand. */
function sevenPairsShanten(tiles: TileCounts): number {
  let pairs = 0;
  for (let i = 0; i < 34; i++) {
    if (tiles[i] >= 2) pairs++;
  }
  return 6 - pairs;
}

export function calculateShanten(tiles: TileCounts): number {
  const t = tiles.slice();
  let best = 8;

  // Try each tile as the pair head (standard hand)
  for (let i = 0; i < 34; i++) {
    if (t[i] < 2) continue;
    t[i] -= 2;
    best = Math.min(best, removeCompletedSets(t, 0, 0, best, true));
    t[i] += 2;
  }

  // No pair (standard hand)
  best = Math.min(best, removeCompletedSets(t, 0, 0, best, false));

  // Seven Pairs path (七對) — valid in HK mahjong
  best = Math.min(best, sevenPairsShanten(tiles));

  return best;
}

function removeCompletedSets(
  t: TileCounts,
  idx: number,
  complete: number,
  best: number,
  hasPair: boolean,
): number {
  // Tight lower bound: compute how many more complete sets and partials are
  // achievable.
  //
  // Complete sets can only be extracted starting at idx or later (we process
  // left-to-right), so we use sumFrom(t, idx) for that count.
  //
  // Partial sets, however, can use ANY tile still in t — including tiles at
  // indices < idx that were skipped because no complete set started there.
  // Those tiles will be picked up by countPartialSets (which restarts at 0).
  // So we compute remAfter from the full remaining count sumFrom(t, 0).
  const remFromIdx = sumFrom(t, idx);
  const total      = sumFrom(t, 0);
  const canComplete = Math.min(4 - complete, Math.floor(remFromIdx / 3));
  const remAfter   = total - canComplete * 3;
  const canPartial = Math.min(4 - complete - canComplete, Math.floor(remAfter / 2));
  const floor = 8 - 2 * (complete + canComplete) - canPartial - (hasPair ? 1 : 0);
  if (best <= floor) return best;

  while (idx < 34 && t[idx] === 0) idx++;
  if (idx >= 34) return countPartialSets(t, 0, 0, complete, best, hasPair);

  // Triplet
  if (t[idx] >= 3) {
    t[idx] -= 3;
    best = Math.min(best, removeCompletedSets(t, idx, complete + 1, best, hasPair));
    t[idx] += 3;
  }

  // Sequence (suited tiles only: idx 0–26, cannot start at position 7 or 8 within suit)
  if (idx < 27 && idx % 9 <= 6 && t[idx + 1] > 0 && t[idx + 2] > 0) {
    t[idx]--; t[idx + 1]--; t[idx + 2]--;
    best = Math.min(best, removeCompletedSets(t, idx, complete + 1, best, hasPair));
    t[idx]++; t[idx + 1]++; t[idx + 2]++;
  }

  // Skip this index
  return Math.min(best, removeCompletedSets(t, idx + 1, complete, best, hasPair));
}

function countPartialSets(
  t: TileCounts,
  idx: number,
  partial: number,
  complete: number,
  best: number,
  hasPair: boolean,
): number {
  if (complete + partial >= 4) return 8 - complete * 2 - partial - (hasPair ? 1 : 0);

  // Tight lower bound: how many more partials can we still collect?
  const rem2 = sumFrom(t, idx);
  const canPartial2 = Math.min(4 - complete - partial, Math.floor(rem2 / 2));
  const floor = 8 - 2 * complete - (partial + canPartial2) - (hasPair ? 1 : 0);
  if (best <= floor) return best;

  while (idx < 34 && t[idx] === 0) idx++;
  if (idx >= 34) return 8 - complete * 2 - partial - (hasPair ? 1 : 0);

  // Pair partial
  if (t[idx] >= 2) {
    t[idx] -= 2;
    best = Math.min(best, countPartialSets(t, idx + 1, partial + 1, complete, best, hasPair));
    t[idx] += 2;
  }

  // Sequential partial (suited only, not at position 8 within suit)
  if (idx < 27 && idx % 9 <= 7 && t[idx + 1] > 0) {
    t[idx]--; t[idx + 1]--;
    best = Math.min(best, countPartialSets(t, idx + 1, partial + 1, complete, best, hasPair));
    t[idx]++; t[idx + 1]++;
  }

  // Kanchan partial (suited only, not at position 7 or 8 within suit)
  if (idx < 27 && idx % 9 <= 6 && t[idx + 2] > 0) {
    t[idx]--; t[idx + 2]--;
    best = Math.min(best, countPartialSets(t, idx + 1, partial + 1, complete, best, hasPair));
    t[idx]++; t[idx + 2]++;
  }

  // Skip
  return Math.min(best, countPartialSets(t, idx + 1, partial, complete, best, hasPair));
}
