'use strict'

const { isBonus } = require('./tile-manifest')

function draw(state) {
  const tile = state.manifest.drawNext()

  if (isBonus(tile)) {
    state.bonus[state.turn].push(tile)
    return draw(state)  // recursive replacement
  }

  state.hands[state.turn].push(tile)
  return tile
}

module.exports = { draw }
