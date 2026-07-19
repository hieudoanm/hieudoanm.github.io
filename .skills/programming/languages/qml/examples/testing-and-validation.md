# QML Best Practices: 5. Quick-Start Checklist

## Source guidance

This example applies the **5. Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `import QtQuick 2.15` (or appropriate version) at top
- [ ] One component per file
- [ ] `Item { }` as root when no specific visual type needed
- [ ] `Repeater` or `ListView` for lists — not JavaScript `for` loops
- [ ] Signals used for component communication
- [ ] `Loader` for on-demand component loading

## Example

A team applying **5. Quick-Start Checklist** to a QML Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `import QtQuick 2.15` (or appropriate version) at top**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for qml-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
