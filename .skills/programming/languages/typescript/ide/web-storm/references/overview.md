# Overview

Focused reference for **webstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# WebStorm

WebStorm is JetBrains' JavaScript and TypeScript IDE, and the strongest one available: a Node debugger and CPU profiler built in, framework support for React, Vue, Angular, and Next.js that understands routing and data flow, and refactorings that follow modules across the project. Its main risk is **the IDE's TypeScript service drifting from the `tsconfig` the build actually uses**, which produces a confidently wrong check. Practical WebStorm work is about **letting `tsconfig.json` own type checking, keeping the interpreter and package manager aligned with the repo, and using the debugger and profiler instead of console logs**. Language rules live in typescript.md and javascript.md; Svelte and Nuxt work is covered in svelte.md and astro.md.

_Verified against WebStorm 2026.2.3 (September 2026) with TypeScript 7 support, Node LTS, and pnpm. React 19 support is current via the React Buddy plugin._

---

## 1. Editions & Node

- **WebStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **The Node interpreter must match the repo's version.** Let it read `.nvmrc`, `.node-version`, or `volta` from `package.json`; a hard-coded path or a system Node is how the IDE debugs a runtime you do not ship.
- **The package manager must match the lockfile** — pnpm, yarn, or npm. A mismatch is the usual reason `node_modules` disagrees with the IDE's resolution, and the IDE offers to switch; take its suggestion once, then keep it consistent.
- **The IDE version is not the TypeScript version.** The `tsc` that runs is the one from the project; the IDE's bundled service is for speed and must agree with it or its checks are advisory.

---
