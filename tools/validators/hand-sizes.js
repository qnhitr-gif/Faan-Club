'use strict'

function validateHandSizes(steps) {
  const errors = []

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    if (!step.hands) continue

    const { who, action, hands, exposed = {} } = step

    if (action === 'draw-discard' && who && hands[who]) {
      const handSize = hands[who].length
      const exposedCount = (exposed[who] || []).flat().length
      const totalTiles = handSize + exposedCount

      if (totalTiles !== 13) {
        errors.push(`Step ${i}: ${who} has ${handSize} hand + ${exposedCount} exposed = ${totalTiles} tiles (expected 13)`)
      }
    }

    if (action === 'setup') {
      for (const [seat, hand] of Object.entries(hands)) {
        const expected = seat === 'East' ? 14 : 13
        if (hand.length !== expected) {
          errors.push(`Setup: ${seat} has ${hand.length} tiles (expected ${expected})`)
        }
      }
    }
  }

  return errors
}

module.exports = { validateHandSizes }
