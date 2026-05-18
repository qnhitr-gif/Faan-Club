'use strict'

const { validateTileCount } = require('./tile-count')
const { validateHandSizes } = require('./hand-sizes')
const { validateFan } = require('./fan-validation')

function validateScript(steps) {
  return [
    ...validateTileCount(steps),
    ...validateHandSizes(steps),
    ...validateFan(steps),
  ]
}

module.exports = { validateScript }
