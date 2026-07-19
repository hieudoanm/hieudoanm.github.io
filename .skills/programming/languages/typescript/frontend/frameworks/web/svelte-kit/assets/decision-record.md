# SvelteKit: Decision Record

Use this record when applying [SvelteKit](../SKILL.md) to a concrete project decision.

## Context

Best practices for building SvelteKit applications — server-first load functions, form actions, streaming, route groups, adapters, and the runes/SSR boundaries. Use when creating, structuring, or debugging a SvelteKit app.

SvelteKit is the application framework for Svelte: it provides **file-based routing, server-side load functions, form actions, and progressive enhancement**, with a build step that splits server code from client code for you. Its defining trait is that a page is a **server component first and a client component second** — data loading, mutations, and rendering all default to the server. Practical SvelteKit work is about **choosing the narrowest privilege for each route, keeping server-only code out of the client bundle, and treating the no-JavaScript path as a real requirement**. Component-level conventions live in svelte.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Project Structure
- [ ] 3. Rendering & Data Loading
- [ ] 4. Mutations & Form Actions
- [ ] 5. Hooks & Middleware
- [ ] 6. Adapters & Deployment
- [ ] 7. Performance
- [ ] 8. Styling

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
