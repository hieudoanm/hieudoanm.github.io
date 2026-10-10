# Apache Spark Best Practices: 3. Partitioning & Skew

## Source guidance

This example applies the **3. Partitioning & Skew** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Partition on the join key direction — `repartition(expr)` realistically sized:**
- **`coalesce` for shipping down data; `bucketBy` for pre-partitioned tables.**
- **Skew mitigations: `salting` keys, `skewedKeys` (`spark.sql.shuffle.partitions` tuned), or `joinWith` casting.**
- **Balance: `spark.sql.files.maxPartitionBytes`, `adaptive` (`spark.sql.adaptive.enabled`) on by default in modern versions.**

## Example

```python
big = big.repartition(col("customer_id"), N)
small = small.repartition(col("customer_id"), N)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-spark-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
