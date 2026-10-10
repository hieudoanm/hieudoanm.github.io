# Matplotlib Best Practices: Workflow Checklist

A practical run sheet for applying [Matplotlib Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Figures & Axes: **OO API — create the figure once, draw on axes:**
- [ ] 1. Figures & Axes: **plt.subplots(nrows=1, ncols=2) for side-by-side; figsize deliberate (not default for prints).**
- [ ] 2. Style: **Aesthetic consistency — a named palette + coherent ticks/grid:**
- [ ] 2. Style: **cycler/Set2-style colormaps over the default rainbow; labels + legend on every plot.**
- [ ] 3. Subplots & Layouts: **fig, axes = plt.subplots(b, a, sharey=True, ...) tagged loop over axes.flat:**
- [ ] 3. Subplots & Layouts: **tight_layout()/constrained_layout=True for clean spacing; fig.savefig(...) at the end.**
- [ ] 4. Plotting Choices: **Line/scatter/bar/hist mapped to data: time series = lines, categories = bars/box, distributions = hist/KDE.**
- [ ] 4. Plotting Choices: **ax.axhline/ax.axvline for reference thresholds; annotate points with ax.annotate.**
- [ ] 5. Export & Sharing: **fig.savefig("out.png", dpi=300, bbox_inches="tight") — dpi/formats explicit:**
- [ ] 5. Export & Sharing: **Vector formats (PDF/SVG) for documents; PNG at target dpi for the screen.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
