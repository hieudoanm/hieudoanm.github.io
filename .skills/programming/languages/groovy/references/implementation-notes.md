# Implementation notes

Focused reference for **groovy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Gradle & Jenkins Scripts

- **Gradle `build.gradle`: minimal Groovy DSL, typed plugin conventions, versions centralized.**

```groovy
plugins { id 'java'; id 'application' }
repositories { mavenCentral() }
dependencies { implementation 'org.apache.commons:commons-lang3:3.14.0' }
```

- **Jenkinsfile: pipeline block, stages as steps, secrets via credentials API — no hardcoded tokens.**
- **Fail-fast with explicit `sh`/`steps`; avoid post-block avalanches (document the approvals).**

---

## 5. Interop & Performance

- **Direct Java interop is seamless — use typed collections where mixing:**
- **`@Canonical`/`@TupleConstructor`/`@Immutable` AST transforms over hand-built equals/toString.**
- **Late-bound method dispatch is dynamic — when perf matters, `@CompileStatic` the hot path.**
- **Threading: closures don't add thread-safety — synchronize/lock or use actors when shared state.**

---

## 6. Testing & Tooling
