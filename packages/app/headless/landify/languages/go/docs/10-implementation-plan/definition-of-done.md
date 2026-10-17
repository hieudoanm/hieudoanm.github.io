# Definition of Done

- Persona adopted, workflow followed, its DoD met
- Matching skills consulted; no convention invented against them
- Functions ≤ 30 lines, files ≤ 200 lines
- Error paths explicit and tested
- `make all` passes — `go fmt` produces no diff, `go vet` exits 0, and
  `go test ./...` is green
- No secrets; no unrelated churn in the diff
- `docs/ARCHITECTURE.md` (`04-architecture.md`) updated when the pipeline,
  type list, theme logic or MCP tool surface changes
- `docs/ROADMAP.md` (`10-implementation-plan.md`) checkboxes in sync with what
  actually ships
