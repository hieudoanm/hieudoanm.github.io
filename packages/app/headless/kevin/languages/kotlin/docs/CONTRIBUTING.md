# Contributing

Conventions live in [AGENTS.md](../AGENTS.md). This page covers the workflow.

## Setup

```sh
cd packages/app/headless/kevin/languages/kotlin
make test
```

A JDK 21 toolchain is required; the Gradle wrapper fetches everything else.

## Workflow

1. Change the code and its tests in the same commit.
2. `make test` must pass.
3. `make lint` compiles the main and test sources.
4. `make build` produces `bin/kevin.jar`.

## Porting a change

The Go, Rust, C and C++ ports share one protocol. If you change the protocol or
the manager behaviour here, port the same change there, and keep the error
strings identical. Those strings are what clients match on.

## Adding a command

1. Add the case to `handleLine` in `server/Handler.kt`.
2. Add a small `handleX` beside it, under 30 lines.
3. Add a `Db` method only if the command genuinely needs new storage
   behaviour; parsing does not belong in `Db`.
4. Cover the happy path, the usage error and the boundary value in
   `HandlerTest`.

## Tests

- Assert on `Reply.response`, since the text is the contract.
- Inject the clock for anything involving expiry.
- Prefer exercising `ServeRunner` with real sockets over mocking the server.
- `Render.frame` and `GuiController.reduce` are pure; prefer them over anything
  that needs a terminal.

## Style

Run an IDE formatter before committing; `make format` is a placeholder and does
nothing on its own. Keep files under 200 lines and functions under 30.
