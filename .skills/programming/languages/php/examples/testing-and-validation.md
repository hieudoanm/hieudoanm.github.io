# PHP Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **PHPUnit for contracts** — behavior (success, validation, 404, empty, cancellation), not implementation internals:
- **Data providers for table-driven cases** — input × expected rows, attribute-style `#[DataProvider]`:
- **Fakes at interfaces (constructor-injected repos) over mock-everything** — the seam dictates the test.
- **Database tests** — per-test transactions/`RefreshDatabase`-style isolation; no shared mutable fixtures.
- **Run the full suite in CI with `--coverage` on the diff, and on each push.**

## Example

```php
public function test_find_returns_null_when_missing(): void
{
    $this->assertNull($this->service->find(999));
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for php-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
