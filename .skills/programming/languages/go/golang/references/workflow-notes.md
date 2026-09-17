# Workflow notes

Focused reference for **go-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
