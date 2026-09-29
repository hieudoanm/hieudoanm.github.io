---
{
  'title': 'Linear Ballistic Accumulator (LBA)',
  'subtitle': '',
  'parentLink': { 'href': '/neuroscience', 'label': 'Neuroscience' },
  'links':
    [
      {
        'href': '/neuroscience/linear-ballistic-accumulator/interactive',
        'label': 'LBA Simulator',
        'description':
          "Simulate the race between two ballistic accumulators and see
          how\n          between-trial variability shapes choices.",
      },
    ],
  'references':
    [
      {
        'href': 'https://doi.org/10.1016/j.cogpsych.2007.12.002',
        'label': 'Brown & Heathcote (2008) — Cognitive Psychology',
        'description':
          'The seminal paper introducing the Linear Ballistic Accumulator model.',
      },
    ],
}
---

## Overview

The **Linear Ballistic Accumulator (LBA)** model, introduced by Brown and
Heathcote (2008), is a prominent framework in cognitive psychology for modelling
decision-making and response times. Unlike the Drift Diffusion Model (DDM),
which relies on a single accumulator tracking relative evidence, the LBA assumes
independent accumulators for each response option that race toward a common
decision threshold.

Crucially, the LBA is &quot;ballistic&quot;, meaning that once evidence
accumulation begins, it proceeds at a constant linear rate without within-trial
noise. The variability in decision times and accuracy arises entirely from
between-trial variability in the starting point of accumulation and the drift
rate.

## Core Mechanisms & Parameters

The LBA is defined by the following key parameters:

- **Drift Rate (v):** The mean rate at which evidence accumulates for a given
  accumulator.
- **Drift Rate Variability (s):** Between-trial variability in the drift rate,
  typically drawn from a normal distribution.
- **Starting Point Variability (A):** Evidence accumulation begins at a random
  point drawn from a uniform distribution [0, A].
- **Decision Threshold (b):** The amount of evidence required to trigger a
  decision. The distance from the top of the starting distribution to the
  threshold is b - A.
- **Non-Decision Time (t0):** The time taken for perceptual encoding and motor
  execution, independent of the decision process.

## Why Use the LBA?

The LBA offers several advantages over other accumulation models. Its primary
strength lies in its mathematical tractability. Because there is no within-trial
noise, the LBA has closed-form analytic solutions for both response times and
accuracy, making it extremely fast to fit to empirical data.

Additionally, its multi-accumulator architecture makes it naturally suited for
tasks with more than two response options, whereas the standard DDM is strictly
limited to binary choices.
