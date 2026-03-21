// homebridge-music/lib/MusicService.js
// Copyright © 2016-2026 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

import { ServiceDelegate } from 'homebridge-lib/ServiceDelegate'

class MusicService extends ServiceDelegate {
  constructor (accessory, params) {
    params.Service = accessory.platfrom.config.SpeakerService
    super(accessory, params)

    this.addCharacteristicDelegate({
      key: 'on',
      Characteristic: this.Characteristics.hap.On,
      setter: async (value) => {
        try {
          const response = await this.platform.script.setOn(
            this.id, value, this.values.currentTrack
          )
          if (response?.on !== value) {
            throw new Error('could not set on to %s', value)
          }
        } catch (error) {
          this.warn(error)
        }
      }
    })
    this.addCharacteristicDelegate({
      key: 'volume',
      Characteristic: this.platform.config.VolumeCharacteristic,
      unit: '%',
      setter: async (value) => {
        try {
          const response = await this.platform.script.setVolume(
            this.id, value, this.values.currentTrack
          )
          if (response?.volume !== value) {
            throw new Error('could not set volume to %s%%', value)
          }
        } catch (error) {
          this.warn(error)
        }
      }
    })
  }
}

MusicService.Player = class Player extends MusicService {
  constructor (accessory, params) {
    params.subtype = ''
    super(accessory, params)
    this.addCharacteristicDelegate({
      key: 'currentTrack',
      Characteristic: this.Characteristics.hap.CurrentTrack,
      props: { minValue: 0 }
    })
    this.addCharacteristicDelegate({
      key: 'changeTrack',
      Characteristic: this.Characteristics.hap.ChangeTrack,
      props: { minValue: -1, maxValue: 1, validValues: [-1, 0, 1] }
    })
  }
}

MusicService.Speaker = class Speaker extends MusicService {
  constructor (accessory, params) {
    params.subtype = params.name
    super(accessory, params)
  }
}

export { MusicService }
