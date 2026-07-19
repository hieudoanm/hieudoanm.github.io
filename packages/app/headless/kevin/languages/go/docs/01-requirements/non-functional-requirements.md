# KeVIN (Go) — Non-Functional Requirements

## NFR-001: Single Binary
- Default build MUST produce a single static binary with `CGO_ENABLED=0`

## NFR-002: Cross-Platform
- MUST support Linux amd64/arm64 and macOS amd64/arm64 via `make build-all`

## NFR-003: Testability
- Core parsing (`handleLine`) MUST be pure and table-testable
- Tests MUST be colocated with code under test
- TCP integration tests MUST run against real connections

## NFR-004: Code Quality
- Code MUST follow Go conventions: error last, explicit error handling, no global state
- MUST pass `go vet ./...` and formatting via `go fmt`

## NFR-005: Transport Safety (MCP)
- MCP stdio transport MUST keep logs on stderr to avoid corrupting protocol frames
- Notifications MUST never receive responses

## NFR-006: Build Tags
- GUI implementation MUST be behind `//go:build gui` tag; stub without tag
- TUI MUST compile into every build (no build tag restriction)

## NFR-007: Containerization
- Docker image MUST use multi-stage build with scratch as final image
