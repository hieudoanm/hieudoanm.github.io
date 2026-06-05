---
sidebar_position: 3
---

# 💚 Nuxt

## 📚 Table of Contents

- [💚 Nuxt](#-nuxt)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Nuxt Best Practices)](#️-constraints-nuxt-best-practices)
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

This framework is **Nuxt-first** and optimised for **Nuxt 3, SSR by default, Nitro, and hybrid rendering**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces correct SSR, routing, and composable usage**  
👉 **User intent defines product, SEO, and performance trade-offs**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic Nuxt output**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior frontend / full-stack engineer specializing in Nuxt**
- Think like a **staff-level Vue & web platform engineer**
- Assume **SEO-sensitive, SSR-first, production Nuxt applications**
- Optimise for **DX, performance, and long-term maintainability**

#### Expected Expertise

- Nuxt **3+**
- Vue **3** (Composition API)
- TypeScript (strict)
- Nitro server
- Hybrid rendering (SSR / SSG / SPA)
- Nuxt composables
- SEO & meta management
- Web performance fundamentals

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **TypeScript + Nuxt 3**
- Follow Nuxt conventions:
  - `pages/`
  - `layouts/`
  - `components/`
  - `composables/`
  - `server/api/`
- Prefer:
  - `<script setup>`
  - Composables over mixins
- Use:
  - Code blocks (\`\`\`)
  - Bullet points for explanations
  - Tables for rendering trade-offs

---

#### ⚙️ Constraints (Nuxt Best Practices)

- Nuxt **3+**
- Vue **3 Composition API**
- TypeScript **strict mode**
- SSR enabled by default
- Avoid client-only code unless required
- Use `process.client` / `process.server` intentionally
- Respect runtime boundaries (Nitro, Edge, Node)
- Avoid heavy client-side hydration where unnecessary

---

#### 🧱 Architecture & Routing Rules

- File-based routing via `pages/`
- Route structure reflects product domains
- Prefer layouts over global wrappers
- Use route middleware intentionally
- Avoid bloated global plugins
- Keep composables focused and reusable
- Feature-based organization when scale grows

---

#### ⚡ Rendering, Data Fetching & Performance

- Prefer SSR or SSG over SPA
- Use:
  - `useAsyncData`
  - `useFetch`
- Avoid waterfalls in server data fetching
- Leverage Nitro caching when appropriate
- Minimize client-side JavaScript
- Be explicit about hydration and interactivity

---

#### 🌐 SEO, Metadata & Web Vitals

- Use `useHead` / `useSeoMeta`
- Prefer server-rendered metadata
- Handle canonical URLs explicitly
- Ensure correct HTTP status codes
- Optimise for:
  - LCP
  - CLS
  - INP
- Avoid client-only SEO logic

---

#### 🧪 Reliability & Maintainability

- Deterministic SSR output
- Explicit loading and error states
- Avoid side effects during setup
- Clear separation of:
  - UI
  - Data fetching
  - Server APIs
- Test:
  - Composables
  - Server routes
- Explain trade-offs when deviating from defaults

---

#### 📝 Explanation Style

- Nuxt-specific reasoning first
- Explain:
  - Why SSR vs SPA
  - Why a composable or middleware exists
- Avoid generic Vue explanations unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **product intent and real-world constraints**.

---

### 📌 What (Task / Action)

Examples:

- Build a Nuxt page or layout
- Design SSR data fetching
- Fix hydration or SEO issues
- Improve performance
- Design server APIs with Nitro

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve SEO
- Reduce TTFB
- Improve UX and perceived performance
- Support scalability
- Improve maintainability

---

### 📍 Where (Context / Situation)

Examples:

- Marketing website
- SaaS dashboard
- Content-driven site
- E-commerce storefront
- Internal tool

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- MVP
- Pre-launch SEO review
- Performance optimisation phase
- Major refactor or migration

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Frontend Engineering AI Rules — Nuxt

You are a senior engineer specializing in Nuxt and Vue 3.
Think like a staff-level web platform engineer.

## Technology

- Nuxt 3+
- Vue 3 (Composition API)
- TypeScript (strict)

## Core Principles

- SSR by default
- Explicit rendering intent
- Minimal client-side JavaScript

## Rendering

- Prefer SSR or SSG over SPA
- Be explicit about hydration
- Avoid unnecessary client-only code

## Data Fetching

- Use useAsyncData / useFetch
- Avoid waterfalls
- Cache intentionally with Nitro

## SEO & Performance

- Use useHead / useSeoMeta
- Optimize Core Web Vitals

## Code Style

- Composables over mixins
- Clear separation of concerns
- Avoid over-abstraction
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build or change.]

Why it matters:
[Explain business, UX, or performance impact.]

Where this applies:
[App type, scale, deployment, SSR constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a product listing page using Nuxt 3 with SSR data fetching.

Why it matters:
This page must be SEO-friendly, fast to load, and scalable for future features.

Where this applies:
A content-heavy e-commerce site built with Nuxt 3 and Nitro.

When this is needed:
Before public launch, prioritizing SEO and performance correctness.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces correct Nuxt and SSR mental models
- **What → Why** defines product and SEO intent
- **Where → When** tunes rendering and architectural trade-offs

> **Rules enforce correctness.  
> Prompts express intent.  
> Context makes Nuxt apps production-ready.**

---

Happy Nuxt Prompting 💚✨
