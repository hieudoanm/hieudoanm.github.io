# Osso Best Practices: Workflow Checklist

A practical run sheet for applying [Osso Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **SAML 2.0 IdP-initiated and SP-initiated** login handled centrally by Osso
- [ ] 1. Core Stack & Concepts: **IdP connections** modeled as data — each enterprise customer supplies their IdP metadata
- [ ] 2. Integration Patterns: **Initiate SP login to Osso**, which handles the IdP selection for the organization
- [ ] 2. Integration Patterns: **One connection per enterprise customer** — store/cache IdP metadata on their onboarding
- [ ] 3. Deployment & Operations: **Self-host with its required dependencies** (Postgres, mailer, worker) on stable infrastructure
- [ ] 3. Deployment & Operations: **TLS everywhere**; restrict administrative access
- [ ] 4. Security: **Keep metadata and certificates up to date per IdP** — expired certs = locked-out customers
- [ ] 4. Security: **Never log assertion payloads or session data**
- [ ] 5. General Rules of Thumb: **One SAML gateway for your entire SaaS** — enterprises connect to Osso, not to each service
- [ ] 5. General Rules of Thumb: **Connections are data** — on/offboard IdPs as config, never code

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
