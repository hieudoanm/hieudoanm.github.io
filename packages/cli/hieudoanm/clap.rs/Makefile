.PHONY: clean format lint test build install help coverage

BIN_DIR  := bin
BIN_NAME := hieudoanm

VERSION      := $(shell date +%Y.%m.%d.%H.%M.%S)
COMMIT       := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
FULL_VERSION := $(VERSION)-$(COMMIT)

## clean: Remove build artifacts
clean:
	@cargo clean
	@rm -rf $(BIN_DIR)
	@echo "🧹 Cleaned $(BIN_DIR)/ and target/"

## format: Run cargo fmt
format:
	cargo fmt --all

## lint: Run cargo clippy
lint:
	cargo clippy -- -D warnings

## test: Run all tests with coverage
test:
	cargo llvm-cov

## test-fast: Run tests without coverage (faster)
test-fast:
	cargo test

## coverage: Generate HTML coverage report
coverage:
	cargo llvm-cov --html
	@echo ""
	@echo "📊 Coverage report: file://$$(pwd)/target/llvm-cov/html/index.html"

## build: Format, lint, then compile binary into ./bin
build: clean format lint test
	@mkdir -p $(BIN_DIR)
	@VERSION=$(FULL_VERSION) cargo build --release
	@cp target/release/$(BIN_NAME) $(BIN_DIR)/$(BIN_NAME)
	@echo "✅ Binary:  $$(pwd)/$(BIN_DIR)/$(BIN_NAME)"
	@echo "📦 Version: $(FULL_VERSION)"
	@echo "📏 Size:    $$(du -h $(BIN_DIR)/$(BIN_NAME) | cut -f1)"

## install: Build then install binary into ~/bin
install: build
	@mkdir -p $(HOME)/bin
	cp $(BIN_DIR)/$(BIN_NAME) $(HOME)/bin/
	chmod +x $(HOME)/bin/$(BIN_NAME)
	@echo "✅ Installed to $$HOME/bin/$(BIN_NAME)"
	@echo "   Make sure $$HOME/bin is in your PATH:"
	@echo '   export PATH="$$HOME/bin:$$PATH"'

## help: List available targets
help:
	@grep -E '^## ' Makefile | sed 's/^## //'
