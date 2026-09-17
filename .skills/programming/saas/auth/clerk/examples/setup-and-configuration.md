# Clerk Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Clerk Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `<ClerkProvider>` at root; sign-in/up, profile, orgs using prebuilt components
- [ ] Server-side session/route protection; `userId` + claims read on the backend
- [ ] Webhooks (signature-verified) sync users/orgs to your data store
- [ ] Authorization from verified `sessionClaims`/org permissions, never client state
- [ ] MFA and rate limits configured for production
- [ ] Secrets server-side only; no token/secret logging
- [ ] Session expiry, refresh, sign-out handled via Clerk flows

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
