# Cross-Subscription Provider Alias

Use an explicit alias and map it to the module that owns resources in the target subscription.

```hcl
provider "azurerm" {
  alias           = "shared"
  subscription_id = var.shared_subscription_id
  features {}
}

module "shared_network" {
  source = "../modules/network"

  providers = {
    azurerm = azurerm.shared
  }
}
```

The authenticated identity must be authorized in the target subscription. Verify tenant, identity, provider mapping, and state boundary before planning.
