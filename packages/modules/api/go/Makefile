WASM_DIR := wasm
COVERAGE_DIR := coverage
GO_WASM_EXEC := $(shell go env GOROOT)/lib/wasm/wasm_exec.js

.PHONY: format lint test wasm wasm-wasi wasm-size mkwasmdir clean coverage

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

## coverage: Run all core tests with coverage report
coverage:
	@mkdir -p $(COVERAGE_DIR)
	go test -coverprofile=$(COVERAGE_DIR)/coverage.out -covermode=atomic ./core/...
	@go tool cover -html=$(COVERAGE_DIR)/coverage.out -o $(COVERAGE_DIR)/coverage.html
	@go tool cover -func=$(COVERAGE_DIR)/coverage.out | tail -1
	@echo "Coverage report: file://$(abspath $(COVERAGE_DIR))/coverage.html"
