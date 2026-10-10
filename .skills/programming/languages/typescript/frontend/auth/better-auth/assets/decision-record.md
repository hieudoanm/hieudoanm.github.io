# Better Auth Best Practices: Decision Record

Use this record when applying [Better Auth Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for authentication with Better Auth — the TypeScript-first auth library conventions for modern web apps. Use when writing, structuring, or reviewing Better Auth — covers plugins, database adapters, sessions, middleware, and security.

Better Auth is a **TypeScript-first, framework-agnostic auth library for modern web apps** (works with Next.js, SvelteKit, Hono, etc.) — **plugin ecosystem (emailPassword, socialProviders), database adapters, and a single typed betterAuth() server instance.** Practical Better Auth leans on **one typed auth instance per app with plugins declared for the real flows, a chosen database adapter with connected schema, sessions managed via cookies, and the instance shared across router/sub-routes** — the API surface is typed at the framework seam, not scattered string handlers.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Instance
- [ ] 2. Database & Adapters
- [ ] 3. Sessions & Cookies
- [ ] 4. Routing & Middleware
- [ ] 5. Client Integration
- [ ] 6. Security & Operations
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
