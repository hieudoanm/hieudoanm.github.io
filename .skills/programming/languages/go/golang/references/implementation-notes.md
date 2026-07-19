# Implementation notes

Focused reference for **go-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Table-driven tests** are the idiomatic default for anything with multiple input/output cases:

```go
func TestParse(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    int
        wantErr bool
    }{
        {"valid", "42", 42, false},
        {"empty", "", 0, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Parse(tt.input)
            if (err != nil) != tt.wantErr {
                t.Fatalf("error = %v, wantErr %v", err, tt.wantErr)
            }
            if got != tt.want {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

- Test files live next to the code (`foo.go` → `foo_test.go`), same package (white-box) unless testing only the public API (`package foo_test`, black-box) — use black-box for library packages to catch API usability issues.
- Use `t.Helper()` in test helper functions so failures report the caller's line number.
- Use `testify/assert` sparingly — plain `if got != want { t.Errorf(...) }` is often clearer and is what most of the standard library itself uses.

---

## 6. Formatting & Tooling (Non-negotiable)

- **`gofmt`/`goimports` on save** — there is no style debate to have in Go; the formatter is the style guide.
- **`go vet`** and **`staticcheck`** in CI — catch real bugs (unreachable code, printf format mismatches, unused results).
- **`golangci-lint`** as an aggregator if you want more coverage (unused vars, cyclomatic complexity, etc.) — configure once per repo, don't hand-pick linters per PR.

---

## 7. API & Function Design

- **Accept interfaces, return structs.** Function parameters should be the narrowest interface that satisfies the need; return concrete types so callers get full functionality.
- **Functional options pattern** for constructors with many optional parameters, instead of a giant positional-argument constructor or a config struct with unclear defaults:

```go
func NewServer(addr string, opts ...Option) *Server { ... }
func WithTimeout(d time.Duration) Option { ... }
```
