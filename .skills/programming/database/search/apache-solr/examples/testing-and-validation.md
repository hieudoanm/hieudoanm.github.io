# Apache Solr: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Apache Solr. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Define schema with proper field types, copyFields, docValues, analysis.
- [ ] Load documents in batches (JSON post + hard commit for production).
- [ ] Build queries with q + fq, correct fl/sort; check explain/plan for perf.
- [ ] Enable faceting with docValues fields; verify cache sizing.
- [ ] Set up SolrCloud with collections/sharding/replicas.
- [ ] Configure ZooKeeper and monitor node health, replicas, and query latency.
- [ ] Schedule backups and validate restore.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
