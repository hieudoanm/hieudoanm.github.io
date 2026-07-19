# Synaptic Best Practices: 5. Performance

## Source guidance

This example applies the **5. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **JS engines fine for small nets; batch inference in typed-array loops.**
- **For larger/dense workloads, consider WebAssembly/tensor backends (Synaptic is a learning tool — 100s of params, not millions).**
- **Avoid per-call allocation churn; preallocate activation arrays.**

## Example

A team applying **5. Performance** to a Synaptic Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****JS engines fine for small nets; batch inference in typed-array loops.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for synaptic-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
