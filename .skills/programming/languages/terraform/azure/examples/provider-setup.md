# AzureRM Provider Setup

Authenticate through the approved Entra ID/workload identity chain. Do not set a client secret in HCL.

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0, < 5.0"
    }
  }
}

provider "azurerm" {
  subscription_id = var.subscription_id
  features {}
}
```

Select a provider range compatible with the repository, lock exact provider builds, and use the current provider migration guidance before upgrades.
The version range shown is illustrative; do not replace a repository's existing provider constraints without an upgrade review.
