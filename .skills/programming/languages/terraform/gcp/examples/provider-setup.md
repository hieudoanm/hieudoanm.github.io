# Google Provider Setup

Authenticate through the approved ADC or Workload Identity Federation chain. Do not set a service-account key in Terraform.

```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.0, < 8.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
```

Choose a provider constraint tested by the repository, commit the lock file, and verify effective identity and project before planning.
The version range shown is illustrative; do not replace a repository's existing provider constraints without an upgrade review.
