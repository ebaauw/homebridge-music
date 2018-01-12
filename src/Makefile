# homebridge-music/src/Makefile
# Copyright © 2016-2018 Erik Baauw. All rights reserved.

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = iTunes.scpt Airfoil.scpt EyeTV.scpt

all:	$(SCRIPTS)
	mv ${SCRIPTS} ../lib

clean:
	rm -f $(SCRIPTS)
