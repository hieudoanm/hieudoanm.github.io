# Implementation notes

Focused reference for **apache-spark-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
