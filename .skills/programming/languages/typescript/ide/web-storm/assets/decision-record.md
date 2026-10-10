# WebStorm: Decision Record

Use this record when applying [WebStorm](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in WebStorm — TypeScript project config as the source of truth, the Node interpreter and package manager, React/Vue/Angular framework support, the JavaScript debugger and CPU profiler, and TypeScript 7. Use when setting up, debugging, or refactoring a TypeScript or JavaScript web project in WebStorm.

WebStorm is JetBrains' JavaScript and TypeScript IDE, and the strongest one available: a Node debugger and CPU profiler built in, framework support for React, Vue, Angular, and Next.js that understands routing and data flow, and refactorings that follow modules across the project. Its main risk is **the IDE's TypeScript service drifting from the tsconfig the build actually uses**, which produces a confidently wrong check. Practical WebStorm work is about **letting tsconfig.json own type checking, keeping the interpreter and package manager aligned with the repo, and using the debugger and profiler instead of console logs**. Language rules live in typescript.md and javascript.md; Svelte and N

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Editions & Node
- [ ] 2. TypeScript Project Config
- [ ] 3. Frameworks
- [ ] 4. Debugging & Profiling
- [ ] 5. Code Style & Quality
- [ ] 6. JetBrains Shared Conventions
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
