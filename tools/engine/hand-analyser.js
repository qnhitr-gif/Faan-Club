'use strict'

function getSuit(tile) {
  if (/^\d+b$/.test(tile)) return 'b'
  if (/^\d+d$/.test(tile)) return 'd'
  if (/^\d+c$/.test(tile)) return 'c'
  return 'honor'
}

function getValue(tile) {
  const m = tile.match(/^(\d+)/)
  return m ? parseInt(m[1]) : null
}

function isHonor(tile) {
  return ['EW','SW','WW','NW','RD','GD','WD'].includes(tile)
}

function isTerminal(tile) {
  if (isHonor(tile)) return false
  const v = getValue(tile)
  return v === 1 || v === 9
}

function findCompleteSets(tiles) {
  const sets = []
  const remaining = [...tiles]

  // Find pungs first
  const counts = {}
  for (const t of remaining) counts[t] = (counts[t] || 0) + 1

  for (const [tile, count] of Object.entries(counts)) {
    if (count >= 3) {
      sets.push([tile, tile, tile])
      let removed = 0
      remaining.splice(0, remaining.length, ...remaining.filter(t => {
        if (t === tile && removed < 3) { removed++; return false }
        return true
      }))
    }
  }

  // Find chows in remaining
  const suitsToCheck = ['b','d','c']
  for (const suit of suitsToCheck) {
    const suitTiles = remaining
      .filter(t => getSuit(t) === suit)
      .map(t => getValue(t))
      .sort((a, b) => a - b)

    let i = 0
    while (i < suitTiles.length - 2) {
      const v = suitTiles[i]
      const nextIdx = suitTiles.indexOf(v + 1, i + 1)
      const next2Idx = nextIdx !== -1 ? suitTiles.indexOf(v + 2, nextIdx + 1) : -1
      if (nextIdx !== -1 && next2Idx !== -1) {
        const t1 = `${v}${suit}`, t2 = `${v+1}${suit}`, t3 = `${v+2}${suit}`
        sets.push([t1, t2, t3])
        // remove from remaining
        ;[t1, t2, t3].forEach(tile => {
          const idx = remaining.indexOf(tile)
          if (idx !== -1) remaining.splice(idx, 1)
        })
        suitTiles.splice(i, 1)
        suitTiles.splice(suitTiles.indexOf(v+1), 1)
        suitTiles.splice(suitTiles.indexOf(v+2), 1)
        // don't increment i
      } else {
        i++
      }
    }
  }

  return sets
}

function findPairs(tiles) {
  const counts = {}
  for (const t of tiles) counts[t] = (counts[t] || 0) + 1
  return Object.entries(counts)
    .filter(([, n]) => n >= 2)
    .map(([t]) => [t, t])
}

function findPartials(tiles) {
  const partials = []
  const suitsToCheck = ['b','d','c']

  for (const suit of suitsToCheck) {
    const vals = tiles
      .filter(t => getSuit(t) === suit)
      .map(t => getValue(t))
      .sort((a, b) => a - b)

    for (let i = 0; i < vals.length - 1; i++) {
      const diff = vals[i+1] - vals[i]
      if (diff === 1 || diff === 2) {
        partials.push([`${vals[i]}${suit}`, `${vals[i+1]}${suit}`])
      }
    }
  }

  return partials
}

function analyzeHand(tiles) {
  const sets = findCompleteSets([...tiles])
  const inSets = sets.flat()

  const remaining = tiles.filter(t => {
    const idx = inSets.indexOf(t)
    if (idx !== -1) { inSets.splice(idx, 1); return false }
    return true
  })

  const pairs = findPairs(remaining)
  const inPairs = pairs.flat()

  const afterPairs = remaining.filter(t => {
    const idx = inPairs.indexOf(t)
    if (idx !== -1) { inPairs.splice(idx, 1); return false }
    return true
  })

  const partials = findPartials(afterPairs)
  const inPartials = partials.flat()

  const isolated = afterPairs.filter(t => !inPartials.includes(t))

  return { sets, pairs, partials, isolated }
}

module.exports = { analyzeHand, findCompleteSets, findPairs, findPartials, isHonor, isTerminal, getSuit, getValue }
