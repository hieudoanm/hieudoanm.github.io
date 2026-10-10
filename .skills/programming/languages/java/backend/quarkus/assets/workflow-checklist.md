# Quarkus Best Practices: Workflow Checklist

A practical run sheet for applying [Quarkus Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project & Platform Setup: **quarkus create app with the parent quarkus-bom pinned**; extensions from the platform catalog, not ad-hoc deps:
- [ ] 1. Project & Platform Setup: **Pick extensions deliberately** (quarkus-hibernate-orm-panache, quarkus-resteasy-reactive, quarkus-smallrye-health) — the extension catalog IS the architecture
- [ ] 2. Dependency Injection (ArC): **CDI beans with @ApplicationScoped/@Singleton chosen by state; constructor injection:**
- [ ] 2. Dependency Injection (ArC): **@Inject on fields is allowed but constructor injection reads better** for beans that need them:
- [ ] 3. REST Resources: **JAX-RS-ish @Path/@GET/@POST on resteasy-reactive — small controllers, one route family each:**
- [ ] 3. REST Resources: **Reactive Uni<T>/Multi<T> or imperative returns** — pick per endpoint; a REST boundary with blocking I/O under a reactive stack declares it (@Blocking when needed):
- [ ] 4. Configuration & Secrets: **application.properties is the tree; env maps the same keys** (OME_DB_URL → quarkus.datasource.jdbc.url style):
- [ ] 4. Configuration & Secrets: **Typed config via @ConfigProperty/@ConfigMapping** — @ConfigMapping for grouped, immutable settings:
- [ ] 5. Data Access (Panache): **Panache entity/repository = minimal boilerplate; the mapping layer stays thin:**
- [ ] 5. Data Access (Panache): **Repository form for imperfectly-shaped data** (@ApplicationScoped class UserRepository implements PanacheRepository<User>)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
