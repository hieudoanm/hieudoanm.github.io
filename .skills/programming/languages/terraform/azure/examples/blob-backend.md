# Azure Blob Backend

Use an existing, separately bootstrapped storage account and container.

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "orgtfstate"
    container_name       = "state"
    key                  = "payments/prod.tfstate"
    use_azuread_auth     = true
  }
}
```

Confirm the pinned Terraform backend supports this authentication option. Grant required blob data-plane access, protect the storage account, and do not commit credentials in backend config.
