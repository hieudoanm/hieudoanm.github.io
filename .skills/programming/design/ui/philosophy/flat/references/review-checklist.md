# Review checklist

Focused reference for **flat-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

A shadow isn't un-flat. **An ambient shadow used for lift is a correction, not a
compromise.** Pure flat is a style; shadow-for-elevation is a system.

---

## 9. Rules of Thumb for Execution

- **Never mix fill and stroke icons**, or two stroke weights.
- **Never use gradient as decoration.** As a functional elevation cue, acceptable;
  as a background flourish, no.
- **Never rely on hover as the only affordance.** It doesn't exist on touch.
- **Never use more than one radius per context.**
- **Never skip greyscale check** — it's the fastest test that colour isn't
  carrying structure.
- **Never let flat mean "no contrast"** — flat surfaces can easily fail
  accessibility.

---

## General Rules of Thumb

- **No z-depth** — no shadows, gradients, bevels, or textures, except one ambient
  lift if you need it.
- **Colour blocks replace depth cues** — that's the core move.
- **Borders or nothing** — one 1px hairline, not both.
- **Two or three surface values,** and they must be visible in greyscale.
- **Typography carries hierarchy** — one family, few sizes, two weights.
- **One icon family,** filled or stroked, never mixed.
- **Space separates before borders divide.**
- **Colour groups, never decorates**; one saturated hue, one job.
- **State never in colour alone.**
- **Flat is a choice now** — it needs a reason.

---

## Quick-Start Checklist

- [ ] Job and register confirmed — flat is chosen deliberately, not by default
- [ ] No drop shadows, gradients, bevels, gloss, or textures in chrome
- [ ] Ambient lift shadow, if any, is a single documented exception
- [ ] Two or three surface values; the step is visible in greyscale
- [ ] Elevation jobs mapped to surface/border, not shadow (table above applied)
- [ ] One radius value per context; consistent spacing scale
- [ ] One icon family, one grid, one stroke weight; never mixed
- [ ] Typography carries hierarchy; greyscale screenshot still reads
- [ ] Exactly one saturated hue, with a single stated job
- [ ] Hover states exist but are never the only affordance
- [ ] All interactive elements keyboard-reachable with visible focus
- [ ] Contrast ≥ 4.5:1 body, ≥ 3:1 large text and boundaries
- [ ] Works from 360px to wide; flat holds on touch
