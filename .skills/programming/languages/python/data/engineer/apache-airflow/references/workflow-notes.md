# Workflow notes

Focused reference for **apache-airflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
