# Implementation notes

Focused reference for **laravel-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Avoid overusing facades in domain logic** and global helpers outside edges — resolve dependencies explicitly.
- **Bind interfaces in providers** (`AppServiceProvider`) — swap implementations in tests.
- Keep container wiring at the composition root; domain code stays plain classes.

---

## 6. Queues, Jobs & Events

- **Use queues for non-blocking work** — emails, webhooks, batch export: `dispatch(new SendWelcomeEmail(...))`:

```php
class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user) {}

    public function handle(): void { Mail::to($this->user)->send(new WelcomeMail($this->user)); }
}
```

- **Pass IDs or serializable primitives; remember queue serialization** — jobs are rehydrated in the worker.
- **Monitor with Horizon** for queue health; retry/idempotency-aware jobs.
- **Events/l listeners to decouple workflows** — dispatch domain events, listeners react; don't chain side effects inside controllers.

---

## 7. Policies & Authorization

- **Policies over inline authorization** — `@can('update', $post)` / `$this->authorize('update', $post)`; policy methods per action:

```php
class PostPolicy
{
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id || $user->is_admin;
    }
}
```

- **Restrict via controllers/requests** — `authorizeResource` and policy checks before mutation.
- **Never trust client input; enforce at the policy, not the view.**

---

## 8. Performance, Memory & Safety

- **Be mindful of N+1, lazy/eager loading, and queue serialization** — measure before optimizing.
- **Use caching intentionally** — Cache facade/Redis with TTLs for hot queries:

```php
$metrics = Cache::remember('dashboard.metrics', 300, fn () => $this->compute());
```
