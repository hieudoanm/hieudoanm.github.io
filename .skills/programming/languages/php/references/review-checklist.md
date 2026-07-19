# Review checklist

Focused reference for **php-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```php
public function test_find_returns_null_when_missing(): void
{
    $this->assertNull($this->service->find(999));
}
```

- **Data providers for table-driven cases** — input × expected rows, attribute-style `#[DataProvider]`:

```php
#[DataProvider('emailCases')]
public function test_email_validated(string $input, bool $expected): void
{
    $this->assertSame($expected, Email::valid($input));
}
```

- **Fakes at interfaces (constructor-injected repos) over mock-everything** — the seam dictates the test.
- **Database tests** — per-test transactions/`RefreshDatabase`-style isolation; no shared mutable fixtures.
- **Run the full suite in CI with `--coverage` on the diff, and on each push.**

---

## 10. Async & Long-Running

- **PHP is synchronous-first** — for queued/async work, offload to a job queue (Redis/SQS) rather than emulating coroutines:

```php
$queue->dispatch(new SendEmailJob($userId, $template));
```

- **Workers** — long-lived processes (`roadrunner`/`swoole`/`octane`) are a deliberate architecture, not a default: memory leaks and opcache behavior change.
- **Keep request handlers short and stateless** — the stateless model is PHP's superpower; don't fight it.

---

## General Rules of Thumb

- **`declare(strict_types=1)` and typed everything — the compiler is the cheapest reviewer.**
- **`final` by default; interfaces at seams; constructor injection.**
- **Exceptions with `previous:`, narrow catches, fail-fast validation.**
- **Think security at the data boundary** — validate input, escape output, parameterize SQL.
- **PSR-12 + PHPStan + PHPUnit as the "done" gate.**
- **Composer lockfile and `--no-dev` deploy discipline.**

---

## Quick-Start Checklist

- [ ] `declare(strict_types=1)` on functional files; typed props/params/returns
- [ ] `final` + `readonly` where extension/mutation isn't wanted; interfaces at seams
- [ ] `match`/enums over stringly statuses; value objects for primitives
- [ ] Typed exceptions; narrow catches; `previous:` preserved; no swallowing
- [ ] PSR-12 clean (php-cs-fixer); PSR-4 autoloading exact
- [ ] Input validated, output escaped, SQL parameterized, passwords via `password_hash`
- [ ] `composer.lock` committed; deps audited; `--no-dev` in deploy
- [ ] PHPStan/Psalm passing at `level=max`; `php -l` in pre-commit
- [ ] PHPUnit contract tests + data providers; per-model DB isolation
