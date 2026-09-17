# Bruno: Workflow Checklist

A practical run sheet for applying [Bruno](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Files in the Repository: **The collection is a folder of .bru files in the repo** — committed, diffed, and reviewed like any other source. This is the reason to use Bruno over a client that stores collections in an account
- [ ] 1. Files in the Repository: **Keep it in a dedicated folder** (bruno/ or api/) with the environments beside it, so the whole API surface is one reviewable path
- [ ] 2. Requests and Variables: **Declare variables in an environment file, interpolate with {{var}},** and keep the scoping narrow: environment over collection over request
- [ ] 2. Requests and Variables: **Do not commit secrets.** The populated environment is local and ignored; the committed file is a template with placeholders
- [ ] 3. Tests: **Assertions live in the request file's test script,** so each request is self-checking and the suite is the collection
- [ ] 3. Tests: **Assert on status, content type, and schema, not just a 200.** A 200 with an error body is the classic false pass, and it is the single most valuable assertion to add first
- [ ] 4. Organisation & Docs: **One folder per resource, named for the operation,** so a failing test names itself in the CI output
- [ ] 4. Organisation & Docs: **Bruno can generate docs from a collection,** but the OpenAPI document remains the contract of record; generate from it rather than transcribing endpoints
- [ ] General Rules of Thumb: The collection is plain files in the repo; commit it and review request changes as code
- [ ] General Rules of Thumb: Environment templates committed, populated environments ignored; never a committed secret

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
