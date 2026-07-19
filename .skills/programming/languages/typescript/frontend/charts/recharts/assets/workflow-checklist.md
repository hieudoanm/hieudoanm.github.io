# Recharts Best Practices: Workflow Checklist

A practical run sheet for applying [Recharts Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Data Shape: **Array of objects with explicit keys; same shape for every series:**
- [ ] 1. Data Shape: **dataKey maps every series; no other coupling — transformation/logic happens before the chart.**
- [ ] 2. Composition: **Compose primitives per chart type; reuse the structure:**
- [ ] 2. Composition: **ComposedChart for mixed series (line + bar); Area/Bar share the axis model.**
- [ ] 3. Tooltip & Accessibility: **Custom Tooltip content component with typed props; default minimal:**
- [ ] 3. Tooltip & Accessibility: **accessibilityLayer where charts must be screen-reader friendly — title/desc set.**
- [ ] 4. Responsiveness: **ResponsiveContainer owns parent sizing:**
- [ ] 4. Responsiveness: **Parent must have a resolvable height (fixed or vw-based) — the classic hang.**
- [ ] 5. Animation & Performance: **isAnimationActive toggle for bulk/inital — animation cost is real:**
- [ ] 5. Animation & Performance: **Memoize heavy chart children (React.memo) where data props scalar-fluent.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
