# Azure Resource Lifecycle

Review replacement, retention, and operational behavior for:

- Storage accounts and containers, including name immutability, data protection, and network exposure.
- Key Vaults and keys, including purge protection, soft delete, access policies/RBAC, and dependent secrets.
- Databases and disks, including backups, geo-redundancy, failover, and deletion behavior.
- Role assignments, including propagation delay and service-principal lookup behavior.
- VNets, subnets, private endpoints, DNS, and route changes that can interrupt connectivity.

Validate region, SKU availability, quota, subscription policy, and feature registration. `prevent_destroy` does not replace backups or retention policy.

## Official documentation

- [AzureRM provider documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
