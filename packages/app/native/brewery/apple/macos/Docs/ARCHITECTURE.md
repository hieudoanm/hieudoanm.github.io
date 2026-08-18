# Architecture

## Overview

Brewery is a native macOS (SwiftUI) application that presents a GUI over Homebrew. Homebrew remains the source of truth; Brewery never duplicates package-management logic or maintains a separate package database.

```
UI (SwiftUI Views)
      ↓
BreweryViewModel (@MainActor ObservableObject)
      ↓
BrewService protocol
      ↓
HomebrewService
      ↓
BrewClient protocol
      ↓
SystemBrewClient ──→ ProcessRunner ──→ brew
```

## Module layout

The Swift package defines two targets plus tests:

- **`BreweryCore`** (`Sources/Core/`) — UI-independent domain logic: models, services, parsing, settings. This is testable without the UI and without Homebrew.
- **`Brewery`** (`Sources/`) — the executable: `App/` (app entry, view model) and `Views/` (SwiftUI).
- **`BreweryTests`** (`Tests/`) — unit tests for `BreweryCore`.

## Responsibility separation

| Layer | Responsibility |
| --- | --- |
| `Views/` | Render state, forward user intent. Never invokes `Process`. |
| `App/BreweryViewModel` | Holds screen state, orchestrates service calls, refreshes after mutations. |
| `Services/HomebrewService` | Maps Homebrew commands to domain methods; owns parsing. |
| `Services/BrewParser` | Parses Homebrew JSON/columnar output into models. |
| `Services/BrewClient` | Abstraction over executing brew commands (system + mock). |
| `Services/ProcessRunner` | Runs a process asynchronously, capturing stdout/stderr/exit code. |
| `Models/` | Pure value types describing packages, status, errors, services. |

## Key decisions

- **JSON output preferred** — `brew info --json=v2` and `brew outdated --json=v2` are structured and non-fragile. Human-readable output is only parsed where structured output is unavailable (e.g. `brew services list`).
- **No shell invocation** — `brew` is launched directly via `Process` with explicit arguments. User-controlled strings are validated, never concatenated into a shell command.
- **Dynamic Homebrew detection** — the executable is located via `which brew` then known install paths; both `/opt/homebrew` (Apple Silicon) and `/usr/local` (Intel) are supported.
- **Concurrency** — `HomebrewService` methods are `async`; `ProcessRunner` runs on a detached executor so the UI stays responsive. Mutations run one at a time.
- **Local-first, no telemetry** — no package state is persisted; only UI preferences are stored locally.
