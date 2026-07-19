---
name: "terraform-gcp"
description: "Use Terraform with Google Cloud safely across organizations, folders, and projects, including provider identity, IAM, GCS state, and resource lifecycle."
tags:
  - "programming"
  - "infrastructure-as-code"
  - "terraform"
  - "gcp"
when_to_use: "Use when authoring, reviewing, or operating Terraform configurations that manage Google Cloud resources."
prerequisites:
  - "Read the Terraform Core skill and repository deployment workflow."
  - "Know the target organization/folder/project, state, APIs, and approved deployment identity."
related_skills:
  - "../SKILL.md"
avoid_when:
  - "When resources are managed by another owner or deployment system; do not create competing Terraform ownership."
status: "active"
---

# Terraform on Google Cloud

Treat organization, folder, project, region/zone, provider configuration, state bucket, and deployment identity as explicit boundaries. A project variable alone is not a guard against using the wrong credentials or state.

## Identity and provider configuration

- Prefer Workload Identity Federation and service-account impersonation for CI; avoid downloaded service-account keys and committed credentials.
- Set project and region explicitly where required; verify the effective principal and target project before planning.
- Use provider aliases for exceptional cross-project operations and map aliases into child modules deliberately.
- Keep authentication and provider configuration in root modules. Child modules declare provider requirements.
- Grant the deployment identity only the resource-level permissions required for plan/apply and backend access.

## IAM and project security

- Prefer additive IAM member resources when independently managing individual principals; use authoritative binding/policy resources only when the state owns the complete membership or policy surface.
- Never manage the same role at the same scope through conflicting member, binding, or policy resources.
- Review inherited organization/folder IAM, conditional bindings, service-account impersonation, and `iam.serviceAccounts.actAs` implications.
- Use dedicated workload service accounts, least privilege, and organization-approved constraints.
- Explicitly configure network exposure, encryption, audit logging, backups, retention, and deletion safeguards.

## State and deployment

- Use an approved GCS backend bucket with uniform bucket-level access, public access prevention, encryption, versioning/recovery, and narrowly scoped access.
- GCS backend state locking uses a lock object; do not manually delete lock objects during an active operation.
- Bootstrap the state bucket separately and keep state keys unique by project, environment, and ownership boundary.
- State and saved plans may contain sensitive values; protect access, logs, and retention.
- Plan and apply through the approved pipeline using the exact reviewed revision and identity.

## Google Cloud resource patterns

Explicitly enable required APIs where Terraform owns that responsibility; API enablement can introduce project-level prerequisites, permissions, and deletion dependencies. Avoid turning off an API still used by resources or other teams.

Use stable `for_each` keys. Review service-account keys, IAM changes, firewall rules, public IPs, VPC routes, KMS keys, data deletion, quotas, and regional availability. Confirm whether project-level resources belong in this state or a platform-owned project bootstrap state.

## Validation and review

Run Terraform Core checks plus repository policy and security scans. Confirm caller identity, project, API dependencies, IAM authority model, network exposure, encryption, audit logs, backup/retention, deletion, and cost. Verify actual project and service health after apply.

## References

- [Identity and project boundaries](./references/identity-and-boundaries.md)
- [IAM and resource security](./references/iam-and-security.md)
- [GCS state backend](./references/state-backend.md)
- [Google Cloud resource lifecycle](./references/resource-lifecycle.md)
