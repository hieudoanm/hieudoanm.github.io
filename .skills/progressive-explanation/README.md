# Progressive Explanation

An agent skill for explaining concepts at four progressively deeper levels.

## Levels

| Level        | Audience                | Primary goal            |
| ------------ | ----------------------- | ----------------------- |
| 🧒 Child     | Curious 5-year-old      | Intuition               |
| 🎓 Student   | Curious 15-year-old     | Foundations             |
| 👤 Layperson | Educated non-specialist | Practical understanding |
| 🔬 Expert    | PhD / specialist        | Technical rigor         |

## Why?

Different audiences need different levels of abstraction.

A child needs a concrete mental model.
A student needs vocabulary and mechanisms.
A layperson needs accurate practical understanding.
An expert needs precision, assumptions, mathematics, and limitations.

## Structure

```text
progressive-explanation/
├── SKILL.md
├── README.md
└── references/
    ├── levels.md
    ├── techniques.md
    └── examples/
        ├── mathematics/
        │   ├── linear-algreba.md
        │   └── probability.md
        ├── deep-learning.md
        ├── neural-networks.md
        ├── machine-learning.md
        └── neuroscience.md
```

## Usage

Examples:

> Explain probability at all four levels.

> Explain gradient descent from a 5-year-old to PhD level.

> Explain MEG at the four progressive levels.

## Design Principle

**Simple does not mean inaccurate.**

Every level should preserve the essential truth of the concept.
The difference is the assumed knowledge, abstraction, terminology,
mathematical formalism, and technical depth.
