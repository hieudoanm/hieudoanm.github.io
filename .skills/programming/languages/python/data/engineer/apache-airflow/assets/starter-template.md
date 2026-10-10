# Apache Airflow Best Practices: Starter Template

A reusable starting point derived from the **1. DAG Structure** section of [Apache Airflow Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
