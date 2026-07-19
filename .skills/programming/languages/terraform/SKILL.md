---
name: "terraform"
description: "Design, implement, review, and operate maintainable Terraform configurations with safe state, reusable modules, explicit provider versions, and controlled plans."
tags:
  - "programming"
  - "infrastructure-as-code"
  - "terraform"
when_to_use: "Use when authoring or changing Terraform configuration, modules, state, providers, or infrastructure deployment workflows."
prerequisites:
  - "Identify the Terraform CLI version, provider versions, target workspace, and deployment process used by the repository."
  - "Use an authorized cloud identity and an approved backend; never place credentials in configuration or state outputs."
related_skills:
  - "./aws/SKILL.md"
  - "./azure/SKILL.md"
  - "./gcp/SKILL.md"
avoid_when:
  - "When the repository uses another IaC tool or generated configuration is authoritative; follow its source of truth."
status: "active"
---

# Terraform Core

Treat Terraform as a declarative state-management system, not a shell script. A reviewed plan is the proposed change to real infrastructure; configuration, provider versions, credentials, state, and the exact target environment all affect its meaning.

## Workflow

1. Read repository guidance, existing modules, backend configuration, provider constraints, lock file, and CI workflow.
2. Identify the target account/project/subscription, workspace, state, ownership, and blast radius.
3. Change the smallest coherent configuration surface; keep environment-specific values outside reusable modules.
4. Format, validate, and run the repository's lint and security checks.
5. Generate a plan using the same code, lock file, identity, and target that will be applied; inspect replacements, deletes, and sensitive changes.
6. Apply only the approved plan through the established pipeline. Do not apply a stale plan or bypass approval.
7. Verify the resulting resources and outputs, then record drift, follow-up, or recovery actions.

## Design rules

- Constrain Terraform and provider versions deliberately; commit `.terraform.lock.hcl` for root configurations and review provider upgrades as code changes.
- Use typed input variables with descriptions, validation, and safe defaults only where the default is genuinely safe.
- Keep modules cohesive, documented, and narrowly parameterized. Add abstraction only when reuse, policy, or ownership benefits justify it.
- Prefer stable resource identity, explicit dependencies only when references cannot express ordering, and `for_each` with durable keys over positional identity.
- Use locals for meaningful derived values; avoid hidden behavior in deeply nested expressions and provisioners.
- Mark secrets sensitive to reduce display, but remember this does not encrypt or remove them from state.
- Keep outputs purposeful and avoid exposing credentials or unnecessary sensitive values.
- Use `moved` blocks for refactors and import blocks or the approved import workflow for adopting existing resources; never recreate live infrastructure casually.
- Avoid routine `-target`, `-replace`, state edits, and `-auto-approve`; exceptional recovery must be scoped, reviewed, and documented.

## State and security

- Store state in an approved remote backend with access control, encryption, versioning/recovery, and locking appropriate to the backend.
- Treat state and saved plans as sensitive artifacts; restrict access, retention, and CI logs.
- Separate state by security/ownership boundary and environment; do not use workspaces as an access-control boundary.
- Authenticate through short-lived workload identity or the organization-approved credential chain. Never commit secrets or use Terraform variables as a secret vault.
- Validate provider aliases, regions, accounts, projects, subscriptions, and assumed identities before planning.
- Review data sources and provider configuration for unintended cross-boundary reads or writes.

## Validation and review

Run the repository's pinned Terraform version and provider set. At minimum use `terraform fmt -check`, `terraform init -backend=false` only for syntax/module validation when appropriate, `terraform validate`, and policy/security checks configured by the project. Initialize against the real backend only with authorization and the intended state.

Review plan output for unexpected create, update, replace, delete, drift, provider alias, IAM, network exposure, encryption, backup, and cost changes. Confirm sensitive values stay out of logs. Test modules without creating production resources; use isolated accounts/projects/subscriptions for integration tests.

## Provider routes

- AWS identity, provider aliases, account boundaries, IAM, and S3 backend practices: [Terraform on AWS](./aws/SKILL.md).
- AzureRM authentication, subscription boundaries, Azure resources, and storage backend practices: [Terraform on Azure](./azure/SKILL.md).
- Google provider identity, project boundaries, Google Cloud resources, and GCS backend practices: [Terraform on Google Cloud](./gcp/SKILL.md).

## Detailed references

- [Core workflow and lifecycle](./references/core-workflow.md)
- [Modules and configuration](./references/modules-and-configuration.md)
- [State and security](./references/state-and-security.md)
- [Testing and review](./references/testing-and-review.md)

## Examples and assets

See [examples](./examples/) for configuration patterns and [assets](./assets/) for review and operational templates.
