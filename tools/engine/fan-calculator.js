'use strict'

const { getSuit, isHonor } = require('./hand-analyser')

// Determine if a hand is all one suit + honors (half flush)
function isHalfFlush(hand, exposed = []) {
  const allTiles = [...hand, ...exposed.flat()]
  const suits = new Set(allTiles.map(t => isHonor(t) ? 'honor' : getSuit(t)))
  const suitTiles = [...suits].filter(s => s !== 'honor')
  return suitTiles.length === 1 && suits.has('honor')
}

// Determine if a hand is all one suit, no honors (full flush)
function isFullFlush(hand, exposed = []) {
  const allTiles = [...hand, ...exposed.flat()]
  const suits = new Set(allTiles.map(t => getSuit(t)))
  return suits.size === 1 && !suits.has('honor')
}

// Check if all 4 sets are pungs
function isAllPungs(hand, exposed = []) {
  const exposedPungs = exposed.filter(m => m.length === 3 && m[0] === m[1] && m[1] === m[2])
  const exposedChows = exposed.filter(m => m.length === 3 && !(m[0] === m[1] && m[1] === m[2]))
  if (exposedChows.length > 0) return false

  // Check hand for pungs - need 4 sets + 1 pair
  const counts = {}
  for (const t of hand) counts[t] = (counts[t] || 0) + 1

  const pungs = Object.entries(counts).filter(([, n]) => n >= 3).length
  const pairs = Object.entries(counts).filter(([, n]) => n === 2).length

  return (pungs + exposedPungs.length === 4) && pairs >= 1
}

// Check for 7 pairs
function isSevenPairs(hand) {
  if (hand.length !== 14) return false
  const counts = {}
  for (const t of hand) counts[t] = (counts[t] || 0) + 1
  return Object.values(counts).every(n => n === 2) && Object.keys(counts).length === 7
}

// Check for Ping Hu (4 chows + non-value pair + win by discard)
function isPingHu(hand, conditions, exposed = []) {
  if (conditions.winBy !== 'discard') return false
  if (exposed.length > 0) return false // open hand can't ping hu

  // All sets must be chows
  const counts = {}
  for (const t of hand) counts[t] = (counts[t] || 0) + 1

  // Simple check: 4 chows = no triple of same tile, exactly one pair
  const hasTriple = Object.values(counts).some(n => n >= 3)
  if (hasTriple) return false

  // Check pair is not a value tile (wind or dragon)
  const pairTile = Object.entries(counts).find(([, n]) => n === 2)?.[0]
  if (!pairTile) return false
  if (isHonor(pairTile)) return false

  // Check pair is not seat wind or round wind
  const seatWind = { East: 'EW', South: 'SW', West: 'WW', North: 'NW' }[conditions.seat]
  const roundWind = { East: 'EW', South: 'SW' }[conditions.roundWind]
  if (pairTile === seatWind || pairTile === roundWind) return false

  return true
}

function getPungedSets(hand, exposed = []) {
  const allPungs = []

  // Exposed pungs
  for (const meld of exposed) {
    if (meld.length === 3 && meld[0] === meld[1] && meld[1] === meld[2]) {
      allPungs.push(meld[0])
    }
  }

  // Hand pungs
  const counts = {}
  for (const t of hand) counts[t] = (counts[t] || 0) + 1
  for (const [tile, n] of Object.entries(counts)) {
    if (n >= 3) allPungs.push(tile)
  }

  return allPungs
}

function handFan(hand, conditions) {
  const { seat, roundWind, winBy, exposed = [] } = conditions
  const sources = []
  const allTiles = [...hand, ...exposed.flat()]

  // Seven pairs — check first, exclusive pattern
  if (isSevenPairs(hand)) {
    sources.push({ item: 'Seven Pairs (七對)', fan: 4 })
    if (winBy === 'self-draw') sources.push({ item: 'Self-draw (自摸)', fan: 1 })
    return sources
  }

  // Full flush (exclusive with half flush)
  if (isFullFlush(hand, exposed)) {
    sources.push({ item: 'Full Flush (清一色)', fan: 7 })
  } else if (isHalfFlush(hand, exposed)) {
    sources.push({ item: 'Half Flush (混一色)', fan: 3 })
  }

  // All pungs
  if (isAllPungs(hand, exposed)) {
    sources.push({ item: 'All Pungs (碰碰和)', fan: 3 })
  }

  // Ping Hu
  if (isPingHu(hand, conditions, exposed)) {
    sources.push({ item: 'Ping Hu (平湖)', fan: 1 })
  }

  // Dragon pungs
  const pungs = getPungedSets(hand, exposed)
  for (const tile of ['RD','GD','WD']) {
    if (pungs.includes(tile)) {
      const names = { RD: 'Red Dragon (中)', GD: 'Green Dragon (發)', WD: 'White Dragon (白板)' }
      sources.push({ item: `${names[tile]} pung`, fan: 1 })
    }
  }

  // Wind pungs
  const seatWindMap = { East: 'EW', South: 'SW', West: 'WW', North: 'NW' }
  const roundWindMap = { East: 'EW', South: 'SW' }
  const seatWindTile = seatWindMap[seat]
  const roundWindTile = roundWindMap[roundWind]

  for (const tile of ['EW','SW','WW','NW']) {
    if (pungs.includes(tile)) {
      let windFan = 0
      let windLabel = tile
      if (tile === seatWindTile) windFan += 1
      if (tile === roundWindTile) windFan += 1
      if (windFan > 0) {
        const windNames = { EW: 'East Wind', SW: 'South Wind', WW: 'West Wind', NW: 'North Wind' }
        const reasons = []
        if (tile === seatWindTile) reasons.push('seat wind')
        if (tile === roundWindTile) reasons.push('round wind')
        sources.push({ item: `${windNames[tile]} pung (${reasons.join(' + ')})`, fan: windFan })
      }
    }
  }

  // Self-draw
  if (winBy === 'self-draw') {
    sources.push({ item: 'Self-draw (自摸)', fan: 1 })
  }

  return sources
}

function bonusFan(bonusTiles = [], seat) {
  const seatIndex = { East: 1, South: 2, West: 3, North: 4 }[seat]
  const sources = []

  if (bonusTiles.includes(`F${seatIndex}`)) {
    sources.push({ item: `Flower F${seatIndex} (seat match)`, fan: 1 })
  }
  if (bonusTiles.includes(`S${seatIndex}`)) {
    sources.push({ item: `Season S${seatIndex} (seat match)`, fan: 1 })
  }
  if (['F1','F2','F3','F4'].every(f => bonusTiles.includes(f))) {
    sources.push({ item: 'All 4 flowers', fan: 1 })
  }
  if (['S1','S2','S3','S4'].every(s => bonusTiles.includes(s))) {
    sources.push({ item: 'All 4 seasons', fan: 1 })
  }

  return sources
}

function calculateFan(hand, conditions) {
  const sources = [
    ...handFan(hand, conditions),
    ...bonusFan(conditions.bonus || [], conditions.seat),
  ]
  const total = sources.reduce((sum, s) => sum + s.fan, 0)
  return { total, sources }
}

module.exports = { calculateFan, handFan, bonusFan, isHalfFlush, isFullFlush, isAllPungs, isSevenPairs, isPingHu, getPungedSets }
