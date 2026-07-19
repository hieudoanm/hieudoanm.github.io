# Implementation notes

Focused reference for **dotnet-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
