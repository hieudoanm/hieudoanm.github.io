# Garph: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Forgetting the resolver shape must mirror schema exactly (untyped key mismatch → runtime error or TS error).
- Relying on implicit `any` in inference for unions/interfaces loops — write them explicitly when tricky.
- Not leveraging `g.enum(..., {valueMap})` leading to string-only enums losing runtime values.
- Over-abusing `g.ref` circular references without `g.lazy(...)` for self-references.

## Example

A team applying **6. Common Pitfalls** to a Garph project treats this guidance as a review gate. It checks whether the current implementation satisfies **Forgetting the resolver shape must mirror schema exactly (untyped key mismatch → runtime error or TS error).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for garph.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
