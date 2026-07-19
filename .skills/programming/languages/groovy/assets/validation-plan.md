# Groovy Best Practices: Validation Plan

Use this plan to verify work guided by [Groovy Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Groovy and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Direct Java interop is seamless — use typed collections where mixing:**
- [ ] **@Canonical/@TupleConstructor/@Immutable AST transforms over hand-built equals/toString.**
- [ ] **Late-bound method dispatch is dynamic — when perf matters, @CompileStatic the hot path.**
- [ ] **Threading: closures don't add thread-safety — synchronize/lock or use actors when shared state.**
- [ ] **Spock (Groovy's native BDD) or JUnit — Spock for expressive where: tables:**
- [ ] **Gradle test task wired; coverage (JaCoCo) gate for the pipeline.**
- [ ] **Formatting/static analysis (codenarc/spotbugs) in CI for the Groovy sources.**

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
