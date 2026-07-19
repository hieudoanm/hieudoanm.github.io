---
name: recharts-best-practices
description: Best practices for data visualization with Recharts — the React charting conventions for composable dashboards. Use when writing, structuring, or reviewing Recharts — covers components, data shape, tooltips, responsiveness, animation, and performance.
---

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

- **Compose primitives per chart type; reuse the structure:**

```jsx
<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>…</AreaChart>
</ResponsiveContainer>
```

- **`ComposedChart` for mixed series (line + bar); `Area`/`Bar` share the axis model.**
- **Grid/tooltip/legend as children — keep a steady chart shell per layout.**

---

## 3. Tooltip & Accessibility

- **Custom `Tooltip` content component with typed props; default minimal:**

```jsx
<Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
```

- **`accessibilityLayer` where charts must be screen-reader friendly — title/desc set.**
- **`Legend` explicit `formatter`/`iconSize`; hide when the graph self-explains.**

---

## 4. Responsiveness

- **`ResponsiveContainer` owns parent sizing:**

```jsx
<ResponsiveContainer width="100%" height="70%">
```

- **Parent must have a resolvable height (fixed or `vw`-based) — the classic hang.**
- **Resize handled by the container; SPA remounts keep the same wrapper.**

---

## 5. Animation & Performance

- **`isAnimationActive` toggle for bulk/inital — animation cost is real:**

```jsx
<Line isAnimationActive={false} dataKey="revenue" />
```

- **Memoize heavy chart children (`React.memo`) where data props scalar-fluent.**
- **Aggregate/down-sample before prop-drilling into charts; cap series count.**

---

## 6. They-Lifecycle & Types

- **Charts as presentational components — data via props, no fetch inside.**
- **Typed `data` (arrays of interfaces) — the `<Line dataKey>` string maps to a typed field.**
- **Version-pinned; watch for re-mount regressions on data-identity changes (stable identity via useMemo).**

---

## General Rules of Thumb

- **One data shape; `dataKey` maps; transform before the chart.**
- **Compose from primitives; `ResponsiveContainer` for sizing.**
- **Tooltip/legend minimally configured; a11y layer for SR.**
- **Animation off for bulk; memoized components.**
- **Presentational charts; typed data; pinned version.**

---

## Quick-Start Checklist

- [ ] Consistent `data` keys + typed arrays across charts
- [ ] Chart composited from primitives; shell reused per layout
- [ ] `ResponsiveContainer` with resolvable parent height
- [ ] `Tooltip`/legend configured; `accessibilityLayer` where SR matters
- [ ] `isAnimationActive:false` for bulk; memoized chart children
- [ ] Data aggregated; version pinned; tests snapshot chart behavior