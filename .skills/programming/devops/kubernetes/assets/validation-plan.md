# Kubernetes Best Practices: Validation Plan

Use this plan to verify work guided by [Kubernetes Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application and its deployment environment.
- Access to the relevant pipeline, infrastructure, or runtime configuration.

## Skill-specific review

- [ ] **Deployment specification** — define deployments properly:
- [ ] **Update strategy** — configure update strategies:
- [ ] **Replica management** — manage replicas appropriately:
- [ ] **Security contexts** — configure security contexts:
- [ ] **Network policies** — implement network policies:
- [ ] **RBAC** — implement role-based access control:
- [ ] **Prometheus integration** — configure Prometheus monitoring:
- [ ] **Logging configuration** — configure logging:

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
