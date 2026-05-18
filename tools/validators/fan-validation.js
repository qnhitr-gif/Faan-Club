'use strict'

const { calculateFan } = require('../engine/fan-calculator')

function validateFan(steps) {
  const errors = []

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    if (step.action !== 'win' || !step.total || !step.breakdown) continue

    const { who, hands, exposed = {}, bonus = {} } = step
    if (!who || !hands[who]) continue

    const conditions = {
      seat: who,
      roundWind: 'East', // default — would need config
      winBy: step.drew ? 'self-draw' : 'discard',
      exposed: exposed[who] || [],
      bonus: bonus[who] || [],
    }

    const result = calculateFan(hands[who], conditions)

    if (result.total !== step.total) {
      errors.push(`Step ${i} (win): declared ${step.total} fan but calculated ${result.total} fan`)
    }
  }

  return errors
}

module.exports = { validateFan }
