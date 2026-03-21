// homebridge-music/index.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

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
      // .on('accessoryRestored', this.accessoryRestored)
      .once('heartbeat', this.init)
      .on('heartbeat', this.heartbeat)
    this.confiig = {
      heartrate: 5,
      script: this.catalina ? 'Music' : 'iTunes',
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
    this.player = this.config.script.split('-')[0]
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
    this.speakerName = new RegExp(this.config.speakername || '.*')
    this.script = new Script(this, this.config.script)
  }

  async init () {
    await this.script.getState(true)
    this.log('waiting %d seconds for %s to start', this.timeout, this.player)
    await timeout(this.timeout * 1000)
    const obj = await this.script.getState(true)
    if (obj) {
      const track = obj.track && this.track
      this.musicAccessories[''] = new MusicAccessory(this, '', this.name, obj.on, obj.volume, track)
      for (const name in obj.speakers) {
        if (name.match(this.speakerName)) {
          const o = obj.speakers[name]
          this.musicAccessories[name] = new MusicAccessory(this, name, name, o.on, o.volume)
        }
      }
    }
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
