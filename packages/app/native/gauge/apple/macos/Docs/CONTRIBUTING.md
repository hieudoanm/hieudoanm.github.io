# Contributing

## Getting Started

### Prerequisites

- macOS 13 Ventura or later
- Xcode 15+ (Swift 5.9+)

### Build

```bash
cd packages/app/native/gauge/apple/macos
make build
make dev
```

No permissions are required to run Gauge.

## Development Commands

| Command      | Description                   |
| ------------ | ----------------------------- |
| `make build` | Build the app                 |
| `make app`   | Create .app bundle            |
| `make dmg`   | Create .dmg installer         |
| `make test`  | Run unit tests                |
| `make dev`   | Build and run for development |
| `make clean` | Remove build artifacts        |

## Coding Conventions

### Repo-Wide Rules

1. Use explicit types everywhere — never rely on type inference
2. Flat nesting only — no nested classes, structs, or enums
3. Self-documenting identifiers — no comments explaining what code does
4. DRY — abstract repeated logic into shared utilities
5. Small files — target ≤30 lines for utilities, ≤200 lines for features
6. Explicit errors — never use `try!`, handle or propagate errors
7. Consistent imports — order: Foundation, SwiftUI, third-party
8. Pure functions — prefer stateless helpers with no side effects

### Swift Conventions

- `let` over `var` whenever possible
- `guard` for early returns over nested `if`
- `Codable` for all models — use `CodingKeys` when JSON keys differ
- `enum` + associated values for state machines and error types
- `struct` over `class` unless reference semantics are needed
- Monitoring logic returns `Result<T, MonitorError>` — never panics
- Prefer computed properties over methods that take no arguments

### SwiftUI Conventions

- `@State` for local view state
- `@Binding` for child-to-parent communication
- `@StateObject` / `@ObservedObject` for view models
- Use `VStack` / `HStack` for layout — avoid manual frames when possible
- Prefer `Label` over raw `Image` + `Text` combinations

### Monitoring Conventions

- Views never query Mach or filesystem APIs directly
- All calculations live in `Core` so they are unit-testable
- Document the chosen definition of "used" in the service
- Handle unavailable metrics by showing "Unable to read", never `0 GB`
- One coordinated timer for all metrics

### Ports Conventions

- Views never spawn `lsof` directly — go through `PortDiscovering`
- `PortDiscovering` / `ProcessTerminating` protocols keep discovery and
  termination mockable and UI-independent
- Never build shell strings from process metadata; use `Process` with explicit
  executable URLs and arguments
- Never auto-kill a process; destructive actions require explicit user action
- Keep all parsing in `LsofParser` so it stays unit-testable

### Clipboard Conventions

- Views never touch `NSPasteboard` directly — go through `PasteboardManager`
- Keep all history logic in `ClipperStore` (dedupe, pin, cap, save) so it stays
  unit-testable
- The system pasteboard is the source of truth; never clear or overwrite it
  except for an explicit user "copy" action
- Persist atomically to `Application Support/Clipper/clipboard.json`
- Never skip the `maxItems` cap — history must stay bounded

## Before You Push

1. `make build` — clean compile
2. `make test` — all tests pass
3. `make dev` — smoke test the app
4. Menu-bar icon shows memory and disk percentages
5. Popover shows all three tabs with Memory the default
6. Memory tab shows both progress bars with used/total values
7. Clipboard tab captures, searches, and copies history; pin and delete work
8. Ports view lists listening ports and kill actions work
9. Verify both Light Mode and Dark Mode
