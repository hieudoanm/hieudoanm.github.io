# Beego Best Practices: Workflow Checklist

A practical run sheet for applying [Beego Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Controllers & Routing: **Controllers as plain structs; actions return responses; router registration explicit:**
- [ ] 1. Controllers & Routing: **REST mapping via get:List style; keep actions thin — logic in packages.**
- [ ] 2. Configuration: **Centralized config (conf/app.conf) — env-overridable per deploy:**
- [ ] 2. Configuration: **web.AppConfig API for typed reads; configs versioned (never secrets in the file).**
- [ ] 3. ORM & Models: **Explicit models; schema via RegisterModel + migrations:**
- [ ] 3. ORM & Models: **Transactions for multi-step writes (orm.NewOrm().Begin()/Commit()/Rollback()).**
- [ ] 4. Middleware & Filters: **InsertFilter for auth/CORS/rate-limit seams:**
- [ ] 4. Middleware & Filters: **Cross-cutting in filters; business behavior stays in handlers/services.**
- [ ] 5. Sessions & Caching: **Session/cache providers configured deliberately (file/redis/memory):**
- [ ] 5. Sessions & Caching: **Cache keys namespaced + TTL'd; secrets not cached client-side.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
