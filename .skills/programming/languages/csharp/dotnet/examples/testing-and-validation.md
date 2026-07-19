# .NET Best Practices: 8. Testing & Verification

## Source guidance

This example applies the **8. Testing & Verification** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Layered test projects mirroring src** (`tests/*.Tests`) — contract coverage at each boundary:
- **`WebApplicationFactory<T>` for integration tests** — in-memory server, no real sockets; override config/EF with an in-memory or test provider:
- **Fakes at the seams (`IUserRepository`, `IHttpClientFactory`/typed clients) over mock-everything.**
- **Cover the contract**: success, validation failure, not-found, cancellation, error mapping — at the service boundary.

## Example

```csharp
public async Task FindAsync_ReturnsNull_WhenUserMissing()
{
    var db = await FakeContextWith(User());
    var svc = new UsersService(db.Factory());
    Assert.Null(await svc.FindAsync(999));
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for dotnet-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
