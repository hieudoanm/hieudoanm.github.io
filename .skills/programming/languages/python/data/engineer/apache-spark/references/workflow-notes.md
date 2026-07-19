# Workflow notes

Focused reference for **apache-spark-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Narrow chains stay cheap; trigger breaks via wide ops only where needed:**
- **`filter`/`select`/`withColumn` narrow; groupBy/join/repartition wide (shuffle).**
- **Compose in readable steps; avoid deep chained `withColumn` towers (readability).**
- **No per-row Python UDFs — vectorized `pandas_udf` or native expressions when possible.**

---

## 3. Partitioning & Skew

- **Partition on the join key direction — `repartition(expr)` realistically sized:**

```python
big = big.repartition(col("customer_id"), N)
small = small.repartition(col("customer_id"), N)
```

- **`coalesce` for shipping down data; `bucketBy` for pre-partitioned tables.**
- **Skew mitigations: `salting` keys, `skewedKeys` (`spark.sql.shuffle.partitions` tuned), or `joinWith` casting.**
- **Balance: `spark.sql.files.maxPartitionBytes`, `adaptive` (`spark.sql.adaptive.enabled`) on by default in modern versions.**

---

## 4. Joins & Shuffle Control

- **Broadcast small tables explicitly (`hint: "broadcast"`) — same-key shuffle avoided:**
