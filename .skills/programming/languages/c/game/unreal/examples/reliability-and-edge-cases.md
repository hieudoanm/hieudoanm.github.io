# Unreal Engine Best Practices: 8. Performance

## Source guidance

This example applies the **8. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile with the tools before touching systems** (`stat unit`, `stat game`, Unreal Insights, render-thread analysis).
- **Per-frame laws**: no per-frame allocations/reboxes, `UpdateOverlaps` guarded, `NetUpdateFrequency` respected, no per-frame component lookups in heavy loops.
- **`Async` heavy work** (`AsyncTask`, `FGraphEventRef`) off the game thread; do `GAsync` correct, never lock-shuffle the game thread.
- **`STATGROUP`/`SCOPE_CYCLE_COUNTER` for your own timing budgets.**
- **World partitions / `ToM/LevelStreaming`** for open-world scale; a single mega-level is the usual perf ceiling.

## Example

A team applying **8. Performance** to a Unreal Engine Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Profile with the tools before touching systems** (`stat unit`, `stat game`, Unreal Insights, render-thread analysis).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for unreal-engine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
