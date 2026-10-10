# Core Workflow and Lifecycle

## Resource lifecycle

Terraform compares configuration with state and provider observations to propose actions. A plan is a proposal, not a guarantee that the remote API will succeed or that out-of-band changes cannot occur before apply.

Before planning, establish the exact CLI, provider lock file, credentials, backend, workspace, and target boundary. Keep the plan and apply on the same reviewed revision and identity context.

## Resource identity

Resource addresses are part of the state contract. Prefer `for_each` with stable keys for independently managed objects. Reordering a list used with `count` can shift identity and cause replacements. Use `moved` blocks for intentional address refactors; review the resulting plan.

## Lifecycle settings

`prevent_destroy` is a guardrail, not a backup. `ignore_changes` should be narrow and documented with the external owner. `create_before_destroy` may require unique names, temporary capacity, or compatible dependencies; it can increase cost and is not universally safe.

Avoid provisioners for normal configuration. They are difficult to model, retry, and clean up; prefer provider resources, cloud-init where appropriate, or a separately managed configuration system.

## Pinning

Use compatible version constraints for Terraform and providers, then commit the root configuration's lock file to select exact provider builds and checksums. Upgrade deliberately, inspect changelogs, run validation and representative plans, and update lock-file platform entries through the normal toolchain.

## Official documentation

- [Terraform language](https://developer.hashicorp.com/terraform/language)
- [Terraform lifecycle meta-arguments](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle)
