# homebridge-music/Makefile
# (C) 2016, Erik Baauw

%.scpt: %.applescript
	osacompile -o $@ $<

SCRIPTS = src/iTunes.scpt src/Airfoil.scpt src/EyeTV.scpt

all:	$(SCRIPTS)
	mv src/*.scpt lib
	npm install

.PHONY:	clean distr
clean:
	rm -f .DS_Store lib/.DS_Store lib/*.scpt
	rm -fr node_modules
	xattr -cr .

distr:	clean
	(cd ..; tar cvzf homebridge-music.tar.gz ./homebridge-music)
