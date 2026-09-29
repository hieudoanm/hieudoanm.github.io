# Drift Diffusion Model

> How the brain accumulates noisy evidence over time to reach a binary decision
> — and why speed and accuracy trade off.

App route: `/neuroscience/drift-diffusion-model/` · back to
[Neuroscience](/neuroscience)

## What is it?

The **Drift Diffusion Model (DDM)**, formalised by Roger Ratcliff (1978), is the
dominant computational account of two-choice decision-making. It treats a
decision as a **noisy evidence-accumulation process**: a particle drifts from a
starting point toward one of two boundaries while being buffeted by random
noise. The first boundary reached determines the response; the time taken
determines the reaction time. The DDM simultaneously explains choice accuracy
_and_ the full shape of reaction-time distributions in a single coherent
framework.

## Core parameters

**Drift rate (v):** The average speed and direction of evidence accumulation.
High |v| means strong, reliable evidence — fast correct responses and few
errors. Low |v|, near zero, means ambiguous evidence — slow responses with many
errors. Negative v biases accumulation toward the wrong boundary.

**Boundary separation (a):** The total distance between the two decision
thresholds. Wide boundaries (high a) require more evidence before committing —
slower but more accurate. Narrow boundaries (low a) are fast but error-prone.
This parameter captures the **speed–accuracy trade-off** directly.

**Starting point (z):** Where the evidence accumulator begins relative to the
two boundaries. A bias toward one boundary (z ≠ a/2) produces faster responses
for that option — modelling prior expectation or response bias.

**Non-decision time (t₀):** Time attributable to peripheral processes — sensory
encoding and motor execution — that do not involve the decision itself. It
shifts the whole RT distribution without affecting accuracy.

## The speed–accuracy trade-off

**Why people can be fast or accurate, but rarely both:** Lowering the boundary
separation (a) speeds up every decision because less evidence is needed, but the
accumulator is more likely to be caught by noise on the wrong side — increasing
errors. Raising a has the opposite effect. Crucially, the same change in task
difficulty (changing v) affects both speed _and_ accuracy simultaneously, which
is the hallmark prediction that separates DDM from simpler threshold models.

**Urgency signals:** In deadline paradigms, decision boundaries often collapse
over time, trading accuracy for speed as time pressure increases — a dynamic
extension of the standard model called the **collapsing-boundary DDM**.

## Neurobiological basis

**Cortical ramping activity:** Neurons in areas such as the lateral
intraparietal cortex (LIP) and dorsomedial frontal cortex show firing rates that
rise gradually toward a fixed threshold before a saccade decision — a neural
signature of evidence accumulation that maps directly onto the DDM accumulator.

**Basal ganglia and boundaries:** The striatum and subthalamic nucleus influence
the boundary separation, providing a biological substrate for speed–accuracy
adjustments. Parkinson's disease, which damages these circuits, typically
narrows boundaries — faster but more error-prone decisions.

**BOLD signals and DDM parameters:** fMRI studies correlate trial-by-trial
drift-rate estimates with BOLD activity in sensory cortex, and
boundary-separation estimates with prefrontal and ACC activity — linking model
parameters to distinct neural systems.

## Classic experiments modelled by DDM

**Random Dot Motion:** Varying dot coherence changes drift rate while boundary
and non-decision time stay constant — the cleanest laboratory manipulation of v.

**Flanker Task:** Incongruent flankers reduce drift rate (conflicting evidence)
and may widen boundaries (increased caution) — decomposing the congruency effect
into distinct cognitive mechanisms.

**Stroop Task:** Colour–word conflict reduces drift rate toward the correct
colour response, and elevated non-decision time reflects additional processing
overhead from word reading.

**Lexical Decision:** High-frequency words produce higher drift rates than
low-frequency words or non-words, capturing lexical access speed within the DDM
framework.

## Examples

- [DDM Simulator](/neuroscience/drift-diffusion-model/interactive) — Tune drift
  rate, boundary, and noise in real time and watch evidence accumulate toward a
  decision.

## References

1. [Wikipedia: Diffusion model](https://en.wikipedia.org/wiki/Diffusion_model) —
   Overview of the DDM, its parameters, and key experimental applications.
2. [Ratcliff & Rouder (2000) — Annual Review of Psychology](https://www.annualreviews.org/doi/10.1146/annurev.psych.51.1.481)
   — Foundational review of the diffusion model applied to recognition memory
   and choice RT.
3. [Forstmann et al. (2008) — Journal of Neuroscience](https://www.jneurosci.org/content/28/26/6655)
   — fMRI evidence linking striatal BOLD signal to boundary-separation
   adjustments during speed stress.
