# Minimal Root Module

Declare constraints, inputs, and providers in the root module. The provider source and compatible range are examples; select versions approved by the repository.

```hcl
terraform {
  required_version = ">= 1.5.0, < 2.0.0"
}

variable "environment" {
  description = "Deployment environment."
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging, or prod."
  }
}

locals {
  name_prefix = "payments-${var.environment}"
}

output "name_prefix" {
  value = local.name_prefix
}
```

This illustrates portable HCL only. Declare provider requirements and configuration in the actual root module; commit its generated lock file and use the cloud-specific guide for identity and target safeguards.
