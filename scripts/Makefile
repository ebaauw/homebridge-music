# homebridge-music/scripts/Makefile
# Copyright © 2016-2026 Erik Baauw. All rights reserved.
#
# Homebridge plugin for Apple Music with Airplay speakers.

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = iTunes.scpt iTunes-Airfoil.scpt EyeTV-Airfoil.scpt
SCRIPTS_CATALINA = Music.scpt Music-Airfoil.scpt

all:	$(SCRIPTS)

catalina: $(SCRIPTS_CATALINA)

clean:
	@rm -f $(SCRIPTS) $(SCRIPTS_CATALINA)
