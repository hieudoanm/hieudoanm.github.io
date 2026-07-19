# Neuroscience Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in neuroscience.

The example focuses on a hypothetical study investigating whether neural activity contains information about speech meaning.

The goal is not to reproduce a specific published paper. Instead, it illustrates how the `research-replication` skill can be applied to a realistic neuroscience problem.

---

## Research question
Suppose an original study asks:

> Can patterns of human brain activity be used to decode the semantic content of spoken language?

The original study reports that neural activity contains information that distinguishes different semantic categories.

The replication should begin with the scientific claim:

```text
Speech meaning is represented in measurable patterns
of neural activity.
```

Not:

```text
Run the same analysis again.
```

---

## Direct replication design
A high-fidelity replication might use:

```text
Original:
MEG
30 participants
Spoken sentences
Semantic categories
Classification
Accuracy

Replication:
MEG
New participants
Spoken sentences
Same semantic categories
Same classification target
Accuracy
```

The important point is:

```text
NEW PARTICIPANTS
+
SAME SCIENTIFIC QUESTION
```

---

## Functional interpretation
Suppose the original study finds:

```text
Left temporal cortex
```

associated with semantic decoding.

A replication should not automatically conclude:

> This proves that the left temporal cortex stores semantic representations.

The result may instead indicate:

```text
Activity patterns in the region contain information
associated with the semantic manipulation.
```

Replication should preserve appropriate inferential strength.

---

## Null result
Suppose instead:

```text
Replication:
Accuracy = 51%
95% CI [48%, 54%]
```

If the SESOI is:

```text
55%
```

the result provides evidence against a practically meaningful decoding effect.

This is stronger than simply saying:

```text
p > .05
```

---

## Contradictory result
Suppose:

```text
Original:
Semantic decoding > chance

Replication:
Semantic decoding reliably below
the predicted pattern
```

Investigate:

```text
Stimulus differences
Participant differences
Measurement differences
Preprocessing
Analysis
Task engagement
Language proficiency
Model mismatch
```

Only after these checks should the replication be interpreted as evidence against the original claim.

---

## Replication result table
A useful final table is:

| Dimension  | Original         | Replication           | Assessment |
| ---------- | ---------------- | --------------------- | ---------- |
| Population | Adults           | Adults                | Similar    |
| Language   | English          | English               | Same       |
| Modality   | MEG              | MEG                   | Same       |
| Task       | Speech listening | Speech listening      | Same       |
| Stimuli    | Sentences        | Matched sentences     | Similar    |
| Analysis   | Decoding         | Prespecified decoding | Similar    |
| Outcome    | Accuracy         | Accuracy              | Same       |
| Effect     | 72%              | 69%                   | Compatible |
| Precision  | Moderate         | Higher                | Improved   |

---

## Overall interpretation
A strong interpretation might be:

> The replication produced above-chance semantic decoding with an effect magnitude broadly comparable to the original study. Although the replication estimate was somewhat smaller, the results were compatible within their uncertainty. Given the high methodological fidelity and independent participant sample, the findings increase confidence that the original semantic decoding effect is robust under similar experimental conditions.

Notice what this does **not** say:

```text
The original study was proven true.
```

It says:

```text
Confidence increased.
```

---
