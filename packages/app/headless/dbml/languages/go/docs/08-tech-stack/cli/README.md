# dbml (Go) — Tech Stack: CLI

The CLI is the primary transport for dbml: one Cobra-based binary that converts DBML files and can also launch the HTTP and MCP servers. Everything lives in `cmd/` and delegates to `internal/dbml` — no parsing or generation logic exists in this layer.

## 1. Stack

| Concern       | Choice                              | Notes                                            |
| ------------- | ----------------------------------- | ------------------------------------------------ |
| Framework     | `github.com/spf13/cobra` v1.10.2    | Subcommands, help, version; pinned in `go.mod`   |
| Flags         | `github.com/spf13/pflag` (indirect) | POSIX-style `-o`/`--output` shorthands           |
| Logging       | `log/slog` text handler             | Warn level by default, stderr                    |
| Everything else | Go standard library              | File I/O, signals, formatting                    |

Decision record: [`../../08-tech-stack.md`](../../08-tech-stack.md) §4.2. Rejected: stdlib `flag` (no subcommands), urfave/cli.

## 2. Commands

| Command            | File              | Default input     | Default output                          |
| ------------------ | ----------------- | ----------------- | --------------------------------------- |
| `dbml sql`         | `cmd/sql.go`      | `schema.dbml`     | `initial_schema.sql` (`-o` overrides)   |
| `dbml mermaid`     | `cmd/mermaid.go`  | `schema.dbml`     | `database-erd.mmd` (`-o` overrides)     |
| `dbml svg`         | `cmd/svg.go`      | `schema.dbml`     | `schema.svg` (`-o` overrides)           |
| `dbml all`         | `cmd/all.go`      | `schema.dbml`     | `initial_schema.sql` + `database-erd.mmd` + `schema.svg` in `--output-dir` (default `.`) |
| `dbml serve`       | `cmd/serve.go`    | n/a               | HTTP server on `--port` (default `8080`)|
| `dbml mcp serve`   | `cmd/mcp.go`      | n/a               | JSON-RPC 2.0 over stdio                  |

Global flags: `-h/--help`, `-v/--version` (renders `dbml <version>`, `dev` unless ldflags set it). `serve` adds `--debug` for Debug-level slog output.

## 3. Output conventions

- **stdout carries results**, one confirmation line per written artifact: `Generated SQL schema: <path>`.
- **stderr carries diagnostics**: errors as `dbml: <what failed>: <context>` and slog records (Warn level by default).
- Exit codes: `0` on success **and** on failure — `Execute()` returns `1` on any command error, but `main.go` discards it, so callers must read stderr (`main.go`, `cmd/root.go`).
- `SilenceUsage`/`SilenceErrors` are set on the root command — usage text appears only on explicit `--help`, never as an error side-effect.
- The `serve` command prints the startup box (`cmd/box.go`) with Local/Network/Docs links before blocking.

## 4. Structure

```
cmd/
├── root.go      # root command, version template, Execute(), logging setup
├── sql.go       # sql subcommand
├── mermaid.go   # mermaid subcommand
├── svg.go       # svg subcommand
├── all.go       # all subcommand (creates output dir, writes three files)
├── serve.go     # serve subcommand (SIGINT/SIGTERM handling)
├── mcp.go       # mcp parent + mcp serve subcommand
└── box.go       # serve startup box rendering
```

`main.go` at the repository root is a one-line entrypoint calling `cmd.Execute()`.

## 5. Rules

- Commands are thin wrappers: parse flags, call `dbml.ParseFile`/`Parse`, call a generator, write output, print one line.
- Zero-config defaults: every conversion works with no flags at all (`dbml all` with `schema.dbml` present).
- Errors must be actionable — what failed, which file, enough context to fix (`AGENTS.md`, Error Handling).
- `cmd` tests exist for composed output (`cmd/box_test.go`); conversion behaviour is tested in the packages that own it.

## Cross-references

- Dependency policy: [`../../08-tech-stack.md`](../../08-tech-stack.md)
- Architecture (transport thinness): [`../../04-architecture.md`](../../04-architecture.md)
- Testing strategy: [`../../09-testing-strategy.md`](../../09-testing-strategy.md)
- Server transport: [`../server/README.md`](../server/README.md)
