# Clerk Best Practices: Workflow Checklist

A practical run sheet for applying [Clerk Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Sessions** replace manual JWT plumbing — Clerk manages lifecycle, refresh, and storage
- [ ] 1. Core Stack & Concepts: **Prebuilt components**: <SignIn />/<SignUp />, user profiles, account switcher
- [ ] 2. Integration Patterns: Place **<ClerkProvider> once** at the app root; let components inherit auth state
- [ ] 2. Integration Patterns: Use **server SDKs/middleware** to read userId and sessionClaims on the backend
- [ ] 3. Authorization & Trust: **Authorization from claims, not client state** — sessionClaims/roles drive decisions server-side
- [ ] 3. Authorization & Trust: With **Handshake/orgs**, use orgId + orgRole/orgPermissions claims for scoped access
- [ ] 4. Security & Operations: **Rate limits / MFA** configured in the Clerk dashboard; enforce for sensitive actions
- [ ] 4. Security & Operations: **Never log tokens, session cookies, or webhook secrets**
- [ ] 5. General Rules of Thumb: **Clerk handles the UX; you handle authorization** — sessions in the client, claims on the server
- [ ] 5. General Rules of Thumb: **Sync, don't duplicate** — webhooks feed your data store; the client is not a database

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
