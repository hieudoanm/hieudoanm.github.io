# Apache Spark Best Practices: Starter Template

A reusable starting point derived from the **6. Structured Streaming** section of [Apache Spark Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
stream_df = (spark.readStream.format("kafka")
             .option("kafka.bootstrap.servers", servers)
             .load())
query = (stream_df.selectExpr("CAST(value AS STRING)")
         .writeStream.outputMode("append")
         .format("console").start())
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
