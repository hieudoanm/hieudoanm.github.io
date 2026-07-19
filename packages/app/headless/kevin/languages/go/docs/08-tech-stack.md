# KeVIN (Go) — Technology Stack & Decisions

## 1. Purpose

Records technology choices and rationale.

## 2. Stack at a Glance

| Layer | Chosen technology | Notes |
| ----- | ----------------- | ----- |
| Language | Go 1.27+ | Module github.com/hieudoanm/kevin |
| CLI | cobra | Subcommands: serve, mcp |
| TUI | bubbletea v2 + bubbles v2 | Pure Go, compiled into all builds |
| GUI | fyne v2 | CGO required, behind `gui` build tag |
| Concurrency | sync.RWMutex | In-memory store protection |
| Testing | go test + testify | Table-driven tests |
| Container | Docker (scratch) | Multi-stage build |

## 3. Key Decisions

- Protocol parity with C/C++ reference (inline protocol, exact behavior)
- CGO-free by default; GUI is opt-in
- MCP transport is stdio with strict separation of logs (stderr) and frames (stdout)
- Core logic (handleLine) is pure for testability
