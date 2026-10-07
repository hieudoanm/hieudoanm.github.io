# Example: Machine Learning Literature Review

## Topic

Machine learning for neuroscience.

## Research Question

> How is machine learning being used to study brain activity, and what
> are the strengths, limitations, and open challenges of these approaches?

## Scope

Focus on machine-learning methods applied to neuroscience data.

Relevant applications include:

- Neural decoding.
- Neural encoding.
- Brain-state classification.
- Prediction of behaviour.
- Neuroimaging analysis.
- Brain-computer interfaces.
- Computational modelling.

Consider both methodological and neuroscience evidence.

## Organizing the Literature

Do not organize the review only by algorithm.

A useful structure is:

```text
Research question
      ↓
Neuroscience data
      ↓
Machine-learning task
      ↓
Model
      ↓
Evaluation
      ↓
Scientific interpretation
```

For example:

```text
fMRI data
   ↓
Predict cognitive state
   ↓
Regularized regression
   ↓
Cross-validation
   ↓
Evaluate generalization
   ↓
Interpret neural representation
```

## Important Distinction

Machine-learning performance is not automatically evidence for a
neuroscientific mechanism.

For example:

```text
High classification accuracy
        ≠
Identification of the underlying neural mechanism
```

A model may successfully predict a condition because it exploits
correlated features without identifying the causal or mechanistic
process responsible for the observed behaviour.

## Compare Methods

A literature review can compare approaches using a common framework.

| Method              | Strength                           | Limitation                                | Typical use        |
| ------------------- | ---------------------------------- | ----------------------------------------- | ------------------ |
| Linear regression   | Interpretable                      | Limited flexibility                       | Encoding           |
| Logistic regression | Interpretable classification       | Linear decision boundary                  | Classification     |
| SVM                 | Effective in high-dimensional data | Interpretation can be difficult           | Decoding           |
| Random forest       | Nonlinear relationships            | Less suitable for some structured signals | Prediction         |
| Neural network      | Highly flexible                    | Data and interpretability requirements    | Complex prediction |

The purpose is not to declare one algorithm universally superior.

Performance depends on:

- Dataset size.
- Feature representation.
- Noise.
- Task.
- Regularization.
- Evaluation procedure.
- Computational assumptions.

## Evaluation

A strong literature review should examine how studies evaluate models.

Important questions include:

- Was there a held-out test set?
- Was cross-validation used?
- Was preprocessing performed separately within training folds?
- Was hyperparameter tuning separated from final evaluation?
- Were participants split correctly?
- Was temporal leakage possible?
- Were multiple models or preprocessing pipelines tried?
- Was the evaluation metric appropriate?

## Data Leakage

Data leakage is particularly important in neuroscience.

For example:

```text
All participants
      ↓
Feature selection
      ↓
Cross-validation
```

can produce overly optimistic results if information from the test
participants influences feature selection.

A safer structure is:

```text
Training participants
      ↓
Feature selection
      ↓
Model fitting
      ↓
Held-out participants
      ↓
Evaluation
```

The principle is:

> Information used to build the model should not leak from the evaluation
> data into the training process.

## Generalization

A literature review should distinguish different forms of generalization.

### Within-participant

Train and test on different observations from the same participant.

### Cross-participant

Train on some participants and test on unseen participants.

### Cross-stimulus

Train on some stimuli and test on unseen stimuli.

### Cross-task

Train on one task and test on another.

These represent increasingly demanding tests of generalization.

A model that performs well within participants may not generalize to
new participants.

## Baselines

Machine-learning studies should be evaluated against meaningful
baselines.

Examples:

- Chance performance.
- Majority-class prediction.
- Simple linear model.
- Previously established method.
- Permutation-based null distribution.

A complex model should not be considered useful merely because it
performs better than an inappropriate baseline.

## Statistical Evidence

Accuracy alone is often insufficient.

Consider:

- Effect size.
- Confidence intervals.
- Permutation tests.
- Statistical significance.
- Variance across participants.
- Variance across datasets.
- Robustness to preprocessing choices.

For classification, for example:

```text
Observed accuracy
        ↓
Compare with null distribution
        ↓
Estimate probability of obtaining performance by chance
```

## Interpretability

Machine-learning models can be used for prediction without providing
a clear explanation of what the brain is doing.

Important questions include:

- Which features drive predictions?
- Are features biologically meaningful?
- Are explanations stable?
- Do explanations generalize?
- Are interpretations causal or merely correlational?

Interpretability methods should therefore be treated as evidence with
their own assumptions and limitations.

## Reproducibility

Evaluate whether studies provide:

- Source code.
- Data or data-access instructions.
- Preprocessing pipelines.
- Model specifications.
- Hyperparameters.
- Random seeds where relevant.
- Evaluation procedures.
- Complete enough methods for replication.

Open code alone does not guarantee reproducibility.

## Common Problems

### Small datasets

High-dimensional neuroscience data combined with small sample sizes can
produce unstable models.

```text
Many features
     +
Few participants
     ↓
High overfitting risk
```

### Overfitting

A model may learn noise or participant-specific characteristics instead
of the underlying signal.

### Circular analysis

Using the same data to select features and demonstrate their predictive
importance can inflate results.

### Poor validation

Randomly splitting correlated observations can produce unrealistically
high performance.

### Metric mismatch

Accuracy may be misleading for imbalanced classes or unequal error costs.

## Synthesis

A useful synthesis might be:

> Machine learning provides powerful tools for extracting predictive
> information from complex neuroscience datasets, but predictive
> performance depends strongly on data structure, validation strategy,
> and model assumptions. The strongest evidence comes from studies that
> demonstrate robust generalization, use appropriate null models and
> baselines, and clearly separate predictive performance from claims about
> neural mechanisms.

## Research Gaps

Potential gaps include:

- Better cross-participant generalization.
- Larger and more diverse datasets.
- Reproducible preprocessing pipelines.
- Better uncertainty estimation.
- Robust evaluation under distribution shift.
- Integration of multimodal neuroscience data.
- Mechanistically informed machine-learning models.
- Better links between prediction and neuroscientific theory.

## Lesson

A machine-learning literature review should not ask only:

> "Which model performs best?"

It should ask:

> "What scientific question does the model answer, how reliably does it
> answer it, how well does the result generalize, and what can we
> legitimately conclude from the prediction?"
