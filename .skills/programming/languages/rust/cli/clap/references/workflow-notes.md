# Workflow notes

Focused reference for **clap-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

Doc comments (`///`) on variants/fields become the help text automatically — write them as real sentences, not restatements of the field name.

---

## 3. Arguments & Flags

| Convention                    | Rule                                                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Long form                     | Always provide (`--verbose`); derive from field name automatically via kebab-case conversion                                                   |
| Short form                    | `#[arg(short)]` only for frequent flags (`-v`, `-o`, `-f`, `-n`)                                                                               |
| Booleans                      | Default `false`, phrase as affirmative (`--force`), use `ArgAction::SetTrue`                                                                   |
| Positional vs flag            | Positional (`key: String`) for the "main subject" of the command; flags for options/modifiers                                                  |
| Enums for constrained choices | Use `#[arg(value_enum)]` with a Rust enum instead of a free `String` + manual validation — clap generates the choice list in `--help` for free |
| Global flags                  | `#[arg(global = true)]` on the top-level `Cli` struct for things like `--verbose`/`--config` that should apply to every subcommand             |

```rust
#[derive(clap::ValueEnum, Clone)]
enum OutputFormat {
    Table,
    Json,
    Yaml,
}

#[arg(short, long, value_enum, default_value_t = OutputFormat::Table)]
output: OutputFormat,
```

---

## 4. Help Text

- `about` / `#[command(about = "...")]`: one line, no trailing period.
- `long_about`: a real paragraph if the tool needs more context than the one-liner.
- **Always add examples** — clap doesn't auto-generate an `Examples:` section, so add one manually via `#[command(after_help = "...")]`:

```rust
#[command(after_help = "Examples:\n  app config get api.endpoint\n  app config get --output json api.endpoint")]
```

- Use `#[arg(required = true)]` / `ArgGroup` for mutually exclusive or required-together flags instead of validating manually after parsing — clap produces a correctly worded usage error automatically.
