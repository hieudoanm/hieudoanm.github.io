BIN_DIR  ?= target/release
BIN_NAME ?= kevin
BINARY   ?= $(BIN_DIR)/$(BIN_NAME)

.PHONY: help all format lint test bench build build-gui install clean

help:
	@echo "kevin — Redis-style key/value store in Rust"
	@echo ""
	@echo "Targets:"
	@echo "  all        format + lint + test + build"
	@echo "  format     cargo fmt"
	@echo "  lint       cargo clippy --all-targets -- -D warnings"
	@echo "  test       cargo test --all-targets"
	@echo "  bench      cargo bench"
	@echo "  build      cargo build --release (CLI only)"
	@echo "  build-gui  cargo build --release --features gui"
	@echo "  install    cargo install --path ."
	@echo "  clean      cargo clean"

all: format lint test build

format:
	cargo fmt

lint:
	cargo clippy --all-targets -- -D warnings

test:
	cargo test --all-targets

bench:
	cargo bench

build:
	cargo build --release
	@echo "built $(BINARY)"

build-gui:
	cargo build --release --features gui
	@echo "built $(BINARY) with gui (run with --gui)"

install:
	cargo install --path .
	@echo "installed to $(HOME)/.cargo/bin/$(BIN_NAME)"

clean:
	cargo clean
