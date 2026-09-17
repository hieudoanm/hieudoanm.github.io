# Microservices Architecture Best Practices: Validation Plan

Use this plan to verify work guided by [Microservices Architecture Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Service-to-service authentication** — implement mTLS:
- [ ] **API security** — implement API keys, OAuth2, JWT
- [ ] **Network security** — implement service mesh for network security
- [ ] **Secrets management** — use secrets management service
- [ ] **Containerization** — containerize each service:
- [ ] **Orchestration** — use Kubernetes for orchestration:
- [ ] **CI/CD** — implement service-specific CI/CD pipelines
- [ ] **Blue-green deployment** — implement blue-green deployment strategy
- [ ] **Contract testing** — test service contracts:
- [ ] **Integration testing** — test service integration

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
