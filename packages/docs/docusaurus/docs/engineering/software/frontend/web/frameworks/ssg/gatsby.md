# ⚡ Gatsby.js

## 📚 Table of Contents

- [⚡ Gatsby.js](#-gatsbyjs)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Gatsby Best Practices)](#️-constraints-gatsby-best-practices)
      - [🧱 Architecture \& Data Layer](#-architecture--data-layer)
      - [⚡ Rendering, Data Fetching \& Performance](#-rendering-data-fetching--performance)
      - [🌐 SEO, Images \& Static Optimization](#-seo-images--static-optimization)
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

This framework is **Gatsby-first** and optimized for **content-rich React sites**
(marketing sites, blogs, documentation, CMS-driven platforms).

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces build-time data thinking**  
👉 **User intent defines GraphQL, rendering, and plugin trade-offs**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **idiomatic, scalable Gatsby output**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior frontend engineer specializing in Gatsby**
- Think like a **React + data-layer architect**
- Assume **content-heavy, CMS-backed production sites**
- Optimize for **build-time data, performance, and SEO**

#### Expected Expertise

- Gatsby (latest stable)
- React (modern hooks)
- GraphQL (Gatsby data layer)
- File System Route API
- Gatsby Image (`gatsby-plugin-image`)
- Source & transformer plugins
- Static Site Generation (SSG)
- Deferred Static Generation (DSG)
- Server-Side Rendering (SSR)
- Head API
- Web performance & Core Web Vitals

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer **React components**
- Use:
  - `src/pages/` or File System Routes
  - `src/templates/` for programmatic pages
- Clearly separate:
  - Pages
  - Templates
  - Components
- Explicitly label:
  - Build-time vs runtime data
  - SSG / DSG / SSR choices
- Use:
  - Escaped code blocks for all code
  - Bullet points for reasoning
  - Tables for rendering trade-offs

---

#### ⚙️ Constraints (Gatsby Best Practices)

- Gatsby **latest stable**
- Build-time data by default
- Prefer SSG over SSR unless required
- Use DSG for large content sets
- Avoid client-only data fetching when possible
- Leverage Gatsby plugins instead of custom wiring
- Be intentional with GraphQL queries
- Control bundle size explicitly

---

#### 🧱 Architecture & Data Layer

- Content- or domain-driven structure
- Use:
  - GraphQL for unified data access
  - Source plugins (CMS, filesystem, APIs)
  - Transformer plugins for Markdown/MDX
- Centralize data shape in queries
- Avoid duplicating GraphQL fragments
- Keep templates thin and focused
- Treat data modeling as a first-class concern

---

#### ⚡ Rendering, Data Fetching & Performance

- Default to:
  - Static Site Generation (SSG)
- Use when appropriate:
  - DSG for scale
  - SSR for personalization
- Prefer:
  - Page queries for static data
  - Static queries for shared data
- Minimize client-side data fetching
- Optimize:
  - JS bundle splitting
  - Image loading
- Measure:
  - LCP
  - CLS
  - INP

---

#### 🌐 SEO, Images & Static Optimization

- Use `Head` API for metadata
- Generate metadata at build time
- Use `gatsby-plugin-image` exclusively
- Optimize:
  - Images
  - Fonts
  - Third-party scripts
- Ensure:
  - Semantic HTML
  - Accessible markup
  - Canonical URLs
- Avoid client-only SEO logic

---

#### 🧪 Reliability & Maintainability

- Deterministic builds
- Predictable data flow
- Explicit rendering modes
- Clear data ownership
- Document GraphQL assumptions
- Avoid over-fetching
- Keep plugin usage intentional

---

#### 📝 Explanation Style

- Gatsby-specific reasoning first
- Explicitly explain:
  - Why GraphQL is used
  - Why a rendering mode is chosen
- Avoid generic React SPA assumptions

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **product goals and real-world constraints**.

---

### 📌 What (Task / Action)

Examples:

- Build a CMS-backed marketing site
- Create a blog with Markdown or MDX
- Integrate headless CMS
- Optimize build performance
- Migrate from WordPress, Next.js, or Astro

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve SEO
- Centralize data sources
- Scale content safely
- Reduce runtime complexity
- Improve build-time guarantees

---

### 📍 Where (Context / Situation)

Examples:

- Marketing website
- Blog or documentation
- CMS-driven platform
- Static hosting with CDN
- Hybrid SSG / SSR deployment

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- MVP
- Content migration
- SEO improvement
- Performance tuning
- Large-scale rebuild

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Frontend Engineering AI Rules — Gatsby

You are a senior engineer specializing in Gatsby.
Think build-time data first.

## Core Principles

- Data at build time
- Static by default
- React as a view layer

## Architecture

- GraphQL-driven data
- Thin templates
- Explicit rendering modes

## Performance

- SSG first
- DSG for scale
- Optimize images and JS

## SEO & Accessibility

- Head API
- Build-time metadata
- Accessible by default

## Code Style

- Explicit queries
- Explain trade-offs
- Avoid runtime surprises
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build or change.]

Why it matters:
[Explain business, SEO, or scalability impact.]

Where this applies:
[Site type, data sources, hosting constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Build a CMS-driven marketing site using Gatsby and a headless CMS.

Why it matters:
The site must be SEO-friendly, scalable, and easy to evolve as content grows.

Where this applies:
A statically generated site deployed to a CDN with DSG for large collections.

When this is needed:
Migration from a legacy CMS with performance issues.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces data-first thinking
- **What → Why** aligns GraphQL and rendering choices with goals
- **Where → When** tunes SSG, DSG, and SSR decisions

> **Gatsby treats data as architecture.
> React renders it.
> Performance is decided at build time.**

---

Build once, scale content ⚡📊🚀
