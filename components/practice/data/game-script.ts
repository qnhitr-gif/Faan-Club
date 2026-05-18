// Auto-converted from game-engine output — game_id: 4a2cbfc2
// Round: East · Winner: East · Pattern: Seven Pairs (七對)
import type { GameStep } from './types';
import type { LearningContent, GameMetadata } from './types';

export const STEPS: GameStep[] = [
  {
    "who": null,
    "action": "setup",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "Game start — tiles dealt",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "6c",
        "F1",
        "5d"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "F3",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "F2"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "S4",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {}
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "3b",
    "discarded": "6c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws 3b, discards 6c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "6c",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 6c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 6c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 6c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "3d",
    "discarded": "NW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested East",
    "warning": true,
    "headline": "South draws 3d, discards NW",
    "comment": "AI suggested East",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "NW",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "5c",
    "discarded": "NW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested West",
    "warning": true,
    "headline": "West draws 5c, discards NW",
    "comment": "AI suggested West",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "NW",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "6b",
    "discarded": "3c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North draws 6b, discards 3c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "3c",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": []
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 3c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 3c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 3c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "WD",
    "discarded": "WD",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws WD, discards WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "WD"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "1b",
    "discarded": "WW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested East",
    "warning": true,
    "headline": "South draws 1b, discards WW",
    "comment": "AI suggested East",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "WW",
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "RD",
    "discarded": "WW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws RD, discards WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "WW",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "GD",
    "discarded": "GD",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 7b",
    "warning": true,
    "headline": "North draws GD, discards GD",
    "comment": "AI suggested 7b",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b",
        "GD"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "8d",
    "discarded": "8d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 9b",
    "warning": true,
    "headline": "East draws 8d, discards 8d",
    "comment": "AI suggested 9b",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "8d"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 8d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 8d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 8d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "6c",
    "discarded": "EW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South draws 6c, discards EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "EW",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "8d",
    "discarded": "EW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws 8d, discards EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "EW",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on EW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "WW",
    "discarded": "WW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 7b",
    "warning": true,
    "headline": "North draws WW, discards WW",
    "comment": "AI suggested 7b",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b",
        "WW"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on WW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "2c",
    "discarded": "2c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws 2c, discards 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "2c"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "1c",
    "discarded": "6b",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 8chr",
    "warning": true,
    "headline": "South draws 1c, discards 6b",
    "comment": "AI suggested 8c",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "6b",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": true,
    "headline": "West chis 6b from South → REJECTED (correct: pass)",
    "comment": "AI said chi, correct was pass",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": true,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 6b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 6b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "9b",
    "discarded": "2c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 5chr",
    "warning": true,
    "headline": "West draws 9b, discards 2c",
    "comment": "AI suggested 5c",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "2c",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 2c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "1b",
    "discarded": "1d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 7b",
    "warning": true,
    "headline": "North draws 1b, discards 1d",
    "comment": "AI suggested 7b",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "1d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 1d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 1d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 1d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "GD",
    "discarded": "GD",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws GD, discards GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "GD"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "WD",
    "discarded": "WD",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 8chr",
    "warning": true,
    "headline": "South draws WD, discards WD",
    "comment": "AI suggested 8c",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "WD"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on WD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "SW",
    "discarded": "5c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws SW, discards 5c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "5c",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 5c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 5c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 5c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "NW",
    "discarded": "NW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North draws NW, discards NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "NW"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on NW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "4b",
    "discarded": "9b",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws 4b, discards 9b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "9b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": true,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 9b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 9b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 9b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "7c",
    "discarded": "4c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 9chr",
    "warning": true,
    "headline": "South draws 7c, discards 4c",
    "comment": "AI suggested 9c",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "4c",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 4c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 4c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 4c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "7d",
    "discarded": "SW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws 7d, discards SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "SW",
        "7d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "5c",
    "discarded": "3d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 5chr",
    "warning": true,
    "headline": "North draws 5c, discards 3d",
    "comment": "AI suggested 5c",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "3d",
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 3d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 3d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 3d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "4d",
    "discarded": "4d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East draws 4d, discards 4d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "4d"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": true,
      "isWarning": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": true,
    "headline": "South chis 4d from East → REJECTED (correct: pass)",
    "comment": "AI said chi, correct was pass",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": true,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 4d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 4d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "9d",
    "discarded": "9c",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South draws 9d, discards 9c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "9c",
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 9c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 9c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 9c",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "RD",
    "discarded": "GD",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws RD, discards GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "GD",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": true,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on GD",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "draw-discard",
    "drew": "SW",
    "discarded": "SW",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 5chr",
    "warning": true,
    "headline": "North draws SW, discards SW",
    "comment": "AI suggested 5c",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c",
        "SW"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on SW",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "draw-discard",
    "drew": "1d",
    "discarded": "8b",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 1d",
    "warning": true,
    "headline": "East draws 1d, discards 8b",
    "comment": "AI suggested 1d",
    "hands": {
      "East": [
        "5b",
        "8b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": true,
      "isWarning": true
    }
  },
  {
    "who": "South",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "South passes on 8b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 8b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 8b",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "South",
    "action": "draw-discard",
    "drew": "2c",
    "discarded": "9d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": "AI suggested 2chr",
    "warning": true,
    "headline": "South draws 2c, discards 9d",
    "comment": "AI suggested 2c",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "9d",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": false,
      "isWarning": true
    }
  },
  {
    "who": "West",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West passes on 9d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 9d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "East passes on 9d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "West",
    "action": "draw-discard",
    "drew": "1d",
    "discarded": "1d",
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "West draws 1d, discards 1d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD",
        "1d"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isTenpai": true,
      "isWarning": false
    }
  },
  {
    "who": "North",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": null,
    "discardReason": null,
    "warning": false,
    "headline": "North passes on 1d",
    "comment": "",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD",
        "1d"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": false,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "claim",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": {
      "from": "West",
      "tile": "1d",
      "meld": []
    },
    "discardReason": null,
    "warning": true,
    "headline": "East passes on 1d → REJECTED (correct: hu)",
    "comment": "AI said pass, correct was hu",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD",
        "1d"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": null,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": null,
    "total": null,
    "learningFlags": {
      "isWarning": true,
      "goodTableRead": false
    }
  },
  {
    "who": "East",
    "action": "win",
    "drew": null,
    "discarded": null,
    "bonusDrawn": null,
    "claimed": {
      "from": "West",
      "tile": "1d",
      "meld": [
        "1d",
        "1d"
      ]
    },
    "discardReason": null,
    "warning": false,
    "headline": "East wins — Seven Pairs (七對) · 5 fan",
    "comment": "East completes Seven Pairs: 3b-3b, 4b-4b, 5b-5b, 4c-4c, 8c-8c, 5d-5d, 1d-1d. All seven pairs concealed. Winning tile 1d claimed from West. Seven Pairs scores 4 fan base, plus 1 fan for East's matching bonus flower (F1 = Spring, East's flower). Total: 5 fan — above the 3-fan minimum. East (dealer) wins, so all three opponents pay.",
    "hands": {
      "East": [
        "5b",
        "8c",
        "3b",
        "4c",
        "8c",
        "5d",
        "4c",
        "4b",
        "5b",
        "5d",
        "3b",
        "4b",
        "1d"
      ],
      "South": [
        "2b",
        "1d",
        "1c",
        "8b",
        "8b",
        "2d",
        "8c",
        "3d",
        "1b",
        "6c",
        "1c",
        "7c",
        "2c"
      ],
      "West": [
        "3d",
        "3b",
        "5b",
        "3d",
        "9d",
        "4b",
        "7b",
        "RD",
        "RD",
        "8d",
        "9b",
        "7d",
        "RD"
      ],
      "North": [
        "9c",
        "7b",
        "6b",
        "4b",
        "7d",
        "1b",
        "7c",
        "6d",
        "8d",
        "8c",
        "6b",
        "1b",
        "5c"
      ]
    },
    "exposed": {
      "East": [],
      "South": [],
      "West": [],
      "North": []
    },
    "discards": {
      "East": [
        "6c",
        "WD",
        "8d",
        "2c",
        "GD",
        "9b",
        "4d",
        "8b"
      ],
      "South": [
        "NW",
        "WW",
        "EW",
        "6b",
        "WD",
        "4c",
        "9c",
        "9d"
      ],
      "West": [
        "NW",
        "WW",
        "EW",
        "2c",
        "5c",
        "SW",
        "GD",
        "1d"
      ],
      "North": [
        "3c",
        "GD",
        "WW",
        "1d",
        "NW",
        "3d",
        "SW"
      ]
    },
    "bonus": {
      "East": [
        "F1"
      ],
      "South": [
        "F3",
        "F2",
        "S3"
      ],
      "West": [],
      "North": [
        "S4"
      ]
    },
    "fan": {
      "East": 5,
      "South": null,
      "West": null,
      "North": null
    },
    "breakdown": [
      {
        "item": "Seven Pairs (七對)",
        "fan": 4
      },
      {
        "item": "Matching flower (F1 · East)",
        "fan": 1
      }
    ],
    "total": 5,
    "learningFlags": {
      "fanCalcMoment": true
    }
  }
];

export const METADATA: GameMetadata = {
  winner: 'East',
  pattern: 'Seven Pairs',
  suit: 'mixed',
  honor: 'none',
  roundWind: 'East',
  totalFan: 5,
  fanSources: [
    { item: 'Seven Pairs (七對)', fan: 4 },
    { item: 'Matching flower (F1 · East)', fan: 1 },
  ],
  generatedAt: '2026-05-15T05:41:29.331Z',
};

export const LEARNING: LearningContent = {
  fanCalc: [
    {
      hand: {
        concealed: ['3b','3b','4b','4b','5b','5b','4c','4c','8c','8c','5d','5d','1d'],
        exposed: [],
        winningTile: '1d',
        winBy: 'discard',
      },
      conditions: { seat: 'East', round: 'East', winBy: 'discard', bonus: ['F1'], prevailingWind: 'East' },
      answer: {
        total: 5,
        sources: [
          { item: 'Seven Pairs (七對)', fan: 4 },
          { item: 'Matching flower (F1 · East)', fan: 1 },
        ],
      },
      commonMistake: 'Forgetting the flower bonus, or miscounting as 4 fan when the flower adds 1 more.',
      difficulty: 'medium',
    },
  ],
  tableRead: [
    {
      stepIdx: 70,
      question: 'East is tenpai. What tile completes the Seven Pairs hand?',
      options: ['1d', '8c', '5d', '4b'],
      answer: '1d',
      explanation: 'East holds six complete pairs and one isolated 1d. Any 1d completes the seventh pair.',
    },
  ],
  patternBuild: [
    {
      stepIdx: 50,
      hand: ['3b','3b','4b','4b','5b','5b','4c','4c','8c','8c','5d','5d','1d'],
      question: 'East holds 6 pairs and one isolated tile. What winning shape is East building?',
      answer: 'Seven Pairs (七對)',
      explanation: 'Seven identical pairs with no triplets or sequences. Scores 4 fan base.',
    },
  ],
};
