# Research Reporting Guidelines

## Purpose

This reference provides principles for reporting scientific research clearly, transparently, and reproducibly.

Reporting guidelines help researchers communicate:

- What was studied
- How it was studied
- What was found
- How uncertainty was handled
- What limitations affect interpretation

Different study designs may require different reporting standards. The appropriate guideline should be selected based on the type of research being reported.

---

## 1. Reporting Is Part of Scientific Rigor

A scientifically valid study can still be difficult to evaluate if important methodological or analytical information is missing.

Good reporting allows readers to determine:

```text id="e8pr7f"
What was studied?
      ↓
How was it studied?
      ↓
What decisions were made?
      ↓
What was found?
      ↓
How certain are the findings?
      ↓
What conclusions are justified?
```

Do not omit important information merely because it seems obvious to the researcher.

---

## 2. Choose the Appropriate Reporting Guideline

Different research designs require different reporting considerations.

Common examples include:

- **CONSORT** — randomised controlled trials
- **STROBE** — observational studies
- **PRISMA** — systematic reviews and meta-analyses
- **CARE** — case reports
- **STARD** — diagnostic accuracy studies
- **TRIPOD** — prediction models
- **ARRIVE** — animal research
- **COREQ** — qualitative interviews and focus groups
- **SRQR** — qualitative research

These guidelines should not be treated as interchangeable.

First identify the study design, then identify the reporting standard appropriate to that design.

---

## 3. Use Reporting Guidelines as Checklists

A reporting guideline should improve completeness, not replace scientific judgement.

Use it to ask:

```text id="qeq5fd"
What information does the reader need?
          ↓
What information does the guideline recommend?
          ↓
Have we reported it clearly?
```

Do not add information merely to satisfy a checklist if it does not accurately describe the study.

---

## 4. Report the Study Design Clearly

Readers should be able to identify the study design.

Examples include:

- Randomised controlled trial
- Cross-sectional study
- Cohort study
- Case-control study
- Experimental study
- Observational study
- Computational modelling study
- Secondary data analysis
- Systematic review
- Meta-analysis

Use precise terminology.

Do not describe an observational study as an experiment unless variables were actually manipulated.

---

## 5. Report Participants or Data Sources

Describe who or what was studied.

For participants, report relevant information such as:

- Sample size
- Recruitment
- Eligibility criteria
- Exclusion criteria
- Demographics
- Group allocation
- Attrition
- Missing data

For datasets, report:

- Dataset name
- Source
- Sample size
- Relevant variables
- Inclusion criteria
- Exclusion criteria
- Data collection context
- Data version where relevant

The reader should understand the population represented by the data.

---

## 6. Report Exclusions and Attrition

Do not report only the final sample when exclusions or participant loss occurred.

Where relevant, explain:

```text id="r8vqde"
Initial sample
      ↓
Exclusions
      ↓
Withdrawals / missing data
      ↓
Final analysed sample
```

The reasons for exclusions should be reported where appropriate.

For participant-based research, a flow diagram may be useful when recommended by the relevant reporting guideline.

---

## 7. Report Variables Clearly

Define the variables relevant to the research question.

Distinguish between:

- Independent variables
- Dependent variables
- Covariates
- Confounders
- Mediators
- Moderators
- Predictors
- Outcomes

For computational studies, also distinguish:

- Inputs
- Features
- Targets
- Model parameters
- Hyperparameters
- Evaluation metrics

Do not use a term such as "predictor" or "confounder" without considering its statistical meaning.

---

## 8. Report Procedures in Sufficient Detail

Describe the procedure in enough detail to understand what happened.

For experimental research, this may include:

- Instructions
- Stimulus presentation
- Trial sequence
- Timing
- Experimental conditions
- Randomisation
- Counterbalancing
- Response collection

For neuroimaging research, also report relevant acquisition and preprocessing details.

The amount of detail should be sufficient for another researcher to understand the study and assess its validity.

---

## 9. Report Measurement Methods

Explain how variables were measured.

For each important measure, consider reporting:

- What was measured
- How it was measured
- Measurement units
- Instrument or task
- Reliability where relevant
- Validity where relevant
- Scoring procedure

Do not assume that a measurement label alone explains how the variable was obtained.

For example, "cognitive performance" is not a sufficiently precise measurement description.

---

## 10. Report Data Processing

Data processing can influence research conclusions and should therefore be reported transparently.

Relevant steps may include:

- Cleaning
- Filtering
- Normalisation
- Transformation
- Imputation
- Artifact removal
- Outlier handling
- Feature selection
- Dimensionality reduction
- Trial rejection
- Missing-data handling

Where processing involves researcher judgement, explain the relevant criteria.

Avoid reporting only the final processed dataset without describing how it was obtained.

---

## 11. Report Statistical Analyses Completely

A statistical result should provide enough information for interpretation.

Depending on the analysis, report:

- Statistical test or model
- Variables analysed
- Sample size
- Effect estimate
- Effect size
- Confidence interval
- Test statistic
- Degrees of freedom
- p-value
- Correction for multiple comparisons where relevant

For model-based analyses, also report important modelling assumptions and specifications.

Avoid reporting only:

> p < .05

without explaining what was tested.

---

## 12. Report Uncertainty

Scientific measurements are rarely exact.

Where appropriate, report uncertainty using:

- Confidence intervals
- Standard errors
- Standard deviations
- Credible intervals
- Prediction intervals
- Bootstrap intervals
- Other appropriate uncertainty estimates

Choose the measure that matches the statistical framework and research question.

Do not hide uncertainty simply because it makes a result look less impressive.

---

## 13. Report Effect Sizes

Statistical significance does not communicate the magnitude of an effect.

Where appropriate, report effect sizes such as:

- Mean difference
- Standardised mean difference
- Correlation coefficient
- Odds ratio
- Risk ratio
- Regression coefficient
- Model performance metric

Interpret effect sizes in their scientific context rather than relying on universal labels such as "small", "medium", or "large" without justification.

---

## 14. Report Multiple Comparisons

When many statistical tests are performed, the probability of obtaining apparently significant findings by chance can increase.

If multiple comparisons are relevant, report:

- Number of comparisons
- Correction method
- Family-wise error approach where relevant
- False discovery rate approach where relevant
- Whether the analysis was planned or exploratory

Do not selectively report only statistically significant comparisons.

---

## 15. Distinguish Confirmatory and Exploratory Analyses

Clearly distinguish analyses that were:

### Confirmatory

Specified before analysing the relevant data and designed to test predefined hypotheses.

### Exploratory

Conducted to investigate patterns, generate hypotheses, or explore unexpected findings.

Both can be scientifically valuable.

The problem is presenting exploratory findings as though they were preregistered predictions.

Use transparent language:

> Exploratory analyses indicated...

rather than falsely presenting the observation as a prior hypothesis.

---

## 16. Report Deviations From the Planned Analysis

If the analysis differed from the original plan, explain the change when relevant.

For example:

```text id="7qf9sh"
Planned analysis
      ↓
Problem or new information
      ↓
Modification
      ↓
Reason
      ↓
Final analysis
```

Transparent reporting is preferable to silently changing the analysis.

---

## 17. Report Missing Data

Explain:

- How much data were missing
- Which variables were affected
- Why data were missing where known
- How missing data were handled

Possible approaches include:

- Complete-case analysis
- Imputation
- Model-based approaches
- Sensitivity analyses

The appropriate approach depends on the research design and assumptions.

---

## 18. Report Limitations

Limitations should be specific to the study.

A useful structure is:

```text id="h8d9m6"
Limitation
      ↓
Why it matters
      ↓
Effect on interpretation
      ↓
Possible mitigation
```

Examples:

- Small sample size
- Restricted population
- Measurement limitations
- Confounding
- Limited temporal or spatial resolution
- Model assumptions
- Missing data
- Limited generalisability

Do not treat limitations as a ritual paragraph. Explain how they affect the evidence.

---

## 19. Report Data and Code Availability

When appropriate, state whether:

- Data are publicly available
- Data can be accessed under restrictions
- Code is publicly available
- Analysis scripts are available
- Materials are available
- Preregistration exists
- Study protocols are available

For computational research, reproducibility is improved when researchers provide:

- Source code
- Environment information
- Dependency versions
- Configuration
- Data-processing scripts
- Analysis scripts

Availability statements should accurately reflect what is actually accessible.

---

## 20. Report Software and Computational Details

For computational and quantitative research, software can materially affect results.

Where relevant, report:

- Software name
- Version
- Important packages
- Model implementation
- Parameter settings
- Random seeds
- Hardware constraints when relevant
- Code repository

For machine-learning studies, consider reporting:

- Train/validation/test split
- Cross-validation strategy
- Hyperparameter selection
- Baseline models
- Evaluation metrics
- Data leakage prevention
- Model selection procedure

Do not assume that "Python" or "MATLAB" alone provides sufficient computational detail.

---

## 21. Report Neuroimaging Studies Transparently

For neuroscience and neuroimaging research, reporting should cover relevant aspects of:

### Participants

- Sample size
- Demographics
- Inclusion/exclusion
- Ethics

### Acquisition

- Modality
- Acquisition parameters
- Recording duration
- Relevant hardware

### Preprocessing

- Filtering
- Artifact correction
- Motion handling
- Epoching
- Rejection criteria
- Normalisation

### Analysis

- Regions of interest
- Statistical model
- Correction method
- Multiple comparisons
- Model specification

### Interpretation

- Spatial and temporal limitations
- Measurement limitations
- Alternative explanations

The exact requirements depend on the modality and study design.

---

## 22. Report Machine-Learning and Decoding Studies Carefully

Decoding and prediction studies require particular attention to evaluation methodology.

Report:

- Dataset partitioning
- Training and test procedures
- Cross-validation
- Feature preprocessing
- Feature selection
- Hyperparameter selection
- Baseline or chance performance
- Evaluation metric
- Statistical testing
- Data leakage prevention

A model evaluated on data that influenced model selection cannot be treated as an unbiased test of generalisation.

Be explicit about whether performance was measured on:

- Training data
- Validation data
- Held-out test data

---

## 23. Report Negative and Null Findings

Do not selectively report only results that support the research hypothesis.

If a planned analysis produces a null or unexpected result, report it when relevant to the research question.

This reduces selective reporting and provides a more accurate representation of the evidence.

---

## 24. Report Unexpected Findings Transparently

Unexpected findings may be scientifically valuable.

Distinguish between:

```text id="s2eggc"
Pre-specified hypothesis
        ↓
Observed result
        ↓
Unexpected pattern
        ↓
Exploratory interpretation
```

Do not rewrite the research history so that an unexpected finding appears to have been predicted from the beginning.

---

## 25. Reporting Checklist

Before finalising a research article, ask:

### Study design

- [ ] Is the study design clearly identified?
- [ ] Is the research question explicit?
- [ ] Are hypotheses or objectives stated?
- [ ] Are important deviations from the original plan reported?

### Participants and data

- [ ] Is the sample or dataset described?
- [ ] Are inclusion and exclusion criteria reported?
- [ ] Are exclusions and attrition explained?
- [ ] Is missing data addressed?

### Methods

- [ ] Are measurements clearly defined?
- [ ] Is the procedure sufficiently detailed?
- [ ] Are preprocessing decisions reported?
- [ ] Are statistical and computational methods specified?

### Results

- [ ] Are relevant findings reported?
- [ ] Are effect sizes or estimates provided where appropriate?
- [ ] Is uncertainty reported?
- [ ] Are multiple comparisons addressed?
- [ ] Are null and unexpected findings reported where relevant?

### Transparency

- [ ] Are confirmatory and exploratory analyses distinguished?
- [ ] Are important assumptions stated?
- [ ] Is data availability described?
- [ ] Is code availability described?
- [ ] Are software versions reported where relevant?

### Interpretation

- [ ] Are claims proportional to the evidence?
- [ ] Are alternative explanations considered?
- [ ] Are limitations discussed?
- [ ] Are causal claims justified?

---

## 26. Core Principle

Transparent reporting allows readers to evaluate the research rather than asking them to trust the authors.

The goal is not to make a study appear stronger.

The goal is to make the evidence, uncertainty, decisions, and limitations sufficiently visible that another researcher can make an informed assessment of the findings.
