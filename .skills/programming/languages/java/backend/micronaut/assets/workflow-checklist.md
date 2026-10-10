# Micronaut Best Practices: Workflow Checklist

A practical run sheet for applying [Micronaut Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Application & Bootstrapping: **@MicronautTest for tests; pure DI wiring in the runtime:**
- [ ] 1. Application & Bootstrapping: **Micronaut.run() from a @Application-annotated main; the composition root is build-time discovered.**
- [ ] 2. Routing & Handlers: **@Controller classes with @Get/@Post/@Put/@Delete methods** — one resource per controller:
- [ ] 2. Routing & Handlers: **@PathVariable/@QueryValue/@Header/@Body typed parameters — validation runs at the boundary.**
- [ ] 3. Dependency Injection: **Constructor injection everywhere**; beans assembled by the compile-time graph:
- [ ] 3. Dependency Injection: **@Factory for beans that need post-processing (HTTP clients, clients-of-external-API):**
- [ ] 4. Configuration: **Typed config via @ConfigurationProperties (or @Configuration + @Value scoped):**
- [ ] 4. Configuration: **@ConfigurationProperties bean injected once; @Value("${app.retries}") for the odd scalar only.**
- [ ] 5. Validation & Error Handling: **Bean Validation (@Valid, @NotBlank, @Size) at the request boundary (see @Valid CreateUser); @NotNull in services:**
- [ ] 5. Validation & Error Handling: **Custom error mapping via @Error/@ExceptionHandler:**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
