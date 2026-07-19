# .NET Best Practices: Workflow Checklist

A practical run sheet for applying [.NET Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Solution & Project Layout: **One responsibility per project; a solution groups them by concern:**
- [ ] 1. Solution & Project Layout: **Keep Core free of infrastructure** — no DbContext, HttpClient, or ASP.NET types; the domain is testable without a server
- [ ] 2. Dependency Injection & Composition Root: **One composition root** (Program.cs for web; Main/host builder for services); register collaborations there:
- [ ] 2. Dependency Injection & Composition Root: **Register by interface at the seam** — consumers depend on abstractions, composition supplies the concrete
- [ ] 3. Configuration: **Typed options bound from appsettings/environment** — IConfiguration is the boundary, IOptions<T> the contract:
- [ ] 3. Configuration: **Read via IOptions<T>/IOptionsMonitor<T>**; validate at startup (ValidateDataAnnotations/IValidateOptions) so a misconfigured deploy fails fast
- [ ] 4. Logging & Observability: **Structured logging via ILogger<T>** — never Console.WriteLine; the log event carries properties, not prose:
- [ ] 4. Logging & Observability: **LoggerMessage source generators for hot paths** ([LoggerMessage] partial methods) avoid allocation and lock format drift
- [ ] 5. Hosting & Lifecycle: **Generic Host (WebApplicationBuilder/Host) for all services** — DI, config, logging, health checks, IHostedService in one shell:
- [ ] 5. Hosting & Lifecycle: **BackgroundService/IHostedService for queues/cron-like work** — graceful shutdown is the framework's contract, don't re-implement it

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
