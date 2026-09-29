---
name: android-best-practices
description: Android application development with Kotlin — Gradle/version catalogs, module structure, lifecycle, Hilt DI, Room, WorkManager, permissions, edge-to-edge, and release hardening.
---

# Android

Android is Google's mobile platform, built on the Linux kernel with a managed app lifecycle, a permission model, and a component system (Activity, Service, BroadcastReceiver, ContentProvider). Modern Android apps are Kotlin-first, XML-optional, and use Jetpack libraries for nearly every platform concern. This skill covers the _platform_ layer — language details live in [kotlin.md](../kotlin.md), UI in [compose.md](./compose.md), and visual design in [material-design-m3.md](./material-design-m3.md).

## 1. Core Stack & Module Structure

- **Kotlin + K2 compiler**: standard since Kotlin 2.0; the compiler ships with the Kotlin plugin, so no separate Compose compiler version.
- **Jetpack Compose** for UI, **AndroidX** for platform glue, **KSP** for annotation processing.
- **Layers**: `ui` (Compose + ViewModel), `domain` (pure Kotlin, no Android deps), `data` (Room, Retrofit, DataStore). The `domain` module must stay Android-free so it is testable on the JVM.
- **Prefer a single `:app` module** until build times or team ownership actually force a split. Premature multi-module is a common source of accidental public API and slow builds.

```text
:app            AndroidManifest, Application, navigation host, DI wiring
:core:ui         Compose theme, design-system components, previews
:core:data       Room, Retrofit, DataStore, repositories
:core:domain     Models, use cases — pure Kotlin, zero Android imports
```

- **Modules export narrow APIs**: put implementation in `internal` and expose one facade per module. Avoid `api(...)` for everything; it leaks transitive dependencies across the whole graph.

## 2. Gradle & Build Logic

- **Kotlin DSL only** — never Groovy (`build.gradle` over `build.gradle.kts`).
- **Version catalogs** (`gradle/libs.versions.toml`) are the single source of truth for versions. Never inline a version string in a module.
- **`build-logic` included build** for convention plugins, **not `buildSrc`**: `buildSrc` recompiles on every change and invalidates configuration cache.
- **KSP, not kapt**: kapt is in maintenance mode; Room, Hilt, and kotlinx-serialization all support KSP.

```toml
[versions]
agp = "8.13.0"
kotlin = "2.2.20"
ksp = "2.2.20-2.0.4"

[libraries]
androidx-core-ktx = { module = "androidx.core:core-ktx", version = "1.17.0" }
androidx-lifecycle-runtime-compose = { module = "androidx.lifecycle:lifecycle-runtime-compose", version = "2.9.4" }
room-runtime = { module = "androidx.room:room-runtime", version = "2.7.2" }
hilt-android = { module = "com.google.dagger:hilt-android", version = "2.57" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }
```

- **Type-safe accessors** (`libs.androidx.core.ktx`) work automatically; a missing accessor means the catalog alias has a typo, not that you need a fallback. Keep the catalog alphabetic so version bumps produce small diffs.

## 3. Manifest, Permissions & Edge-to-Edge

- **`namespace` in the module's Gradle file**, not the manifest. The manifest's `package` attribute is removed.
- **Split manifest concerns**: put permissions in the manifest, and `tools:node="remove"` in library manifests to strip permissions you never use.
- **Request runtime permissions lazily and in context** — ask at the moment of the user action that needs it, with a rationale, and handle denial gracefully.
- **Never request `MANAGE_EXTERNAL_STORAGE`** unless you are a file manager or backup app; it fails Play review.
- **Edge-to-edge is mandatory on Android 15+** (`targetSdk 35+`): the system draws behind your bars, so opt in explicitly and pad your own content using `WindowInsets`, not hardcoded status-bar heights.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContent { AppTheme { App() } }
    }
}
```

## 4. Lifecycle & State Ownership

- **A ViewModel survives configuration changes**; a `savedInstanceState` bundle survives process death. Choose by how long the state must live, not by convenience.
- **Collect flows with `repeatOnLifecycle(STARTED)`** inside `lifecycleScope`. A bare `lifecycleScope.launch` keeps collecting while backgrounded, wasting work and risking stale UI.
- **Never do I/O or blocking work in `onCreate`/`onStart`/`onResume`** — they run on the main thread and are called repeatedly.
- **Fragments**: prefer a single Activity hosting Compose. Add a Fragment only for a genuinely separate View-system island, and always clear the binding in `onDestroyView`.
- **Save scroll and text state in the ViewModel or `rememberSaveable`**, never in a field on the Activity.

```kotlin
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.uiState.collect { state -> render(state) }
    }
}
```

## 5. Dependency Injection with Hilt

- **Three annotations cover most apps**: `@HiltAndroidApp` on the `Application`, `@AndroidEntryPoint` on the Android component, `@Inject` on the constructor.
- **Scope to the component's lifecycle**: `@ActivityRetainedScoped` for state that must survive rotation, `@Singleton` for the app-wide graph root. Unscoped bindings are recreated per injection point.
- **Qualifiers** (`@IoDispatcher`, `@ApplicationContext`) disambiguate same-typed bindings — always qualify coroutine dispatchers rather than hardcoding `Dispatchers.IO` in classes.
- **Inject interfaces, not implementations**, at the consumption site so tests can substitute fakes.
- **Hilt ViewModels** use `@HiltViewModel` plus `hiltViewModel()`; do not construct ViewModels manually.
- **`@AndroidEntryPoint` must be on the concrete class**, and every Activity/Fragment/Service/Receiver it injects into needs its own annotation.

## 6. Persistence: Room & DataStore

- **Room for structured data** (lists, relations, anything queryable); **DataStore for small key-value or typed preferences**; **never `SharedPreferences`** for new code.
- **Expose Room as `Flow`** and let the UI collect — never bridge a suspend query into a `LiveData` by hand.
- **Write real migrations and export schemas.** Set `room.schemaLocation` under KSP, commit `schemas/`, and add a `MigrationTestHelper` test. `fallbackToDestructiveMigration` silently deletes user data in production.
- **Keep DAOs small and single-purpose** — one `Flow` per screen, no query returning a `JOIN` the UI then re-sorts.
- **Do all database work off the main thread**: Room already rejects main-thread queries, so let it.

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

- **Split by execution cost**: pure JVM unit tests for domain and ViewModel logic, Robolectric or instrumented tests only where the platform is actually required.
- **Test the ViewModel, not the composable** for state logic — a `StateFlow` assertion is faster and less brittle than a UI test.
- **Always test Room migrations** with `MigrationTestHelper`; a passing app on a fresh install proves nothing about an upgrade path.
- **Use `kotlinx-coroutines-test`** to make coroutine tests deterministic, and inject a `TestDispatcher` rather than relying on real delays.
- **Fakes over mocks for dependencies**, and one shared test-data factory to keep fixtures consistent.
- **Add an architecture test** (Konsist or detekt) to forbid Android imports in `domain` and `android.util.Log` in the app.

## 12. Release & Distribution

- **Ship an Android App Bundle (`.aab`)** — required for Play, and it lets Play generate per-device APKs.
- **Keep the signing keystore out of the repo**; configure CI with a release key from a secret store and never commit a `keystore.properties`.
- **Set `isMinifyEnabled` and `isShrinkResources` for release only**, and test the minified build before every rollout.
- **Track `targetSdk` against the current Play deadline**; adopting the newest target early is what surfaces edge-to-edge and permission changes in your own build.
- **Verify Play Console requirements** before release: developer identity verification, data-safety form, and a privacy policy for any permission-gated feature.
- **Roll out through internal and closed tracks first**, then a staged production rollout with a crash-free guard.

## Common Pitfalls

- **Collecting flows in `onCreate` without `repeatOnLifecycle`** — work continues in the background and UI shows stale state.
- **`fallbackToDestructiveMigration()` shipping to production** — a schema change deletes every user's local data.
- **Versions hardcoded in module Gradle files** — upgrades drift and reviews become unreadable.
- **Requesting permissions at launch** — a cold permission dialog on first open is the fastest path to denial and to a one-star review.
- **Ignoring edge-to-edge** — content renders under the status bar or notch on Android 15+.
- **`kapt` for new code** — slower than KSP and no longer receiving improvements.
- **Blocking the main thread in `onCreate`/`onResume`** — dropped frames and ANRs.
- **Debug-only verification** — never ship a build you have not run minified and on a real device.

## General Rules of Thumb

- Keep `domain` pure Kotlin and Android-free; let `data` own every platform import.
- Own versions in the version catalog and conventions in `build-logic`; modules should be declarative.
- Scope state to the ViewModel, collect with `repeatOnLifecycle`, and never block the main thread.
- Persist with Room and DataStore, migrate explicitly, and never destroy data to save a migration.
- Defer work to WorkManager, request permissions in context, and treat targetSdk changes as breaking.
- Ship minified, signed bundles through staged test tracks with a baseline profile attached.

## Quick-Start Checklist

- [ ] Kotlin DSL, version catalog wired, `build-logic` convention plugins, KSP everywhere.
- [ ] `namespace` set in Gradle; manifest trimmed with `tools:node="remove"` for unused permissions.
- [ ] `enableEdgeToEdge()` called; layouts respect `WindowInsets` on Android 15+.
- [ ] `repeatOnLifecycle` wraps all flow collection; no `GlobalScope`, `!!`, or `runBlocking`.
- [ ] Room schema export configured, migrations written, `MigrationTestHelper` test passing.
- [ ] Hilt graph wired: `@HiltAndroidApp`, `@AndroidEntryPoint`, qualified dispatchers.
- [ ] Navigation uses type-safe routes; deep links tested for cold and warm start.
- [ ] Permission prompts appear in context with a denial path.
- [ ] Room/Domain/ViewModel covered by JVM tests; architecture test enforces module boundaries.
- [ ] Baseline profile generated; R8 + resource shrinking verified on a release build.
- [ ] Signed `.aab` staged rollout via internal testing, with a crash-free guard.
