# Apache Spark Best Practices: 6. Structured Streaming

## Source guidance

This example applies the **6. Structured Streaming** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Declarative streaming = DataFrame APIs on a stream:**
- **`outputMode` semantic (append/update/complete) matched to aggregation state.**
- **Checkpointing (`checkpointLocation`) mandatory for exactly-once semantics.**
- **Watermarks (`withWatermark`) bound late-data state; trigger intervals explicit.**

## Example

```python
stream_df = (spark.readStream.format("kafka")
             .option("kafka.bootstrap.servers", servers)
             .load())
query = (stream_df.selectExpr("CAST(value AS STRING)")
         .writeStream.outputMode("append")
         .format("console").start())
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-spark-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
