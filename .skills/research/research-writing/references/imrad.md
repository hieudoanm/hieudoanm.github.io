# IMRaD Structure

## Purpose

This reference explains the structure and purpose of the main sections of an empirical research article using the IMRaD framework:

- Introduction
- Methods
- Results
- Discussion

IMRaD is a common structure for empirical research articles, particularly in experimental and quantitative research.

---

## 1. Overview

The central logic of an empirical research article is:

```text
Introduction
Why was the study needed?

        ↓

Methods
How was the study conducted?

        ↓

Results
What did the study find?

        ↓

Discussion
What do the findings mean?
```

A complete article may additionally contain:

```text
Title
Abstract
Introduction
Methods
Results
Discussion
Conclusion
References
```

The exact structure varies by journal, discipline, article type, and reporting requirements.

---

## 2. Title

The title identifies the subject and, where useful, the approach or main finding of the study.

A strong title is:

- Specific
- Concise
- Informative
- Searchable
- Consistent with the actual study

Avoid titles that imply conclusions stronger than the evidence.

Weak:

> The Definitive Neural Basis of Language

Better:

> Neural Correlates of Speech Processing During Naturalistic Listening

The title should accurately describe the scope of the study.

---

## 3. Abstract

The Abstract provides a compact representation of the entire study.

A typical empirical abstract contains:

```text
Background
    ↓
Objective
    ↓
Methods
    ↓
Results
    ↓
Conclusion
```

### Background

Establish the relevant problem briefly.

### Objective

State the research question, hypothesis, or objective.

### Methods

Describe the participants, data, experimental design, and primary analysis briefly.

### Results

Report the principal findings, preferably with important quantitative information.

### Conclusion

State the main interpretation and contribution.

The Abstract should be understandable independently of the main article.

Do not introduce important claims in the Abstract that are absent from the main paper.

---

# 4. Introduction

## Purpose

The Introduction answers:

> Why was this study necessary?

It establishes the scientific context and leads the reader toward the specific research question.

A common structure is:

```text
Broad field
    ↓
Specific topic
    ↓
Existing knowledge
    ↓
Unresolved problem
    ↓
Research gap
    ↓
Research question
    ↓
Hypothesis / objectives
```

---

## 4.1 Background

Begin by establishing the relevant scientific context.

The amount of background should be proportional to the research question.

Avoid explaining everything known about a field.

Only include information that helps the reader understand:

- The research problem
- The theoretical context
- The methodological context
- The research gap
- The importance of the study

---

## 4.2 Existing Literature

Summarise relevant previous research.

Do not simply list studies chronologically.

Instead, synthesise them around ideas:

```text
Finding A
+
Finding B
+
Finding C
        ↓
What the literature collectively suggests
```

A literature paragraph should help the reader understand how existing evidence leads toward the current study.

---

## 4.3 Research Gap

Identify what remains unresolved.

Possible types of research gaps include:

- Insufficient evidence
- Conflicting findings
- Unstudied population
- Unstudied condition
- Methodological limitation
- Missing comparison
- Unresolved mechanism
- Unexplored application

The gap should be genuine and relevant to the research question.

---

## 4.4 Research Question

The research question should emerge naturally from the Introduction.

A strong research question is:

- Specific
- Answerable
- Relevant
- Consistent with the methods

The reader should understand why this question follows from the preceding literature.

---

## 4.5 Hypothesis

When applicable, state the hypothesis explicitly.

A hypothesis should describe a testable prediction.

For example:

> We hypothesised that increased task difficulty would be associated with longer reaction times.

Avoid vague hypotheses that cannot be meaningfully tested.

---

## 4.6 Study Overview

Some articles conclude the Introduction with a brief description of the study.

For example:

> We investigated this question using MEG recordings collected during naturalistic speech comprehension and tested whether semantic information could be decoded from neural activity.

This gives the reader a transition into the Methods.

---

# 5. Methods

## Purpose

The Methods answer:

> How was the study conducted?

The Methods should contain enough information for readers to understand the study and, where appropriate, reproduce it.

Typical subsections include:

```text
Participants
Materials / stimuli
Experimental design
Procedure
Data acquisition
Preprocessing
Analysis
Statistical analysis
```

The exact structure depends on the research field.

---

## 5.1 Participants

Report relevant information about the sample.

Depending on the study, this may include:

- Sample size
- Demographics
- Inclusion criteria
- Exclusion criteria
- Recruitment
- Group assignment
- Ethical approval
- Informed consent

Do not include unnecessary identifying information.

---

## 5.2 Materials and Stimuli

Describe what participants encountered or what data were analysed.

Examples:

- Images
- Words
- Sentences
- Videos
- Audio
- Questionnaires
- Experimental tasks
- Public datasets

Provide enough information to understand the experimental manipulation.

---

## 5.3 Experimental Design

Describe the structure of the experiment.

Relevant information may include:

- Conditions
- Independent variables
- Dependent variables
- Control conditions
- Randomisation
- Counterbalancing
- Within-subject design
- Between-subject design
- Trial structure

Make clear which variables were manipulated and which were measured.

---

## 5.4 Procedure

Describe what participants or researchers actually did.

A reader should be able to reconstruct the sequence of events.

For example:

```text
Instruction
    ↓
Stimulus presentation
    ↓
Participant response
    ↓
Inter-trial interval
    ↓
Next trial
```

---

## 5.5 Data Acquisition

For neuroscience research, describe how the data were acquired.

Depending on the modality, this may include:

- EEG
- MEG
- OPM-MEG
- fMRI
- MRI
- behavioural measurements
- eye tracking
- physiological recordings

Relevant acquisition parameters should be reported where appropriate.

---

## 5.6 Preprocessing

Describe transformations applied before statistical analysis.

Examples include:

- Filtering
- Artifact removal
- Motion correction
- Normalisation
- Segmentation
- Epoching
- Baseline correction
- Denoising
- Missing-data handling

Important preprocessing decisions should not be omitted.

---

## 5.7 Analysis

Explain how the research question was tested.

For computational research, this may include:

- Feature extraction
- Statistical models
- Machine-learning models
- Computational cognitive models
- Cross-validation
- Model comparison
- Parameter estimation
- Representational analyses

Specify important methodological choices.

---

## 5.8 Statistical Analysis

Describe:

- Statistical tests
- Dependent variables
- Independent variables
- Statistical models
- Significance criteria
- Confidence intervals
- Effect sizes
- Multiple-comparison correction
- Assumption checks where relevant

The statistical method should correspond to the research design and question.

---

# 6. Results

## Purpose

The Results answer:

> What did the study find?

The Results should report the findings without turning every observation into an interpretation.

A useful structure is:

```text
Research question / analysis
        ↓
Comparison or model
        ↓
Result
        ↓
Uncertainty
        ↓
Figure / table
```

---

## 6.1 Organise Results Around Questions

Results should generally follow the analytical logic of the study.

For example:

```text
Primary analysis
    ↓
Secondary analysis
    ↓
Additional analysis
    ↓
Robustness / sensitivity analysis
```

Avoid presenting analyses in the arbitrary order in which they were performed.

---

## 6.2 Quantitative Reporting

Where appropriate, report:

- Descriptive statistics
- Effect estimates
- Effect sizes
- Confidence intervals
- Test statistics
- Degrees of freedom
- p-values
- Model performance
- Prediction accuracy

Do not report isolated statistical values without sufficient context.

---

## 6.3 Figures and Tables

Use figures and tables to communicate important results efficiently.

Each should:

- Have a clear purpose
- Be referenced in the text
- Have an informative caption
- Use appropriate units
- Represent uncertainty where relevant

The text should explain the important pattern rather than simply pointing to the figure.

---

## 6.4 Statistical Significance

Do not equate statistical significance with importance.

A statistically significant result may have a small practical effect.

A non-significant result does not necessarily demonstrate that there is no effect.

Interpret statistical evidence in relation to:

- Effect size
- Uncertainty
- Study design
- Measurement quality
- Scientific context

---

# 7. Discussion

## Purpose

The Discussion answers:

> What do the results mean?

It should connect the findings back to the research question and broader scientific context.

A common structure is:

```text
Main finding
    ↓
Interpretation
    ↓
Comparison with previous research
    ↓
Possible explanation
    ↓
Implications
    ↓
Limitations
    ↓
Future research
    ↓
Overall conclusion
```

---

## 7.1 Start With the Main Findings

Briefly remind the reader of the most important findings.

Do not simply copy the Results section.

Focus on what matters for the research question.

---

## 7.2 Interpret the Findings

Explain what the findings might mean.

Distinguish clearly between:

```text
Observed result
        ↓
Reasonable interpretation
        ↓
Possible explanation
```

The interpretation should not exceed what the study can support.

---

## 7.3 Compare With Previous Research

Explain whether the findings:

- Agree with previous research
- Extend previous research
- Contradict previous research
- Refine an existing interpretation
- Address an unresolved question

Do not treat disagreement as automatically meaning that one study is wrong.

Differences may arise from:

- Participants
- Tasks
- Stimuli
- Measurement methods
- Analysis methods
- Statistical power
- Experimental context

---

## 7.4 Explain Possible Mechanisms

Where appropriate, propose explanations for the findings.

Use appropriately cautious language:

- may reflect
- could result from
- might indicate
- is consistent with
- one possibility is

A proposed mechanism should be clearly distinguished from a demonstrated mechanism.

---

## 7.5 Discuss Implications

Explain what the findings contribute.

Implications may be:

- Theoretical
- Methodological
- Clinical
- Computational
- Practical

Only claim implications that are reasonably supported by the study.

---

## 7.6 Discuss Limitations

A strong limitations section does not merely list generic weaknesses.

For each limitation, explain:

```text
Limitation
    ↓
Why it matters
    ↓
How it affects interpretation
```

For example:

> The sample size was relatively small, which may reduce the precision of the estimated effect and limit generalisability.

Good limitations are specific to the study.

---

## 7.7 Future Research

Future research should follow logically from:

- The research gap
- The current findings
- The limitations
- Remaining theoretical questions

Avoid generic statements such as:

> Future research should investigate this topic further.

Instead, specify what should be investigated and why.

---

# 8. Conclusion

A separate Conclusion section may be required depending on the journal.

It should:

- Answer the research question
- State the main contribution
- Reflect the strength of the evidence
- Avoid introducing new evidence
- Avoid unsupported claims

A useful conceptual structure is:

```text
Research question
       ↓
Main finding
       ↓
Scientific meaning
       ↓
Contribution
```

---

# 9. References

References document the sources supporting the manuscript.

A research article may cite:

- Original research papers
- Review articles
- Meta-analyses
- Methodological papers
- Datasets
- Software
- Theoretical papers

Reference formatting should follow the requirements of the target journal or institution.

---

# 10. Section Relationships

The sections should form a coherent chain.

```text
Introduction
    ↓
Research question
    ↓
Methods
    ↓
Analysis
    ↓
Results
    ↓
Discussion
    ↓
Conclusion
```

A useful consistency test is:

> Does the Introduction ask the question that the Methods actually test?

Then:

> Do the Results answer the question?

Then:

> Does the Discussion interpret those results?

Finally:

> Does the Conclusion accurately reflect the Discussion?

If the answer to any of these is no, the manuscript's structure should be reconsidered.

---

# 11. IMRaD Quality Check

Before finalising an empirical article, check:

### Introduction

- [ ] Background is relevant.
- [ ] Previous research is synthesised.
- [ ] Research gap is explicit.
- [ ] Research question is clear.
- [ ] Hypothesis or objective is stated where appropriate.

### Methods

- [ ] Participants or data are described.
- [ ] Experimental design is clear.
- [ ] Variables are defined.
- [ ] Procedure is reproducible.
- [ ] Data preprocessing is described.
- [ ] Analysis methods are described.
- [ ] Statistical methods are appropriate.

### Results

- [ ] Results follow the research questions.
- [ ] Main findings are clearly reported.
- [ ] Appropriate quantitative information is provided.
- [ ] Figures and tables are referenced.
- [ ] Interpretation is limited.

### Discussion

- [ ] Main findings are interpreted.
- [ ] Findings are compared with previous research.
- [ ] Alternative explanations are considered where relevant.
- [ ] Implications are discussed.
- [ ] Limitations are specific.
- [ ] Future research follows logically from the findings.
- [ ] Claims are appropriately qualified.

### Overall

- [ ] The sections form one coherent argument.
- [ ] The conclusion follows from the evidence.
- [ ] No section makes unsupported claims.
- [ ] Terminology is consistent.
- [ ] The research question remains visible throughout the article.
