# Pyramid Best Practices: Workflow Checklist

A practical run sheet for applying [Pyramid Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Configuration & Setup: **One wsgi entry; declaration via config + includes:**
- [ ] 1. Configuration & Setup: **Routes declared explicitly; config.scan() finds views.**
- [ ] 2. Views & Routing: **Views as plain functions decorated or routed:**
- [ ] 2. Views & Routing: **renderer explicit (json/template); views return plain shapes — no strung responses.**
- [ ] 3. Traversal vs URL Dispatch: **Default URL dispatch (routes) is fine for APIs; traversal for data-shaped URLs:**
- [ ] 3. Traversal vs URL Dispatch: **Choose ONE primary model; document edge-hybrids (traversal contexts vs routes) sparingly.**
- [ ] 4. Authentication & Authorization: **Security via authentication_policy + authorization_policy:**
- [ ] 4. Authentication & Authorization: **__acl__/context permissions enforced at views (permission="edit").**
- [ ] 5. Middleware & Add-ons: **WSGI middleware via config.add_tween/wrapper care:**
- [ ] 5. Middleware & Add-ons: **Prefer the add-on ecosystem (jinja2, sqlalchemy scaffold, redis) over hand-rolled plumbing.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
