# Android: Workflow Checklist

A practical run sheet for applying [Android](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Module Structure: **Kotlin + K2 compiler**: standard since Kotlin 2.0; the compiler ships with the Kotlin plugin, so no separate Compose compiler version
- [ ] 1. Core Stack & Module Structure: **Jetpack Compose** for UI, **AndroidX** for platform glue, **KSP** for annotation processing
- [ ] 2. Gradle & Build Logic: **Kotlin DSL only** — never Groovy (build.gradle over build.gradle.kts)
- [ ] 2. Gradle & Build Logic: **Version catalogs** (gradle/libs.versions.toml) are the single source of truth for versions. Never inline a version string in a module
- [ ] 3. Manifest, Permissions & Edge-to-Edge: **namespace in the module's Gradle file**, not the manifest. The manifest's package attribute is removed
- [ ] 3. Manifest, Permissions & Edge-to-Edge: **Split manifest concerns**: put permissions in the manifest, and tools:node="remove" in library manifests to strip permissions you never use
- [ ] 4. Lifecycle & State Ownership: **A ViewModel survives configuration changes**; a savedInstanceState bundle survives process death. Choose by how long the state must live, not by convenience
- [ ] 4. Lifecycle & State Ownership: **Collect flows with repeatOnLifecycle(STARTED)** inside lifecycleScope. A bare lifecycleScope.launch keeps collecting while backgrounded, wasting work and risking stale UI
- [ ] 5. Dependency Injection with Hilt: **Three annotations cover most apps**: @HiltAndroidApp on the Application, @AndroidEntryPoint on the Android component, @Inject on the constructor
- [ ] 5. Dependency Injection with Hilt: **Scope to the component's lifecycle**: @ActivityRetainedScoped for state that must survive rotation, @Singleton for the app-wide graph root. Unscoped bindings are recreated per injection point

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
