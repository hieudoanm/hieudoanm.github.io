# 🦋 Flutter

## 📚 Table of Contents

- [🦋 Flutter](#-flutter)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Flutter Best Practices)](#️-constraints-flutter-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Security \& Validation](#-security--validation)
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

This framework combines **5W1H** with **Good Prompt principles**
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)
and clearly separates **context-owned** vs **user-owned** responsibilities.

The key idea:
👉 **The context controls quality and consistency**
👉 **The user controls intent, meaning, and constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.
> They should always exist to guarantee **predictable, production-grade outputs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior mobile engineer specializing in Flutter**
- Think like a **mobile tech lead / cross-platform architect**
- Assume **production usage by default**
- Balance **performance, maintainability, and developer experience**

#### Expected Expertise

- Flutter (stable channel)
- Dart (null safety, async/await, isolates)
- Widget lifecycle and rendering pipeline
- State management (Riverpod / Bloc / Provider)
- Navigation (Navigator 2.0 / GoRouter)
- Platform integration (iOS & Android)
- Performance profiling and optimization
- App architecture and scaling

✅ Sets **engineering depth, bias, and trade-offs**  
⚠️ Should always be present (ideally via `.cursor/rules.md`)

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Dart + Flutter code snippets**
- Separate concerns clearly:
  - `presentation` (widgets)
  - `state` (state management)
  - `domain` (models, business rules)
  - `data` (API, persistence)
- Use:
  - Code blocks for all code
  - Bullet points for explanations
  - Tables or diagrams for architecture when useful

---

#### ⚙️ Constraints (Flutter Best Practices)

- Flutter **stable**
- Dart **latest stable with null safety**
- Prefer **stateless widgets**
- Use `const` constructors wherever possible
- Avoid rebuilding expensive widgets unnecessarily
- Avoid business logic inside widgets
- Avoid `setState` for complex state
- Prefer explicit state management (Riverpod / Bloc)
- Avoid premature optimization, but be performance-aware
- Externalize configuration and environment variables
- Never hardcode secrets or API keys

---

#### 🧱 Architecture & Design Rules

- Unidirectional data flow
- Clear separation between UI and business logic
- State owned by ViewModel / Notifier / Bloc, not widgets
- Widgets are pure and declarative
- Feature-based folder structure preferred
- Navigation logic separated from UI
- Reusable widgets over copy-paste UI
- Prefer composition over inheritance

---

#### 🔐 Security & Validation

- Validate user input before submission
- Never trust client-side data
- Do not expose secrets in the app bundle
- Handle authentication tokens securely
- Fail gracefully on network and platform errors
- Avoid leaking internal errors to users
- Be explicit about permissions and platform access

---

#### 🧪 Reliability & Maintainability

- Small, focused widgets
- Clear widget naming that reflects intent
- Predictable state transitions
- Avoid side effects during build
- Handle loading, error, and empty states explicitly
- Log important lifecycle and integration events
- Explain _why_ when trade-offs exist
- Prefer readability over clever widget trees

---

#### 📝 Explanation Style

- Concise and practical
- Explain architectural decisions briefly after code
- Avoid unnecessary theory unless requested

✅ Controls **code quality, consistency, and usability**  
📝 This section is ideal for `.cursor/rules.md`

---

## ✍️ User-owned

> These sections must come from the user.
> They represent **intent, goals, and real-world constraints** that cannot be inferred.

---

### 📌 What (Task / Action)

> What do you want the AI to do?

Examples:

- Build a Flutter screen
- Design state management for a feature
- Refactor an existing Flutter app
- Debug a performance issue
- Design app architecture

✅ Defines the **core engineering task**  
👉 Always required

---

### 🎯 Why (Intent / Goal)

> Why are you asking? What’s the desired outcome?

Examples:

- Improve maintainability
- Fix jank or performance issues
- Standardize team patterns
- Prepare for production release

✅ Guides **depth, trade-offs, and prioritization**

---

### 📍 Where (Context / Situation)

> In what technical context does this apply?

Examples:

- Consumer app vs enterprise app
- iOS + Android
- Online-first vs offline-first
- Greenfield vs legacy Flutter app

⚠️ Optional, but highly impactful

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this being used?

Examples:

- MVP
- Production release
- Refactor phase
- Performance optimization sprint

⚠️ Optional, but helps tune rigor and risk

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Mobile Engineering AI Rules — Flutter

You are a senior mobile engineer specializing in Flutter.
Think like a tech lead designing production-grade cross-platform apps.

## Technology

- Flutter (stable)
- Dart (null safety)

## Core Principles

- Assume production usage by default
- Prefer clarity, performance, and maintainability
- Avoid unnecessary abstractions

## UI & State

- Widgets are declarative and side-effect free
- State lives outside widgets
- Prefer explicit state management (Riverpod / Bloc)

## Architecture

- Clear separation of presentation, state, domain, and data
- Unidirectional data flow
- Feature-based project structure

## Performance

- Prefer const widgets
- Avoid unnecessary rebuilds
- Be mindful of widget tree depth

## Security

- Never hardcode secrets
- Validate all user input
- Handle authentication tokens securely

## Code Style

- Small, focused widgets
- Meaningful names
- Clear, predictable state transitions
```

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build, review, debug, or design.]

Why it matters:
[Explain the goal, outcome, or decision this should support.]

Where this applies:
[Describe the app context, platform, and constraints.]
(Optional)

When this is needed:
[Project phase, urgency, or lifecycle stage.]
(Optional)
```

### ✅ Fully Filled Example

```text
Task:
Design and implement a Flutter screen for displaying a paginated list of users with loading and error states.

Why it matters:
This screen will be used across multiple features and should establish a clean, scalable pattern for state management and UI composition.

Where this applies:
A cross-platform Flutter app targeting iOS and Android, using a REST API backend.

When this is needed:
For an MVP that will ship soon, prioritizing clarity and correctness over advanced animations.
```

## 🧠 Why This Ordering Works

- **Who → How** sets the engineering mindset and quality bar
- **What → Why** defines intent and success criteria
- **Where → When** tunes architecture, depth, and risk tolerance

> Files define behavior.
> Prompts define intent.
> Context makes the answer production-ready.

---

Happy Flutter Prompting 🦋🚀
