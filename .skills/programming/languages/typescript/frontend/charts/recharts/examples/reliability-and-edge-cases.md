# Recharts Best Practices: 5. Animation & Performance

## Source guidance

This example applies the **5. Animation & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`isAnimationActive` toggle for bulk/inital — animation cost is real:**
- **Memoize heavy chart children (`React.memo`) where data props scalar-fluent.**
- **Aggregate/down-sample before prop-drilling into charts; cap series count.**

## Example

```jsx
<Line isAnimationActive={false} dataKey="revenue" />
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for recharts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
