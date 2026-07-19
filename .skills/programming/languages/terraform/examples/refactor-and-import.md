# State-Preserving Refactor and Import (AWS Illustration)

For a deliberate address change, preserve the state binding with a `moved` block. This example uses an AWS resource address; substitute the actual provider resource type in your configuration.

```hcl
moved {
  from = aws_s3_bucket.logs
  to   = module.storage.aws_s3_bucket.logs
}
```

For Terraform versions supporting declarative import blocks, declare the existing object and review the import plan before applying:

```hcl
import {
  to = aws_s3_bucket.logs
  id = "existing-audit-logs"
}
```

Confirm the provider's import identifier and version-specific support. Importing binds state; it does not prove the configuration matches the real object. Reconcile configuration and review the subsequent plan before changing it.
