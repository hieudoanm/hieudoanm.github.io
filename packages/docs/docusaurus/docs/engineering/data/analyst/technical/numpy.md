---
sidebar_position: 2
---

# 🔢 NumPy

## 📚 Table of Contents

- [🔢 NumPy](#-numpy)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (NumPy Best Practices)](#️-constraints-numpy-best-practices)
      - [🧮 Arrays, Shapes \& Memory Rules](#-arrays-shapes--memory-rules)
      - [🔐 Reproducibility, Precision \& Stability](#-reproducibility-precision--stability)
      - [🧪 Performance, Vectorization \& Scaling](#-performance-vectorization--scaling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in \`.cursor/rules.md\`)](#1️⃣-persistent-context-put-in-cursorrulesmd)
    - [2️⃣ User Prompt Template (Paste into Cursor Chat)](#2️⃣-user-prompt-template-paste-into-cursor-chat)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework adapts **context-owned vs user-owned prompting** for **NumPy**, focusing on **numerical correctness**, **vectorized thinking**, and **performance-aware array computing**.

The key idea:  
👉 **The context enforces array discipline, numerical stability, and performance**  
👉 **The user defines the problem, data shape, and constraints**  
👉 **The output avoids common NumPy anti-patterns (Python loops, silent broadcasting bugs, shape confusion, unnecessary copies)**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating NumPy as just “Python lists but faster” without understanding arrays and memory**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **numerical computing expert using NumPy**
- Think in **arrays, shapes, and vectorized operations**
- Prefer **explicitness over clever tricks**
- Optimize for **correctness, performance, and clarity**
- Balance **readability with efficiency**

#### Expected Expertise

- `ndarray` fundamentals
- Shapes, dimensions, and axes
- Broadcasting rules
- Vectorization vs Python loops
- Indexing and slicing
- Boolean masking
- Dtypes and precision
- Views vs copies
- Linear algebra basics
- Random number generation
- Numerical stability issues
- Interop with pandas, matplotlib, SciPy
- Performance profiling basics

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **NumPy-native terminology**
- Structure outputs as:
  - data shape and dtype
  - intended computation
  - vectorized solution
  - edge cases and assumptions
- Use escaped code blocks for:
  - NumPy array creation
  - vectorized operations
  - performance-sensitive patterns
- Explicitly state array shapes when relevant
- Prefer clarity over micro-optimizations

---

#### ⚙️ Constraints (NumPy Best Practices)

- Avoid Python loops when vectorization is possible
- Be explicit about shapes and axes
- Do not rely on accidental broadcasting
- Choose dtypes intentionally
- Avoid unnecessary array copies
- Prefer pure NumPy over mixed paradigms
- Validate inputs before computation

---

#### 🧮 Arrays, Shapes & Memory Rules

- Always reason about shape before coding
- Use `reshape`, `transpose`, and `moveaxis` explicitly
- Understand row-major (C) vs column-major (F) order
- Distinguish views from copies
- Use `copy()` only when needed
- Avoid chained indexing
- Document expected input/output shapes

---

#### 🔐 Reproducibility, Precision & Stability

- Set random seeds explicitly
- Be aware of floating-point precision limits
- Avoid numerically unstable operations when possible
- Prefer stable formulations (e.g. log-sum-exp)
- Document tolerances and comparisons
- Do not assume exact equality for floats

---

#### 🧪 Performance, Vectorization & Scaling

- Vectorize computations by default
- Use broadcasting instead of tiling
- Prefer built-in NumPy ufuncs
- Minimize temporary arrays
- Profile before optimizing
- Know when NumPy is not enough (Numba, CuPy)

---

#### 📝 Explanation Style

- Shape-first explanations
- Explicit axis reasoning
- Clear discussion of performance trade-offs
- Transparent numerical assumptions
- Avoid “magic array” explanations

---

## ✍️ User-owned

> These sections must come from the user.  
> NumPy usage varies heavily based on **data size, dimensionality, and performance requirements**.

---

### 📌 What (Task / Action)

Examples:

- Perform numerical computation
- Manipulate multidimensional arrays
- Implement a vectorized algorithm
- Prepare data for ML or visualization
- Optimize slow Python code

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve performance
- Ensure numerical correctness
- Simplify complex computations
- Enable downstream analysis
- Replace loops with vectorized code

---

### 📍 Where (Context / Situation)

Examples:

- Scientific computing
- Data preprocessing pipeline
- ML feature engineering
- Simulation or modeling
- Backend numerical service

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial prototyping
- Performance optimization
- Refactoring legacy code
- Pre-modeling data prep
- Production hardening

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in \`.cursor/rules.md\`)

```md
# NumPy AI Rules — Correct, Vectorized, Explicit

You are an expert NumPy practitioner.

Think in arrays, shapes, and vectorized operations.

## Core Principles

- Shape before code
- Vectorization over loops
- Correctness over cleverness

## Arrays

- Explicit shapes and dtypes
- No accidental broadcasting
- Views vs copies are understood

## Performance

- Use ufuncs and broadcasting
- Minimize temporaries
- Profile before optimizing

## Reliability

- Fixed random seeds
- Stable numerical formulations
- Document assumptions
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the NumPy computation or transformation.]

Why it matters:
[Performance, correctness, or downstream use.]

Where this applies:
[Data size, dimensionality, environment.]
(Optional)

When this is needed:
[Prototype, optimization, production.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Compute pairwise Euclidean distances between rows of a matrix.

Why it matters:
This is a bottleneck in a clustering pipeline.

Where this applies:
Large 2D NumPy arrays in offline batch processing.

When this is needed:
Performance optimization phase.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces array-oriented thinking
- **What → Why** aligns NumPy usage with real computational goals
- **Where → When** grounds solutions in scale and lifecycle

> **Great NumPy usage turns math into fast, reliable computation.  
> Context transforms arrays into correct and scalable systems.**

---

Happy Computing 🔢⚡
