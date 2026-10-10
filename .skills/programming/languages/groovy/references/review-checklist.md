# Review checklist

Focused reference for **groovy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
