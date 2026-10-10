# Groovy Best Practices: Decision Record

Use this record when applying [Groovy Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for scripting and JVM automation with Groovy — the dynamic-JVM conventions for build scripts, pipelines, and DSLs. Use when writing, structuring, or reviewing Groovy — covers typing, closures, GDK, builders, Gradle/Jenkins scripts, and integration with Java.

Groovy is a **dynamic language for the JVM** — Java-compatible syntax with closures, the GDK (map/collection sugar), and powerful DSL/builder idioms. Practical Groovy leans on **optional typing with explicit def/types where it matters, closures for control flow, maps/lists-first data ([:]/[]), and builders/DSLs reserved for their named purpose** (Gradle/Jenkins scripts), while staying conservative: Groovy seduces with sugar, and sugar-debt creeps fast.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Groovy and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Typing & Style
- [ ] 2. Closures & Collections
- [ ] 3. Builders & DSLs
- [ ] 4. Gradle & Jenkins Scripts
- [ ] 5. Interop & Performance
- [ ] 6. Testing & Tooling
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
