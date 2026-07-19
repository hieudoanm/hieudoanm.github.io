# Overview

Focused reference for **dotnet-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
