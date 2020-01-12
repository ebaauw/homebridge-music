# homebridge-music/scripts/iTunes.applescript
# Copyright © 2016-2020 Erik Baauw. All rights reserved.
#
# Homebridge plugin for iTunes with Airplay speakers.
#
# Player: iTunes
# Speakers: iTunes Airplay devices

on getState()
	set sp to getSpeakerStates()
	tell application "iTunes"
		if player state is playing then
			set t to name of current track
		else
			set t to ""
		end if
		get "{\"on\":" & (player state is playing) & ",\"volume\":" & sound volume & ",\"track\":\"" & t & "\",\"speakers\":" & sp & "}"
	end tell
end getState

on setPlayerOn(o, t)
	tell application "iTunes"
		if o then
			play track t
			set mute to false
		else
			stop
		end if
		if player state is playing then
			set t to name of current track
		else
			# tell me to setAllSpeakersOff()
			set t to ""
		end if
		get "{\"on\":" & (player state is playing) & ",\"track\":\"" & t & "\"}"
	end tell
end setPlayerOn

on changeTrack(n)
	tell application "iTunes"
		if player state is playing then
			if n then
				next track
			else
				previous track
			end if
		end if
		if player state is playing then
			set t to name of current track
		else
			# tell me to setAllSpeakersOff()
			set t to ""
		end if
		get "{\"on\":" & (player state is playing) & ",\"track\":\"" & t & "\"}"
	end tell
end changeTrack

on setPlayerVolume(v)
	tell application "iTunes"
		set sound volume to v
		get "{\"volume\":" & sound volume & "}"
	end tell
end setPlayerVolume

on setSpeakerOn(sp, o)
	tell application "iTunes"
		set d to first AirPlay device whose name is sp
		if o then
			set selected of d to true
			delay 1.0
			set selected of first AirPlay device whose name is "Computer" to false
		else
			set selected of d to false
		end if
		get "{\"on\":" & selected of d & "}"
	end tell
end setSpeakerOn

on setSpeakerVolume(sp, v)
	tell application "iTunes"
		set d to first AirPlay device whose name is sp
		set sound volume of d to v
		get "{\"volume\":" & sound volume of d & "}"
	end tell
end setSpeakerVolume

on getSpeakerStates()
	set text item delimiters to ","
	tell application "iTunes"
		set sp to {}
		repeat with d in AirPlay devices
			# Don't use id of Airplay device, as this changes when iTunes is restarted
			copy "\"" & name of d & "\":{\"on\":" & active of d & ",\"volume\":" & sound volume of d & "}" to end of sp
		end repeat
		get "{" & sp & "}"
	end tell
end getSpeakerStates

# on setAllSpeakersOff()
# 	tell application "iTunes" to set selected of every AirPlay device to false
# end setAllSpeakersOff
