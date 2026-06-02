CARGO=cargo
BUILD_DIR=target/release
BINARY=simple

.PHONY: all build clean test format lint run start docker-start

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

PORT ?= 8080

start: build
	PORT=$(PORT) ./$(BUILD_DIR)/$(BINARY)

docker-start:
	docker build -t simple-server .
	docker run --rm -p $(PORT):$(PORT) -e PORT=$(PORT) -v simple-data:/data simple-server
