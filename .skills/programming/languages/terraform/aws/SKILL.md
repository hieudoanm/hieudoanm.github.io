---
name: "terraform-aws"
description: "Use Terraform with AWS safely across accounts and regions, including provider aliases, short-lived identity, IAM, S3 state, and resource lifecycle."
tags:
  - "programming"
  - "infrastructure-as-code"
  - "terraform"
  - "aws"
when_to_use: "Use when authoring, reviewing, or operating Terraform configurations that manage AWS resources."
prerequisites:
  - "Read the Terraform Core skill and repository-specific deployment workflow."
  - "Know the target AWS account, partition, region, state, and approved deployment identity."
related_skills:
  - "../SKILL.md"
avoid_when:
  - "When resources are managed by a different owner or deployment system; do not create competing Terraform ownership."
status: "active"
---

# Terraform on AWS

Treat AWS account, partition, region, provider alias, assumed role, and backend key as explicit safety boundaries. A valid plan against the wrong account is still a production incident.

## Identity and provider configuration

- Prefer short-lived federated credentials, CI OIDC, or approved role assumption; do not configure long-lived access keys in Terraform.
- Set `allowed_account_ids` where supported and validate the expected caller identity before plan/apply.
- Configure region explicitly. Use provider aliases for cross-region or cross-account resources and pass aliases deliberately into child modules.
- Keep provider configuration in the root module. Child modules declare `required_providers`, not credentials or alternate backends.
- Consider AWS partitions (`aws`, `aws-us-gov`, `aws-cn`) when validating ARNs and endpoints; do not construct an ARN with an assumed partition.

## IAM and resource security

- Grant the deployment role only actions and resource scopes needed for plan/apply and state access; separate read, deploy, and break-glass roles where practical.
- Prefer workload roles and resource policies over static credentials or broad account-level principals.
- Review trust policies, `iam:PassRole`, wildcard actions/resources, condition keys, and privilege escalation paths.
- Enable encryption, public-access blocks, logging, backup, and retention according to the service's threat model and organizational policy.
- Avoid relying on default VPCs, implicit security groups, or ambient account settings.

## State and deployment

- Use an approved S3 backend bucket with versioning, encryption, restricted bucket/key access, and the backend's supported locking mechanism.
- Keep state keys unique by account, environment, and ownership boundary; do not share a state key across concurrent deployments.
- Bootstrap backend prerequisites through a controlled, separate process; a backend cannot safely create its own storage before initialization.
- Never print state, credentials, or sensitive plan values. Use the approved pipeline to apply an approved current plan.

## AWS resource patterns

Use provider default tags for organization, environment, owner, and cost metadata when the provider version supports them; explicitly tag resources where defaults are not inherited. Model dependencies through references and avoid unnecessary `depends_on`.

Use stable `for_each` keys for independently managed resources. Review replacement implications for stateful services, immutable names, KMS keys, IAM roles, security groups, and network resources. Confirm quotas, AZ/region support, service availability, and cost before selecting a design.

## Validation and review

Use Terraform Core validation plus AWS-aware policy and security checks. Before approval confirm caller account, partition, region, aliases, backend key, IAM changes, network exposure, encryption, backup, deletion protection, and cost. Verify actual AWS identity and resource status after apply.

## References

- [Identity and account boundaries](./references/identity-and-boundaries.md)
- [IAM and resource security](./references/iam-and-resource-security.md)
- [S3 state backend](./references/state-backend.md)
- [AWS resource lifecycle](./references/resource-lifecycle.md)
