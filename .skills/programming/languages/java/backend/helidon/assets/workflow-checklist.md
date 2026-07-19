# Helidon Best Practices: Workflow Checklist

A practical run sheet for applying [Helidon Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Starting Point (Helidon SE/Nima): **The default is Nima (virtual threads)** — imperative, easy-to-reason handlers over reactive complexity:
- [ ] 1. Starting Point (Helidon SE/Nima): **Handlers as small classes** implementing Handler:
- [ ] 2. Routing & Structure: **Routing built from composable Services, each owning a route family:**
- [ ] 2. Routing & Structure: **A Service implements update(Routing.Rules rules)** — rules.get("/{id}", handler).post("/", createHandler), so each service is one self-contained route table
- [ ] 3. Configuration: **Config.create()/@ConfigProperty is the only configuration source** — system property, env, application.yaml in one unified tree:
- [ ] 3. Configuration: **Typed reads** (config.get("x").asInt().asOptional()) at the boundary — typed and default-aware
- [ ] 4. Dependencies (SE) & CDI (MP): **SE is composition-friendly**: wire dependencies into handlers/services via constructors in the main bootstrap:
- [ ] 4. Dependencies (SE) & CDI (MP): **Availability in MP** @Inject/@ApplicationScoped; MP Inject/resource conventions apply
- [ ] 5. Errors & Validation: **Validate at the boundary; map to 400/404** explicitly:
- [ ] 5. Errors & Validation: **ExceptionMapper/ErrorHandler for the rest** — a domain exception becomes an HTTP response in one place

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
