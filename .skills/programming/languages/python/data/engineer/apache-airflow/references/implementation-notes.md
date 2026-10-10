# Implementation notes

Focused reference for **apache-airflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
