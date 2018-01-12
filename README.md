# homebridge-music

## Homebridge plugin for iTunes with Airplay
Copyright © 2016-2018 Erik Baauw. All rights reserved.

This [homebridge](https://github.com/nfarina/homebridge) plugin exposes iTunes controls to Apple's [HomeKit](http://www.apple.com/ios/home/).  It provides the following features
- HomeKit support for controlling iTunes, EyeTV, or other music/media players on macOS:
  - On/Off control;
  - Volume control;
  - View current track/channel;
- HomeKit support for controlling AirPlay or AirFoil speakers from macOS:
  - On/Off control;
  - Volume control;
- Provides AppleScript framework to support other players.

Note: this is my old, never before published, plugin from 2016 I used to control my music, before moving to Sonos and homebridge-zp.

### Prerequisites
To interact with HomeKit, you need Siri or a HomeKit app on an iPhone, Apple Watch, iPad, iPod Touch, or Apple TV (4th generation or later).  I recommend using the latest OS versions: iOS 11.2.1, watchOS 4.2, and tvOS 11.2.1.  
Please note that Siri and even Apple's [Home](https://support.apple.com/en-us/HT204893) app still provide only limited HomeKit support.  To use the full features of homebridge-hue, you might want to check out some other HomeKit apps, like Elgato's [Eve](https://www.elgato.com/en/eve/eve-app) app (free) or Matthias Hochgatterer's [Home](http://selfcoded.com/home/) app (paid).  
For HomeKit automation, you need to setup an Apple TV (4th generation later) or iPad as [Home Hub](https://support.apple.com/en-us/HT207057).

homebridge-music only runs on macOS, because it uses AppleScript.

### Installation
The homebridge-music plugin obviously needs homebridge, which, in turn needs Node.js.  I've followed these steps to set it up on my macOS server:

- Install the Node.js JavaScript runtime `node`, from its [website](https://nodejs.org).  I'm using v8.9.4 LTS for macOS (x64).  This includes the `npm` package manager;
- Make sure `/usr/local/bin` is in your `$PATH`, as `node`, `npm`, and, later, `homebridge` install there;
- You might want to update `npm` through `sudo npm -g update npm@latest`;
- Install homebridge v0.4.33 through `sudo npm -g install homebridge@0.4.33 --unsafe-perm`.  Then follow the instructions on [GitHub](https://github.com/nfarina/homebridge#installation) to create a `config.json` in `~/.homebridge`, as described;
- [Still in test] Install the homebridge-music plugin through `sudo npm -g install homebridge-music@latest`;

Once homebridge is up and running with the homebridge-music plugin, you might want to daemonise it and start it automatically on login or system boot.  See the [homebridge Wiki](https://github.com/nfarina/homebridge/wiki) for more info how to do that on MacOS.

### Configuration
In homebridge's `config.json` you need to specify a platform for homebridge-music:
```json
  "platforms": [
    {
      "platform": "Music"
    }
  ]
```
The following optional parameters can be added to modify homebridge-music's behaviour:

Key | Default | Description
--- | ------- | -----------
`service` | `"switch"` | Defines what type of service and volume characteristic homebridge-zp uses.  Possible values are: `"switch"` for `Switch` and `Volume`; `"speaker"` for `Speaker` and `Volume`; `"light"` for `LightBulb` and `Brightness`; and `"fan"` for `Fan` and `Rotation Speed`.  Selecting `"light"` or `"fan"` enables changing the Sonos volume from Siri and from the iOS built-in Home app.  Selecting `"speaker"` is not supported by the Apple's Home app.
`brightness` | `false` | Flag whether to expose volume as `Brightness` in combination with `Switch` or `Speaker`.  Setting this flag enables volume control from Siri.
`script` | `"iTunes"` | Name of the AppleCcript library to communicate to a player.<br> Other possible values: 'Airfoil', 'EyeTV', or any user-provided applescript library.
`speakername` | `".*"` _(any)_ | Regular expression to be used as filter for speaker names.
`track` | | Name of the track for the player to start.
`heartrate` | 5 |	Heartbeat interval in seconds.  Player and speaker states are refreshed every heartrate seconds.

### Adding Support for Other players
Interaction with music player and speakers is through an AppleScript library, that provides the following functions to homebridge-music:

Function | Schema | Description
--- | ------- | -----------
`getMusicState()` | `GetState` | Gets player and speaker states.
`setPlayerOn(on, track)` | `SetOn` |	Switches Player On/Off.
`changeTrack(next)` | `SetOn` | Sets next/previous track.
`setPlayerVolume(vol)` | `SetVolume` | Sets Player Volume.
`setSpeakerOn(id, on)` | `SetOn` | Switches Speaker On/Off.
`setSpeakerVolume(id, vol)` | `SetVolume` | Sets Speaker Volume.

These functions return a JSON string that conforms to the corresponding schema in `./lib`.  To check for valid schemas, see http://jsonschemalint.com/.

### Caveats
The homebridge-music plugin is a hobby project of mine, provided as-is, with no warranty whatsoever.  I had been running it successfully at my home for years, but your mileage might vary.  Please report any issues on [GitHub](https://github.com/ebaauw/homebridge-music/issues).

Homebridge is a great platform, but not really intended for consumers, as it requires command-line interaction.

HomeKit is still relatively new, and Apple's [Home](https://support.apple.com/en-us/HT204893) app provides only limited support.  You might want to check out some other HomeKit apps, like Elgato's [Eve](https://www.elgato.com/en/eve/eve-app) (free), Matthias Hochgatterer's [Home](http://selfcoded.com/home/) (paid), or, if you use `Xcode`, Apple's [HMCatalog](https://developer.apple.com/library/content/samplecode/HomeKitCatalog/Introduction/Intro.html#//apple_ref/doc/uid/TP40015048-Intro-DontLinkElementID_2) example app.

The HomeKit terminology needs some getting used to.  An _accessory_ more or less corresponds to a physical device, accessible from your iOS device over WiFi or Bluetooth.  A _bridge_ (like homebridge) provides access to multiple bridged accessories.  An accessory might provide multiple _services_.  Each service corresponds to a virtual device (like a lightbulb, switch, motion sensor, ...).  There is also an accessory information service.  Siri interacts with services, not with accessories.  A service contains one or more _characteristics_.  A characteristic is like a service attribute, which might be read or written by HomeKit apps.  You might want to checkout Apple's [HomeKit Accessory Simulator](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/HomeKitDeveloperGuide/TestingYourHomeKitApp/TestingYourHomeKitApp.html), which is distributed as an additional tool for `Xcode`.
