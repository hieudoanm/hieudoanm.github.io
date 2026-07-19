# Workflow notes

Focused reference for **auth-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`jwt` strategy: stateless, edge-compatible, session data in a signed JWT; `database`: falls back to a DB session row:**

```ts
session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
```

- **JWT = suitable for short-lived, role-light sessions; DB = durable roles/permissions/revocation.**
- **`session.strategy` decision documented; migration escapes cost change it.**

---

## 3. Callbacks

- **Callbacks are the translation layer — attach minimal identity:**

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) token.role = user.role;
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
},
```

- **No sensitive material (tokens, emails for non-consenting contexts) in session.**
- **Token refreshing (`token.exp`) respected; `authorized` middleware for route-raising.**

---
