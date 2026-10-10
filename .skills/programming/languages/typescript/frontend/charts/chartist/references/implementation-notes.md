# Implementation notes

Focused reference for **chartist-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`responsive: true` + `fullWidth: true`; the SVG adapts to container:**
- **Set `axisX`/`axisY` (`labelInterpolationFnc`, `scale` min/max via `low`/`high`) for sensible ranges.**
- **Fixed container heights to avoid chart floor jumps.**

---

## 4. Animation & Plugins

- **SVG CSS animations supported; simple `animate` via `chart.on("draw", ...)` hooks:**
- **Legend/plugins pass through `plugins: [...]`; mixing fragile features keeps the trade-off visible.**
- **Don't depend on active bugfix velocity — feature parity with Chart.js/Recharts for complex need.**

---

## 5. Lifecycle & Integration

- **`chart.detach()` on component unmount (SVG removed cleanly):**
- **Update: `chart.update({series: [...]})` — reference the instance, avoid re-create storms.**
- **Events (`chart.on("created", ...)`) for post-creation hooks; keep DOM handlers for interactive extras.**
