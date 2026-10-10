# Implementation notes

Focused reference for **brutalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
