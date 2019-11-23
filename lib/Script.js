// homebridge-music/lib/Script.js
// Copyright © 2016-2019 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

// Applescript handler.
//
// Interaction with music player and speakers is through an AppleScript library, that
// provides the following functions:
//   getMusicState()            Gets player and speaker states (schema: GetState).
//   setPlayerOn(on, track)     Switches Player On/Off (schema: SetOn).
//   changeTrack(next)          Sets next/previous track (schema SetOn).
//   setPlayerVolume(vol)       Sets Player Volume (schema: SetVolume).
//   setSpeakerOn(id, on)       Switches Speaker On/Off (schema: SetOn).
//   setSpeakerVolume(id, vol)  Sets Speaker Volume (schema: SetVolume).
//
// These functions return a JSON string that conforms to the corresponding schema.
// To check for valid schemas, see http://jsonschemalint.com/.

'use strict'

module.exports = {
  Script: Script
}

const applescript = require('applescript')
const path = require('path')
const util = require('util')
const validator = require('is-my-json-valid/require')

const validateGetState = validator('GetState')
const validateSetOn = validator('SetOn')
const validateSetVolume = validator('SetVolume')

function Script (platform, lib) {
  this.log = platform.log
  this.timeout = platform.timeout * 1000
  lib = path.normalize(util.format('%s/../scripts/%s.scpt', __dirname, lib))
  this.template = util.format(
    'set lib to (load script "%s")\ntell lib to ', lib
  )
}

Script.prototype.getState = function (callback) {
  this.runScript('getState()', validateGetState, callback)
}

Script.prototype.setOn = function (id, on, track, callback) {
  let s
  if (id) {
    s = util.format('setSpeakerOn("%s", %s)', id, on)
  } else {
    s = util.format('setPlayerOn(%s, "%s")', on, track)
  }
  this.runScript(s, validateSetOn, callback)
}

Script.prototype.setVolume = function (id, vol, callback) {
  let s
  if (id) {
    s = util.format('setSpeakerVolume("%s", %d)', id, vol)
  } else {
    s = util.format('setPlayerVolume(%d)', vol)
  }
  this.runScript(s, validateSetVolume, callback)
}

Script.prototype.changeTrack = function (next, callback) {
  const s = util.format('changeTrack(%s)', next)
  this.runScript(s, validateSetOn, callback)
}

// Run the Applescript, catching any errors so homebrigde won't crash on a bad
// user-provided Applescript library.
Script.prototype.runScript = function (s, validate, callback) {
  const script = this.template + s
  let timedOut = false
  const timeout = setTimeout(function () {
    timedOut = true
    this.log.error('applescript timeout')
    this.log.error('applescript: %s', script)
    callback(null)
  }.bind(this), this.timeout)
  applescript.execString(script, (err, result) => {
    clearTimeout(timeout)
    if (timedOut) {
      return
    }
    if (err) {
      this.log.error('applescript error %s', err.message)
      this.log.error('applescript: %s', script)
      callback(null)
      return
    }
    let obj
    try {
      obj = JSON.parse(result)
    } catch (e) {
      this.log.error('applescript returned invalid json (%s)', e)
      this.log.error('applescript: %s', script)
      this.log.error('applescript result: %s', result)
      callback(null)
      return
    }
    if (!validate(obj, { greedy: true })) {
      this.log.error('applescript returned invalid data', validate.errors)
      this.log.error('applescript: %s', script)
      this.log.error('applescript result: %s', result)
      callback(null)
      return
    }
    this.log.debug('applescript: %s', script)
    this.log.debug('applescript result: %s', result)
    callback(obj)
  })
}
