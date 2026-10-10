# Implementation notes

Focused reference for **better-auth-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Routing & Middleware

- **Wire the route handler in the server entry (framework binds it):**

```ts
// Next.js app route
import { auth } from "@/auth";
export { GET, POST } from "better-auth/api-handler";  // framework-adapted
```

- **Guard pages via the framework middleware/loader calling `auth.api.getSession()`.**
- **Roles/permissions via `auth.api` scoped IP — checked at the boundary.**

---

## 5. Client Integration

- **Client hooks (`createAuthClient`) typed against the server instance:**

```ts
import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient();
// await authClient.signUp.email(...), signIn, signOut
```

- **Morgan pattern: `authClient.use` middleware for auth UI states; SSR fetch with cookie forwarding.**
- **No provider-leaked secrets; client payloads stay minimal.**
