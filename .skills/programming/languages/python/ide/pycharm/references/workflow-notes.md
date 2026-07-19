# Workflow notes

Focused reference for **pycharm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
