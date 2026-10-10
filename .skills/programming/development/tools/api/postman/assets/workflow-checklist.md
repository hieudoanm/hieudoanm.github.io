# Postman: Workflow Checklist

A practical run sheet for applying [Postman](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Collections in the Repository: **The collection is code: commit it.** A Postman collection exported to JSON in the repo is reviewable, diffable, and versioned with the API. A collection in an account is neither
- [ ] 1. Collections in the Repository: **Commit a collection, its environments, and a README** in one folder (postman/), with the environments' *templates* committed and the real values in a gitignored file
- [ ] 2. Variables and Scoping: **Scopes, from widest to narrowest: global, collection, folder, request.** The same name at two scopes is a debugging nightmare; use the narrowest scope that works
- [ ] 2. Variables and Scoping: **Initial values belong in the environment template; secrets never belong in a committed file.** A token pasted into a committed environment JSON is an incident
- [ ] 3. Making the Collection a Test: **Assert on status, content type, and schema, not just a 200.** A 200 returning an error body is the most common false pass in API testing
- [ ] 3. Making the Collection a Test: **Use a JSON Schema in the response test** so a shape change fails loudly. This is where a collection becomes a contract test rather than a smoke test
- [ ] 4. Documentation & Contracts: **Postman can generate docs from a collection, but the OpenAPI spec is the contract of record.** A collection generated from a spec stays in sync; a hand-written collection documents what someone remembered
- [ ] 4. Documentation & Contracts: **Import the OpenAPI document and generate the collection** rather than transcribing endpoints — a generated collection that someone has edited by hand is now a fork with no owner
- [ ] 5. CI & Automation: **newman for the headless run; keep the command in the repo** (package.json script) so it is reproducible and the invocation is reviewable
- [ ] 5. CI & Automation: **Fail the pipeline on a failed assertion,** and treat a collection that no one runs as documentation

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
