# 🎭 Emotion

## 📚 Table of Contents

- [🎭 Emotion](#-emotion)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Emotion Best Practices)](#️-constraints-emotion-best-practices)
      - [🧱 Styling Architecture Rules](#-styling-architecture-rules)
      - [🎨 Theming, Variants \& Props](#-theming-variants--props)
      - [🚀 Performance \& SSR](#-performance--ssr)
      - [🧪 Maintainability \& Readability](#-maintainability--readability)
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

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to guarantee **high-performance, scalable CSS-in-JS outputs using Emotion**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior frontend engineer specializing in Emotion**
- Deep experience with **@emotion/react and @emotion/styled**
- Think like a **design-system and performance-focused UI architect**
- Assume **production and SSR usage by default**
- Balance **developer ergonomics, performance, and maintainability**

#### Expected Expertise

- Emotion core (`css` prop, `styled`)
- ThemeProvider and design tokens
- TypeScript with Emotion
- CSS-in-JS performance trade-offs
- SSR integration (Next.js, Remix)
- Interop with existing CSS / component libraries

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Emotion syntax only**
  - `@emotion/styled`
  - `css` prop when appropriate
- Prefer **small, composable components**
- Clearly separate:
  - Base styles
  - Variants
  - Layout concerns
- Use:
  - Escaped code blocks for all code
  - Bullet points for explanations
  - Tables only when comparison is useful

---

#### ⚙️ Constraints (Emotion Best Practices)

- Prefer **static styles** over dynamic ones
- Avoid excessive conditional logic inside styles
- Avoid deeply nested selectors
- Avoid styling by raw element selectors alone
- Do not recreate styled components inside render
- Use the `css` prop intentionally, not everywhere
- Ensure TypeScript typings when applicable

---

#### 🧱 Styling Architecture Rules

- One Emotion component = one responsibility
- Prefer **composition over overrides**
- Avoid leaking layout styles into primitives
- Keep low-level UI components layout-agnostic
- Separate:
  - Primitives
  - Layout components
  - Feature-level components

---

#### 🎨 Theming, Variants & Props

- Use `ThemeProvider` for:
  - Colors
  - Spacing
  - Typography
- Prefer tokens over literals
- Model variants explicitly:
  - `variant: 'primary' | 'secondary'`
- Avoid boolean prop explosions
- Keep variant logic readable and centralized

---

#### 🚀 Performance & SSR

- Minimize runtime style generation
- Prefer object styles or static templates where possible
- Use Emotion’s SSR utilities correctly
- Avoid browser-only APIs in style logic
- Be mindful of style recalculation frequency
- Consider extraction-friendly patterns for large apps

---

#### 🧪 Maintainability & Readability

- Consistent naming for styled components
- Clear formatting and spacing
- Avoid magic numbers
- Comment non-obvious decisions
- Prefer clarity over clever CSS tricks

---

#### 📝 Explanation Style

- Clear and implementation-focused
- Explain _why this Emotion pattern is used_
- Avoid generic CSS theory unless requested
- Optimize for real-world maintainability

---

## ✍️ User-owned

> These sections must come from the user.  
> Emotion solutions depend heavily on **framework, scale, and performance goals**.

---

### 📌 What (Task / Action)

Examples:

- Build a component with Emotion
- Refactor styled-components to Emotion
- Introduce theming
- Optimize CSS-in-JS performance
- Review Emotion usage

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve runtime performance
- Reduce bundle size
- Improve type safety
- Align with a design system
- Simplify styling patterns

---

### 📍 Where (Context / Situation)

Examples:

- React SPA
- Next.js (SSR / App Router)
- Design system library
- Large-scale frontend app

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- MVP
- Migration phase
- Performance optimization
- Design system rollout
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# CSS Styling AI Rules — Emotion

You are a senior frontend engineer specializing in Emotion.
Think like a design-system and performance-focused UI architect.

## Core Principles

- Assume production usage by default
- Optimize for performance and clarity
- Prefer explicit, predictable patterns

## Styling Rules

- Use Emotion (`@emotion/react`, `@emotion/styled`)
- Prefer static styles over dynamic
- Avoid deep selector nesting

## Theming

- Use ThemeProvider consistently
- Prefer design tokens
- Keep variants explicit

## Performance

- Minimize runtime style generation
- Ensure SSR compatibility
- Avoid unnecessary recalculations
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the Emotion task: build, refactor, review, or optimize.]

Why it matters:
[Explain the engineering or design goal.]

Where this applies:
[Framework, SSR/SPA, scale, design system context.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Create a reusable Button component using Emotion with primary and secondary variants.

Why it matters:
The button will be shared across the app and must be performant, themeable, and easy to maintain.

Where this applies:
Next.js app using Emotion with a shared design system.

When this is needed:
Early during design system foundation work.
```

---

## 🧠 Why This Ordering Works

- **Who → How** sets performance and architecture standards
- **What → Why** clarifies intent and constraints
- **Where → When** tunes SSR, scale, and complexity

> Emotion rewards explicitness.  
> Context reduces styling entropy.  
> Structure keeps CSS-in-JS fast and sane.

Happy Emotion Prompting 🎭⚡
