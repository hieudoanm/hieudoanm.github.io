# Mongoose Best Practices: 7. Performance & Memory

## Source guidance

This example applies the **7. Performance & Memory** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Lean reads, indexed writes, explicit projection** — the three knock-down wins.
- **Watch for `populate` storms** — nested populate chains are N+1 in disguise; consider denormalizing the display field.
- **Bulk operations for batch sync** (`bulkWrite`/`insertMany` with `ordered: false` + `skipValidation` only when deliberate).
- **Stream/`cursor()` for huge result sets** — don't `.exec()` a million-doc query into RAM.

## Example

A team applying **7. Performance & Memory** to a Mongoose Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Lean reads, indexed writes, explicit projection** — the three knock-down wins.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mongoose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
