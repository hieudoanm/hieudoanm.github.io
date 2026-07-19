# Apache Spark Best Practices: Basic Usage

Best practices for distributed data processing with Apache Spark — the DataFrame/Dataset and structured-streaming conventions. Use when writing, structuring, or reviewing Spark (PySpark or Scala) — covers dataframes, transformations, partitioning, joins, shuffle control, and streaming.

## Scenario

Use this example as a starting point when applying **apache-spark-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. DataFrame Discipline** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
df = (spark.read.parquet("s3://…/events")
      .filter(col("ts") >= start)
      .select("user_id", "amount"))
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
