# Implementation notes

Focused reference for **flat-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
