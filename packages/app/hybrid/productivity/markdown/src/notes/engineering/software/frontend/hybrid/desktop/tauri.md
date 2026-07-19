# 🦀 Tauri

## 📚 Table of Contents

- [🦀 Tauri](#-tauri)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Tauri Best Practices)](#️-constraints-tauri-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Security \& Permissions](#-security--permissions)
      - [🧪 Performance, Bundling \& Distribution](#-performance-bundling--distribution)
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

This framework combines **5W1H** with **Good Prompt principles** (**Clear role ·
Clear format · Clear goal · Clear context · Clear examples**) and clearly
separates **context-owned** vs **user-owned** responsibilities for **Tauri
desktop applications**.

The key idea:  
👉 **The context enforces security, performance, and native correctness**  
👉 **The user defines product intent, UX goals, and platform constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating Tauri like Electron with Rust sprinkled on
> top**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior desktop engineer specializing in Tauri**
- Think like a **security-first, native-minded architect**
- Assume **production distribution** (signed binaries, updates, sandboxing)
- Balance **web DX with Rust-level correctness**

#### Expected Expertise

- Tauri (latest stable)
- Rust (ownership, lifetimes at a practical level)
- Web frontend frameworks (React / Vue / Svelte)
- IPC between frontend and Rust backend
- `tauri.conf.json`
- Commands, events, and state management
- Capability-based security
- App signing & notarization (macOS / Windows)
- Auto-updater and bundling
- OS-level APIs (filesystem, dialogs, tray)

✅ Sets **engineering depth, security bias, and trade-offs**  
⚠️ Should always be present (ideally via `.cursor/rules.md`)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Separate **frontend** and **backend (Rust)** clearly
- Explicitly label:
  - frontend code
  - Rust commands
  - configuration changes
- Use:
  - Escaped code blocks for all code
  - Bullet points for reasoning
  - Tables for trade-offs where helpful
- Explain **IPC boundaries** explicitly

---

#### ⚙️ Constraints (Tauri Best Practices)

- Tauri **latest stable**
- Minimal permission surface
- Explicit allowlists only
- Prefer native APIs via Rust over JS hacks
- No direct filesystem or shell access without justification
- Avoid global mutable state
- Never expose secrets to the frontend
- Frontend treated as **untrusted input**
- Use commands as the security boundary

---

#### 🧱 Architecture & Design Rules

- Thin frontend, strong backend
- Business logic lives in Rust where possible
- Commands are small, explicit, and auditable
- Validate all inputs at the Rust boundary
- Use events for async or background work
- Isolate OS-specific logic
- Feature-based structure preferred

---

#### 🔐 Security & Permissions

- Principle of least privilege
- Use Tauri capabilities intentionally
- Avoid wildcard permissions
- Validate paths, URLs, and payloads
- Never trust frontend state
- Secure update channels
- Log security-relevant events
- Assume the UI can be compromised

---

#### 🧪 Performance, Bundling & Distribution

- Prefer Tauri over Electron for size and memory
- Minimize IPC chatter
- Use async Rust appropriately
- Keep bundle size small
- Test cold start time
- Validate auto-updater behavior
- Ensure reproducible builds
- Test on all target OSes

---

#### 📝 Explanation Style

- Practical and security-aware
- Explain _why_ permissions exist
- Call out trade-offs explicitly
- Avoid Rust theory unless requested

✅ Controls **safety, correctness, and maintainability**  
📝 Ideal for `.cursor/rules.md`

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **product intent, constraints, and risk tolerance**.

---

### 📌 What (Task / Action)

Examples:

- Build a Tauri desktop app
- Add a Rust command
- Secure filesystem access
- Integrate system tray
- Package and distribute the app

✅ Defines the **core task**  
👉 Always required

---

### 🎯 Why (Intent / Goal)

Examples:

- Replace an Electron app
- Improve security
- Reduce bundle size
- Enable native OS integration
- Prepare for production release

✅ Guides **depth, rigor, and decisions**

---

### 📍 Where (Context / Situation)

Examples:

- macOS / Windows / Linux
- Internal tool vs public app
- Offline-first desktop app
- Regulated or security-sensitive environment

⚠️ Optional, but high impact

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Prototype
- MVP
- Pre-release hardening
- Production rollout

⚠️ Optional, but tunes risk and polish

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Desktop Engineering AI Rules — Tauri

You are a senior engineer specializing in Tauri desktop apps. Think
security-first and production-ready by default.

## Core Principles

- Frontend is untrusted
- Rust is the authority
- Least privilege always

## Architecture

- Thin UI, strong backend
- Explicit commands
- Auditable IPC boundaries

## Security

- No wildcard permissions
- Validate all inputs
- Never expose secrets

## Performance

- Minimize IPC
- Optimize startup
- Keep bundle size small

## Distribution

- Signed binaries
- Reproducible builds
- Safe auto-updates
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build or change in the Tauri app.]

Why it matters:
[Explain the goal, risk, or outcome.]

Where this applies:
[Target OS, environment, and constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Add a secure Rust command to read files from a user-selected directory and return parsed metadata to the frontend.

Why it matters:
This app replaces an Electron tool and must reduce attack surface while maintaining functionality.

Where this applies:
A cross-platform Tauri app targeting macOS and Windows.

When this is needed:
Before the first public beta release.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces security and architectural discipline
- **What → Why** ensures features serve real goals
- **Where → When** calibrates risk, permissions, and polish

> **Electron optimizes convenience. Tauri optimizes correctness. Context makes
> that difference real.**

---

Happy Tauri Building 🦀🖥️🚀
