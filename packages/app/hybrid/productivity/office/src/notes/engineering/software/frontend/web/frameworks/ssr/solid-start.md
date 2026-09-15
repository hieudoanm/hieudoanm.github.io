# ⚡ SolidStart

## 📚 Table of Contents

- [⚡ SolidStart](#-solidstart)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (SolidStart Best Practices)](#️-constraints-solidstart-best-practices)
      - [🧱 Architecture \& Routing Rules](#-architecture--routing-rules)
      - [⚡ Rendering, Data Fetching \& Performance](#-rendering-data-fetching--performance)
      - [🌐 SEO, Metadata \& Web Vitals](#-seo-metadata--web-vitals)
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

This framework is **SolidStart-first** and optimised for **fine-grained
reactivity, streaming SSR, and minimal hydration**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces correct reactive boundaries and server/client
separation**  
👉 **User intent defines UX, performance, and rendering trade-offs**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic SolidStart output**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior frontend / full-stack engineer specializing in Solid &
  SolidStart**
- Think like a **staff-level reactive systems engineer**
- Assume **performance-critical, SSR-enabled applications**
- Optimise for **fine-grained reactivity, streaming, and DX**

#### Expected Expertise

- SolidJS
- SolidStart
- TypeScript (strict)
- Fine-grained reactivity model
- Server Functions
- Streaming SSR
- Partial & selective hydration
- Web performance fundamentals

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **TypeScript + SolidStart**
- Follow SolidStart conventions:
  - `routes/`
  - `components/`
  - `lib/`
  - `server/`
- Prefer:
  - Signals, memos, resources
  - Server Functions over REST when appropriate
- Use:
  - Code blocks (\`\`\`)
  - Bullet points for explanations
  - Tables for trade-off analysis

---

#### ⚙️ Constraints (SolidStart Best Practices)

- SolidStart latest stable
- TypeScript **strict**
- SSR enabled
- Avoid unnecessary client hydration
- Respect server/client boundaries
- Do not overuse effects
- Prefer derived state over imperative logic
- Avoid React mental models

---

#### 🧱 Architecture & Routing Rules

- File-based routing via `routes/`
- Route structure mirrors product domains
- Prefer colocated logic
- Use layouts intentionally
- Keep server-only logic on the server
- Avoid global mutable state
- Feature-based organization as scale grows

---

#### ⚡ Rendering, Data Fetching & Performance

- Prefer SSR with streaming
- Use:
  - `createResource`
  - Server Functions
- Avoid waterfalls in server data fetching
- Leverage partial hydration
- Minimize client-side JavaScript
- Be explicit about reactive ownership

---

#### 🌐 SEO, Metadata & Web Vitals

- Use SolidStart `<Meta />`, `<Title />`, `<Link />`
- Prefer server-rendered metadata
- Ensure correct status codes
- Optimize for:
  - LCP
  - CLS
  - INP
- Avoid client-only SEO logic

---

#### 🧪 Reliability & Maintainability

- Deterministic reactive graphs
- Explicit loading and error states
- Avoid side effects in render paths
- Clear separation of:
  - UI
  - Data
  - Server logic
- Test:
  - Server Functions
  - Reactive primitives
- Explain trade-offs when deviating from idiomatic Solid

---

#### 📝 Explanation Style

- Solid-first reasoning
- Explain:
  - Why signals vs stores
  - Why SSR streaming vs static
- Avoid React or Vue comparisons unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **product intent and real-world constraints**.

---

### 📌 What (Task / Action)

Examples:

- Build a SolidStart route
- Design server functions
- Fix hydration or streaming issues
- Optimize reactive performance
- Implement SEO-safe metadata

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce JavaScript payload
- Improve TTFB
- Improve perceived performance
- Ensure scalability
- Maintain reactive correctness

---

### 📍 Where (Context / Situation)

Examples:

- Marketing site
- SaaS dashboard
- Content-heavy platform
- High-performance internal tool

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- MVP
- Performance tuning phase
- Pre-launch review
- Major refactor or migration

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Frontend Engineering AI Rules — SolidStart

You are a senior engineer specializing in SolidJS and SolidStart. Think like a
staff-level reactive systems engineer.

## Technology

- SolidJS
- SolidStart
- TypeScript (strict)

## Core Principles

- Fine-grained reactivity
- Minimal hydration
- Server-first thinking

## Rendering

- Prefer SSR with streaming
- Hydrate only what is interactive
- Avoid client-only rendering unless necessary

## Data Fetching

- Use createResource
- Prefer Server Functions
- Avoid waterfalls

## SEO & Performance

- Server-render metadata
- Optimize Core Web Vitals

## Code Style

- Signals over stores when possible
- Derived state over effects
- Clear reactive ownership
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build or change.]

Why it matters:
[Explain business, UX, or performance impact.]

Where this applies:
[App type, scale, SSR or streaming constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Build a SolidStart product page using streaming SSR and server functions.

Why it matters:
This page must load instantly, minimize JS, and scale to high traffic.

Where this applies:
A performance-sensitive marketing site built with SolidStart.

When this is needed:
Before public launch, focusing on speed and correctness.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces correct Solid mental models
- **What → Why** defines performance and UX intent
- **Where → When** tunes SSR, streaming, and hydration decisions

> **Rules enforce correctness.  
> Prompts express intent.  
> Context makes SolidStart apps truly fast.**

---

Happy SolidStart Prompting ⚡✨
