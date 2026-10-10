# Apache Pulsar Best Practices: 2. Topic, Subscription & Schema Design

## Source guidance

This example applies the **2. Topic, Subscription & Schema Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Design topics by domain and ownership**; use **namespaces for quotas and isolation**
- **Choose subscription type intentionally:**
- `exclusive` — strict ordering, single consumer
- `shared` — scale-out across consumers, no ordering guarantee
- `failover` — one active consumer + standby
- `key_shared` — ordered sharding by message key across consumers
- **Use schemas to enforce compatibility**; **version schemas safely** (backward/forward)

## Example

A team applying **2. Topic, Subscription & Schema Design** to a Apache Pulsar Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Design topics by domain and ownership**; use **namespaces for quotas and isolation****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-pulsar.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
