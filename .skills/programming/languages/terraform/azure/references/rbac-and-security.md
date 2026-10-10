# Azure RBAC and Resource Security

Review effective access across management group, subscription, resource group, and resource scopes. Check inherited assignments, custom role definitions, deny assignments, and policy effects.

For each role assignment verify:

- The principal is the intended workload identity or operator.
- The role is narrower than Owner or Contributor where practical.
- The scope does not exceed the required resource boundary.
- Directory lookup and propagation behavior is handled intentionally.
- The assignment is not duplicated or owned by another state.

Also inspect public network access, firewall rules, private endpoints, Key Vault access model, encryption, managed identities, diagnostic settings, backup, soft delete, and retention. Role assignment changes can be security-critical even when resources are not replaced.

## Official documentation

- [Azure role-based access control](https://learn.microsoft.com/azure/role-based-access-control/overview)
- [AzureRM role assignment resource](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/role_assignment)
