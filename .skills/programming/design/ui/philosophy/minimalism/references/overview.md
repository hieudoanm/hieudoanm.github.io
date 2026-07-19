# Overview

Focused reference for **minimalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Minimalism as a Method

Minimalism is not a look. It is a **method of subtraction applied to a stated
purpose** — and "less" has no value on its own. A screen with one button is
minimal and useless. Minimalism only counts when the thing got _better at its
job_.

This is the philosophy layer. The brand skills are two different answers to it:

- `design/brand/google.md` (Material) subtracts to **remove the designer's
  opinion** — a huge neutral vocabulary so nothing biases anyone.
- `design/brand/nothing.md` (Nothing) subtracts to **concentrate character** — a
  tiny vocabulary and one accent, so the brand stays unmistakable.

Same verb, opposite outcomes. That is why "make it minimal" is the least useful
instruction in design, and why this skill starts by disambiguating it.

---

## 1. "Minimal" Means Four Different Things

Before cutting anything, decide which one was meant. They have different fixes,
and doing the wrong one damages the product.

| Reading                | What shrinks                  | Typical failure if you get it wrong         |
| ---------------------- | ----------------------------- | ------------------------------------------- |
| **Minimal interface**  | Controls, chrome, options     | Task completion collapses; users leave      |
| **Minimal expression** | Decoration, colour, motion    | Nothing changes functionally; effort wasted |
| **Minimal system**     | Tokens, variants, components  | Debt moves downstream into every screen     |
| **Minimal scope**      | Features, flows, capabilities | You shipped a demo and called it done       |

**Ask which one before you cut.** The most common mistake is treating "minimal"
as "minimal expression" when the actual problem was too many options.

---

## 2. What You Are Actually Removing

Three kinds of subtraction, and only two of them are usually legitimate.

- **Ornament** — decoration with no informational job. Always safe to remove.
- **Duplication** — the same information twice, or two paths to one destination.
  Always worth removing; it reduces cognitive load for free.
- **Choice** — options, preferences, and configuration. **Removing choice is the
  expensive one.** It is often correct (defaults beat configuration) and it can
  also take away legitimate user control. Decide per case.

The dangerous fourth: **capability**. Never remove a capability and call it
minimalism. That is scope reduction, and it needs a product decision, not a
design pass.
