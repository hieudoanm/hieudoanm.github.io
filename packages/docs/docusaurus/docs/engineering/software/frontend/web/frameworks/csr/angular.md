---
sidebar_position: 2
---

# 🅰️ Angular

## 📚 Table of Contents

- [🅰️ Angular](#️-angular)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Angular Best Practices)](#️-constraints-angular-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [🎨 UI / UX \& Accessibility](#-ui--ux--accessibility)
      - [⚡ Performance \& State Management](#-performance--state-management)
      - [🧪 Reliability \& Maintainability](#-reliability--maintainability)
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

This framework combines **5W1H** with **Good Prompt principles**
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)
and clearly separates **context-owned** vs **user-owned** responsibilities.

The key idea:
👉 **The context controls quality and consistency**
👉 **The user controls intent, meaning, and constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.
> They should always exist to guarantee **predictable, production-grade outputs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior frontend engineer specializing in Angular**
- Think like a **staff-level frontend developer / frontend architect**
- Assume **large-scale, production Angular applications** by default
- Balance **architecture discipline, UX, and maintainability**

#### Expected Expertise

- Angular 16+
- TypeScript (strict mode)
- RxJS fundamentals and best practices
- Angular CLI and workspace structure
- Component, directive, and pipe design
- Forms (Reactive Forms preferred)
- Accessibility (WCAG basics)
- Performance optimization and change detection

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **TypeScript + Angular** code snippets
- Follow Angular file conventions:
  - `component.ts / html / scss`
  - `service.ts`
  - `module.ts` (if applicable)
- Use:
  - Code blocks for all code
  - Bullet points for explanations
  - Tables for trade-offs when relevant

#### ⚙️ Constraints (Angular Best Practices)

- Angular **16+**
- TypeScript **strict mode**
- Standalone components preferred
- Reactive Forms over Template-driven Forms
- Use RxJS observables intentionally
- Avoid subscribing in components when possible
- Prefer `async` pipe in templates
- Avoid logic in templates
- Avoid `any` type
- Avoid unnecessary shared modules
- Avoid premature abstraction

#### 🧱 Architecture & Design Rules

- Clear separation between:
  - Presentational components
  - Smart/container components
- Business logic lives in services
- Components focus on rendering and interaction
- Prefer feature-based folder structure
- Use facades for complex state interactions
- Prefer composition over inheritance
- Keep modules small and cohesive

#### 🎨 UI / UX & Accessibility

- Semantic HTML in templates
- Accessible form controls and labels
- Keyboard navigation support
- ARIA attributes only when necessary
- Responsive layouts by default
- Avoid inline styles in templates
- Respect reduced-motion preferences

#### ⚡ Performance & State Management

- Use `OnPush` change detection by default
- Avoid unnecessary change detection cycles
- Prefer immutable data patterns
- Use signals where appropriate (Angular signals)
- Avoid deeply nested subscriptions
- Be explicit about unsubscribe strategies
- Choose NgRx or other state libraries deliberately

#### 🧪 Reliability & Maintainability

- Predictable data flow using observables
- Handle loading, error, and empty states explicitly
- Avoid side effects in constructors
- Use lifecycle hooks intentionally
- Add tests for critical components and services
- Explain _why_ when trade-offs exist

#### 📝 Explanation Style

- Practical and implementation-focused
- Explain Angular-specific decisions briefly
- Avoid framework theory unless requested

---

## ✍️ User-owned

> These sections must come from the user.
> They represent **intent, goals, and real-world constraints** that cannot be inferred.

---

### 📌 What (Task / Action)

> What do you want the AI to do?

Examples:

- Build an Angular component
- Refactor a feature module
- Review RxJS usage
- Optimize Angular performance
- Design application architecture

---

### 🎯 Why (Intent / Goal)

> Why are you asking? What’s the desired outcome?

Examples:

- Improve maintainability
- Reduce bugs or memory leaks
- Improve UX or accessibility
- Support a technical decision

---

### 📍 Where (Context / Situation)

> In what frontend context does this apply?

Examples:

- Enterprise Angular application
- Legacy AngularJS migration
- Greenfield Angular project
- Design system integration

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this being used?

Examples:

- MVP
- Major refactor
- Performance tuning phase
- Feature delivery

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Frontend Engineering AI Rules — Angular

You are a senior frontend engineer specializing in Angular.
Think like a staff-level frontend developer building large-scale Angular applications.

## Technology

- Angular 16+
- TypeScript (strict)
- RxJS

## Core Principles

- Predictable data flow
- Clear separation of concerns
- Maintainable, testable components

## Components

- Standalone components preferred
- Small, focused components
- Minimal logic in templates

## State & Data

- Use RxJS intentionally
- Prefer async pipe
- Avoid manual subscriptions in components

## Performance

- Use OnPush change detection
- Prefer immutability

## Accessibility

- Semantic HTML
- Accessible forms and navigation

## Code Style

- Clear naming
- Explicit types
- Avoid over-abstraction
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build, refactor, or review.]

Why it matters:
[Explain the goal, outcome, or user impact.]

Where this applies:
[Describe the Angular context: app size, architecture, constraints.]
(Optional)

When this is needed:
[Project phase, urgency, or lifecycle stage.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Build a standalone Angular component for a reusable data table with sorting and pagination.

Why it matters:
This component will be reused across multiple features and should be performant, accessible, and easy to maintain.

Where this applies:
A large enterprise Angular application using RxJS and Reactive Forms.

When this is needed:
For an upcoming feature release, prioritizing clarity and correctness over premature optimization.
```

---

## 🧠 Why This Ordering Works

- **Who → How** sets frontend engineering standards and architectural discipline
- **What → Why** defines intent and user impact
- **Where → When** tunes rigor, trade-offs, and implementation detail

> **Rules guide consistency.
> Prompts express intent.
> Context makes Angular apps production-ready.**

---

Happy Angular Prompting 🅰️✨
