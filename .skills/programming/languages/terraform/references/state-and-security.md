# State and Security

## State is sensitive

State can include resource attributes, provider-returned values, and secrets even when the corresponding input is marked `sensitive`. Protect backend access, encryption keys, logs, local copies, backups, and saved plans according to the most sensitive value stored.

Never commit state, crash logs, `.terraform/`, credential files, or unreviewed plan files. Use a remote backend with organization-approved access controls, encryption, recovery/versioning, and locking.

## State boundaries

Split state by ownership, lifecycle, and security blast radius—not merely directory names. Cross-state values need a controlled interface; do not grant broad state access solely for convenience.

Workspaces select state instances but are not authorization boundaries. Isolate environments and tenants with backend keys, separate identities, or separate accounts/projects/subscriptions when required.

## Secrets and identity

Prefer short-lived federated or workload identities. Do not hard-code access keys, client secrets, service-account keys, passwords, or tokens in HCL, variables files, outputs, or CI definitions.

Restrict data-source reads and resource permissions. Review plan and debug output for secret leakage; avoid enabling verbose provider logging in shared CI.

## Recovery

Use backend locking and documented recovery procedures. State commands can change the control plane without changing real infrastructure; only use them after review, with a backup and explicit understanding of the intended address and object.

## Official documentation

- [State](https://developer.hashicorp.com/terraform/language/state)
- [Backend configuration](https://developer.hashicorp.com/terraform/language/backend)
- [Sensitive data](https://developer.hashicorp.com/terraform/language/manage-sensitive-data)
