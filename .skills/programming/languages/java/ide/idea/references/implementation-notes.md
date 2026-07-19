# Implementation notes

Focused reference for **intellij-idea-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Use the debugger's "Evaluate Expression" in the frame where the value is still meaningful,** not where the crash surfaced.
- **Set an exception breakpoint on throw** to find the origin, and use "Any exception" sparingly — it fires on caught exceptions too and floods the session.
- **Attach to a running JVM** (Run → Attach to Process, or the `jcmd`-based helper) for anything with a scheduler or a hot-reload loop. A debugger-launched process is not the same as the one under load.
- **Enable "Reload changed classes" (HotSwap) for a fast edit loop,** and be aware it does not support structural changes — a method body yes, a new field no.
- **For Kotlin coroutines, suspend points are transparent to the debugger**; stepping through a coroutine builder shows resumption points, which is why a stack that looks incomplete is normal.
- **Turn on "Async stack traces"** (`-XX:+DebugAsyncSafePoints` in older JDKs, on by default in modern ones) or deep JVM stacks will be unfollowable.

---

## 5. Spring, Jakarta, and Frameworks

- **The Spring plugin is the reason Ultimate-tier features are worth it,** and it is now bundled in the unified IDE. It resolves beans, understands DI, and offers a visual navigation that is faster than grep for a large graph.
- **The plugin reads the actual application context**, so a missing bean is a real error at startup — run the context, do not guess.
- **Quarkus, Micronaut, and Spring Boot have dedicated plugins** with dev-mode integration (live reload on bean change). Use the dev-mode run configuration rather than a plain JVM run.
- **A build-tool-run config (Gradle/Maven) is the correct default** for framework apps, because it supplies the classpath the dev-mode tools expect.
- **Careful with Lombok or Kotlin kapt:** the IDE must run the annotation processor via the build, or generated code is invisible and every refactor is unsafe.

---

## 6. JetBrains Shared Conventions

These apply across the JetBrains family (Rider, CLion, WebStorm, PyCharm, and the rest):

- **`.idea/` is per-user state and is ignored except `codeStyles/`, `inspectionProfiles/`, and `.run/`.** The re-include lines are required in `.gitignore`.
- **A directory marked "Excluded" is invisible to inspections, refactoring, and search.** This is the first thing to check when the IDE "misses" a file.
- **Settings are scoped to `This computer` or the project.** Anything the team should share belongs to the project scope, or in a committed config file.
- **The Toolbox App manages installs and plugin engines**; a plugin's bundled engine may differ from the IDE's, which explains occasional version-mismatch diagnostics.
