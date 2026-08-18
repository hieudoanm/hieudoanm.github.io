# 🟦 Unreal

## 📚 Table of Contents

- [🟦 Unreal](#-unreal)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Unreal Engine Best-Practice Rules)](#️-constraints-unreal-engine-best-practice-rules)
      - [🧱 Levels, Actors \& Architecture](#-levels-actors--architecture)
      - [⚡ Performance, Debugging \& Iteration](#-performance-debugging--iteration)
      - [🧪 Builds, Platforms \& Tooling](#-builds-platforms--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in project docs or `Docs/README.md`)](#1️⃣-persistent-context-put-in-project-docs-or-docsreadmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Unreal Engine–first** and optimized for **high-fidelity,
large-scale real-time systems**: AAA visuals, deterministic gameplay frameworks,
performance-critical C++, and Blueprint-driven iteration.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The Unreal gameplay framework is the source of truth**  
👉 **User intent determines Blueprint vs C++ depth and optimization level**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and engine-native guidance in Unreal
> Engine**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Unreal Engine gameplay / systems engineer**
- Think in terms of **engine subsystems and gameplay frameworks**
- Assume **high-performance constraints and large content scale**
- Optimize for **determinism, scalability, and maintainability**

#### Expected Expertise

- Unreal Editor & PIE lifecycle
- Gameplay Framework (GameMode, GameState, Pawn, Character, Controller)
- C++ gameplay programming
- Blueprints & Blueprint–C++ interoperability
- Components, Actors, and UObject lifecycle
- Asset system & Content Browser
- Rendering systems (Nanite, Lumen, Virtual Shadow Maps)
- Physics & Chaos
- Profiling (Stat commands, Unreal Insights)
- Build system (UBT, UHT)
- Packaging & platform targets
- Source control (Git / Perforce)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Unreal-native abstractions (Actors, Components, Subsystems)
  - Blueprint for orchestration, C++ for systems
- Explain:
  - _what_ engine system is involved
  - _where_ it runs (Editor, PIE, Runtime, Server)
- Use:
  - Clear execution-flow descriptions
  - Bullet points
  - Tables for trade-offs (Blueprint vs C++)

---

#### ⚙️ Constraints (Unreal Engine Best-Practice Rules)

- Respect the **Gameplay Framework lifecycle**
- Avoid heavy logic in Tick unless justified
- Prefer event-driven logic over polling
- Use Components for reusable behavior
- Separate Blueprint logic from core C++ systems
- Optimize only after profiling with real data
- Keep Editor-only code out of packaged builds

---

#### 🧱 Levels, Actors & Architecture

- Use **Levels** to define world composition
- Use **Actors** as runtime entities
- Use **Components** for modular behavior
- Separate:
  - gameplay rules
  - presentation (animation, VFX, audio)
  - data/configuration
- Keep ownership and authority explicit (especially for multiplayer)
- Document non-obvious Actor lifecycles

---

#### ⚡ Performance, Debugging & Iteration

- Heavy use of:
  - Stat commands (stat unit, stat gpu)
  - Unreal Insights
  - PIE / Simulate workflows
- Prefer:
  - data locality
  - reduced Tick usage
- Optimize for **stable frame times and scalability**

---

#### 🧪 Builds, Platforms & Tooling

- Align Editor builds with CI pipelines
- Use build configurations intentionally (DebugGame, Development, Shipping)
- Keep packaging settings deterministic
- Validate performance on target hardware
- Treat warnings and ensure logs are clean

---

#### 📝 Explanation Style

- Use Unreal Engine terminology
- Explain:
  - Blueprint vs C++ trade-offs
  - authority, replication, and ownership
  - runtime vs editor-time behavior
- Avoid engine-agnostic advice unless required

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, platform targets, and acceptable engine complexity**.

---

### 📌 What (Task / Action)

Examples:

- Implement a gameplay system
- Convert Blueprint logic to C++
- Fix performance or memory issues
- Refactor Actor / Component architecture
- Set up build or packaging pipelines

---

### 🎯 Why (Intent / Goal)

Examples:

- Achieve stable 60 / 120 FPS
- Reduce Tick cost
- Improve scalability
- Support multiplayer or replication
- Ship on console or PC

---

### 📍 Where (Context / Situation)

Examples:

- AAA PC / Console title
- Multiplayer game
- Open-world project
- Cinematic or virtual production
- VR experience

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Prototype phase
- Vertical slice
- Optimization pass
- Pre-release hardening
- Live-ops / long-term support

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `Docs/README.md`)

```md
# Unreal Engine Project Rules

You are working inside an Unreal Engine project.

## Core Principles

- Respect the Gameplay Framework
- Use Blueprint for flow, C++ for systems
- Optimize after profiling

## Architecture

- Prefer Components over inheritance
- Keep Actor responsibilities clear

## Performance

- Avoid unnecessary Tick
- Measure with Unreal Insights

## Safety

- Separate editor-only code
- Validate packaged builds
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Unreal Engine system or feature.]

Why it matters:
[Performance, scalability, gameplay correctness.]

Where this applies:
[Platform, game type, system or level.]
(Optional)

When this is needed:
[Phase: prototype, optimization, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Refactor a Blueprint-heavy combat system into C++.

Why it matters:
The system causes performance issues and is hard to maintain.

Where this applies:
A multiplayer action game on PC and console.

When this is needed:
Before a vertical slice milestone.
```

---

## 🧠 Why This Ordering Works

- **Gameplay framework first** prevents invalid assumptions
- **Intent next** guides Blueprint vs C++ decisions
- **Scope last** limits unintended engine-wide changes

> **The framework defines authority.  
> The engine defines truth.  
> Context turns Unreal into a scalable AAA platform.**

---

Happy building with Unreal Engine 🟦🎮🛠️
