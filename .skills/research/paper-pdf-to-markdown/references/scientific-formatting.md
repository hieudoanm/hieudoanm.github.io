# Scientific Formatting

## Purpose

Preserve scientific notation when converting papers from PDF to Markdown.

The highest priority is:

```text
Scientific meaning
    >
Visual similarity
    >
Formatting convenience
```

---

# 1. Mathematical Expressions

Use LaTeX for mathematical content.

Inline:

```markdown
The model assumes $y = X\beta + \epsilon$.
```

Display:

```markdown
$$
y = X\beta + \epsilon
$$
```

---

# 2. Fractions

PDF:

```text
x
─
y
```

Markdown:

```markdown
$$
\frac{x}{y}
$$
```

Do not flatten the fraction into:

```text
x y
```

---

# 3. Superscripts

Preserve:

```text
x²
R²
10⁻³
```

as:

```markdown
$x^2$
$R^2$
$10^{-3}$
```

---

# 4. Subscripts

Preserve:

```text
β₁
xᵢ
F₁
```

as:

```markdown
$\beta_1$
$x_i$
$F_1$
```

---

# 5. Greek Letters

Common examples:

```text
α → $\alpha$
β → $\beta$
γ → $\gamma$
δ → $\delta$
μ → $\mu$
σ → $\sigma$
χ → $\chi$
```

Do not confuse:

```text
α
```

with:

```text
a
```

or:

```text
μ
```

with:

```text
u
```

---

# 6. Statistical Notation

Preserve exact notation.

Examples:

```markdown
$t(42) = 2.31$
$F(2, 84) = 5.17$
$\chi^2(1) = 6.82$
$r = .42$
$d = 0.51$
$R^2 = .38$
```

---

# 7. P-values

Preserve:

```markdown
$p = .032$
$p < .001$
$p > .05$
```

Do not replace with:

```text
significant
non-significant
```

because that loses information.

---

# 8. Confidence Intervals

Preserve:

```text
95% CI [0.21, 0.64]
```

or:

```markdown
95% CI $[0.21, 0.64]$
```

Do not alter the interval boundaries.

---

# 9. Negative Signs

Distinguish:

```text
−0.42
```

from:

```text
0.42
```

A missing negative sign may reverse an effect.

---

# 10. Minus Sign versus Hyphen

These are not necessarily the same character:

```text
-
−
```

Use the mathematically appropriate representation.

For example:

```markdown
$-0.42$
```

for mathematical notation.

---

# 11. Percentages

Preserve:

```text
37.4%
```

Do not silently convert it to:

```text
0.374
```

---

# 12. Units

Preserve original units:

```text
20 ms
3 mm
2.5 T
100 Hz
5 μV
```

Do not convert units unless explicitly requested.

---

# 13. Scientific Abbreviations

If the paper defines:

```text
functional magnetic resonance imaging (fMRI)
```

preserve the definition.

Later occurrences can remain:

```text
fMRI
```

Do not introduce a new abbreviation.

---

# 14. Biological Notation

Preserve:

```text
CO₂
H₂O
Na⁺
Ca²⁺
```

using LaTeX when appropriate:

```markdown
$CO_2$
$H_2O$
$Na^+$
$Ca^{2+}$
```

---

# 15. Brain Regions

Preserve anatomical names exactly.

Examples:

```text
left inferior frontal gyrus
bilateral hippocampus
Broca's area
```

Do not expand or reinterpret abbreviations unless the source does.

---

# 16. Neuroimaging Coordinates

Preserve:

```text
x = −42, y = 18, z = 24
```

including:

- Coordinate system
- Sign
- Units
- Region label

Do not change coordinate order.

---

# 17. Frequency Bands

Preserve:

```text
δ
θ
α
β
γ
```

and associated ranges exactly.

For example:

```text
8–12 Hz
```

should not become:

```text
8-12
```

if the unit was lost during extraction.

---

# 18. Reaction Times

Preserve units:

```text
512 ms
```

not:

```text
512
```

when the original specifies milliseconds.

---

# 19. Machine-Learning Notation

Preserve:

```text
θ
xᵢ
yᵢ
pθ
L(θ)
```

For example:

```markdown
$$
L(\theta) =
-\sum_i y_i \log p_\theta(y_i \mid x_i)
$$
```

---

# 20. Matrix Notation

Preserve matrix structure.

Example:

```markdown
$$
X =
\begin{bmatrix}
x_{11} & x_{12} \\
x_{21} & x_{22}
\end{bmatrix}
$$
```

Do not flatten matrices into a sequence of numbers.

---

# 21. Statistical Symbols

Common symbols:

```text
α
β
χ²
η²
ω²
ρ
τ
λ
σ
μ
```

Check each carefully during OCR validation.

---

# 22. Tables

Preserve:

```text
Column order
Row order
Headers
Units
Decimal precision
Significance markers
```

Example:

```markdown
| Condition |    M |  SD |    p |
| --------- | ---: | --: | ---: |
| Control   | 82.4 | 9.1 | .032 |
| Treatment | 87.2 | 8.7 | .011 |
```

Do not round values unless the source does.

---

# 23. Figure Captions

Preserve all scientific notation in captions.

Captions may contain:

```text
p-values
Coordinates
Time windows
Sample sizes
Thresholds
Abbreviations
```

---

# 24. Scientific Identifiers

Be especially careful with case-sensitive identifiers:

```text
Gene names
Protein names
Model names
Dataset identifiers
DOIs
Algorithm names
```

Do not normalise capitalization without evidence.

---

# 25. Precision

Preserve reported precision.

For example:

```text
0.42
```

should not become:

```text
0.4
```

unless there is a reason to change the presentation.

Reported precision can communicate uncertainty and measurement resolution.

---

# 26. Scientific Formatting Checklist

```text
[ ] Equations
[ ] Greek letters
[ ] Superscripts
[ ] Subscripts
[ ] Negative signs
[ ] P-values
[ ] Confidence intervals
[ ] Effect sizes
[ ] Percentages
[ ] Units
[ ] Coordinates
[ ] Frequency ranges
[ ] Statistical symbols
[ ] Tables
[ ] Scientific identifiers
```

---

# Final Principle

> **When converting scientific notation, preserve meaning before appearance and verify every high-risk symbol against the source PDF.**
