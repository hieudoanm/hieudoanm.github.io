---
name: minimalism
description: Apply minimalism as a working method for web/app interfaces — what to subtract, in what order, and the floor you may not cut below. Covers the four distinct meanings of "minimal", the cut ledger, defaults over configuration, and when minimalism is the wrong goal. Use when asked to simplify or clean up UI, when a screen feels heavy or cluttered, or when reviewing whether a reduction actually improved the interface.
---

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

---

## 3. The Method

1. **State the job in one sentence.** "Confirm a refund." If you cannot, minimalism
   has no target and will drift into sparseness.
2. **Inventory what's on screen.** Every element, with what it is _for_. Most
   inventories immediately reveal two or three elements that serve no job.
3. **Mark each as primary, supporting, or incidental.** Anything that isn't
   primary or supporting is a cut candidate.
4. **Cut in order of increasing cost** — cheapest to reverse first, so mistakes
   are cheap and you learn before the expensive cuts.
5. **Verify each cut by task, not by eye.** Walk the job end to end. Screenshot
   review is not verification.

### Cut order

| Order | Cut                                               | Cost to reverse  |
| ----- | ------------------------------------------------- | ---------------- |
| 1     | Decoration, shadow, gradient, redundant icon      | Trivial          |
| 2     | Duplicate content and duplicate actions           | Trivial          |
| 3     | Unused options and preferences                    | Cheap            |
| 4     | Redundant states (empty, error, loading variants) | Cheap            |
| 5     | A whole component or step                         | Expensive        |
| 6     | A feature or capability                           | Product decision |

---

## 4. The Cost Ledger

Every element you keep is spending something. Ask what it buys.

- **Attention** — the scarcest resource. Two elements competing for the first
  glance means neither wins.
- **Maintenance** — every state, breakpoint, and theme variant is a test surface.
  This is the cost that quietly kills projects.
- **Accessibility** — extra focusable nodes, extra announcements, extra tab stops.
- **Responsive and theming** — each element multiplies across viewports and modes.

An element that buys nothing on any of these axes is not earning its place. An
element that buys one thing badly is a candidate for redesign, not deletion.

---

## 5. The Floor You May Not Cut Below

Minimalism never justifies degrading accessibility. These are not ornament:

- Visible `:focus-visible` indication on every interactive element.
- Accessible names on icon-only controls (`aria-label` or equivalent).
- Contrast meeting WCAG AA — 4.5:1 body, 3:1 large text and UI boundaries.
- Touch targets at or above the platform minimum.
- Labels, units, and units of measure on numeric and financial values.
- `prefers-reduced-motion` honoured.
- Text that reflows and remains readable when zoomed to 200%.

**Cognitive load is not the same as visual density.** Stripping labels and units
to make an interface look clean makes it harder to use, not easier. Reducing
_discovery cost_ is minimalism; reducing _comprehension cost_ is negligence.

If a cut requires one of the above to pay for it, it is the wrong cut.

---

## 6. Defaults Over Configuration

The highest-leverage minimalism move is not deleting anything — it is **choosing
for the user**.

- One sensible default beats an empty field plus a help paragraph.
- One recommended path beats five equal ones.
- Sensible input formatting beats format documentation.
- Persist the choice; do not ask twice.

But a default is a **product** decision with a real cost: the user who wanted
something else now has to go find it. Give an escape hatch wherever the
population genuinely differs, and make it discoverable without cluttering the
common path.

---

## 7. Progressive Disclosure

Show the minimum that lets the next action happen; reveal depth on demand.

- Primary action visible, everything else behind one disclosure.
- Detail on demand rather than always rendered.
- Filters collapsed until the list is too long to scan.
- Progressive disclosure costs a click — so never hide something needed for the
  _first_ action. Hidden essentials are the classic minimalism failure.

---

## 8. Where Minimalism Is the Wrong Goal

Minimalism is a poor primary objective when:

- **Trust is the product** — finance, health, safety. Users read detail as
  evidence, and stripping it reads as concealment. Show the number, the date,
  the source.
- **Density is the job** — trading terminals, monitoring, professional tools.
  The right move is better hierarchy and scanning, not fewer items.
- **Discoverability is everything** — consumer products with unknown demand.
  Hiding capability means it never gets found.
- **The brand is the product** — an identity needs one expressive moment;
  removing all expression leaves nothing.
- **The team is early and the problem is unsolved** — minimalism presumes a known
  job. Premature simplification locks in the wrong shape and is expensive to undo.

In these cases, the correct target is **clarity**, not reduction. Make the same
information legible at a glance — that is usually a hierarchy problem, not a
quantity problem.

---

## 9. Verifying a Reduction

Minimalism that isn't measured is just taste. Check:

- **Did the job get faster or clearer?** Time-to-complete on the primary task.
- **Did the hierarchy sharpen?** Three levels, and one clear first glance.
- **Did anything get hidden that was needed?** Re-walk the job.
- **Did the floor hold?** Focus, names, contrast, targets, units all intact.
- **Did complexity move instead of vanish?** Count tokens, variants, and states
  before and after. If they went up, you made it minimal in appearance only.

**A reduction that cannot state what it improved was not minimalism.** It was a
preference, and preferences don't survive the next contributor.

---

## 10. Minimalism Applied to Code

The principle carries into the codebase, where it pays rent every day.

- **Fewer tokens beat more tokens.** A six-step ramp with a rule beats a
  twelve-step ramp with twelve decisions.
- **Two layers, not four** — primitive and semantic. A component-token layer is
  where hand-rolled systems go to die.
- **Delete unused tokens.** An unused token is not free; it is an invitation to
  use it, and it outlives the reason it existed.
- **One obvious way to do the common thing.** Two components for the same job is
  a decision deferred, and deferral compounds.
- **Enforce it in CI.** Lint raw hex values and magic numbers. Minimalism that
  depends on reviewer vigilance decays within two sprints.

---

## General Rules of Thumb

- **Minimal means _better at_, never just _less_.**
- **Ask which of the four** — interface, expression, system, or scope.
- **Ornament and duplication are free cuts; choice is not.**
- **Cut cheapest-to-reverse first**, and verify each cut by task, not by eye.
- **Every kept element spends attention, maintenance, and a11y** — make it pay.
- **The floor is not negotiable** — focus, names, contrast, targets, units.
- **Cognitive load ≠ visual density**; cutting comprehension cost is negligence.
- **Choose for the user** — defaults over configuration, with an escape hatch.
- **Never hide what the first action needs.**
- **When trust, density, or discovery is the job, target clarity, not reduction.**
- **Measure it** — if you can't say what improved, it was a preference.

---

## Quick-Start Checklist

- [ ] The job stated in one sentence before any cutting began
- [ ] Reading of "minimal" identified: interface, expression, system, or scope
- [ ] Screen inventoried with each element's purpose marked
- [ ] Elements classified primary / supporting / incidental
- [ ] Cuts applied cheapest-to-reverse first, verifying by task after each
- [ ] No capability removed without a product decision
- [ ] Floor held: focus, accessible names, contrast, targets, units, reduced-motion
- [ ] Defaults chosen over configuration, with escape hatch where populations differ
- [ ] Nothing needed for the first action hidden behind disclosure
- [ ] Result measured: task time, hierarchy sharpness, token/variant count
- [ ] The improvement stated in a sentence — otherwise it was a preference
