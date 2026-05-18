'use strict'

const { bestDiscard, discardReason } = require('./strategy')

function discard(state) {
  const hand = state.hands[state.turn]
  if (hand.length === 0) throw new Error(`${state.turn} has no tiles to discard`)
  const target = state.turn === state.winner ? state.winnerTargetTiles : null
  const context = {
    seat: state.turn,
    roundWind: state.roundWind,
    allDiscards: Object.values(state.discards).flat(),
    myExposed: state.exposed[state.turn] || [],
  }
  const tile = bestDiscard(hand, target, context) || hand[0]
  const reason = discardReason(tile, hand, context)

  // Remove first occurrence of tile from hand
  const idx = hand.indexOf(tile)
  if (idx === -1) throw new Error(`Cannot discard ${tile} — not in ${state.turn}'s hand`)
  hand.splice(idx, 1)

  state.discards[state.turn].push(tile)
  return { tile, reason }
}

module.exports = { discard }
