// homebridge-music/lib/Script.js
// (C) 2016, Erik Baauw
//
// Applescript handler.
//
// Interaction with music player and speakers is through an AppleScript library, that
// provides the following functions:
//   getMusicState()		Gets player and speaker states (schema: GetState).
//   setPlayerOn(on, track)	Switches Player On/Off (schema: SetOn).
//   changeTrack(next)		Sets next/previous track (schema SetOn).
//   setPlayerVolume(vol)	Sets Player Volume (schema: SetVolume).
//   setSpeakerOn(id, on)	Switches Speaker On/Off (schema: SetOn).
//   setSpeakerVolume(id, vol)	Sets Speaker Volume (schema: SetVolume).
//
// These functions return a JSON string that conforms to the corresponding schema.
// To check for valid schemas, see http://jsonschemalint.com/.

'use strict';

module.exports = {
  Script: Script
};

var applescript = require('applescript');
var util = require('util');
var validator = require('is-my-json-valid/require');

var validateGetState = validator('GetState');
var validateSetOn = validator('SetOn');
var validateSetVolume = validator('SetVolume');

function Script(log, lib) {
  this.log = log;
  this.template = util.format(
    'set lib to (load script "%s/%s.scpt")\ntell lib to ',
    __dirname, lib);
}

Script.prototype.getState = function(callback) {
  this.runScript('getState()', validateGetState, callback);
};

Script.prototype.setOn = function(id, on, track, callback) {
  let s;
  if (id) {
    s = util.format('setSpeakerOn("%s", %s)', id, on);
  } else {
    s = util.format('setPlayerOn(%s, "%s")', on, track);
  }
  this.runScript(s, validateSetOn, callback);
};

Script.prototype.setVolume = function(id, vol, callback) {
  let s;
  if (id) {
    s = util.format('setSpeakerVolume("%s", %d)', id, vol);
  } else {
    s = util.format('setPlayerVolume(%d)', vol);
  }
  this.runScript(s, validateSetVolume, callback);
};

Script.prototype.changeTrack = function(next, callback) {
  let s = util.format('changeTrack(%s)', next);
  this.runScript(s, validateSetOn, callback);
};

// Run the Applescript, catching any errors so homebrigde won't crash on a bad
// user-provided Applescript library.
Script.prototype.runScript = function(s, validate, callback) {
  let script = this.template + s;
  var timedOut = false;
  let timeout = setTimeout(function() {
    timedOut = true;
    this.log.error('applescript timeout');
    this.log.error('applescript: %s', script);
    callback(null);
  }.bind(this), 5000);
  applescript.execString(script, function(err, result) {
    clearTimeout(timeout);
    if (timedOut) {
      return;
    }
    if (err) {
      this.log.error('applescript error %s', err.message);
      this.log.error('applescript: %s', script);
      callback(null);
      return;
    }
    var obj;
    try {
      obj = JSON.parse(result);
    } catch(e) {
      this.log.error('applescript returned invalid json (%s)', e);
      this.log.error('applescript: %s', script);
      this.log.error('applescript result: %s', result);
      callback(null);
      return;
    }
    if (!validate(obj, {greedy: true})) {
      this.log.error('applescript returned invalid data', validate.errors);
      this.log.error('applescript: %s', script);
      this.log.error('applescript result: %s', result);
      callback(null);
      return;
    }
    this.log.debug('applescript: %s', script);
    this.log.debug('applescript result: %s', result);
    callback(obj);
  }.bind(this));
};
