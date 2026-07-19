# Implementation notes

Focused reference for **highcharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Accessibility & Themes

- **Built-in a11y module: `accessibility: { enabled: true }`; describe charts:**

```js
accessibility: { enabled: true, keyboardNavigation: { enabled: true } }
```

- **`<title>`/desc via options (`chart.description`) for the SR; focus visible.**
- **Theme via `setOptions` once (colors/fonts) — consistent branding, no per-chart hacks.**

---

## 5. Interaction & Refreshing

- **`chart.update({series: [...]})` for data refresh — no recreate churn:**

```js
chart.update({ series: [{ name: "2025", data: newData }] });
```

- **`chart.destroy()` on teardown; events (`chart.events.load`) for hooks.**
- **Drilldown/range scroll only where the interaction is user-lead.**
