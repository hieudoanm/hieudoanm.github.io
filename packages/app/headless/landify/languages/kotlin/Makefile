GRADLE       ?= ./gradlew
DIST_DIR     ?= dist
BIN_NAME     ?= landify
# The launcher resolves its classpath as $APP_HOME/lib, and Gradle derives
# APP_HOME by stepping out of a bin/ subdirectory, so the distribution has to
# keep the standard <dist>/bin/<name> + <dist>/lib layout.
LAUNCHER     ?= $(DIST_DIR)/bin/$(BIN_NAME)
COVERAGE_DIR ?= coverage

.PHONY: help all format lint test build install coverage clean

help:
	@echo "landify — build a landing page from YAML (Kotlin)"
	@echo ""
	@echo "Targets:"
	@echo "  all        test + build"
	@echo "  format     no-op; the Kotlin sources are already formatted"
	@echo "  lint       compile the sources as a lint pass"
	@echo "  test       run the unit tests"
	@echo "  build      build $(LAUNCHER) and $(DIST_DIR)/lib (includes the TUI and studio)"
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
	@rm -rf build/install $(DIST_DIR)
	$(GRADLE) installDist --console=plain
	@cp -R build/install/$(BIN_NAME) $(DIST_DIR)
	@echo "built $(LAUNCHER) (try: $(LAUNCHER) new -t product && $(LAUNCHER) build)"

install: build
	@rm -rf $(HOME)/.landify
	@mkdir -p $(HOME)/.landify $(HOME)/bin
	@cp -R $(DIST_DIR) $(HOME)/.landify
	@ln -sf $(HOME)/.landify/bin/$(BIN_NAME) $(HOME)/bin/$(BIN_NAME)
	@echo "Installed to $(HOME)/bin/$(BIN_NAME)"

coverage:
	@mkdir -p $(COVERAGE_DIR)
	$(GRADLE) jacocoTestReport --console=plain
	@echo "Coverage report: file://$(abspath build/reports/jacoco/test/html/index.html)"

clean:
	$(GRADLE) clean --console=plain
	@rm -rf $(DIST_DIR) $(COVERAGE_DIR) index.html
