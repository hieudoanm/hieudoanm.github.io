---
{
  'title': 'Causal Inference & LATE',
  'subtitle':
    'Moving beyond correlation to understand what actually causes what.',
  'links':
    [
      {
        'href': '/economics/causal-inference/experiments',
        'label': 'Causation Challenge',
        'description':
          "Interactive quiz: classify six real-world correlations as causal
          or\n          spurious, using an investigation budget of randomized
          trials and\n          confounder controls.",
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Causal_inference',
        'label': 'Wikipedia: Causal Inference',
        'description':
          "Survey of methods for estimating cause and effect from
          observational\n          and experimental data.",
      },
      {
        'href': 'https://www.nobelprize.org/prizes/economic-sciences/2021/card-angrist-imbens/summary/',
        'label': 'Nobel Prize: 2021 (Card, Angrist, Imbens)',
        'description':
          "Nobel Prize page recognizing contributions to natural experiments
          and\n          causal inference methods.",
      },
      {
        'href': 'https://www.nobelprize.org/prizes/economic-sciences/2019/banerjee-duflo-kremer/summary/',
        'label': 'Nobel Prize: 2019 (Banerjee, Duflo, Kremer)',
        'description':
          "Nobel Prize page recognizing experimental approaches to
          alleviating\n          global poverty.",
      },
    ],
}
---

## What is it?

**Causal inference** is the set of methods for estimating cause and effect from
data—answering “what happens if we change X?” rather than merely observing that
X and Y move together. The 2019 and 2021 Nobel Prizes recognized this work. A
central concept is the **Local Average Treatment Effect (LATE)**: the causal
effect only for the specific subpopulation whose treatment status was actually
changed by the instrument.

## Why correlation is not causation

**Confounding:** A third variable may cause both X and Y. Wealth causes both ice
cream purchases and better health, so the two correlate—yet ice cream does not
cause health.

**Reverse causation:** The arrow may point the other way. Stress and long work
hours correlate, but which causes which?

**Selection bias:** The people we observe were not randomly assigned. Those who
choose a treatment differ from those who don’t in ways that confound the
comparison—this is why naive comparisons of treated and untreated groups are
misleading.

## Core methods

**Randomized controlled trials:** The gold standard. Random assignment balances
confounders on average, so the difference in outcomes is attributable to
treatment.

**Regression discontinuity:** Compare units just above and just below a cutoff
(e.g., a test threshold for a scholarship). Those near the threshold are nearly
identical, so any outcome jump reveals the treatment effect.

**Difference-in-differences:** Compare the change over time for a treated group
against the change for an untreated comparison group, netting out common trends.

**Instrumental variables:** Use an exogenous variable (the instrument) that
affects treatment but not the outcome directly, isolating the causal path.

## LATE and its limits

**What LATE measures:** An instrumental-variable estimate recovers the effect
only for the **compliers**—those induced to take treatment by the instrument. It
is local, not global.

**Why it matters:** The LATE for “college attendance due to distance from
campus” may differ from the effect for the average person. The finding only
generalizes with care.

**Interpretation:** A LATE is the right answer to a precisely delimited
question, but the wrong answer to a broad one (“what’s the effect of college for
everyone?”). Researchers must be explicit about which population they identify.
