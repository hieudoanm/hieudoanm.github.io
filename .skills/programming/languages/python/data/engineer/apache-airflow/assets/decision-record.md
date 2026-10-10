# Apache Airflow Best Practices: Decision Record

Use this record when applying [Apache Airflow Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for workflow orchestration with Apache Airflow — the DAG/task conventions for scheduled data pipelines. Use when writing, structuring, or reviewing Airflow — covers DAG structure, tasks, dependencies, retries, scheduling, secrets, and CI.

Airflow runs **DAGs = DAGs of tasks as code** — each task is a Python operator wired by dependencies; the scheduler launches them on schedules. Practical Airflow leans on **DAG-as-code with clear task structure (@task decorators / TaskGroups), idempotent tasks with retries, scheduling expressed declared (cron/interval with static start_date), and secrets/hooks (Connections & Variables) never inline** — "the DAG is a directed specification; each operator is a unit that can rerun alone."

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. DAG Structure
- [ ] 2. Tasks & Dependencies
- [ ] 3. Retries & Idempotency
- [ ] 4. Scheduling & Backfills
- [ ] 5. Secrets & Connections
- [ ] 6. CI & Testing
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
