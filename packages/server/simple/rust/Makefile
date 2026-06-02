CARGO=cargo
BUILD_DIR=target/release
BINARY=simple

.PHONY: all build clean test format lint

all: format lint test build

build:
	$(CARGO) build --release

test:
	$(CARGO) test

clean:
	$(CARGO) clean
	rm -f $(BINARY)

format:
	$(CARGO) fmt

lint:
	$(CARGO) clippy -- -D warnings 2>/dev/null || true

run: build
	./$(BUILD_DIR)/$(BINARY)
