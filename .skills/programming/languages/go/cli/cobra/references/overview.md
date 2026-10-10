# Overview

Focused reference for **cobra-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Cobra CLI Design Best Practices

Cobra (spf13/cobra) gives you command trees, flag parsing, and help generation for free. Good CLI design is mostly about _conventions_ — following the shape users already expect from tools like `git`, `kubectl`, and `docker` — rather than fighting Cobra's defaults.

---

## 1. Core Stack

- `github.com/spf13/cobra` — command tree, flags, help/usage generation
- `github.com/spf13/viper` — config file + env var + flag merging (pairs naturally with Cobra)
- `github.com/spf13/pflag` — POSIX-style flags (Cobra uses this under the hood)
- `github.com/fatih/color` or `github.com/charmbracelet/lipgloss` — colored terminal output
- `github.com/briandowns/spinner` or `charmbracelet/bubbles/spinner` — progress feedback

---

## 2. Command Structure

- **Noun-verb or verb-noun, pick one and stay consistent.** `kubectl get pods` (verb-noun) vs `git remote add` (noun-verb) — both work, mixing them within one CLI doesn't.
- **Keep the tree shallow.** 2 levels (`app noun verb`) is usually enough; avoid 3+ levels unless the domain genuinely needs it.
- **Root command should do something useful alone** or print help — never a silent no-op.
- **Group related subcommands** under a parent even if the parent itself has no action (`app config get`, `app config set`, `app config list`).

```go
var rootCmd = &cobra.Command{
    Use:   "app",
    Short: "One-line description shown in `app help`",
    Long:  "A longer paragraph shown in `app --help`, explaining what the tool is for.",
}

var configCmd = &cobra.Command{
    Use:   "config",
    Short: "Manage configuration",
}

var configGetCmd = &cobra.Command{
    Use:   "get <key>",
    Short: "Get a configuration value",
    Args:  cobra.ExactArgs(1),
    RunE:  runConfigGet,
}
```

---
