# Chartist Best Practices: Workflow Checklist

A practical run sheet for applying [Chartist Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Creating Charts: **Constructor per chart; keep a reference:**
- [ ] 1. Creating Charts: **Series data as arrays; low/high/axisX/axisY in options set the scale.**
- [ ] 2. Styling via CSS: **The library outputs structured SVG classes — style them, don't pixel-hack:**
- [ ] 2. Styling via CSS: **Y-axis/energy via .ct-grid/.ct-labels CSS; consistent palette per series letter.**
- [ ] 3. Responsive & Scales: **responsive: true + fullWidth: true; the SVG adapts to container:**
- [ ] 3. Responsive & Scales: **Set axisX/axisY (labelInterpolationFnc, scale min/max via low/high) for sensible ranges.**
- [ ] 4. Animation & Plugins: **SVG CSS animations supported; simple animate via chart.on("draw", ...) hooks:**
- [ ] 4. Animation & Plugins: **Legend/plugins pass through plugins: [...]; mixing fragile features keeps the trade-off visible.**
- [ ] 5. Lifecycle & Integration: **chart.detach() on component unmount (SVG removed cleanly):**
- [ ] 5. Lifecycle & Integration: **Update: chart.update({series: [...]}) — reference the instance, avoid re-create storms.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
