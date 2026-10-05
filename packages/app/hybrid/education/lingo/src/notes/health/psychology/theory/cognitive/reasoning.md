---
"title": "Reasoning"
"subtitle":
  "Deductive rules, inductive risk, and the systematic errors that show up every
  time the same shortcuts get used."
"parentLink":
  "href": "/psychology/cognitive/"
  "label": "Cognitive Psychology"
"references":
  - "href": "https://en.wikipedia.org/wiki/Reasoning"
    "label": "Wikipedia: Reasoning"
    "description":
      "Overview of deductive, inductive, abductive and analogical reasoning."
  - "href": "https://en.wikipedia.org/wiki/Formal_fallacies"
    "label": "Wikipedia: Formal Fallacies"
    "description":
      "The invalid forms and why each one fails, with counterexamples."
  - "href": "https://en.wikipedia.org/wiki/Cognitive_bias"
    "label": "Wikipedia: Cognitive Bias"
    "description":
      "Catalogues of the biases replicated through replication projects."
  - "href": "https://en.wikipedia.org/wiki/Heuristics_(cognitive_science)"
    "label": "Wikipedia: Heuristics"
    "description":
      "The efficiency–accuracy trade-off and the availability and
      representativeness heuristics."
---

## Reasoning is inference under constraint

Reasoning is the drawing of conclusions from premises. What makes it a
psychological problem rather than only a logical one is that humans do it under
time pressure, with limited working memory, on incomplete information, and
usually with a reason to be wrong rather than a reason to be right.

Two kinds get confused constantly. **Deductive** reasoning moves from premises
to a conclusion that is guaranteed if the premises are true — the conclusion
cannot be false while the premises are true, but there is also no content in the
conclusion that was not already in the premises. **Inductive** reasoning moves
from observations to a generalisation, which adds content and carries risk. All
of experimental reasoning is inductive; all of proof checking is deductive.

## Deductive inference

Two valid forms carry most of the weight.

**Modus ponens**: if _P_ then _Q_; _P_; therefore _Q_. Valid, and it is the form
people apply most reliably — with one condition. If the conditional is misread
as biconditional, and _P_ is false, the correct answer is _not Q_, and the
biconditional reading produces _Q_. Denying the antecedent is invalid for
exactly that reason: the car being stolen yesterday does not show the alarm
worked.

**Modus tollens**: if _P_ then _Q_; _not Q_; therefore _not P_. Valid, and
noticeably less often used than modus ponens, though people detect the invalid
version of it faster.

Modus tollens only holds if the conditional is true. \"If a whale is a mammal,
then it breathes\" is true; \"if it breathes, it is a whale\" is not, and the
inverse error — affirming the consequent — is a fallacy of everyday argument
rather than a rare formal slip.

Three formal fallacies recur often enough to name.

**Ad hominem** attacks the arguer instead of the argument, and can be true while
being irrelevant. **Appeal to authority** treats a claim as settled because of
who said it, which is sound only where the speaker has relevant expertise and is
trustworthy in that domain. **Appeal to popularity** takes widespread belief as
evidence, which is a heuristic that usually works and fails exactly where the
question is hardest.

A subtlety worth holding: a valid argument can still be useless, and an invalid
one can still be true. Validity is about the _form_, not the truth of the
premises. \"All cats are mortal; Fluffy is a cat; therefore Fluffy is mortal\"
is valid whether or not Fluffy exists.

## Inductive inference and heuristics

Induction has no guarantee, so the interesting question is how to be right often
enough without a guarantee. The answer is **heuristics**: rules that trade
accuracy for speed under uncertainty.

**Availability** judges likelihood by how easily examples come to mind. Because
recall is itself biased by recency, emotion, and vividness, vivid rare events
get overestimated — you will judge plane crashes more likely than car crashes
because the newspaper mentions them.

**Representativeness** judges likelihood by similarity to a prototype, ignoring
base rates. Asked whether a person described as quiet, orderly, and methodical
is more likely a librarian or a farmer, most choose the librarian without
registering that farmers vastly outnumber librarians. This is the cleanest
demonstration that a heuristic can dominate a known statistic.

**Availability and representativeness are not the only routes to error.** The
**anchoring** effect shows that an arbitrary starting value influences
subsequent estimates even when it is obviously irrelevant. **Framing** effects
show that logically equivalent presentations — a treatment that saves 200 lives
versus one that has a 20% chance of a fatal accident — do not produce equal
judgements. **Confirmation bias** is not a heuristic but a selection rule, and
the most consequential: you accept evidence that fits your prior and reinterpret
evidence that does not.

The modern qualification is that many named biases are smaller than their
reputation, and that replication projects have failed to reproduce a substantial
share of them. What has replicated is the _level_ effect: the reasons people
give are post-hoc and they believe them. The cause may lie in how much
confidence introspection carries, not in each individual shortcut.

## Probabilistic reasoning

Real reasoning is about likelihoods, which makes Bayes' theorem the relevant
form. The intuition it encodes is simple: **a surprising observation is more
informative than an expected one**. The posterior weight of a hypothesis rises
with how much the evidence narrowed the space, not with how much you hoped for
it.

Two classic failures follow from ignoring base rates.

The **prosecutor's fallacy** treats the probability of the evidence given
innocence as if it were the probability of innocence given the evidence. The
**base rate fallacy** ignores how common the condition is, producing confident
conclusions from a test whose false-positive rate is high — the reason a
positive result from a rare-disease test with imperfect specificity says
considerably less than it appears to.

Understanding the direction of a conditional is the whole skill. _Most_ of the
difficulty in these problems is not arithmetic; it is silently swapping which
thing is being conditioned on.

## Causal reasoning

Causal claims are reasoned about differently from descriptive ones, and the
difference shows up in experiments people run without noticing.

**Causal direction**: people accept that a virus causes fever long before
noticing the reverse is equally consistent with the data.

**Confounding**: two things move together without one causing the other.
Ignoring a common cause is the third-variable problem; ice-cream sales and
drownings correlate through temperature.

**Post hoc**: after _A_ precedes _B_, _A_ is judged to have caused _B_. The
fallacy is not chronological order — that is genuinely evidence — but the
tendency to treat sequence as sufficient.

**Regression to the mean** explains a lot of apparent improvement attributed to
treatment. When an extreme measurement is followed by a less extreme one, some
of the change is statistical rather than causal; treating it as effect is
predictably wrong, and it is why interventions that target the worst scorers
look good for reasons unrelated to the intervention.

The practical rule follows from all four: measure the mechanism you claim to be
acting on. A score that moves because the underlying process changed is
interpretable; a score that moves because the measurement is noisy, the sample
shifted, or the extreme regressed is not, no matter how convincing the
before-and-after looks.

## In practice

Reasoning improves less through formal instruction in logic than through the
three habits that actually shift accuracy: **separating evidence from
conclusion**, **asking for the base rate**, and **searching deliberately for the
case that would falsify your position**. The first two are checkable in seconds
and catch most of the errors above, including the ones the reasoner will
otherwise defend.
