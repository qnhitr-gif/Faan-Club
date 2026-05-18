'use strict'

const { calculateFan, isSevenPairs } = require('./fan-calculator')
const { findCompleteSets, findPairs } = require('./hand-analyser')

function isWinningHand(hand, exposed = []) {
  if (hand.length !== 14 && hand.length + exposed.flat().length !== 14) return false

  const totalTiles = hand.length + exposed.flat().length
  if (totalTiles !== 14) return false

  // Seven pairs special case
  if (isSevenPairs(hand) && exposed.length === 0) return true

  // Standard: 4 sets + 1 pair
  return canFormStandardHand(hand, exposed)
}

const SUIT_ORDER = { b: 0, d: 1, c: 2 }
function sortTiles(tiles) {
  return [...tiles].sort((a, b) => {
    const sA = SUIT_ORDER[a.slice(-1)] ?? 3
    const sB = SUIT_ORDER[b.slice(-1)] ?? 3
    if (sA !== sB) return sA - sB
    return (parseInt(a) || 0) - (parseInt(b) || 0)
  })
}

function canFormStandardHand(hand, exposed = []) {
  const setsNeeded = 4 - exposed.length
  return tryDecompose(sortTiles(hand), setsNeeded, 0)
}

function tryDecompose(tiles, setsNeeded, pairsFound) {
  if (tiles.length === 0) return pairsFound === 1 && setsNeeded === 0
  if (setsNeeded < 0 || pairsFound > 1) return false

  const tile = tiles[0]

  // Try as pair
  if (pairsFound === 0) {
    const idx = tiles.indexOf(tile, 1)
    if (idx !== -1) {
      const next = tiles.filter((_, i) => i !== 0 && i !== idx)
      if (tryDecompose(next, setsNeeded, 1)) return true
    }
  }

  // Try as pung
  const count = tiles.filter(t => t === tile).length
  if (count >= 3) {
    let removed = 0
    const next = tiles.filter(t => {
      if (t === tile && removed < 3) { removed++; return false }
      return true
    })
    if (tryDecompose(next, setsNeeded - 1, pairsFound)) return true
  }

  // Try as chow
  const suit = tile.slice(-1)
  if (['b','d','c'].includes(suit)) {
    const val = parseInt(tile)
    const t2 = `${val+1}${suit}`, t3 = `${val+2}${suit}`
    const i2 = tiles.indexOf(t2), i3 = tiles.indexOf(t3)
    if (i2 !== -1 && i3 !== -1) {
      const next = tiles.filter((_, i) => i !== 0 && i !== i2 && i !== i3)
      if (tryDecompose(next, setsNeeded - 1, pairsFound)) return true
    }
  }

  return false
}

function checkWin(state, winBy = 'self-draw') {
  const hand = state.hands[state.turn]
  const exposed = state.exposed[state.turn]

  if (!isWinningHand(hand, exposed)) return false

  const conditions = {
    seat: state.turn,
    roundWind: state.roundWind,
    winBy,
    exposed,
    bonus: state.bonus[state.turn],
  }

  const result = calculateFan(hand, conditions)
  return result.total >= state.minFan ? result : false
}

module.exports = { checkWin, isWinningHand, canFormStandardHand }
