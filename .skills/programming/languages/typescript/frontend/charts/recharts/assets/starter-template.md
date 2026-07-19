# Recharts Best Practices: Starter Template

A reusable starting point derived from the **1. Data Shape** section of [Recharts Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```jsx
const data = [
  { month: "Jan", revenue: 120, costs: 90 },
  { month: "Feb", revenue: 130, costs: 85 },
];

<LineChart data={data}>
  <XAxis dataKey="month" />
  <YAxis />
  <Line dataKey="revenue" stroke="#2563eb" />
  <Line dataKey="costs" stroke="#dc2626" />
</LineChart>
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
