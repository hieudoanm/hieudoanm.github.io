# Godot Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Small composed scenes; one scene per entity
- [ ] Signals/groups decoupling; `@onready` refs; no tree scans in loops
- [ ] `delta`-integrated movement; correct main-loop hooks
- [ ] `Resource` for stats/config; versioned saved-game serialization
- [ ] InputMap action handling; audio buses organized
- [ ] Export presets; profiler-guided optimization; VCS-clean project

## Example

A team applying **Quick-Start Checklist** to a Godot Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Small composed scenes; one scene per entity**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for godot-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
