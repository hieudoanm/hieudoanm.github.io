# Workflow notes

Focused reference for **android-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
