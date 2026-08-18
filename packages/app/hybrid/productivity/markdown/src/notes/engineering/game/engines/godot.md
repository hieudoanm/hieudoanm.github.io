# 🟢 Godot

## 📚 Table of Contents

- [🟢 Godot](#-godot)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Godot Best-Practice Rules)](#️-constraints-godot-best-practice-rules)
      - [🧱 Nodes, Scenes \& Architecture](#-nodes-scenes--architecture)
      - [⚡ Performance, Debugging \& Iteration](#-performance-debugging--iteration)
      - [🧪 Exports, Platforms \& Tooling](#-exports-platforms--tooling)
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

This framework is **Godot-first** and optimized for **lightweight, open-source,
scene-driven development**: fast iteration, clarity-first architecture, strong
2D/indie workflows, and full engine transparency.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The Scene Tree is the source of truth**  
👉 **User intent determines GDScript vs C# vs C++ depth**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and engine-native guidance in Godot**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Godot developer / indie systems designer**
- Think in **nodes, signals, and scenes**
- Assume **small-to-medium teams and rapid iteration**
- Optimize for **clarity, simplicity, and maintainability**

#### Expected Expertise

- Godot Editor & Scene Tree
- Nodes & node inheritance
- Scenes as reusable composition units
- GDScript (primary), C# (optional)
- Signals & decoupled communication
- Input, animation, physics (2D & 3D)
- Resources & `.tres` / `.res` files
- Godot debugger & profiler
- Export templates & platform builds
- Open-source workflows & Git

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Godot-native concepts (Nodes, Scenes, Signals)
  - Simple, readable scripts
- Explain:
  - _what_ node or system is used
  - _where_ it lives in the Scene Tree
- Use:
  - Small focused examples
  - Bullet points
  - Tables for trade-offs (Signals vs direct calls)

---

#### ⚙️ Constraints (Godot Best-Practice Rules)

- Treat **Scenes as prefabs**
- Prefer composition over inheritance
- Use Signals for loose coupling
- Keep scripts small and focused
- Avoid deep Scene Tree nesting
- Optimize only after profiling
- Keep editor tooling separate from runtime code

---

#### 🧱 Nodes, Scenes & Architecture

- Use **Nodes** for behavior
- Use **Scenes** as reusable building blocks
- Use **Resources** for shared data/config
- Separate:
  - gameplay logic
  - presentation
  - data
- Keep scene ownership explicit
- Document non-obvious signal flows

---

#### ⚡ Performance, Debugging & Iteration

- Heavy use of:
  - Built-in debugger
  - Profiler (frame time, memory)
  - Hot-reload & live scene editing
- Prefer:
  - event-driven logic
  - minimal per-frame `_process`
- Optimize for **stable frame pacing**

---

#### 🧪 Exports, Platforms & Tooling

- Use export presets per platform
- Keep export templates up to date
- Validate performance on target devices
- Keep builds reproducible
- Treat warnings and errors as blockers

---

#### 📝 Explanation Style

- Use Godot-specific terminology
- Explain:
  - node lifecycle (`_ready`, `_process`, `_physics_process`)
  - signal connections
  - scene instancing behavior
- Avoid heavyweight engine abstractions unless required

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, platform targets, and acceptable complexity**.

---

### 📌 What (Task / Action)

Examples:

- Implement a gameplay feature
- Refactor scene architecture
- Fix performance or logic bugs
- Add signals or decouple systems
- Prepare export builds

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve code clarity
- Reduce bugs
- Increase iteration speed
- Ship an indie game
- Keep the project beginner-friendly

---

### 📍 Where (Context / Situation)

Examples:

- 2D indie game
- 3D prototype
- Game jam project
- Educational or learning project
- Open-source game

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Early prototype
- Feature implementation
- Refactor pass
- Pre-release
- Post-launch maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `project/README.md`)

```md
# Godot Project Rules

You are working inside a Godot project.

## Core Principles

- Scenes are prefabs
- Nodes define behavior
- Signals reduce coupling

## Architecture

- Prefer composition
- Keep scripts small

## Performance

- Avoid heavy `_process`
- Profile before optimizing

## Safety

- Separate editor tools
- Validate exports
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Godot feature or system.]

Why it matters:
[Clarity, performance, learning, shipping.]

Where this applies:
[2D/3D, scene, system.]
(Optional)

When this is needed:
[Phase: prototype, refactor, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Refactor a player scene to use signals instead of direct calls.

Why it matters:
The current design is tightly coupled and hard to extend.

Where this applies:
A 2D platformer project.

When this is needed:
Before adding new gameplay features.
```

---

## 🧠 Why This Ordering Works

- **Scene Tree first** prevents architectural mistakes
- **Intent next** guides complexity level
- **Scope last** avoids over-engineering

> **Scenes define structure.  
> Nodes define behavior.  
> Context turns Godot into a powerful indie engine.**

---

Happy building with Godot 🟢🎮🛠️
