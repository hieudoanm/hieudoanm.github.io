# Example: Machine Learning

## Concept

Machine learning allows computers to learn patterns from data rather
than requiring every rule to be explicitly programmed.

### 🧒 Child

Imagine showing a computer lots of pictures of cats and dogs.

You tell it which pictures have cats and which have dogs.

After seeing many examples, it learns patterns that help it guess
what is in a new picture.

It is like learning from examples instead of being given every rule.

### 🎓 Student

Machine learning is a way of building models that learn patterns from data.

Instead of programming:

```text
IF ears look like this
AND eyes look like this
AND shape looks like this
THEN cat
```

we give the model examples and let it learn parameters that produce
useful predictions.

A typical process is:

```text
Data
 ↓
Training
 ↓
Model
 ↓
Prediction
```

### 👤 Layperson

Machine learning is a collection of methods for learning useful
relationships from data.

A model is trained using examples and then used to make predictions
on new observations.

Major paradigms include:

- Supervised learning
- Unsupervised learning
- Self-supervised learning
- Reinforcement learning

A key goal is **generalization**: performing well on data that was not
used during training.

This makes evaluation and train/test separation essential.

### 🔬 Expert

Let a dataset be:

$$
D = \{(x_i, y_i)\}_{i=1}^{n}
$$

A parameterized hypothesis class $f_\theta$ is fitted by minimizing
empirical risk:

$$
\hat{R}(\theta)
=
\frac{1}{n}
\sum_{i=1}^{n}
L(f_\theta(x_i), y_i)
$$

The central statistical objective is not merely minimizing training
error but obtaining low expected risk under the data-generating distribution.

Generalization depends on factors including:

- Hypothesis class
- Inductive bias
- Sample size
- Noise
- Regularization
- Optimization
- Distribution shift

Modern machine learning combines statistical inference, optimization,
computation, and representation learning.
