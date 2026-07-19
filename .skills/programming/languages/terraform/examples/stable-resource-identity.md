# Stable Resource Identity

Use durable keys when each object must retain identity through list reordering.

```hcl
variable "jobs" {
  type = map(string)
}

resource "terraform_data" "job" {
  for_each = var.jobs
  input = {
    name    = each.key
    command = each.value
  }
}
```

`terraform_data` is built into Terraform and demonstrates stable `for_each` addresses without selecting a cloud provider. Changing a key changes the Terraform address; use a `moved` block when renaming an address intentionally, and inspect the plan for replacement or deletion.
