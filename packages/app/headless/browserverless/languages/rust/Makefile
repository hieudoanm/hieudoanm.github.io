.PHONY: build test clippy fmt clean run screenshot

# Default target
all: build

# Build all crates
build:
	cargo build

# Run all tests
test:
	cargo test

# Run clippy lints
clippy:
	cargo clippy -- -D warnings

# Format code
fmt:
	cargo fmt

# Check formatting
fmt-check:
	cargo fmt --check

# Clean build artifacts
clean:
	cargo clean

# Run CLI with screenshot
screenshot:
	cargo run -p cli -- tests/rendering/mvp.html --headless --screenshot --output /tmp/screenshot.png

# Run all checks (test + clippy + fmt)
check: test clippy fmt-check

# Run GUI demo
gui:
	cargo run -p cli -- tests/rendering/mvp.html

# Build release
release:
	cargo build --release

# Run benchmarks (if any)
bench:
	cargo test --release

# Update dependencies
update:
	cargo update

# Show test coverage
coverage:
	cargo test --codecov --output-path lcov.info

# Run specific crate tests
test-css:
	cargo test -p css

test-html:
	cargo test -p html

test-dom:
	cargo test -p dom

test-style:
	cargo test -p style

test-layout:
	cargo test -p layout

test-renderer:
	cargo test -p renderer

test-network:
	cargo test -p network

test-browser:
	cargo test -p browser

test-gui:
	cargo test -p gui

# Run integration tests only
test-integration:
	cargo test -p browser --test pipeline_test

# Help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  all          - Build all crates (default)"
	@echo "  build        - Build all crates"
	@echo "  test         - Run all tests"
	@echo "  clippy       - Run clippy lints"
	@echo "  fmt          - Format code"
	@echo "  fmt-check    - Check formatting"
	@echo "  clean        - Clean build artifacts"
	@echo "  screenshot   - Take screenshot of MVP page"
	@echo "  check        - Run all checks (test + clippy + fmt)"
	@echo "  gui          - Run GUI demo"
	@echo "  release      - Build release"
	@echo "  bench        - Run benchmarks"
	@echo "  update       - Update dependencies"
	@echo "  coverage     - Show test coverage"
	@echo "  test-css     - Test CSS crate"
	@echo "  test-html    - Test HTML crate"
	@echo "  test-dom     - Test DOM crate"
	@echo "  test-style   - Test style crate"
	@echo "  test-layout  - Test layout crate"
	@echo "  test-renderer - Test renderer crate"
	@echo "  test-network - Test network crate"
	@echo "  test-browser - Test browser crate"
	@echo "  test-gui     - Test GUI crate"
	@echo "  test-integration - Run integration tests"
	@echo "  help         - Show this help"
