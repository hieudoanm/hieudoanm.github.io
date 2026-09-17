# Better Auth Best Practices: Workflow Checklist

A practical run sheet for applying [Better Auth Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Instance: **One betterAuth() server config; types exported for the client:**
- [ ] 1. Core Instance: **Plugins on/off per flow: emailAndPassword.enabled, socialProviders, twoFactor, admin.**
- [ ] 2. Database & Adapters: **Setup the adapter + schema (Prisma/Drizzle/Kysely):**
- [ ] 2. Database & Adapters: **Run schema migrations (better-auth will surface the generated schema); sessions/users/tokens tables versioned.**
- [ ] 3. Sessions & Cookies: **Sessions via signed cookies by default; options tuned:**
- [ ] 3. Sessions & Cookies: **Cookie attributes secure/HttpOnly honored by the framework's default handler.**
- [ ] 4. Routing & Middleware: **Wire the route handler in the server entry (framework binds it):**
- [ ] 4. Routing & Middleware: **Guard pages via the framework middleware/loader calling auth.api.getSession().**
- [ ] 5. Client Integration: **Client hooks (createAuthClient) typed against the server instance:**
- [ ] 5. Client Integration: **Morgan pattern: authClient.use middleware for auth UI states; SSR fetch with cookie forwarding.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
