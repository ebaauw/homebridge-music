# homebridge-music/scripts/Music-Airfoil.applescript
# Copyright © 2016-2025 Erik Baauw. All rights reserved.
#
# Homebridge plugin for Music with Airplay speakers.
#
# Player: Music
# Speakers: Airfoil, see: https://www.rogueamoeba.com/airfoil

on getState(i)
	if i or application "Music" is running then
		set sp to getSpeakerStates()
		tell application "Music"
			if player state is playing then
				if i then
					tell me to setAudioSource("Music")
				end if
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
			tell me to setAudioSource("Music")
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
	tell application "Airfoil"
		set s to first speaker whose name is sp
		if o then
			connect to s
			delay 2.0
		else
			disconnect from s
		end if
		get "{\"on\":" & connected of s & "}"
	end tell
end setSpeakerOn

on setSpeakerVolume(sp, v)
	tell application "Airfoil"
		set s to first speaker whose name is sp
		set (volume of s) to v / 100
		get "{\"volume\":" & ((volume of s) * 100 as integer) & "}"
	end tell
end setSpeakerVolume

on getSpeakerStates()
	set text item delimiters to ","
	tell application "Airfoil"
		set sp to {}
		repeat with s in (every speaker)
			copy "\"" & name of s & "\":{\"on\":" & connected of s & ",\"volume\":" & ((volume of s) * 100 as integer) & "}" to end of sp
		end repeat
		get "{" & sp & "}"
	end tell
end getSpeakerStates

on setAudioSource(a)
	set p to (POSIX path of (path to application a))
	tell application "Airfoil"
		if name of current audio source is not a then
			set s to make new application source
			set application file of s to p
			set current audio source to s
		end if
	end tell
end setAudioSource

# on setAllSpeakersOff()
# 	tell application "Airfoil" to disconnect from every speaker
# end setAllSpeakersOff
