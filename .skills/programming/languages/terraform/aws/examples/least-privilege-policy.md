# Scoped S3 Read Policy Pattern

This illustrates a constrained resource ARN; adapt actions, partition, account, and conditions to the actual access need.

```hcl
data "aws_iam_policy_document" "read_artifacts" {
  statement {
    sid       = "ReadNamedArtifacts"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${var.artifact_bucket_arn}/releases/*"]
  }
}
```

Do not grant bucket listing, writes, or wildcard resources unless justified. Review bucket policy, KMS permissions, SCPs, and the consuming role together.
