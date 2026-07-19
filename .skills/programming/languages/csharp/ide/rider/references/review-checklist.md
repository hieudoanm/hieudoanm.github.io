# Review checklist

Focused reference for **rider-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## General Rules of Thumb

- Rider is a view over MSBuild: when Rider and CI disagree, CI is right.
- Prefer `.slnx`; commit `global.json`, `Directory.Build.props`, and `Directory.Packages.props`.
- Ignore `.idea/` except `run/`, `codeStyles/`, `inspectionProfiles/`.
- Use the project-scoped inspection profile plus `.editorconfig`; never rely on personal settings.
- Exception breakpoints on throw, not catch; dotTrace for hot paths, dotMemory for growth.
- Commit `.run/*.run.xml` so the debugger setup is shared.
- Review agentic (Junie) changes with the same rigour as your own.
- Keep one AI completion source active per project.

---

## Quick-Start Checklist

- [ ] `global.json` pins the SDK; `Directory.Build.props` sets `Nullable` and `LangVersion`
- [ ] Solution opened from `.slnx` where possible
- [ ] `.idea/` ignored, with `run/`, `codeStyles/`, `inspectionProfiles/` re-included
- [ ] Inspection profile set to Project, not Solution
- [ ] `.editorconfig` carries formatting; the inspection profile carries analysis severity
- [ ] DotNetCliToolPath / SDK resolution verified against CI
- [ ] Debug configuration verified to build Debug; a release-optimised profile used for profiling
- [ ] Exception breakpoints configured on throw for the languages in use
- [ ] dotTrace run on at least one real workload to confirm profiling works
- [ ] dotMemory leak-check configured if the app is long-lived
- [ ] AI Assistant or Copilot enabled — not both
- [ ] Agentic changes reviewed diff-first, with tests run before commit
