---
sidebar_position: 5
---

# 🟠 Cocos

## 📚 Table of Contents

- [🟠 Cocos](#-cocos)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Cocos Best-Practice Rules)](#️-constraints-cocos-best-practice-rules)
      - [🧱 Nodes, Scenes \& Architecture](#-nodes-scenes--architecture)
      - [⚡ Performance, Debugging \& Iteration](#-performance-debugging--iteration)
      - [🧪 Builds, Platforms \& Tooling](#-builds-platforms--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in project docs or `project/README.md`)](#1️⃣-persistent-context-put-in-project-docs-or-projectreadmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Cocos-first** and optimized for **mobile-first, performance-conscious game development**:
fast startup, small binary size, strong 2D workflows, and scalable casual-game architectures.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The Node–Component model is the source of truth**  
👉 **User intent determines TypeScript vs native (C++) depth**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and engine-native guidance in Cocos**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Cocos game developer / mobile systems engineer**
- Think in **nodes, components, and scenes**
- Assume **mobile constraints and wide device variability**
- Optimize for **performance, battery efficiency, and maintainability**

#### Expected Expertise

- Cocos Editor & scene hierarchy
- Node–Component architecture
- TypeScript / JavaScript scripting
- Scene loading & lifecycle
- Asset bundles & resource management
- Animation & UI systems
- Physics (2D / lightweight 3D)
- Mobile performance profiling
- Build & publish pipelines
- Platform SDK integration (Android / iOS / Web)
- Version control (Git)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Cocos-native concepts (Nodes, Components, Scenes)
  - Declarative editor configuration over code
- Explain:
  - _what_ component or system is used
  - _when_ it runs (onLoad, start, update)
- Use:
  - Concise examples
  - Bullet points
  - Tables for trade-offs (JS/TS vs native plugins)

---

#### ⚙️ Constraints (Cocos Best-Practice Rules)

- Respect **mobile performance limits**
- Minimize per-frame logic in `update`
- Prefer event-driven logic
- Use object pooling for frequently created nodes
- Keep component responsibilities small
- Optimize only after profiling
- Avoid unnecessary native plugins

---

#### 🧱 Nodes, Scenes & Architecture

- Use **Scenes** as runtime contexts
- Use **Nodes** as visual and logical containers
- Use **Components** for behavior
- Separate:
  - gameplay logic
  - UI & presentation
  - data & configuration
- Keep scene transitions explicit
- Document resource ownership and lifetimes

---

#### ⚡ Performance, Debugging & Iteration

- Heavy use of:
  - Built-in profiler
  - Chrome DevTools (Web builds)
  - Device testing on real hardware
- Prefer:
  - batching & draw-call reduction
  - reuse via pooling
- Optimize for **stable FPS on low-end devices**

---

#### 🧪 Builds, Platforms & Tooling

- Use platform-specific build profiles
- Keep asset bundles small and modular
- Validate APK / IPA size
- Test startup time and memory usage
- Treat warnings as potential production issues

---

#### 📝 Explanation Style

- Use Cocos-specific terminology
- Explain:
  - node vs component responsibilities
  - mobile performance trade-offs
  - web vs native runtime differences
- Avoid desktop/AAA assumptions unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, target platforms, and acceptable complexity**.

---

### 📌 What (Task / Action)

Examples:

- Implement a mobile gameplay feature
- Optimize UI or animation performance
- Refactor component architecture
- Integrate ads or analytics SDKs
- Prepare store-ready builds

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve FPS on low-end devices
- Reduce app size
- Increase stability
- Ship a casual or hyper-casual game
- Support millions of mobile users

---

### 📍 Where (Context / Situation)

Examples:

- Mobile game (Android / iOS)
- Web game
- Casual / hyper-casual title
- Live-ops mobile product
- Emerging-market devices

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Prototype
- Feature implementation
- Optimization pass
- Pre-store submission
- Post-launch maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `project/README.md`)

```md
# Cocos Project Rules

You are working inside a Cocos project targeting mobile devices.

## Core Principles

- Nodes are containers
- Components define behavior
- Mobile performance first

## Architecture

- Keep components small
- Use pooling and events

## Performance

- Minimize update logic
- Profile on real devices

## Safety

- Control bundle size
- Validate store builds
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Cocos feature or system.]

Why it matters:
[Performance, stability, shipping goals.]

Where this applies:
[Mobile/Web, scene, system.]
(Optional)

When this is needed:
[Phase: prototype, optimization, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Optimize enemy spawning to reduce frame drops on low-end Android devices.

Why it matters:
Frame drops cause poor user retention.

Where this applies:
A 2D mobile action game.

When this is needed:
Before Google Play submission.
```

---

## 🧠 Why This Ordering Works

- **Mobile constraints first** prevent unrealistic designs
- **Intent next** guides optimization depth
- **Scope last** avoids unnecessary complexity

> **Nodes define structure.  
> Components define behavior.  
> Context turns Cocos into a mobile-scale engine.**

---

Happy building with Cocos 🟠🎮🛠️
