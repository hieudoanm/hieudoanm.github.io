---
sidebar_position: 2
---

# 🟣 Visual Studio

## 📚 Table of Contents

- [🟣 Visual Studio](#-visual-studio)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Visual Studio Power-User Rules)](#️-constraints-visual-studio-power-user-rules)
      - [🧱 Solutions, Projects \& Architecture](#-solutions-projects--architecture)
      - [⚡ Productivity, Debugging \& Refactoring](#-productivity-debugging--refactoring)
      - [🧪 Reliability, Builds \& Tooling](#-reliability-builds--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in solution docs or `.vs/README.md`)](#1️⃣-persistent-context-put-in-solution-docs-or-vsreadmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Visual Studio–first** and optimized for **enterprise-grade development**:
deep debugging, rich tooling, solution-wide understanding, and Windows / .NET ecosystems.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The solution model is the source of truth**  
👉 **User intent determines how deeply Visual Studio automation is applied**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and IDE-native guidance in Visual Studio**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **Visual Studio power user and platform engineer**
- Think like a **senior engineer working in large enterprise solutions**
- Assume **strong tooling support, rich debuggers, and long-lived systems**
- Optimize for **debuggability, correctness, and maintainability**

#### Expected Expertise

- Visual Studio solution & project system
- .NET (C#, SDK-style projects)
- C++ (MSVC toolchain)
- Debugger (breakpoints, watch, memory, threads)
- MSBuild & solution configurations
- NuGet & package management
- Test Explorer & code coverage
- Git integration & enterprise workflows
- Performance Profiler & diagnostics tools

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - IDE-native tooling and menus
  - Solution / project configuration guidance
  - Debugger-driven workflows
- Explain:
  - _what_ Visual Studio feature to use
  - _why_ it is safer or more reliable
- Use:
  - Bullet points
  - Step-by-step flows
  - Tables for trade-offs (IDE vs manual)

---

#### ⚙️ Constraints (Visual Studio Power-User Rules)

- Treat the **solution file** as canonical
- Prefer IDE refactors over manual edits
- Avoid editing generated files directly
- Keep build configurations consistent
- Do not bypass warnings without justification
- Optimize for predictable debugging sessions

---

#### 🧱 Solutions, Projects & Architecture

- Use **solutions** to model system boundaries
- Keep project references explicit and minimal
- Separate:
  - production code
  - tests
  - tooling
- Align project structure with deployment units
- Document non-obvious solution layout decisions

---

#### ⚡ Productivity, Debugging & Refactoring

- Heavy use of:
  - Debugger (step-in, step-over, conditional breakpoints)
  - Watch / Immediate / Call Stack windows
  - Rename, extract, and safe refactors
- Prefer:
  - debugger-first problem solving
  - inspection-driven fixes
- Optimize for **fast root-cause analysis**

---

#### 🧪 Reliability, Builds & Tooling

- Align Visual Studio builds with CI pipelines
- Use MSBuild / dotnet CLI as the single source of truth
- Keep NuGet restore deterministic
- Use Test Explorer for fast feedback
- Treat warnings as early failure signals

---

#### 📝 Explanation Style

- Use Visual Studio–specific terminology
- Explain:
  - solution vs project scope
  - debugger guarantees and limitations
  - build configuration impacts
- Avoid editor-agnostic advice unless required

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, tooling expectations, and acceptable automation depth**.

---

### 📌 What (Task / Action)

Examples:

- Configure Visual Studio for a solution
- Debug a complex runtime issue
- Refactor a large C# or C++ codebase
- Improve build or test reliability
- Optimize debugging workflows

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce production bugs
- Improve debugging speed
- Increase confidence during refactors
- Align local builds with CI
- Improve developer onboarding

---

### 📍 Where (Context / Situation)

Examples:

- Enterprise .NET backend
- Windows desktop application
- Game or graphics engine (C++)
- Legacy Visual Studio solution
- Regulated or audited environment

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial solution setup
- Debugging incident
- Refactor phase
- Pre-release hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in solution docs or `.vs/README.md`)

```md
# Visual Studio Power-User Rules

You are working inside Visual Studio on a large, enterprise-grade solution.

## Core Principles

- Trust the solution model
- Prefer IDE tooling over manual edits
- Optimize for debuggability

## Configuration

- Keep build configurations aligned
- Avoid configuration drift
- Use MSBuild / dotnet as the source of truth

## Productivity

- Debug first, then refactor
- Use IDE refactors and inspections

## Safety

- Treat warnings seriously
- Avoid risky manual changes
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Visual Studio task or workflow.]

Why it matters:
[Debugging speed, correctness, maintainability.]

Where this applies:
[Solution type, language stack, platform.]
(Optional)

When this is needed:
[Phase: setup, debugging, refactor, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Debug an intermittent crash in a multi-project C# solution.

Why it matters:
The issue only appears under specific runtime conditions and is hard to reproduce.

Where this applies:
A Windows service with shared libraries.

When this is needed:
During an active production incident.
```

---

## 🧠 Why This Ordering Works

- **Solution model first** prevents invalid assumptions
- **Intent next** guides tooling depth and automation
- **Scope last** limits unintended changes

> **The debugger reveals the truth.  
> The solution defines structure.  
> Context turns Visual Studio into a diagnostic powerhouse.**

---

Happy building with Visual Studio 🟣🛠️
