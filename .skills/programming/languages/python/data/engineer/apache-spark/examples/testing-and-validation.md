# Apache Spark Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] DataFrame/Dataset API; schema/staging explicit at read
- [ ] Narrow transforms; no per-row UDFs (pandas_udf only when needed)
- [ ] Partitioning on join keys; skew/salting handled
- [ ] Broadcast hints for small tables; shuffle partitions tuned
- [ ] `persist()`/`unpersist()` paired for reused intermediates
- [ ] Streaming: outputMode + checkpoint + watermarks defined
- [ ] Adaptive enabled; Spark UI consulted for shuffle spills

## Example

A team applying **Quick-Start Checklist** to a Apache Spark Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] DataFrame/Dataset API; schema/staging explicit at read**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apache-spark-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
