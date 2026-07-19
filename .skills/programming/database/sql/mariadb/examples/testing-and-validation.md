# MariaDB Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for MariaDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] MariaDB 10.6+ targeted; engines chosen explicitly per workload
- [ ] Always-on primary key; explicit transactions; FK usage intentional
- [ ] MySQL compatibility assumptions verified; no undocumented-behavior reliance
- [ ] Indexes based on real query paths, validated with `EXPLAIN`
- [ ] Isolation levels conscious; deadlock retry handled; short transactions
- [ ] Least-privilege users; no plaintext secrets; production access restricted
- [ ] Backups tested; replication/Galera topology understood and monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
