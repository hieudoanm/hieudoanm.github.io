# Contributing

## Prerequisites

- Swift 5.9+ / Xcode.
- Homebrew installed locally (integration paths only; unit tests use mocks and do not require Homebrew).

## Getting started

```bash
git clone <repo>
cd packages/app/native/brewery/apple/macos
swift build
swift test
```

## Conventions

- Keep domain logic in `BreweryCore`; UI lives in the executable target.
- Prefer `BrewClient` abstraction over calling `Process` directly in views.
- Prefer Homebrew **JSON output** over bespoke text parsing whenever available.
- Never run Homebrew through a shell string; pass explicit arguments to `Process`.
- All `HomebrewService` mutations are `async` so the UI never blocks.
- No comments unless they clarify non-obvious intent.
- Unit tests use `MockBrewClient`; they must not depend on a real Homebrew install.

## Adding a new brew operation

1. Add the method to `BrewService` (protocol) and implement in `HomebrewService`.
2. Build the underlying command with `BrewClient.execute(arguments:)`.
3. Add a `MockBrewClient` case via its responses dictionary.
4. Since mutation commands are one-shot, they are covered by `HomebrewServiceTests`.

## Testing

```bash
make test    # or: swift test
```

Ensure all tests pass and the package builds with zero warnings before submitting a change.
