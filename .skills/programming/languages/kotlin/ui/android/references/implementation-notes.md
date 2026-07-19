# Implementation notes

Focused reference for **android-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```kotlin
@Entity(tableName = "todos")
data class Todo(@PrimaryKey val id: String, val title: String, val done: Boolean = false)

@Dao
interface TodoDao {
    @Query("SELECT * FROM todos ORDER BY title") fun observeAll(): Flow<List<Todo>>
    @Upsert suspend fun upsert(todo: Todo)
    @Query("DELETE FROM todos") suspend fun clear()
}
```

## 7. Background Work & Services

- **Use `WorkManager` for anything that must eventually finish**: uploads, syncs, periodic refresh. It survives reboots and process death.
- **Declare `Constraints`** (network, charging, battery) so the system can batch work instead of draining the user's device.
- **`WorkManager` is for deferrable work, not latency-sensitive work** — a user tapping "sync" wants a result now; use a coroutine in a ViewModel.
- **Foreground services require a declared `foregroundServiceType`** (Android 14+ enforcement) plus a matching `FOREGROUND_SERVICE_*` permission, and a user-visible notification.
- **Postpone non-urgent notifications** behind a permission request; exact-alarm and background-location permissions are high-scrutiny in Play review.
- **Cancel work you no longer need** with a unique work name and `ExistingWorkPolicy.REPLACE`, or you will accumulate duplicates.

## 8. Networking & Serialization

- **Retrofit + OkHttp + kotlinx.serialization** (or Moshi) — declare one content converter and stick to it.
- **Set timeouts explicitly** and always handle `IOException`; the default timeouts are long enough to hang a UI for a minute.
- **Return a `Result`-like sealed type** (`Success` / `Error`) from the repository. Do not let `HttpException` or raw JSON objects reach the UI layer.
- **Auth tokens via an interceptor**, not per-call headers; keep the token out of logs and out of DataStore plaintext if it is sensitive.
- **Never call the network on the main thread**, and never block a coroutine on a network call inside `runBlocking`.

## 9. Navigation

- **Type-safe routes with kotlinx.serialization**: declare a `@Serializable` object per destination and pass it as the route. String paths with `?id={id}` break silently when arguments change.
- **Hoist the NavController** to the Activity or a route-level composable, never below the screen that needs to navigate — screens should emit events, not hold the controller.
- **Share a single `NavHost`** for a single-activity app; nesting graphs is a last resort.
- **Make the back stack part of state**, so system back, predictive back, and deep links all resolve to the same place.
- **Deep links** need both the `intent-filter` in the manifest and a matching route in the `NavHost`, plus a tested path for cold-start and warm-start.

## 10. Performance & Startup

- **Add a baseline profile** — the single biggest cold-start and scroll-smoothness win available. Generate it in Macrobenchmark, and verify it is packaged.
- **R8 in release** with sane `keep` rules: shrink aggressively, and confirm the app does not crash only after minification.
- **Avoid work in `Application.onCreate`** — initialize lazily per feature; measure with `Trace` before optimizing.
- **Do not use `!!`, `GlobalScope`, or a static mutable singleton** for anything screen-related; they are the usual source of leaks and lost state.
- **Profile on a low-end device** in release mode. Debug builds and fast dev phones hide most jank.

## 11. Testing
