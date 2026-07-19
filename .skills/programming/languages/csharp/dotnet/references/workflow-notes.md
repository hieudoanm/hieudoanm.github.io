# Workflow notes

Focused reference for **dotnet-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
- **Middleware pipelining order matters** (`UseRouting`/auth/cors/`UseEndpoints`) — the request-handling pipeline is a documented sequence, not a pile.
- **Process/configured ports** — Kestrel settings, `ASPNETCORE_URLS`, and `app.UseHttpsRedirection()` (prod) explicit.
- **Health checks for orchestration** (liveness vs readiness) exposed and consumed by Docker/K8s probes.

---
