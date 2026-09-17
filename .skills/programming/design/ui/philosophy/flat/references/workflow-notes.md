# Workflow notes

Focused reference for **flat-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

This is the whole practical problem. Shadows carried hierarchy; you must move that
weight onto colour, borders, and space.

| Job               | Skeuomorphic answer | Flat answer                |
| ----------------- | ------------------- | -------------------------- |
| Card above page   | Drop shadow         | Surface step or 1px border |
| Panel vs. sidebar | Inner shadow        | Different background value |
| Popover           | Heavy shadow        | Border + surface, high z   |
| Button pressed    | Bevel / inset       | Background step            |
| Modal             | Shadow + dim        | Dim scrim + border         |

- **Two surface values, three.** Page, raised surface, overlay. More than three and
  the hierarchy stops being legible.
- **The step between surfaces should be perceptible in greyscale** — if you can't
  see it without hovering, it isn't carrying anything.
- **If you need a shadow to signal "floating", you need a border instead.**

---

## 3. Colour

- **Flat colour means no shading inside the colour** — no darker edge on a button,
  no lighter top on a card. One value per surface.
- **Use colour to group, not to decorate.** A block is a structural element; a
  palette of pastels on every card is decoration.
- **Reserve a saturated hue for one job** — the primary action, or the selected
  state. Everything else is neutral.
- **Never encode state in colour alone** — pair with text, icon, or shape. Flat
  removes shading, so affordance has to come from somewhere.
- **Test in greyscale** — if the hierarchy survives, the colour is doing support
  work. If it collapses, colour is doing the job colour shouldn't.

---

## 4. Typography and Icons

- **Typography is the primary hierarchy tool** — one family, four or five sizes,
  two weights. Everything else is layout.
- **Icons: one family, one grid, one weight.** Decide filled or stroked and never
  mix. A 2px filled icon beside a 1.5px stroked icon is the fastest way to look
  unfinished.
- **Geometric, simple forms.** Depth-rendered icon sets (3D, skeuomorphic) break
  the language instantly.
- **Icon buttons still need an accessible name** — flat has fewer affordances, so
  labels matter more, not less.

---

## 5. Layout
