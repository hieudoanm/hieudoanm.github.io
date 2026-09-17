# Apache Airflow Best Practices: 3. Retries & Idempotency

## Source guidance

This example applies the **3. Retries & Idempotency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Every task idempotent — rerunning a task the same result, no duplicate side effects:**
- **Retries tuned per operator (network tasks more, pure transforms zero).**
- **Task-level `retry_*` where the failure is transient; `max_active_runs`/`concurrency` to avoid stampedes.**

## Example

```python
@task(retries=3, retry_delay=timedelta(minutes=5))
def load():
    # upsert by business key, truncate+reinsert or write-then-publish
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-airflow-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
