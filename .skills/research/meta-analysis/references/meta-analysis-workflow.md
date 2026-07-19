# Meta-Analysis Workflow

A practical guide to conducting a meta-analysis from research question through final interpretation.

The central principle is:

> **A meta-analysis is a sequence of decisions. Each decision can affect the final estimate, so the workflow should be planned, documented, and justified before interpreting the pooled result.**

---

## Define the Target Effect
Before collecting studies, determine what effect you actually want to estimate.

Examples:

```text
Average treatment effect
Association between two variables
Diagnostic accuracy
Risk ratio
Change over time
Prediction performance
```

For example:

```text
Question:
Does treatment improve language ability?

Target effect:
Difference in post-treatment language performance
between treatment and control groups.
```

This decision determines which effect sizes are appropriate later.

---

## Build the Extraction Table
A practical extraction table might contain:

| Field        | Example             |
| ------------ | ------------------- |
| Study        | Smith 2025          |
| N            | 84                  |
| Design       | RCT                 |
| Population   | Adults with aphasia |
| Intervention | Speech therapy      |
| Comparator   | Usual care          |
| Outcome      | Naming score        |
| Time         | 3 months            |
| Effect       | SMD                 |
| Estimate     | 0.42                |
| SE           | 0.11                |
| Risk of bias | Some concerns       |

Keep raw information separate from calculated quantities.

---

## Choose the Effect Size
Common choices include:

```text
Mean Difference
Standardised Mean Difference
Risk Ratio
Odds Ratio
Hazard Ratio
Correlation
Fisher's z
Regression coefficient
```

The choice depends on the outcome and study design.

If all studies use the same measurement scale:

```text
Mean Difference
```

may be appropriate.

If studies use different scales measuring the same construct:

```text
Standardised Mean Difference
```

may be more appropriate.

---

## Sensitivity Analysis
Test whether the main conclusion depends on particular decisions.

Examples:

```text
All studies
      ↓
Remove high-risk studies
      ↓
Remove influential study
      ↓
Alternative model
      ↓
Alternative outcome rule
```

Compare the resulting estimates.

---

## Leave-One-Out Analysis
A simple influence analysis is:

```text
All studies → pooled estimate

Remove Study 1 → estimate

Remove Study 2 → estimate

Remove Study 3 → estimate

...
```

If removing one study dramatically changes the conclusion, report this.

---

## Risk-of-Bias Sensitivity Analysis
Suppose:

```text
All studies:
SMD = 0.40

Low-risk studies only:
SMD = 0.18
```

This changes the interpretation.

The apparent overall effect may be partly driven by studies with greater methodological concerns.

Risk of bias should therefore influence the final conclusion.

---

## Write the Conclusion
A calibrated conclusion should contain:

```text
Average effect
+
Uncertainty
+
Consistency
+
Evidence quality
+
Important limitations
```

For example:

> Across the included studies, the intervention was associated with a small-to-moderate improvement in the target outcome. Effects varied between studies, and uncertainty remains regarding generalisability because most evidence came from single-centre samples.

This is stronger scientifically than:

> The intervention works.

---
