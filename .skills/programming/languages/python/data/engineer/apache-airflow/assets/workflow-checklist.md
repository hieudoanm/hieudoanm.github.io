# Apache Airflow Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Airflow Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. DAG Structure: **One DAG per pipeline; graph dependencies expressed, not hidden:**
- [ ] 1. DAG Structure: **schedule + catchup + start_date declared (with catchup=False default in modern).**
- [ ] 2. Tasks & Dependencies: **One responsibility per task; data passed via XCom only in small paths (retries refetch):**
- [ ] 2. Tasks & Dependencies: **>>-chains and [a, b] >> c for fan-in/fan-out; branch (@task.branch) explicitly.**
- [ ] 3. Retries & Idempotency: **Every task idempotent — rerunning a task the same result, no duplicate side effects:**
- [ ] 3. Retries & Idempotency: **Retries tuned per operator (network tasks more, pure transforms zero).**
- [ ] 4. Scheduling & Backfills: **catchup=False for daily jobs unless a backfill is intentional; schedule expressed as cron/Preset.**
- [ ] 4. Scheduling & Backfills: **Backfills run explicitly (airflow dags backfill) — never default catch-up on a long-start DAG.**
- [ ] 5. Secrets & Connections: **Connections/Variables via the Airflow metadata (NOT inline):**
- [ ] 5. Secrets & Connections: **Secrets backend (Vault/SSM) for production; never hardcode tokens in the DAG.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
