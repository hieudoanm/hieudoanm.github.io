# NumPy Best Practices: 3. Vectorization

## Source guidance

This example applies the **3. Vectorization** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Vectorize the hot paths — masks, ufuncs, reductions:**
- **No Python for-loops over element-by-element math; `np.where`, `np.select` for branches.**
- **`np.einsum`/matrix ops for tensor math; keep loops at the unit-of-work boundary, not per element.**

## Example

```python
scores = np.array([...])
passed = scores[scores >= THRESHOLD]          # boolean masking
fs = np.sqrt(np.sum(np.square(delta)))        # whole-array
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for numpy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
