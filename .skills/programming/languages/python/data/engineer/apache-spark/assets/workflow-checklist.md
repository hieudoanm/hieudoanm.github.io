# Apache Spark Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Spark Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. DataFrame Discipline: **DataFrame/Dataset API over raw RDDs; typed columns, catalog-composed reads:**
- [ ] 1. DataFrame Discipline: **One partition target per column layout; avoid unknown-nested schemas (schema passed at read when it changes).**
- [ ] 2. Transformations & Lineage: **Narrow chains stay cheap; trigger breaks via wide ops only where needed:**
- [ ] 2. Transformations & Lineage: **filter/select/withColumn narrow; groupBy/join/repartition wide (shuffle).**
- [ ] 3. Partitioning & Skew: **Partition on the join key direction — repartition(expr) realistically sized:**
- [ ] 3. Partitioning & Skew: **coalesce for shipping down data; bucketBy for pre-partitioned tables.**
- [ ] 4. Joins & Shuffle Control: **Broadcast small tables explicitly (hint: "broadcast") — same-key shuffle avoided:**
- [ ] 4. Joins & Shuffle Control: **spark.sql.autoBroadcastJoinThreshold default fine; explicit for controls.**
- [ ] 5. Caching & Persistence: **Persist only reused intermediate datasets — cache() + unpersist() intentionally:**
- [ ] 5. Caching & Persistence: **MEMORY_AND_DISK/disk levels for-large frames; unpersist anything persisted past use.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
