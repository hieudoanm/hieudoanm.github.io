GO=go
BUILD_DIR=bin
BINARY=simple

.PHONY: all build clean test format lint tidy start docker-start

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

PORT ?= 8080

start: build
	PORT=$(PORT) ./bin/simple

docker-start:
	docker build -t simple-server .
	docker run --rm -p $(PORT):$(PORT) -e PORT=$(PORT) -v simple-data:/data simple-server
