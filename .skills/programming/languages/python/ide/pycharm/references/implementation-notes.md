# Implementation notes

Focused reference for **pycharm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
