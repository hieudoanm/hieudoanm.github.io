# Psychology Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in psychology.

The example uses a hypothetical study investigating whether a brief working-memory training intervention improves cognitive performance.

The purpose is to illustrate the reasoning process rather than reproduce a specific published study.

---

## Research question
Suppose an original study asks:

> Does working-memory training improve performance on tasks that were not directly trained?

The original researchers report that participants receiving working-memory training perform better on an untrained working-memory task than a control group.

The replication should begin with the scientific claim:

```text
Working-memory training produces a measurable
improvement on an independent cognitive outcome.
```

Not:

```text
Run the same experiment and obtain p < .05.
```

---

## Identify the target effect
Before collecting new data, define:

```text
Population:
Healthy adults

Intervention:
Working-memory training

Comparator:
Active control

Primary outcome:
Untrained working-memory performance

Target effect:
Training > control
```

This prevents the replication from drifting toward a different outcome after data are observed.

---

## Strong evidence against the original claim
Suppose:

```text
Replication:
g = 0.02
95% CI [-0.04, 0.08]
```

and:

```text
SESOI = 0.20
```

If an equivalence test supports the conclusion that the effect is smaller than the SESOI, the replication provides stronger evidence that the original claimed effect may not be practically important.

---

## A replication can improve the original design
Suppose the original study had:

```text
N = 30
Passive control
One outcome
No preregistration
```

The replication may use:

```text
N = 200
Active control
Prespecified primary outcome
Preregistration
Better measurement
```

This is not a flaw.

A replication can preserve the scientific question while improving methodological quality.

---

## Replication result matrix
A useful summary is:

| Dimension       | Original    | Replication | Assessment |
| --------------- | ----------- | ----------- | ---------- |
| Population      | Adults      | Adults      | Similar    |
| Intervention    | WM training | WM training | Same       |
| Control         | Active      | Active      | Same       |
| Duration        | 4 weeks     | 4 weeks     | Same       |
| Primary outcome | WM task     | WM task     | Same       |
| Sample          | N=80        | N=200       | Larger     |
| Effect          | g=.35       | g=.22       | Smaller    |
| Direction       | Positive    | Positive    | Consistent |
| Precision       | Moderate    | Higher      | Improved   |

---

## Overall interpretation
A reasonable conclusion might be:

> The replication found a positive effect of working-memory training on the prespecified untrained working-memory outcome. The estimated effect was smaller than in the original study but remained compatible with a small beneficial effect. Given the independent sample, active control condition, and improved precision, the findings provide broadly consistent evidence for a modest near-transfer effect, while providing no direct evidence for far transfer to unrelated cognitive abilities.

This is stronger than:

> The study successfully replicated the original result.

The first statement tells the reader what actually survived replication.

---

## Recommended replication workflow
```text
Original claim
      ↓
Define psychological construct
      ↓
Define target effect
      ↓
Identify essential design components
      ↓
Choose replication type
      ↓
Define SESOI
      ↓
Power the study
      ↓
Preregister
      ↓
Collect independent data
      ↓
Validate intervention
      ↓
Run primary analysis
      ↓
Estimate effect + uncertainty
      ↓
Compare with original
      ↓
Investigate discrepancies
      ↓
Assess generalisability
      ↓
Update confidence
```

---
