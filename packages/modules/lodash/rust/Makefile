WASM_PACK := $(shell command -v wasm-pack 2> /dev/null)

.PHONY: all build wasm test clean check-wasm

all: build wasm

build:
	cargo build --release

wasm: check-wasm
	wasm-pack build --target web

test:
	cargo test

format:
	cargo fmt

lint:
	cargo clippy -- -D warnings

clean:
	cargo clean
	rm -rf pkg

check-wasm:
ifndef WASM_PACK
	$(error "wasm-pack is not installed. Install via: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh")
endif
