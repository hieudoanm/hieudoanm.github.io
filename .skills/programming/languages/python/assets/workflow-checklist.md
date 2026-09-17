# Python Best Practices: Workflow Checklist

A practical run sheet for applying [Python Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **src/ layout** (src/myapp/) so tests import the installed package, not your working directory — catches missing-__init__ and packaging bugs early
- [ ] 1. Project Structure: **Keep __init__.py minimal or empty** — no import-time side effects; factories/version strings go in modules, not in package import
- [ ] 2. Type Hints & Typing: **Annotate all public function signatures** — the signature is the contract; static checkers (mypy/pyright) and your IDE both read it:
- [ ] 2. Type Hints & Typing: **from __future__ import annotations** (Python 3.7+; default in 3.12+) so all hints are lazy and | unions work everywhere
- [ ] 3. Data Classes & Models: **@dataclass over hand-written __init__** — __eq__, __repr__, and (with frozen=True) hashability for free:
- [ ] 3. Data Classes & Models: **frozen=True for value objects** — immutable records behave like values and are safe to share; use dataclasses.replace(obj, field=...) for updates instead of mutating
- [ ] 4. Error Handling: **Narrow, specific except** — catch ValueError where ValueError is possible, not bare except:. Broad catches (except Exception) hide failure paths; broad swallows (except Exception: pass) are almost always wrong
- [ ] 4. Error Handling: **Raise with context and chaining** — raise ... from cause preserves the original traceback and makes causality explicit:
- [ ] 5. Paths & File I/O: **pathlib.Path over os.path** — composable, readable, cross-platform:
- [ ] 5. Paths & File I/O: **Use the Path methods** (read_text, write_text, glob, iterdir, with_suffix) instead of open()/string concatenation; build paths with /, never + or f-strings

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
