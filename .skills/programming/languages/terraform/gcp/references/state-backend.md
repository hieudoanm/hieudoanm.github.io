# GCS State Backend

The GCS backend stores state objects in a Cloud Storage bucket and uses a lock object during operations. Protect the bucket with uniform bucket-level access, public access prevention, encryption, versioning/recovery, audit logs, and narrowly scoped IAM.

Bootstrap the bucket separately from the state that depends on it. Use a unique prefix per state boundary and limit the deployment identity to the required object operations. Avoid sharing broad bucket access with application identities.

Never delete a lock object during an active Terraform run. For a stale lock, confirm the owning process is inactive and follow the approved recovery procedure. Treat state and saved plans as sensitive even when attributes are marked sensitive.

## Official documentation

- [Terraform GCS backend](https://developer.hashicorp.com/terraform/language/backend/gcs)
- [Cloud Storage data protection](https://cloud.google.com/storage/docs/data-protection)
