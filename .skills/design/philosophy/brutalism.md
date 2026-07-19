---
name: brutalism
description: Apply brutalist principles to web/app UI — raw structure, visible mechanics, no polish, and precision so it reads as intentional rather than broken. Covers when refusal-of-finish is the honest choice, the honest-state rule, and the accessibility floor that raw aesthetics do not override. Use when building dev tools, dashboards, status pages, terminals, prototypes, or when a surface is unfinished and polish would misrepresent it.
---

# Brutalism

Four philosophies in this directory form one map. Minimalism and maximalism vary
**how much** is present; flat and brutalism vary **how finished** it looks.

```text
                      polished                     raw
   less               minimalism                  brutalist minimalism
   more               maximalism                  brutalist maximalism
```

Brutalism is the refusal of finish. Where minimalism says _remove until the
structure is clear_, brutalism says **show the structure and stop there** — no
rounding, no gradients, no shadows, no smoothing, no borrowed convention.

**Roots:** the Swiss International Typographic Style's exposed grid, punk zines
and anti-design (constructivism, Luba Lukova), and early web brutalism — the
period around 2013–2015. **Distinct from brutalist architecture** (béton brut,
Le Corbusier, the Barbican), which is about raw concrete and shares only the
name.

**Living references:** Bloomberg Terminal, Hacker News, Tildes, sourcehut. Flat is
the opposite instinct — see `design/philosophy/flat.md`.

**The trade:** brutalism signals _this is a tool, not a performance_. It reads
honest and fast, and it throws away every affordance that sells a product.

---

## 1. Core Principles

- **Expose the document** — the page is a document; let it read like one. Show
  the grid, the rules, the raw values.
- **Structure is the ornament** — a visible border is decoration. Box-drawing is
  decoration. Reusing a system is decoration.
- **Precision is what makes it intentional** — sloppy raw UI is indistinguishable
  from broken UI. Every hard edge must be _decided_.
- **Information over impression** — show the data, the error, the empty state, the
  loading state. Honest states are the whole aesthetic.
- **Speed is aesthetic** — a page that loads instantly _is_ brutalist. Every
  dependency is decoration you declined.
- **Never lie about capability** — if the thing isn't finished, don't polish it.
  Polish implies done. Brutalism is the honest response.

---

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

- **Loading is text** — `LOADING…`, or a deterministic counter. Not a spinner,
  not a skeleton that lies about the layout.
- **Errors are the real error**, in full, with the code. Do not soften it into a
  friendly sentence.
- **Empty states say what to do next** — never an illustration.
- **Show the raw value beside the formatted one** when precision matters.
- **No false affordance** — do not make it look interactive if it is not, or the
  aesthetic becomes a trap.

---

## 6. When Brutalism Is the Honest Choice

- **Developer and internal tools** — dashboards, status pages, admin panels,
  terminals. Users want output, not an experience.
- **Debugging and incident surfaces** — during an incident, ornament is latency.
- **Speed-first prototypes** — build the thing, do not style it yet.
- **Unfinished products** — a rough surface sets a truthful expectation.
- **Content that is the interface** — reference material, archives, data dumps.

---

## 7. When It Is the Wrong Choice

- **Conversion surfaces** — pricing, checkout, onboarding, marketing. Users
  interpret rawness as brokenness or as a warning.
- **Premium and trust-sensitive products** — finance, health, legal. Detailing is
  the evidence of care.
- **Consumer brands** — if the product's value is the feeling, finish _is_ the
  product (`design/brand/nothing.md` is the opposite bet).
- **Accessibility-heavy contexts** — brutalism tempts you into small type, tight
  targets, and removing labels. Each is a real regression.
- **When you want "modern and clean"** — that is `design/philosophy/flat.md`.

---

## 8. The Floor

Raw aesthetics do not override accessibility. This is not decoration:

- Visible `:focus-visible` on every interactive element — more important here,
  since the whole aesthetic is low-contrast chrome.
- Accessible names on icon-only controls.
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI boundaries. Loud colour is not
  automatically high contrast.
- Touch targets ≥ 24×24px minimum, 44×44 for anything consumer-facing.
- Labels and units on every numeric value.
- `prefers-reduced-motion` honoured — trivial here, since motion is minimal.
- Zoom to 200% without loss of function.

**Precision cuts both ways:** brutalism's usual failure is not a11y but _legibility_
— borders that vanish on low-DPI, greys that fail contrast, text that is small
because "that's the look". Check it on a bad monitor.

---

## 9. Execution Rules

- **One typeface, one scale, one accent.** Brutalism is minimalism with the
  polish stripped; it does not license a wall of typefaces.
- **No framework's default look.** No component library's rounded, shadowed,
  gradient cards. Write the handful of styles you need.
- **No icon library defaults** — pick one set, use one stroke weight.
- **Few dependencies.** Every library is polish you declined. Justify each.
- **Raw input, honestly.** Use semantic elements before ARIA; the semantic version
  is usually both smaller and more brutal.

---

## General Rules of Thumb

- **Show the document.** The page is a document.
- **Zero radius, 1px borders, no shadows, no gradients.**
- **Monospace for data, system sans for prose.**
- **Everything interactive looks interactive** — underline everything.
- **Honest states** — real errors, real loading, real empty.
- **Keyboard-first**, and no hover-only affordance.
- **Precision is what separates brutalism from broken.**
- **One typeface, one scale, one accent.**
- **Never trade the a11y floor for the look.**
- **Raw is honest when the thing is genuinely unfinished.** It is not a
  substitute for doing the work.

---

## Quick-Start Checklist

- [ ] Job stated, and brutalism confirmed as the honest register (not just a look)
- [ ] System font stack chosen; no webfont without a stated reason
- [ ] Zero border-radius; no shadows, gradients, bevels, blur, or glass
- [ ] Dividers are 1px borders; colour blocks used structurally
- [ ] Real `<table>` and `<button>` semantics over div-soup
- [ ] All links underlined; no hover-only affordance
- [ ] Loading is text, not spinner or lying skeleton
- [ ] Errors shown in full with codes; empty states say what to do next
- [ ] Focus visible, accessible names present, contrast verified
- [ ] Keyboard path completes the primary task
- [ ] Motion minimal and functional; `prefers-reduced-motion` honoured
- [ ] One typeface, one scale, one accent; dependency count justified
