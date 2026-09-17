# GDScript Best Practices: 5. Performance & Memory

## Source guidance

This example applies the **5. Performance & Memory** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Reuse/`pool` where hot (bullets, particles) — `queue_free` on death, spawn via preloaded scenes:**
- **`get_node`/paths cached (`@onready`); string lookups in `_process` are the slow path.**
- **`@export` typed + `@tool` scripts only where the editor benefit is real.**
- **Avoid allocations in `_process` (temp arrays/strings); dirty-flag the work outside the frame.**

## Example

A team applying **5. Performance & Memory** to a GDScript Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Reuse/`pool` where hot (bullets, particles) — `queue_free` on death, spawn via preloaded scenes:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gdscript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
