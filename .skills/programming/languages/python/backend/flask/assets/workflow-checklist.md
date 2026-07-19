# Flask Best Practices: Workflow Checklist

A practical run sheet for applying [Flask Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. App Factory & Blueprints: **Structure via factory + blueprints:**
- [ ] 1. App Factory & Blueprints: **One factory = testable, per-env configs; blueprints per domain.**
- [ ] 2. Configuration: **Config objects by environment; env-vars override; secrets external:**
- [ ] 2. Configuration: **Never ship secrets in config; instance_relative_config/.env for local only.**
- [ ] 3. Routes & Views: **Routes thin; @route with methods explicit; inputs validated:**
- [ ] 3. Routes & Views: **JSON in/out via app.json/flask tools; responses plain dicts.**
- [ ] 4. Extensions & ORM: **Extensions wired in the factory (db.init_app(app)), models explicit:**
- [ ] 4. Extensions & ORM: **Flask-SQLAlchemy + migrations (Alembic/Flask-Migrate) — never hand-altering schema.**
- [ ] 5. Resilience & Middleware: **Error handlers (@app.errorhandler(404)/files) + request logging once:**
- [ ] 5. Resilience & Middleware: **CORS/security via Flask-CORS/after_request headers only where justified.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
