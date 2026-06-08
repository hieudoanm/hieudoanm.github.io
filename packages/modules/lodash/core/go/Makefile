WASM_DIR := wasm
GO_WASM_EXEC := $(shell go env GOROOT)/lib/wasm/wasm_exec.js

format:
	go fmt ./...

vet:
	go vet ./...

wasm: mkwasmdir
	GOOS=js GOARCH=wasm go build -o $(WASM_DIR)/lodash.wasm .
	cp $(GO_WASM_EXEC) $(WASM_DIR)/wasm_exec.js

wasm-wasi: mkwasmdir
	GOOS=wasip1 GOARCH=wasm go build -o $(WASM_DIR)/lodash.wasi.wasm .

wasm-size: wasm
	ls -lh $(WASM_DIR)/lodash.wasm

mkwasmdir:
	mkdir -p $(WASM_DIR)

clean:
	rm -rf $(WASM_DIR)

.PHONY: format vet wasm wasm-wasi wasm-size mkwasmdir clean
