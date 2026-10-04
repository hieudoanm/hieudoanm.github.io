# Example: Psychology Paper

## Scenario

A behavioural psychology paper contains:

- Reaction-time experiments
- Multiple experimental conditions
- Participant demographics
- Questionnaire measures
- ANOVA tables
- Effect sizes
- Descriptive statistics

The goal is to convert the PDF into Markdown while preserving experimental structure and statistical meaning.

---

## 1. Original PDF Structure

A typical paper might contain:

```text
Title
Authors

Abstract

1. Introduction

2. Method
   2.1 Participants
   2.2 Materials
   2.3 Procedure
   2.4 Design
   2.5 Analysis

3. Results
   3.1 Reaction Time
   3.2 Accuracy
   3.3 Questionnaire Results

4. Discussion

References
```

The PDF may contain tables embedded between paragraphs or split across pages.

---

## 2. Participant Information

Suppose the PDF states:

> Sixty participants (32 female, 28 male; mean age = 21.4 years, SD = 2.8) took part in the experiment.

Preserve the information:

```markdown
Sixty participants (32 female, 28 male; mean age = 21.4 years,
SD = 2.8) took part in the experiment.
```

Do not convert this into:

```markdown
Participants were young adults.
```

That loses information.

---

## 3. Experimental Conditions

Suppose the experiment contains:

```text
Congruent
Incongruent
Neutral
```

These condition labels should remain consistent throughout the document.

For example:

```markdown
Participants completed three conditions:

1. Congruent
2. Incongruent
3. Neutral
```

Do not rename them during conversion.

---

## 4. Reaction-Time Results

Suppose the PDF states:

> Participants responded more rapidly in the congruent condition (M = 512 ms, SD = 71) than in the incongruent condition (M = 547 ms, SD = 76), t(59) = 3.12, p = .003.

Preserve the result:

```markdown
Participants responded more rapidly in the congruent condition
($M=512$ ms, $SD=71$) than in the incongruent condition
($M=547$ ms, $SD=76$), $t(59)=3.12$, $p=.003$.
```

Do not convert milliseconds into seconds unless explicitly required.

---

## 5. Statistical Tables

Suppose the PDF contains:

| Condition   | Mean RT |  SD |
| ----------- | ------: | --: |
| Congruent   |     512 |  71 |
| Incongruent |     547 |  76 |
| Neutral     |     528 |  73 |

Represent the table directly:

```markdown
| Condition   | Mean RT (ms) |  SD |
| ----------- | -----------: | --: |
| Congruent   |          512 |  71 |
| Incongruent |          547 |  76 |
| Neutral     |          528 |  73 |
```

Preserve:

- row labels
- column labels
- units
- decimal precision
- missing values
- statistical symbols

---

## 6. ANOVA Results

Suppose the PDF contains:

> There was a significant main effect of condition, F(2, 118) = 8.42, p < .001, η²p = .13.

Represent it as:

```markdown
There was a significant main effect of condition,
$F(2,118)=8.42$, $p<.001$, $\eta_p^2=.13$.
```

Do not remove the degrees of freedom or effect size.

---

## 7. Questionnaire Measures

Suppose participants completed a 7-point anxiety scale.

The conversion should preserve:

```markdown
Participants completed the State Anxiety Scale
using a 7-point response scale.
```

If the PDF identifies a particular questionnaire, preserve its exact name.

Do not replace:

> State-Trait Anxiety Inventory

with:

> anxiety questionnaire

because the latter loses methodological information.

---

## 8. Psychology-Specific Quality Control

Check:

### Reaction times

Verify:

- milliseconds vs seconds
- mean vs median
- excluded trials
- minimum/maximum thresholds
- correct condition labels

### Accuracy

Preserve:

```text
91.4%
```

as distinct from:

```text
0.914
```

unless the original explicitly uses the latter.

### Participant counts

Distinguish:

```text
N = 60 participants
```

from:

```text
3,600 trials
```

### Experimental conditions

Ensure condition labels remain identical throughout:

```text
Congruent
Incongruent
Neutral
```

### Scale names

Preserve exact questionnaire names and scoring conventions.

### Reverse-scored items

If the paper describes reverse scoring, preserve that information.

### ANOVA statistics

Verify:

- F value
- numerator df
- denominator df
- p-value
- effect size

### Effect sizes

Check symbols such as:

```text
d
η²
η²p
ω²
```

---

## 9. Common Failure

An extraction may produce:

```text
M = 512, SD = 71
```

without units.

If the PDF states milliseconds, the Markdown should retain:

```text
$M=512$ ms, $SD=71$ ms
```

Otherwise, a downstream reader may incorrectly interpret the values as seconds.

---

## 10. Final Validation

For psychology papers, compare the Markdown against the PDF for:

- participant N
- demographic information
- experimental conditions
- reaction-time units
- accuracy percentages
- exclusion criteria
- trial counts
- questionnaire names
- scale ranges
- ANOVA degrees of freedom
- p-values
- effect sizes
- table values
- figure captions
- references

### Final principle

> Preserve the experimental design and statistical details exactly enough that another researcher could reconstruct what participants did and what was measured from the Markdown alone.
