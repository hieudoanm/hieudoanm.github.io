# Recharts Best Practices: Basic Usage

Best practices for data visualization with Recharts — the React charting conventions for composable dashboards. Use when writing, structuring, or reviewing Recharts — covers components, data shape, tooltips, responsiveness, animation, and performance.

## Scenario

Use this example as a starting point when applying **recharts-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Data Shape** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
