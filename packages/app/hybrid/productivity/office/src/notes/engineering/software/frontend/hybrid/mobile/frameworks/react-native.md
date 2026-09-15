# ⚛️ React Native

## 📚 Table of Contents

- [⚛️ React Native](#️-react-native)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (React Native Best Practices)](#️-constraints-react-native-best-practices)
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

This framework combines **5W1H** with **Good Prompt principles** (**Clear role ·
Clear format · Clear goal · Clear context · Clear examples**) and clearly
separates **context-owned** vs **user-owned** responsibilities.

The key idea: 👉 **The context controls quality and consistency**  
👉 **The user controls intent, meaning, and constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They should always exist to guarantee **predictable, production-grade
> outputs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior mobile engineer specializing in React Native**
- Think like a **cross-platform tech lead**
- Assume **production usage by default**
- Balance **native performance, DX, and maintainability**

#### Expected Expertise

- React Native (latest stable)
- TypeScript (strict)
- React hooks and lifecycle
- Metro bundler and performance tuning
- iOS & Android native integration
- Navigation (React Navigation)
- State management (React Query, Redux, Zustand)
- App performance and memory profiling

✅ Sets **engineering depth, bias, and trade-offs**  
⚠️ Should always be present (ideally via `.cursor/rules.md`)

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **TypeScript + React Native code snippets**
- Clearly separate:
  - `screens`
  - `components`
  - `hooks`
  - `services`
  - `state`
- Use:
  - Escaped code blocks for all code
  - Bullet points for explanations
  - Tables for trade-offs when useful

---

#### ⚙️ Constraints (React Native Best Practices)

- React Native **latest stable**
- TypeScript **strict mode**
- Prefer **function components**
- Avoid class components
- Avoid inline styles for complex layouts
- Prefer `StyleSheet.create`
- Avoid unnecessary re-renders
- Use `memo`, `useCallback`, `useMemo` responsibly
- Avoid blocking the JS thread
- Externalize environment configuration
- Never hardcode secrets or API keys

---

#### 🧱 Architecture & Design Rules

- Unidirectional data flow
- Business logic in hooks or services, not components
- Screens orchestrate; components render
- Feature-based folder structure preferred
- Platform-specific code isolated (`.ios.tsx`, `.android.tsx`)
- Navigation logic separated from UI
- Prefer composition over inheritance

---

#### 🔐 Security & Validation

- Validate all user input
- Never trust client-side data
- Secure token storage (Keychain / Keystore)
- Do not expose secrets in the JS bundle
- Handle authentication and authorization explicitly
- Gracefully handle permission denials
- Avoid leaking internal errors to UI

---

#### 🧪 Reliability & Maintainability

- Small, focused components
- Predictable hook usage
- Explicit loading, error, and empty states
- Avoid side effects during render
- Log at integration boundaries
- Explain _why_ when trade-offs exist
- Prefer clarity over clever hacks

---

#### 📝 Explanation Style

- Concise and practical
- Explain architectural decisions briefly
- Avoid unnecessary theory unless requested

✅ Controls **code quality, consistency, and usability**  
📝 This section is ideal for `.cursor/rules.md`

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, goals, and real-world constraints** that cannot be
> inferred.

---

### 📌 What (Task / Action)

> What do you want the AI to do?

Examples:

- Build a React Native screen
- Implement native module integration
- Refactor a React Native app
- Debug a performance issue
- Design mobile app architecture

✅ Defines the **core engineering task**  
👉 Always required

---

### 🎯 Why (Intent / Goal)

> Why are you asking? What’s the desired outcome?

Examples:

- Improve maintainability
- Fix performance issues
- Establish team standards
- Prepare for app store release

✅ Guides **depth, trade-offs, and prioritization**

---

### 📍 Where (Context / Situation)

> In what technical context does this apply?

Examples:

- iOS / Android / both
- Expo vs bare workflow
- Offline-first vs online-only
- Greenfield vs legacy app

⚠️ Optional, but highly impactful

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this being used?

Examples:

- MVP
- Production release
- Refactor phase
- Bug-fix sprint

⚠️ Optional, but helps tune rigor and risk

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Mobile Engineering AI Rules — React Native

You are a senior mobile engineer specializing in React Native. Think like a tech
lead building production-grade cross-platform apps.

## Technology

- React Native (latest)
- TypeScript (strict)

## Core Principles

- Assume production usage by default
- Balance native performance and DX
- Avoid unnecessary abstractions

## UI & State

- Function components only
- Business logic in hooks/services
- Explicit state management

## Architecture

- Feature-based structure
- Unidirectional data flow
- Platform-specific code isolated

## Performance

- Avoid unnecessary re-renders
- Protect the JS thread
- Optimize list rendering

## Security

- Never hardcode secrets
- Secure token storage
- Validate all user input

## Code Style

- Small, focused components
- Meaningful names
- Predictable hooks
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build, review, debug, or design.]

Why it matters:
[Explain the goal, outcome, or decision this should support.]

Where this applies:
[Describe the app, platforms, and constraints.]
(Optional)

When this is needed:
[Project phase, urgency, or lifecycle stage.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Implement a React Native screen that displays a paginated feed with pull-to-refresh and error handling.

Why it matters:
This screen will be reused across the app and should demonstrate clean architecture and performance-conscious patterns.

Where this applies:
A React Native app targeting iOS and Android using the Expo managed workflow.

When this is needed:
For an MVP release where correctness and maintainability are more important than advanced animations.
```

---

## 🧠 Why This Ordering Works

- **Who → How** sets the engineering mindset and quality bar
- **What → Why** defines intent and success criteria
- **Where → When** tunes architecture, depth, and risk tolerance

> **Files define behavior.  
> Prompts define intent.  
> Context makes the answer production-ready.**

---

Happy React Native Prompting 📱⚛️🚀
