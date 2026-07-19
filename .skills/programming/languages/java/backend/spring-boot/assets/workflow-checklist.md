# Spring Boot Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Spring Boot Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Java **17**; Spring Boot **3.x**; Spring MVC for REST APIs; Spring Data JPA for persistence
- [ ] 1. Core Stack & Constraints: Jakarta Validation (Bean Validation) for input validation
- [ ] 2. Layering & Structure: **Separate layers with one responsibility** — controller, service, repository, domain/entity:
- [ ] 2. Layering & Structure: **Controllers are thin** — accept a request DTO, call a service, return a response DTO; no business logic
- [ ] 3. Dependency Injection: **Constructor injection over field injection** — @RequiredArgsConstructor-style (or explicit constructor) DI:
- [ ] 3. Dependency Injection: **Avoid @Autowired on fields** and static access to Spring beans — constructor injection makes dependencies explicit and testable
- [ ] 4. DTOs at Every API Boundary: **Never expose entities directly** — request/response DTOs are the contract:
- [ ] 4. DTOs at Every API Boundary: **Controllers map DTO → service → DTO** — entities stay inside the persistence/service layers
- [ ] 5. Validation: **Combine Bean Validation with DTOs** — @Valid on the controller parameter, constraints on the record:
- [ ] 5. Validation: **Fail fast on invalid input** — validation happens at the boundary before any service work

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
