'use strict'

const BONUS_TILES = new Set(['F1','F2','F3','F4','S1','S2','S3','S4'])

function validateTileCount(steps) {
  const errors = []
  const counts = {}

  const setup = steps.find(s => s.action === 'setup')
  if (!setup) {
    errors.push('No setup step found')
    return errors
  }

  // Count all starting hand tiles
  for (const hand of Object.values(setup.hands)) {
    for (const tile of hand) {
      if (!BONUS_TILES.has(tile)) {
        counts[tile] = (counts[tile] || 0) + 1
      }
    }
  }

  // Count all drawn tiles
  for (const step of steps) {
    if (step.drew && !BONUS_TILES.has(step.drew)) {
      counts[step.drew] = (counts[step.drew] || 0) + 1
    }
    if (step.bonusDrawn) {
      // bonus tiles are 1-copy — no count needed
    }
  }

  for (const [tile, count] of Object.entries(counts)) {
    if (count > 4) {
      errors.push(`${tile} appears ${count} times (max 4)`)
    }
  }

  return errors
}

module.exports = { validateTileCount }
