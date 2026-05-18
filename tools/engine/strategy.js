'use strict'

const { analyzeHand, isHonor, isTerminal } = require('./hand-analyser')

// ─── Constants ────────────────────────────────────────────────────────────────
const SUIT_NAMES = ['b', 'd', 'c']
const SEAT_WIND  = { East: 'EW', South: 'SW', West: 'WW', North: 'NW' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Is this honor tile worth keeping (seat wind or round wind)?
function isValuableHonor(tile, context) {
  if (!context) return false
  const { seat, roundWind } = context
  return tile === SEAT_WIND[roundWind] || tile === SEAT_WIND[seat]
}

// How many copies of this tile have already been discarded/exposed?
function countSeen(tile, seenMap) {
  return seenMap[tile] || 0
}

// Is this tile essentially dead — can no longer form a pung?
//   Honor: 3+ copies seen → only 1 left in game, can't pung
//   Numbered & isolated: 3+ copies seen → very unlikely to connect
function isDead(tile, seenMap, isolated) {
  const seen = countSeen(tile, seenMap)
  if (isHonor(tile)) return seen >= 3
  return seen >= 3 && isolated.includes(tile)
}

// Is this honor tile "depleted" (2+ copies seen) — lower pung potential?
function isDepleted(tile, seenMap) {
  return isHonor(tile) && countSeen(tile, seenMap) >= 2
}

// Get the single numbered suit locked in by exposed melds (null if none/mixed)
function getExposedSuit(exposed) {
  if (!exposed || exposed.length === 0) return null
  const suits = new Set()
  for (const meld of exposed) {
    for (const t of meld) {
      const s = t.slice(-1)
      if (SUIT_NAMES.includes(s)) suits.add(s)
    }
  }
  return suits.size === 1 ? [...suits][0] : null
}

// Get the dominant numbered suit in hand+exposed (>= 50% of all tiles)
function getDominantSuit(hand, exposed) {
  const counts = { b: 0, d: 0, c: 0 }
  const all = [...hand, ...(exposed || []).flat()]
  for (const t of all) {
    const s = t.slice(-1)
    if (SUIT_NAMES.includes(s)) counts[s]++
  }
  const total = all.length
  const [bestSuit, bestCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  // Dominant if this suit has >= 5 tiles OR >= 40% of all tiles
  return (bestCount >= 5 || bestCount / total >= 0.4) ? bestSuit : null
}

// Count how many distinct tiles appear 2+ times in hand (pair/pung candidates)
function countPairGroups(hand) {
  const counts = {}
  for (const t of hand) counts[t] = (counts[t] || 0) + 1
  return Object.values(counts).filter(n => n >= 2).length
}

// Return the first element of `arr` that appears in `candidates` set
function pick(arr, candidates) {
  return arr.find(t => candidates.has(t))
}

// ─── Core logic ───────────────────────────────────────────────────────────────

function findWeakestPartial(partials) {
  if (partials.length === 0) return null
  return partials[0][0]
}

function bestDiscard(hand, targetTiles, context) {
  const { seat, roundWind, allDiscards = [], myExposed = [] } = context || {}

  const analysis  = analyzeHand(hand)
  const isolated  = analysis.isolated || []
  const partials  = analysis.partials || []
  const sets      = analysis.sets    || []

  // Build seen-count map from all visible discards
  const seenMap = {}
  for (const t of allDiscards) seenMap[t] = (seenMap[t] || 0) + 1

  // Detect hand pattern
  const exposedSuit    = getExposedSuit(myExposed)
  const dominantSuit   = getDominantSuit(hand, myExposed)
  const targetSuit     = exposedSuit || dominantSuit   // suit we're building toward
  const isHalfFlush    = targetSuit !== null
  const isAllPungs     = countPairGroups(hand) >= 3    // 3+ pair groups → lean all-pungs

  // Build candidate list: tiles NOT consumed by complete sets
  const handCopy = [...hand]
  const protectedIdxs = []
  for (const t of sets.flat()) {
    const idx = handCopy.indexOf(t)
    if (idx !== -1) { protectedIdxs.push(idx); handCopy[idx] = null }
  }
  const candidateList = hand.filter((_, i) => !protectedIdxs.includes(i))
  const candidateSet  = new Set(candidateList)

  // ── Categorize candidates ─────────────────────────────────────────────────

  const deadTiles     = candidateList.filter(t => isDead(t, seenMap, isolated))

  // Off-suit: wrong-suit numbered tiles (for half-flush discard priority)
  // In all-pungs mode, exclude tiles that appear 2+ times in the full hand (they're pairs to keep)
  const isPairInHand = t => hand.filter(x => x === t).length >= 2
  const offSuitIsolated = isHalfFlush
    ? candidateList.filter(t => {
        const s = t.slice(-1)
        return SUIT_NAMES.includes(s) && s !== targetSuit && isolated.includes(t)
          && (!isAllPungs || !isPairInHand(t))
      })
    : []
  const offSuitAll = isHalfFlush
    ? candidateList.filter(t => {
        const s = t.slice(-1)
        return SUIT_NAMES.includes(s) && s !== targetSuit
          && (!isAllPungs || !isPairInHand(t))  // don't shed off-suit pairs in all-pungs mode
      })
    : []

  // Honors
  const isolatedHonors  = candidateList.filter(t => isHonor(t) && isolated.includes(t))
  const worthlessHonors = isolatedHonors.filter(t => !isValuableHonor(t, { seat, roundWind }))
  const depletedWorthless = worthlessHonors.filter(t => isDepleted(t, seenMap))  // 2+ seen
  const valuableHonors  = isolatedHonors.filter(t => isValuableHonor(t, { seat, roundWind }))

  // Other isolated tiles
  const isolatedTerminals = candidateList.filter(t => isTerminal(t) && isolated.includes(t))
  const isolatedMiddle    = candidateList.filter(t => !isHonor(t) && !isTerminal(t) && isolated.includes(t))

  // Singletons (only 1 copy in hand) — needed for all-pungs priority
  const singletons = isAllPungs
    ? candidateList.filter(t => hand.filter(x => x === t).length === 1)
    : []
  const singletonWorthlessHonors = singletons.filter(t => isHonor(t) && !isValuableHonor(t, { seat, roundWind }))
  const singletonTerminals       = singletons.filter(t => isTerminal(t))
  const singletonMiddle          = singletons.filter(t => !isHonor(t) && !isTerminal(t))

  const weakest = findWeakestPartial(partials)

  // ── Apply target-tile restriction if winner ───────────────────────────────
  function selectFrom(pool) {
    const ps = new Set(pool)
    const p  = arr => pick(arr, ps)

    // Dead tiles always first regardless of hand type
    if (p(deadTiles)) return p(deadTiles)

    if (isHalfFlush && isAllPungs) {
      // Committed suit + multiple pairs: shed off-suit singletons first
      return p(offSuitIsolated)
          || p(singletonWorthlessHonors)
          || p(offSuitAll)
          || p(singletonTerminals)
          || p(singletonMiddle)
          || p(worthlessHonors)
          || p(isolatedTerminals)
          || p(isolatedMiddle)
          || p(valuableHonors)
          || (weakest && ps.has(weakest) ? weakest : null)
          || pool[0]
    }

    if (isHalfFlush) {
      // Off-suit numbered tiles shed BEFORE worthless honors (honors fit half-flush)
      return p(offSuitIsolated)
          || p(offSuitAll)
          || p(depletedWorthless)  // depleted worthless honors next
          || p(worthlessHonors)
          || p(isolatedTerminals)
          || p(isolatedMiddle)
          || p(valuableHonors)
          || (weakest && ps.has(weakest) ? weakest : null)
          || pool[0]
    }

    if (isAllPungs) {
      // Shed singletons, keep pairs/pungs intact
      return p(singletonWorthlessHonors)
          || p(singletonTerminals)
          || p(singletonMiddle)
          || p(singletons)
          || p(depletedWorthless)
          || p(worthlessHonors)
          || p(isolatedTerminals)
          || p(isolatedMiddle)
          || p(valuableHonors)
          || (weakest && ps.has(weakest) ? weakest : null)
          || pool[0]
    }

    // Default
    return p(depletedWorthless)
        || p(worthlessHonors)
        || p(isolatedTerminals)
        || p(isolatedMiddle)
        || p(valuableHonors)
        || (weakest && ps.has(weakest) ? weakest : null)
        || pool[0]
  }

  if (targetTiles && targetTiles.length > 0) {
    const nonTarget = candidateList.filter(t => !targetTiles.includes(t))
    if (nonTarget.length > 0) return selectFrom(nonTarget)
  }

  return selectFrom(candidateList) || hand[0]
}

// ─── Reason string ────────────────────────────────────────────────────────────
function discardReason(tile, hand, context) {
  const { isolated, partials } = analyzeHand(hand)
  const { allDiscards = [], myExposed = [], seat, roundWind } = context || {}

  const seenMap = {}
  for (const t of allDiscards) seenMap[t] = (seenMap[t] || 0) + 1

  const seen = seenMap[tile] || 0

  if (isHonor(tile) && seen >= 3) {
    return `${tile} is dead — all 3 other copies already discarded, pung is impossible.`
  }
  if (isHonor(tile) && seen >= 2 && isolated.includes(tile)) {
    return `${tile} has ${seen} copies already discarded — low pung potential, safer to release.`
  }

  const exposedSuit  = getExposedSuit(myExposed)
  const dominantSuit = getDominantSuit(hand, myExposed)
  const targetSuit   = exposedSuit || dominantSuit

  if (targetSuit && SUIT_NAMES.includes(tile.slice(-1)) && tile.slice(-1) !== targetSuit) {
    return `${tile} is off-suit — hand is building toward ${targetSuit === 'b' ? 'bamboo' : targetSuit === 'd' ? 'dots' : 'characters'} Half Flush.`
  }

  if (isHonor(tile) && isolated.includes(tile)) {
    if (!isValuableHonor(tile, { seat, roundWind })) {
      return `${tile} is an isolated, low-value honor tile — no pung potential and no fan value here.`
    }
    return `${tile} is an isolated honor tile — only one copy, no pung possible.`
  }
  if (isTerminal(tile) && isolated.includes(tile)) {
    return `${tile} is an isolated terminal with no adjacent tiles for a chow.`
  }
  if (isolated.includes(tile)) {
    return `${tile} is isolated with no connection to any set or partial set in hand.`
  }
  if (partials.some(p => p.includes(tile))) {
    return `${tile} is part of the weakest partial set — discarding to improve hand efficiency.`
  }
  return `${tile} has the least strategic value given the current hand structure.`
}

module.exports = { bestDiscard, discardReason }
