# Antigravity: Workflow Checklist

A practical run sheet for applying [Antigravity](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. The Agent-First Inversion: **The default relationship is: the agent writes, you review.** That is the opposite of an autocomplete editor, and the discipline has to be different too — the review is the work, not a final step
- [ ] 1. The Agent-First Inversion: **Because the agent writes more code per task, the review must be more thorough, not less.** A 300-line change generated in ten seconds is not ten seconds of work; it is a careful read
- [ ] 2. Bounding the Agent: **Give the agent a bounded task with a named outcome and a file scope.** "Add error handling to the fetch layer and test it" produces a reviewable diff; "improve error handling" produces a rewrite
- [ ] 2. Bounding the Agent: **Let it plan before it writes on anything non-trivial,** and reject a wrong plan before code exists. A competently implemented bad plan is still a bad plan
- [ ] 3. Reviewing the Result: **Read the actual diff in your VCS,** not the agent's summary of what it did. The summary is produced by the same system that made the change and inherits its blind spots
- [ ] 3. Reviewing the Result: **Look for omissions, not errors.** Errors are visible in the diff; the dangerous defect is the dropped branch, the unhandled rejection, the changed default. Ask which test would catch it
- [ ] 4. Conventions & Rules: **Encode the project's conventions where the agent will read them** — a committed rules or instructions file, the same discipline as in cursor.md. Include the build, test, typecheck, and format commands; an agent guessing a test command produces a false green
- [ ] 4. Conventions & Rules: **Be specific.** "Follow existing patterns" is not a rule; "components live in src/components/atoms, organisms, templates; a new one goes in the layer it matches" is
- [ ] 5. Privacy & Data: **Know what the agent reads and what leaves the machine.** An editor that indexes the repository and calls a hosted model is a data-flow decision, and for proprietary code a governance decision
- [ ] 5. Privacy & Data: **Do not put secrets, keys, customer data, or private source into a prompt.** A good model is not a trusted channel

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
