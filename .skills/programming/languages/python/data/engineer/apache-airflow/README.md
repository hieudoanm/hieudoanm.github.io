# Apache Airflow Best Practices

Airflow runs **DAGs = DAGs of tasks as code** — each task is a Python operator wired by dependencies; the scheduler launches them on schedules. Practical Airflow leans on **DAG-as-code with clear task structure (@task decorators / TaskGroups), idempotent tasks with retries, scheduling expressed declared (cron/interval with static start_date), and secrets/hooks (Connections & Variables) never inline** — "the DAG is a...

## When to use

Use when writing, structuring, or reviewing Airflow.

## Core topics

- 1. DAG Structure
- 2. Tasks & Dependencies
- 3. Retries & Idempotency
- 4. Scheduling & Backfills
- 5. Secrets & Connections
- 6. CI & Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Apache Airflow Best Practices: Basic Usage](./examples/basic-usage.md)
- [Apache Airflow Best Practices: 3. Retries & Idempotency](./examples/reliability-and-edge-cases.md)
- [Apache Airflow Best Practices: 1. DAG Structure](./examples/setup-and-configuration.md)
- [Apache Airflow Best Practices: 6. CI & Testing](./examples/testing-and-validation.md)

## Assets

- [Apache Airflow Best Practices: Decision Record](./assets/decision-record.md)
- [Apache Airflow Best Practices: Starter Template](./assets/starter-template.md)
- [Apache Airflow Best Practices: Validation Plan](./assets/validation-plan.md)
- [Apache Airflow Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
