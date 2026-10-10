# Workflow notes

Focused reference for **brutalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Typography

- **System fonts by default** — `ui-monospace, SFMono-Regular, Menlo, monospace`
  for the machine register; `system-ui, -apple-system, Segoe UI, sans-serif` when
  prose is needed. A webfont is a statement; make it deliberately or don't.
- **Monospace carries the data**, proportional carries the reading. That split is
  the whole typographic idea.
- **Scale by necessity, not drama.** Brutalism is not maximalism — see
  `design/philosophy/maximalism.md`. Headlines are usually the same size as body,
  differentiated by weight or position.
- **Uppercase for structural labels**, not for emphasis. Labels look like field
  names: `STATUS`, `SIZE`, `UPDATED`.
- **Line length from the grid, not from taste.** Brutalist text is allowed to run
  long because the discipline comes from the column, not the measure.

---

## 3. Surfaces and Structure

- **Zero radius by default.** Radius is a decision; a non-zero radius must be
  justified. Buttons are rectangles.
- **1px borders are the only divider.** No shadows, no gradients, no bevels, no
  glass, no glow, no blur.
- **Colour blocks are structural.** A solid fill is how you group — this is the
  one place brutalism allows loud colour, because it does work.
- **Tables are the point.** Prefer a real `<table>` with visible rules over
  nested divs pretending to be one.
- **Alignment is the layout system.** One left edge. A visible baseline. Nothing
  floats "just so".
- **No vertical rhythm beyond the grid.** No clever spacing — consistent steps.

---

## 4. Interaction

- **Everything clickable looks clickable.** Underline links, visible borders on
  buttons, real `<button>` semantics. No hover-only affordance.
- **Underlines are not optional** — they are the honest affordance.
- **Instant state changes.** Brutalism resists animation. If there is motion, it
  is functional and short.
- **Keyboard is first, not an afterthought.** Terminal-grade interfaces are
  keyboard-driven; a dev tool that is mouse-only is broken.
- **No modal ceremony.** Inline disclosure over dialog. If you must confirm a
  destructive action, say it in a line.
- **Copy the raw identifier.** Let people copy IDs, hashes, versions — the thing
  they're actually there for.

---

## 5. Honest States

The core craft rule, and what separates brutalism from neglect.
