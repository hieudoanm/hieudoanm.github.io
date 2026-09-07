BUILD_DIR ?= bin
BINARY ?= $(BUILD_DIR)/landify

.PHONY: help build new validate generate test vet fmt clean

help:
	@echo "landify — build a landing page from YAML"
	@echo "  make build     compile the CLI to ./$(BINARY)"
	@echo "  make new       create landify.yaml placeholder"
	@echo "  make validate  validate landify.yaml"
	@echo "  make generate  generate index.html from landify.yaml"
	@echo "  make test      run go tests"
	@echo "  make vet       run go vet"
	@echo "  make fmt       run gofmt"
	@echo "  make clean     remove build artifacts"

build:
	@mkdir -p $(BUILD_DIR)
	go build -o $(BINARY) .
	@du -h $(BINARY) | awk '{print "built ./$(BINARY) (" $$1 ")"}'

new:
	go run . new

validate:
	go run . validate

generate:
	go run . build

test:
	go test ./...

vet:
	go vet ./...

fmt:
	gofmt -l -w .

clean:
	rm -rf $(BUILD_DIR) index.html