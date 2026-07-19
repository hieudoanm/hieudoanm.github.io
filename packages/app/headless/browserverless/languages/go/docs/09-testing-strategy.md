# Testing Strategy

## Testing Conventions

- Colocate `*_test.go` with the code they test
- Use table-driven tests (`[]struct{...}` + `t.Run`) and behaviour-spec names
- `internal/headless` tests exercise the engine via a local `httptest.Server`
  serving static HTML — no external network, no race, fully hermetic
- `internal/server/handler_test.go` uses a fake `Renderer` to test every HTTP
  route (200/400/404/405/500/504) without touching the network
- `internal/server/server_test.go` covers `resolveBind` and `externalIPv4`
- `main_test.go` tests CLI dispatch, flag help, and the `health` subcommand
- `tests/integration_test.go` is the E2E gate: builds the real binary
  (`go build ./..`) and exercises the live `serve` API and the CLI against a
  local `httptest` fixture — hermetic, no external network
- Each test creates its own server or browser — no shared mutable state

## Docs

Update `docs/04-architecture.md` when the module layout or API changes.
Update `README.md` when adding or changing commands.
Keep `docs/10-implementation-plan.md` checkboxes in sync with what actually ships.
