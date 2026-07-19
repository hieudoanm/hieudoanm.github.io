# PyCharm: 4. Testing

## Scenario

A project is working on **4. testing** for PyCharm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Configure `pytest` as the test runner with the project's rootdir** (Settings → Tools → pytest). The default "unittest" runner misreads a pytest suite and reports confusing collection errors.
- **Run tests through the IDE's run configurations and the CLI alike**, and keep the configuration minimal: `pytest.ini`/`[tool.pytest]` in the repo is what both read.
- **Parametrised tests and fixtures work in the IDE's test view** the way they do in the CLI, provided the rootdir is right — if not, `Untested` code-coverage labels appear on code that a test does touch.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Testing** section of [SKILL.md](../SKILL.md).
