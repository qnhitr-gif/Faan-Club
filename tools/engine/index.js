'use strict'

const { initializeGame, deepCopy } = require('./initializer')
const { draw } = require('./draw')
const { discard } = require('./discard')
const { checkClaims, processClaim, nextPlayer, TURN_ORDER } = require('./claims')
const { checkWin } = require('./win-check')
const { calculateFan } = require('./fan-calculator')
const { isWinningHand } = require('./win-check')

function computeCurrentFan(state) {
  const result = {}
  for (const seat of TURN_ORDER) {
    const hand = state.hands[seat]
    const exposed = state.exposed[seat]
    try {
      const conditions = {
        seat,
        roundWind: state.roundWind,
        winBy: 'self-draw',
        exposed,
        bonus: state.bonus[seat],
      }
      if (isWinningHand(hand, exposed)) {
        const r = calculateFan(hand, conditions)
        result[seat] = r.total >= state.minFan ? r.total : 0
      } else {
        result[seat] = null
      }
    } catch {
      result[seat] = null
    }
  }
  return result
}

function checkTenpai(hand, exposed = []) {
  // A hand is tenpai if discarding exactly one tile results in a winning hand
  for (let i = 0; i < hand.length; i++) {
    const testHand = hand.filter((_, idx) => idx !== i)
    // Try adding back each possible tile
    const { isWinningHand } = require('./win-check')
    if (testHand.length + 1 + exposed.flat().length === 14) {
      // Actually check tenpai: if there exists a tile that completes the hand
      return true // simplified — proper tenpai detection is complex
    }
  }
  return false
}

function buildSnapshot(state, extras) {
  return {
    ...extras,
    hands:    deepCopy(state.hands),
    exposed:  deepCopy(state.exposed),
    discards: deepCopy(state.discards),
    bonus:    deepCopy(state.bonus),
    fan:      computeCurrentFan(state),
    learningFlags: {
      isTenpai:      false, // simplified
      isWarning:     extras.warning || false,
      goodTableRead: Object.values(state.discards).every(d => d.length >= 4),
      fanCalcMoment: extras.action === 'win',
    }
  }
}

function buildDrawDiscardStep(state, drew, discarded, reason, warning = false) {
  return buildSnapshot(state, {
    who:           state.turn,
    action:        'draw-discard',
    drew,
    discarded,
    bonusDrawn:    null,
    claimed:       null,
    discardReason: reason,
    warning,
    headline:      `${state.turn} draws ${drew} · discards ${discarded}`,
    comment:       reason,
    breakdown:     null,
    total:         null,
  })
}

function buildClaimStep(state, claim, originalDiscard, claimDiscard) {
  return buildSnapshot(state, {
    who:           claim.player,
    action:        'claim',
    drew:          null,
    discarded:     claimDiscard.tile,
    bonusDrawn:    null,
    claimed:       { from: state.turn, tile: originalDiscard, meld: claim.meld },
    discardReason: claimDiscard.reason,
    warning:       false,
    headline:      `${claim.player} claims ${originalDiscard} · discards ${claimDiscard.tile}`,
    comment:       `${claim.player} claimed ${originalDiscard} from ${state.turn} for ${claim.type}.`,
    breakdown:     null,
    total:         null,
  })
}

function buildWinStep(state, drew, winResult) {
  return buildSnapshot(state, {
    who:           state.turn,
    action:        'win',
    drew,
    discarded:     null,
    bonusDrawn:    null,
    claimed:       null,
    discardReason: null,
    warning:       false,
    headline:      `${state.turn} wins! ${winResult.total} fan`,
    comment:       `${state.turn} wins by self-draw with ${winResult.total} fan.`,
    breakdown:     winResult.sources,
    total:         winResult.total,
  })
}

function buildSetupStep(startingHands, config) {
  return {
    who:      null,
    action:   'setup',
    drew:     null,
    discarded: null,
    bonusDrawn: null,
    claimed:  null,
    discardReason: null,
    warning:  false,
    headline: `Starting position · ${config.roundWind} round · ${config.minFan || 3}-fan minimum`,
    comment:  'Game begins. Study each player\'s starting hand to understand their strategy.',
    hands:    deepCopy(startingHands),
    exposed:  { East: [], South: [], West: [], North: [] },
    discards: { East: [], South: [], West: [], North: [] },
    bonus:    { East: [], South: [], West: [], North: [] },
    fan:      { East: null, South: null, West: null, North: null },
    learningFlags: { isTenpai: false, isWarning: false, goodTableRead: false, fanCalcMoment: false },
    breakdown: null,
    total:    null,
  }
}

function simulateGame(startingHands, config) {
  const state = initializeGame(startingHands, config)

  // Add setup step
  state.steps.push(buildSetupStep(startingHands, config))

  // East dealer discards first (no draw needed — starts with 14)
  {
    const { tile, reason } = discard(state)
    const step = buildSnapshot(state, {
      who: 'East',
      action: 'draw-discard',
      drew: null,
      discarded: tile,
      bonusDrawn: null,
      claimed: null,
      discardReason: reason,
      warning: false,
      headline: `East discards ${tile} (dealer opening)`,
      comment: reason,
      breakdown: null,
      total: null,
    })
    state.steps.push(step)

    const claim = checkClaims(state, tile, 'East')
    if (claim) {
      processClaim(state, claim, tile)
      const claimDiscard = discard(state)
      state.steps.push(buildClaimStep(state, claim, tile, claimDiscard))
      state.turn = nextPlayer(claim.player)
    } else {
      state.turn = nextPlayer('East')
    }
  }

  const MAX_TURNS = 80

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    if (state.manifest.remaining().length === 0) {
      throw new Error('Wall exhausted — no winner (draw game)')
    }
    const drew = draw(state)                      // Step 2

    const winResult = checkWin(state, 'self-draw')
    if (winResult) {
      state.steps.push(buildWinStep(state, drew, winResult))
      return state.steps
    }

    const { tile: discarded, reason } = discard(state)  // Step 3

    const claim = checkClaims(state, discarded, state.turn) // Step 4

    if (claim) {
      const fromPlayer = state.turn
      // Always record the discard step first so the log shows who discarded what
      state.steps.push(buildDrawDiscardStep(state, drew, discarded, reason))

      processClaim(state, claim, discarded)

      // Check if claimer wins
      const claimWin = checkWin(state, 'discard')
      if (claimWin) {
        const winStep = buildSnapshot(state, {
          who: claim.player,
          action: 'win',
          drew: null,
          discarded: null,
          bonusDrawn: null,
          claimed: { from: fromPlayer, tile: discarded, meld: claim.meld },
          discardReason: null,
          warning: false,
          headline: `${claim.player} wins by claiming ${discarded}! ${claimWin.total} fan`,
          comment: `${claim.player} wins by claiming ${discarded} from ${fromPlayer}.`,
          breakdown: claimWin.sources,
          total: claimWin.total,
        })
        state.steps.push(winStep)
        return state.steps
      }

      const claimDiscard = discard(state)
      state.steps.push(buildClaimStep(state, claim, discarded, claimDiscard))
      state.turn = nextPlayer(claim.player)
    } else {
      state.steps.push(buildDrawDiscardStep(state, drew, discarded, reason))
      state.turn = nextPlayer(state.turn)
    }
  }

  throw new Error('Game did not complete within MAX_TURNS')
}

module.exports = { simulateGame, buildSetupStep, computeCurrentFan }
