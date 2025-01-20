// homebridge-music/index.js
// Copyright © 2016-2025 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

import { release } from 'node:os'
import { createRequire } from 'node:module'
import { format } from 'node:util'

import { recommendedNodeVersion, timeout } from 'homebridge-lib'
import { MyHomeKitTypes } from 'homebridge-lib/MyHomeKitTypes'
import { semver } from 'homebridge-lib/semver'

import { MusicAccessory } from './MusicAccessory.js'
import { Script } from './Script.js'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

function minVersion (range) {
  let s = range.split(' ')[0]
  while (s) {
    if (semver.valid(s)) {
      break
    }
    s = s.substring(1)
  }
  return s || undefined
}

let Service
let Characteristic
let homebridgeVersion

function setHomebridge (homebridge) {
  MusicAccessory.setHomebridge(homebridge)

  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridgeVersion = homebridge.serverVersion

  const my = new MyHomeKitTypes(homebridge)

  Characteristic.CurrentTrack = my.Characteristics.CurrentTrack
  Characteristic.ChangeTrack = my.Characteristics.ChangeTrack
}

class MusicPlatform {
  constructor (log, config, homebridge) {
    this.log = log
    setHomebridge(homebridge)
    this.musicAccessories = {} // Map of platform accessories.
    if (process.platform !== 'darwin') {
      this.log.error('error: not running on macOS')
      return
    }
    this.catalina = semver.gte(release(), '19.0.0')

    // Plug-in configuration.
    this.scriptName = config.script || (this.catalina ? 'Music' : 'iTunes')
    this.name = config.name || this.scriptName.split('-')[0]
    switch (config.service) {
      case undefined:
        /* Falls through */
      case 'switch':
        this.Service = Service.Switch
        this.characteristic = config.brightness ? Characteristic.Brightness : Characteristic.Volume
        break
      case 'light':
        this.Service = Service.Lightbulb
        this.characteristic = Characteristic.Brightness
        break
      case 'speaker':
        this.Service = Service.Speaker
        this.characteristic = config.brightness ? Characteristic.Brightness : Characteristic.Volume
        break
      case 'fan':
        this.Service = Service.Fan
        this.characteristic = Characteristic.RotationSpeed
        break
      default:
        this.log.warn('config.json: warning: ignoring unknown service \'%s\'', config.service)
        this.Service = Service.Switch
        this.characteristic = Characteristic.Volume
        break
    }
    this.track = config.track || ''
    this.resetTrack = !!config.resetTrack
    this.timeout = config.timeout || 5
    this.speakerName = new RegExp(config.speakername || '.*')
    this.heartrate = config.heartrate || 5
    this.heartrate *= 1000

    const msg = format(
      '%s v%s, node %s, homebridge v%s, macOS v10.%d', packageJson.name,
      packageJson.version, process.version, homebridgeVersion,
      semver.major(release()) - 4
    )
    this.infoMessage = msg
    this.log.info(this.infoMessage)
    if (semver.clean(process.version) !== recommendedNodeVersion(packageJson)) {
      this.log.warn(
        'warning: not using recommended node version v%s LTS',
        recommendedNodeVersion(packageJson)
      )
    }
    if (homebridgeVersion !== minVersion(packageJson.engines.homebridge)) {
      this.log.warn(
        'warning: not using recommended homebridge version v%s',
        minVersion(packageJson.engines.homebridge)
      )
    }
    this.log.debug('config.json: %j', config)

    this.script = new Script(this, this.scriptName)
  }

  // Called by homebridge to retrieve static list of MusicAccessories.
  async accessories (callback) {
    this.accessoryList = []
    if (process.platform !== 'darwin') {
      this.log.error('error: not running on macOS')
      return callback(this.accessoryList)
    }
    await this.script.getState(true)
    this.log('waiting %d seconds for %s to start', this.timeout, this.scriptName.split('-')[0])
    await timeout(this.timeout * 1000)
    const obj = await this.script.getState(true)
    if (obj) {
      const track = obj.track || this.track || ''
      this.musicAccessories[''] = new MusicAccessory(this, '', this.name, obj.on, obj.volume, track)
      this.accessoryList.push(this.musicAccessories[''])
      for (const name in obj.speakers) {
        if (name.match(this.speakerName)) {
          const o = obj.speakers[name]
          this.musicAccessories[name] = new MusicAccessory(this, name, name, o.on, o.volume)
          this.accessoryList.push(this.musicAccessories[name])
        }
      }
    }
    setInterval(() => {
      this.heartbeat()
    }, this.heartrate)
    callback(this.accessoryList)
  }

  // Refresh MusicAccessories on heartbeat.
  async heartbeat () {
    const obj = await this.script.getState(false)
    if (obj) {
      // Check state for known MusicAcessories.
      for (const name in this.musicAccessories) {
        const a = this.musicAccessories[name]
        if (name) {
          // Speaker.
          const o = obj.speakers[name]
          if (o) {
            a.update(o.on, o.volume)
          }
        } else {
          // Player.
          a.update(obj.on, obj.volume, obj.track)
        }
      }
    }
  }
}

export { MusicPlatform }
