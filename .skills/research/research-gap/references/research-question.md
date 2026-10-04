# From Research Gap to Research Question

## Purpose

A research gap becomes useful when it can be translated into a precise, answerable research question.

The goal is not to invent an interesting question first and then search for a gap to justify it.

The preferred direction is:

```text
Literature
    ↓
Established evidence
    ↓
Unresolved problem
    ↓
Validated research gap
    ↓
Research question
    ↓
Hypothesis / objective
    ↓
Study design
```

A good research question should directly address an important part of the validated gap.

---

# 1. What is a research question?

A research question specifies what the study will investigate.

It should identify enough of the problem to determine:

- What will be measured?
- In whom?
- Under what conditions?
- Using what data?
- What relationship or effect is being investigated?
- What uncertainty is being resolved?

A research question is more specific than a research topic.

### Topic

> Speech and the brain

### Research question

> How accurately can speech-related semantic representations be decoded from MEG recordings during naturalistic language comprehension?

The second can guide an actual study.

---

# 2. Gap vs question

Do not confuse the two.

### Research gap

> Existing studies demonstrate semantic decoding from MEG, but the generalisability of these representations across independently sampled participants remains uncertain.

### Research question

> To what extent do semantic representations decoded from MEG generalise across independently sampled participants?

The gap describes the **problem**.

The question describes **what will be investigated to address it**.

---

# 3. Start from the unresolved part

Take the validated gap and identify its central uncertainty.

Example:

```text
Known:
Semantic information can be decoded from MEG.

Unknown:
Whether the representations generalise across participants.

Why it matters:
Poor generalisation would limit claims about stable neural
representations of semantic information.
```

The question should target the unknown:

> To what extent do semantic representations generalise across participants?

Do not introduce unrelated variables simply because they are interesting.

---

# 4. Define the question components

Depending on the research domain, specify:

```text
Population
+
Phenomenon / intervention
+
Exposure / condition
+
Comparison
+
Outcome
+
Context
+
Method
```

Not every question requires every component.

For example:

> In healthy adults, how accurately can semantic information during naturalistic speech be decoded from MEG activity across independently sampled participants?

Contains:

- Population → healthy adults
- Phenomenon → semantic information during speech
- Measurement → MEG
- Outcome → decoding accuracy
- Generalisation condition → independent participants

---

# 5. Use the right question type

Different research gaps require different research questions.

## Descriptive

Asks:

> What is happening?

Examples:

- What neural patterns are associated with speech processing?
- What is the distribution of a behavioural measure?

Useful for knowledge gaps.

---

## Comparative

Asks:

> How do groups or conditions differ?

Examples:

- How does semantic decoding differ between children and adults?
- Do patients and healthy controls show different neural responses?

Useful for population or condition gaps.

---

## Associational

Asks:

> Are two variables related?

Examples:

- Is speech complexity associated with neural activity?
- Is model performance associated with behavioural performance?

Useful when the literature establishes relationships but their strength or boundary conditions remain unclear.

Do not interpret association as causation.

---

## Causal

Asks:

> Does changing X cause a change in Y?

Examples:

- Does targeted training improve language performance?
- Does manipulating semantic context alter neural representations?

Requires a design capable of supporting causal inference.

Do not use causal language for purely observational designs.

---

## Mechanistic

Asks:

> How does a process produce an observed effect?

Examples:

- What neural mechanisms support semantic integration?
- How does contextual information influence speech representations?

Useful for theoretical or knowledge gaps.

---

## Predictive

Asks:

> How accurately can X predict Y?

Examples:

- Can neural activity predict language outcome after stroke?
- Can brain activity predict behavioural responses?

Clearly distinguish prediction from explanation.

High predictive accuracy does not automatically establish mechanism or causality.

---

## Generalisation

Asks:

> Does a finding hold across a different setting?

Examples:

- Does a neural decoding model generalise across participants?
- Does a behavioural effect generalise across languages?

Especially useful for replication and external-validation gaps.

---

## Methodological

Asks:

> Does one method provide a better or more reliable way to answer the question?

Examples:

- Does OPM-MEG improve spatial localisation compared with conventional MEG for a specific task?
- Does a new preprocessing pipeline improve robustness of neural decoding?

The methodological comparison should have a scientific purpose.

---

## Theoretical

Asks:

> Which explanation better accounts for the evidence?

Examples:

- Which model better explains observed response-time distributions?
- Do competing theories make distinguishable predictions about semantic processing?

A theoretical question should connect directly to competing explanations.

---

# 6. Match the question to the gap

Use this mapping:

| Gap                | Useful question type                    |
| ------------------ | --------------------------------------- |
| Knowledge gap      | Descriptive / mechanistic               |
| Evidence gap       | Descriptive / comparative               |
| Methodological gap | Methodological                          |
| Population gap     | Comparative / generalisation            |
| Data gap           | Descriptive / predictive                |
| Theoretical gap    | Theoretical / mechanistic               |
| Replication gap    | Replication / generalisation            |
| Integration gap    | Mechanistic / predictive                |
| Application gap    | Predictive / comparative / intervention |

This is a guide, not a rigid rule.

---

# 7. Avoid overly broad questions

### Too broad

> How does the brain process language?

Problems:

- Huge literature
- Multiple processes
- Multiple populations
- Multiple measurement methods
- Impossible to answer with one study

### Better

> How does neural activity during naturalistic speech represent semantic information in healthy adults?

### More focused

> To what extent can semantic representations extracted from naturalistic MEG recordings generalise across independently sampled participants?

Each step narrows the scope.

---

# 8. Avoid overly narrow questions

A question can also become too specific.

Example:

> Does a particular preprocessing parameter of 17 ms versus 18 ms improve a specific classifier on one dataset?

This may be technically testable but scientifically unimportant unless the parameter has a meaningful methodological rationale.

Ask:

> What scientific uncertainty does this comparison resolve?

---

# 9. Make the question answerable

A good question should have an identifiable answer based on available evidence.

Check:

### Data

Can the required data be obtained?

### Measurement

Can the variables be measured reliably?

### Sample

Can the target population be recruited?

### Method

Is the analysis appropriate?

### Resources

Are equipment and computational resources available?

### Time

Can the project be completed within the available time?

### Ethics

Can the study be conducted ethically?

---

# 10. Use measurable outcomes

Avoid vague outcomes.

### Vague

> Does the intervention help language?

### Better

> Does the intervention improve expressive vocabulary scores?

### Neuroimaging

Instead of:

> Does the intervention change the brain?

Specify:

- Activation
- Connectivity
- Representational similarity
- Decoding accuracy
- Functional connectivity
- Structural measures
- Behavioural performance

The outcome should correspond to the research question.

---

# 11. Define the population carefully

Population labels can hide important variation.

For example:

> Adults

could include:

- Young adults
- Older adults
- Healthy participants
- Clinical populations
- Bilingual participants
- Different education levels

Specify the population when it matters for interpretation.

---

# 12. Define the comparison

Comparisons are useful when the gap concerns differences.

Possible comparisons include:

- Group A vs Group B
- Condition A vs Condition B
- Before vs after
- Method A vs Method B
- Original dataset vs independent dataset
- Model A vs Model B

Example:

> Does model A generalise better than model B to an independent dataset?

The comparison should be justified by the research gap.

---

# 13. Define the outcome

Ask:

> What result would actually answer the question?

Possible outcomes:

### Behavioural

- Accuracy
- Reaction time
- Response rate
- Questionnaire score
- Clinical score

### Neuroimaging

- Activation
- Connectivity
- Decoding accuracy
- Representational similarity
- Encoding performance
- Spatial localisation

### Machine learning

- AUC
- Accuracy
- Sensitivity
- Specificity
- Calibration
- Prediction error
- Generalisation performance

Do not use a metric merely because it is common.

Choose the outcome that addresses the scientific question.

---

# 14. Avoid causal language when inappropriate

Compare:

> Does X cause Y?

with:

> Is X associated with Y?

The correct wording depends on the design.

### Observational study

Prefer:

- Associated with
- Related to
- Predicts
- Correlates with

### Experimental intervention

Potentially use:

- Causes
- Changes
- Improves
- Reduces

Only when the design supports causal inference.

---

# 15. Distinguish prediction from explanation

A predictive question:

> Can brain activity predict language outcome?

does not automatically answer:

> Why does brain activity predict language outcome?

A model can predict accurately while providing little mechanistic explanation.

Keep these as separate scientific objectives.

---

# 16. Generalisation questions

Generalisation is particularly important for computational neuroscience and machine learning.

A model may perform well on:

```text
Training data
```

but the important question may be:

```text
New participant
New dataset
New laboratory
New task
New context
```

Possible question:

> To what extent does a neural decoding model trained on one participant generalise to unseen participants?

Specify the generalisation target.

---

# 17. Replication questions

For a replication gap:

```text
Original finding
      ↓
New evidence
      ↓
Same scientific claim?
```

A replication question might be:

> Does the previously reported association between X and Y reproduce in an independent sample?

Avoid changing too many elements of the original study unless the goal is explicitly an extension.

---

# 18. Research questions for reproduction

Reproduction is different.

A reproduction question might be:

> Can the published analysis pipeline reproduce the reported effect using the authors' original dataset?

The objective is not to collect new evidence.

It is to determine whether the published result can be computationally reproduced.

---

# 19. From question to hypothesis

Not every research question requires a directional hypothesis.

### Exploratory question

> What neural representations are associated with semantic processing?

A hypothesis may be inappropriate if there is insufficient prior evidence.

### Confirmatory question

> Does semantic decoding generalise across participants?

Possible hypothesis:

> A semantic decoding model trained on one participant will predict semantic representations in unseen participants above chance.

The hypothesis should be derived from prior evidence.

---

# 20. From question to objective

A research objective states what the study will do.

Example:

### Question

> To what extent do semantic representations generalise across participants?

### Objective

> To evaluate the cross-participant generalisation of semantic representations decoded from MEG recordings.

### Hypothesis

> Semantic representations will generalise above chance across independently sampled participants.

These are related but distinct:

```text
Question
"What do we want to know?"

Objective
"What will we do?"

Hypothesis
"What do we predict?"
```

---

# 21. One gap can produce multiple questions

A single validated gap may support several questions.

Example gap:

> Generalisation of neural semantic representations remains uncertain.

Possible questions:

### Descriptive

> How stable are semantic representations across participants?

### Comparative

> Does cross-participant generalisation differ between MEG and fMRI?

### Methodological

> Which modelling approach provides the most reliable cross-participant generalisation?

### Mechanistic

> Which neural features support representations that generalise across participants?

Do not select among these purely based on novelty.

Consider:

- Scientific importance
- Evidence
- Feasibility
- Available data
- Project scope

---

# 22. Avoid question stacking

Do not combine many independent questions into one.

Weak:

> Can semantic representations be decoded, do they generalise across participants, does the method outperform EEG, and can the model predict language ability?

This contains multiple studies.

Separate them:

```text
Primary question
        ↓
Secondary question
        ↓
Exploratory question
```

Choose one primary question.

---

# 23. Primary vs secondary questions

### Primary question

Directly addresses the main research gap.

### Secondary questions

Provide supporting information.

### Exploratory questions

Investigate potentially interesting patterns not required to answer the primary question.

Example:

```text
Primary:
Does semantic decoding generalise across participants?

Secondary:
Which brain regions contribute most strongly?

Exploratory:
Does generalisation vary with narrative context?
```

This keeps the study focused.

---

# 24. Evaluate question quality

Score each candidate question qualitatively.

| Criterion     | Question                              |
| ------------- | ------------------------------------- |
| Relevance     | Does it address the validated gap?    |
| Specificity   | Is it sufficiently focused?           |
| Answerability | Can evidence answer it?               |
| Importance    | Would the answer matter?              |
| Novelty       | Does it add something new?            |
| Feasibility   | Can the study actually be done?       |
| Clarity       | Can another researcher understand it? |
| Alignment     | Does the method match the question?   |

A good question should perform well across most dimensions.

---

# 25. Question refinement process

Use:

```text
Candidate gap
      ↓
Identify central uncertainty
      ↓
Choose question type
      ↓
Define population
      ↓
Define phenomenon
      ↓
Define comparison
      ↓
Define outcome
      ↓
Check feasibility
      ↓
Remove unnecessary variables
      ↓
Check scientific importance
      ↓
Final research question
```

---

# 26. Example: neuroscience

### Literature

Studies have shown that language-related information can be decoded from neuroimaging data.

### Gap

The generalisation of these representations across participants remains uncertain.

### Broad question

> Can language information be decoded from brain activity?

Too broad.

### Focused question

> To what extent can semantic information decoded from MEG data generalise across participants?

### Objective

> Evaluate cross-participant generalisation of semantic representations derived from MEG.

### Hypothesis

> Semantic decoding will generalise above chance across independently sampled participants.

---

# 27. Example: clinical neuroscience

### Gap

Language rehabilitation studies after stroke report variable outcomes, and predictors of individual recovery remain inconsistent.

### Question

> Which behavioural and neuroimaging measures predict language recovery following stroke?

### Objective

> Evaluate whether baseline behavioural and neuroimaging measures predict subsequent language outcomes.

### Potential hypothesis

> Baseline measures of language impairment and preserved network connectivity will predict subsequent language recovery.

The hypothesis should only be directional if supported by prior evidence.

---

# 28. Example: machine learning

### Gap

A neuroimaging classifier performs well on internal cross-validation, but external generalisation is poorly established.

### Question

> How well does the classifier generalise to an independent neuroimaging dataset?

### Objective

> Evaluate external predictive performance using an independent dataset.

### Hypothesis

> Predictive performance will remain above a predefined clinically meaningful threshold on the independent dataset.

Do not assume internal cross-validation performance will transfer unchanged.

---

# 29. Example: psychology

### Gap

Studies report inconsistent effects of an intervention on anxiety, potentially because intervention duration differs between studies.

### Question

> Does intervention duration moderate the effect of the intervention on anxiety outcomes?

### Objective

> Test whether intervention duration explains variation in intervention effects.

### Hypothesis

> Longer interventions will be associated with larger reductions in anxiety.

Only use this directional hypothesis if prior evidence supports it.

---

# 30. Final validation checklist

Before accepting a research question:

- [ ] It follows from a validated research gap.
- [ ] It addresses an unresolved problem.
- [ ] It is specific enough to investigate.
- [ ] The population is defined where necessary.
- [ ] The phenomenon or intervention is defined.
- [ ] The comparison is defined where necessary.
- [ ] The outcome is measurable.
- [ ] The question is answerable with available evidence.
- [ ] The question is scientifically important.
- [ ] The proposed method can actually answer the question.
- [ ] Causal language is justified by the design.
- [ ] Prediction is not confused with explanation.
- [ ] The question is not unnecessarily broad.
- [ ] The question is not unnecessarily narrow.
- [ ] There is a clear primary question.
- [ ] Secondary and exploratory questions are separated.
- [ ] A hypothesis is only specified when justified by prior evidence.

---

# Final principle

The best research question is not the most complicated one.

It is the smallest question that can produce meaningful evidence about the most important unresolved part of the research gap.

```text
Research gap
      ↓
Central uncertainty
      ↓
Focused question
      ↓
Appropriate method
      ↓
Informative evidence
```
