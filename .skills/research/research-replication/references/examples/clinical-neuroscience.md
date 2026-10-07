# Clinical Neuroscience Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in clinical neuroscience.

The example focuses on a hypothetical study investigating whether baseline neuroimaging and behavioural measures can predict language recovery after stroke.

The purpose is to show how replication principles apply when:

- Patients are clinically heterogeneous
- Outcomes are clinically meaningful
- Recovery changes over time
- Samples are often relatively small
- Neuroimaging measurements vary across sites
- Prediction models can easily suffer from data leakage
- Statistical significance alone is insufficient

---

# 1. Research question

Suppose an original study asks:

> Can baseline brain and behavioural measures predict language recovery after stroke?

The original study reports that a combination of:

```text
Baseline language impairment
+
Lesion characteristics
+
Neuroimaging measures
```

predicts language outcome several months later.

The replication should begin with the scientific claim:

```text
Baseline information contains predictive information
about later language recovery after stroke.
```

Not:

```text
Run the same machine-learning code again.
```

---

# 2. Original scientific claim

Suppose the original study reports:

```text
Participants:
120 people with stroke-related aphasia

Prediction time:
Baseline

Outcome:
Language score at 6 months

Predictors:
Lesion volume
Baseline language score
Functional connectivity

Model:
Regularised regression

Result:
R² = 0.42
```

The scientific claim is approximately:

> Baseline behavioural and neuroimaging measures can predict individual differences in language outcome six months after stroke.

---

# 3. Define the target prediction

Before replication, specify:

```text
Population:
People with post-stroke aphasia

Prediction point:
Baseline

Outcome:
6-month language outcome

Predictors:
Prespecified baseline variables

Primary metric:
R²
```

Potential secondary metrics include:

```text
MAE
RMSE
Correlation
Calibration
```

The primary metric should be defined before seeing the replication data.

---

# 4. Clinical replication versus reproduction

Suppose the original dataset is available.

Running the original model on the same dataset is:

```text
Reproduction
```

Running the same model on:

```text
New patients
```

is:

```text
Replication
```

Running the model on:

```text
A new hospital
+
new patients
```

is stronger evidence of:

```text
External generalisation
```

---

# 5. Why clinical replication is difficult

Clinical populations are heterogeneous.

Patients can differ in:

```text
Age
Stroke location
Stroke severity
Time since stroke
Lesion volume
Language profile
Motor impairment
Cognitive impairment
Treatment
Medication
Education
Pre-stroke ability
```

A replication should define which differences are acceptable.

---

# 6. Population definition

Suppose the original study included:

```text
First-ever left-hemisphere stroke
Chronic aphasia
Age 40–80
```

The replication should document whether it includes:

```text
First-ever stroke?
Right-hemisphere stroke?
Multiple strokes?
Acute patients?
Chronic patients?
Different age range?
```

Changing the population can change the scientific question.

---

# 7. Clinical phenotype

"Aphasia" is not a single homogeneous condition.

Patients can have different profiles involving:

```text
Naming
Comprehension
Repetition
Fluency
Reading
Writing
Speech production
Semantic processing
```

Therefore the replication should preserve the relevant clinical definition.

---

# 8. Outcome definition

Suppose the original study uses:

```text
Standardised language assessment
```

The replication should determine:

```text
Same test?
Equivalent test?
Different language test?
Composite score?
Single subtest?
```

Outcome changes can make apparent replication differences difficult to interpret.

---

# 9. Outcome timing

Recovery is dynamic.

A patient may change substantially between:

```text
1 week
1 month
3 months
6 months
12 months
```

Therefore:

```text
Original:
6-month outcome

Replication:
6-month outcome
```

is much more comparable than:

```text
Original:
6-month outcome

Replication:
12-month outcome
```

The latter is a longitudinal generalisation.

---

# 10. Spontaneous recovery

Post-stroke improvement can occur without the experimental intervention.

Therefore:

```text
Observed outcome
=
spontaneous recovery
+
rehabilitation
+
patient factors
+
measurement variation
+
other influences
```

A prediction model can still be useful, but the interpretation should not automatically become:

> The model predicts treatment response.

Predicting outcome and predicting treatment response are different questions.

---

# 11. Prediction versus treatment effect

This distinction is critical.

### Prediction

> Who is likely to have a better outcome?

### Treatment effect moderation

> Who is likely to benefit more from a particular treatment?

A model predicting recovery does not automatically predict who will respond to therapy.

---

# 12. Replication design

A close external replication might use:

```text
Original:
Hospital A
120 patients
Baseline MRI
Baseline language assessment
6-month outcome

Replication:
Hospital B
150 new patients
Baseline MRI
Baseline language assessment
6-month outcome
```

The core prediction question remains unchanged.

---

# 13. Site differences

Different hospitals may have different:

```text
Patient populations
MRI scanners
Clinical protocols
Rehabilitation services
Assessment procedures
Referral patterns
```

These differences are important because external validation tests whether the model survives realistic variation.

---

# 14. Scanner differences

Suppose:

```text
Original:
3T Siemens

Replication:
3T Philips
```

Even though both are 3T MRI systems, measurements can differ because of:

```text
Acquisition parameters
Sequence implementation
Coil configuration
Scanner hardware
Preprocessing
```

A model may therefore experience distribution shift.

---

# 15. MRI acquisition

Document:

```text
Field strength
Sequence
Voxel size
TR
TE
Number of volumes
Structural acquisition
Functional acquisition
Diffusion acquisition
```

Only include modalities necessary for the scientific claim.

---

# 16. Lesion measurement

If lesion volume is a predictor, define:

```text
Lesion segmentation method
Lesion mask quality
Manual vs automated segmentation
Rater procedure
Inter-rater reliability
```

Measurement differences can alter predictive performance.

---

# 17. Neuroimaging preprocessing

Potential steps include:

```text
Raw imaging
      ↓
Quality control
      ↓
Motion correction
      ↓
Registration
      ↓
Normalisation
      ↓
Feature extraction
      ↓
Model input
```

The replication should ensure that preprocessing does not accidentally use future information.

---

# 18. Data leakage

Data leakage is one of the most important risks in clinical ML replication.

Incorrect:

```text
All patients
    ↓
Feature normalisation
    ↓
Cross-validation
```

Correct:

```text
Training fold
    ↓
Fit preprocessing

Training fold
    ↓
Fit model

Held-out fold
    ↓
Apply preprocessing

Held-out fold
    ↓
Predict
```

Any operation that learns parameters from the data must be fitted inside the training set.

---

# 19. Leakage through feature selection

Suppose researchers:

```text
Select the best 100 brain features
using the entire dataset
```

and then:

```text
Cross-validate the model.
```

This can leak information from the test folds.

Instead:

```text
Training fold
    ↓
Feature selection
    ↓
Model fitting
    ↓
Held-out fold
```

Feature selection must be nested inside the validation procedure.

---

# 20. Leakage through outcome information

Avoid features that indirectly encode future outcomes.

For example:

```text
Baseline feature
```

must genuinely be available:

```text
At prediction time.
```

A clinical variable recorded after treatment or after recovery has occurred cannot legitimately be a baseline predictor.

---

# 21. Independent validation

The strongest test is:

```text
Train:
Original cohort

Test:
Independent replication cohort
```

This asks:

> Does the original predictive relationship generalise to genuinely new patients?

---

# 22. Refit versus no-refit validation

There are two different questions.

### External validation without refitting

```text
Original model
      ↓
New cohort
      ↓
Performance
```

This tests whether the original model transfers directly.

### Model updating

```text
Original model
      ↓
Adapt using new cohort
      ↓
Updated model
```

This tests whether the model can be improved for the new setting.

These should not be confused.

---

# 23. Primary validation metric

Suppose the original study reports:

```text
R² = 0.42
```

The replication should report:

```text
R²
+
95% confidence interval
```

But R² alone may not be sufficient.

Also consider:

```text
MAE
RMSE
Calibration
Prediction interval
```

depending on the clinical purpose.

---

# 24. R² interpretation

Suppose:

```text
Original:
R² = 0.42

Replication:
R² = 0.30
```

The replication explains less outcome variance.

This does not automatically mean:

```text
Model failed.
```

The difference could arise from:

```text
Population shift
Scanner differences
Outcome variability
Measurement differences
Overfitting in original study
```

---

# 25. Mean absolute error

Suppose the outcome is a language score.

MAE answers:

> How far are predictions from the observed outcome on average?

For example:

```text
MAE = 8 points
```

may be easier for clinicians to interpret than:

```text
R² = 0.30
```

The practical meaning depends on the outcome scale.

---

# 26. Calibration

A model can discriminate reasonably well but still be poorly calibrated.

For example:

```text
Predicted:
80% recovery

Observed:
55% recovery
```

This model may systematically overpredict.

Clinical prediction should therefore evaluate:

```text
Discrimination
+
Calibration
```

where appropriate.

---

# 27. Clinical significance

Suppose a model improves prediction error by:

```text
1 language-score point.
```

Ask:

```text
Is one point clinically meaningful?
Would it change treatment?
Would it change prognosis?
Would it change patient decision-making?
```

Predictive performance should be interpreted in clinical context.

---

# 28. Baseline model

Always compare against a sensible baseline.

For example:

```text
Neuroimaging model
```

versus:

```text
Baseline clinical model
```

The baseline may include:

```text
Age
Baseline language score
Stroke severity
Lesion volume
```

A complex imaging model should demonstrate that it adds useful information beyond simpler clinical variables.

---

# 29. Incremental predictive value

Suppose:

```text
Clinical model:
R² = 0.32

Clinical + MRI:
R² = 0.38
```

The important question becomes:

> Does neuroimaging add meaningful predictive information beyond clinical variables?

The improvement:

```text
ΔR² = 0.06
```

may be statistically detectable but clinically unimportant.

Interpret both magnitude and utility.

---

# 30. Overfitting

Suppose:

```text
N = 120
```

but:

```text
Features = 50,000 voxels
```

A flexible model can fit the training data extremely well while generalising poorly.

Conceptually:

```text
Training performance ↑
Generalisation ↓
```

Replication is particularly valuable because an independent cohort exposes overfitting.

---

# 31. Cross-validation versus external validation

Cross-validation:

```text
One dataset
      ↓
Repeated train/test splits
```

External validation:

```text
Dataset A
      ↓
Model
      ↓
Independent Dataset B
```

External validation is a stronger test of transportability.

Cross-validation does not replace an independent replication cohort.

---

# 32. Clinical heterogeneity as a moderator

Suppose performance differs between:

```text
Mild aphasia
Moderate aphasia
Severe aphasia
```

This may reveal:

```text
Model applicability boundary
```

Similarly, performance may vary by:

```text
Stroke location
Age
Chronicity
Language profile
```

These analyses should be prespecified when possible.

---

# 33. Replication of a neural mechanism

Suppose the original study claims:

> Functional connectivity predicts language recovery because it reflects preserved language-network integrity.

A replication should distinguish:

```text
Predictive replication
```

from:

```text
Mechanistic replication
```

Reproducing predictive accuracy does not automatically validate the proposed mechanism.

---

# 34. Multimodal replication

Suppose the original model uses:

```text
Behaviour
+
Structural MRI
```

A replication could test:

```text
Behaviour
+
Structural MRI
+
Functional MRI
```

This is an extension.

The primary replication should still preserve the original model comparison if the goal is to test the original claim.

---

# 35. Speech and language neuroscience example

A language-focused replication might investigate:

```text
Baseline language task
+
MEG/EEG features
```

to predict:

```text
Later language outcome
```

The replication must distinguish:

```text
Neural correlates of language ability
```

from:

```text
Predictors of future recovery.
```

A baseline neural association does not automatically imply prognostic value.

---

# 36. Example replication results

Suppose:

```text
Original:
R² = 0.42
95% CI [0.30, 0.52]

Replication:
R² = 0.31
95% CI [0.22, 0.39]
```

The model still predicts meaningful outcome variation.

However, performance is lower.

Possible conclusion:

> The replication provides broadly consistent evidence that baseline measures contain predictive information about later language outcome, although predictive performance was lower in the independent cohort.

---

# 37. Strong contradiction

Suppose:

```text
Replication:
R² = 0.02
95% CI [-0.05, 0.09]
```

while a baseline clinical model achieves:

```text
R² = 0.28
```

This would substantially weaken the original claim that the proposed neuroimaging features provide strong independent predictive value.

---

# 38. Do not overinterpret model failure

A failed external validation can result from:

```text
Dataset shift
Measurement differences
Scanner differences
Outcome differences
Clinical differences
Implementation errors
Preprocessing differences
Original overfitting
```

Therefore investigate the failure before concluding:

```text
The biological relationship does not exist.
```

---

# 39. Distribution shift

Compare:

```text
Original cohort
```

and:

```text
Replication cohort
```

for:

```text
Age
Severity
Lesion volume
Outcome distribution
Imaging features
Language scores
Clinical variables
```

Large shifts can explain reduced predictive performance.

---

# 40. Missing data

Clinical datasets often contain missing values.

Document:

```text
Which variables are missing?
How much is missing?
Is missingness related to severity?
How is missingness handled?
```

Imputation should occur within the appropriate training-validation structure to prevent leakage.

---

# 41. Treatment differences

Patients may receive different rehabilitation:

```text
Speech therapy
Occupational therapy
Medication
Intensity
Duration
Type of intervention
```

If treatment differs substantially between cohorts, outcome prediction may change.

Treatment variables can therefore act as important sources of heterogeneity.

---

# 42. Temporal validation

Suppose:

```text
Original:
Patients recruited 2018–2020

Replication:
Patients recruited 2025–2027
```

Even at the same hospital, clinical practice may change.

This provides evidence about:

```text
Temporal generalisation
```

rather than only participant generalisation.

---

# 43. Multi-site replication

A stronger clinical programme might use:

```text
Hospital A
Hospital B
Hospital C
Hospital D
```

The model can then be evaluated across:

```text
Sites
Scanners
Populations
Clinical pathways
```

This is particularly valuable for determining whether a model is transportable.

---

# 44. Replication result matrix

A useful summary is:

| Dimension      | Original               | Replication            | Assessment    |
| -------------- | ---------------------- | ---------------------- | ------------- |
| Population     | Aphasia after stroke   | Aphasia after stroke   | Similar       |
| N              | 120                    | 150                    | Larger        |
| Outcome        | 6-month language score | 6-month language score | Same          |
| Imaging        | MRI                    | MRI                    | Same modality |
| Site           | Hospital A             | Hospital B             | Different     |
| Model          | Regularised regression | Same model             | Same          |
| R²             | .42                    | .31                    | Lower         |
| Baseline model | .28                    | .27                    | Similar       |
| Imaging gain   | .14                    | .04                    | Reduced       |

This makes the interpretation clearer than reporting a single model score.

---

# 45. Overall interpretation

A reasonable conclusion might be:

> The original predictive relationship was partially replicated in an independent clinical cohort. Baseline behavioural and neuroimaging measures predicted six-month language outcome above the clinical baseline model, but the incremental contribution of neuroimaging was substantially smaller than originally reported. This suggests that the general prognostic relationship is plausible, while the magnitude and clinical value of the additional neuroimaging information remain uncertain.

This is more informative than:

> The model replicated.

---

# 46. What if only the behavioural component replicates?

Suppose:

```text
Baseline language:
Strong predictor

Neuroimaging:
No additional predictive value
```

The replication may suggest:

```text
Clinical baseline measures
→ robust prognostic information

Additional neuroimaging contribution
→ uncertain
```

This can lead to a more precise research question.

---

# 47. Replication and clinical utility

Prediction should eventually connect to:

```text
Clinical decision
```

For example:

```text
Prediction
    ↓
Risk stratification
    ↓
Treatment planning
    ↓
Clinical decision
```

A model can have statistically useful prediction without improving decisions.

Clinical utility may require additional analysis such as:

- Decision-curve analysis
- Threshold analysis
- Net benefit
- Cost-benefit evaluation

where appropriate.

---

# 48. Replication versus clinical implementation

These are different stages.

```text
Discovery
    ↓
Internal validation
    ↓
Replication
    ↓
External validation
    ↓
Clinical utility
    ↓
Prospective implementation
```

A replicated model is not automatically ready for clinical deployment.

---

# 49. Prospective replication

An especially strong design is:

```text
Define model
      ↓
Freeze model
      ↓
Recruit future patients
      ↓
Collect baseline data
      ↓
Generate predictions
      ↓
Wait for outcome
      ↓
Evaluate predictions
```

This reduces opportunities for retrospective optimisation.

---

# 50. Clinical neuroscience replication checklist

```text
[ ] Clinical population is clearly defined
[ ] Original scientific claim is explicit
[ ] Prediction target is prespecified
[ ] Outcome timing is preserved
[ ] Outcome definition is equivalent
[ ] Independent patients are used
[ ] Site differences are documented
[ ] Scanner differences are documented
[ ] Neuroimaging preprocessing is specified
[ ] Data leakage is prevented
[ ] Feature selection is nested appropriately
[ ] Missing-data handling avoids leakage
[ ] Primary metric is prespecified
[ ] Confidence intervals are reported
[ ] Baseline clinical model is included
[ ] Incremental value is assessed
[ ] Calibration is assessed when appropriate
[ ] Clinical significance is considered
[ ] Distribution shift is examined
[ ] Treatment differences are considered
[ ] Model updating is distinguished from validation
[ ] Exploratory analyses are labelled
[ ] Mechanistic claims are separated from predictive claims
[ ] Clinical utility is not assumed from prediction alone
[ ] Generalisation claims match the validation design
```

---

# 51. Recommended workflow

```text
ORIGINAL PROGNOSTIC CLAIM
          ↓
DEFINE CLINICAL POPULATION
          ↓
DEFINE PREDICTION TARGET
          ↓
DEFINE OUTCOME + TIMEPOINT
          ↓
IDENTIFY ESSENTIAL PREDICTORS
          ↓
FREEZE MODEL / ANALYSIS PLAN
          ↓
COLLECT INDEPENDENT COHORT
          ↓
CHECK DATA QUALITY
          ↓
PREVENT DATA LEAKAGE
          ↓
RUN FROZEN MODEL
          ↓
EVALUATE PERFORMANCE
          ↓
COMPARE WITH BASELINE
          ↓
ASSESS CALIBRATION
          ↓
CHECK DISTRIBUTION SHIFT
          ↓
INVESTIGATE DISCREPANCIES
          ↓
ASSESS CLINICAL SIGNIFICANCE
          ↓
UPDATE CONFIDENCE
```

---

# 52. Key lessons

The most important lessons for clinical neuroscience replication are:

```text
1. Define the clinical claim precisely.

2. Distinguish prediction from treatment-response prediction.

3. Use genuinely independent patients.

4. Preserve the outcome and timepoint.

5. Treat site and scanner differences as meaningful.

6. Prevent data leakage at every stage.

7. Compare complex models against sensible clinical baselines.

8. Report multiple clinically meaningful performance measures.

9. Distinguish statistical prediction from clinical utility.

10. Investigate distribution shift.

11. Separate predictive evidence from mechanistic interpretation.

12. Treat external validation as evidence about transportability.

13. Do not interpret model failure as automatic evidence
   against the underlying biological relationship.

14. Use replication failures to identify model and
   biological boundary conditions.
```

---

# Final principle

Clinical neuroscience replication must answer two separate questions:

```text
DOES THE RELATIONSHIP REPLICATE?
              ↓
DOES IT GENERALISE TO NEW PATIENTS?
```

A strong clinical replication therefore moves beyond:

```text
Same model
+
new dataset
```

toward:

```text
SAME CLINICAL CLAIM
        ↓
INDEPENDENT PATIENTS
        ↓
INDEPENDENT MEASUREMENTS
        ↓
FROZEN ANALYSIS
        ↓
NO DATA LEAKAGE
        ↓
EXTERNAL VALIDATION
        ↓
CLINICAL INTERPRETATION
```

> **In clinical neuroscience, a replication is valuable not merely because a statistical association reappears, but because it shows whether the finding remains useful when applied to new patients, measurements, clinical settings, and sources of biological variation.**
