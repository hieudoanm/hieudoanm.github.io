# PyCharm: 2. Environment Management

## Scenario

A project is working on **2. environment management** for PyCharm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **The project's own tool owns the environment, not the IDE.** `uv`, `poetry`, `pipenv`, or plain `venv` each have a corresponding PyCharm setting; pick the one the repo uses and configure the interpreter from it. Creating an ad-hoc interpreter inside the IDE is how a dependency goes missing in CI.
- **Commit the lockfile** (`uv.lock`, `poetry.lock`, `requirements.txt` with hashes) and never the `.venv` directory. The interpreter path is machine-specific and must be ignored.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Environment Management** section of [SKILL.md](../SKILL.md).
