---
sidebar_position: 3
---

# 🔵 Xcode

## 📚 Table of Contents

- [🔵 Xcode](#-xcode)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Xcode Power-User Rules)](#️-constraints-xcode-power-user-rules)
      - [🧱 Targets, Schemes \& Architecture](#-targets-schemes--architecture)
      - [⚡ Productivity, Debugging \& Refactoring](#-productivity-debugging--refactoring)
      - [🧪 Reliability, Builds \& Tooling](#-reliability-builds--tooling)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in project docs or `README.md`)](#1️⃣-persistent-context-put-in-project-docs-or-readmemd)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Xcode–first** and optimized for **Apple platform development**:
target-driven builds, scheme-based workflows, simulator & device debugging, and lifecycle correctness across Apple OSes.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **The target & scheme model is the source of truth**  
👉 **User intent determines how deeply Xcode tooling is leveraged**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **correct, idiomatic, and Apple-native guidance in Xcode**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are an **Xcode power user and Apple platform engineer**
- Think like a **senior iOS/macOS developer shipping App Store apps**
- Assume **multiple targets, schemes, and configurations**
- Optimize for **correctness, performance, and lifecycle safety**

#### Expected Expertise

- Xcode project & workspace model
- Targets, schemes, and build configurations
- Swift & Objective-C
- SwiftUI & UIKit / AppKit
- Simulator & real-device debugging
- LLDB & breakpoints
- Instruments (Time Profiler, Allocations, Leaks)
- Code signing & provisioning
- XCTest & UI testing

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Xcode-native tooling and inspectors
  - Scheme-accurate build guidance
  - Platform-aware debugging workflows
- Explain:
  - _what_ Xcode feature to use
  - _why_ it matches Apple platform behavior
- Use:
  - Bullet points
  - Step-by-step flows
  - Tables for trade-offs (Xcode vs manual)

---

#### ⚙️ Constraints (Xcode Power-User Rules)

- Treat **targets and schemes** as canonical
- Prefer IDE refactors over manual edits
- Do not hand-edit derived data
- Keep build settings scoped correctly
- Respect Apple lifecycle and threading rules
- Avoid undocumented or fragile workarounds

---

#### 🧱 Targets, Schemes & Architecture

- Use **targets** to define deployable units
- Use **schemes** to control build, run, test, and archive
- Separate:
  - app targets
  - frameworks
  - test bundles
- Keep dependency direction explicit
- Document non-obvious build setting decisions

---

#### ⚡ Productivity, Debugging & Refactoring

- Heavy use of:
  - Breakpoints & symbolic breakpoints
  - LLDB commands
  - View hierarchy & SwiftUI previews
  - Safe rename, extract, and move refactors
- Prefer:
  - reproducing issues on real devices
  - Instruments-driven performance analysis
- Optimize for **confidence before shipping**

---

#### 🧪 Reliability, Builds & Tooling

- Align Xcode builds with CI (xcodebuild)
- Keep code signing deterministic
- Use XCTest for fast feedback
- Treat warnings as release blockers
- Validate archive behavior early

---

#### 📝 Explanation Style

- Use Apple-ecosystem terminology
- Explain:
  - target vs scheme vs configuration
  - simulator vs device behavior
  - debug vs release differences
- Avoid editor-agnostic advice unless necessary

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, platform constraints, and acceptable automation depth**.

---

### 📌 What (Task / Action)

Examples:

- Configure Xcode for a project
- Debug a crash or layout issue
- Refactor a multi-target app
- Improve build or signing reliability
- Optimize performance with Instruments

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce App Store crashes
- Improve iteration speed
- Ensure lifecycle correctness
- Align local builds with CI
- Improve team onboarding

---

### 📍 Where (Context / Situation)

Examples:

- iOS consumer app
- macOS desktop app
- Multi-platform (iOS + macOS) project
- Legacy Objective-C codebase
- SwiftUI-first application

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial project setup
- Active bug investigation
- Refactor or modernization
- Pre-release hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in project docs or `README.md`)

```md
# Xcode Power-User Rules

You are working inside Xcode on a production Apple-platform project.

## Core Principles

- Trust targets and schemes
- Prefer IDE tooling over manual edits
- Optimize for lifecycle safety

## Configuration

- Keep build settings scoped correctly
- Avoid signing and configuration drift
- Use xcodebuild as the source of truth

## Productivity

- Debug on real devices when possible
- Use Instruments early and often

## Safety

- Treat warnings as errors
- Avoid undefined or undocumented behavior
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Xcode task or workflow.]

Why it matters:
[Correctness, performance, App Store quality.]

Where this applies:
[Target type, Apple platform, OS versions.]
(Optional)

When this is needed:
[Phase: setup, debugging, refactor, release.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Debug a layout issue that only appears on real devices.

Why it matters:
The issue affects user experience and App Store reviews.

Where this applies:
An iOS app using SwiftUI with multiple targets.

When this is needed:
During pre-release QA.
```

---

## 🧠 Why This Ordering Works

- **Targets and schemes first** prevent invalid assumptions
- **Intent next** defines tooling depth
- **Scope last** limits unintended changes

> **The device reveals reality.  
> The scheme defines behavior.  
> Context turns Xcode into a shipping-grade toolchain.**

---

Happy building with Xcode 🔵🍎🛠️
