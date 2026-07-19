# Google Cloud Identity and Boundaries

## Authentication

Prefer Workload Identity Federation for CI and service-account impersonation for scoped access. Avoid service-account key files unless a documented constraint requires them and an approved rotation/storage process exists.

Before plan/apply, verify the effective principal and target project with the deployment environment. Grant impersonation only to the intended federated identity and constrain federation attributes to the expected repository, branch, or environment.

## Project and provider boundaries

Set project and region explicitly. Use provider aliases for cross-project or multi-region resources and pass aliases into modules intentionally. Keep independent projects and ownership boundaries in separate states when policy or lifecycle differs.

Organization policies and inherited IAM can change effective access. Confirm folder and organization constraints before interpreting a plan.

## Permissions

Separate deployment identity from runtime service accounts. Review `actAs`, service-account impersonation, API enablement, and project IAM permissions as distinct privileges.

## Official documentation

- [Google provider authentication](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference)
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
