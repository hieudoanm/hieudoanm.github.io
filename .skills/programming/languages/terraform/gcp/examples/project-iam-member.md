# Additive Project IAM Member

Use an additive member resource when the state owns only this principal's membership.

```hcl
resource "google_project_iam_member" "logs_viewer" {
  project = var.project_id
  role    = "roles/logging.viewer"
  member  = "serviceAccount:${var.workload_service_account}"
}
```

Avoid mixing this with an authoritative binding for the same role and project. Review inherited access and whether a predefined or custom role is appropriate.
