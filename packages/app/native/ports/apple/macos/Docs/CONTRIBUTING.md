# Contributing

## Getting Started

### Prerequisites

- macOS 13 Ventura or later
- Xcode 15+ (Swift 5.9+)

### Build

```bash
cd packages/app/native/ports/apple/macos
make build
make dev
```

No special permissions are required to run Ports.

## Development Commands

| Command | Description |
|---------|-------------|
| `make build` | Build the app |
| `make app` | Create .app bundle |
| `make dmg` | Create .dmg installer |
| `make test` | Run unit tests |
| `make dev` | Build and run for development |
| `make clean` | Remove build artifacts |

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
- Services return `Result<T, Error>` or throw — never silently fail
- Prefer computed properties over methods that take no arguments

### SwiftUI Conventions

- `@State` for local view state
- `@Binding` for child-to-parent communication
- `@StateObject` / `@ObservedObject` for view models
- Use `VStack` / `HStack` for layout — avoid manual frames when possible
- Prefer `Label` over raw `Image` + `Text` combinations

### Ports Conventions

- Views never run `lsof` or touch process tables directly
- Discovery lives in services behind protocols, so it is mockable and testable
- Command-line tools are launched with explicit executable paths, never `sh -c`
- Never construct shell commands from untrusted process metadata
- Destructive actions (Kill / Force Kill) are never automatic or primary
- Handle unavailable data by showing a message, never a blank or zero value

## Before You Push

1. `make build` — clean compile
2. `make test` — all tests pass
3. `make dev` — smoke test the app
4. Menu-bar icon shows the plug symbol
5. Popover opens with search field and port list
6. Verify both Light Mode and Dark Mode