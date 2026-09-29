---
{
  'title': 'Bayesian Updating',
  'subtitle':
    'How rational agents revise beliefs when they observe new evidence.',
  'links':
    [
      {
        'href': '/economics/bayesian-updating/monty-hall',
        'label': 'Monty Hall Explorer',
        'description':
          'Test switching vs staying across repeated trials and watch a 2/3 vs
          1/3 win rate emerge — Bayesian updating the fun way.',
      },
    ],
  'references':
    [
      {
        'href': 'https://en.wikipedia.org/wiki/Bayesian_inference',
        'label': 'Wikipedia: Bayesian Inference',
        'description':
          'Overview of Bayes theorem and its application to updating beliefs
          from evidence.',
      },
      {
        'href': 'https://www.khanacademy.org/computing/computer-science/probability/bayes-theorem/v/bayes-theorem',
        'label': 'Khan Academy: Bayes Theorem',
        'description':
          'Video explanation of Bayes rule and how prior beliefs update with new
          data.',
      },
      {
        'href': 'https://plato.stanford.edu/entries/bayes-theorem/',
        'label': 'Stanford Encyclopedia: Bayes Theorem',
        'description':
          'Philosophical entry on Bayes theorem, its justifications, and its
          role in rational belief revision.',
      },
    ],
}
---

## What is it?

**Bayesian updating** is the process of revising a belief in light of new
evidence. Starting from a **prior** belief about how likely something is, you
observe data, and combine the two using Bayes’ rule to produce an updated
**posterior** belief. It is the formal framework for learning under
uncertainty—how an ideal rational agent should think.

## The core idea

**Prior:** What you believe before seeing any evidence. “I think there is a 10%
chance it will rain today.”

**Likelihood:** How probable the evidence would be if the hypothesis were true.
“If it were going to rain, dark clouds would be very likely.”

**Posterior:** Your updated belief after combining prior and evidence. “Given
the dark clouds, I now think there is a 70% chance of rain.”

**Bayes’ rule:** The mathematical formula that performs this update. It weights
the prior by how well the evidence fits each possible explanation.

## Why it matters

**Learning from experience:** Each new observation shifts beliefs gradually.
After enough consistent evidence, even a skeptic updates to the correct answer.

**Prior sensitivity:** With little evidence, the prior dominates. With abundant
evidence, the data overwhelms the prior. This explains why experts and novices
can disagree initially but converge over time.

**Base rates matter:** Ignoring the prior leads to the base-rate fallacy. A
medical test that is 99% accurate still produces mostly false positives if the
disease is extremely rare.

## Real-world applications

**Medical diagnosis:** Doctors update disease probabilities as test results,
symptoms, and patient history accumulate—each piece of evidence shifts the
posterior.

**Spam filtering:** Email filters start with a prior about whether a message is
spam, then update as they observe words, sender reputation, and link patterns.

**Criminal investigations:** Detectives begin with priors about suspects and
update as forensic evidence, alibis, and witness testimony emerge.

**Machine learning:** Bayesian models update parameter beliefs as training data
arrives—producing not just predictions but calibrated uncertainty estimates.
