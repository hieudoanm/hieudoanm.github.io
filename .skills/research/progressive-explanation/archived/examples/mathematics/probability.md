# Example: Probability

## Concept

Probability measures uncertainty.

### 🧒 Child

Imagine you have a bag with red and blue balls.

If there are lots of red balls and only a few blue balls,
you are more likely to pick a red ball.

Probability is a way of saying **how likely something is to happen**.

A probability of 0 means impossible.

A probability of 1 means certain.

Something with probability 0.8 is very likely to happen.

### 🎓 Student

Probability describes how likely an event is.

For a fair coin:

$$
P(\text{heads}) = \frac{1}{2}
$$

and:

$$
P(\text{tails}) = \frac{1}{2}
$$

Conditional probability describes probability when we already know
something else happened:

$$
P(A \mid B)
$$

This means:

> The probability of A given B.

Bayes' theorem connects conditional probabilities:

$$
P(A \mid B)
=
\frac{P(B \mid A)P(A)}{P(B)}
$$

### 👤 Layperson

Probability provides a mathematical framework for reasoning about uncertainty.

In machine learning, we rarely know everything about the world.
Instead, we observe data and estimate how plausible different outcomes are.

For example:

$$
P(\text{disease} \mid \text{symptoms})
$$

means the probability of a disease given observed symptoms.

Probability is central to classification, forecasting, generative models,
Bayesian inference, and language models.

### 🔬 Expert

A probability space consists of a sample space $\Omega$, a sigma-algebra
$\mathcal{F}$, and a probability measure $P$.

A random variable maps outcomes in $\Omega$ to a measurable space.

Bayes' rule gives:

$$
p(\theta \mid D)
=
\frac{p(D \mid \theta)p(\theta)}{p(D)}
$$

where:

- $\theta$ is a parameter.
- $D$ is observed data.
- $p(\theta)$ is the prior.
- $p(D \mid \theta)$ is the likelihood.
- $p(\theta \mid D)$ is the posterior.
- $p(D)$ is the evidence.

Important extensions include expectation, variance, covariance,
joint distributions, conditional independence, stochastic processes,
and probabilistic graphical models.
