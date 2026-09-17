# Workflow notes

Focused reference for **groovy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
