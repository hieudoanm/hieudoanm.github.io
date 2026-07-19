# Review checklist

Focused reference for **recharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
