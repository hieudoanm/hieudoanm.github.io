---
name: apache-spark-best-practices
description: Best practices for distributed data processing with Apache Spark — the DataFrame/Dataset and structured-streaming conventions. Use when writing, structuring, or reviewing Spark (PySpark or Scala) — covers dataframes, transformations, partitioning, joins, shuffle control, and streaming.
---

# Apache Spark Best Practices

Spark is a **distributed compute engine — DataFrames/RDD executed as lazy transformations against a cluster** (transfer: wide vs narrow dependencies). Practical Spark leans on **DataFrame/Dataset APIs (optimization, not RDD), narrow transformations, partitioning/skew management, broadcast joins for small tables, and shuffle minimization** — "lazy, partitioned, minimal-shuffle" describes the discipline; the Spark UI is your profiler.

---

## 1. DataFrame Discipline

- **DataFrame/Dataset API over raw RDDs; typed columns, catalog-composed reads:**

```python
df = (spark.read.parquet("s3://…/events")
      .filter(col("ts") >= start)
      .select("user_id", "amount"))
```

- **One partition target per column layout; avoid unknown-nested schemas (schema passed at read when it changes).**
- **Let Catalyst optimize — express intent as declarative transforms, not sequential micro-appends.**

---

## 2. Transformations & Lineage

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

```python
from pyspark.sql import functions as F
big_join = big.join(F.broadcast(small), "customer_id", "left")
```

- **`spark.sql.autoBroadcastJoinThreshold` default fine; explicit for controls.**
- **Bucket-join / sort-merge by key layout; never tiny-key self-joins.**
- **Redistribute before heavy keys; check the Spark UI for excessive shuffle reads.**

---

## 5. Caching & Persistence

- **Persist only reused intermediate datasets — `cache()` + `unpersist()` intentionally:**

```python
intermediate = cleaned.filter(...).persist()
aggregate_a = intermediate.groupBy("k").count()
aggregate_b = intermediate.groupBy("h").sum("v")
intermediate.unpersist()
```

- **`MEMORY_AND_DISK`/`disk` levels for-large frames; unpersist anything persisted past use.**
- **Caching dead datasets doubles memory; the UI shows the reuse count.**

---

## 6. Structured Streaming

- **Declarative streaming = DataFrame APIs on a stream:**

```python
stream_df = (spark.readStream.format("kafka")
             .option("kafka.bootstrap.servers", servers)
             .load())
query = (stream_df.selectExpr("CAST(value AS STRING)")
         .writeStream.outputMode("append")
         .format("console").start())
```

- **`outputMode` semantic (append/update/complete) matched to aggregation state.**
- **Checkpointing (`checkpointLocation`) mandatory for exactly-once semantics.**
- **Watermarks (`withWatermark`) bound late-data state; trigger intervals explicit.**

---

## General Rules of Thumb

- **DataFrames only; declarative transforms; let Catalyst plan.**
- **Minimize shuffle — broadcast small, partition by join keys, avoid per-row UDFs.**
- **Partition for the join skew; salting documented workaround.**
- **Persist reused intermediates; `unpersist()`.**
- **Spark UI is the profiler; adaptive/query-plan features on.**

---

## Quick-Start Checklist

- [ ] DataFrame/Dataset API; schema/staging explicit at read
- [ ] Narrow transforms; no per-row UDFs (pandas_udf only when needed)
- [ ] Partitioning on join keys; skew/salting handled
- [ ] Broadcast hints for small tables; shuffle partitions tuned
- [ ] `persist()`/`unpersist()` paired for reused intermediates
- [ ] Streaming: outputMode + checkpoint + watermarks defined
- [ ] Adaptive enabled; Spark UI consulted for shuffle spills