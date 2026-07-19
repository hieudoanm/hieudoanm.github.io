# OneLogin Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for OneLogin Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Apps registered with correct SP/ACS metadata; certificates tracked for expiry
- [ ] SAML assertions validated (signature, audience, `InResponseTo`)
- [ ] Groups mapped to authorization claims server-side
- [ ] MFA/smart policies enabled; ACS endpoints rate-limited
- [ ] SCIM provisioning configured; deprovisioning cascades to your app
- [ ] Local token validation; no assertion/token logging
- [ ] IdP outage rehearsed; sync and login failures monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
