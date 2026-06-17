CARGO=cargo
BUILD_DIR=target/release
BINARY=browserverless

.PHONY: all build clean test format lint run start

all: format lint test build

build:
	$(CARGO) build --release

clean:
	$(CARGO) clean

format:
	$(CARGO) fmt

lint:
	$(CARGO) clippy -- -D warnings || true

test:
	$(CARGO) test

run:
	./$(BUILD_DIR)/$(BINARY)
