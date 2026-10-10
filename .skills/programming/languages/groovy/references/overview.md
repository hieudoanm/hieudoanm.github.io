# Overview

Focused reference for **groovy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
