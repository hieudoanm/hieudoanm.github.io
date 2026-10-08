# Example: Writing a Results Section

## Research Topic

**Topic:** Speech complexity and age in children

**Research question:** How does speech complexity change with age in typically developing children?

---

## Results

### Descriptive Statistics

The analysis included the observations that met the predefined inclusion criteria. Speech-complexity scores varied across participants, with generally higher values observed among older children.

The distribution of speech-complexity scores was examined using descriptive statistics and visualisations before conducting the main analysis.

### Relationship Between Age and Speech Complexity

A statistical model was used to estimate the relationship between age and speech complexity. The analysis showed a positive association between age and speech-complexity scores, indicating that older children tended to produce more complex speech.

The estimated effect, confidence interval, and statistical test result are reported in Table 1.

### Permutation Analysis

A permutation analysis was conducted by randomly rearranging the relationship between age and speech complexity to generate a null distribution.

The observed association was compared with this null distribution. The resulting permutation statistic indicated whether the observed relationship was more extreme than expected under the null hypothesis.

The observed statistic and corresponding permutation-based p-value are reported in Table 1.

### Summary of Findings

Overall, the analyses indicated a positive relationship between age and speech complexity in the analysed sample. The permutation analysis provided an additional assessment of whether the observed association was unlikely to have arisen under the specified null model.

---

## Example Results Table

| Analysis                |    Estimate | Uncertainty |    Statistical result |
| ----------------------- | ----------: | ----------: | --------------------: |
| Age → speech complexity |  [estimate] |    [95% CI] |             [p-value] |
| Permutation analysis    | [statistic] |           — | [permutation p-value] |

_Note: Replace bracketed values with the values produced by the actual analysis._

---

## Structure of the Results

The Results section follows:

```text
Data
  ↓
Descriptive patterns
  ↓
Primary analysis
  ↓
Additional / robustness analysis
  ↓
Direct answer to the research question
```

The order should generally follow the order established by the research question and Methods.

---

## What This Example Demonstrates

### 1. Report observations before interpretation

The Results section should tell the reader what was observed.

For example:

> Older children tended to have higher speech-complexity scores.

This reports the observed pattern.

A stronger interpretation such as:

> Language development causes speech to become more complex.

would require substantially stronger evidence and belongs, if justified, in the Discussion.

### 2. Report quantitative evidence

Where appropriate, provide:

- Sample size
- Descriptive statistics
- Effect estimates
- Confidence intervals
- Test statistics
- p-values
- Effect sizes
- Model performance
- Other relevant uncertainty measures

Avoid relying only on verbal descriptions.

### 3. Organise results around research questions

Do not simply report analyses in the order they happened during data analysis.

Organise the section so that the reader can understand how each result addresses the research question.

### 4. Use tables and figures strategically

A figure can communicate a pattern more effectively than several paragraphs of prose.

For example, a scatter plot could show:

- Age on the x-axis
- Speech complexity on the y-axis
- Individual observations
- Estimated relationship

The accompanying text should explain the important pattern rather than repeat every value visible in the figure.

---

## Results Template

A general structure is:

```text id="7o0x8c"
### Descriptive Statistics

Describe the analysed sample and important distributions.

### Primary Analysis

Report the analysis addressing the main research question.

### Secondary Analysis

Report additional analyses that address secondary questions.

### Robustness / Sensitivity Analysis

Report analyses assessing how dependent the findings are on
particular assumptions or analytical choices.

### Summary

Briefly state the main empirical findings without extended interpretation.
```

Not every study requires all of these subsections.

---

## Results vs Discussion

A useful distinction is:

| Results                                 | Discussion                               |
| --------------------------------------- | ---------------------------------------- |
| What was observed?                      | What does it mean?                       |
| What was estimated?                     | Why might it have occurred?              |
| How large was the effect?               | How does it relate to previous research? |
| How uncertain was the estimate?         | What are the implications?               |
| What did the statistical analysis show? | What conclusions are justified?          |

For example:

**Results:**

> Age was positively associated with speech-complexity scores.

**Discussion:**

> This pattern is consistent with the possibility that increasing linguistic experience contributes to more complex language production during development.

The second statement is an interpretation and therefore requires appropriate justification.

---

## Common Problems

### Over-interpreting results

> The results prove that children develop better language skills as they age.

This is too strong.

A statistical association does not by itself establish causality.

### Better

> The results showed a positive association between age and speech complexity.

---

### Reporting only significance

> The relationship was significant, p < .05.

This provides little information about the size or precision of the effect.

### Better

Report the effect estimate together with an appropriate uncertainty measure and statistical result.

---

### Repeating the table

Avoid writing every number from a table again in the surrounding prose.

Instead, highlight the main pattern and direct the reader to the table.

---

### Introducing new analyses

Do not introduce an important analysis in the Results section without having described the corresponding method.

The Methods and Results should correspond:

```text id="v8c4x2"
Methods
  ↓
What was planned / performed
  ↓
Results
  ↓
What that analysis found
```

---

## Results Quality Checklist

- [ ] Does every reported result correspond to an analysis described in Methods?
- [ ] Is the sample used in each analysis clear?
- [ ] Are descriptive statistics reported where useful?
- [ ] Are effect estimates reported?
- [ ] Is uncertainty reported?
- [ ] Are statistical tests reported appropriately?
- [ ] Are null and unexpected findings included where relevant?
- [ ] Are exploratory analyses clearly identified?
- [ ] Are tables and figures used effectively?
- [ ] Does the text avoid unnecessary repetition?
- [ ] Does the Results section avoid unsupported causal interpretation?
- [ ] Does the section directly address the research question?

---

## Key Principle

The Results section should answer:

**"What did the analysis actually find?"**

It should report the evidence clearly while leaving broader interpretation primarily to the Discussion.
