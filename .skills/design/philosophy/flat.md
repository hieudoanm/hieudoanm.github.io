---
name: flat-design
description: Apply flat design to web/app UI — reject depth cues, let colour blocks, borders, and typography carry hierarchy. Covers the post-skeuomorphic shift, expressing elevation without shadows, iconography and colour discipline, and when "flat" has hardened into a dated statement. Use for dashboards, SaaS, mobile apps, and any dense data UI that wants to read as clear and modern.
---

# Flat Design

Four philosophies in this directory form one map. Minimalism and maximalism vary
**how much** is present; flat and brutalism vary **how finished** it looks.

```text
                      polished                     raw
   less               minimalism                  brutalist minimalism
   more               maximalism                  brutalist maximalism
```

Flat rejects **depth**. Where minimalism says _remove until the structure is
clear_, flat says **remove the renderer's illusions and keep the clarity**.
Skewed panels, gradients, inner shadows, leather textures, and glass: gone. What
replaces them is colour, a 1px border, and space.

**History:** a relief from the skeuomorphic era — iOS 6's faux-leather maps and
compass, Windows Aero's glass — until iOS 7 (2014) and Material Design dropped it
and flat became the mainstream default. It was right for its moment and became so
unremarkable that "flat" is now a statement you have to choose on purpose.

**Distinct from:** brutalism, which rejects _finish_ too
(`design/philosophy/brutalism.md`); and minimalism, which is about _quantity_,
not depth. A flat screen can be dense — flat says nothing about how much is on it.

---

## 1. Core Principles

- **No z-depth** — no shadows, gradients, bevels, gloss, inner shadows, or
  textures. The surface is the surface.
- **Colour does the structural work** — solid blocks replace every depth cue.
  This is the core move; everything else follows.
- **Borders instead of elevation** — a 1px hairline, or nothing. Not both.
- **Typography carries hierarchy** — not size alone, not effects, not icon scale.
  Weight, colour, and spacing do the work.
- **Consistency over character** — one radius, one stroke weight, one icon family,
  one spacing scale. Flat is a system, not a mood.
- **Content first, and fast** — flat interfaces are light by default; anything
  that isn't structural is a cost.

---

## 2. Replacing Elevation

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

- **Space is the separator.** Generous, consistent spacing beats borders; if you
  can group with proximity, don't draw a line.
- **A strict radius rule** — usually 0 or one small value. Mixing 4px and 12px
  across a page reads as an accident.
- **Grid everywhere.** Flat's whole claim is competence; an off-grid element
  contradicts it.
- **Responsive by default.** Flat layouts that only work at desktop width aren't
  flat, they're unfinished.

---

## 6. Where Flat Shines

- **Dashboards and admin panels** — dense, data-forward, few users, long sessions.
- **SaaS products** — flat is the default register of B2B software.
- **Mobile apps** — small screens reward legibility over texture; the constraint
  aligns with the aesthetic.
- **Content and editorial** — the accent colours of content do the work, and a
  quiet chrome keeps them visible.
- **Accessibility-sensitive contexts** — flat removes gradients and texture, which
  are genuinely hard to read. Pair with solid colour and it holds up well.

---

## 7. Where It Fails

- **Warmth and brand** — flat is impersonal by construction. If the product's
  value is feeling, flat removes it (contrast `design/brand/nothing.md`, which
  uses flat monochrome _plus_ a dot-matrix identity).
- **Affordance** — without depth, "what is clickable" gets vague. Compensate with
  borders, underlines, and real hover states.
- **Long-form and product imagery** — flat chrome flattens photography; the two
  fight unless the chrome recedes.
- **Layer-heavy apps** — real applications need overlays, popovers, modals. Pure
  flat makes depth genuinely hard; a border-only system needs discipline to avoid
  z-index soup.
- **As a default now** — pure flat is ubiquitous, so "flat" no longer signals
  anything. Choosing it is a decision to look _plain_, which needs a reason.
- **Dense forms** — text inputs and selects were never flat, because they imply
  depth. Flat means either fully flat with borders, or accept hybrid.

---

## 8. The Hybrid Reality

Production UI stopped at pure flat around 2016. What's actually shipping:

- **Flat + one subtle shadow** — a `0 1px 2px rgba(0,0,0,.06)` to lift one layer
  off the page. Almost invisible, does the job.
- **Flat + tinted surfaces** — depth from a background step rather than a shadow.
- **Long-press / drag elevation** — shadow appears only while an element is
  actively lifted. This is the most elegant resolution and what modern mobile uses.
- **Frosted overlays** — material for genuinely floating layers
  (`design/brand/nothing.md` §7, Nothing OS 5.0).

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
