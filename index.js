// homebridge-music/index.js
// (C) 2016, Erik Baauw
//
// 'Hey Siri, turn on the Living Room speakers!'
//
// Homebridge plug-in for playing music on your Mac and for streaming this music to your
// speakers over airplay or using Airfoil.
//
// This plug-in provides a homebridge platform, MusicPlatform, which controls a platform
// accessory, MusicAccessory, for the music player and one for each set of speakers.
// The player MusicAccessory controls playing state (on/off) and master volume (from 0%
// to 100%); the speaker MusicAccessory represents speaker state (on/off) and volume
// (from 0% to 100%).
//
// The actual communication with player and speakers is through an applescript library,
// served by Script.  Users can provide their own applescript libraries to support other
// players or means to connect to speakers.
//
// This plug-in has the following config parameters:
//   track:             Name of the track for the player to start.
//   script:		Name of the applescript library [default: 'iTunes'].
//			Other possible values: 'Airfoil', 'EyeTV', or any user-provided
//			applescript library.
//   speakername:	Regular expression to be used as filter for speaker names
//			[default: '.*' (any speaker name)].
//   heartrate:		Heartbeat interval in seconds [default: 5].
//			Player and speaker states are refreshed every heartrate seconds.

'use strict';

// Plug-in library modules.
var MusicAccessoryModule = require('./lib/MusicAccessory');
var MusicAccessory = MusicAccessoryModule.MusicAccessory;
var Script = require('./lib/Script').Script;

module.exports = function(homebridge) {
  // Link MusicAccessory module to homebridge.
  MusicAccessoryModule.setHomebridge(homebridge);

  // Link MusicPlatform plug-in to homebridge.
  homebridge.registerPlatform('homebridge-music', 'Music', MusicPlatform);
};

// Constructor for MusicPlatform.  Called by homebridge on load time.
function MusicPlatform(log, config, api) {
  this.log = log;
  this.musicAccessories = {};		// Map of platform accessories.

  // Plug-in configuration.
  this.name = config.name || 'Music';
  this.track = config.track || '';
  this.scriptName = config.script || 'iTunes';
  this.script = new Script(this.log, this.scriptName);
  this.speakerName = new RegExp(config.speakername || '.*');
  this.heartrate = config.heartrate || 5;
  this.heartrate *= 1000;

  // Link MusicAccessory module to MusicPlatform.
  MusicAccessoryModule.setPlatform(this);
}

// Called by homebridge to retrieve static list of MusicAccessories.
MusicPlatform.prototype.accessories = function(callback) {
  this.script.getState(function (obj) {
    this.accessoryList = [];
    if (obj) {
      let track = obj.track || this.track || '';
      this.musicAccessories[''] = new MusicAccessory('', this.name, obj.on, obj.volume, track);
      this.accessoryList.push(this.musicAccessories['']);
      for (let name in obj.speakers) {
      	if (name.match(this.speakerName)) {
      	  let o = obj.speakers[name];
      	  this.musicAccessories[name] = new MusicAccessory(name, name, o.on, o.volume);
                this.accessoryList.push(this.musicAccessories[name]);
      	}
      }
    }
    setInterval(function() {
      this.heartbeat();
    }.bind(this), this.heartrate);
    callback(this.accessoryList);
  }.bind(this));
};

// Refresh MusicAccessories on heartbeat.
MusicPlatform.prototype.heartbeat = function() {
  this.script.getState(function (obj) {
    if (obj) {
      // Check state for known MusicAcessories.
      for (let name in this.musicAccessories) {
        let a = this.musicAccessories[name];
        if (name) {
        // Speaker.
        let o = obj.speakers[name];
        if (o) {
          a.update(o.on, o.volume);
        }
            } else {
        // Player.
        a.update(obj.on, obj.volume, obj.track);
      }
      }
    }
  }.bind(this));
};
