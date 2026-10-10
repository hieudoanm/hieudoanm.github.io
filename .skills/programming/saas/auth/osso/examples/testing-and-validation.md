# Osso Best Practices: Overview

## Scenario

A project is working on **overview** for Osso Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Osso is an open-source, self-hosted SAML SSO service for B2B SaaS products — the "Auth0 for enterprise on your own infra." Best practice is treating it as an internal identity gateway: SAML termination handled by a single service, IdP connections managed as data, and directory users synced via SCIM for upstream apps like Okta/Azure AD.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
