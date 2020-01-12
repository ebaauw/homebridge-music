# homebridge-music/scripts/Makefile
# Copyright © 2016-2020 Erik Baauw. All rights reserved.
#
# Homebridge plugin for iTunes with Airplay speakers.

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = Music.scpt Airfoil.scpt EyeTV.scpt

all:	$(SCRIPTS)

clean:
	@rm -f $(SCRIPTS)
