# Makefile
# (C) 2016, Erik Baauw

%.scpt: %.applescript
	osacompile -o ../lib/$@ $<

SCRIPTS = iTunes.scpt Airfoil.scpt EyeTV.scpt

all:	$(SCRIPTS)
