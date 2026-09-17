# .NET Best Practices: Validation Plan

Use this plan to verify work guided by [.NET Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Layered test projects mirroring src** (tests/*.Tests) — contract coverage at each boundary:
- [ ] **WebApplicationFactory<T> for integration tests** — in-memory server, no real sockets; override config/EF with an in-memory or test provider:
- [ ] **Fakes at the seams (IUserRepository, IHttpClientFactory/typed clients) over mock-everything.**
- [ ] **Cover the contract**: success, validation failure, not-found, cancellation, error mapping — at the service boundary
- [ ] **Container image from dotnet publish output, non-root, USER app,** multi-stage build; EXPOSE and healthcheck wired
- [ ] **Environment-specific config via settings + env overrides**, never code forks
- [ ] **Graceful shutdown**: host stops, pending requests drain (IHostApplicationLifetime.StopApplication), zero-downtime deploys rely on it
- [ ] **Package hygiene** — dotnet list package --vulnerable; DI-registration consistency validated (add ValidateOnBuild/ValidateScopes in dev)
- [ ] **Profile before optimizing** — dotnet-counters, dotnet-trace/dotnet-stack, PerfView; the usual suspects: allocations, EF N+1, blocking sync-over-async
- [ ] **ValueTask/Span/ArrayPool only on measured hot paths** (see csharp-best-practices)

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
