# Google Cloud Resource Lifecycle

Review replacement, dependency, and deletion behavior for:

- Project APIs and services; disabling an API can break resources or other states.
- Service accounts, keys, IAM, and workload identity bindings.
- VPCs, subnetworks, firewall rules, routes, NAT, and shared VPC attachments.
- KMS keys, buckets, databases, and other resources containing protected data.
- Project/folder-level policy and billing associations.

Confirm APIs, quotas, regions/zones, organization policy, and billing availability. Use deletion protection, backups, and retention as separate safeguards; none substitutes for a tested recovery plan.

## Official documentation

- [Google provider documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Google Cloud Well-Architected Framework](https://cloud.google.com/architecture/framework)
