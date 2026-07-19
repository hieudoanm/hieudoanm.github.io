# Overview

Focused reference for **express-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Express.js Backend Best Practices

Express is the minimal, battle-tested Node.js web framework: routing, middleware, and a tiny core, with everything else composed from the ecosystem. Best practice is about _structure and discipline_ — Express gives you almost no guardrails, so the value is in consistent project layout, middleware order, async-safe handlers, centralized error handling, and boundary validation.

---

## 1. Core Stack

- `express` — router/handler framework (`express@5` for current releases; promises errors flow to the error middleware automatically)
- `zod` — request validation at the boundary (see §5)
- `pino` (+ `pino-http`) — structured request/error logging
- `helmet` — security headers; `cors` — controlled cross-origin access
- `supertest` — integration-testing the HTTP server in-process

```bash
pnpm add express zod pino pino-http helmet cors
pnpm add -d @types/express supertest
```

---

## 2. Project Layout

```txt
src/
├── app.ts              # exports the Express app (no listen) — the testable unit
├── server.ts           # imports app.ts, builds server, listens (entrypoint only)
├── config.ts            # typed env/config parsing, validated once at boot
├── middleware/
│   ├── error.ts        # error handler (last middleware)
│   └── request.ts      # logging, body parsing, request-id
├── routes/             # one router file per resource
│   ├── health.ts
│   └── users.ts
├── services/           # business logic, no HTTP imports
├── schemas/            # zod schemas for routes/domains
└── db/                 # data access (Prisma/Drizzle/raw) — see orm/ skills
```

- **`app.ts` builds the app; `server.ts` only `listen()`s** — integration tests import `app.ts` and use `supertest` without binding a port.
- **Router per resource** (`express.Router()` in `routes/users.ts`), mounted under `/api/v1` — routes stay short and namespaced.
- **Services never import Express types** — plain functions/classes returning domain values; the route layer translates HTTP ⇄ domain (see §6).

---

## 3. Middleware & Ordering
