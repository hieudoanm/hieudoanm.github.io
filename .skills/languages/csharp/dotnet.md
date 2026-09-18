---
name: dotnet-best-practices
description: Best practices for building .NET applications — the framework conventions for .NET projects, web APIs, and services. Use when writing, structuring, or reviewing .NET — covers project layout, DI and composition root, configuration, logging, hosting, testing, deployment, and observability. Use alongside csharp-best-practices for language-level C# rules.
---

# .NET Best Practices

.NET is the C# platform: a compiler pipeline, a runtime, and a convention-rich project model (`csproj`, `sln`, `appsettings`, a built-in DI container, structured logging). Practical .NET leans on **human-scale project layout, a single composition root registering dependencies via `IServiceCollection`, `IOptions`-typed configuration, and structured logging that carries a request context**. The SDK tooling — `dotnet build`/`test`/`publish` plus analyzers treated as CI gates — defines what "done" means.

---

## 1. Solution & Project Layout

- **One responsibility per project; a solution groups them by concern:**

```text
src/App.Api/             # HTTP boundary, controllers, middleware
src/App.Core/            # domain models, services, ports (no infrastructure)
src/App.Infrastructure/  # EF Core, HTTP clients, queues, mailers
tests/App.Api.Tests/
tests/App.Core.Tests/
```

- **Keep `Core` free of infrastructure** — no `DbContext`, `HttpClient`, or ASP.NET types; the domain is testable without a server.
- **Small, focused projects over a god-assembly** — a `.csproj` that has grown to "everything app" is a boundary failure.
- **Match namespaces to folders** (`App.Core.Shipping` → `src/App.Core/Shipping`) so references read top-down.
- **A `Directory.Build.props` at the root pins SDK version, `LangVersion`, and analyzer settings for every project.**

---

## 2. Dependency Injection & Composition Root

- **One composition root** (`Program.cs` for web; `Main`/host builder for services); register collaborations there:

```csharp
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddHttpClient<IPaymentsClient, PaymentsClient>();
```

- **Register by interface at the seam** — consumers depend on abstractions, composition supplies the concrete.
- **Lifetimes chosen by state**: `Singleton` for stateless/immutable, `Scoped` per-request (EF Core `DbContext`, UnitOfWork-model state), `Transient` only for genuinely cheap stateless helpers.
- **No service-locator anti-patterns** (`IServiceProvider.GetRequiredService` inside domain code); constructor injection only.
- **`AddHttpClient` with named/typed clients + `IHttpClientFactory`** over ad-hoc `new HttpClient()` — DNS rotation, pooling, policy decoration.

---

## 3. Configuration

- **Typed options bound from `appsettings`/environment** — `IConfiguration` is the boundary, `IOptions<T>` the contract:

```csharp
"Payments": {
  "BaseUrl": "https://api.example.com",
  "Retries": 3
}
builder.Services.Configure<PaymentOptions>(builder.Configuration.GetSection("Payments"));
```

- **Read via `IOptions<T>`/`IOptionsMonitor<T>`**; validate at startup (`ValidateDataAnnotations`/`IValidateOptions`) so a misconfigured deploy fails fast.
- **Secrets never in `appsettings` committed** — User Secrets (dev), env, Key Vault (prod); `AddAzureKeyVault`/`user-secrets` accordingly.
- **Environment-based overrides by prefix** (`Payments__Retries`) for container/CI injection.
- **Options classes immutable `sealed` records** — configuration is data, not mutable state handed around.

---

## 4. Logging & Observability

- **Structured logging via `ILogger<T>`** — never `Console.WriteLine`; the log event carries properties, not prose:

```csharp
logger.LogInformation("PaymentAuthorized {UserId} {Amount}", user.Id, amount);
```

- **`LoggerMessage` source generators for hot paths** (`[LoggerMessage]` partial methods) avoid allocation and lock format drift.
- **Semantic naming + correlation**: each request carries `TraceId`/`ActivityId` (OpenTelemetry) so logs tie to traces.
- **Log levels disciplined** — `Warning` for recoverable, `Error` for genuine failures; `Debug`/`Trace` guarded by configuration.
- **No `log + throw`** — log at the boundary once, or throw the exception with context; duplication doubles the noise.

---

## 5. Hosting & Lifecycle

- **Generic Host (`WebApplicationBuilder`/`Host`) for all services** — DI, config, logging, health checks, `IHostedService` in one shell:

```csharp
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>();
```

- **`BackgroundService`/`IHostedService` for queues/cron-like work** — graceful shutdown is the framework's contract, don't re-implement it.
- **Middleware pipelining order matters** (`UseRouting`/auth/cors/`UseEndpoints`) — the request-处理 pipeline is a documented sequence, not a pile.
- **Process/configured ports** — Kestrel settings, `ASPNETCORE_URLS`, and `app.UseHttpsRedirection()` (prod) explicit.
- **Health checks for orchestration** (liveness vs readiness) exposed and consumed by Docker/K8s probes.

---

## 6. Data Access

- **EF Core for relational (or a documented ADO alternative)**; short-lived `DbContext` per operation:

```csharp
await using var db = _factory.CreateDbContext();
return await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id, ct);
```

- **`AsNoTracking` for read-only queries; explicit `Include`/`ThenInclude` over lazy loads** — lazy loading hides N+1 until prod.
- **Reusable dbcontext factory (`IDbContextFactory<T>`) for background/parallel workloads**; long-lived `DbContext` is a thread-safety bug.
- **Migrations as code, applied via `dotnet ef database update` or a deployment task — never ad-hoc schema drift.**
- **Async end-to-end** — `ToListAsync`, `SaveChangesAsync` with the `CancellationToken` flowing from the request.

---

## 7. Build & CI

- **`dotnet build` with `TreatWarningsAsErrors`; SDK pinned (`global.json`); analyzers as CI gate**:

```bash
dotnet build -c Release -warnaserror
dotnet test -c Release
```

- **`Directory.Build.props`** centralizes `AnalysisLevel`, `Nullable` (`enable`), and `ImplicitUsings` so every project inherits the contract.
- **`dotnet format --verify-no-changes`** in CI — `.editorconfig` is the style contract (see `csharp-best-practices`).
- **`dotnet publish` single-file/trimming only after capacity review** — the tradeoffs (reflection, assembly load) are real.

---

## 8. Testing & Verification

- **Layered test projects mirroring src** (`tests/*.Tests`) — contract coverage at each boundary:

```csharp
public async Task FindAsync_ReturnsNull_WhenUserMissing()
{
    var db = await FakeContextWith(User());
    var svc = new UsersService(db.Factory());
    Assert.Null(await svc.FindAsync(999));
}
```

- **`WebApplicationFactory<T>` for integration tests** — in-memory server, no real sockets; override config/EF with an in-memory or test provider:

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