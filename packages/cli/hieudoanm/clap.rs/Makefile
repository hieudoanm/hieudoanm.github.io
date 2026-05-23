.PHONY: clean format lint test build build-all install help coverage

BIN_DIR  := bin
BIN_NAME := hieudoanm

VERSION      := $(shell date +%Y.%m.%d.%H.%M.%S)
COMMIT       := $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
FULL_VERSION := $(VERSION)-$(COMMIT)

# Targets for cross-compilation (used by build-all)
PLATFORMS := linux/amd64 linux/arm64 darwin/amd64 darwin/arm64

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

## test: Run tests without coverage (faster)
test:
	cargo test

## coverage: Generate HTML coverage report
coverage:
	cargo llvm-cov --html
	@echo ""
	@echo "📊 Coverage report: file://$$(pwd)/target/llvm-cov/html/index.html"

## build: Format, lint, then compile binary into ./bin
build: clean format lint
	@mkdir -p $(BIN_DIR)
	@VERSION=$(FULL_VERSION) cargo build --release
	@cp target/release/$(BIN_NAME) $(BIN_DIR)/$(BIN_NAME)
	@echo "✅ Binary:  $$(pwd)/$(BIN_DIR)/$(BIN_NAME)"
	@echo "📦 Version: $(FULL_VERSION)"
	@echo "📏 Size:    $$(du -h $(BIN_DIR)/$(BIN_NAME) | cut -f1)"

## build-all: Cross-compile for all platforms (zig cc for cross, system for native)
build-all: clean format lint
	@mkdir -p $(BIN_DIR)
	@for p in $(PLATFORMS); do \
		os=$${p%/*}; arch=$${p#*/}; \
		ext=; [ $$os = windows ] && ext=.exe; \
		case "$$os/$$arch" in \
			darwin/amd64)  target="x86_64-apple-darwin" ;; \
			darwin/arm64)  target="aarch64-apple-darwin" ;; \
			linux/amd64)   target="x86_64-unknown-linux-gnu" ;; \
			linux/arm64)   target="aarch64-unknown-linux-gnu" ;; \
		esac; \
		printf "  %s/%s... " $$os $$arch; \
		rustup target add $$target >/dev/null 2>&1; \
		za=$${arch}; [ "$$za" = "amd64" ] && za="x86_64"; [ "$$za" = "arm64" ] && za="aarch64"; \
		if [ "$$os" = "$(shell uname -s | tr A-Z a-z)" ]; then \
			VERSION=$(FULL_VERSION) cargo build --release --target $$target && \
			cp target/$$target/release/$(BIN_NAME)$$ext $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext && echo "ok"; \
		else \
			mkdir -p $(BIN_DIR)/.cargo-wrappers; \
			case "$$target" in \
				*-pc-windows-gnu) pref="$${za}-w64-mingw32";; \
				*-unknown-linux-gnu) pref="$${za}-linux-gnu";; \
				*) pref="";; \
			esac; \
			for t in dlltool ar ranlib strip objcopy nm; do \
				if [ -n "$$pref" ] && [ ! -x $(BIN_DIR)/.cargo-wrappers/$${pref}-$$t ]; then \
					printf '#!/bin/sh\nexec zig %s "$$@"\n' "$$t" > $(BIN_DIR)/.cargo-wrappers/$${pref}-$$t; \
					chmod +x $(BIN_DIR)/.cargo-wrappers/$${pref}-$$t; \
				fi; \
			done; \
			linker_name="CARGO_TARGET_$$(echo $$target | tr '[:lower:]-' '[:upper:]_')_LINKER"; \
			env "$$linker_name=zig cc -target $${za}-$${os}" \
				CC="zig cc -target $${za}-$${os}" \
				AR="zig ar" \
				RANLIB="zig ranlib" \
				PATH="$(BIN_DIR)/.cargo-wrappers:$$PATH" \
				VERSION=$(FULL_VERSION) \
				cargo build --release --target $$target && \
			cp target/$$target/release/$(BIN_NAME)$$ext $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext && echo "ok"; \
		fi \
	done
	@echo "Binaries in $(BIN_DIR)/:"
	@ls -1 $(BIN_DIR)/

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
