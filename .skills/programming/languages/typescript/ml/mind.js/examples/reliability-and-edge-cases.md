# Mind.js Best Practices: 5. Performance & Limits

## Source guidance

This example applies the **5. Performance & Limits** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Mind.js is a compact/lightweight learner — small parities, not deep nets.**
- **Batch predictions; avoid per-call reconfig; typed-array friendly when possible.**
- **For bigger models switch to Brain.js/TensorFlow.js — document the trigger.**

## Example

A team applying **5. Performance & Limits** to a Mind.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Mind.js is a compact/lightweight learner — small parities, not deep nets.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mind-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
