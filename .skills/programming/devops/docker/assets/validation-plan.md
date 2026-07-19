# Docker Best Practices: Validation Plan

Use this plan to verify work guided by [Docker Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **Use minimal base images** — prefer Alpine or distroless:
- [ ] **Run as non-root user** — avoid running as root:
- [ ] **Scan for vulnerabilities** — use security scanning tools:
- [ ] **Don't include secrets** — never include secrets in images:
- [ ] **Container testing** — test containers:
- [ ] **Integration testing** — test with Docker Compose:
- [ ] **Structured logging** — use structured logging:
- [ ] **Log aggregation** — configure log drivers:

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
