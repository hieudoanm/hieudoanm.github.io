# Attentional Drift Diffusion Model (aDDM)

App route: `/neuroscience/attentional-drift-diffusion-model/` · back to
[Neuroscience](/neuroscience)

## Overview

The **Attentional Drift Diffusion Model (aDDM)**, introduced by Krajbich et al.
(2010), is an extension of the standard Drift Diffusion Model that explicitly
incorporates visual attention (eye movements or fixations) into the evidence
accumulation process.

In traditional models, the drift rate is constant. In the aDDM, the drift rate
changes dynamically within a single trial depending on where the subject is
currently looking. Specifically, the model assumes that attention biases the
accumulation process in favor of the attended item.

## The Discount Parameter (θ)

The core innovation of the aDDM is the attentional discount factor, **θ**
(theta), which ranges from 0 to 1.

- When looking at the **Left** item, the drift rate is proportional to
  `Value_Left - (θ * Value_Right)`.
- When looking at the **Right** item, the drift rate is proportional to
  `(θ * Value_Left) - Value_Right`.

If θ = 1, attention has no effect (the model reduces to a standard DDM). If θ <
1, the value of the unattended item is discounted, creating a systematic bias
toward choosing the item that is looked at longer.

## Empirical Success

The aDDM successfully explains several widespread empirical phenomena in
consumer choice and neuroeconomics:

- **Gaze Bias:** People are more likely to choose an item they spend more time
  looking at, even if it has a slightly lower objective value.
- **Last Fixation Bias:** The chosen item is highly likely to be the item that
  was fixated immediately prior to the decision.

## Examples

- [aDDM Simulator](/neuroscience/attentional-drift-diffusion-model/interactive)
  — Simulate fixations and see how alternating visual attention dynamically
  shifts the drift rate.

## References

1. [Krajbich, Armel, & Rangel (2010) — Nature Neuroscience](https://doi.org/10.1038/nn.2635)
   — Visual fixations and the computation and comparison of value in simple
   choice.
