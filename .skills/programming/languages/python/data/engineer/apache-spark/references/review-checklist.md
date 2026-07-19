# Review checklist

Focused reference for **apache-spark-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
