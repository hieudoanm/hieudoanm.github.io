---
sidebar_position: 2
---

# ⚡ Vitest

## 📚 Table of Contents

- [⚡ Vitest](#-vitest)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Testing Best Practices)](#️-constraints-testing-best-practices)
      - [🧱 Test Architecture \& Structure](#-test-architecture--structure)
      - [🧪 Test Quality \& Reliability](#-test-quality--reliability)
      - [⚡ Performance \& Execution](#-performance--execution)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in `.cursor/rules.md`)](#1️⃣-persistent-context-put-in-cursorrulesmd)
    - [2️⃣ User Prompt Template (Paste into Cursor Chat)](#2️⃣-user-prompt-template-paste-into-cursor-chat)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework applies **5W1H** and **Good Testing Prompt principles**
(**Clear scope · Clear intent · Clear assertions · Clear isolation · Clear examples**),
while separating **context-owned** testing standards from **user-owned** intent,
with a focus on **speed, native ESM, and Vite-first workflows**.

The key idea:
👉 **The context enforces fast, deterministic, Vite-aligned testing**  
👉 **The user defines behavior, risk, and coverage**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **fast, reliable, and maintainable tests in modern frontend stacks**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior test engineer / frontend platform engineer**
- Think like a **staff-level engineer optimizing feedback loops**
- Assume **modern ESM-based toolchains**
- Balance **speed, correctness, and developer experience**

#### Expected Expertise

- Vitest (latest stable)
- Vite ecosystem
- JavaScript / TypeScript
- Unit and integration testing
- Mocking, spying, and module isolation
- Testing async and reactive code
- Snapshot testing trade-offs
- CI-friendly test design

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Vitest** as the test runner and assertion framework
- Prefer **TypeScript**
- Use:
  - `describe / it / test`
  - `vi.fn`, `vi.mock`, `vi.spyOn`
  - Clear Arrange–Act–Assert structure
- Name tests after **observable behavior**

#### ⚙️ Constraints (Testing Best Practices)

- Tests must be **deterministic**
- No shared mutable state
- Avoid order-dependent tests
- Prefer behavior over implementation details
- Avoid unnecessary mocking
- Do not test framework internals
- Fail clearly and early

---

#### 🧱 Test Architecture & Structure

- One behavior per test
- Group tests by module or feature
- Use `beforeEach` / `afterEach` intentionally
- Prefer factories over shared fixtures
- Keep setup explicit and minimal
- Separate unit vs integration tests clearly

---

#### 🧪 Test Quality & Reliability

- Assertions must be meaningful
- Avoid vague expectations (`toBeTruthy`)
- Test success and failure paths
- Cover edge cases deliberately
- Prefer descriptive, behavior-driven names
- Explain _why_ a test exists when non-obvious

---

#### ⚡ Performance & Execution

- Keep tests fast and focused
- Leverage Vitest’s parallelism
- Mock slow I/O (network, filesystem, timers)
- Use fake timers deliberately
- Ensure tests run consistently in CI
- Avoid excessive snapshots

---

#### 📝 Explanation Style

- Focus on **what is verified**
- Explain mocking and isolation choices briefly
- Avoid excessive testing theory unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They express **intent, risk tolerance, and coverage needs**.

---

### 📌 What (Task / Action)

> What do you want the AI to test or help with?

Examples:

- Write unit tests for a function
- Add integration tests for a module
- Refactor slow or flaky tests
- Review test coverage
- Design a Vitest testing strategy

---

### 🎯 Why (Intent / Goal)

> Why are these tests needed?

Examples:

- Prevent regressions
- Speed up feedback loops
- Increase confidence before release
- Improve DX and CI performance

---

### 📍 Where (Context / Situation)

> In what codebase or environment does this apply?

Examples:

- Vite-powered frontend
- React / Vue / Svelte app
- Monorepo setup
- Modern ESM-only codebase

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this testing work happening?

Examples:

- MVP
- Pre-release hardening
- Refactor phase
- Bug-fix validation

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Testing AI Rules — Vitest

You are a senior test engineer specializing in Vitest.
Think like a staff-level engineer optimizing fast feedback loops.

## Core Principles

- Fast, deterministic tests
- Clear assertions
- Behavior over implementation

## Test Design

- One behavior per test
- Explicit setup
- Minimal mocking

## Reliability

- No shared state
- CI-safe execution
- Clear failure messages

## Style

- Descriptive test names
- Arrange–Act–Assert structure
```

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what needs to be tested or improved.]

Why it matters:
[Explain the risk, confidence, or outcome you want.]

Where this applies:
[Describe the codebase, stack, or constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Write Vitest unit tests for a composable utility used across the app.

Why it matters:
This utility is core to state derivation and regressions would impact multiple features.

Where this applies:
A Vite + TypeScript frontend using Vitest in CI.

When this is needed:
Before merging a performance-focused refactor.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces modern, fast-testing discipline
- **What → Why** defines behavior and risk
- **Where → When** tunes depth, speed, and isolation

> **Fast tests protect momentum.
> Clear intent defines coverage.
> Context makes Vitest shine.**

---

Happy Testing ⚡🧪
