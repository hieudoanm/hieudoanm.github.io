# Docker Compose Best Practices: Workflow Checklist

A practical run sheet for applying [Docker Compose Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Service organization** — organize services by function
- [ ] 1. Core Principles: **Environment separation** — separate dev, staging, and production configurations
- [ ] 2. Compose File Structure: **Compose Specification** — omit the obsolete top-level `version` field with Compose V2:
- [ ] 2. Compose File Structure: **Service definition** — define services clearly:
- [ ] 3. Service Configuration: **Build configuration** — configure build options:
- [ ] 3. Service Configuration: **Environment variables** — use environment variables:
- [ ] 4. Networking: **Service discovery** — use service names for discovery:
- [ ] 4. Networking: **Network isolation** — use separate networks:
- [ ] 5. Volume Management: **Named volumes** — use named volumes for persistence:
- [ ] 5. Volume Management: **Bind mounts** — use bind mounts for development:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
