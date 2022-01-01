# homebridge-music/scripts/Music.applescript
# Copyright © 2016-2022 Erik Baauw. All rights reserved.
#
# Homebridge plugin for iTunes with Airplay speakers.
#
# Player: Music
# Speakers: Music Airplay devices

on getState(i)
	if i or application "Music" is running then
		set sp to getSpeakerStates()
		tell application "Music"
			if player state is playing then
				set t to name of current track
			else
				set t to ""
			end if
			get "{\"on\":" & (player state is playing) & ",\"volume\":" & sound volume & ",\"track\":\"" & t & "\",\"speakers\":" & sp & "}"
		end tell
	else
		get "{\"on\":false,\"volume\":0,\"track\":\"\",\"speakers\":{\"Computer\":{\"on\":false,\"volume\":0}}}"
	end if
end getState

on setPlayerOn(o, t)
	tell application "Music"
		if o then
			if t starts with "itmss://" then
				open location t
			else
				play track t
			end if
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
	tell application "Music"
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
	tell application "Music"
		set sound volume to v
		get "{\"volume\":" & sound volume & "}"
	end tell
end setPlayerVolume

on setSpeakerOn(sp, o)
	tell application "Music"
		set d to first AirPlay device whose name is sp
		if o then
			set selected of d to true
			# delay 1.0
			# set selected of first AirPlay device whose name is "Computer" to false
		else
			set selected of d to false
		end if
		get "{\"on\":" & selected of d & "}"
	end tell
end setSpeakerOn

on setSpeakerVolume(sp, v)
	tell application "Music"
		set d to first AirPlay device whose name is sp
		set sound volume of d to v
		# get "{\"volume\":" & sound volume of d & "}"
		get "{\"volume\":" & v & "}"
	end tell
end setSpeakerVolume

on getSpeakerStates()
	set text item delimiters to ","
	tell application "Music"
		set sp to {}
		repeat with d in AirPlay devices
			# Don't use id of Airplay device, as this changes when iTunes is restarted
			copy "\"" & name of d & "\":{\"on\":" & selected of d & ",\"volume\":" & sound volume of d & "}" to end of sp
		end repeat
		get "{" & sp & "}"
	end tell
end getSpeakerStates

# on setAllSpeakersOff()
# 	tell application "Music" to set selected of every AirPlay device to false
# end setAllSpeakersOff
