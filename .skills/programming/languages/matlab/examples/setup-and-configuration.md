# MATLAB Best Practices: 1. Arrays & Data Shape

## Source guidance

This example applies the **1. Arrays & Data Shape** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Everything is an array** — scalars, vectors, matrices, N-D arrays; think in terms of the whole array, not elements:
- **Know row vs column** — a "vector" is `1 x n` or `n x 1`; ambiguity between row/column vectors is a classic silent-broadcast bug. Use column vectors (`(:)`) consistently for signal/sequence data.
- **`size`/`numel`/`length` chosen by intent** — `size(A)` for the shape contract, `numel(x)` for element count; avoid `length` on non-vectors.
- **Hidden dimensions**: `size(A, dim)` and trailing singleton dims — broadcast semantics in `.^`/`./` operators matter.

## Example

```matlab
x = linspace(0, 2*pi, 1000);
y = sin(x);          % vectorized, no loop
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for matlab-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
