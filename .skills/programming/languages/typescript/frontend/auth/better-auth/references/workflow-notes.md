# Workflow notes

Focused reference for **better-auth-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Setup the adapter + schema (Prisma/Drizzle/Kysely):**

```ts
import { prismaAdapter } from "better-auth/adapters/prisma";
database: prismaAdapter(prisma, { provider: "postgresql" })
```

- **Run schema migrations (`better-auth` will surface the generated schema); sessions/users/tokens tables versioned.**
- **Conditional adapters documented by engine (sqlite/postgres) — behavior parity checked.**

---

## 3. Sessions & Cookies

- **Sessions via signed cookies by default; options tuned:**

```ts
session: {
  cookieCache: { enabled: true },   // edge-friendly caching
  expiresIn: 60 * 60 * 24 * 7,
}
```

- **Cookie attributes secure/HttpOnly honored by the framework's default handler.**
- **Session revocation on logout/password change; expiry/refresh fit the app's trust posture.**

---
