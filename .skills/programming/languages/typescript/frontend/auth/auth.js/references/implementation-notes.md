# Implementation notes

Focused reference for **auth-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Protection & Routing

- **Edge protection via `middleware`/`auth()` at the layout level:**

```ts
export { auth as middleware } from "@/auth";

export const config = { matcher: ["/app/:path*"] };
```

- **Route protection = guard at the boundary, not scattered `if (session)` in pages.**
- **API routes with `auth()` wrapper; roles checked where required.**

---

## 5. Database Sessions & Adapters

- **When DB sessions chosen, plug the adapter (Prisma/Drizzle):**

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
NextAuth({ adapter: PrismaAdapter(prisma), ... });
```

- **Session table schema via the adapter; cleanup expired sessions via scheduled task.**
- **Credentials + DB strategy vs OAuth + JWT: choose the trust model per app, don't mix carelessly.**
