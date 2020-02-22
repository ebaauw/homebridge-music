// homebridge-music/lib/Script.js
// Copyright © 2016-2020 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

// Applescript handler.
//
// Interaction with music player and speakers is through an AppleScript library, that
// provides the following functions:
//   getState(initial)          Gets player and speaker states (schema: GetState).
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
const validator = require('is-my-json-valid/require')

const validateGetState = validator('GetState')
const validateSetOn = validator('SetOn')
const validateSetVolume = validator('SetVolume')

function Script (platform, lib) {
  this.log = platform.log
  this.timeout = platform.timeout * 1000
  lib = path.normalize(`${__dirname}/../scripts/${lib}.scpt`)
  this.template = `set lib to (load script "${lib}")\ntell lib to `
}

Script.prototype.getState = async function (initial) {
  return this.runScript(`getState(${initial})`, validateGetState)
}

Script.prototype.setOn = async function (id, on, track) {
  let s
  if (id) {
    s = `setSpeakerOn("${id}", ${on})`
  } else {
    s = `setPlayerOn(${on}, "${track}")`
  }
  return this.runScript(s, validateSetOn)
}

Script.prototype.setVolume = async function (id, vol) {
  let s
  if (id) {
    s = `setSpeakerVolume("${id}", ${vol})`
  } else {
    s = `setPlayerVolume(${vol})`
  }
  return this.runScript(s, validateSetVolume)
}

Script.prototype.changeTrack = async function (next) {
  return this.runScript(`changeTrack(${next})`, validateSetOn)
}

// Run the Applescript, catching any errors so homebrigde won't crash on a bad
// user-provided Applescript library.
Script.prototype.runScript = function (s, validate) {
  return new Promise((resolve, reject) => {
    const script = this.template + s
    let timedOut = false
    const timeout = setTimeout(() => {
      timedOut = true
      this.log.warn('applescript %s: timeout', s)
      this.log.warn('            command: %s', script)
      return resolve()
    }, this.timeout)
    this.log.debug('applescript: %s', s)
    applescript.execString(script, (error, result) => {
      clearTimeout(timeout)
      if (timedOut) {
        return
      }
      if (error) {
        this.log.warn('applescript %s: %s', s, error.message)
        this.log.warn('            command: %s', script)
        return resolve()
      }
      let obj
      try {
        obj = JSON.parse(result)
      } catch (error) {
        this.log.warn('applescript %s: invalid json: %s', s, error.message)
        this.log.warn('            command: %s', script)
        this.log.warn('            result: %s', result)
        return resolve()
      }
      if (!validate(obj, { greedy: true })) {
        this.log.warn('applescript %s: invalid result %s', s, validate.errors)
        this.log.warn('            command: %s', script)
        this.log.warn('            result: %s', result)
        return resolve()
      }
      this.log.debug('applescript: %s => %s', s, result)
      resolve(obj)
    })
  })
}
