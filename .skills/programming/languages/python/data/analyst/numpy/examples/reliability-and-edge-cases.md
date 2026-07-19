# NumPy Best Practices: 5. Memory & Performance

## Source guidance

This example applies the **5. Memory & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Views vs copies: `view()`/slicing returns views; loss of data writes requires `.copy()`.**
- **`np.save`/`np.load` (`.npy`) for arrays; `astype` before down/precision casts.**
- **`@out=` / `out=np.empty` for large in-place accumulation; avoid Python-scope churn on arrays.**
- **`np.lib.stride_tricks`/`sliding_window_view` for windowing — with the performance rules documented.**
- **Parallelism via NumPy's BLAS (no explicit threads needed); memoize the `as_strided` recipes.**

## Example

A team applying **5. Memory & Performance** to a NumPy Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Views vs copies: `view()`/slicing returns views; loss of data writes requires `.copy()`.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for numpy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
