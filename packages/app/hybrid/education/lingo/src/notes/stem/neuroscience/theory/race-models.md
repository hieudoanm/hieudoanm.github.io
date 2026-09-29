# Race Models

App route: `/neuroscience/race-models/` · back to [Neuroscience](/neuroscience)

## Overview

**Race Models** represent a broad class of decision-making frameworks where
different response options are modeled as entirely independent accumulators.
Rather than evidence for one choice subtracting from another (as in the Drift
Diffusion Model), each alternative &quot;races&quot; toward its own threshold.
The first accumulator to cross its threshold determines both the choice made and
the response time.

## Independent Accumulation

The defining feature of a pure race model is _independence_ . Evidence
supporting Option A does not interact with evidence supporting Option B. This
architecture easily scales to multiple-choice decisions (e.g., 3, 4, or 10
options) simply by adding more accumulators.

Classic examples include the Vickers Accumulator Model and various Poisson
counter models. Unlike the LBA, standard race models often incorporate
within-trial noise (diffusion), and unlike the LCA, they lack lateral
inhibition.

## Statistical Facilitation

Race models naturally predict a phenomenon known as _statistical facilitation_
(or the redundant targets effect). If a task presents two redundant targets that
can both trigger a response, the overall response time is faster than the
response time to either target alone. This occurs because you are taking the
minimum completion time of two independent racing processes.

## Examples

- [Race Model Simulator](/neuroscience/race-models/interactive) — Run a classic
  independent race and observe how multiple choices affect decision speed.

## References

1. [Vickers (1970) — Ergonomics](https://doi.org/10.1080/00140137008931117) —
   Evidence for an accumulator model of psychophysical discrimination.
2. [Ratcliff (1978) — Psychological Review](https://doi.org/10.1037/0033-295X.85.2.59)
   — Statistical facilitation and the classic race model formulation.
