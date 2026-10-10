# FastAPI Backend Best Practices: Validation Plan

Use this plan to verify work guided by [FastAPI Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Validate all input through Pydantic models** — path params, query params, and body all declared and validated
- [ ] **Use FastAPI security utilities** — OAuth2PasswordBearer, HTTPBearer, etc. for auth wiring:
- [ ] **Security-sensitive logic lives in the service layer**, not routes — routes only enforce the boundary
- [ ] **Never trust client data**; keep auth/authorization boundaries explicit (dependency-guarded, not inline checks)
- [ ] **Secrets via environment/config**, not code; use pydantic-settings for typed settings
- [ ] **Small, focused functions**; clear intention-revealing names; no side effects at import time
- [ ] **Stateless services where possible**; prefer composition over inheritance
- [ ] **Log at boundaries** — request start/end, outbound integration calls, errors; structured logs
- [ ] **Avoid clever Python tricks** in frameworks — readability wins for team-maintained code
- [ ] **Config in one place with environments** (dev, test, prod) — pydantic-settings + .env files, no os.getenv scattered in modules

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
