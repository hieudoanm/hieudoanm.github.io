# Review checklist

Focused reference for **android-studio-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 10. Common Pitfalls

- **Building only in Studio**, with a sync setting or plugin version that no CI job has.
- **A local `gradle`/`sdk` version outside the wrapper**, so the build server fails.
- **Committing `local.properties`**, which hard-codes one machine's SDK path.
- **Profiling the Debug build**, where overhead makes CPU numbers meaningless — use `profile`.
- **Only ever testing on an emulator** and shipping a startup or graphics regression.
- **Testing release without R8 shrinking enabled**, then discovering a `ClassNotFoundException` or stripped reflection in production.
- **Forgetting `applicationIdSuffix` on debug**, so a locally signed build cannot coexist with the Play-installed one.
- **One AVD used to represent every form factor**, missing cutouts, foldables, and tablets.
- **Relying on `@Preview` alone**, where Compose renders but lint in CI does not run.
- **Flipping Studio channels in place** and losing the stable installation's settings.
- **Trusting the Layout Editor's drag result** without checking the constraints, which produces deeply nested `LinearLayout`s.
- **Reading the last error of a cascading Gradle failure** instead of the first.

---

## General Rules of Thumb

- `./gradlew` in CI, Studio for the inner loop; the CLI is the source of truth.
- JDK 21, wrapper-pinned Gradle, and a version catalog for AGP and Kotlin.
- `gradle.properties` for JVM args, parallelism, and the caches — read by every build.
- One `app` module plus libraries that earn the boundary; namespace per module, no `package` in the manifest.
- Compose previews plus `@Preview` parameterisation, backed by lint in CI.
- Profile the `profile` build type on a device; gate startup with Macrobenchmark.
- Test the release build — shrinking changes behaviour.
- `local.properties`, `.idea/`, and `build/` never committed; features that enforce rules belong in Gradle, not in IDE settings.

---

## Quick-Start Checklist

- [ ] JDK 21 selected for Gradle, set in project config rather than only in Studio
- [ ] `gradle/wrapper/gradle-wrapper.properties` committed; no system Gradle used
- [ ] `gradle/libs.versions.toml` pins AGP, Kotlin, and dependencies
- [ ] AGP version inside the range the team's Studio supports, verified against `compileSdk`
- [ ] `namespace` set per module and no `package` attribute in any manifest
- [ ] `local.properties`, `.idea/`, and `**/build/` in `.gitignore`
- [ ] One AVD per API level and form factor; a physical device available for perf work
- [ ] `./gradlew :app:assembleDebug` and `./gradlew lint` reproduce what the IDE does
- [ ] `applicationIdSuffix` set on the debug build type
- [ ] Release build exercised with R8 enabled; reflection and serialisation keep rules in place
- [ ] Profiling done on the `profile` build type against a device
- [ ] Startup measured with `am start -W` or Macrobenchmark rather than assumed
- [ ] Studio channel and version recorded in the project docs
