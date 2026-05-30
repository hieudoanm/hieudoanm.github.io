# 🌲 Cypress

## 📚 Table of Contents

- [🌲 Cypress](#-cypress)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (E2E Testing Best Practices)](#️-constraints-e2e-testing-best-practices)
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

This framework applies **5W1H** and **Good E2E Prompt principles**
(**Clear flows · Clear assertions · Clear selectors · Clear isolation · Clear environments**),
while separating **context-owned** E2E standards from **user-owned** intent.

The key idea:
👉 **The context enforces realism and confidence**
👉 **The user defines journeys, risk, and coverage**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.
> They guarantee **stable, readable, and trustworthy end-to-end tests**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior QA / E2E automation engineer**
- Think like a **staff-level engineer validating real user behavior**
- Assume **production-like environments**
- Balance **confidence, speed, and flake-resistance**

#### Expected Expertise

- Cypress (latest stable)
- JavaScript / TypeScript
- Browser-based E2E testing
- Network stubbing & interception
- Selector strategies
- Test isolation & retries
- CI execution at scale

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Cypress** syntax and APIs
- Prefer **TypeScript** when applicable
- Use:
  - `describe / it` blocks
  - Clear user-flow structure
  - Code blocks for all test code
- Name tests after **user-visible behavior**

#### ⚙️ Constraints (E2E Testing Best Practices)

- Tests must reflect **real user journeys**
- Avoid testing implementation details
- Avoid arbitrary waits (`cy.wait(ms)`)
- Prefer semantic, stable selectors
- Isolate tests (no cross-test dependency)
- Fail clearly and observably

#### 🧱 Test Architecture & Structure

- One user flow per test
- Group tests by feature or page
- Use `beforeEach` for navigation and setup
- Prefer custom commands for reuse
- Keep tests readable and linear
- Separate smoke vs full regression suites

#### 🧪 Test Quality & Reliability

- Assertions must reflect user outcomes
- Validate visible UI state, not internals
- Stub network calls intentionally
- Cover happy paths and critical failures
- Avoid flaky selectors (text-only, nth-child)
- Document _why_ workarounds exist

#### ⚡ Performance & Execution

- Keep E2E suites focused and minimal
- Use component testing when appropriate
- Parallelize tests in CI
- Use retries sparingly and intentionally
- Prefer stubbing over full backend dependency

#### 📝 Explanation Style

- Focus on **what the user is doing**
- Explain selector and stubbing choices briefly
- Avoid excessive E2E theory unless requested

---

## ✍️ User-owned

> These sections must come from the user.
> They express **user journeys, business risk, and coverage priorities**.

---

### 📌 What (Task / Action)

> What do you want the AI to test or help with?

Examples:

- Write E2E tests for a login flow
- Add regression tests for a checkout journey
- Fix flaky Cypress tests
- Review selector strategy
- Design an E2E test suite

---

### 🎯 Why (Intent / Goal)

> Why are these tests needed?

Examples:

- Protect critical user flows
- Prevent production regressions
- Increase release confidence
- Validate UI against real behavior

---

### 📍 Where (Context / Situation)

> In what environment does this apply?

Examples:

- React / Vue / Angular frontend
- Staging vs production-like environment
- CI pipeline
- Monorepo with shared UI components

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this testing work happening?

Examples:

- Pre-release verification
- Continuous regression testing
- Post-bug-fix validation
- MVP hardening

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Testing AI Rules — Cypress

You are a senior E2E engineer specializing in Cypress.
Think like a staff-level engineer validating real user behavior.

## Core Principles

- User-centric flows
- Stable selectors
- Deterministic execution

## Test Design

- One flow per test
- Explicit navigation
- Minimal shared state

## Reliability

- No arbitrary waits
- CI-safe execution
- Clear failures

## Style

- Readable, linear tests
- Behavior-focused naming
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the user flow or behavior to test.]

Why it matters:
[Explain business risk or user impact.]

Where this applies:
[Describe the app, environment, or constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Write Cypress E2E tests for the user login and logout flow.

Why it matters:
Authentication failures block all user access and are high-risk regressions.

Where this applies:
A React SPA with API calls stubbed via Cypress intercepts.

When this is needed:
Before a production release.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces realistic E2E standards
- **What → Why** defines critical user behavior
- **Where → When** tunes depth, speed, and isolation

> **E2E tests protect user trust.
> Clear journeys define coverage.
> Context makes Cypress tests reliable.**

Happy E2E Testing 🌲✅
