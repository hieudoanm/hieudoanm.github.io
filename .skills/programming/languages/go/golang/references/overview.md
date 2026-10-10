# Overview

Focused reference for **go-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
