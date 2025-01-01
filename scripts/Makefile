# homebridge-music/scripts/Makefile
# Copyright © 2016-2025 Erik Baauw. All rights reserved.
#
# Homebridge plugin for iTunes with Airplay speakers.

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = iTunes.scpt iTunes-Airfoil.scpt EyeTV-Airfoil.scpt
SCRIPTS_CATALINA = Music.scpt Music-Airfoil.scpt

all:	$(SCRIPTS)

catalina: $(SCRIPTS_CATALINA)

clean:
	@rm -f $(SCRIPTS) $(SCRIPTS_CATALINA)
