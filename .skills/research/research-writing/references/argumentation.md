# Scientific Argumentation

## Purpose

This reference explains how to construct, evaluate, and communicate scientific arguments in research writing.

Scientific writing is not simply a collection of facts and citations. It should form a logical argument connecting the research question, evidence, analysis, findings, and conclusions.

---

## 1. The Basic Argument Structure

A scientific argument can be represented as:

```text
Claim
  ↓
Evidence
  ↓
Reasoning
  ↓
Conclusion
```

### Claim

A statement about what is believed, proposed, or observed.

### Evidence

Information that supports or challenges the claim.

Evidence may come from:

- Previous research
- Experimental observations
- Statistical analyses
- Computational models
- Meta-analyses
- Theoretical reasoning

### Reasoning

The logical connection between the evidence and the claim.

### Conclusion

The resulting interpretation or implication.

---

## 2. Research Arguments Form a Chain

A research article usually contains multiple connected arguments.

For example:

```text
Previous research shows X
        ↓
But Y remains unclear
        ↓
Therefore, we investigate Y
        ↓
We observe Z
        ↓
Z is consistent with hypothesis H
        ↓
Therefore, H receives support
```

Each step should be justified.

A reader should be able to follow the argument without having to infer major logical steps.

---

## 3. Claims Have Different Strengths

Not all claims require the same level of evidence.

A useful conceptual hierarchy is:

```text
Observation
    ↓
Association
    ↓
Consistency
    ↓
Suggestion
    ↓
Support
    ↓
Demonstration
    ↓
Causal claim
```

Examples:

### Observation

> Reaction times were longer in the high-load condition.

### Association

> Higher neural activity was associated with longer reaction times.

### Interpretation

> This pattern suggests that increased cognitive load may require greater neural processing.

### Causal claim

> Increased cognitive load causes increased neural activity.

The final statement requires evidence capable of supporting causation.

---

## 4. Match Evidence to the Claim

The strength of an argument depends on the relationship between the claim and its evidence.

A useful principle is:

> The evidence must directly support the specific claim being made.

For example:

```text
Evidence:
Region X shows increased activity during task A.

Supported:
Region X is more active during task A than the comparison condition.

Not automatically supported:
Region X causes task A.

Not automatically supported:
Region X is responsible exclusively for cognitive process A.
```

Avoid extending an empirical finding beyond what the study actually tested.

---

## 5. Distinguish Correlation and Causation

Correlation describes an association between variables.

Causation describes a directional relationship in which changing one variable produces a change in another.

Therefore:

```text
Correlation
    ≠
Causation
```

Weak:

> Neural activity in region X causes improved performance.

If the study only measured naturally occurring variation:

> Neural activity in region X was associated with improved performance.

Experimental designs can provide stronger evidence for causal claims, but causal inference still depends on the design and assumptions.

---

## 6. Distinguish Prediction and Explanation

A model can successfully predict observations without providing a complete explanation of the underlying mechanism.

For example:

> The model accurately predicts participants' reaction times.

does not necessarily imply:

> The model explains the cognitive process generating reaction times.

When writing about computational models, distinguish:

- Predictive performance
- Descriptive fit
- Parameter interpretation
- Mechanistic explanation

These represent different claims.

---

## 7. Distinguish Statistical Significance and Scientific Importance

A statistically significant result does not automatically mean that an effect is scientifically important.

Consider:

```text
Statistical evidence
        +
Effect magnitude
        +
Uncertainty
        +
Scientific context
        ↓
Interpretation
```

A very small effect can be statistically significant in a large sample.

A meaningful effect may fail to reach conventional significance in a small or noisy sample.

Report and interpret:

- Effect size
- Confidence interval or uncertainty
- Statistical test
- Sample size
- Relevant scientific context

rather than relying on the p-value alone.

---

## 8. Construct a Research Gap Argument

A research gap argument often follows:

```text
1. What is known?
        ↓
2. What remains unknown?
        ↓
3. Why does the uncertainty matter?
        ↓
4. What approach can address it?
        ↓
5. What question will this study answer?
```

For example:

> Previous studies have shown that speech-related information can be decoded from neural signals. However, much of this work has focused on isolated stimuli rather than continuous naturalistic speech. This leaves uncertainty about how semantic information is represented during more realistic language processing. We therefore investigate whether semantic information can be decoded from neural activity during naturalistic speech.

The gap should logically justify the research question.

---

## 9. Use Literature to Build Arguments

Avoid citation lists without synthesis.

Weak:

> Smith et al. found X. Jones et al. found Y. Brown et al. found Z.

Better:

> Previous studies generally suggest that X, although findings differ regarding Y. Smith et al. reported X under condition A, whereas Jones et al. observed a different pattern under condition B. These differences may reflect differences in task demands or measurement methods.

The purpose of citing multiple studies is often to establish a pattern, disagreement, limitation, or gap.

---

## 10. Compare Competing Explanations

When several explanations are possible, explicitly distinguish them.

For example:

```text
Observed result
       ↓
 ┌─────┼─────┐
 ↓     ↓     ↓
H1    H2    H3
```

Then evaluate each explanation against the available evidence.

Useful language includes:

- One possibility is...
- An alternative explanation is...
- This interpretation is consistent with...
- However, the current data cannot distinguish between...
- Future experiments could test this distinction...

Do not present one explanation as established when the design cannot distinguish it from alternatives.

---

## 11. Use Counterarguments

Strong scientific writing acknowledges important counterarguments.

A useful pattern is:

```text
Claim
  ↓
Potential objection
  ↓
Evidence addressing the objection
  ↓
Refined conclusion
```

For example:

> The observed decoding performance suggests that the neural signal contains information about semantic content. However, this pattern could also arise from correlated low-level acoustic features. Additional analyses controlling for acoustic information are therefore needed to distinguish semantic from sensory explanations.

Addressing alternative explanations increases the strength and transparency of the argument.

---

## 12. Avoid Logical Fallacies

Common problems include:

### Overgeneralisation

Making a broad claim from limited evidence.

```text
Small sample
    ↓
Universal conclusion
```

Avoid this.

### Post hoc reasoning

Assuming that because one event occurred after another, the first caused the second.

```text
A happened before B
    ≠
A caused B
```

### False dichotomy

Presenting only two explanations when other possibilities exist.

### Circular reasoning

Using the conclusion as its own evidence.

### Appeal to authority

Treating a claim as true solely because an authoritative researcher made it.

### Cherry-picking

Selecting only evidence that supports a preferred conclusion while ignoring relevant contradictory evidence.

### HARKing

Presenting a hypothesis developed after observing the data as though it had been specified before analysis.

Be transparent about exploratory analyses and hypotheses generated after observing results.

---

## 13. Distinguish Confirmatory and Exploratory Analysis

### Confirmatory analysis

Tests a hypothesis or prediction specified before analysing the relevant data.

### Exploratory analysis

Searches for patterns or generates hypotheses.

Neither is inherently superior.

The important principle is transparency.

Do not present an exploratory discovery as though it were a preregistered prediction.

Useful wording:

> Exploratory analyses indicated...

rather than:

> We hypothesised that...

when the hypothesis was developed after observing the data.

---

## 14. Avoid the Null-Result Fallacy

A non-significant result does not necessarily prove that there is no effect.

Weak:

> There was no effect of condition X.

Better:

> We did not detect a statistically significant difference between conditions.

The stronger conclusion may require additional evidence, such as:

- Equivalence testing
- Bayesian analysis
- Narrow confidence intervals
- Adequate statistical power

Interpret null results in relation to the sensitivity of the study.

---

## 15. Distinguish Absence of Evidence From Evidence of Absence

These are different claims:

```text
No evidence detected
        ≠
Evidence that the phenomenon is absent
```

If a study is noisy, underpowered, or poorly sensitive to the phenomenon, failure to detect an effect may provide little evidence about whether the effect exists.

---

## 16. Use Bayesian and Probabilistic Claims Carefully

Statistical evidence should not be described more strongly than the analysis supports.

For example, avoid treating:

> p = .03

as:

> There is a 97% probability that the hypothesis is true.

A p-value does not directly provide the probability that a hypothesis is true.

Likewise, Bayesian posterior probabilities depend on the specified model and prior assumptions.

Use statistical terminology according to the framework actually employed.

---

## 17. Construct the Discussion Argument

A strong Discussion often follows:

```text
Main result
     ↓
What does it mean?
     ↓
Does it agree with previous research?
     ↓
Why might this have occurred?
     ↓
What alternative explanations exist?
     ↓
What are the implications?
     ↓
What are the limitations?
     ↓
What remains unresolved?
```

The Discussion should move from the study's evidence toward appropriately bounded conclusions.

---

## 18. Build Conclusions Conservatively

The final conclusion should be the strongest statement that the evidence can justify.

Think:

```text
Evidence
   ↓
Supported interpretation
   ↓
Bounded conclusion
```

Do not jump from:

> This study found an association between X and Y.

to:

> X causes Y in humans.

unless the study design and analysis genuinely support the causal claim.

---

## 19. Argument Evaluation Checklist

When reviewing a scientific argument, ask:

### Claim

- What exactly is being claimed?
- Is the claim specific?
- Is the claim stronger than necessary?

### Evidence

- What evidence supports the claim?
- Is the evidence directly relevant?
- Is the evidence sufficiently reliable?
- Is contradictory evidence being ignored?

### Reasoning

- Is the logical connection explicit?
- Are alternative explanations considered?
- Does the conclusion actually follow from the evidence?

### Scope

- Does the claim generalise beyond the population or conditions studied?
- Is causal language justified?
- Is uncertainty represented appropriately?

### Transparency

- Is the analysis confirmatory or exploratory?
- Are limitations acknowledged?
- Are assumptions made explicit?

---

## 20. Core Principle

The central rule of scientific argumentation is:

> **The conclusion should never be stronger than the evidence supporting it.**

A rigorous scientific argument makes the reasoning visible:

```text
Question
   ↓
Evidence
   ↓
Analysis
   ↓
Finding
   ↓
Interpretation
   ↓
Conclusion
```

The purpose of scientific writing is not to make the conclusion sound convincing.

The purpose is to make it possible for the reader to evaluate whether the conclusion is justified.
