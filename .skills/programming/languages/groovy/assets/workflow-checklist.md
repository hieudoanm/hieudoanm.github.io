# Groovy Best Practices: Workflow Checklist

A practical run sheet for applying [Groovy Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Typing & Style: **Type or def deliberately — annotate the seams (public API), def the internals:**
- [ ] 1. Typing & Style: **@CompileStatic/@TypeChecked for performance-critical or contract-critical code.**
- [ ] 2. Closures & Collections: **Closures as first-class behavior — maps/lists sugar over verbose Java:**
- [ ] 2. Closures & Collections: **GDK iteration (each/collect/findAll/groupBy) over index loops.**
- [ ] 3. Builders & DSLs: **Builders (JSON/XML/Swing/markup) are intuitive — use them for structure:**
- [ ] 3. Builders & DSLs: **Custom DSLs (Closure delegate) — only where the DSL carries real value; instrument with resolvArm delegate closures to document API surface.**
- [ ] 4. Gradle & Jenkins Scripts: **Gradle build.gradle: minimal Groovy DSL, typed plugin conventions, versions centralized.**
- [ ] 4. Gradle & Jenkins Scripts: **Jenkinsfile: pipeline block, stages as steps, secrets via credentials API — no hardcoded tokens.**
- [ ] 5. Interop & Performance: **Direct Java interop is seamless — use typed collections where mixing:**
- [ ] 5. Interop & Performance: **@Canonical/@TupleConstructor/@Immutable AST transforms over hand-built equals/toString.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
