# Osso Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Osso Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] SAML login flow works via Osso (SP-initiated) with one connection per customer
- [ ] IdP metadata stored/cached as data; rotation is a config op
- [ ] SCIM directory sync configured for user provisioning/deprovisioning
- [ ] Production deployment: Postgres + worker + TLS + admin access restricted
- [ ] Backups of connection DB + secrets; upgrade process rehearsed
- [ ] SAML/ACS endpoints rate-limited; assertions validated (`InResponseTo`)
- [ ] Certificate/metadata staleness monitored; no assertion or session logging

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
