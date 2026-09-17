# Overview

Focused reference for **apache-airflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Apache Airflow Best Practices

Airflow runs **DAGs = DAGs of tasks as code** — each task is a Python operator wired by dependencies; the scheduler launches them on schedules. Practical Airflow leans on **DAG-as-code with clear task structure (`@task` decorators / TaskGroups), idempotent tasks with retries, scheduling expressed declared (cron/interval with static start_date), and secrets/hooks (Connections & Variables) never inline** — "the DAG is a directed specification; each operator is a unit that can rerun alone."

---

## 1. DAG Structure

- **One DAG per pipeline; graph dependencies expressed, not hidden:**

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

- **`schedule` + `catchup` + `start_date` declared (with catchup=False default in modern).**
- **`TaskGroup` for sub-flows; `@task` dataset freshness vs full DAG.**
- **Keep DAGs file-light: shared logic in plugins/libs, not re-copied in the DAG file.**

---

## 2. Tasks & Dependencies
