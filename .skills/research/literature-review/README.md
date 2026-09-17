# Literature Review

An agent skill for conducting rigorous literature reviews by finding,
evaluating, comparing, and synthesizing research evidence.

## Purpose

A literature review should answer:

> What do we currently know?

> How strong is the evidence?

> Where does the evidence agree or disagree?

> What do we still not know?

> What research gaps remain?

The skill focuses on **synthesis**, rather than producing a collection
of independent paper summaries.

## Core Workflow

```text
Research Question
       ↓
Scope
       ↓
Search Strategy
       ↓
Literature Collection
       ↓
Screening
       ↓
Evidence Extraction
       ↓
Critical Appraisal
       ↓
Thematic Synthesis
       ↓
Compare / Contrast
       ↓
Consensus & Disagreement
       ↓
Research Gaps
       ↓
Narrative Synthesis
       ↓
Conclusion
```

## Structure

```text
literature-review/
├── SKILL.md
├── README.md
├── assets/
│   ├── decision-record.md
│   ├── starter-template.md
│   ├── validation-plan.md
│   └── workflow-checklist.md
├── references/
│   ├── review-types.md
│   ├── synthesis.md
│   ├── critical-appraisal.md
│   └── search-strategy.md
└── examples/
    ├── neuroscience.md
    ├── machine-learning.md
    ├── psychology.md
    └── stroke-rehabilitation.md
```

## Related skills and workflow

The research workflow is an adaptable route, not a mandatory sequence. Select only the stages the question needs:

```text
paper-reading ──> systematic-review ──┐
                                      ├─> literature-review ──> research-gap ──> study-design-protocol
paper-reading ────────────────────────┘              │
                                                      └─> meta-analysis (only when estimates are comparable)
```

Use [systematic-review](../systematic-review/SKILL.md) when the task requires protocol-driven, reproducible search and study selection. This skill remains the broader guide to synthesizing and interpreting a body of evidence; the routes can be combined. For same-data computational work use [research-reproduction](../research-reproduction/SKILL.md); to test a finding with new evidence use [research-replication](../research-replication/SKILL.md). See the repository's [research workflow](../../../.agents/workflows/researching/research.md) for routing and completion criteria.

## Design Principles

### 1. Synthesize, Don't Summarize

Weak:

> Paper A found X. Paper B found Y. Paper C found Z.

Better:

> Across studies, evidence generally supports X, although results vary
> depending on methodology and population.

### 2. Evidence Before Claims

Claims should be supported by appropriate evidence.

### 3. Compare Studies

Differences between findings should be investigated rather than simply
reported as contradictions.

### 4. Preserve Uncertainty

The strength of the conclusion should reflect the strength of the evidence.

### 5. Identify Specific Gaps

Avoid vague statements such as:

> More research is needed.

Instead, identify exactly what is missing and why it matters.

## Success Criteria

A strong literature review should allow a reader to understand:

- The current state of knowledge.
- The major themes in the literature.
- The strongest evidence.
- Important methodological differences.
- Areas of agreement.
- Areas of disagreement.
- Important limitations.
- Specific research gaps.
- Logical directions for future research.

## References

- [Reference materials](references/)
- [Examples](examples)

## Assets

- [Supporting assets (4)](assets)
