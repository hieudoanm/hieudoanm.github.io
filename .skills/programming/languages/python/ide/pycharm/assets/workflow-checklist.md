# PyCharm: Workflow Checklist

A practical run sheet for applying [PyCharm](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & the Unified Release: **One PyCharm, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Professional split
- [ ] 1. Editions & the Unified Release: **Check the licence state before relying on a feature.** A free-tier IDE in a commercial context is a licensing problem, not a configuration problem
- [ ] 2. Environment Management: **The project's own tool owns the environment, not the IDE.** uv, poetry, pipenv, or plain venv each have a corresponding PyCharm setting; pick the one the repo uses and configure the interpreter from it. Creating an ad-hoc interpreter inside the IDE is how a dependency goes missing in CI
- [ ] 2. Environment Management: **Commit the lockfile** (uv.lock, poetry.lock, requirements.txt with hashes) and never the .venv directory. The interpreter path is machine-specific and must be ignored
- [ ] 3. Code Style & Quality: **Configure the formatter and linter from the repo's config**, not from PyCharm defaults: black/ruff format, ruff, or flake8+isort in the tool's settings. The IDE formatter and the CLI formatter producing different output is a permanent source of reformat-only commits
- [ ] 3. Code Style & Quality: **Use ruff where the project uses it** — it bundles lint and format, so one tool, one config, one version. Pre-commit hooks in the repo remain the shared enforcement, not the IDE's commit dialog
- [ ] 4. Testing: **Configure pytest as the test runner with the project's rootdir** (Settings → Tools → pytest). The default "unittest" runner misreads a pytest suite and reports confusing collection errors
- [ ] 4. Testing: **Run tests through the IDE's run configurations and the CLI alike**, and keep the configuration minimal: pytest.ini/[tool.pytest] in the repo is what both read
- [ ] 5. Debugging & Profiling: **Use the debugger's "Evaluate Expression"** for state at a meaningful frame, and conditional breakpoints for the "works for me" case, rather than sprinkle prints
- [ ] 5. Debugging & Profiling: **The built-in profiler is genuinely usable** (CPU, allocations, call tree) and does not require a separate tool for most projects; a sampling profiler like py-spy is the better answer for an already-running production process, where attaching a debug build is impractical

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
