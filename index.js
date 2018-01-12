// homebridge-zp/index.js
// Copyright © 2016-2018 Erik Baauw. All rights reserved.
//
// Homebridge plugin for iTunes with Airplay speakers.

'use strict';

const MusicPlatformModule = require('./lib/MusicPlatform');
const MusicPlatform = MusicPlatformModule.MusicPlatform;

module.exports = (homebridge) => {
  MusicPlatformModule.setHomebridge(homebridge);
  homebridge.registerPlatform('homebridge-music', 'Music', MusicPlatform);
};
