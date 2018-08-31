.PHONY: all clean lint test

SOURCES := $(wildcard doc/* src/*)


all: index.html

clean:
	$(RM) index.html
	$(RM) -r build/

index.html: $(SOURCES)
	mkdir -p build/
	cp -r doc/* build/
	tsc
	rsync -arv --exclude=*.ts src/ build/plugins/dnd
	tiddlywiki ./build --verbose --build

lint:
	eslint src/ test/

test:
	jest
