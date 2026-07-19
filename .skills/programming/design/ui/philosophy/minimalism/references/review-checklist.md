# Review checklist

Focused reference for **minimalism**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
