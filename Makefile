.PHONY: all clean lint test

all:
	babel --copy-files --out-dir lib/ src/
	tiddlywiki ./lib --verbose --build

clean:
	$(RM) index.html
	$(RM) -r lib/

lint:
	eslint src/ test/

test:
	jest --env=node --coverage test
