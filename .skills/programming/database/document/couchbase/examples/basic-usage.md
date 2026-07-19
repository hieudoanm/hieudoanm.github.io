# couchbase: Basic Usage

Couchbase — distributed JSON document database with N1QL, key-value access, and built-in caching by the Memcached protocol.

## Scenario

Use this example as a starting point when applying **couchbase** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Access Patterns** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
-- scope + collection keeps the query on one indexed path
SELECT META(c).id, c.name, c.total
FROM `my_bucket`.`store`.`orders` AS c
WHERE c.status = "paid" AND c.createdAt > $since
ORDER BY c.createdAt DESC
LIMIT 50;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
