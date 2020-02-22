// homebridge-music/lib/MusicAccessory.js
// Copyright © 2016-2020 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

'use strict'

// Link this module to MusicPlatform.
module.exports = {
  setHomebridge: setHomebridge,
  MusicAccessory: MusicAccessory
}

// Link this module to homebridge.
let Service
let Characteristic

function setHomebridge (homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
}

// Constructor for MusicAccessory.
function MusicAccessory (platform, id, name, on, volume, track) {
  // Setup MusicAccessory, creating or adopting homekit accessory where needed.
  this.platform = platform
  this.log = this.platform.log
  this.id = id
  this.name = name
  // jshint -W106
  this.uuid_base = name
  // jshint +W106
  this.on = on
  this.volume = volume
  this.currentTrack = track
  this.changeTrack = 0

  this.infoService = new Service.AccessoryInformation()
  this.infoService
    .updateCharacteristic(Characteristic.Manufacturer, 'homebridge-music')
    .updateCharacteristic(Characteristic.Model, this.platform.scriptName)
    .updateCharacteristic(Characteristic.SerialNumber, this.name)

  this.service = new this.platform.Service(this.name, this.id)
  this.service.addOptionalCharacteristic(Characteristic.On)
  this.service.getCharacteristic(Characteristic.On)
    .updateValue(this.on)
    .on('set', this.setOn.bind(this))
  this.service.addOptionalCharacteristic(this.platform.characteristic)
  this.service.getCharacteristic(this.platform.characteristic)
    .updateValue(this.volume)
    .on('set', this.setVolume.bind(this))
  if (this.currentTrack != null) {
    this.service.addOptionalCharacteristic(Characteristic.ChangeTrack)
    this.service.getCharacteristic(Characteristic.ChangeTrack)
      .updateValue(this.changeTrack)
      .on('set', this.setChangeTrack.bind(this))
    this.service.addOptionalCharacteristic(Characteristic.CurrentTrack)
    this.service.getCharacteristic(Characteristic.CurrentTrack)
      .updateValue(this.currentTrack)
  }
}

// Called by homebridge to initialise a static accessory.
MusicAccessory.prototype.getServices = function () {
  return [this.infoService, this.service]
}

// Called by heartbeat when state is refreshed to check/update MusicAccessory state.
MusicAccessory.prototype.update = function (on, volume, track) {
  if (on !== this.on) {
    this.log.info('%s: on changed from %s to %s', this.name, this.on, on)
    this.on = on
    this.service.updateCharacteristic(Characteristic.On, this.on)
  }
  if (volume !== this.volume) {
    this.log.info('%s: volume changed from %d to %d', this.name, this.volume, volume)
    this.volume = volume
    this.service.updateCharacteristic(this.platform.characteristic, this.volume)
  }
  if (track && track !== this.currentTrack) {
    this.log.info('%s: track changed from "%s" to "%s"', this.name, this.currentTrack, track)
    this.currentTrack = track
    this.service.updateCharacteristic(Characteristic.CurrentTrack, this.currentTrack)
  }
}

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setOn = function (on, callback) {
  on = !!on // coerce to boolean as Eve app uses 1 and 0
  if (this.on === on) {
    // On updated from MusicAccessory - we're good.
    callback()
    return
  }
  this.log.info('%s: set on from %s to %s', this.name, this.on, on)
  this.platform.script.setOn(this.id, on, this.currentTrack).then((obj) => {
    if (!obj || obj.on !== on) {
      this.log.error('%s: could not set on to %s', this.name, on)
      callback(new Error())
      return
    }
    this.on = obj.on
    callback()
  })
}

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setVolume = function (volume, callback) {
  if (this.volume === volume) {
    // Volume updated from MusicAccessory - we're good.
    callback()
    return
  }
  this.log.info('%s: set volume from %d to %d', this.name, this.volume, volume)
  this.platform.script.setVolume(this.id, volume).then((obj) => {
    if (!obj || obj.volume !== volume) {
      this.log.error('%s: could not set volume to %s', this.name, volume)
      callback(new Error())
      return
    }
    this.volume = obj.volume
    callback()
  })
}

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setChangeTrack = function (change, callback) {
  if (!change || change === this.changeTrack) {
    callback()
    return
  }
  this.changeTrack = change
  change = (change > 0)
  const direction = change ? 'next' : 'previous'
  this.log.info('%s: %s track', this.name, direction)
  this.platform.script.changeTrack(change).then((obj) => {
    if (!obj) {
      this.log.error('%s: could not change track', this.name)
      callback(new Error())
      return
    }
    if (obj.on !== this.on) {
      this.log.info(
        '%s: %s track: on changed from %s to %s', this.name,
        direction, this.on, obj.on
      )
      this.on = obj.on
      this.service.updateCharacteristic(Characteristic.On, this.on)
    }
    if (obj.track && obj.track !== this.currentTrack) {
      this.log.info(
        '%s: %s track: current track changed from "%s" to "%s"',
        this.name, direction, this.currentTrack, obj.track
      )
      this.currentTrack = obj.track
      this.service.updateCharacteristic(Characteristic.CurrentTrack, this.currentTrack)
    }
    setTimeout(() => {
      this.log.info('%s: reset', this.name)
      this.changeTrack = 0
      this.service
        .updateCharacteristic(Characteristic.ChangeTrack, this.changeTrack)
    }, 500)
    callback()
  })
}
