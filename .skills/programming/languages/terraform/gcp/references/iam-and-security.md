# Google Cloud IAM and Security

Choose the Terraform IAM resource matching state ownership:

- **Member** resources manage one principal-role membership additively.
- **Binding** resources authoritatively manage all members for one role at a scope.
- **Policy** resources authoritatively manage the full policy and can remove unrelated access.

Do not mix authoritative and additive ownership for the same role/scope. Review inherited grants, conditional expressions, service-account impersonation, `actAs`, custom roles, and policy constraints.

Also inspect firewall rules, public IP and ingress, VPC Service Controls where applicable, KMS key access, audit logging, backups, and data deletion. Avoid broad project Editor/Owner grants and downloaded service-account keys.

## Official documentation

- [Google provider IAM resources](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam)
- [Google Cloud IAM overview](https://cloud.google.com/iam/docs/overview)
