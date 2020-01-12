# homebridge-music/scripts/Makefile
# Copyright © 2016-2020 Erik Baauw. All rights reserved.
#
# Homebridge plugin for iTunes with Airplay speakers.

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = iTunes.scpt Airfoil.scpt EyeTV.scpt
SCRIPTS_CATALINA = Music.scpt Music-Airfoil.scpt

all:	$(SCRIPTS)

catalina: $(SCRIPTS_CATALINA)

clean:
	@rm -f $(SCRIPTS) $(SCRIPTS_CATALINA)
