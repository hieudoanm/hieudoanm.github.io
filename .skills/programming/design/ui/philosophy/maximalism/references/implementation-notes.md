# Implementation notes

Focused reference for **maximalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Typography

- **Display face does the drama.** Maximalism usually needs a characterful
  headline face; a neutral grotesque will not carry a dense page.
- **Extreme scale range** — a display size several times the body size. Relative
  steps read as timid on a maximalist page.
- **Pair at most two families**, ideally a display face plus one text face with
  real character. Ornament in type replaces ornament in layout.
- **Body text stays readable and unbothered** — it gets the quiet pocket, its own
  measure, and no pattern. Legibility is where maximalism fails first.

---

## 8. Motion

- **Choreograph, do not ambient-animate.** Maximalism allows more motion than
  minimalism, but as _sequences_ — staggered arrivals, ordered reveals — not as
  constant drift.
- **Longer durations are appropriate** — 400–800ms for theatrical reveals. Fast
  motion reads as responsive; slow reads as considered. Pick one deliberately.
- **Staggering is the signature** — elements arriving in sequence is the maximalist
  equivalent of density.
- **Never animate for atmosphere on a task surface.** Ornamental motion on a
  form is a defect regardless of taste.

---

## 9. Where Maximalism Works

- **Brand and identity surfaces** — the page is the brand statement. This is the
  home turf.
- **Editorial and cultural** — music, film, food, fashion, art, publishing.
  Richness of the content is the justification.
- **Rich product categories** — coffee, whisky, wine, records, sneakers. Detail,
  provenance, and texture are what the buyer came for.
- **Campaigns, launches, anniversaries** — time-boxed, so the density costs
  nothing.
- **Portfolio and showcase sites** — the work is the ornament's subject.
- **Print, packaging, poster, album art** — the medium was built for it.
- **Deliberate subversion** — when the category is uniformly beige and you are
  not. Contrast is part of the strategy.

---

## 10. Where It Fails

- **Operational and data-dense tools** — density actively harms. Use
  `design/philosophy/flat.md` or `design/philosophy/minimalism.md`.
- **Tasks with a completion criteria** — checkout, forms, settings. Ornament
  competes with the task and users pay for it in errors.
- **Thin content** — maximalism over poor content reads as desperation, because
  the ornament is carrying weight nothing else will.
- **Audiences who came for speed** — utilitarian users read decoration as cost.
- **Trust-sensitive and enterprise surfaces** — density reads as lack of control.
- **Performance-constrained targets** — patterns, large imagery, and motion are
  expensive, and the audience is often on poor hardware or poor connections.
- **Accessibility budgets** — this is the real constraint, see below.

---

## 11. The Accessibility Cost

Maximalism spends the accessibility budget faster than any other philosophy here.
These are not negotiable:

- **Body text contrast ≥ 4.5:1, large text and UI boundaries ≥ 3:1.** Pattern and
  saturated backgrounds destroy contrast; verify the actual composited result,
  not the text colour in isolation.
- **Pattern is never the sole carrier of meaning.** Textures that encode state
  need a redundant cue — text, shape, or position.
- **`prefers-reduced-motion` honoured** — and on maximalist motion this matters
  most, since staggered theatrical sequences are exactly what triggers vestibular
  symptoms.
- **Text remains resizable to 200%** without the pattern overlapping it. Fixed
  decorative layers are where this breaks first.
- **Never encode status in colour alone** — harder to honour when the whole page
  is saturated.
