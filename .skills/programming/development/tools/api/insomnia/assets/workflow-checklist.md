# Insomnia: Workflow Checklist

A practical run sheet for applying [Insomnia](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Git Sync: Collections as Files: **Insomnia is designed to live in Git** — a collection directory with YAML files per request, committed and reviewed like source. This is its main argument over a client whose collections live in an account
- [ ] 1. Git Sync: Collections as Files: **Point Git sync at a dedicated folder in the repo** (insomnia/) and let the team work through it, so a request change is a pull request
- [ ] 2. Environments and Templating: **Use environment variables with the {{variable}} syntax,** declared in an environment file per deployment, and keep the values in Git with secrets excluded
- [ ] 2. Environments and Templating: **Do not put a live token in a request body template**; use a pre-request script to refresh it in one place, as in postman.md
- [ ] 4. Tests: **Write tests in the request's test tab,** so each request is self-checking, the way it should be
- [ ] 4. Tests: **Assert on status, content type, and schema, not just a 200** — a 200 with an error body is the classic false pass
- [ ] 5. Organisation: **One collection per bounded context,** ordered as folders mirroring the resource hierarchy. A flat list of 200 requests is a documentation problem
- [ ] 5. Organisation: **Name requests after the operation and the resource** (POST /users, GET /users/{id}), so a failing test names itself
- [ ] General Rules of Thumb: Collections and environments in Git via Git sync; secrets never committed
- [ ] General Rules of Thumb: Use the design-first workflow for a greenfield API; import OpenAPI for an existing one

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
