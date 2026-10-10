# Service-Account Impersonation

The CI identity obtains short-lived credentials by impersonating the deployment service account through the approved federation setup.

```hcl
provider "google" {
  project                     = var.project_id
  region                      = var.region
  impersonate_service_account = var.deployment_service_account
}
```

Grant impersonation only to the trusted workload identity and only for the intended deployment boundary. Avoid service-account key JSON in variables, files, or CI logs.
