# AWS Resource Lifecycle

Assess AWS-specific replacement, data-loss, quota, and cost behavior before applying:

- Stateful databases, file systems, buckets, queues, and logs need explicit retention, backup, and recovery decisions.
- KMS key deletion has a waiting period and can make encrypted data unrecoverable; key policy and grants also affect access.
- IAM role/name changes can disrupt workloads; preserve trust and permission behavior during migration.
- Security group and routing updates can cause exposure or outages even without resource replacement.
- Availability zones and service features vary by region and account.

Use deletion protection and Terraform lifecycle safeguards only as deliberate layers. Confirm out-of-band controllers and service-managed properties before reconciling drift.

## Official documentation

- [AWS provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
