# Workflow notes

Focused reference for **recharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
