# Auth.js Best Practices: Workflow Checklist

A practical run sheet for applying [Auth.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup & Providers: **One auth config; providers declared for the flows that exist:**
- [ ] 1. Setup & Providers: **OAuth providers (+ scopes) minimal; Credentials only where a password flow truly exists (and rate-limited).**
- [ ] 2. Session Strategy: **jwt strategy: stateless, edge-compatible, session data in a signed JWT; database: falls back to a DB session row:**
- [ ] 2. Session Strategy: **JWT = suitable for short-lived, role-light sessions; DB = durable roles/permissions/revocation.**
- [ ] 3. Callbacks: **Callbacks are the translation layer — attach minimal identity:**
- [ ] 3. Callbacks: **No sensitive material (tokens, emails for non-consenting contexts) in session.**
- [ ] 4. Protection & Routing: **Edge protection via middleware/auth() at the layout level:**
- [ ] 4. Protection & Routing: **Route protection = guard at the boundary, not scattered if (session) in pages.**
- [ ] 5. Database Sessions & Adapters: **When DB sessions chosen, plug the adapter (Prisma/Drizzle):**
- [ ] 5. Database Sessions & Adapters: **Session table schema via the adapter; cleanup expired sessions via scheduled task.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
