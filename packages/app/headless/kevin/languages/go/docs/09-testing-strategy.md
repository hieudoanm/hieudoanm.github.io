# KeVIN (Go) — Testing Strategy

## 1. Purpose

Defines test layers and conventions.

## 2. Test Layers

- **Unit tests**: db package (direct store operations), mcp tools/store logic
- **Table-driven handler tests**: `internal/server/handler_test.go` tests `handleLine` without TCP
- **Integration tests**: `internal/server/server_test.go` tests full TCP round-trips with real connections and concurrent clients
- **CLI tests**: cmd package tests command wiring
- **GUI/TUI tests**: component/controller tests where applicable

## 3. Conventions

- Colocate `*_test.go` with code under test
- Use table-driven tests with behavior-spec names
- Each test creates its own `db.New()` (no shared mutable state)
- MCP tests drive wire protocol against both backends
