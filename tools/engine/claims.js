'use strict'

const { bestDiscard, discardReason } = require('./strategy')

const TURN_ORDER = ['East','South','West','North']

function nextPlayer(current) {
  const idx = TURN_ORDER.indexOf(current)
  return TURN_ORDER[(idx + 1) % 4]
}

function canPung(hand, tile) {
  return hand.filter(t => t === tile).length >= 2
}

function canChow(hand, tile) {
  if (/^[ESNW][WD]$/.test(tile) || ['RD','GD','WD'].includes(tile)) return false
  const suit = tile.slice(-1)
  if (!['b','d','c'].includes(suit)) return false
  const val = parseInt(tile)

  const vals = hand.filter(t => t.endsWith(suit)).map(t => parseInt(t))
  // Check all chow combinations containing val
  const chows = [
    [val-2, val-1, val],
    [val-1, val, val+1],
    [val, val+1, val+2],
  ]
  return chows.some(([a, b, c]) => a >= 1 && c <= 9 && vals.includes(a) && vals.includes(b))
}

function bestChow(hand, tile) {
  const suit = tile.slice(-1)
  const val = parseInt(tile)
  const vals = hand.filter(t => t.endsWith(suit)).map(t => parseInt(t))

  const chows = [
    [val-2, val-1, val],
    [val-1, val, val+1],
    [val, val+1, val+2],
  ]

  for (const [a, b, c] of chows) {
    if (a >= 1 && c <= 9 && vals.includes(a) && vals.includes(b)) {
      return [`${a}${suit}`, `${b}${suit}`, `${c}${suit}`]
    }
  }
  return null
}

function shouldClaim(player, hand, tile, type, state) {
  if (type === 'pung') return canPung(hand, tile)
  // chow: gated to next player only in checkClaims below
  return canChow(hand, tile)
}

function checkClaims(state, discarded, from) {
  const others = TURN_ORDER.filter(p => p !== from)

  // Pung priority: any player (max 4 exposed melds total)
  for (const player of others) {
    const hand = state.hands[player]
    const exposed = state.exposed[player]
    if (exposed.length >= 4) continue  // already has max melds
    if (canPung(hand, discarded) && shouldClaim(player, hand, discarded, 'pung', state)) {
      return { player, type: 'pung', meld: [discarded, discarded, discarded] }
    }
  }

  // Chow: only next player (max 4 exposed melds total)
  const next = nextPlayer(from)
  const nextHand = state.hands[next]
  const nextExposed = state.exposed[next]
  if (nextExposed.length < 4 && canChow(nextHand, discarded) && shouldClaim(next, nextHand, discarded, 'chow', state)) {
    const chowTiles = bestChow(nextHand, discarded)
    if (chowTiles) {
      return { player: next, type: 'chow', meld: chowTiles }
    }
  }

  return null
}

function processClaim(state, claim, discarded) {
  const { player, meld } = claim

  // Remove the tiles forming the meld from the claimer's hand.
  // One copy of the discarded tile came from the discard pile — skip it once,
  // but remove all other copies of meld tiles from the hand.
  let skippedDiscarded = false
  for (const tile of meld) {
    if (tile === discarded && !skippedDiscarded) {
      skippedDiscarded = true  // this one copy came from the discard pile
      continue
    }
    const idx = state.hands[player].indexOf(tile)
    if (idx !== -1) state.hands[player].splice(idx, 1)
  }

  state.exposed[player].push(meld)
  state.turn = player
}

module.exports = { checkClaims, processClaim, nextPlayer, TURN_ORDER }
