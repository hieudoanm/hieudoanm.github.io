# Apache Kafka Best Practices: 2. Topic & Data Modeling

## Source guidance

This example applies the **2. Topic & Data Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Design topics around business events** (past-tense, domain-derived: `order.placed`)
- Use **clear, stable topic naming conventions**
- **Choose partition keys intentionally** — key selects the partition (ordering scope)
- **Do not over-partition prematurely** — partitions = parallelism but also overhead
- **Prefer append-only event schemas**; **version schemas explicitly** (Avro/Protobuf/JSON, Schema Registry)
- **Avoid breaking schema changes** (backward/forward compatible, tolerant readers)
- **Use compaction only when semantics require it** (latest-state topics, e.g. table snapshots)

## Example

A team applying **2. Topic & Data Modeling** to a Apache Kafka Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Design topics around business events** (past-tense, domain-derived: `order.placed`)**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-kafka.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
