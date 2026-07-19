# Laravel Backend Best Practices: 8. Performance, Memory & Safety

## Source guidance

This example applies the **8. Performance, Memory & Safety** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Be mindful of N+1, lazy/eager loading, and queue serialization** — measure before optimizing.
- **Use caching intentionally** — Cache facade/Redis with TTLs for hot queries:
- **Avoid premature optimization** — clarity first, cache where data shows need.
- **Prefer readonly value objects where possible** (PHP 8.1+ `readonly`).
- **Escape output appropriately** — Blade auto-escapes; be deliberate with `{!! !!}` and API JSON.
- **Config via environment variables** — `.env`/config files; never hardcode secrets.

## Example

```php
$metrics = Cache::remember('dashboard.metrics', 300, fn () => $this->compute());
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for laravel-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
