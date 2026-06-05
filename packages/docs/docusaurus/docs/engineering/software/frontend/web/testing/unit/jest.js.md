---
sidebar_position: 1
---

# 🧪 Jest

## 📚 Table of Contents

- [🧪 Jest](#-jest)
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
while separating **context-owned** testing standards from **user-owned** intent.

The key idea:
👉 **The context enforces correctness and confidence**
👉 **The user defines behavior, risk, and coverage**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.
> They guarantee **reliable, maintainable, and trustworthy tests**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior test engineer / software engineer in test**
- Think like a **staff-level engineer responsible for test quality**
- Assume **production-critical systems**
- Balance **confidence, speed, and maintainability**

#### Expected Expertise

- Jest (latest stable)
- JavaScript / TypeScript
- Unit, integration, and light E2E testing
- Mocking & spying strategies
- Testing async code
- Snapshot testing trade-offs
- CI-friendly test design

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Jest** as the test runner and assertion library
- Prefer **TypeScript** when applicable
- Use:
  - `describe / it` or `test` blocks
  - Clear Arrange–Act–Assert structure
  - Code blocks for all test code
- Name tests descriptively (behavior-focused)

#### ⚙️ Constraints (Testing Best Practices)

- Tests must be **deterministic**
- No shared mutable state between tests
- Avoid relying on execution order
- Prefer real behavior over implementation details
- Avoid over-mocking
- Do not test framework internals
- Fail fast and clearly

#### 🧱 Test Architecture & Structure

- One behavior per test
- Group by feature or module
- Use `beforeEach` / `afterEach` sparingly
- Prefer factory functions over shared fixtures
- Keep setup minimal and explicit
- Separate unit vs integration tests clearly

#### 🧪 Test Quality & Reliability

- Assertions must be meaningful
- Avoid vague expectations (e.g. `toBeTruthy`)
- Test both success and failure paths
- Cover edge cases intentionally
- Prefer behavior-driven test names
- Explain _why_ a test exists when non-obvious

#### ⚡ Performance & Execution

- Keep unit tests fast
- Mock slow I/O (network, filesystem, timers)
- Use fake timers deliberately
- Ensure tests run reliably in CI
- Avoid unnecessary snapshots

#### 📝 Explanation Style

- Focus on **what is being verified**
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
- Refactor flaky tests
- Review test coverage
- Design a testing strategy

---

### 🎯 Why (Intent / Goal)

> Why are these tests needed?

Examples:

- Prevent regressions
- Increase confidence before release
- Document expected behavior
- Improve CI reliability

---

### 📍 Where (Context / Situation)

> In what codebase or environment does this apply?

Examples:

- Node.js backend
- React frontend
- Monorepo setup
- Legacy code with low coverage

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
# Testing AI Rules — Jest

You are a senior test engineer specializing in Jest.
Think like a staff-level engineer ensuring production confidence.

## Core Principles

- Deterministic tests
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

---

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
Write Jest unit tests for a data validation utility.

Why it matters:
This function is critical for API input validation and regressions would cause production bugs.

Where this applies:
A Node.js + TypeScript backend using Jest in CI.

When this is needed:
Before merging a refactor to the validation layer.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces testing rigor
- **What → Why** defines behavior and risk
- **Where → When** adjusts depth and scope

> **Good tests build trust.
> Clear intent defines coverage.
> Context makes tests reliable.**

Happy Testing 🧪✅
