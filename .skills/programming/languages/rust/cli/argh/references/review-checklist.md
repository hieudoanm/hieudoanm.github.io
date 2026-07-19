# Review checklist

Focused reference for **argh-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Warnings / Migration

- **argh is intentionally minimal (no generated help styling, minimal validation):**
- **Migrate to clap when: 50+ flags, dynamic completions, complex validations, or mature help UX.**
- **Pin `argh` version in Cargo; feature-gate with other derives sparingly.**

---

## General Rules of Thumb

- **`derive(FromArgs)` with doc-comment help.**
- **Field attributes explicit: option/switch/positional/subcommand.**
- **Nested subcommands via enum + `description`.**
- **Graceful error/exit for parse; tests via `from_args` slices.**
- **Lean by design; migrate to clap at scale.**

---

## Quick-Start Checklist

- [ ] `#[derive(FromArgs)]` top struct; doc comments as help
- [ ] Every field has an `argh` attribute; defaults for optional
- [ ] Subcommands via generated `#[argh(subcommand)]` enum
- [ ] `from_env` or graceful `from_args` error handling
- [ ] Parse-layer unit tests (`FromArgs::from_args` fixtures)
- [ ] Version pinned; `--help` output reviewed as contract
