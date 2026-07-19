# Testing and Review

## Validation layers

- Format with the repository-pinned formatter and validate against the intended Terraform version.
- Run static analysis, policy-as-code, and secret checks used by the repository.
- Test modules with representative inputs and assertions; mock only where the test framework supports meaningful provider behavior.
- Use isolated cloud boundaries for integration tests; avoid testing by applying to shared or production infrastructure.

## Plan review

Inspect the full plan and summary. Identify deletes, replacements, IAM or network exposure, encryption and backup changes, cross-account/project/subscription targets, and cost-bearing resources. Read resource-level diffs rather than relying only on counts.

Plans can become stale. Apply the exact approved plan using the pipeline's established approval process; regenerate and review if code, state, provider, identity, or target changes.

## Drift

Distinguish expected external ownership from unapproved drift. Determine the source of truth before reconciling. Do not blindly apply a plan that removes changes made by an incident response or another authorized controller.

## Completion evidence

Record the code revision, Terraform/provider versions, target boundary, plan approval, validation results, and post-apply checks. Do not attach sensitive plan or state contents to tickets or logs.

## Official documentation

- [Terraform tests](https://developer.hashicorp.com/terraform/language/tests)
- [Terraform validate](https://developer.hashicorp.com/terraform/cli/commands/validate)
- [Terraform plan](https://developer.hashicorp.com/terraform/cli/commands/plan)
