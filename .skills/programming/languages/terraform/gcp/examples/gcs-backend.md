# GCS Backend

Create and secure the bucket out of band or in a separately managed bootstrap state.

```hcl
terraform {
  backend "gcs" {
    bucket = "org-terraform-state"
    prefix = "payments/prod"
  }
}
```

Use a bucket with uniform access, public access prevention, recovery/versioning, encryption, and restricted IAM. Keep credentials out of backend configuration and do not delete lock objects during active operations.
