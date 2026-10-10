# Review checklist

Focused reference for **dotnet-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

```csharp
await using var app = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
    b.ConfigureAppConfiguration(c => c.AddInMemoryCollection(testConfig)));
```

- **Fakes at the seams (`IUserRepository`, `IHttpClientFactory`/typed clients) over mock-everything.**
- **Cover the contract**: success, validation failure, not-found, cancellation, error mapping — at the service boundary.

---

## 9. Deployment & Delivery

- **Container image from `dotnet publish` output, non-root, `USER app`,** multi-stage build; `EXPOSE` and healthcheck wired.
- **Environment-specific config via settings + env overrides**, never code forks.
- **Graceful shutdown**: host stops, pending requests drain (`IHostApplicationLifetime.StopApplication`), zero-downtime deploys rely on it.
- **Package hygiene** — `dotnet list package --vulnerable`; DI-registration consistency validated (add `ValidateOnBuild`/`ValidateScopes` in dev).

---

## 10. Performance & Production

- **Profile before optimizing** — `dotnet-counters`, `dotnet-trace`/dotnet-stack, PerfView; the usual suspects: allocations, EF N+1, blocking sync-over-async.
- **`ValueTask`/`Span`/`ArrayPool` only on measured hot paths** (see `csharp-best-practices`).
- **Caching** — `IMemoryCache`/`IDistributedCache` with explicit invalidation keys; never unbounded caches.
- **Garbage instead of memory-hogging** — `Gen0` pressure is watched, not chased; set `ServerGC=true` only with data.

---

## General Rules of Thumb

- **Small focused projects; Core stays infrastructure-free.**
- **One composition root; constructor injection only.**
- **Typed options, validated at startup; secrets never in code.**
- **Structured logged + correlated; log once per boundary.**
- **`dotnet build`/`test`/`publish` with analyzers and `-warnaserror` end the loop.**
- **EF async tracked queries; `CancellationToken` flows everywhere.**

---

## Quick-Start Checklist

- [ ] Solution split by responsibility; Core free of infrastructure types
- [ ] Single composition root; interface-based DI registration; lifetimes by state
- [ ] `IOptions<T>` typed, validated config; secrets in User Secrets/Key Vault
- [ ] `ILogger<T>` structured logs; correlation via TraceId/Activity
- [ ] Generic Host shell; health checks; graceful shutdown
- [ ] EF `AsNoTracking`/`Include` explicit; short-lived DbContext; migrations as code
- [ ] `Directory.Build.props` gates (Nullable, AnalysisLevel, LangVersion)
- [ ] `dotnet build -warnaserror` + `dotnet test` + `dotnet format --verify-no-changes` in CI
- [ ] `WebApplicationFactory` integration tests; fakes at seams; contract coverage
- [ ] Non-root container from publish output; profile before optimizing
