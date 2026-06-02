GO=go
BUILD_DIR=bin
BINARY=simplebase

.PHONY: all build clean test format lint tidy

all: format lint test build

build:
	mkdir -p $(BUILD_DIR)
	CGO_ENABLED=0 $(GO) build -o $(BUILD_DIR)/$(BINARY) ./src

test:
	$(GO) test ./... -v -count=1

clean:
	rm -rf $(BUILD_DIR)

format:
	$(GO) fmt ./...

lint:
	$(GO) vet ./...

tidy:
	$(GO) mod tidy
