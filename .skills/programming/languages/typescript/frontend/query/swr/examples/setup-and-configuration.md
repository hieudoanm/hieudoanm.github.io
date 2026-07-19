# SWR Best Practices: 2. Revalidation Strategy

## Source guidance

This example applies the **2. Revalidation Strategy** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Focus/interval/offline revalidation configured deliberately:**
- **Default revalidation keeps freshness; disable where the data is static (`revalidateIfStale: false`).**
- **`focused`/`disconnected` policies per data temperament — don't blanket-disable.**

## Example

```ts
useSWR("/api/status", fetcher, {
  refreshInterval: 30_000,     // real-time polling where needed
  revalidateOnFocus: true,
  dedupingInterval: 5_000,     // dedupe bursts
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for swr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
