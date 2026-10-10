---
name: "terraform-azure"
description: "Use Terraform with Azure safely across tenants and subscriptions, including AzureRM identity, provider aliases, RBAC, Blob state, and resource lifecycle."
tags:
  - "programming"
  - "infrastructure-as-code"
  - "terraform"
  - "azure"
when_to_use: "Use when authoring, reviewing, or operating Terraform configurations that manage Microsoft Azure resources."
prerequisites:
  - "Read the Terraform Core skill and repository deployment workflow."
  - "Know the target tenant, subscription, management boundary, state, and approved deployment identity."
related_skills:
  - "../SKILL.md"
avoid_when:
  - "When resources are owned by another deployment system or team; do not create competing Terraform ownership."
status: "active"
---

# Terraform on Azure

Treat tenant, subscription, provider alias, resource group, state container, and deployment identity as explicit boundaries. Validate the target subscription before planning and applying.

## Identity and provider configuration

- Prefer workload identity federation or another approved short-lived Entra ID flow; do not commit client secrets or service-principal credentials.
- Configure subscription IDs explicitly and verify tenant and caller identity in the deployment pipeline.
- Use provider aliases for cross-subscription operations and pass provider mappings explicitly into child modules.
- Keep provider configuration and authentication in root modules; child modules declare provider requirements only.
- Use the AzureRM provider for Azure Resource Manager resources. Use AzureAD or other providers only for resources in their API and ownership scope; avoid mixing identity-plane operations accidentally.

## RBAC and security

- Scope role assignments as narrowly as practical and review inherited management-group and subscription assignments.
- Separate deployment permissions from application runtime identity. Prefer managed identities for workloads.
- Review role definition scope, principal type, directory permissions, assignment propagation, and `skip_service_principal_aad_check` use.
- Explicitly configure network exposure, private endpoints, encryption, diagnostics, backup, soft delete, and retention according to policy.
- Avoid relying on default resource groups, implicit network rules, or ambient subscription settings.

## State and deployment

- Use an approved Azure Blob backend with restricted container access, recovery/versioning controls, and Entra ID authentication where supported.
- Blob leases provide backend state locking; do not manually break a lease during an active run.
- Bootstrap the storage account and container through a controlled process separate from the state that depends on them.
- Isolate state keys by subscription, environment, and owner. State and saved plans remain sensitive.
- Run plans and applies through the approved identity and pipeline; never apply a stale or unreviewed plan.

## Azure resource patterns

Use explicit locations, naming, tags, resource groups, and diagnostic settings. Model dependencies through references. Avoid broad `depends_on` when the dependency can be expressed directly.

Review replacement and deletion behavior for databases, storage, key vaults, role assignments, networking, and private endpoints. Check regional availability, quotas, policy assignments, and feature registration before planning.

## Validation and review

Alongside Terraform Core checks, run the repository's Azure policy and security scans. Review tenant/subscription, role assignments, public access, network paths, encryption, diagnostic coverage, backup/retention, replacement, and cost. Verify identity and resource state after apply.

## References

- [Identity and tenant boundaries](./references/identity-and-boundaries.md)
- [RBAC and resource security](./references/rbac-and-security.md)
- [Azure Blob state backend](./references/state-backend.md)
- [Azure resource lifecycle](./references/resource-lifecycle.md)
