# AWS Identity and Boundaries

## Deployment identity

Use short-lived federation or role assumption with a narrowly scoped trust policy. In CI, bind OIDC trust to the expected repository, branch or environment, and audience. Avoid long-lived user keys and shared administrator roles.

Before plan/apply, confirm `sts:GetCallerIdentity` resolves to the expected account and role. Use provider `allowed_account_ids` as an additional guard, not as a replacement for CI authorization.

## Accounts and regions

Represent each account/region boundary explicitly. Use named provider aliases for exceptional cross-account or cross-region resources and pass them to modules intentionally. Keep separate state and deployment approvals for independent security boundaries.

Validate partition-sensitive ARNs and service availability in the selected region. Do not infer production from workspace name alone.

## Permissions

Planning and applying can require different API actions. Derive permissions from the actual provider operations and policy tooling; test least privilege in a non-production boundary and document unavoidable wildcards with owners and conditions.

## Official documentation

- [AWS provider authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration)
- [AWS IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
