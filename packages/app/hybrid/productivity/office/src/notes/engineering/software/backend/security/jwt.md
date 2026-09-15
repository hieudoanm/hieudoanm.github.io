# 🧾 JSON Web Token (JWT)

## 📚 Table of Contents

- [🧾 JSON Web Token (JWT)](#-json-web-token-jwt)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (JWT Best-Practice Rules)](#️-constraints-jwt-best-practice-rules)
      - [🧱 Token Structure \& Semantics](#-token-structure--semantics)
      - [🔐 Claims, Signatures \& Algorithms](#-claims-signatures--algorithms)
      - [🧪 Validation, Rotation \& Operations](#-validation-rotation--operations)
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

This framework is **JWT-first** and optimized for **stateless token
validation**: API authentication, distributed systems, zero-trust backends, and
scalable authorization enforcement.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **JWT is NOT authentication**  
👉 **JWT is NOT authorization**  
👉 **JWT is a signed container for claims**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **secure, correct, production-grade JWT usage**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior backend / security engineer**
- Think in **threat models, trust boundaries, and failure modes**
- Assume **tokens can leak**
- Optimize for **verification correctness and blast-radius control**

#### Expected Expertise

- JWT specification (RFC 7519)
- JWS vs JWE
- Symmetric vs asymmetric signing
- Registered vs custom claims
- Token expiration and clock skew
- Key rotation (JWKS)
- JWT vs opaque tokens
- Common JWT vulnerabilities and misuses
- JWT usage within OAuth2 / OIDC

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Data-structure-level explanations
  - Clear distinction between **format** and **meaning**
- Explain:
  - _what_ a claim represents
  - _who_ issues the token
  - _who_ validates it
- Use:
  - Bullet points
  - Claim tables
  - Validation checklists

---

#### ⚙️ Constraints (JWT Best-Practice Rules)

- JWTs must be **signed** (never unsigned)
- Prefer **asymmetric algorithms** (RS256 / ES256)
- Never trust JWTs without verification
- Always validate:
  - signature
  - expiration
  - issuer
  - audience
- Keep tokens **short-lived**
- Do not store sensitive data in JWTs
- Do not treat JWTs as session storage
- Assume JWTs are bearer tokens

---

#### 🧱 Token Structure & Semantics

A JWT has **three parts**:

- **Header**
  - Algorithm (`alg`)
  - Key ID (`kid`)

- **Payload (Claims)**
  - Registered claims
  - Public claims
  - Private claims

- **Signature**
  - Cryptographic proof of integrity
  - Issuer authenticity

Conceptually:

- JWT = signed statement
- Signature = trust anchor
- Claims = assertions, not permissions

---

#### 🔐 Claims, Signatures & Algorithms

- **Registered Claims**
  - `iss` (issuer)
  - `sub` (subject)
  - `aud` (audience)
  - `exp` (expiration)
  - `iat` (issued at)
  - `nbf` (not before)

- **Custom Claims**
  - Roles
  - Scopes
  - Tenant IDs
  - Feature flags (carefully)

- **Algorithms**
  - RS256 / ES256 (recommended)
  - HS256 (shared-secret, high risk)
  - Never allow `none`

---

#### 🧪 Validation, Rotation & Operations

- Validate JWTs on **every request**
- Fetch signing keys via **JWKS**
- Support key rotation
- Handle clock skew safely
- Reject expired or malformed tokens
- Log validation failures
- Monitor token misuse patterns
- Separate token validation from business logic

---

#### 📝 Explanation Style

- Treat JWTs as **untrusted input**
- Explain claim meaning explicitly
- Call out misuse (e.g. “JWT = auth”)
- Avoid protocol confusion (OAuth2 / OIDC)
- Prefer correctness over convenience

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **business intent, token lifetime, and risk tolerance**.

---

### 📌 What (Task / Action)

Examples:

- Validate JWTs in a backend API
- Design JWT claims
- Choose signing algorithms
- Implement JWKS key rotation
- Review JWT security posture

---

### 🎯 Why (Intent / Goal)

Examples:

- Stateless authentication
- Scalable API security
- Reduce auth server coupling
- Improve performance
- Enforce zero-trust principles

---

### 📍 Where (Context / Situation)

Examples:

- Backend APIs
- API gateways
- Microservices
- Edge services
- Internal service-to-service calls

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial architecture
- Security hardening
- Token incident response
- Platform migration
- Compliance review

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in security docs or README)

```md
# Token Rules — JWT

You are working in a system that uses JWTs.

## Core Principles

- JWTs are signed claims containers
- JWTs are bearer tokens
- Never trust JWTs without validation

## Validation Rules

- Verify signature
- Validate issuer and audience
- Enforce expiration strictly

## Security

- Use asymmetric signing
- Rotate keys via JWKS
- Keep tokens short-lived
- Assume token leakage

## Architecture

- Issuer signs tokens
- Resource servers validate tokens
- Business logic never trusts raw claims
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the JWT usage or validation problem.]

Why it matters:
[Security, scalability, correctness.]

Where this applies:
[API, gateway, service, edge.]
(Optional)

When this is needed:
[Design, implementation, audit.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Validate JWT access tokens issued by an OAuth2 authorization server.

Why it matters:
We need stateless verification across multiple microservices.

Where this applies:
Internal APIs behind an API gateway.

When this is needed:
During platform security hardening.
```

---

## 🧠 Why This Ordering Works

- **Structure before usage** avoids protocol confusion
- **Validation before claims** prevents trust bugs
- **Security before convenience** reduces blast radius

> **JWT carries claims.  
> OAuth2 grants access.  
> OIDC defines identity.**

---

Use JWTs deliberately — they are powerful, sharp tools 🧾🔐
