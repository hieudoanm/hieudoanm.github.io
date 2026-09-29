# Leaky Competing Accumulator (LCA)

App route: `/neuroscience/leaky-competing-accumulator/` · back to
[Neuroscience](/neuroscience)

## Overview

The **Leaky Competing Accumulator (LCA)** model, developed by Usher and
McClelland (2001), offers a neurally plausible framework for human
decision-making. Like race models, it uses separate accumulators for each choice
alternative. However, it incorporates two critical biologically inspired
mechanisms: _leakage_ and _lateral inhibition_.

## Core Mechanisms: Leak & Inhibition

Unlike standard accumulation models where evidence builds up indefinitely, the
LCA assumes that neural representations decay over time.

- **Leakage (λ):** Accumulated evidence decays proportional to its current
  activation. This prevents runaway activation and naturally models forgetting
  or loss of context.
- **Lateral Inhibition (β):** Accumulators actively suppress each other. As one
  option gains evidence, it suppresses competing options, acting as a
  competitive &quot;winner-take-all&quot; mechanism.

## Neural Plausibility

The LCA is highly influential because it maps directly onto neurophysiological
findings. Recordings in the posterior parietal cortex and frontal eye fields
during choice tasks show precisely these dynamics: recurrent excitation
(accumulation), decay (leak), and mutual suppression between neural populations
encoding different targets.

## Examples

- [LCA Simulator](/neuroscience/leaky-competing-accumulator/interactive) —
  Experiment with leak and inhibition parameters in a noisy accumulator network.

## References

1. [Usher & McClelland (2001) — Psychological Review](https://doi.org/10.1037/0033-295X.108.3.550)
   — The foundational paper detailing the LCA model and its neural inspiration.
