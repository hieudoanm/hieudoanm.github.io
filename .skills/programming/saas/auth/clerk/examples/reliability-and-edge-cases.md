# Clerk Best Practices: 4. Security & Operations

## Scenario

A project is working on **4. security & operations** for Clerk Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Rate limits / MFA** configured in the Clerk dashboard; enforce for sensitive actions
- **Never log tokens, session cookies, or webhook secrets**
- Store `CLERK_SECRET_KEY` server-side only
- Keep session rotation/fresh behavior to Clerk; don't hand-roll token refresh
- Handle **session expiration and sign-out flows** cleanly in the UI

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Security & Operations** section of [SKILL.md](../SKILL.md).
