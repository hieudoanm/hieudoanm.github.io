WASM_DIR := wasm
GO_WASM_EXEC := $(shell go env GOROOT)/lib/wasm/wasm_exec.js

format:
	go fmt ./core/...

vet:
	go vet ./core/...

wasm: mkwasmdir
	GOOS=js GOARCH=wasm go build -o $(WASM_DIR)/chess.wasm .

wasm-wasi: mkwasmdir
	GOOS=wasip1 GOARCH=wasm go build -o $(WASM_DIR)/chess.wasi.wasm .

wasm-size: wasm
	ls -lh $(WASM_DIR)/chess.wasm

mkwasmdir:
	mkdir -p $(WASM_DIR)

clean:
	rm -rf $(WASM_DIR)

.PHONY: format vet wasm wasm-wasi wasm-size mkwasmdir clean
