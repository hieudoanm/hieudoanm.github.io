GRADLE       ?= ./gradlew
BIN_DIR      ?= bin
BIN_NAME     ?= kevin
LAUNCHER     ?= $(BIN_DIR)/$(BIN_NAME)
COVERAGE_DIR ?= coverage

.PHONY: help all format lint test build install coverage clean

help:
	@echo "kevin — Redis-style key/value store in Kotlin"
	@echo ""
	@echo "Targets:"
	@echo "  all        test + build"
	@echo "  format     no-op; the Kotlin sources are already formatted"
	@echo "  lint       compile the sources as a lint pass"
	@echo "  test       run the unit tests"
	@echo "  build      build $(LAUNCHER) and $(BIN_DIR)/lib (--tui, includes the GUI)"
	@echo "  install    build and copy to $(HOME)/bin"
	@echo "  coverage   generate the HTML coverage report"
	@echo "  clean      remove build artifacts"

all: test build

format:
	@echo "nothing to format; run an IDE formatter if needed"

lint:
	$(GRADLE) compileKotlin compileTestKotlin --console=plain

test:
	$(GRADLE) test --console=plain

build:
	@rm -rf build/install
	$(GRADLE) installDist --console=plain
	@rm -rf $(BIN_DIR)
	@mkdir -p $(BIN_DIR)
	@cp -R build/install/$(BIN_NAME)/lib $(BIN_DIR)/lib
	@cp build/install/$(BIN_NAME)/bin/$(BIN_NAME) $(LAUNCHER)
	@echo "built $(LAUNCHER) (run $(LAUNCHER) serve --tui)"

install: build
	@rm -rf $(HOME)/.kevin
	@mkdir -p $(HOME)/.kevin $(HOME)/bin
	@cp -R $(BIN_DIR)/lib $(HOME)/.kevin/lib
	@cp $(LAUNCHER) $(HOME)/.kevin/$(BIN_NAME)
	@ln -sf $(HOME)/.kevin/$(BIN_NAME) $(HOME)/bin/$(BIN_NAME)
	@echo "Installed to $(HOME)/bin/$(BIN_NAME)"

coverage:
	@mkdir -p $(COVERAGE_DIR)
	$(GRADLE) jacocoTestReport --console=plain
	@echo "Coverage report: file://$(abspath build/reports/jacoco/test/html/index.html)"

clean:
	$(GRADLE) clean --console=plain
	@rm -rf $(BIN_DIR) $(COVERAGE_DIR)
