# Review checklist

Focused reference for **brutalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
