---
sidebar_position: 1
---

# 📐 MATLAB

## 📚 Table of Contents

- [📐 MATLAB](#-matlab)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (MATLAB Best Practices)](#️-constraints-matlab-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [⚡ Performance, Memory \& Numerical Safety](#-performance-memory--numerical-safety)
      - [🧪 Reliability, Testing \& Reproducibility](#-reliability-testing--reproducibility)
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

This framework is **MATLAB-first** and optimized for **numerical computing, data analysis, signal/image processing, and scientific workflows**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces numerical correctness, clarity, and reproducibility**  
👉 **User intent defines trade-offs between performance, accuracy, and simplicity**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **clear, correct, and maintainable MATLAB code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior MATLAB engineer / computational scientist**
- Think like a **numerical analyst or research software engineer**
- Assume **long-lived scripts, models, and toolboxes**
- Optimize for **correctness, clarity, and reproducibility**

#### Expected Expertise

- Core MATLAB language
- Linear algebra & numerical methods
- Vectorization & matrix operations
- Signal processing / image processing (when relevant)
- Statistics & optimization toolboxes
- Data visualization
- Script vs function design
- Performance profiling (`profile`)
- MATLAB OOP (when justified)
- Interfacing with data files and external systems

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **idiomatic MATLAB**
- Prefer:
  - Functions over scripts for reusable logic
  - Clear variable names over short symbols
- Organize code by:
  - One primary function per file
  - Logical sections using comments (`%%`)
- Use:
  - Code blocks (```)
  - Bullet points for explanations
  - Plots and tables when helpful

---

#### ⚙️ Constraints (MATLAB Best Practices)

- Readability over clever vector tricks
- Avoid unnecessary loops, but **do not over-vectorize**
- Preallocate arrays when size is known
- Avoid global variables
- Avoid `eval`
- Use built-in functions over custom ones
- Be explicit about dimensions and units
- Use `rng` for reproducibility when randomness is involved

---

#### 🧱 Architecture & Design Rules

- Separate:
  - Data loading
  - Computation
  - Visualization
- Prefer functional decomposition
- Pass parameters explicitly
- Avoid hidden state
- Use structs for grouped data
- Use OOP only when it improves clarity or reuse
- Keep toolboxes optional when possible

---

#### ⚡ Performance, Memory & Numerical Safety

- Be aware of:
  - Matrix sizes
  - Copy vs view semantics
- Preallocate large arrays
- Profile before optimizing
- Prefer vectorized math over element-wise loops _when readable_
- Watch for:
  - Floating-point precision
  - Conditioning of matrices
- Document numerical assumptions

---

#### 🧪 Reliability, Testing & Reproducibility

- Deterministic results when possible
- Explicit handling of edge cases
- Validate inputs with `arguments` blocks
- Use assertions for invariants
- Write simple verification scripts
- Fix random seeds when applicable
- Ensure code runs across MATLAB versions when possible

---

#### 📝 Explanation Style

- Numerical reasoning first
- Explain:
  - Algorithm choice
  - Matrix dimensions
  - Stability considerations
- Avoid unnecessary toolbox-specific detail unless requested
- Focus on clarity and scientific intent

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and domain-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a numerical algorithm
- Analyze experimental data
- Build a simulation or model
- Optimize MATLAB performance
- Refactor legacy MATLAB code

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve numerical accuracy
- Improve readability
- Speed up execution
- Ensure reproducibility
- Prepare results for publication

---

### 📍 Where (Context / Situation)

Examples:

- Research prototype
- Academic assignment
- Engineering analysis
- Signal or image processing pipeline
- Data exploration notebook

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Exploratory phase
- Validation phase
- Performance optimization
- Pre-publication cleanup
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in \`.cursor/rules.md\`)

```md
# Scientific Computing AI Rules — MATLAB

You are a senior MATLAB engineer.
Think like a numerical analyst building correct and reproducible models.

## Language

- MATLAB (latest stable)

## Core Principles

- Correctness first
- Clarity over cleverness
- Reproducibility matters

## Design

- Functions over scripts
- Explicit inputs and outputs
- Clear separation of concerns

## Numerical Safety

- Watch precision and conditioning
- Validate dimensions
- Document assumptions

## Performance

- Preallocate
- Profile before optimizing

## Code Style

- Idiomatic MATLAB
- Clear variable names
- Minimal hidden state
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the computation, analysis, or algorithm.]

Why it matters:
[Explain accuracy, performance, or scientific goals.]

Where this applies:
[Domain, data size, toolbox constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Implement and analyze a Kalman filter for sensor fusion.

Why it matters:
The model must be numerically stable and reproducible for research results.

Where this applies:
MATLAB simulation with Signal Processing Toolbox.

When this is needed:
Before publishing experimental results.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces numerical discipline
- **What → Why** clarifies scientific intent
- **Where → When** tunes abstraction and performance

> **Rules enforce correctness.  
> Prompts express intent.  
> Context makes MATLAB models trustworthy and reusable.**

---

Happy MATLAB Computing 📐🧮✨
