# AWS State Backend

The S3 backend stores Terraform state in an S3 object. Protect the bucket and state key independently from application resources.

Use an organization-approved bucket with versioning, encryption, public access blocked, TLS enforcement, restricted principals, audit logging, and recovery ownership. Enable the locking option supported by the pinned Terraform version and backend; the S3 `use_lockfile` option requires Terraform 1.10 or later. Follow current backend documentation rather than copying legacy DynamoDB-lock examples.

Backend configuration is initialized separately from provider resources. Bootstrap and migrate backend storage through a controlled process, preserve backups, and use `terraform init -migrate-state` only after reviewing the source and destination.

Use a unique key per state boundary. Restrict CI access to the needed bucket path and KMS key. State may contain secrets even when Terraform marks attributes sensitive.

## Official documentation

- [Terraform S3 backend](https://developer.hashicorp.com/terraform/language/backend/s3)
- [AWS S3 data protection](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataProtect.html)
