// homebridge-music/lib/MusicAccessory.js
// (C) 2016, Erik Baauw
//
// Provide MusicAccessory to MusicPlatform.

'use strict';

// Link this module to MusicPlatform.
module.exports = {
  setHomebridge: setHomebridge,
  setPlatform: setPlatform,
  MusicAccessory: MusicAccessory
};

// Link this module to homebridge.
var Accessory;
var Service;
var Characteristic;
var uuid;
var util = require('util');

function setHomebridge(homebridge) {
  Accessory = homebridge.platformAccessory;
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  uuid = homebridge.hap.uuid;

  // Custom homekit characteristic for name of current track.
  Characteristic.CurrentTrack = function() {
    Characteristic.call(this, 'Current Track', Characteristic.CurrentTrack.UUID);
    this.setProps({
      format: Characteristic.Formats.STRING,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  };
  util.inherits(Characteristic.CurrentTrack, Characteristic);
  Characteristic.CurrentTrack.UUID = '00000045-0000-1000-8000-656261617577';

  // Custom homekit characteristic for changing track.
  Characteristic.NextTrack = function() {
    Characteristic.call(this, 'Next Track', Characteristic.NextTrack.UUID);
    this.setProps({
      format: Characteristic.Formats.BOOL,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  };
  util.inherits(Characteristic.NextTrack, Characteristic);
  Characteristic.NextTrack.UUID = '00000147-0000-1000-8000-656261617577';
}

// Link this module to MusicPlatform.
var log;
var script;
var scriptName;

function setPlatform(platform) {
  log = platform.log;
  script = platform.script;
  scriptName = platform.scriptName;
}

// Constructor for MusicAccessory.
function MusicAccessory(id, name, on, volume, track) {
  // Setup MusicAccessory, creating or adopting homekit accessory where needed.
  this.id = id;
  this.name = name;
  this.uuid_base = name;
  this.on = on;
  this.volume = volume;
  this.currentTrack = track;
  this.nextTrack = false;

  this.infoService = new Service.AccessoryInformation();
  this.infoService
    .updateCharacteristic(Characteristic.Manufacturer, 'homebridge-music')
    .updateCharacteristic(Characteristic.Model, scriptName)
    .updateCharacteristic(Characteristic.SerialNumber, this.name);

  this.service = new Service.Switch(this.name);
  this.service.getCharacteristic(Characteristic.On)
    .updateValue(this.on)
    .on('set', this.setOn.bind(this));
  this.service.addOptionalCharacteristic(Characteristic.Volume);
  this.service.getCharacteristic(Characteristic.Volume)
    .updateValue(this.volume)
    .on('set', this.setVolume.bind(this));
  if (this.nextTrack != null) {
    this.service.addOptionalCharacteristic(Characteristic.CurrentTrack);
    this.service.getCharacteristic(Characteristic.CurrentTrack)
      .updateValue(this.currentTrack);
    this.service.addOptionalCharacteristic(Characteristic.Track);
    this.service.getCharacteristic(Characteristic.Track)
      .updateValue(this.nextTrack)
      .on('set', this.setTrack.bind(this));
  }
}

// Called by homebridge to initialise a static accessory.
MusicAccessory.prototype.getServices = function() {
  return [this.infoService, this.service];
};

// Called by heartbeat when state is refreshed to check/update MusicAccessory state.
MusicAccessory.prototype.update = function(on, volume, track) {
  if (on !== this.on) {
    log.info('%s: on changed from %s to %s', this.name, this.on, on);
    this.on = on;
    this.service.updateCharacteristic(Characteristic.On, this.on);
  }
  if (volume !== this.volume) {
    log.info('%s: volume changed from %d to %d', this.name, this.volume, volume);
    this.volume = volume;
    this.service.updateCharacteristic(Characteristic.Volume, this.volume);
  }
  if (track && track !== this.currentTrack) {
    log.info('%s: track changed from "%s" to "%s"', this.name, this.currentTrack, track);
    this.currentTrack = track;
    this.service.updateCharacteristic(Characteristic.CurrentTrack, this.currentTrack);
  }
};

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setOn = function(on, callback) {
  on = on ? true : false;	// coerce to boolean as Eve app uses 1 and 0
  if (this.on === on) {
    // On updated from MusicAccessory - we're good.
    callback();
    return;
  }
  log.info('%s: set on from %s to %s', this.name, this.on, on);
  script.setOn(this.id, on, this.currentTrack, (obj) => {
    if (!obj || obj.on !== on) {
      log.error('%s: could not set on to %s', this.name, on);
      callback(new Error());
      return;
    }
    this.on = obj.on;
    callback();
  });
};

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setVolume = function(volume, callback) {
  if (this.volume === volume) {
    // Volume updated from MusicAccessory - we're good.
    callback();
    return;
  }
  log.info('%s: set volume from %d to %d', this.name, this.volume, volume);
  script.setVolume(this.id, volume, (obj) => {
    if (!obj || obj.volume !== volume) {
      log.error('%s: could not set volume to %s', this.name, volume);
      callback(new Error());
      return;
    }
    this.volume = obj.volume;
    callback();
  });
};

// Called by homebridge when characteristic is changed from homekit.
MusicAccessory.prototype.setTrack = function(next, callback) {
  if (!next || next === this.nextTrack) {
    callback();
    return;
  }
  log.info('%s: next track', this.name);
  this.nextTrack = true;
  setTimeout(() => {
    log.info('%s: reset', this.name);
    this.nextTrack = false;
    this.service
      .updateCharacteristic(Characteristic.Track, this.nextTrack);
  }, 100);
  script.changeTrack(true, function(obj) {
    if (!obj) {
      log.error('%s: could not change track', this.name);
      callback(new Error());
      return;
    }
    if (obj.on !== this.on) {
      log.info('%s: next track: on changed from %s to %s',
                    this.name, this.on, obj.on);
      this.on = obj.on;
      this.service.updateCharacteristic(Characteristic.On, this.on);
    }
    if (obj.track && obj.track !== this.nextTrack) {
      log.info('%s: next track: track changed from "%s" to "%s"',
                    this.name, this.currentTrack, obj.track);
      this.currentTrack = obj.track;
      this.service.updateCharacteristic(Characteristic.CurrentTrack, this.currentTrack);
    }
    callback();
  }.bind(this));
};
