# Azure Identity and Boundaries

## Authentication

Prefer federated credentials for CI and managed identity for Azure-hosted automation. Use the approved Entra ID tenant and authentication flow; do not store client secrets or certificates in Terraform source or committed variable files.

Before planning, verify the tenant, service principal or managed identity, and active subscription through the deployment environment. A subscription ID in configuration does not prove the authenticated principal is authorized for only that subscription.

## Subscription boundaries

Set subscription IDs explicitly. Use named provider aliases for cross-subscription resources and map them into child modules deliberately. Keep state, credentials, and approval aligned to ownership and environment boundaries.

Management-group policies and inherited RBAC can alter effective behavior. Check the target scope and relevant policy assignments before applying.

## Provider scope

Use AzureRM for Resource Manager resources and other providers only for their defined API surfaces. Make cross-provider dependencies explicit and account for eventual consistency when directory or role assignments propagate.

## Official documentation

- [AzureRM provider documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure identity platform](https://learn.microsoft.com/entra/identity-platform/)
