# ml5.js Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Model loaded once with `ready`/await; pinned CDN weights
- [ ] Infer with `classify(img, results)`; errors handled
- [ ] Transfer learning with balanced per-class samples; `train` watched
- [ ] Inference throttled (`frame % N`); canvas loops cheap
- [ ] Trained classifiers saved/loaded as artifacts
- [ ] Bias caveats documented; consent respected

## Example

A team applying **Quick-Start Checklist** to a ml5.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Model loaded once with `ready`/await; pinned CDN weights**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for ml5-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
