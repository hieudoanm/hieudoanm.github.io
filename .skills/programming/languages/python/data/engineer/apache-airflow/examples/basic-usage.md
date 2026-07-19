# Apache Airflow Best Practices: Basic Usage

Best practices for workflow orchestration with Apache Airflow — the DAG/task conventions for scheduled data pipelines. Use when writing, structuring, or reviewing Airflow — covers DAG structure, tasks, dependencies, retries, scheduling, secrets, and CI.

## Scenario

Use this example as a starting point when applying **apache-airflow-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. DAG Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
from airflow import DAG
from airflow.decorators import dag, task

@dag(schedule="0 2 * * *", start_date=datetime(2024, 1, 1), catchup=False)
def nightly_sync():
    @task
    def extract(): ...      # returns data
    @task
    def load(data): ...     # consumes
    load(extract())

nightly_sync()
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
