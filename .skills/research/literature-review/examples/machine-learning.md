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
