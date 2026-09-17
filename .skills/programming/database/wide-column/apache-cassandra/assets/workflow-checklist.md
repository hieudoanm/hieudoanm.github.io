# apache-cassandra: Workflow Checklist

A practical run sheet for applying [apache-cassandra](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Keyspaces** are top-level namespaces; **tables** hold rows of columns within them
- [ ] 1. Core Concepts: **Primary key** = partition key + clustering columns: partitions distribute data via a token ring, clustering orders rows within a partition
- [ ] 2. Data Modeling: **Query-first**: design tables around the exact queries you will run; denormalize freely
- [ ] 2. Data Modeling: Partition by the entity's natural grouping (e.g., user ID); cluster by time or attribute for ordered scans within a partition
- [ ] 3. Indexing and Queries: The **primary partition key determines distribution**; WHERE clauses must typically start with the partition key (or a secondary index/MV)
- [ ] 3. Indexing and Queries: **Secondary indexes** (SASI/legacy) are best for low-cardinality filters on small data; avoid for hot paths
- [ ] 4. Consistency and Availability: Choose consistency based on the access pattern: LOCAL_QUORUM for most production reads/writes; ONE for last-write-wins caches
- [ ] 4. Consistency and Availability: Understand the **consistency vs availability** trade-off — Cassandra favors availability; ALL with a down replica means failed requests
- [ ] 5. Operations and Capacity Planning: Deploy in an odd number of nodes per DC; enable **rack awareness**
- [ ] 5. Operations and Capacity Planning: Right-size **replication_factor** (RF=3 typical) and use **NetworkTopologyStrategy**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
