# Workflow notes

Focused reference for **minimalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 3. The Method

1. **State the job in one sentence.** "Confirm a refund." If you cannot, minimalism
   has no target and will drift into sparseness.
2. **Inventory what's on screen.** Every element, with what it is _for_. Most
   inventories immediately reveal two or three elements that serve no job.
3. **Mark each as primary, supporting, or incidental.** Anything that isn't
   primary or supporting is a cut candidate.
4. **Cut in order of increasing cost** — cheapest to reverse first, so mistakes
   are cheap and you learn before the expensive cuts.
5. **Verify each cut by task, not by eye.** Walk the job end to end. Screenshot
   review is not verification.

### Cut order

| Order | Cut                                               | Cost to reverse  |
| ----- | ------------------------------------------------- | ---------------- |
| 1     | Decoration, shadow, gradient, redundant icon      | Trivial          |
| 2     | Duplicate content and duplicate actions           | Trivial          |
| 3     | Unused options and preferences                    | Cheap            |
| 4     | Redundant states (empty, error, loading variants) | Cheap            |
| 5     | A whole component or step                         | Expensive        |
| 6     | A feature or capability                           | Product decision |

---

## 4. The Cost Ledger

Every element you keep is spending something. Ask what it buys.

- **Attention** — the scarcest resource. Two elements competing for the first
  glance means neither wins.
- **Maintenance** — every state, breakpoint, and theme variant is a test surface.
  This is the cost that quietly kills projects.
- **Accessibility** — extra focusable nodes, extra announcements, extra tab stops.
- **Responsive and theming** — each element multiplies across viewports and modes.

An element that buys nothing on any of these axes is not earning its place. An
element that buys one thing badly is a candidate for redesign, not deletion.

---

## 5. The Floor You May Not Cut Below

Minimalism never justifies degrading accessibility. These are not ornament:

- Visible `:focus-visible` indication on every interactive element.
- Accessible names on icon-only controls (`aria-label` or equivalent).
- Contrast meeting WCAG AA — 4.5:1 body, 3:1 large text and UI boundaries.
- Touch targets at or above the platform minimum.
- Labels, units, and units of measure on numeric and financial values.
- `prefers-reduced-motion` honoured.
- Text that reflows and remains readable when zoomed to 200%.

**Cognitive load is not the same as visual density.** Stripping labels and units
to make an interface look clean makes it harder to use, not easier. Reducing
_discovery cost_ is minimalism; reducing _comprehension cost_ is negligence.
