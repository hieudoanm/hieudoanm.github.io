# Overview

Focused reference for **apache-spark-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
