# Explanation Techniques

## 1. Core Mental Model

Start with the simplest correct model.

Ask:

> What is fundamentally happening?

Keep this mental model consistent across all four levels.

## 2. Analogy

Connect an unfamiliar concept to something familiar.

Good analogies preserve an important structural relationship.

Always remember that an analogy is not the actual mechanism.

## 3. Concrete Example

Use a specific situation before introducing abstraction.

Instead of:

> Classification maps observations to labels.

Start with:

> Given a picture, a model decides whether it contains a cat or a dog.

Then generalize.

## 4. Contrast

Explain what something is by showing what it is not.

Useful examples:

- Correlation vs causation
- Probability vs statistics
- Training vs testing
- Supervised vs unsupervised learning
- EEG vs MEG

## 5. Step-by-Step Mechanism

Describe a process as a sequence.

```text
Input
  ↓
Transformation
  ↓
Intermediate representation
  ↓
Output
```

## 6. Definition

At higher levels, provide a precise definition.

A definition should describe what makes the concept the concept.

## 7. Equation

Introduce mathematics when it adds explanatory value.

Recommended progression:

```text
Intuition
↓
Symbols
↓
Equation
↓
Interpretation
```

Never present an equation without explaining its important terms.

For Markdown and LaTeX:

Inline:

`$y = wx + b$`

Display:

```text
$$
y = wx + b
$$
```

## 8. Worked Example

Use actual values when calculation helps.

```text
x = 2
w = 3
b = 1

y = wx + b
  = 3(2) + 1
  = 7
```

## 9. Assumptions

At expert level, explicitly state important assumptions.

Examples:

- Independent observations
- Normally distributed errors
- Linear relationships
- Stationarity
- Differentiability
- Convexity

## 10. Limitations

Explain when a concept stops being useful or when an analogy breaks down.

## 11. Edge Cases

Mention unusual cases when they materially affect understanding.

Do not overload beginner explanations with edge cases.

## 12. Progressive Terminology

Introduce vocabulary gradually.

```text
Child:
"how quickly evidence builds"

Student:
"evidence accumulation"

Layperson:
"drift rate"

Expert:
"the drift parameter v in a drift-diffusion model"
```

## 13. From Intuition to Formalism

A strong explanation often follows:

```text
What is it?
↓
Why do we need it?
↓
How does it work?
↓
Example
↓
Formal definition
↓
Mathematics
↓
Applications
↓
Limitations
```

Not every concept requires every step.

## 14. Check for False Simplicity

Ask:

> Did the simplification change the meaning?

If yes, simplify differently.

The goal is **simple but correct**, not merely simple.
