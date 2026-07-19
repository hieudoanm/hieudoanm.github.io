# Review checklist

Focused reference for **makefile-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Conditional logic** — use `ifeq/ifneq/else/endif` for platform- or config-specific behavior.
- **Recursive make** — use `$(MAKE)` rather than bare `make` to propagate flags and variables.
- **Parallel safety** — ensure targets don't conflict when run with `-jN`; use file locks if needed.

```makefile
ifeq ($(OS),Windows_NT)
    SHELL := cmd.exe
    RM := del /f
else
    RM := rm -rf
endif
```

---

## 6. Quick-Start Checklist

- [ ] `.PHONY` declared for non-file targets
- [ ] `help` target with `##` comments
- [ ] Variables defined at top with `:=` or `?=`
- [ ] Tab-indented recipe lines
- [ ] No reliance on implicit rules
