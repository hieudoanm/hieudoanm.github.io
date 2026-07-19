# Pandas Best Practices: 5. Performance

## Source guidance

This example applies the **5. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Vectorized ops over loops; `df.to_numpy()` for NumPy math, back to columns after.**
- **`Categorical` dtype for low-cardinality string columns (memory + speed).**
- **`filters on date ranges` with a DatetimeIndex (`df.loc[df.index >= "2024-01-01"]`) — not string compares.**
- **Parallelism: `polars`-style alternatives or `swifter` only when numpy-vectorized paths exhausted.**

## Example

A team applying **5. Performance** to a Pandas Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Vectorized ops over loops; `df.to_numpy()` for NumPy math, back to columns after.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for pandas-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
