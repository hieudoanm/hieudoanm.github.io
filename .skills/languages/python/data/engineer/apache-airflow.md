---
name: apache-airflow-best-practices
description: Best practices for workflow orchestration with Apache Airflow — the DAG/task conventions for scheduled data pipelines. Use when writing, structuring, or reviewing Airflow — covers DAG structure, tasks, dependencies, retries, scheduling, secrets, and CI.
---

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

- **One responsibility per task; data passed via XCom only in small paths (retries refetch):**

```python
@task
def extract() -> dict:
    result = api.pull()
    return result        # small payload — XCom OK

@task
def transform(payload: dict) -> dict:
    ...
```

- **`>>`-chains and `[a, b] >> c` for fan-in/fan-out; branch (`@task.branch`) explicitly.**
- **Large intermediate state → object storage (S3/DB), not XCom (size limits).**
- **`DAG.timeout`/`sla` for SLA checks; trigger rules (`all_success`, `one_failed`) explicit where diverging from default.**

---

## 3. Retries & Idempotency

- **Every task idempotent — rerunning a task the same result, no duplicate side effects:**

```python
@task(retries=3, retry_delay=timedelta(minutes=5))
def load():
    # upsert by business key, truncate+reinsert or write-then-publish
```

- **Retries tuned per operator (network tasks more, pure transforms zero).**
- **Task-level `retry_*` where the failure is transient; `max_active_runs`/`concurrency` to avoid stampedes.**

---

## 4. Scheduling & Backfills

- **`catchup=False` for daily jobs unless a backfill is intentional; schedule expressed as cron/Preset.**

```python
@dag(schedule="0 3 * * *", start_date=datetime(2024, 1, 1), catchup=False, dag_id="reports")
```

- **Backfills run explicitly (`airflow dags backfill`) — never default catch-up on a long-start DAG.**
- **Timezone/DST: `timezone` set on DAG; cron semantics documented; static `start_date` (not relative).**

---

## 5. Secrets & Connections

- **Connections/Variables via the Airflow metadata (NOT inline):**

```python
from airflow.models import Variable
token = Variable.get("API_TOKEN")          # or a Secret backend (Vault/AWS SM)
```

- **Secrets backend (Vault/SSM) for production; never hardcode tokens in the DAG.**
- **`Connection` (HTTP/Postgres/etc.) used via hooks (`PostgresHook.get_conn()`) — no hand-rolled creds.**

---

## 6. CI & Testing

- **DAG validity CI: `python -c "from airflow.models import DAG; import glob; dag files import"` gate.**
- **Unit-test tasks with mocked hooks/APIs; run operator locally (`airflow tasks test dag task date`) for golden checks.**
- **Staging/schedule tests against the same Airflow version (`airflow==x.y.z` pinned in requirements).**
- **Pipeline changes reviewed as PRs; DAG id + params versioned; deploy via packaged DAGs/hooks.**

---

## General Rules of Thumb

- **DAG-as-code with `@task`/`TaskGroup`; dependencies explicit.**
- **Idempotent tasks with tuned retries; XCom for small flows only.**
- **Schedule declared (`schedule_start/catchup`), static start_date, backfills explicit.**
- **Secrets via backend/Connections; never inline.**
- **CI import-gate + mocked task tests; Airflow version pinned.**

---

## Quick-Start Checklist

- [ ] `@dag` with `schedule`/`catchup`/static `start_date`; one DAG per pipeline
- [ ] `@task` single-responsibility; explicit dependencies (>>, branches)
- [ ] Idempotent tasks; retries tuned; no duplicate side effects on rerun
- [ ] XCom small only; large state in object storage
- [ ] Secrets via Variables/Connections/backend; none inline
- [ ] CI import-gate + task unit tests; version pinned; PR-reviewed changelog