# Implementation notes

Focused reference for **recharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
