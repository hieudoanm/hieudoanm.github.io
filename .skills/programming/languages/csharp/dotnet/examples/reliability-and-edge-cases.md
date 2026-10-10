# .NET Best Practices: 10. Performance & Production

## Source guidance

This example applies the **10. Performance & Production** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile before optimizing** — `dotnet-counters`, `dotnet-trace`/dotnet-stack, PerfView; the usual suspects: allocations, EF N+1, blocking sync-over-async.
- **`ValueTask`/`Span`/`ArrayPool` only on measured hot paths** (see `csharp-best-practices`).
- **Caching** — `IMemoryCache`/`IDistributedCache` with explicit invalidation keys; never unbounded caches.
- **Garbage instead of memory-hogging** — `Gen0` pressure is watched, not chased; set `ServerGC=true` only with data.

## Example

A team applying **10. Performance & Production** to a .NET Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Profile before optimizing** — `dotnet-counters`, `dotnet-trace`/dotnet-stack, PerfView; the usual suspects: allocations, EF N+1, blocking sync-over-async.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for dotnet-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
