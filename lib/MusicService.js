// homebridge-music/lib/MusicService.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for Apple Music with Airplay speakers.

import { ServiceDelegate } from 'homebridge-lib/ServiceDelegate'

class MusicService extends ServiceDelegate {
  constructor (accessory, params) {
    params.Service = accessory.platform.config.SpeakerService
    super(accessory, params)

    this.addCharacteristicDelegate({
      key: 'on',
      Characteristic: this.Characteristics.hap.On,
      value: params.on,
      setter: async (value) => {
        try {
          const response = await this.platform.script.setOn(
            this.id, value, this.values.currentTrack
          )
          if (response?.on !== value) {
            throw new Error(`could not set on to ${value}`)
          }
        } catch (error) {
          this.warn(error)
        }
      },
      timeout: 2000
    })
    this.values.on = params.on
    this.addCharacteristicDelegate({
      key: 'volume',
      Characteristic: this.platform.config.VolumeCharacteristic,
      unit: '%',
      value: params.volume,
      setter: async (value) => {
        try {
          const response = await this.platform.script.setVolume(this.id, value)
          if (response?.volume !== value) {
            throw new Error(`could not set volume to ${value}%`)
          }
        } catch (error) {
          this.warn(error)
        }
      }
    })
    this.values.volume = params.volume
    this.addCharacteristicDelegate({
      key: 'changeVolume',
      Characteristic: this.Characteristics.my.ChangeVolume,
      value: 0,
      setter: async (value) => {
        value += this.values.volume
        try {
          const response = await this.platform.script.setVolume(this.id, value)
          if (response?.volume !== value) {
            throw new Error(`could not set volume to ${value}%`)
          }
        } catch (error) {
          this.warn(error)
        }
        setTimeout(() => {
          this.values.changeVolume = 0
        }, 500)
      }
    })
  }
}

MusicService.Player = class Player extends MusicService {
  constructor (accessory, params) {
    params.subtype = ''
    super(accessory, params)
    this.id = ''
    this.addCharacteristicDelegate({
      key: 'currentTrack',
      Characteristic: this.Characteristics.my.CurrentTrack,
      value: params.track
    })
    this.values.currentTrack = params.track
    this.addCharacteristicDelegate({
      key: 'changeTrack',
      Characteristic: this.Characteristics.my.ChangeTrack,
      value: 0,
      setter: async (value) => {
        try {
          const response = await this.platform.script.changeTrack(value > 0)
          this.values.on = response.on
          this.values.currentTrack = response.track
        } catch (error) { this.warn(error) }
        setTimeout(() => {
          this.values.changeTrack = 0
        }, 500)
      },
      timeout: 2000
    })
    this.values.changeTrack = 0
    this.addCharacteristicDelegate({
      key: 'logLevel',
      Characteristic: this.Characteristics.my.LogLevel,
      value: this.accessoryDelegate.logLevel
    })
  }
}

MusicService.Speaker = class Speaker extends MusicService {
  constructor (accessory, params) {
    params.subtype = params.name
    super(accessory, params)
    this.id = this.name
  }
}

export { MusicService }
