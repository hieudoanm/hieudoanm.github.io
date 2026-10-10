# Example: Psychology Paper

## Original PDF Structure
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

## Reaction-Time Results
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

## Statistical Tables
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

## ANOVA Results
Suppose the PDF contains:

> There was a significant main effect of condition, F(2, 118) = 8.42, p < .001, η²p = .13.

Represent it as:

```markdown
There was a significant main effect of condition,
$F(2,118)=8.42$, $p<.001$, $\eta_p^2=.13$.
```

Do not remove the degrees of freedom or effect size.

---

## Questionnaire Measures
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

## Common Failure
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

## Final Validation
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
