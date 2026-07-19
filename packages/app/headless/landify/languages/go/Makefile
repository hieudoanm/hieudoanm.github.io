GO           ?= go
BIN_DIR      ?= bin
BIN_NAME     ?= landify
BINARY       ?= $(BIN_DIR)/$(BIN_NAME)
COVERAGE_DIR ?= coverage
PLATFORMS    := linux/amd64 linux/arm64 darwin/amd64 darwin/arm64

.PHONY: help all format lint test build build-gui build-all coverage clean tidy install

help:
	@echo "landify — build a landing page from YAML"
	@echo ""
	@echo "Targets:"
	@echo "  all        format + lint + test + build"
	@echo "  format     go fmt ./..."
	@echo "  lint       go vet ./..."
	@echo "  test       go test ./..."
	@echo "  build      build $(BINARY)"
	@echo "  build-gui  build $(BINARY)-gui (fyne studio, needs CGO)"
	@echo "  build-all  cross-compile for $(PLATFORMS) into $(BIN_DIR)"
	@echo "  coverage   generate HTML coverage report"
	@echo "  tidy       go mod tidy"
	@echo "  install    build and install to $(HOME)/bin"
	@echo "  clean      remove build artifacts"

all: format lint test build

format:
	$(GO) fmt ./...

lint:
	$(GO) vet ./...

test:
	$(GO) test ./...

build:
	@mkdir -p $(BIN_DIR)
	$(GO) build -o $(BINARY) .
	@echo "built $(BINARY)"

build-gui:
	@mkdir -p $(BIN_DIR)
	CGO_ENABLED=1 $(GO) build -tags gui -o $(BIN_DIR)/$(BIN_NAME)-gui .
	@echo "built $(BIN_DIR)/$(BIN_NAME)-gui (run: ./bin/$(BIN_NAME)-gui studio)"

build-all:
	@mkdir -p $(BIN_DIR)
	@for p in $(PLATFORMS); do \
		os=$${p%/*}; arch=$${p#*/}; \
		ext=; [ $$os = windows ] && ext=.exe; \
		printf "  %s/%s... " $$os $$arch; \
		GOOS=$$os GOARCH=$$arch CGO_ENABLED=0 \
		go build -o $(BIN_DIR)/$(BIN_NAME)-$$os-$$arch$$ext . && echo "ok"; \
	done
	@echo "Binaries in $(BIN_DIR)/:"
	@ls -1 $(BIN_DIR)/

coverage:
	@mkdir -p $(COVERAGE_DIR)
	$(GO) test -coverprofile=$(COVERAGE_DIR)/coverage.out -covermode=atomic ./...
	@$(GO) tool cover -html=$(COVERAGE_DIR)/coverage.out -o $(COVERAGE_DIR)/coverage.html
	@$(GO) tool cover -func=$(COVERAGE_DIR)/coverage.out | tail -1
	@echo "Coverage report: file://$(abspath $(COVERAGE_DIR))/coverage.html"

tidy:
	$(GO) mod tidy

install:
	@mkdir -p $(HOME)/bin
	$(GO) build -o $(HOME)/bin/$(BIN_NAME) .
	@echo "Installed to $(HOME)/bin/$(BIN_NAME)"

clean:
	@rm -rf $(BIN_DIR) $(COVERAGE_DIR) index.html
