# Explicit Cross-Account Provider

Use named aliases for resources in another account. The CI identity must be authorized to assume the target role.

```hcl
provider "aws" {
  alias               = "logging"
  region              = var.logging_region
  allowed_account_ids = [var.logging_account_id]

  assume_role {
    role_arn = var.logging_deployment_role_arn
  }
}

module "central_logging" {
  source = "../modules/logging"

  providers = {
    aws = aws.logging
  }
}
```

Validate the caller and target role trust before plan. Keep the provider alias and module mapping explicit.
