# Review checklist

Focused reference for **swift-argument-parser-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Quick-Start Checklist

- [ ] `@main` struct conforming to `ParsableCommand`
- [ ] `@Argument` for positional params, `@Option` for named flags, `@Flag` for booleans
- [ ] Validation with `require()` for preconditions
- [ ] `env` for environment variable fallbacks
- [ ] Shell completions configured via `.custom` or `.list()`
- [ ] `--version` flag present (use `VersionOption`)
- [ ] Help text filled in for all properties
