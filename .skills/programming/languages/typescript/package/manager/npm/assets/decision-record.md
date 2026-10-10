# npm Best Practices: Decision Record

Use this record when applying [npm Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for the npm package manager and registry — dependency management conventions for JavaScript. Use when writing, structuring, or reviewing npm usage — covers package.json, lockfiles, scripts, publishing, scoping, and security.

npm is the **default package manager + registry for Node.js** — package.json declares the graph, package-lock.json pins it. Practical npm leans on **minimal, precise dependencies vs devDependencies, npm install determinism via the committed lockfile, --save-exact/workspaces discipline, and lifecycle through npm ci in CI** — the lockfile is the deployment artifact; the registry is upstream of trust (pin scopes/versions).

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. package.json
- [ ] 2. Lockfiles & Determinism
- [ ] 3. Scripts & Lifecycle
- [ ] 4. Workspaces & Monorepos
- [ ] 5. Publishing
- [ ] 6. Security & Audits
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
