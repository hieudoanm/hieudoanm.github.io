# NumPy Best Practices: 6. Integration & Testing

## Source guidance

This example applies the **6. Integration & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pandas data columns ↔ `df.to_numpy()`/`np.array(df)` cast explicitly (dtypes!).**
- **`np.testing.assert_array_equal`/`assert_allclose` in tests — exact float equality never.**
- **Seed/reproduce: `np.random.default_rng(seed)` over global `np.random`.**

## Example

A team applying **6. Integration & Testing** to a NumPy Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Pandas data columns ↔ `df.to_numpy()`/`np.array(df)` cast explicitly (dtypes!).****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for numpy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
