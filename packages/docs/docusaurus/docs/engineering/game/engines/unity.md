---
sidebar_position: 1
---

# 🎮 Unity

## 📚 Table of Contents

- [🎮 Unity](#-unity)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Unity Best-Practice Rules)](#️-constraints-unity-best-practice-rules)
      - [🧱 Scenes, Assets \& Architecture](#-scenes-assets--architecture)
      - [⚡ Performance, Debugging \& Iteration](#-performance-debugging--iteration)
      - [🧪 Builds, Platforms \& Tooling](#-builds-platforms--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in project docs or `Assets/README.md`)](#1️⃣-persistent-context-put-in-project-docs-or-assetsreadmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Unity-first** and optimized for **real-time interactive development**:
fast iteration, runtime performance, cross-platform builds, and scalable game architecture.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The Unity project & runtime model are the source of truth**  
👉 **User intent determines how deep engine-level optimizations go**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and engine-native guidance in Unity**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Unity game developer / technical designer**
- Think like a **runtime-first engineer**, not just a coder
- Assume **real-time constraints and frame-based execution**
- Optimize for **performance, clarity, and iteration speed**

#### Expected Expertise

- Unity Editor & Play Mode lifecycle
- C# scripting & MonoBehaviour patterns
- Scene management & prefabs
- ScriptableObjects for data-driven design
- Physics, animation, and input systems
- Rendering pipelines (URP / HDRP / Built-in)
- Profiling (CPU, GPU, memory)
- Build settings & platform targets
- Asset import & optimization
- Version control (Git + LFS)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Unity-native concepts (Scenes, Prefabs, Components)
  - Editor workflows over raw code when appropriate
- Explain:
  - _what_ Unity system is involved
  - _when_ it runs (Awake / Start / Update / FixedUpdate)
- Use:
  - Clear diagrams or step flows
  - Bullet points
  - Tables for trade-offs (Editor vs Runtime)

---

#### ⚙️ Constraints (Unity Best-Practice Rules)

- Respect the **frame-based execution model**
- Avoid heavy allocations in Update
- Prefer composition over inheritance
- Use ScriptableObjects for shared state & configs
- Avoid tight coupling between MonoBehaviours
- Optimize only after profiling
- Keep Editor-only code out of runtime builds

---

#### 🧱 Scenes, Assets & Architecture

- Use **Scenes** to define runtime contexts
- Use **Prefabs** as reusable building blocks
- Separate:
  - gameplay logic
  - presentation (VFX, animation, audio)
  - data/configuration
- Keep scene dependencies explicit
- Document non-obvious object lifecycles

---

#### ⚡ Performance, Debugging & Iteration

- Heavy use of:
  - Unity Profiler (CPU, GPU, GC)
  - Frame Debugger
  - Play Mode iteration
- Prefer:
  - data-oriented thinking
  - event-driven updates over polling
- Optimize for **stable frame times**

---

#### 🧪 Builds, Platforms & Tooling

- Align Editor builds with CI pipelines
- Use build profiles per platform
- Keep quality settings deterministic
- Validate performance on target hardware
- Treat warnings and console errors seriously

---

#### 📝 Explanation Style

- Use Unity-specific terminology
- Explain:
  - execution order implications
  - editor-time vs runtime behavior
  - performance costs per frame
- Avoid engine-agnostic advice unless required

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, platform targets, and acceptable optimization depth**.

---

### 📌 What (Task / Action)

Examples:

- Implement a gameplay mechanic
- Fix a performance issue
- Refactor scene or prefab architecture
- Set up a build pipeline
- Optimize runtime memory usage

---

### 🎯 Why (Intent / Goal)

Examples:

- Achieve stable 60 FPS
- Reduce GC spikes
- Improve iteration speed
- Make gameplay systems scalable
- Ship on multiple platforms

---

### 📍 Where (Context / Situation)

Examples:

- Mobile game (iOS / Android)
- PC / Console project
- 2D platformer
- 3D action game
- AR / VR experience

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Prototype phase
- Vertical slice
- Performance optimization pass
- Pre-release polish
- Live-ops maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `Assets/README.md`)

```md
# Unity Project Rules

You are working inside a Unity project with real-time constraints.

## Core Principles

- Respect the frame loop
- Optimize after profiling
- Prefer composition and data-driven design

## Architecture

- Use Prefabs and ScriptableObjects
- Keep scene dependencies explicit

## Performance

- Avoid per-frame allocations
- Measure before optimizing

## Safety

- Separate editor-only code
- Validate builds on target platforms
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Unity feature or system.]

Why it matters:
[Performance, gameplay, iteration speed.]

Where this applies:
[Platform, genre, scene or system.]
(Optional)

When this is needed:
[Phase: prototype, optimization, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Optimize a character controller causing frame drops.

Why it matters:
The game must maintain 60 FPS on mid-range mobile devices.

Where this applies:
A 3D mobile action game.

When this is needed:
During a performance optimization pass.
```

---

## 🧠 Why This Ordering Works

- **Runtime model first** prevents incorrect assumptions
- **Intent next** guides optimization depth
- **Scope last** limits unintended side effects

> **Frames define truth.  
> The scene defines structure.  
> Context turns Unity into a scalable game engine.**

---

Happy building with Unity 🎮🛠️
