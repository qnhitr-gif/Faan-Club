#!/usr/bin/env node
'use strict'

require('dotenv').config()

const path = require('path')
const fs = require('fs')
const { callClaude, extractJSON } = require('./claude')
const { simulateGame } = require('./engine/index')
const { validateScript } = require('./validators/script-validator')
const { validateTileCount } = require('./validators/tile-count')
const { STANDARD_TILES, BONUS_TILES } = require('./engine/tile-manifest')

// CLI args
const args = process.argv.slice(2)
function getArg(flag) {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const winner   = getArg('--winner')  || 'South'
const round    = getArg('--round')   || 'East'
const pattern  = getArg('--pattern') || 'hf-dragon'
const suit     = getArg('--suit')    || 'b'
const honor    = getArg('--honor')   || 'WD'
const output   = getArg('--output')  || `components/practice/data/game-script.ts`

const PATTERN_DESCRIPTIONS = {
  'hf-dragon':       `Half Flush (${suit}) + Dragon pung (${honor}) — minimum 4 fan`,
  'hf-wind':         `Half Flush (${suit}) + Wind pung — minimum 4 fan`,
  'hf-clean':        `Half Flush (${suit}) — minimum 3 fan`,
  'hf-double-wind':  `Half Flush (${suit}) + Seat wind + Round wind — minimum 5 fan`,
  'ap-dragon':       `All Pungs + Dragon pung (${honor}) — minimum 4 fan`,
  'ap-minimal':      `All Pungs only — exactly 3 fan`,
  'ap-dragon-wind':  `All Pungs + Dragon pung + Wind pung — minimum 5 fan`,
  'full-flush':      `Full Flush (${suit}) — minimum 7 fan`,
  'double-dragon':   `Two Dragon pungs + self-draw — minimum 3 fan`,
  'seven-pairs':     `Seven Pairs — exactly 4 fan`,
}



function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Build all starting hands from a completed winning hand.
//
// East dealer starts with 14 tiles; all others start with 13.
// The winning hand is always 14 tiles (the 14th tile completes it).
//
// Strategy:
//   Pick N = 4–6 tiles to "remove" from the winning hand — these are tiles the winner
//   must acquire during the game (by drawing from the wall).
//   Replace those N slots with random tiles from the remaining pool so the starting
//   hand has the correct count (14 for East, 13 for others).
//   The replacements are "junk" the winner will discard as they draw needed tiles.
//
// For East (starts with 14):  keepInStart (14-N) + replacements (N)   = 14
// For others (starts with 13): keepInStart (14-N) + replacements (N-1) = 13
//   (the last needed tile is drawn from the wall to win — no replacement needed for it)
function buildAllStartingHands(winner, winnerHand) {
  const N = 4 + Math.floor(Math.random() * 3) // 4, 5, or 6 tiles to acquire

  // Pool = full 144-tile set (136 standard × 4 copies + 8 bonus × 1 copy)
  // Bonus tiles are never dealt to starting hands — they stay in the wall and
  // are handled by draw.js (draw a replacement when a bonus tile is drawn).
  const pool = shuffle([
    ...STANDARD_TILES.flatMap(t => [t,t,t,t]),
    ...BONUS_TILES,
  ])
  // Remove winner's complete winning hand from pool
  for (const tile of winnerHand) {
    const idx = pool.indexOf(tile)
    if (idx !== -1) pool.splice(idx, 1)
  }
  // Bonus tiles stay in the wall — never dealt to starting hands.
  // Only distribute standard tiles to players.
  const standardPool = pool.filter(t => !BONUS_TILES.includes(t))

  // Track available copies of each tile so we can guarantee toAcquire tiles stay in the wall.
  const availCounts = {}
  for (const t of standardPool) availCounts[t] = (availCounts[t] || 0) + 1

  // Choose which N tiles to pull out of the winning hand.
  // Only select tiles that have ≥1 copy remaining in standardPool — those copies will
  // be reserved (removed from standardPool) so other players can't get them, guaranteeing
  // stackWall will find them in the wall later.
  const shuffledWinner = shuffle([...winnerHand])
  const toAcquire = []
  const keepInStart = []
  for (const tile of shuffledWinner) {
    if (toAcquire.length < N && (availCounts[tile] || 0) > 0 && !toAcquire.includes(tile)) {
      toAcquire.push(tile)
      availCounts[tile]--
      // Remove this reserved copy from standardPool so it stays in the wall
      const idx = standardPool.indexOf(tile)
      if (idx !== -1) standardPool.splice(idx, 1)
    } else {
      keepInStart.push(tile)
    }
  }

  const actualN = toAcquire.length
  if (actualN < 4) {
    throw new Error(`Could only guarantee ${actualN} wall-drawable tiles — winning hand uses too many copies; try a different hand`)
  }

  // How many replacement tiles to add (East needs actualN, others need actualN-1)
  const replacementCount = winner === 'East' ? actualN : actualN - 1
  const replacements = standardPool.splice(0, replacementCount)

  const winnerStart = [...keepInStart, ...replacements]
  const expectedStart = winner === 'East' ? 14 : 13
  if (winnerStart.length !== expectedStart) {
    throw new Error(`buildAllStartingHands: expected ${expectedStart} tiles for ${winner}, got ${winnerStart.length}`)
  }

  // Distribute remaining standard tiles to other seats (bonus tiles never in starting hands)
  const otherSeats = ['East','South','West','North'].filter(s => s !== winner)
  const hands = { [winner]: winnerStart }
  for (const seat of otherSeats) {
    hands[seat] = standardPool.splice(0, seat === 'East' ? 14 : 13)
  }
  return { startingHands: hands, toAcquire, N: actualN }
}

async function claudeDesignHands(config, lastFailure = null) {
  // Claude only designs the winning hand (14 tiles) + fan breakdown.
  // JS builds all starting hands: winner gets winning hand with N tiles swapped out,
  // other seats get random tiles from the remaining pool.
  const system = `You are an HK mahjong hand designer. Return ONLY valid JSON.
Tile notation: 1b-9b (bamboo), 1d-9d (dots), 1c-9c (characters), EW SW WW NW RD GD WD
No Tanyao rule — honor tiles are allowed.`

  const user = `Design a complete winning hand for an HK mahjong game.

WINNER: ${config.winner}
PATTERN: ${config.patternDescription}
ROUND WIND: ${config.roundWind}

Rules:
1. winnerHand must be exactly 14 tiles and score ≥ 3 fan with the pattern above
2. List every fan source and its fan value
3. No tile type appears more than 4 times in winnerHand
4. The hand must be a valid complete hand (4 sets + 1 pair, or seven pairs)
${lastFailure ? `\nPREVIOUS ATTEMPT FAILED: ${lastFailure}\nDesign completely different tiles this time.\n` : ''}
Return JSON:
{
  "winnerHand":  [exactly 14 tiles],
  "fanSources":  [{"item":"...","fan":N}, ...],
  "totalFan":    N
}`

  const result = extractJSON(await callClaude(system, user, 1000))

  // JS builds all starting hands — guaranteed 4–6 tiles away for winner
  const { startingHands, toAcquire, N } = buildAllStartingHands(config.winner, result.winnerHand)

  console.log(`  winner needs ${N} tiles from wall: [${toAcquire.join(', ')}]`)

  return {
    winnerHand:    result.winnerHand,
    fanSources:    result.fanSources,
    totalFan:      result.totalFan,
    startingHands,
    toAcquire,
  }
}

async function claudeNarrateGame(gameSteps, design, config) {
  const system = `You are an HK mahjong commentator. You receive mechanically correct game states
and add educational commentary. Do NOT change any game data. Return ONLY valid JSON.
Focus on: WHY each discard was made, what patterns are forming, teaching the 3-fan minimum lesson.`

  const user = `Annotate this HK mahjong game with educational commentary.

GAME CONFIG: ${config.winner} wins with ${config.patternDescription}

STEPS (do not change hands, discards, fan data, or any game state):
${JSON.stringify(gameSteps.slice(0, 15), null, 2)}
${gameSteps.length > 15 ? `... and ${gameSteps.length - 15} more steps` : ''}

For EACH step, provide:
- headline: short action summary (≤ 10 words)
- comment: educational explanation (2-3 sentences, focus on WHY)
- warning: true ONLY if the player has a complete winning hand structure but < 3 fan total

Also extract:
- fanCalc: the winning hand as a quiz question
- tableRead: 2-3 mid-game snapshot indices where opponent discard patterns are readable
- patternBuild: 2-3 mid-game step indices showing the winner's pattern forming

Return valid JSON:
{
  "annotations": [
    { "stepIndex": 0, "headline": "...", "comment": "...", "warning": false },
    ...
  ],
  "learningContent": {
    "fanCalc": [{
      "hand": [...],
      "conditions": { "seat": "${config.winner}", "round": "${config.roundWind}", "winBy": "self-draw", "bonus": [] },
      "answer": { "total": ${design.totalFan}, "sources": ${JSON.stringify(design.fanSources)} },
      "commonMistake": "...",
      "difficulty": "medium"
    }],
    "tableRead": [{ "stepIdx": 5, "question": "...", "options": ["...","...","...","..."], "answer": "...", "explanation": "..." }],
    "patternBuild": [{ "stepIdx": 3, "hand": [...], "question": "...", "answer": "...", "explanation": "..." }]
  }
}`

  return extractJSON(await callClaude(system, user, 8000))
}

// Check that no player's hand shares ≥ 50% of its tiles with any other player's hand
function handsAreDiverse(startingHands) {
  const seats = Object.keys(startingHands)
  for (let i = 0; i < seats.length; i++) {
    for (let j = i + 1; j < seats.length; j++) {
      const a = [...startingHands[seats[i]]]
      const b = [...startingHands[seats[j]]]
      // Count shared tiles (accounting for duplicates)
      let shared = 0
      const bCopy = [...b]
      for (const tile of a) {
        const idx = bCopy.indexOf(tile)
        if (idx !== -1) { shared++; bCopy.splice(idx, 1) }
      }
      if (shared > 5) {
        return { ok: false, reason: `${seats[i]} and ${seats[j]} share ${shared} tiles (max 5 allowed)` }
      }
    }
  }
  return { ok: true }
}


async function generateGame(config) {
  let designAttempt = 0

  // ── Stage 1 loop: keep asking Claude for hands until validations pass ─────
  let design
  let lastFailure = null
  while (true) {
    designAttempt++
    if (designAttempt > 10) throw new Error('Stage 1 failed after 10 attempts')
    console.log(`\nStage 1 attempt ${designAttempt}: Designing hands...`)
    try {
      design = await claudeDesignHands(config, lastFailure)
    } catch (err) {
      lastFailure = `API error: ${err.message}`
      console.error('  failed:', err.message, '— retrying Stage 1')
      continue
    }

    // Validate tile counts (catches malformed JSON from Claude)
    const tileErrors = validateTileCount([{ action: 'setup', hands: design.startingHands }])
    if (tileErrors.length > 0) {
      lastFailure = `Invalid tile counts: ${tileErrors.join(', ')}`
      console.warn('  tile count errors:', tileErrors); continue
    }

    // Diversity check (JS-generated hands are mostly random but check anyway)
    const diversity = handsAreDiverse(design.startingHands)
    if (!diversity.ok) {
      // Diversity failure is from the random pool distribution — just retry Stage 1 to get new random hands
      console.warn('  diversity:', diversity.reason, '— retrying'); continue
    }

    console.log(`  hands valid ✓  (winner needs ${design.toAcquire?.length ?? '?'} tiles from wall)`)
    break
  }

  // ── Stage 2 loop: re-deal hands and re-simulate each retry ───────────────
  let gameSteps
  let simAttempt = 0
  while (true) {
    simAttempt++
    if (simAttempt > 20) throw new Error('Stage 2 failed after 20 attempts')
    console.log(`\nStage 2 attempt ${simAttempt}: Simulating game...`)

    // Rebuild starting hands each retry for fresh randomness
    let freshHands
    try {
      const built = buildAllStartingHands(config.winner, design.winnerHand)
      freshHands = built.startingHands
    } catch (err) {
      console.error('  buildAllStartingHands failed:', err.message, '— retrying')
      continue
    }

    try {
      gameSteps = simulateGame(freshHands, {
        roundWind: config.roundWind,
        winner: config.winner,
        winnerTargetTiles: design.winnerHand,
        minFan: 3,
      })
    } catch (err) {
      console.error('  failed:', err.message, '— retrying Stage 2')
      continue
    }
    if (gameSteps.length < 15) {
      console.warn(`  too short: ${gameSteps.length} steps (min 15) — retrying Stage 2`)
      continue
    }
    if (gameSteps.length > 60) {
      console.warn(`  too long: ${gameSteps.length} steps (max 60) — retrying Stage 2`)
      continue
    }
    const winStep = gameSteps.find(s => s.action === 'win')
    if (!winStep) {
      console.warn('  no win step found — retrying Stage 2')
      continue
    }
    console.log(`  simulation done ✓  (${gameSteps.length} steps, winner: ${winStep.who})`)
    break
  }

  // ── Stage 3 loop: re-narrate with same game steps ─────────────────────────
  let narrated
  let narrateAttempt = 0
  while (true) {
    narrateAttempt++
    if (narrateAttempt > 10) throw new Error('Stage 3 failed after 10 attempts')
    console.log(`\nStage 3 attempt ${narrateAttempt}: Narrating ${gameSteps.length} steps...`)
    try {
      narrated = await claudeNarrateGame(gameSteps, design, config)
      console.log('  narration done ✓')
      break
    } catch (err) {
      console.warn('  failed:', err.message, '— retrying Stage 3')
    }
  }

  // Merge annotations
  const annotatedSteps = gameSteps.map((step, i) => {
    const ann = (narrated.annotations || []).find(a => a.stepIndex === i)
    return ann
      ? { ...step, headline: ann.headline || step.headline, comment: ann.comment || step.comment, warning: ann.warning || step.warning }
      : step
  })

  // Stage 4: Validate — warn but don't retry (narration issues are non-fatal)
  const errors = validateScript(annotatedSteps)
  if (errors.length > 0) {
    console.warn('Validation warnings (non-fatal):', errors)
  }

  return {
    steps: annotatedSteps,
    learningContent: narrated.learningContent || { fanCalc: [], tableRead: [], patternBuild: [] },
    metadata: {
      winner: gameSteps.find(s => s.action === 'win')?.who || config.winner,
      pattern: config.pattern,
      suit: config.suit,
      honor: config.honor,
      roundWind: config.roundWind,
      totalFan: design.totalFan,
      fanSources: design.fanSources,
      generatedAt: new Date().toISOString(),
    }
  }
}

async function main() {
  const config = {
    winner: winner,
    roundWind: round,
    pattern: pattern,
    suit: suit,
    honor: honor,
    patternDescription: PATTERN_DESCRIPTIONS[pattern] || pattern,
  }

  console.log('Generating game:', config)

  const result = await generateGame(config)  // retries indefinitely until success

  // Write output file
  const outputPath = path.resolve(process.cwd(), output)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  // Format JSON but collapse short arrays (tile lists) onto one line
  function formatCompact(obj) {
    return JSON.stringify(obj, null, 2).replace(
      /\[\n\s+("[\w\d]+"(?:,\n\s+"[\w\d]+")*)\n\s+\]/g,
      (_, inner) => '[' + inner.replace(/\n\s+/g, ' ') + ']'
    )
  }

  const fileContent = `// Auto-generated by tools/game-generator.js — do not edit by hand.
// Generated: ${new Date().toISOString()}
// Pattern: ${config.patternDescription}
import type { GameStep } from './types';
import type { LearningContent, GameMetadata } from './types';

export const STEPS: GameStep[] = ${formatCompact(result.steps)}

export const LEARNING_CONTENT: LearningContent = ${formatCompact(result.learningContent)}

export const METADATA: GameMetadata = ${formatCompact(result.metadata)}
`

  fs.writeFileSync(outputPath, fileContent, 'utf8')
  console.log(`\n✓ Game saved to: ${outputPath}`)
  console.log(`  ${result.steps.length} steps`)
  const winStep = result.steps.find(s => s.action === 'win')
  if (winStep) console.log(`  Winner: ${winStep.who} with ${winStep.total} fan`)
}

main().catch(err => {
  console.error('\nFailed:', err.message)
  process.exit(1)
})
