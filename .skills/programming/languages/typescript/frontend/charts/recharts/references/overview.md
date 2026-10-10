# Overview

Focused reference for **recharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Recharts Best Practices

Recharts is the **composable React charting library** — SVG primitives (`LineChart` + `Line`, `BarChart` + `Bar`, etc.) driven by a **data array with named keys and reusable `ResponsiveContainer`**. Practical Recharts leans on **a consistent data shape across charts (default x[key]/value[key] coordinates), `ResponsiveContainer` for sizing, minimal `Tooltip`/`Legend`/`CartesianGrid` composition, and memoized chart components** — the chart is a tree of props; data transformation belongs outside it.

---

## 1. Data Shape

- **Array of objects with explicit keys; same shape for every series:**

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

- **`dataKey` maps every series; no other coupling — transformation/logic happens before the chart.**
- **Consistent key naming (camelCase) across the app; never render raw floats.

---

## 2. Composition
