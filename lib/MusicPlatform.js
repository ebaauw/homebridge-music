// homebridge-music/index.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for Apple Music with Airplay speakers.

import { release } from 'node:os'

import { timeout } from 'homebridge-lib'
import { OptionParser } from 'homebridge-lib/OptionParser'
import { Platform } from 'homebridge-lib/Platform'
import { semver } from 'homebridge-lib/semver'

import { MusicAccessory } from './MusicAccessory.js'
import { Script } from './Script.js'

class MusicPlatform extends Platform {
  constructor (log, configJson, homebridge, bridge) {
    super(log, configJson, homebridge)
    this.musicAccessories = {} // Map of platform accessories.
    if (process.platform !== 'darwin') {
      this.error('not running on macOS')
      return
    }
    this.catalina = semver.gte(release(), '19.0.0')
    this
      .once('heartbeat', this.init)
    this.config = {
      SpeakerService: this.Services.hap.Switch,
      VolumeCharacteristic: this.Characteristics.hap.Volume,
      heartrate: 5,
      scriptName: this.catalina ? 'Music' : 'iTunes',
      service: 'switch',
      speakername: '.*',
      timeout: 5,
      track: ''
    }
    const optionParser = new OptionParser(this.config, true)
    optionParser
      .stringKey('name')
      .stringKey('platform')
      .boolKey('brightness')
      .intKey('heartrate', 1, 60)
      .boolKey('resetTrack')
      .stringKey('script')
      .enumKey('service')
      .enumKeyValue('service', 'fan', () => {
        this.config.SpeakerService = this.Services.hap.Fan
        this.config.VolumeCharacteristic = this.Characteristics.hap.RotationSpeed
      })
      .enumKeyValue('service', 'light', () => {
        this.config.SpeakerService = this.Services.hap.Lightbulb
        this.config.VolumeCharacteristic = this.Characteristics.hap.Brightness
      })
      .enumKeyValue('service', 'speaker', () => {
        this.config.SpeakerService = this.Services.hap.Speaker
        this.config.VolumeCharacteristic = this.Characteristics.hap.Volume
      })
      .enumKeyValue('service', 'switch', () => {
        this.config.SpeakerService = this.Services.hap.Switch
        this.config.VolumeCharacteristic = this.Characteristics.hap.Volume
      })
      .stringKey('speakername')
      .intKey('timeout', 1, 60)
      .stringKey('track')
      .on('userInputError', (message) => {
        this.warn('config.json: %s', message)
      })
    try {
      optionParser.parse(configJson)
    } catch (error) {
      this.error(error)
    }
    this.player = this.config.scriptName.split('-')[0]
    this.name = this.config.name ?? this.player
    if (this.config.brightness) {
      if (this.config.service === 'speaker' || this.config.service === 'switch') {
        this.config.VolumeCharacteristic = this.Characteristics.hap.Brightness
      } else {
        this.warn(
          'config.json: ignoring "brightness" for "service": "%s"',
          this.config.service
        )
      }
    }
    this.speakerName = new RegExp(this.config.speakername)
    this.script = new Script(this, this.config.scriptName)

    this.debug('config: %j', this.config)
    this.debug('SpeakerService: %j', this.config.SpeakerService.UUID)
    this.debug('VolumeCharacteristic: %j', this.config.VolumeCharacteristic.UUID)
  }

  async init () {
    await this.script.getState(true)
    this.log('waiting %d seconds for %s to start', this.config.timeout, this.player)
    await timeout(this.config.timeout * 1000)
    const obj = await this.script.getState(true)
    if (obj) {
      this.musicAccessories[''] = new MusicAccessory.Player(this, {
        name: this.name,
        on: obj.on,
        volume: obj.volume,
        track: obj.track ?? this.config.track
      })
      for (const name in obj.speakers) {
        if (name.match(this.speakerName)) {
          const o = obj.speakers[name]
          this.musicAccessories[name] = new MusicAccessory.Speaker(this, {
            name,
            on: o.on,
            volume: o.volume
          })
        }
      }
    }
    this.debug('initialised')
    this.emit('initialised')
    this.on('heartbeat', this.heartbeat)
  }

  // Refresh MusicAccessories on heartbeat.
  async heartbeat (beat) {
    if (beat % this.config.heartrate === 0) {
      const obj = await this.script.getState(false)
      if (obj == null) {
        return
      }
      // Check state for known MusicAcessories.
      for (const name in this.musicAccessories) {
        const a = this.musicAccessories[name]
        if (name) {
          // Speaker.
          const o = obj.speakers[name]
          if (o) {
            a.service.values.on = o.on
            a.service.values.volume = o.volume
          }
        } else {
          // Player.
          a.service.values.on = obj.on
          a.service.values.volume = obj.volume
          a.service.values.currentTrack = obj.track
        }
      }
    }
  }
}

export { MusicPlatform }
