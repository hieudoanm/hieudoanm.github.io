# Keycloak Best Practices: 3. Realm & Client Configuration

## Scenario

A project is working on **3. realm & client configuration** for Keycloak Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **One realm per environment/tenant** — dev/stage/prod isolated
- **Clients with least privilege**: correct access type (public/confidential), minimal redirect URIs, scoped roles
- Use **service accounts + `client_credentials`** for server-to-server
- **PKCE required** for public clients (native/SPA)
- Apply **custom password policies, MFA (OTP/WebAuthn)** per realm requirements
- Enable **brute-force protection** per realm for login flows

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Realm & Client Configuration** section of [SKILL.md](../SKILL.md).
