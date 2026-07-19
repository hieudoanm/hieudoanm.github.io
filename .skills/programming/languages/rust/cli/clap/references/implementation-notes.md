# Implementation notes

Focused reference for **clap-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Output Conventions

| Rule                     | Detail                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Human output → stdout    | Always                                                                                                                                                  |
| Errors/warnings → stderr | Always                                                                                                                                                  |
| Structured output flag   | Support `--output`/`-o` with `table` (default), `json`, `yaml` variants for scripting/CI                                                                |
| Exit codes               | `0` success, `1` generic failure; use `std::process::ExitCode` for typed exit codes rather than raw `std::process::exit(n)` scattered through the code  |
| Color                    | Use `anstream`/`anstyle` (or `owo-colors` with `.if_supports_color()`) — auto-disables on non-TTY and respects `NO_COLOR` without manual detection code |
| Quiet/verbose            | Support `-q`/`--quiet` and `-v`/`--verbose` (clap supports counted flags: `#[arg(short, action = ArgAction::Count)] verbose: u8` for `-vvv`)            |

```rust
use std::process::ExitCode;

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(e) => {
            eprintln!("error: {e:#}");
            ExitCode::FAILURE
        }
    }
}
```

---

## 6. Error Handling

- Use `anyhow::Result` in the binary crate for ergonomic error propagation with `?`; use `thiserror` for a library crate's typed error enum if the CLI wraps a reusable library.
- Error messages should be **actionable**: say what went wrong and how to fix it (`"config file not found at ~/.config/app/config.toml — run 'app init' first"`), not just `"error: not found"`.
- Use `.context("...")` (from `anyhow`) liberally when propagating errors up through layers — bare `?` loses the caller's intent by the time the error reaches the user.

```rust
let contents = std::fs::read_to_string(&path)
    .with_context(|| format!("failed to read config at {}", path.display()))?;
```

---

## 7. Progress & Feedback
