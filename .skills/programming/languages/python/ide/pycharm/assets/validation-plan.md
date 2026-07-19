# PyCharm: Validation Plan

Use this plan to verify work guided by [PyCharm](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Configure the formatter and linter from the repo's config**, not from PyCharm defaults: black/ruff format, ruff, or flake8+isort in the tool's settings. The IDE formatter and the CLI formatter producing different output is a permanent source of reformat-only commits
- [ ] **Use ruff where the project uses it** — it bundles lint and format, so one tool, one config, one version. Pre-commit hooks in the repo remain the shared enforcement, not the IDE's commit dialog
- [ ] **Type hints pay off in the IDE specifically:** the type-checking inspection surfaces an annotation error the runtime never would. But a checker is CI's authority, not the editor's
- [ ] **mypy/pyright in the IDE should read the same config.toml/pyproject.toml the CI uses**, or the editor's type state diverges from the build
- [ ] **.editorconfig and pyproject.toml can conflict.** Pick one owner per setting; PyCharm honours both, and the precedence is not obvious
- [ ] **Configure pytest as the test runner with the project's rootdir** (Settings → Tools → pytest). The default "unittest" runner misreads a pytest suite and reports confusing collection errors
- [ ] **Run tests through the IDE's run configurations and the CLI alike**, and keep the configuration minimal: pytest.ini/[tool.pytest] in the repo is what both read
- [ ] **Parametrised tests and fixtures work in the IDE's test view** the way they do in the CLI, provided the rootdir is right — if not, Untested code-coverage labels appear on code that a test does touch
- [ ] **The coverage tool window is the fastest way to see a new test's effect**, but a coverage number is not a test: a branch that is executed but never asserts is covered and worthless
- [ ] **Integration tests that need a service (DB, broker) belong in a run configuration with the right env/working directory**, not in a unit-test run that assumes nothing is listening

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
