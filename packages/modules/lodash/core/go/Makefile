WASM_DIR := wasm
COVERAGE_DIR := coverage
GO_WASM_EXEC := $(shell go env GOROOT)/lib/wasm/wasm_exec.js

.PHONY: format vet wasm wasm-wasi wasm-size mkwasmdir clean coverage

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

## coverage: Run all core tests with coverage report
coverage:
	@mkdir -p $(COVERAGE_DIR)
	go test -coverprofile=$(COVERAGE_DIR)/coverage.out -covermode=atomic ./core/...
	@go tool cover -html=$(COVERAGE_DIR)/coverage.out -o $(COVERAGE_DIR)/coverage.html
	@go tool cover -func=$(COVERAGE_DIR)/coverage.out | tail -1
	@echo "Coverage report: file://$(abspath $(COVERAGE_DIR))/coverage.html"
