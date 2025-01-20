// homebridge-music/lib/Script.js
// Copyright © 2016-2025 Erik Baauw. All rights reserved.
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

import { createRequire } from 'node:module'
import { resolve } from 'node:path'

import applescript from 'applescript'

const require = createRequire(import.meta.url)

const validator = require('is-my-json-valid/require')

const validateGetState = validator('GetState')
const validateSetOn = validator('SetOn')
const validateSetVolume = validator('SetVolume')

class Script {
  constructor (platform, lib) {
    this.log = platform.log
    this.timeout = platform.timeout * 1000
    lib = resolve(import.meta.dirname, `../scripts/${lib}.scpt`)
    this.template = `set lib to (load script "${lib}")\ntell lib to `
  }

  async getState (initial) {
    return this.runScript(`getState(${initial})`, validateGetState)
  }

  async setOn (id, on, track) {
    let s
    if (id) {
      s = `setSpeakerOn("${id}", ${on})`
    } else {
      s = `setPlayerOn(${on}, "${track}")`
    }
    return this.runScript(s, validateSetOn)
  }

  async setVolume (id, vol) {
    let s
    if (id) {
      s = `setSpeakerVolume("${id}", ${vol})`
    } else {
      s = `setPlayerVolume(${vol})`
    }
    return this.runScript(s, validateSetVolume)
  }

  async changeTrack (next) {
    return this.runScript(`changeTrack(${next})`, validateSetOn)
  }

  // Run the Applescript, catching any errors so homebrigde won't crash on a bad
  // user-provided Applescript library.
  async runScript (s, validate) {
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
        if (!result) {
          this.log.debug('applescript: %s => %j', s, result)
          return resolve()
        }
        let obj
        try {
          obj = JSON.parse(result)
        } catch (error) {
          this.log.warn('applescript %s: invalid json: %s', s, error.message)
          this.log.warn('            command: %s', script)
          this.log.warn('            result: "%s"', result)
          return resolve()
        }
        if (!validate(obj, { greedy: true })) {
          this.log.warn('applescript %s: invalid result %s', s, validate.errors)
          this.log.warn('            command: %s', script)
          this.log.warn('            result: %j', obj)
          return resolve()
        }
        this.log.debug('applescript: %s => %j', s, obj)
        resolve(obj)
      })
    })
  }
}

export { Script }
