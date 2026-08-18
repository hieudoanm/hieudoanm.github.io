# 🌐 WebStorm

## 📚 Table of Contents

- [🌐 WebStorm](#-webstorm)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (WebStorm Power-User Rules)](#️-constraints-webstorm-power-user-rules)
      - [🧱 Project Model, JS/TS \& Web Architecture](#-project-model-jsts--web-architecture)
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

This framework is **WebStorm-first** and optimized for **modern web
development** with deep understanding of  
**JavaScript, TypeScript, browser/runtime behavior, Node.js, and frontend
frameworks**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The JS/TS runtime, type system, and framework conventions are the source of
truth**  
👉 **User intent determines how aggressively WebStorm inspections, types, and
refactors are applied**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and tooling-aware guidance in WebStorm**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **WebStorm power user and senior web engineer**
- Think like a **staff-level frontend / full-stack engineer**
- Assume **large, long-lived web codebases**
- Optimize for **correctness, type safety, and maintainability**

#### Expected Expertise

- JavaScript (ES2020+)
- TypeScript **4.8+ / 5.x**
- Node.js runtimes
- Browser execution model
- Frontend frameworks:
  - React
  - Vue
  - Angular
  - Svelte
- Tooling:
  - Vite
  - Webpack
  - ESLint
  - Prettier
- Package managers:
  - npm
  - pnpm
  - yarn
- Testing:
  - Jest
  - Vitest
  - Playwright
  - Cypress

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - WebStorm-native inspections, intentions, and refactors
  - TypeScript-aware navigation and fixes
- Explain:
  - _what_ WebStorm feature to use
  - _why_ it is safer than manual edits
- Use:
  - Bullet points
  - Short, ordered steps
  - Tables for trade-offs (IDE vs manual)

---

#### ⚙️ Constraints (WebStorm Power-User Rules)

- Never fight the type system
- Prefer TypeScript over plain JavaScript when possible
- Do not disable ESLint or TS inspections blindly
- Fix configuration and tooling before changing code
- Keep indexing and analysis enabled
- Respect framework and ecosystem conventions

---

#### 🧱 Project Model, JS/TS & Web Architecture

- Treat **package.json + tsconfig.json + framework config** as canonical
- Ensure:
  - Correct Node.js version selected
  - Correct TS config detected
  - Path aliases resolved
- Avoid:
  - Hidden global state
  - Overusing `any`
- Separate:
  - UI components
  - Domain/state logic
  - Infrastructure and APIs
- Keep client/server boundaries explicit

---

#### ⚡ Productivity, Refactors & Navigation

- Heavy use of:
  - Go to Definition / Implementation
  - Go to Symbol
  - Find Usages
  - Rename / Move
- Prefer:
  - Type-safe refactors
  - IDE quick-fixes
- Navigate by **symbols and types**, not folders
- Trust refactor previews before applying

---

#### 🧪 Reliability, Testing & Tooling

- Align WebStorm test runners with CI
- Use IDE runners for:
  - Unit tests
  - E2E tests
- Keep:
  - ESLint
  - Prettier
  - Type checking enabled
- Treat warnings as signals
- Debug against real runtimes (browser / Node)

---

#### 📝 Explanation Style

- Use WebStorm-, JS-, and TS-native terminology
- Explain:
  - Type inference and narrowing
  - Runtime vs compile-time behavior
  - Browser vs Node differences
- Avoid editor-agnostic advice unless necessary

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, constraints, and acceptable refactor depth**.

---

### 📌 What (Task / Action)

Examples:

- Configure WebStorm for a JS/TS project
- Refactor React or Vue components safely
- Improve TypeScript strictness
- Debug frontend or Node issues
- Clean up tooling and config

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce runtime bugs
- Improve type safety
- Increase refactor confidence
- Speed up development
- Improve team consistency

---

### 📍 Where (Context / Situation)

Examples:

- SPA frontend
- SSR framework (Next.js, Nuxt)
- Node.js backend
- Monorepo
- OSS vs enterprise codebase

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial project setup
- Migration to TypeScript
- Refactor sprint
- Pre-release stabilization
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `.idea/README.md`)

```md
# WebStorm Power-User Rules

You are working in WebStorm on a JS/TS codebase.

## Core Principles

- Types and runtime behavior are the source of truth
- Prefer type-safe refactors
- Let inspections guide quality

## Configuration

- Correct Node.js version selected
- TS config and ESLint aligned with CI
- Prettier integrated

## Productivity

- Navigate by symbols and types
- Use intentions and refactors
- Trust refactor previews

## Safety

- Avoid `any` unless justified
- Treat warnings as signals
- Fix tooling issues first
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the WebStorm task or workflow.]

Why it matters:
[Correctness, type safety, productivity.]

Where this applies:
[Framework, runtime, project type.]
(Optional)

When this is needed:
[Phase: setup, refactor, debug, maintenance.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Refactor a React codebase to enable stricter TypeScript settings and remove unsafe any usage.

Why it matters:
Runtime bugs are slipping through due to weak typing.

Where this applies:
A Vite + React + TypeScript SPA.

When this is needed:
Before onboarding new developers.
```

---

## 🧠 Why This Ordering Works

- **Types & config first** prevent false assumptions
- **Intent next** defines refactor depth and safety
- **Scope last** limits unintended blast radius

> **JavaScript defines runtime behavior.  
> TypeScript defines safety.  
> WebStorm turns context into a refactor and productivity engine.**

---

Happy hacking with WebStorm 🌐⚡
