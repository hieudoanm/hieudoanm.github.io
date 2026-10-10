# Review checklist

Focused reference for **android-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
