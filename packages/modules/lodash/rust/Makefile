# Makefile for building Rust lodash package

WASM_PACK := $(shell command -v wasm-pack 2> /dev/null)

.PHONY: all build wasm test clean check-wasm

all: build wasm

build:
	cargo build

wasm: check-wasm
	wasm-pack build --target web

test:
	cargo test

clean:
	cargo clean
	rm -rf pkg

check-wasm:
ifndef WASM_PACK
	$(error "wasm-pack is not installed. Please install it via 'curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh' or 'cargo install wasm-pack'")
endif
