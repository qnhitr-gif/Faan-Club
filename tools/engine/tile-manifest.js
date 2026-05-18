'use strict'

// 34 standard tile types × 4 copies = 136 standard tiles
// 8 bonus tiles (F1-F4, S1-S4) × 1 copy each = 8 bonus tiles
// Total = 144

const STANDARD_TILES = [
  '1b','2b','3b','4b','5b','6b','7b','8b','9b',
  '1d','2d','3d','4d','5d','6d','7d','8d','9d',
  '1c','2c','3c','4c','5c','6c','7c','8c','9c',
  'EW','SW','WW','NW',
  'RD','GD','WD',
]

const BONUS_TILES = ['F1','F2','F3','F4','S1','S2','S3','S4']

class TileManifest {
  constructor(usedTiles = []) {
    // Build full wall (136 standard + 8 bonus)
    const fullWall = [
      ...STANDARD_TILES.flatMap(t => [t,t,t,t]),
      ...BONUS_TILES,
    ]

    // Count what's been used
    const used = [...usedTiles]
    const wall = [...fullWall]

    for (const tile of used) {
      const idx = wall.indexOf(tile)
      if (idx === -1) throw new Error(`Tile ${tile} not found in wall — possible duplicate or invalid tile`)
      wall.splice(idx, 1)
    }

    // Shuffle remaining wall
    for (let i = wall.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[wall[i], wall[j]] = [wall[j], wall[i]]
    }

    this._wall = wall
    this._drawn = []
  }

  drawNext() {
    if (this._wall.length === 0) throw new Error('Wall is empty — no more tiles to draw')
    const tile = this._wall.shift()
    this._drawn.push(tile)
    return tile
  }

  remaining() {
    return [...this._wall]
  }

  isValid() {
    // No standard tile type should appear > 4 times across drawn + wall
    const counts = {}
    for (const t of [...this._drawn, ...this._wall]) {
      if (!BONUS_TILES.includes(t)) {
        counts[t] = (counts[t] || 0) + 1
      }
    }
    return Object.values(counts).every(n => n <= 4)
  }

  isBonus(tile) {
    return BONUS_TILES.includes(tile)
  }
}

function isBonus(tile) {
  return /^[FS][1-4]$/.test(tile)
}

module.exports = { TileManifest, STANDARD_TILES, BONUS_TILES, isBonus }
