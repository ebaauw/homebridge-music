// homebridge-zp/index.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

'use strict'

import { MusicPlatform } from './lib/MusicPlatform.js'

function main (homebridge) {
  homebridge.registerPlatform('homebridge-music', 'Music', MusicPlatform)
}

export { main as default }
