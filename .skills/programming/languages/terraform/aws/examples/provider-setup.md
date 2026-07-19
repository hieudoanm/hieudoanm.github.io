# AWS Provider Setup

Use an approved credential chain (for example, environment-provided federation or role assumption); do not place credentials in HCL.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0, < 7.0"
    }
  }
}

variable "region" {
  type        = string
  description = "Approved deployment region."
}

provider "aws" {
  region              = var.region
  allowed_account_ids = [var.account_id]
}
```

Select and lock a provider version tested by the repository. Do not treat this example's version range as a recommendation for an existing project.
