---
name: groovy-best-practices
description: Best practices for scripting and JVM automation with Groovy — the dynamic-JVM conventions for build scripts, pipelines, and DSLs. Use when writing, structuring, or reviewing Groovy — covers typing, closures, GDK, builders, Gradle/Jenkins scripts, and integration with Java.
---

# Groovy Best Practices

Groovy is a **dynamic language for the JVM** — Java-compatible syntax with closures, the GDK (map/collection sugar), and powerful DSL/builder idioms. Practical Groovy leans on **optional typing with explicit `def`/types where it matters, closures for control flow, maps/lists-first data (`[:]`/`[]`), and builders/DSLs reserved for their named purpose** (Gradle/Jenkins scripts), while staying conservative: Groovy seduces with sugar, and sugar-debt creeps fast.

---

## 1. Typing & Style

- **Type or `def` deliberately — annotate the seams (public API), `def` the internals:**

```groovy
String greeting(String name) {
  "Hello, ${name}!"
}
```

- **`@CompileStatic`/`@TypeChecked` for performance-critical or contract-critical code.**
- **Favor explicit Java-style types at boundaries for readability; `def` where the behavior is dynamic.**
- **String interpolation over concatenation; GString only where needed (careful with `$` in text).**

---

## 2. Closures & Collections

- **Closures as first-class behavior — maps/lists sugar over verbose Java:**

```groovy
def names = ["ada", "grace"].collect { it.capitalize() }
def byRole = [ "admin": 1, "user": 2 ]
byRole.each { k, v -> println "$k -> $v" }
```

- **GDK iteration (`each`/`collect`/`findAll`/`groupBy`) over index loops.**
- **`it` is implicit param — name it for clarity in big closures (`{ user -> ... }`).**
- **Be cautious with `==` (Groovy equals) vs `is()/toString()` semantics when interfacing Java.**

---

## 3. Builders & DSLs

- **Builders (JSON/XML/Swing/markup) are intuitive — use them for structure:**

```groovy
def json = new groovy.json.JsonBuilder()
json.people {
  person name: "Ada", role: "admin"
}
assert json.toString() == '{"people":{"person":{"name":"Ada","role":"admin"}}}'
```

- **Custom DSLs (`Closure delegate`) — only where the DSL carries real value; instrument with `resolvArm` delegate closures to document API surface.**
- **Gradle/Jenkinsfiles are Groovy — keep them declarative and thin (logic in functions, not inline scripts).**

---

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

- **Spock (Groovy's native BDD) or JUnit — Spock for expressive `where:` tables:**

```groovy
def "sums correctly"() {
  expect:  add(2, 3) == 5
  where:   a = 2; b = 3
}
```

- **Gradle `test` task wired; coverage (JaCoCo) gate for the pipeline.**
- **Formatting/static analysis (`codenarc`/`spotbugs`) in CI for the Groovy sources.**

---

## General Rules of Thumb

- **Type the seams; `def` the internals; `@CompileStatic` hot/contract paths.**
- **Closures + GDK collections over index loops.**
- **Interpret DSL/builders only where they carry value; keep scripts declarative.**
- **Validate the Groovy interop seams (equals/toString/typing) when mixing.**
- **Spock tests, static analysis, pipeline minimalism.**

---

## Quick-Start Checklist

- [ ] Dynamic typing deliberate; annotated seams (`@TypeChecked`/`@CompileStatic` where hot)
- [ ] GDK collection idioms over loops; named closure params for clarity
- [ ] Builders/DSLs used purposefully; Gradle/Jenkins blocks thin
- [ ] Java interop explicit at boundaries; equals/toString via AST transforms
- [ ] Spock where-tables; JaCoCo coverage gate; CI static analysis