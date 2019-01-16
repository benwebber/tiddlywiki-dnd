.PHONY: all clean lint test

SOURCES := $(shell find doc src)

all: index.html

clean:
	$(RM) index.html
	$(RM) -r build/

index.html: $(SOURCES)
	tsc --version
	tiddlywiki --version
	mkdir -p build/plugins/dnd
	cp -r doc/* build/
	cp -r src/* build/plugins/dnd/
	tsc
	tiddlywiki ./build --verbose --build

lint:
	tslint --format stylish --project .

test:
	tsc --version
	jest --version
	npm show ts-jest version
	jest
