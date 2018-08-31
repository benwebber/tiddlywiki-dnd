.PHONY: all clean lint test

all:
	mkdir -p build/
	cp -r doc/* build/
	babel --copy-files --out-dir build/ src/
	tiddlywiki ./build --verbose --build

clean:
	$(RM) index.html
	$(RM) -r build/

lint:
	eslint src/ test/

test:
	jest
