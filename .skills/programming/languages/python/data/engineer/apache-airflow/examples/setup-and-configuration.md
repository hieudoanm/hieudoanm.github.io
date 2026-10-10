# Apache Airflow Best Practices: 1. DAG Structure

## Source guidance

This example applies the **1. DAG Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One DAG per pipeline; graph dependencies expressed, not hidden:**
- **`schedule` + `catchup` + `start_date` declared (with catchup=False default in modern).**
- **`TaskGroup` for sub-flows; `@task` dataset freshness vs full DAG.**
- **Keep DAGs file-light: shared logic in plugins/libs, not re-copied in the DAG file.**

## Example

This excerpt is from the cited **1. DAG Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-airflow-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
