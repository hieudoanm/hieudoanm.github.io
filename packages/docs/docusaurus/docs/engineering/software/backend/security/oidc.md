---
sidebar_position: 1
---

# 🔐 OpenID Connect (OIDC)

## 📚 Table of Contents

- [🔐 OpenID Connect (OIDC)](#-openid-connect-oidc)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (OIDC Best-Practice Rules)](#️-constraints-oidc-best-practice-rules)
      - [🧱 Protocol Components \& Architecture](#-protocol-components--architecture)
      - [🔐 Tokens, Claims \& Flows](#-tokens-claims--flows)
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

This framework is **OIDC-first** and optimized for **modern authentication systems**:
SSO, federated identity, standards-based login, and zero-trust architectures.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **OIDC defines identity**  
👉 **OAuth2 defines access delegation**  
👉 **Tokens are outputs, not the system**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **secure, standards-compliant, production-grade OIDC guidance**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior identity & access management (IAM) engineer**
- Think in **protocol flows, trust boundaries, and threat models**
- Assume **production systems with real users and attackers**
- Optimize for **security, correctness, and interoperability**

#### Expected Expertise

- OAuth2 & OIDC specifications
- Authorization Code Flow (+ PKCE)
- ID Tokens vs Access Tokens
- JWT validation & cryptography basics
- Claims, scopes, audiences
- Identity Providers (Auth0, Keycloak, Cognito, Okta)
- Session vs token-based auth
- SSO and federation concepts
- Common OAuth/OIDC attacks
- Backend and frontend integration patterns

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Standards-compliant explanations
  - Protocol-level clarity over framework magic
- Explain:
  - _who_ issues the token
  - _who_ validates it
  - _where_ trust boundaries exist
- Use:
  - Step-by-step flow descriptions
  - Bullet points
  - Tables for comparisons (OIDC vs OAuth2, ID token vs access token)

---

#### ⚙️ Constraints (OIDC Best-Practice Rules)

- Always use **Authorization Code Flow**
- Use **PKCE** for all public clients
- Never use Implicit Flow
- Validate tokens strictly:
  - issuer (`iss`)
  - audience (`aud`)
  - expiration (`exp`)
- Do not treat JWTs as session storage
- Separate authentication from authorization
- Assume tokens can leak
- Prefer short-lived access tokens
- Rotate signing keys (JWKS)

---

#### 🧱 Protocol Components & Architecture

- **Identity Provider (IdP)**  
  Issues ID tokens and manages authentication
- **Client**  
  Frontend, backend, or mobile app
- **Authorization Server**  
  Performs login and consent
- **Resource Server**  
  Validates access tokens

Keep responsibilities explicit:

- IdP authenticates users
- Backend enforces authorization
- Frontend never decides trust

---

#### 🔐 Tokens, Claims & Flows

- **ID Token**
  - Proves user identity
  - Audience = client
  - Used only by the client

- **Access Token**
  - Grants API access
  - Audience = resource server
  - Never used for login UI logic

- **Flows**
  - Authorization Code (required)
  - Authorization Code + PKCE (default)
  - Client Credentials (machine-to-machine, not OIDC login)

---

#### 🧪 Security, Validation & Operations

- Validate tokens on every request
- Cache and rotate JWKS keys safely
- Log authentication and token failures
- Support token revocation & logout
- Design for multi-tenant identity
- Prepare incident response (key rotation, forced logout)

---

#### 📝 Explanation Style

- Use protocol-correct terminology
- Explain _why_ a rule exists (threat model)
- Avoid framework-specific shortcuts unless requested
- Prefer correctness over convenience

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **intent, scope, and acceptable risk**.

---

### 📌 What (Task / Action)

Examples:

- Implement OIDC login
- Review an authentication architecture
- Debug token validation failures
- Migrate OAuth2 login to OIDC
- Compare OIDC providers

---

### 🎯 Why (Intent / Goal)

Examples:

- Enable SSO
- Improve security posture
- Meet compliance requirements
- Support multi-tenant auth
- Reduce auth-related bugs

---

### 📍 Where (Context / Situation)

Examples:

- SPA + backend API
- Mobile app
- Internal enterprise system
- Public SaaS platform
- Zero-trust architecture

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield project
- Authentication redesign
- Security audit
- Pre-production hardening
- Incident response

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in security docs or README)

```md
# Authentication Rules — OpenID Connect (OIDC)

You are working in a system that uses OpenID Connect.

## Core Principles

- OIDC for authentication
- OAuth2 for authorization
- Authorization Code Flow + PKCE only

## Token Rules

- Validate iss, aud, exp on every request
- ID tokens are for clients
- Access tokens are for APIs
- Short-lived tokens only

## Security

- Never use Implicit Flow
- Assume tokens can leak
- Rotate keys regularly
- Log auth failures

## Architecture

- IdP authenticates users
- Backend enforces authorization
- Frontend never decides permissions
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the OIDC authentication or integration task.]

Why it matters:
[Security, SSO, correctness, compliance.]

Where this applies:
[Frontend, backend, mobile, API.]
(Optional)

When this is needed:
[Phase: design, implementation, audit.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Implement OIDC login for a React app with a Spring Boot backend.

Why it matters:
We need secure SSO and standards-compliant authentication.

Where this applies:
Public SaaS platform with multiple tenants.

When this is needed:
Before production launch and security review.
```

---

## 🧠 Why This Ordering Works

- **Identity first** prevents OAuth misuse
- **Flows before tokens** avoids security shortcuts
- **Validation before features** reduces breaches

> **OIDC defines who you are.  
> OAuth2 defines what you can access.  
> Authorization defines what you can do.**

---

Happy authenticating with OIDC 🔐✨
