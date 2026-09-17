# .NET Best Practices: 3. Configuration

## Source guidance

This example applies the **3. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Typed options bound from `appsettings`/environment** — `IConfiguration` is the boundary, `IOptions<T>` the contract:
- **Read via `IOptions<T>`/`IOptionsMonitor<T>`**; validate at startup (`ValidateDataAnnotations`/`IValidateOptions`) so a misconfigured deploy fails fast.
- **Secrets never in `appsettings` committed** — User Secrets (dev), env, Key Vault (prod); `AddAzureKeyVault`/`user-secrets` accordingly.
- **Environment-based overrides by prefix** (`Payments__Retries`) for container/CI injection.
- **Options classes immutable `sealed` records** — configuration is data, not mutable state handed around.

## Example

```csharp
"Payments": {
  "BaseUrl": "https://api.example.com",
  "Retries": 3
}
builder.Services.Configure<PaymentOptions>(builder.Configuration.GetSection("Payments"));
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for dotnet-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
