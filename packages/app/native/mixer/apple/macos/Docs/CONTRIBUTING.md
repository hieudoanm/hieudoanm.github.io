# Contributing

Thanks for contributing to **Mixer**, a native macOS menu-bar volume mixer.

## Getting Started

1. **Prerequisites**: macOS 13+, Xcode 14+, Swift 5.9+
2. **Clone the repo** and navigate to the project:

   ```bash
   cd packages/app/native/mixer/apple/macos
   ```

3. **Build the project**:

   ```bash
   make build
   ```

4. **Run in dev mode**:

   ```bash
   make dev
   ```

## Development Commands

| Task       | Command      |
| ---------- | ------------ |
| Build      | `make build` |
| App bundle | `make app`   |
| DMG        | `make dmg`   |
| Dev mode   | `make dev`   |
| Clean      | `make clean` |

Run `build` before pushing to ensure compilation succeeds.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them
for every change.

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses.
3. **Self-documenting identifiers** — `getSystemVolume()` needs no comment.
4. **DRY** — centralize repeated patterns; duplication hides bugs.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Consistent imports** — group by origin: stdlib, third-party, internal.
8. **Pure functions with explicit dependencies** — accept inputs, return
   outputs.
9. **Conventional layouts** — `Sources/`, `App/`, `Models/`, `Views/`.

### Swift

1. Prefer `let` over `var` for immutability.
2. Use `guard` for early exit.
3. Use `Codable` for JSON serialization.
4. Use `enum` with associated values for state machines.
5. Favour value types (`struct`) over reference types (`class`).
6. Use `actor` for shared mutable state.
7. Keep SwiftUI views thin — move logic to view models.

### SwiftUI

1. Use `@State` for local view state.
2. Use `@Binding` for child-parent data flow.
3. Use `@StateObject` / `@ObservedObject` for model data.
4. Use `@EnvironmentObject` for shared dependencies.
5. Use `VStack`, `HStack`, `ZStack` for layout.
6. Use SF Symbols for icons.

### Core Audio

1. Isolate Core Audio code from SwiftUI.
2. Handle device lifecycle changes gracefully.
3. Never crash on audio errors — refresh state instead.
4. Use public APIs suitable for App Store distribution.

## Before You Push

1. `make build` — ensure compilation succeeds
2. `make dev` — smoke-test the app runs
3. Verify menu bar icon appears
4. Verify system volume slider works
