# Research Poster Structure

## Purpose

A research poster presents a scientific project in a compact visual format.

Its structure should allow a viewer to move quickly from:

**Research problem → Research question → Method → Evidence → Finding → Interpretation**

The poster should communicate the central research story without requiring the viewer to read every element.

---

## 1. The Poster as a Visual Argument

A research poster is a visual argument rather than a miniature research paper.

A useful conceptual structure is:

```text
Problem
  ↓
Why does it matter?
  ↓
Research question
  ↓
How was it investigated?
  ↓
What was found?
  ↓
What does it mean?
  ↓
What should the viewer remember?
```

Every major section should contribute to this argument.

If a section does not help answer one of these questions, consider removing it.

---

## 2. Recommended High-Level Structure

A general scientific poster can use:

```text
┌──────────────────────────────────────────────┐
│ TITLE                                        │
│ Authors · Affiliations                       │
├────────────────┬───────────────┬─────────────┤
│ BACKGROUND     │ METHODS       │ RESULTS     │
│                │               │             │
│ QUESTION       │ DESIGN        │ MAIN FIGURE │
│                │               │             │
│ HYPOTHESIS     │ ANALYSIS      │ KEY RESULT  │
├────────────────┼───────────────┼─────────────┤
│ DISCUSSION     │ LIMITATIONS   │ CONCLUSION  │
│                │               │             │
├────────────────┴───────────────┴─────────────┤
│ REFERENCES · CONTACT · QR CODE               │
└──────────────────────────────────────────────┘
```

This is a starting point, not a mandatory template.

The layout should adapt to the research.

---

## 3. Title

The title is the first thing the viewer sees.

A good title should communicate:

- Topic
- Main variables or phenomenon
- Population or context where relevant
- Study type where useful

### Good

> Age-related Changes in Children's Speech Complexity

### Less effective

> An Investigation of Some Factors Associated With Language Development

The second title is vague and does not communicate the research clearly.

---

## 4. Authors and Affiliations

Place author names close to the title.

Include:

- Author names
- Institution
- Department or school
- Research group where relevant

Logos may be included, but they should not dominate the research content.

If contact information is useful, place it in the footer or a dedicated contact area.

---

## 5. Background

The Background should establish why the research matters.

Keep it short.

A useful structure is:

```text
Known
  ↓
Unknown
  ↓
Why the unknown matters
```

Avoid reproducing the entire literature review.

The viewer should understand the scientific motivation in a few sentences.

---

## 6. Research Question

The research question deserves strong visual emphasis.

For example:

> **How does speech complexity change with age in typically developing children?**

The viewer should be able to find the research question without searching through paragraphs.

---

## 7. Hypothesis

Include a hypothesis when the study has a testable prediction.

For example:

> **Hypothesis:** Older children will produce more complex speech than younger children.

For exploratory research, use an objective or research question instead of inventing a hypothesis.

---

## 8. Methods

Methods should answer:

**How was the research conducted?**

Include only information necessary to understand the evidence.

Potential components include:

- Participants
- Dataset
- Materials
- Experimental design
- Procedure
- Measurements
- Preprocessing
- Statistical analysis

Use diagrams where possible.

For example:

```text
Participants
     ↓
Task
     ↓
Data acquisition
     ↓
Preprocessing
     ↓
Analysis
```

A visual pipeline often communicates the procedure more effectively than a paragraph.

---

## 9. Participants

If participants are central to the research, provide a compact summary.

Useful information may include:

- Sample size
- Age range
- Groups
- Relevant demographics
- Inclusion criteria

Example:

> **N = 361 children**  
> Age: 4–9 years  
> Typically developing participants

Do not include demographic information that is irrelevant to the research question merely because it is available.

---

## 10. Dataset

For computational or secondary-data research, describe:

- Dataset name
- Source
- Number of observations
- Relevant variables
- Data collection context

A compact dataset card can be effective:

```text
DATASET

ENNI
361 children
Age: 4–9 years
Narrative language samples
```

The source should be cited appropriately.

---

## 11. Experimental Design

Represent experimental designs visually when possible.

For example:

```text
Condition A
    ↓
Task
    ↓
Response

Condition B
    ↓
Task
    ↓
Response
```

For within-subject designs, show the repeated-measures structure.

For between-group designs, show the groups.

For longitudinal research, show the measurement timeline.

---

## 12. Analysis Pipeline

Computational and neuroscience projects often benefit from a visual analysis pipeline.

Example:

```text
Raw data
   ↓
Quality control
   ↓
Preprocessing
   ↓
Feature extraction
   ↓
Statistical model
   ↓
Evaluation
   ↓
Interpretation
```

The pipeline should show the actual analysis performed.

Do not include hypothetical processing steps.

---

## 13. Results

Results should occupy a prominent portion of the poster.

The viewer should be able to identify the main result quickly.

Prioritise:

1. Primary finding
2. Primary figure
3. Key statistics
4. Secondary findings

A poster should not give equal space to every result from the project.

---

## 14. Main Figure

The main figure should communicate the most important empirical result.

Possible examples include:

- Scatter plot
- Group comparison
- Time series
- Brain activation map
- Connectivity plot
- Decoding accuracy
- Model comparison
- Behavioural performance
- Experimental timeline

Ask:

> If the viewer sees only one figure, which figure should they see?

That figure should usually receive the most visual emphasis.

---

## 15. Statistical Results

Include enough statistical information to support the claim.

Depending on the analysis, this might include:

- Effect estimate
- Effect size
- Confidence interval
- p-value
- Test statistic
- Model performance
- Permutation result

Avoid filling the poster with complete statistical output.

Highlight the information needed to evaluate the main conclusion.

---

## 16. Discussion

The Discussion should explain what the findings mean.

It can answer:

- What does the main result suggest?
- Is it consistent with previous research?
- What alternative explanations exist?
- What are the implications?

Keep it concise.

A useful structure is:

```text
Finding
  ↓
Interpretation
  ↓
Context
  ↓
Implication
```

---

## 17. Limitations

Include important limitations, but avoid turning the poster into a list of generic caveats.

A useful format is:

| Limitation                | Consequence                                |
| ------------------------- | ------------------------------------------ |
| Cross-sectional data      | Cannot establish within-person development |
| Limited sample            | Generalisability may be restricted         |
| Single complexity measure | May not capture all aspects of language    |

The important part is explaining **why the limitation matters**.

---

## 18. Conclusion

The conclusion should answer the research question directly.

A useful format is:

> **Key finding:** Speech complexity was positively associated with age.

Then:

> **Interpretation:** The finding is consistent with increasing linguistic complexity during childhood.

Keep the conclusion short.

The viewer should be able to remember it after leaving the poster.

---

## 19. Key Takeaway

Consider adding a visually prominent takeaway box.

For example:

> ### KEY TAKEAWAY
>
> Older children produced more complex speech, supporting an age-related increase in linguistic complexity.

This should summarise the evidence rather than introduce a stronger claim.

---

## 20. References

Posters usually need fewer references than papers.

Include the references most important for:

- Theoretical background
- Dataset
- Method
- Major interpretation

Use a consistent citation style.

Avoid shrinking the references until they become unreadable.

If many references are necessary, consider using a QR code linking to the complete reference list.

---

## 21. QR Codes and Supplementary Material

A QR code can link to:

- GitHub repository
- Full paper
- Supplementary materials
- Dataset
- Analysis code
- Project website
- Contact page

A QR code should supplement the poster, not replace essential information.

The main scientific argument should remain understandable without scanning it.

---

## 22. Poster Reading Levels

Design the poster for three reading depths.

### Level 1 — 5 seconds

The viewer should see:

- Title
- Topic
- Main finding

### Level 2 — 30 seconds

The viewer should understand:

- Research question
- Methods
- Main result
- Conclusion

### Level 3 — 3 minutes

The viewer can inspect:

- Detailed methods
- Figures
- Statistics
- Limitations
- References

This layered structure prevents the poster from becoming either too sparse or too dense.

---

## 23. Information Density

When the poster contains too much content, do not immediately reduce the font size.

Instead:

1. Remove repetition.
2. Remove low-value background.
3. Shorten sentences.
4. Convert prose to bullets.
5. Convert procedures into diagrams.
6. Combine related information.
7. Remove secondary findings.
8. Keep the main evidence prominent.

The goal is **information compression without scientific distortion**.

---

## 24. Section Ordering

The exact ordering can vary.

### Experimental poster

```text
Background
→ Question
→ Methods
→ Results
→ Discussion
→ Conclusion
```

### Computational poster

```text
Problem
→ Dataset
→ Pipeline
→ Model
→ Results
→ Interpretation
→ Conclusion
```

### Neuroimaging poster

```text
Background
→ Hypothesis
→ Participants
→ Acquisition
→ Preprocessing
→ Analysis
→ Brain results
→ Interpretation
→ Conclusion
```

### Systematic review

```text
Background
→ Research question
→ Search strategy
→ Study selection
→ Included studies
→ Synthesis
→ Findings
→ Limitations
→ Conclusion
```

Choose the structure that best matches the research design.

---

## 25. Final Structural Checklist

Before finalising the poster, check:

### Research story

- [ ] Is the problem clear?
- [ ] Is the research question obvious?
- [ ] Is the method understandable?
- [ ] Is the main result prominent?
- [ ] Is the interpretation justified?
- [ ] Is the conclusion directly connected to the question?

### Content

- [ ] Is unnecessary information removed?
- [ ] Are important quantitative results included?
- [ ] Are figures scientifically accurate?
- [ ] Are limitations meaningful?
- [ ] Are important sources cited?

### Visual structure

- [ ] Can the poster be understood from its visual hierarchy?
- [ ] Does the eye naturally move from question to evidence to conclusion?
- [ ] Is the main figure visually prominent?
- [ ] Is supporting information visually subordinate?

---

## Core Principle

**A poster should tell one coherent scientific story.**

The viewer should be able to move naturally from:

**Why does this matter? → What did you ask? → How did you test it? → What did you find? → What does it mean?**
