# Auth.js Best Practices: Starter Template

A reusable starting point derived from the **3. Callbacks** section of [Auth.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
