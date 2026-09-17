# S3 Backend with Lockfile

Initialize a dedicated backend with restricted access, versioning, encryption, and recovery controls provisioned separately.
The `use_lockfile` option requires Terraform 1.10 or later; verify the CLI version used by the deployment workflow.

```hcl
terraform {
  backend "s3" {
    bucket       = "org-terraform-state"
    key          = "payments/prod/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

Use non-secret partial configuration or the organization's standard backend injection when bucket, role, or key varies by environment. Never put credentials in backend configuration committed to source.
