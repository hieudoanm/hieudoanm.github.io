# 🔑 OAuth 2.0

## 📚 Table of Contents

- [🔑 OAuth 2.0](#-oauth-20)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (OAuth2 Best-Practice Rules)](#️-constraints-oauth2-best-practice-rules)
      - [🧱 Protocol Components \& Architecture](#-protocol-components--architecture)
      - [🔐 Tokens, Scopes \& Grant Types](#-tokens-scopes--grant-types)
      - [🧪 Security, Validation \& Operations](#-security-validation--operations)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in security docs or README)](#1️⃣-persistent-context-put-in-security-docs-or-readme)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **OAuth2-first** and optimized for **delegated
authorization**: API access control, third-party integrations,
service-to-service security, and zero-trust systems.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **OAuth2 does NOT define identity**  
👉 **OAuth2 defines how access is granted**  
👉 **Scopes + audiences define power**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **secure, standards-compliant, production-grade OAuth2 guidance**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior security / IAM / backend engineer**
- Think in **trust boundaries, threat models, and API contracts**
- Assume **distributed systems and hostile networks**
- Optimize for **least privilege, revocability, and correctness**

#### Expected Expertise

- OAuth 2.0 core specification (RFC 6749)
- Grant types and their trade-offs
- Access tokens vs refresh tokens
- Scopes, audiences, and consent
- Token introspection & revocation
- JWT vs opaque tokens
- API gateway & backend enforcement
- Common OAuth2 attacks and mitigations
- Integration with OIDC (but not conflating them)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Protocol-level explanations
  - Clear separation of responsibilities
- Explain:
  - _who_ is delegating access
  - _what_ is being accessed
  - _why_ a grant type is chosen
- Use:
  - Flow diagrams (conceptually)
  - Bullet points
  - Tables for grant comparisons

---

#### ⚙️ Constraints (OAuth2 Best-Practice Rules)

- Use **Authorization Code Flow** for user-based access
- Use **PKCE** for public clients
- Never use Implicit Flow
- Scopes must be **minimal and explicit**
- Access tokens must be **audience-restricted**
- Prefer **short-lived access tokens**
- Use refresh tokens carefully
- Do not embed authorization logic in the client
- Assume access tokens can leak

---

#### 🧱 Protocol Components & Architecture

- **Resource Owner**  
  Owns the data (user or system)
- **Client**  
  Requests access on behalf of the resource owner
- **Authorization Server**  
  Issues tokens after consent
- **Resource Server**  
  Validates tokens and enforces scopes

Clear separation:

- OAuth2 grants access
- APIs enforce authorization
- Clients never self-authorize

---

#### 🔐 Tokens, Scopes & Grant Types

- **Access Token**
  - Represents delegated permission
  - Sent to resource servers
  - Scoped and audience-limited

- **Refresh Token**
  - Used to obtain new access tokens
  - Must be stored securely
  - High-risk if leaked

- **Grant Types**
  - Authorization Code (user + browser)
  - Authorization Code + PKCE (default)
  - Client Credentials (service-to-service)
  - Device Code (TV / CLI)
  - Refresh Token (renewal only)

---

#### 🧪 Security, Validation & Operations

- Validate access tokens on every request
- Enforce scopes and audience strictly
- Revoke compromised tokens
- Rotate signing keys
- Log authorization failures
- Monitor unusual token usage
- Design for token expiration and renewal
- Separate auth server outages from API availability

---

#### 📝 Explanation Style

- Use OAuth2-correct terminology
- Explain _why_ a grant exists
- Call out misuse explicitly
- Avoid identity language unless discussing OIDC
- Prefer security clarity over developer convenience

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **business intent, risk tolerance, and system shape**.

---

### 📌 What (Task / Action)

Examples:

- Secure an API using OAuth2
- Choose the correct grant type
- Design scopes for a service
- Review OAuth2 implementation
- Integrate third-party API access

---

### 🎯 Why (Intent / Goal)

Examples:

- Protect APIs
- Enable third-party integrations
- Enforce least privilege
- Support zero-trust architecture
- Meet compliance requirements

---

### 📍 Where (Context / Situation)

Examples:

- Backend APIs
- API gateway
- Microservices
- Mobile or SPA clients
- Machine-to-machine systems

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial system design
- Security hardening
- Platform migration
- Pre-production review
- Incident response

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in security docs or README)

```md
# Authorization Rules — OAuth 2.0

You are working in a system that uses OAuth 2.0.

## Core Principles

- OAuth2 is for authorization
- OIDC is for authentication
- Least privilege via scopes

## Token Rules

- Validate audience and scope
- Short-lived access tokens
- Refresh tokens handled securely

## Security

- Authorization Code + PKCE only
- Never use Implicit Flow
- Assume token leakage
- Rotate keys and revoke aggressively

## Architecture

- Auth server issues tokens
- Resource servers enforce access
- Clients never self-authorize
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the OAuth2 authorization problem or design.]

Why it matters:
[Security, access control, compliance.]

Where this applies:
[API, gateway, service-to-service, client.]
(Optional)

When this is needed:
[Design, implementation, audit.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Design OAuth2 scopes for a public REST API.

Why it matters:
We need fine-grained access control for third-party developers.

Where this applies:
Public SaaS API behind an API gateway.

When this is needed:
During initial platform security design.
```

---

## 🧠 Why This Ordering Works

- **Authorization first** avoids identity confusion
- **Scopes before tokens** enforces least privilege
- **Architecture before code** prevents insecure shortcuts

> **OAuth2 defines access.  
> OIDC defines identity.  
> Authorization defines power.**

---

Happy securing APIs with OAuth 2.0 🔑🛡️
