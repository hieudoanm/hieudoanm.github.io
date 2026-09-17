# Unity Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile the frame (`Profiler`, frame debugger) before optimizing** — "Unity is slow" is usually allocation or draw-call rose-colored glasses.
- **Hot-path laws:**
- **Object pooling (`ObjectPool`/custom) for spawned actors/bullets/particles** — no `Instantiate/Destroy` spam.
- **No per-frame allocation**: avoid allocating strings/lists/linq in `Update` (GC spikes).
- **`Physics` queries batched; triggers expanded (substeps) understood.**
- **Draw calls**: batching/atlasing/mesh combiner; `Static Batching` for static geometry; GPU instancing where materials match.

## Example

A team applying **7. Performance** to a Unity Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Profile the frame (`Profiler`, frame debugger) before optimizing** — "Unity is slow" is usually allocation or draw-call rose-colored glasses.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for unity-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
