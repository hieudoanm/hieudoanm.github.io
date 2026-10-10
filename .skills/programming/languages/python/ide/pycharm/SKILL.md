---
name: "pycharm-best-practices"
description: "Best practices for working in PyCharm — the unified free and paid tiers, virtualenv and uv/poetry environment management, pytest and the profiler, Jupyter support, and JetBrains shared conventions. Use when setting up, debugging, or profiling a Python project in PyCharm."
tags:
  - "programming"
  - "language"
  - "python"
  - "ide"
  - "pycharm"
when_to_use: "Use when setting up, debugging, or profiling a Python project in PyCharm."
prerequisites:
  - "Basic familiarity with Python and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../java/ide/idea/SKILL.md"
  - "../../../php/ide/php-storm/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# PyCharm

PyCharm is JetBrains' Python IDE, with the deepest Python tooling in the JetBrains catalogue: refactorings that understand the language, a scientific-tooling stack (Notebook, NumPy/pandas support, Jupyter), and a built-in profiler. As of **2025.1 there is one PyCharm**, replacing the separate Community and Professional editions — the free tier is limited by a non-commercial-use condition rather than by features. Practical PyCharm work is about **letting the project's own environment and test runner own the workflow, and never letting the IDE's interpreter silently become a second source of truth**. Language rules live in [python.md](../../SKILL.md).

_Verified against PyCharm 2026.2.3 (September 2026) with Python 3.13 and pytest 8.x. The unified edition shipped 2025-04-16 with the 2025.1 release._

---

## 1. Editions & the Unified Release

- **One PyCharm, two tiers.** The free tier requires a non-commercial licence; the paid tier is for commercial use. Feature gating between tiers is narrower than the old Community/Professional split.
- **Check the licence state before relying on a feature.** A free-tier IDE in a commercial context is a licensing problem, not a configuration problem.
- **Non-commercial licences are per user and require periodic verification.** A lapsed one reverts the IDE to the free tier, which can disable the scientific-tooling plugins mid-project.
- **The IDE version is not the Python version.** The interpreter is selected per project from the environment, and is the thing every other Python feature reads from.

---

## 2. Environment Management

- **The project's own tool owns the environment, not the IDE.** `uv`, `poetry`, `pipenv`, or plain `venv` each have a corresponding PyCharm setting; pick the one the repo uses and configure the interpreter from it. Creating an ad-hoc interpreter inside the IDE is how a dependency goes missing in CI.
- **Commit the lockfile** (`uv.lock`, `poetry.lock`, `requirements.txt` with hashes) and never the `.venv` directory. The interpreter path is machine-specific and must be ignored.
- **Set the interpreter from the project tool, then verify** (Settings → Project → Python Interpreter shows the packages actually installed). A PyCharm setting that says the right path but a stale environment produces confident, wrong completions.
- **`.python-version` should be committed** if the project uses it, and the IDE should honour it — otherwise the IDE indexes 3.12 while CI runs 3.13 and a 3.13-only construct looks invalid in the editor.
- **A `src/` layout needs the source root marked as such** (Mark Sources), or imports resolve to the installed copy rather than your working copy. This is the most common PyCharm confusion.

```text
.venv/                # ignored
.python-version       # committed
pyproject.toml        # committed, project metadata + deps
uv.lock / poetry.lock # committed
src/myapp/            # marked as Sources
tests/
```

- **Never install into the system interpreter.** A project that "works in PyCharm" because of a globally-installed package is broken for everyone else and for CI.

---

## 3. Code Style & Quality

- **Configure the formatter and linter from the repo's config**, not from PyCharm defaults: `black`/`ruff format`, `ruff`, or `flake8`+`isort` in the tool's settings. The IDE formatter and the CLI formatter producing different output is a permanent source of reformat-only commits.
- **Use `ruff` where the project uses it** — it bundles lint and format, so one tool, one config, one version. Pre-commit hooks in the repo remain the shared enforcement, not the IDE's commit dialog.
- **Type hints pay off in the IDE specifically:** the type-checking inspection surfaces an annotation error the runtime never would. But a checker is CI's authority, not the editor's.
- **`mypy`/`pyright` in the IDE should read the same `config.toml`/`pyproject.toml` the CI uses**, or the editor's type state diverges from the build.
- **`.editorconfig` and `pyproject.toml` can conflict.** Pick one owner per setting; PyCharm honours both, and the precedence is not obvious.

---

## 4. Testing

- **Configure `pytest` as the test runner with the project's rootdir** (Settings → Tools → pytest). The default "unittest" runner misreads a pytest suite and reports confusing collection errors.
- **Run tests through the IDE's run configurations and the CLI alike**, and keep the configuration minimal: `pytest.ini`/`[tool.pytest]` in the repo is what both read.
- **Parametrised tests and fixtures work in the IDE's test view** the way they do in the CLI, provided the rootdir is right — if not, `Untested` code-coverage labels appear on code that a test does touch.
- **The coverage tool window is the fastest way to see a new test's effect**, but a coverage number is not a test: a branch that is executed but never asserts is covered and worthless.
- **Integration tests that need a service (DB, broker) belong in a run configuration with the right env/working directory**, not in a unit-test run that assumes nothing is listening.

---

## 5. Debugging & Profiling

- **Use the debugger's "Evaluate Expression"** for state at a meaningful frame, and conditional breakpoints for the "works for me" case, rather than sprinkle prints.
- **The built-in profiler is genuinely usable** (CPU, allocations, call tree) and does not require a separate tool for most projects; a sampling profiler like `py-spy` is the better answer for an already-running production process, where attaching a debug build is impractical.
- **Keep profiled builds out of timing-critical paths** — the profiler's own overhead changes what you are measuring; compare relative costs, not absolute milliseconds.
- **Attach to a running Python process** for anything served (Flask/Django dev server, worker), since a debugger-launched process is not the one under real load.
- **`pydevd` remote debugging over SSH/containers** works, but the host/port mapping must match; a mismatch shows as the process starting and no breakpoint ever hitting.
- **Break on raised exceptions for library-internal errors** — the traceback's first frame, not the last, is where the diagnosis starts.

---

## 6. Jupyter & Scientific Stack

- **Notebook support is the reason to pick PyCharm for scientific work.** The notebook editor, the variable/dataframe explorer, and the plot pane are integrated rather than bolted on.
- **Notebooks are hard to diff and easy to break.** Keep the reusable logic in importable modules and the notebook as a thin narrative over it; the IDE's refactorings do not work inside a notebook.
- **Set the kernel to the project interpreter.** A notebook kernel on a different Python than the project is a classic source of "import works in the notebook but not in the app".
- **The data science tool window (pandas/NumPy views) reads the live dataframe**, which is a faster route to a data-shape bug than a print statement.

---

## 7. JetBrains Shared Conventions

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search.**
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file, not a personal setting.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- The project's tool (`uv`/`poetry`/`venv`) owns the environment; the IDE reads it, never creates a competing one.
- Commit the lockfile and `.python-version`; ignore `.venv/` and the interpreter path.
- Mark `src/` as Sources or imports resolve to the installed copy.
- One formatter/linter from the repo, configured in the IDE to match; pre-commit hooks in the repo are the authority.
- pytest with the project's rootdir; type checker reads the same config as CI.
- Debugger for control flow, profiler for speed; notebooks stay thin over importable modules.

---

## Quick-Start Checklist

- [ ] Interpreter set from the project's environment tool (`uv`/`poetry`/`venv`), not an ad-hoc one
- [ ] `.venv/` and interpreter paths ignored; lockfile and `.python-version` committed
- [ ] `src/` marked as Sources, or imports resolve to the installed copy
- [ ] Python version in the IDE matches the CI/CI-runtime version
- [ ] Formatter and linter configured from the repo's config files
- [ ] Type checker (mypy/pyright) reading the same config as CI
- [ ] pytest configured as the test runner with the correct rootdir
- [ ] CI runs the real test suite, not a no-op
- [ ] Profiler verified to run on a realistic workload
- [ ] Notebook kernel bound to the project interpreter, if notebooks are used
- [ ] Reusable logic in importable modules, notebooks thin
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Pre-commit hooks owned by the repo, not the IDE's commit dialog
