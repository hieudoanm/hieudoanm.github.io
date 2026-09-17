# MATLAB Best Practices: Starter Template

A reusable starting point derived from the **9. Testing & Verification** section of [MATLAB Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
