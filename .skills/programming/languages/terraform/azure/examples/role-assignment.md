# Scoped Role Assignment

Prefer a resource-group or resource scope to a subscription-wide grant when the workload permits it.

```hcl
resource "azurerm_role_assignment" "reader" {
  scope                = var.resource_group_id
  role_definition_name = "Reader"
  principal_id         = var.workload_principal_id
  principal_type       = "ServicePrincipal"
}
```

Verify principal type, effective inherited access, tenant, and required directory permissions. Avoid duplicating assignments owned by another state or identity team.
