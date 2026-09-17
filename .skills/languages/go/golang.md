---
name: go-best-practices
description: Idiomatic Go best practices covering project structure, error handling, concurrency, naming, testing, and tooling. Use when writing, structuring, or reviewing Go code.
---

# Go Best Practices

Go values simplicity and explicitness over cleverness. Most "best practice" here is really "match what `gofmt`, `go vet`, and the standard library already do" — fighting Go's grain (heavy abstraction, generic-everything, exception-style control flow) is the most common source of un-idiomatic code.

---

## 1. Project Structure

Standard layout for anything beyond a single-file tool:

```txt
myapp/
├── cmd/
│   └── myapp/
│       └── main.go        # thin entrypoint only
├── internal/               # private packages, not importable by other modules
│   ├── config/
│   ├── server/
│   └── storage/
├── pkg/                     # only if intended for external import — omit otherwise
├── go.mod
└── go.sum
```

- **`internal/` by default.** Only promote a package out of `internal/` when something outside the module genuinely needs to import it.
- **`main.go` stays thin** — parse flags/config, wire dependencies, call into `internal/` packages. No business logic in `main`.
- **Package names: short, lowercase, no underscores** (`config`, not `Config` or `config_utils`). Avoid stutter — `config.Config` is fine, `config.ConfigStruct` is not.
- One package per directory; don't split a logical package across multiple directories.

---

## 2. Error Handling

- **Errors are values, not exceptions.** Check them immediately after the call that can produce them — don't defer checking or collect several before handling.
- **Wrap with context using `fmt.Errorf("...: %w", err)`** — preserves the chain for `errors.Is`/`errors.As` while adding what the caller needs to know.

```go
data, err := os.ReadFile(path)
if err != nil {
    return fmt.Errorf("reading config at %s: %w", path, err)
}
```

- **Don't wrap and log at every layer** — wrap once with context, log once at the top (usually in `main` or a request handler), not at every intermediate call site.
- **Sentinel errors** (`var ErrNotFound = errors.New("not found")`) for conditions callers need to check; **custom error types** (`type ValidationError struct{...}`) when callers need structured data from the error.
- **Never ignore an error with `_`** unless you have a specific, commented reason (`_ = f.Close() // best-effort cleanup`).
- **`panic` is for programmer errors only** (nil pointer you control, invariant violations) — never for expected failure paths like "file not found" or "network timeout."

---

## 3. Naming Conventions

| Element                  | Convention                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| Exported identifiers     | `PascalCase`                                                                                              |
| Unexported identifiers   | `camelCase`                                                                                               |
| Acronyms                 | Keep case consistent: `userID`, `HTTPClient`, not `userId`/`HttpClient`                                   |
| Interfaces               | Name for behavior, often `-er` suffix: `Reader`, `Closer`, `Validator`                                    |
| Single-method interfaces | Prefer over large ones — Go favors small, composable interfaces                                           |
| Receiver names           | Short (1–2 letters), consistent per type: `func (s *Server) Start()`, not `func (server *Server) Start()` |
| Package-qualified names  | Don't repeat the package name in the identifier: `http.Client`, not `http.HTTPClient`                     |

---

## 4. Concurrency

- **Don't start a goroutine without knowing how it stops.** Every goroutine needs a clear exit path — via context cancellation, channel close, or `sync.WaitGroup`.
- **Pass `context.Context` as the first parameter** to any function that does I/O or could be long-running: `func Fetch(ctx context.Context, url string) (...)`.
- **Prefer channels for communication, mutexes for protecting shared state** — "share memory by communicating," not the reverse, but don't force channels where a simple `sync.Mutex` around a struct field is clearer.
- **Always `defer wg.Done()`** immediately after `wg.Add(1)`/goroutine launch, not at the end of a long function body.
- **Use `errgroup.Group`** (`golang.org/x/sync/errgroup`) for concurrent operations that can fail — cleaner than manually plumbing an error channel.
- **Race detector in CI:** run `go test -race` as a matter of course, not just when debugging.

---

## 5. Testing

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

- **Zero values should be useful.** Design structs so `var s Server` is either immediately usable or clearly documented as requiring `New()`.
- **Don't over-use generics.** Reach for them when you'd otherwise duplicate identical logic across types (e.g. a `Map[T, U]` helper) — not as a default for every function signature.

---

## 8. General Rules of Thumb

- **Simplicity over abstraction.** Go rewards direct, readable code over deep interface hierarchies or heavy dependency injection frameworks.
- **Keep functions short and single-purpose** — if a function needs a table of contents comment, it should probably be split.
- **Comment the "why," not the "what"** — code should read clearly enough that comments explain rationale, not restate logic. Exported identifiers get doc comments starting with their own name (`// Server handles ...`).
- **Avoid global mutable state** — pass dependencies explicitly (constructors, function params) instead of package-level `var`s that tests then have to reset.
- **Module versioning:** follow semver, and remember a `v2+` module path requires the `/v2` suffix in the import path.

---

## Quick-Start Checklist

- [ ] `internal/` used for anything not meant for external import
- [ ] Errors wrapped with `%w` and context, checked immediately, not silently discarded
- [ ] Every goroutine has a clear termination path
- [ ] `context.Context` threaded through I/O-bound functions
- [ ] Table-driven tests for multi-case logic
- [ ] `gofmt`, `go vet`, and a linter running in CI
- [ ] Functional options used for complex constructors instead of long positional args
- [ ] No unexplained `_ = err` discards
- [ ] `go test -race` run in CI for any concurrent code
