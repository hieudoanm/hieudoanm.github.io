# Contributing

## Getting Started

### Prerequisites

- macOS 13 Ventura or later
- Xcode 14+ (Swift 5.9+)
- Accessibility permission granted to Terminal/Xcode

### Clone

```bash
cd ~/git/github.com/hieudoanm/hieudoanm.github.io/packages/app/native/top/apple/macos
make build
make dev
```

**Note:** Top requires Accessibility permission. On first launch, the app will prompt you. Grant it in System Settings > Privacy & Security > Accessibility.

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
9. Conventional layouts — ZStack with `ignoresSafeArea()` for full-screen content

### Swift Conventions

- `let` over `var` whenever possible
- `guard` for early returns over nested `if`
- `Codable` for all models — use `CodingKeys` when JSON keys differ
- `enum` + associated values for state machines and error types
- `struct` over `class` unless reference semantics are needed
- `actor` for shared mutable state
- Prefer computed properties over methods that take no arguments

### SwiftUI Conventions

- `@State` for local view state
- `@Binding` for child-to-parent communication
- `@StateObject` / `@ObservedObject` for view models
- `@EnvironmentObject` for cross-cutting services
- Use `VStack` / `HStack` for layout — avoid manual frames when possible
- Prefer `Label` over raw `Image` + `Text` combinations

### Accessibility API Conventions

- Check `AXIsProcessTrusted()` before any AX call
- Always handle `AXError` — never assume success
- Use `AXUIElementCopyAttributeValue` / `AXUIElementSetAttributeValue`
- Log errors with `NSLog` for debugging
- Prompt user for permission via `AXIsProcessTrustedWithOptions`
- Some apps block AX access — handle gracefully

### Window Level Conventions

- Level `0` = normal window
- Level `25` = always-on-top (above status bar)
- Save previous level if available to restore on unpin
- Persist pinned windows to disk for crash recovery

## Before You Push

1. `make build` — clean compile
2. `make test` — all tests pass
3. `make dev` — smoke test the app
4. Menu bar icon appears and opens popover
5. Test pinning a window and verifying it stays on top
6. Test unpinning and verifying window returns to normal
