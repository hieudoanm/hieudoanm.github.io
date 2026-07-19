CARGO    ?= cargo
BIN_NAME ?= landify
BUILD_DIR ?= target/release
BINARY   ?= $(BUILD_DIR)/$(BIN_NAME)

.PHONY: help all format fmt-check lint test build build-gui coverage install clean

help:
	@echo "landify — build a landing page from YAML (Rust)"
	@echo ""
	@echo "Targets:"
	@echo "  all        format + lint + test + build"
	@echo "  format     cargo fmt"
	@echo "  fmt-check  cargo fmt --check (non-mutating, for CI)"
	@echo "  lint       cargo clippy -- -D warnings"
	@echo "  test       cargo test"
	@echo "  build      build $(BINARY)"
	@echo "  build-gui  build $(BINARY) with the slint studio (--features gui)"
	@echo "  coverage   generate HTML coverage report (needs cargo-llvm-cov)"
	@echo "  install    build and install to $(HOME)/bin"
	@echo "  clean      remove build artifacts"

all: format lint test build

format:
	$(CARGO) fmt

fmt-check:
	$(CARGO) fmt --check

lint:
	$(CARGO) clippy --all-targets -- -D warnings

test:
	$(CARGO) test

build:
	$(CARGO) build --release
	@echo "built $(BINARY)"

build-gui:
	$(CARGO) build --release --features gui
	@echo "built $(BINARY) (run: ./$(BINARY) studio)"

coverage:
	$(CARGO) llvm-cov --html
	@echo ""
	@echo "Coverage report: file://$(abspath $(BUILD_DIR))/llvm-cov/html/index.html"

install: build
	@mkdir -p $(HOME)/bin
	@cp $(BINARY) $(HOME)/bin/$(BIN_NAME)
	@echo "Installed to $(HOME)/bin/$(BIN_NAME)"

clean:
	$(CARGO) clean
	@rm -rf coverage index.html
