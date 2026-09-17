# IAM and Resource Security

Review identity-based policies, trust policies, resource policies, permission boundaries, SCPs, and KMS key policies together. A narrow policy in one layer can be overridden by a broad grant elsewhere.

Pay special attention to:

- `Action: "*"` or `Resource: "*"` and missing condition constraints.
- `iam:PassRole`, role trust principals, and policy attachment changes.
- Public or cross-account access to buckets, snapshots, queues, secrets, and keys.
- Security-group ingress/egress, route tables, endpoints, and public IP assignment.
- Encryption at rest, TLS enforcement, key rotation/ownership, logs, backup, and deletion protection.

Prefer AWS-managed controls only when their scope and operational implications fit the requirement. Verify that tagging defaults apply to each resource type; tags are not a security boundary.

## Official documentation

- [AWS provider IAM resources](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role)
- [IAM policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
