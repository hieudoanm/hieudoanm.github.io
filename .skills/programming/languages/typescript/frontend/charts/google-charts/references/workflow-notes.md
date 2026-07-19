# Workflow notes

Focused reference for **google-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. DataTable Semantics

- **Typed columns over raw arrays:**

```js
const data = new google.visualization.DataTable();
data.addColumn("string", "Month");
data.addColumn("number", "Revenue");
data.addRows([["Jan", 120], ["Feb", 95]]);
```

- **`addRole`/`{ role: "style" }` columns for per-point styling; `group`/`filter` for view transforms.**
- **Array-form via `new DataTable({cols, rows})` — but typed `addColumn` reads better.**

---

## 3. Charts & Options

- **Pick the class per semantics; render with explicit options:**

```js
const chart = new google.visualization.LineChart(el);
chart.draw(data, { title: "Revenue", hAxis: { title: "Month" }, vAxis: { minValue: 0 }, legend: { position: "bottom" } });
```
