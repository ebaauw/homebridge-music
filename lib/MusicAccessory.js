// homebridge-music/lib/MusicAccessory.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for Apple Music with Airplay speakers.

import { AccessoryDelegate } from 'homebridge-lib/AccessoryDelegate'

import { MusicService } from './MusicService.js'

class MusicAccessory extends AccessoryDelegate {
  constructor (platform, params = {}) {
    params.id = params.name
    params.manufacturer = 'homebridge-music'
    params.model = platform.config.scriptName
    params.category = platform.Accessory.Categories.SPEAKER
    super(platform, params)
  }
}

MusicAccessory.Player = class Player extends MusicAccessory {
  constructor (platform, params) {
    super(platform, params)
    this.service = new MusicService.Player(this, params)
    this.manageLogLevel(this.service.characteristicDelegate('logLevel'), true)
    this.emit('initialised')
  }
}

MusicAccessory.Speaker = class Speaker extends MusicAccessory {
  constructor (platform, params) {
    super(platform, params)
    this.service = new MusicService.Speaker(this, params)
    this.emit('initialised')
  }
}

export { MusicAccessory }
