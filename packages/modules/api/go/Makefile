WASM_DIR := wasm
GO_WASM_EXEC := $(shell go env GOROOT)/lib/wasm/wasm_exec.js

format:
	go fmt ./...

lint:
	go vet ./...

test:
	go test ./core/...

wasm: mkwasmdir
	GOOS=js GOARCH=wasm go build -o $(WASM_DIR)/api.wasm .
	cp $(GO_WASM_EXEC) $(WASM_DIR)/wasm_exec.js

wasm-wasi: mkwasmdir
	GOOS=wasip1 GOARCH=wasm go build -o $(WASM_DIR)/api.wasi.wasm .

wasm-size: wasm
	ls -lh $(WASM_DIR)/api.wasm

mkwasmdir:
	mkdir -p $(WASM_DIR)

clean:
	rm -rf $(WASM_DIR)

.PHONY: format lint test wasm wasm-wasi wasm-size mkwasmdir clean
