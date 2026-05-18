'use strict'

const { TileManifest } = require('./tile-manifest')

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function initializeGame(startingHands, config) {
  const allStartingTiles = Object.values(startingHands).flat()
  const manifest = new TileManifest(allStartingTiles)

  // Wall is already shuffled randomly by TileManifest — no stacking needed.

  return {
    hands:    deepCopy(startingHands),
    discards: { East: [], South: [], West: [], North: [] },
    exposed:  { East: [], South: [], West: [], North: [] },
    bonus:    { East: [], South: [], West: [], North: [] },
    manifest,
    turn: 'East',
    roundWind: config.roundWind || 'East',
    minFan: config.minFan || 3,
    winner: config.winner,
    winnerTargetTiles: config.winnerTargetTiles || [],
    steps: [],
  }
}

module.exports = { initializeGame, deepCopy }
