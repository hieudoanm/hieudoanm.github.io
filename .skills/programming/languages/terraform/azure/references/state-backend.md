# Azure Blob State Backend

The `azurerm` backend stores state as a Blob and uses Blob leases for state locking. Use an organization-approved storage account and container with restricted access, encryption, recovery/versioning, diagnostics, and retention.

Prefer Entra ID authentication supported by the pinned Terraform version and backend configuration. Grant only the data-plane permissions needed for the state container; ARM control-plane access alone may not authorize blob reads or writes.

Bootstrap the storage account/container separately. Do not manually break a lease unless an operator has confirmed no Terraform process owns it and the recovery procedure is approved.

Keep state keys unique by ownership boundary. Protect backend configuration and plans as sensitive artifacts, and follow the documented migration/restore procedure.

## Official documentation

- [Terraform AzureRM backend](https://developer.hashicorp.com/terraform/language/backend/azurerm)
- [Azure Storage data protection](https://learn.microsoft.com/azure/storage/blobs/data-protection-overview)
