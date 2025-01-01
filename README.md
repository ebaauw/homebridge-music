<p align="center">
  <img src="homebridge-music.png" height="200px">  
</p>
<span align="center">

# Homebridge Music
[![Downloads](https://img.shields.io/npm/dt/homebridge-music.svg)](https://www.npmjs.com/package/homebridge-music)
[![Version](https://img.shields.io/npm/v/homebridge-music.svg)](https://www.npmjs.com/package/homebridge-music)
[![Homebridge Discord](https://img.shields.io/discord/432663330281226270?color=728ED5&logo=discord&label=discord)](https://discord.gg/SpMcwN5)
[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)

[![GitHub issues](https://img.shields.io/github/issues/ebaauw/homebridge-music)](https://github.com/ebaauw/homebridge-music/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ebaauw/homebridge-music)](https://github.com/ebaauw/homebridge-music/pulls)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

</span>

## Homebridge plugin for iTunes with Airplay speakers
Copyright © 2016-2025 Erik Baauw. All rights reserved.

This [homebridge](https://github.com/homebridge/homebridge) plugin exposes controls to Apple's [HomeKit](http://www.apple.com/ios/home/) for a music player, like iTunes/Music or EyeTV, running on macOS.  It provides the following features:
- HomeKit support for controlling iTunes (Music as of macOS 10.15 Catalina) or [EyeTV](https://www.geniatech.eu/):
  - On/Off control;
  - Volume control;
  - Previous/Next track/channel;
  - View current track/channel;
- HomeKit support for controlling AirPlay speakers connected to iTunes/Music on macOS:
  - On/Off control;
  - Volume control;
- HomeKit control for [Airfoil](https://rogueamoeba.com/airfoil/)-connected speakers:
  - On/Off control;
  - Volume control;
- Provides an AppleScript framework to support other players.

Note: this is my old plugin from 2016 that I used to control my music, before moving to Sonos and [Homebridge ZP](https://github.com/ebaauw/homebridge-zp).

### Prerequisites
You need a macOS system to run Homebridge Music.
AppleScript is used to communicate with iTunes/Music, EyeTV, or another music player, and that only runs on macOS.

To interact with HomeKit, you need Siri or a HomeKit app on an iPhone, Apple Watch, iPad, iPod Touch, or Apple TV (4th generation or later).
I recommend to use the latest released versions of iOS, watchOS, and tvOS.  
Please note that Siri and even Apple's [Home](https://support.apple.com/en-us/HT204893) app still provide only limited HomeKit support.
To use the full features of Homebridge Music, you might want to check out some other HomeKit apps, like the [Eve](https://www.evehome.com/en/eve-app) app (free) or Matthias Hochgatterer's [Home+](https://hochgatterer.me/home/) app (paid).

As HomeKit uses Bonjour to discover Homebridge, the server running Homebridge must be on the same subnet as your iDevices running HomeKit.
For remote access and for HomeKit automations, you need to setup an Apple TV (4th generation or later), HomePod, or iPad as [home hub](https://support.apple.com/en-us/HT207057).

### Player and Speakers
Homebridge Music creates an accessory *Music* for the player.
By default, this accessory contains a single `ÂSwitch` service, with the same name as the accessory.
In addition to the standard `On` characteristic for play/pause control, additional characteristics are provided for `Volume`, `Change Track`, and `Current Track` (read-only).

For each AirPlay or Airfoil speaker, Homebridge Music creates an additional accessory, named after the speaker.
By default, these accessory contain a single `Switch` service, with the same name as the accessory.
In addition to the standard `One` characteristic for play/pause control, an additional characteristic is provided for `Volume`.

Note that neither Siri nor the Apple's Home app support `Volume`, even thought this is a standard HomeKit characteristic.
Because of this, the type of the service, as well as the type of characteristic used for volume can be changed from `config.json`, see [**Configuration**](#configuration) and [Homebridge ZP issue #10](https://github.com/ebaauw/homebridge-zp/issues/10).

### Installation
To install Homebridge Music:
- Follow the instructions on the [Homebridge Wiki](https://github.com/homebridge/homebridge/wiki) to install Node.js and Homebridge on a macOS system;
- Install the Homebridge Music plugin through Homebridge Config UI X or manually by:
  ```
  $ sudo npm -g i homebridge-music
  ```
- Edit `config.json` and add the `Music` platform provided by Homebridge Music, see [**Configuration**](#configuration).

### Configuration
In Homebridge's `config.json` you need to specify a platform for Homebridge Music:
```json
  "platforms": [
    {
      "platform": "Music"
    }
  ]
```
The following optional parameters can be added to modify Homebridge Music's behaviour:

Key | Default | Description
--- | ------- | -----------
`service` | `"switch"` | Defines what type of service and volume characteristic Homebridge Music uses.<br>Possible values are: `"switch"` for `Switch` and `Volume`; `"speaker"` for `Speaker` and `Volume`; `"light"` for `LightBulb` and `Brightness`; and `"fan"` for `Fan` and `Rotation Speed`.<br>Selecting `"light"` or `"fan"` enables changing the volume from Siri and from Apple's Home app.<br>Selecting `"speaker"` is not supported by the Apple's Home app.
`brightness` | `false` | Flag whether to expose volume as `Brightness` in combination with `Switch` or `Speaker`.<br>Setting this flag enables volume control from Siri.
`script` | `"iTunes"`<br>`"Music"`| Name of the AppleScript library to interact with the player and speakers.<br>The default depends on the macOS version, see [**AppleScript**](#applescript).
`speakername` | `".*"` _(any)_ | Regular expression to be used as filter for speaker names.
`track` | `""` _(none)_ | Name of the track for the player to start.<br>Note that iTunes and Music will report an error when trying to Play when no current track has been set.  You might want to change the default when starting iTunes or Music from Homebridge Music.
`resetTrack` | `false` | Reset current track to default track on stop.
`heartrate` | 5 |	Heartbeat interval in seconds.<br>Player and speaker states are refreshed every heartrate seconds.
`timeout` | 5 | Timeout in seconds for AppleScript commands.<br>Increase this when seeing timeout error in the log.  Note that HomeKit apps are blocked while the command to apply changed characteristics runs.

### AppleScript
Homebridge Music interacts with the music player and speakers is through AppleScript.
Each player/speaker combination has an associated AppleScript file in `/usr/local/lib/node_modules/homebridge-music/scripts`.

Homebridge Music ships with the following scripts:

Script           | Player | Speakers | macOS
---------------- | -------| -------- | -----------
`iTunes`         | iTunes | iTunes AirPlay speakers | < 10.15 Catalina
`Music`          | Music  | Music AirPlay speakers | >= 10.15 Catalina
`iTunes-Airfoil` | iTunes | [Airfoil](https://www.rogueamoeba.com/airfoil) | < 10.15 Catalina
`Music-Airfoil`  | Music  | [Airfoil](https://www.rogueamoeba.com/airfoil) | >= 10.15 Catalina
`EyeTV-Airfoil`  | [EyeTV v3](https://www.geniatech.eu/product/eyetv-3/)* | [Airfoil](https://www.rogueamoeba.com/airfoil) | < 10.15 Catalina
_n/a_            | [EyeTV v4](https://www.geniatech.eu/product/eyetv-4/)* | [Airfoil](https://www.rogueamoeba.com/airfoil) | n/a

\*) EyeTV v3 is a 32-bit application, which are no longer supported on macOS 10.15 Catalina.<br>
\*) EyeTV v4 is a 64-bit application and runs on Catalina,
but it (currently?) lacks proper AppleScript support,
see issue [#14](https://github.com/ebaauw/homebridge-music/issues/14).

Each script provides the following functions to Homebridge Music:

Function | Schema | Description
--- | ------- | -----------
`getState(initial)` | `GetState` | Gets player and speaker states.
`setPlayerOn(on, track)` | `SetOn` |	Switches Player On/Off.
`changeTrack(next)` | `SetOn` | Sets next/previous track.
`setPlayerVolume(vol)` | `SetVolume` | Sets Player Volume.
`setSpeakerOn(id, on)` | `SetOn` | Switches Speaker On/Off.
`setSpeakerVolume(id, vol)` | `SetVolume` | Sets Speaker Volume.

These functions return a JSON string that conforms to the corresponding schema in `/usr/local/lib/node_modules/homebridge-music/lib`.

You can add your own script to support your favourite music player.
To verify whether your script returns valid responses, you might want to use [JSON Schema Lint](http://jsonschemalint.com/).

### Caveats
Homebridge Music is a hobby project of mine, provided as-is, with no warranty whatsoever.  I've been running it successfully at my home for years, but your mileage might vary.

The HomeKit terminology needs some getting used to.
An _accessory_ more or less corresponds to a physical device, accessible from your iOS device over WiFi or Bluetooth.
A _bridge_ (like Homebridge) is an accessory that provides access to other, bridged, accessories.
An accessory might provide multiple _services_.
Each service corresponds to a virtual device (like a lightbulb, switch, motion sensor, ..., but also: a programmable switch button, accessory information, battery status).
Siri interacts with services, not with accessories.
A service contains one or more _characteristics_.
A characteristic is like a service attribute, which might be read or written by HomeKit apps.
You might want to checkout Apple's [HomeKit Accessory Simulator](https://developer.apple.com/documentation/homekit/testing_your_app_with_the_homekit_accessory_simulator), which is distributed as an additional tool for `Xcode`.
