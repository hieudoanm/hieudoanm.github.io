.PHONY: clean format lint test build build-all install coverage

COVERAGE_DIR := coverage

BIN_DIR  := bin
BIN_NAME := hieudoanm
SRC      := ./main.go
OWNER    := github.com/hieudoanm/jack

# Targets for cross-compilation (used by build-all)
PLATFORMS := linux/amd64 linux/arm64 darwin/amd64 darwin/arm64

VERSION      := $(shell date +%Y.%m.%d.%H.%M.%S)
COMMIT       := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
FULL_VERSION := $(VERSION)-$(COMMIT)
LDFLAGS      := -ldflags="-s -w \
	-X '$(OWNER)/src/cmd/version.V=$(FULL_VERSION)'"

## clean: Remove build artifacts and coverage
clean:
	@rm -rf $(BIN_DIR) $(COVERAGE_DIR)
	@echo "Cleaned $(BIN_DIR)/ and $(COVERAGE_DIR)/"

## format: Run go fmt
format:
	go fmt ./...

## lint: Run go vet
lint:
	go vet ./...

## test: Run tests with -short
test:
	go test ./... -short

## coverage: Run all tests with coverage report
coverage:
	@mkdir -p $(COVERAGE_DIR)
	go test -coverprofile=$(COVERAGE_DIR)/coverage.out -covermode=atomic ./...
	@go tool cover -html=$(COVERAGE_DIR)/coverage.out -o $(COVERAGE_DIR)/coverage.html
	@go tool cover -func=$(COVERAGE_DIR)/coverage.out | tail -1
	@echo "Coverage report: file://$(abspath $(COVERAGE_DIR))/coverage.html"

## build: Format, lint, test, then build native binary
build: clean format lint test
	@mkdir -p $(BIN_DIR)
	go build $(LDFLAGS) -o $(BIN_DIR)/$(BIN_NAME) $(SRC)
	@echo "Binary: $$(pwd)/$(BIN_DIR)/$(BIN_NAME)"
	@echo "Version: $(FULL_VERSION)"

## build-all: Cross-compile for all platforms (zig cc for cross, system for native)
build-all: clean format lint test
	@mkdir -p $(BIN_DIR)
	@for p in $(PLATFORMS); do \
		os=$${p%/*}; arch=$${p#*/}; \
		ext=; [ $$os = windows ] && ext=.exe; \
		za="$${arch}"; \
		[ "$${arch}" = "amd64" ] && za="x86_64"; \
		[ "$${arch}" = "arm64" ] && za="aarch64"; \
		zo="$${os}"; \
		[ "$${os}" = "darwin" ] && zo="macos"; \
		printf "  %s/%s... " $$os $$arch; \
		if [ "$$os" = "windows" ] && [ "$$os" != "$(shell go env GOOS)" ]; then \
			CGO_ENABLED=0 GOOS=$$os GOARCH=$$arch \
			go build $(LDFLAGS) -o $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext $(SRC) && echo "ok"; \
		elif [ "$$os" = "$(shell go env GOOS)" ]; then \
			CGO_ENABLED=1 GOOS=$$os GOARCH=$$arch \
			go build $(LDFLAGS) -o $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext $(SRC) && echo "ok"; \
		else \
			CC="zig cc -target $${za}-$${zo}" CGO_ENABLED=1 \
			GOOS=$$os GOARCH=$$arch \
			go build $(LDFLAGS) -o $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext $(SRC) && echo "ok"; \
		fi \
	done
	@echo "Binaries in $(BIN_DIR)/:"
	@ls -1 $(BIN_DIR)/

## install: Build and install native binary into ~/bin
install:
	@mkdir -p $(HOME)/bin
	go build $(LDFLAGS) -o $(HOME)/bin/$(BIN_NAME) $(SRC)
	chmod +x $(HOME)/bin/$(BIN_NAME)
	@echo "Installed to $$HOME/bin/$(BIN_NAME)"
	@echo "  Make sure $$HOME/bin is in your PATH:"
	@echo '  export PATH="$$HOME/bin:$$PATH"'

## help: List available targets
help:
	@grep -E '^## ' Makefile | sed 's/^## //'
