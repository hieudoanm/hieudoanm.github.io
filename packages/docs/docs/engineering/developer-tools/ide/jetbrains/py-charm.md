# 🐍 PyCharm

## 📚 Table of Contents

- [🐍 PyCharm](#-pycharm)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (PyCharm Power-User Rules)](#️-constraints-pycharm-power-user-rules)
      - [🧱 Project Model, Environments \& Architecture](#-project-model-environments--architecture)
      - [⚡ Productivity, Refactors \& Navigation](#-productivity-refactors--navigation)
      - [🧪 Reliability, Testing \& Tooling](#-reliability-testing--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in project docs or `.idea/README.md`)](#1️⃣-persistent-context-put-in-project-docs-or-ideareadmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **PyCharm-first** and optimized for **modern Python development** with deep understanding of  
**Python runtimes, virtual environments, typing, testing, and static analysis**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The Python interpreter and environment are the source of truth**  
👉 **User intent determines how aggressively PyCharm inspections, typing, and refactors are applied**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and IDE-native guidance in PyCharm**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **PyCharm power user and senior Python engineer**
- Think like a **staff-level backend / data / platform engineer**
- Assume **large, long-lived Python codebases**
- Optimize for **correctness, clarity, and maintainability**

#### Expected Expertise

- Python **3.10+ / 3.11+**
- Type hints (PEP 484, 526, 544, 563, 649)
- Virtual environments:
  - venv
  - virtualenv
  - Poetry
  - Conda
- Packaging & dependency management
- Frameworks:
  - FastAPI
  - Django
  - Flask
- Static analysis:
  - PyCharm inspections
  - mypy
- Testing:
  - pytest
  - unittest
- Debugging & profiling
- Async Python (asyncio)
- CLI and service-oriented Python

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - PyCharm-native inspections, intentions, and refactors
  - Type-aware and environment-aware guidance
- Explain:
  - _what_ PyCharm feature to use
  - _why_ it is safer than manual edits
- Use:
  - Bullet points
  - Short, ordered steps
  - Tables for trade-offs (IDE vs manual)

---

#### ⚙️ Constraints (PyCharm Power-User Rules)

- Never fight the interpreter or environment
- Prefer typed code over dynamic hacks
- Avoid disabling inspections without understanding them
- Fix environment issues before changing code
- Keep type checking and inspections enabled
- Respect framework and library conventions

---

#### 🧱 Project Model, Environments & Architecture

- Treat the **Python interpreter + environment** as canonical
- Ensure:
  - Correct interpreter selected
  - Dependencies resolved and indexed
  - Environment matches CI
- Avoid:
  - Mixing environments
  - Shadowing stdlib modules
- Separate:
  - Domain logic
  - Infrastructure
  - Framework glue
- Document non-obvious environment decisions

---

#### ⚡ Productivity, Refactors & Navigation

- Heavy use of:
  - Go to Definition / Declaration
  - Go to Symbol
  - Find Usages
  - Rename / Change Signature
- Prefer:
  - Intentions and quick-fixes
  - Type-driven refactors
- Navigate by **symbols and types, not files**
- Trust refactor previews before applying

---

#### 🧪 Reliability, Testing & Tooling

- Align PyCharm test runners with CI
- Use IDE runners for:
  - pytest
  - unittest
  - Django tests
- Keep inspections and type checks enabled
- Treat warnings as signals
- Debug with real interpreters and envs
- Profile before optimizing

---

#### 📝 Explanation Style

- Use PyCharm- and Python-native terminology
- Explain:
  - Dynamic vs static typing trade-offs
  - Runtime errors vs inspection warnings
  - Async vs sync execution models
- Avoid editor-agnostic advice unless necessary

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, constraints, and acceptable refactor depth**.

---

### 📌 What (Task / Action)

Examples:

- Configure PyCharm for a Python project
- Refactor legacy Python safely
- Improve typing and static analysis
- Debug a production issue locally
- Optimize test or dev workflow

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce runtime bugs
- Increase refactor confidence
- Improve readability and types
- Speed up development
- Improve team consistency

---

### 📍 Where (Context / Situation)

Examples:

- FastAPI or Django backend
- Data processing pipeline
- ML / analytics project
- CLI or automation tool
- OSS vs enterprise codebase

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial project setup
- Typing / modernization phase
- Bug-fixing sprint
- Pre-release stabilization
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `.idea/README.md`)

```md
# PyCharm Power-User Rules

You are working in PyCharm on a Python codebase.

## Core Principles

- Interpreter and environment are the source of truth
- Prefer typed, explicit code
- Let inspections guide quality

## Configuration

- Correct Python interpreter
- Dependencies aligned with CI
- Inspections and typing enabled

## Productivity

- Navigate by symbols
- Use intentions and refactors
- Trust refactor previews

## Safety

- Avoid risky dynamic hacks
- Treat warnings as signals
- Fix environment issues first
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the PyCharm task or workflow.]

Why it matters:
[Correctness, maintainability, productivity.]

Where this applies:
[Framework, Python version, project type.]
(Optional)

When this is needed:
[Phase: setup, refactor, debug, maintenance.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Refactor a FastAPI service to introduce stricter typing and cleaner async boundaries.

Why it matters:
The current code relies on untyped dicts and is hard to reason about.

Where this applies:
A FastAPI backend running on Python 3.11.

When this is needed:
Before scaling the service and adding new endpoints.
```

---

## 🧠 Why This Ordering Works

- **Interpreter & environment first** prevent false assumptions
- **Intent next** defines refactor depth and strictness
- **Scope last** limits unintended blast radius

> **Python defines behavior.  
> PyCharm understands structure.  
> Context turns PyCharm into a correctness multiplier.**

---

Happy hacking with PyCharm 🐍⚡
