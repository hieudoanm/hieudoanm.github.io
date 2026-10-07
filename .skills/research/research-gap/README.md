# Research Gap

## Purpose

The `research-gap` skill helps identify, validate, and formulate genuine research gaps from the existing literature.

It is designed for questions such as:

- What is still unknown about this topic?
- Where does the literature disagree?
- What important populations or conditions have been understudied?
- What methodological limitations remain?
- Has an apparently important gap already been addressed by recent research?
- What research question follows from the evidence?

The central principle is:

> A research gap must be demonstrated from the literature, not merely asserted.

---

## When to use this skill

Use `research-gap` when the goal is to move from:

```text
Existing literature
        ↓
Unresolved problem
        ↓
Research gap
        ↓
Research question
```

Typical tasks include:

- Finding dissertation topics
- Identifying open research questions
- Evaluating novelty of a proposed study
- Reviewing a proposed research direction
- Finding under-studied populations
- Identifying methodological limitations
- Investigating contradictory findings
- Finding replication opportunities
- Identifying missing evidence
- Developing research proposals

---

## When not to use this skill

Do not use `research-gap` as the primary skill when the task is mainly:

### Understanding one paper

Use:

```text
paper-reading
```

### Synthesising an entire body of literature

Use:

```text
literature-review
```

### Quantitatively pooling study results

Use:

```text
meta-analysis
```

### Re-running an existing paper's analysis

Use:

```text
research-reproduction
```

### Testing an existing finding with new data

Use:

```text
research-replication
```

### Converting a research PDF into structured Markdown

Use:

```text
paper-pdf-to-markdown
```

These skills can be combined when appropriate.

---

## Relationship to other research skills

A useful research workflow is:

```text
Paper PDF
   ↓
paper-pdf-to-markdown
   ↓
paper-reading
   ↓
literature-review
   ↓
research-gap
   ↓
Research Question
   ↓
research-reproduction / research-replication
   ↓
New Evidence
```

Each skill answers a different question.

| Skill                   | Main question                                                       |
| ----------------------- | ------------------------------------------------------------------- |
| `paper-pdf-to-markdown` | Can the paper be converted into a useful structured representation? |
| `paper-reading`         | What does this paper actually argue and show?                       |
| `literature-review`     | What does the body of literature collectively show?                 |
| `research-gap`          | What important problem remains unresolved?                          |
| `research-reproduction` | Can we obtain the published result again?                           |
| `research-replication`  | Does the finding hold with new evidence?                            |
| `meta-analysis`         | What is the quantitative pattern across studies?                    |

---

## Core distinction

A literature review asks:

> What do we know?

A research-gap analysis asks:

> What do we still not know, and is that uncertainty important?

For example:

```text
Literature review:
"Several studies have found that X is associated with Y."

Research-gap analysis:
"Although X is associated with Y across several studies,
it remains unclear whether the relationship is causal,
because existing studies are predominantly cross-sectional."
```

The second statement identifies the unresolved problem.

---

## Types of gaps

The skill recognises several common gap types:

```text
Knowledge
Evidence
Methodological
Population
Data
Theoretical
Replication
Integration
Application
```

These are not mutually exclusive.

A research problem may contain multiple gap types.

See:

```text
references/gap-types.md
```

for detailed definitions and examples.

---

## Important principle: gap ≠ missing paper

A common failure mode is:

> "I searched for X and found no papers, therefore X is a research gap."

This is not sufficient.

The absence of a paper from a search may result from:

- Different terminology
- Different databases
- Poor search strategy
- Different disciplinary vocabulary
- Indexing limitations
- Recent publications
- Conference papers
- Preprints
- Studies using indirect measures

A defensible gap requires broader validation.

---

## Important principle: gap ≠ future-work sentence

Research papers frequently contain statements such as:

> "Future studies should investigate X."

Treat these as **candidate gaps**.

Do not automatically accept them.

The correct process is:

```text
Future-work statement
        ↓
Search later literature
        ↓
Check whether X has already been studied
        ↓
Assess evidence
        ↓
Assess importance
        ↓
Validate gap
```

---

## Important principle: gap ≠ novelty

A study can be novel without addressing an important gap.

For example:

> "No previous study has used model X."

This is not necessarily a meaningful gap.

The better question is:

> What scientific limitation does model X address?

A strong research argument connects:

```text
Existing limitation
        ↓
Why it matters
        ↓
Why existing methods are insufficient
        ↓
How the proposed approach addresses it
```

---

## Gap validation

Every important candidate gap should be tested against recent literature.

At minimum, ask:

```text
Was the gap already addressed?
        ↓
If not, is the evidence still insufficient?
        ↓
Why does the gap matter?
        ↓
Can it realistically be investigated?
```

Recent literature is particularly important because a gap that existed several years ago may no longer exist.

---

## Good vs weak gap statements

### Weak

> There is limited research on language and the brain.

Problems:

- Too broad
- No evidence
- No defined population
- No defined method
- No clear uncertainty

### Better

> Neuroimaging studies have investigated neural responses during language processing, but relatively few studies have tested whether representations of speech meaning generalise across independently sampled participants.

This is more useful because it identifies:

- Domain
- Existing evidence
- Missing evidence
- Specific unresolved problem

### Stronger

> Existing naturalistic neuroimaging studies suggest that semantic information can be decoded from distributed neural activity. However, the extent to which these representations generalise across independently sampled participants and narrative contexts remains unclear. Resolving this issue is important for determining whether observed semantic representations reflect stable language-related structure or context-specific patterns.

This provides:

```text
Known
 ↓
Uncertainty
 ↓
Why it matters
```

---

## Research-gap analysis output

A useful analysis should normally contain:

```text
1. Scope
2. Established findings
3. Candidate gaps
4. Evidence supporting each gap
5. Recent literature validation
6. Importance
7. Feasibility
8. Best-supported gap
9. Research question
10. Remaining uncertainty
```

Do not present a gap without showing why it is supported.

---

## Confidence levels

Use qualitative confidence.

### High confidence

The gap:

- Appears across multiple relevant sources
- Survives recent literature checking
- Has a clear scientific rationale
- Is specific and testable

### Moderate confidence

The gap:

- Is supported by several observations
- But the literature is limited or inconsistent
- Or recent evidence may be changing the situation

### Preliminary

The gap:

- Is suggested by limited evidence
- Depends on a small number of studies
- Has not yet been comprehensively validated

Confidence describes the **strength of evidence for the gap**, not how interesting the topic is.

---

## Common failure modes

### 1. Searching only for "research gap"

Searching directly for the phrase `"research gap"` often returns generic review language rather than the actual structure of the evidence.

Instead, search for:

- Contradictions
- Limitations
- Under-studied populations
- Missing validation
- Unresolved mechanisms
- Inconsistent findings
- Replication evidence
- Recent reviews

### 2. Trusting one review

A review provides useful synthesis but may itself be outdated.

Use reviews to map the field, then verify important claims against primary studies and recent literature.

### 3. Treating every limitation as a gap

A limitation of one experiment does not necessarily imply a limitation of the field.

Look for patterns across studies.

### 4. Ignoring contradictory evidence

Disagreement can itself be the gap.

Do not force conflicting results into a single conclusion without investigating why they differ.

### 5. Ignoring recent papers

A gap may disappear quickly.

Always validate important gap claims against recent research.

### 6. Choosing the most novel gap

Novelty is not enough.

Prefer the gap with the strongest combination of:

```text
Evidence
+
Importance
+
Persistence
+
Feasibility
```

### 7. Jumping directly to a research question

Do not start with:

> "What experiment should I do?"

Start with:

> "What important problem remains unresolved?"

Then derive the experiment from the gap.

---

## Useful questions for an agent

When investigating a potential gap, ask:

### Evidence

- What findings are well established?
- How many independent studies support them?
- Are results consistent?

### Uncertainty

- What remains unknown?
- Which conclusions are tentative?
- Where do studies disagree?

### Methods

- Are current methods adequate?
- Do methodological limitations prevent stronger conclusions?

### Population

- Who has been studied?
- Who has not?
- Can findings reasonably generalise?

### Data

- What data are available?
- What important measurements are missing?
- Are independent datasets available?

### Replication

- Has the finding been independently reproduced or replicated?
- Does it depend on one dataset or laboratory?

### Importance

- Why does resolving the uncertainty matter?
- What would change if the question were answered?

### Feasibility

- Can the question actually be investigated?
- Are appropriate data, participants, equipment, and methods available?

---

## Final principle

A strong research gap is not:

> "Nobody has done this."

It is:

> "The existing evidence establishes A, but an important uncertainty remains about B. Existing methods or evidence are insufficient to resolve B, and resolving it matters because C."

That is the foundation for a defensible research question.
