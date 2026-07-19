# MATLAB Best Practices: 9. Testing & Verification

## Source guidance

This example applies the **9. Testing & Verification** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`matlab.unittest` framework** — `testCase.assertEqual`/`verifyEqual` contract tests:
- **Table-driven cases** — an input×expected block in a cell/table, iterated with a toggled-on row message.
- **Tolerances matter** — `AbsTol`/`RelTol` on floating asserts; never exact-equality on computed floats.
- **`checkcode`/`mlint` clean; run the whole suite with `runtests` in CI per release.**

## Example

```matlab
classdef summarizeTest < matlab.unittest.TestCase
    methods (Test)
        function knownCase(testCase)
            [m, s] = summarize([1 2 3]);
            testCase.verifyEqual(m, 2, 'AbsTol', 1e-12);
        end
    end
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for matlab-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
