'use strict'

// Standalone Stage 2 diagnostic script.
// Hardcodes a realistic Half Flush bamboo + WD pung winning hand,
// builds starting hands via buildAllStartingHands, then calls simulateGame
// 5 times and reports step counts, winner tile acquisition, and errors.

const { simulateGame } = require('./engine/index')
const { STANDARD_TILES, BONUS_TILES } = require('./engine/tile-manifest')

// Inline copy of buildAllStartingHands from game-generator.js
// (it is not exported — this replicates it for testing)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildAllStartingHands(winner, winnerHand) {
  const N = 4 + Math.floor(Math.random() * 3) // 4, 5, or 6

  const pool = shuffle([
    ...STANDARD_TILES.flatMap(t => [t,t,t,t]),
    ...BONUS_TILES,
  ])
  for (const tile of winnerHand) {
    const idx = pool.indexOf(tile)
    if (idx !== -1) pool.splice(idx, 1)
  }
  const standardPool = pool.filter(t => !BONUS_TILES.includes(t))

  const availCounts = {}
  for (const t of standardPool) availCounts[t] = (availCounts[t] || 0) + 1

  const shuffledWinner = shuffle([...winnerHand])
  const toAcquire = []
  const keepInStart = []
  for (const tile of shuffledWinner) {
    if (toAcquire.length < N && (availCounts[tile] || 0) > 0 && !toAcquire.includes(tile)) {
      toAcquire.push(tile)
      availCounts[tile]--
      const idx = standardPool.indexOf(tile)
      if (idx !== -1) standardPool.splice(idx, 1)
    } else {
      keepInStart.push(tile)
    }
  }

  const actualN = toAcquire.length
  if (actualN < 4) {
    throw new Error(`Could only guarantee ${actualN} wall-drawable tiles`)
  }

  const replacementCount = winner === 'East' ? actualN : actualN - 1
  const replacements = standardPool.splice(0, replacementCount)

  const winnerStart = [...keepInStart, ...replacements]
  const expectedStart = winner === 'East' ? 14 : 13
  if (winnerStart.length !== expectedStart) {
    throw new Error(`buildAllStartingHands: expected ${expectedStart} tiles for ${winner}, got ${winnerStart.length}`)
  }

  const otherSeats = ['East','South','West','North'].filter(s => s !== winner)
  const hands = { [winner]: winnerStart }
  for (const seat of otherSeats) {
    hands[seat] = standardPool.splice(0, seat === 'East' ? 14 : 13)
  }
  return { startingHands: hands, toAcquire, N: actualN }
}

// Half Flush bamboo + WD pung: 4 melds + 1 pair
// Melds: 1b2b3b (chow), 4b5b6b (chow), 7b8b9b (chow), WD WD WD (pung)
// Pair:  3b 3b
// Total: 14 tiles. Fan: Half Flush (3) + WD pung (1) + Self-draw (1) = 5 fan
const WINNER_HAND = [
  '1b','2b','3b',
  '4b','5b','6b',
  '7b','8b','9b',
  'WD','WD','WD',
  '3b','3b',
]

const WINNER = 'South'
const ROUND_WIND = 'East'
const MIN_FAN = 3
const RUNS = 5

console.log('=== Stage 2 Diagnostic ===')
console.log(`Winner: ${WINNER}, Round: ${ROUND_WIND}, MinFan: ${MIN_FAN}`)
console.log(`Winner hand (${WINNER_HAND.length} tiles): [${WINNER_HAND.join(', ')}]`)
console.log(`Expected fan: Half Flush(3) + WD pung(1) + Self-draw(1) = 5 fan`)
console.log('')

for (let run = 1; run <= RUNS; run++) {
  console.log(`--- Run ${run} ---`)
  try {
    // Build starting hands using the real buildAllStartingHands logic
    let startingHands, toAcquire, N
    try {
      const result = buildAllStartingHands(WINNER, WINNER_HAND)
      startingHands = result.startingHands
      toAcquire = result.toAcquire
      N = result.N
    } catch (err) {
      console.error(`  buildAllStartingHands FAILED: ${err.message}`)
      continue
    }

    console.log(`  Winner needs ${N} tiles from wall: [${toAcquire.join(', ')}]`)
    console.log(`  Starting hand sizes: East=${startingHands.East.length}, South=${startingHands.South.length}, West=${startingHands.West.length}, North=${startingHands.North.length}`)
    console.log(`  Winner (${WINNER}) starting hand: [${startingHands[WINNER].join(', ')}]`)

    // --- Inline mini-simulation to trace what's happening ---
    // Re-import engine internals for tracing
    const { initializeGame, deepCopy } = require('./engine/initializer')
    const { draw } = require('./engine/draw')
    const { discard } = require('./engine/discard')
    const { checkClaims, processClaim, nextPlayer } = require('./engine/claims')
    const { checkWin, isWinningHand } = require('./engine/win-check')

    const traceState = initializeGame(startingHands, {
      roundWind: ROUND_WIND,
      winner: WINNER,
      winnerTargetTiles: WINNER_HAND,
      minFan: MIN_FAN,
    })

    // Quick trace: what does the winner's hand look like after each draw?
    // and does checkWin ever return true?
    // Run the loop manually up to 40 turns and log key events
    let wonAt = null
    let hitMaxTurns = false
    const traceLog = []

    // East dealer discard
    {
      const { tile } = discard(traceState)
      const claim = checkClaims(traceState, tile, 'East')
      if (claim) {
        processClaim(traceState, claim, tile)
        discard(traceState)
        traceState.turn = nextPlayer(claim.player)
      } else {
        traceState.turn = nextPlayer('East')
      }
    }

    for (let t = 0; t < 70; t++) {
      const drew = draw(traceState)
      const isWinner = traceState.turn === WINNER

      if (isWinner) {
        const hand = traceState.hands[WINNER]
        const exposed = traceState.exposed[WINNER]
        const winCheck = checkWin(traceState, 'self-draw')
        const isCompleteHand = isWinningHand(hand, exposed)
        traceLog.push({
          turn: t,
          drew,
          hand: [...hand],
          exposed: JSON.stringify(exposed),
          isCompleteHand,
          winCheck: winCheck ? `${winCheck.total} fan` : false,
        })
        if (winCheck) { wonAt = t; break }
      }

      const { tile: discarded } = discard(traceState)
      const claim = checkClaims(traceState, discarded, traceState.turn)
      if (claim) {
        processClaim(traceState, claim, discarded)
        discard(traceState)
        traceState.turn = nextPlayer(claim.player)
      } else {
        traceState.turn = nextPlayer(traceState.turn)
      }
    }
    if (wonAt === null) hitMaxTurns = true

    console.log(`  Trace: wonAt=${wonAt !== null ? wonAt : 'NEVER (hit 70 turns)'}, hitMaxTurns=${hitMaxTurns}`)
    console.log(`  Winner draw turns (up to first 8):`)
    traceLog.slice(0, 8).forEach(l => {
      console.log(`    Turn ${l.turn}: drew=${l.drew}, isComplete=${l.isCompleteHand}, winCheck=${l.winCheck}`)
      console.log(`      Hand(${l.hand.length}): [${l.hand.join(', ')}]`)
      // Check which toAcquire tiles are present
      const present = toAcquire.filter(t => l.hand.includes(t))
      const missing = toAcquire.filter(t => !l.hand.includes(t))
      console.log(`      toAcquire present: [${present.join(', ')}], missing: [${missing.join(', ')}]`)
    })

    // Run simulation
    let steps
    try {
      steps = simulateGame(startingHands, {
        roundWind: ROUND_WIND,
        winner: WINNER,
        winnerTargetTiles: WINNER_HAND,
        minFan: MIN_FAN,
      })
    } catch (err) {
      console.error(`  simulateGame THREW: ${err.message}`)
      continue
    }

    const stepCount = steps.length
    const winStep = steps.find(s => s.action === 'win')
    const inRange = stepCount >= 12 && stepCount <= 30

    console.log(`  Steps: ${stepCount}  ${inRange ? '[OK — in 12-30]' : '[FAIL — out of 12-30 range]'}`)

    if (winStep) {
      console.log(`  Win step: who=${winStep.who}, total=${winStep.total} fan`)
      // Check if winner drew all needed tiles
      const winnerExposed = winStep.exposed?.[WINNER] || []
      const winnerHand    = winStep.hands?.[WINNER] || []
      console.log(`  Winner final hand (${winnerHand.length} tiles): [${winnerHand.join(', ')}]`)
      console.log(`  Winner exposed melds: ${JSON.stringify(winnerExposed)}`)
      // Verify each toAcquire tile ended up in winner's tiles
      const allWinnerTiles = [...winnerHand, ...winnerExposed.flat()]
      const acquiredOk = toAcquire.every(t => allWinnerTiles.includes(t))
      console.log(`  All toAcquire tiles present in winner's final state: ${acquiredOk}`)
      if (!acquiredOk) {
        const missing = toAcquire.filter(t => !allWinnerTiles.includes(t))
        console.log(`  MISSING tiles: [${missing.join(', ')}]`)
      }
    } else {
      console.log(`  WARNING: No win step found! Last step action: ${steps[steps.length - 1]?.action}`)
    }

    // Log every step action for inspection
    console.log(`  Step actions: ${steps.map((s, i) => `${i}:${s.action}(${s.who || '?'})`).join(', ')}`)

  } catch (err) {
    console.error(`  UNEXPECTED ERROR: ${err.message}`)
    console.error(err.stack)
  }
  console.log('')
}

console.log('=== Done ===')
