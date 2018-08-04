.PHONY: all clean

all:
	babel --copy-files --out-dir lib/ src/
	tiddlywiki ./lib --verbose --build

clean:
	$(RM) index.html
	$(RM) -r lib/
