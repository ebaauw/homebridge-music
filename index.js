// homebridge-zp/index.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

import { createRequire } from 'node:module'

import { MusicPlatform } from './lib/MusicPlatform.js'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

function main (homebridge) {
  MusicPlatform.loadPlatform(homebridge, packageJson, 'Music', MusicPlatform)
}

export { main as default }
