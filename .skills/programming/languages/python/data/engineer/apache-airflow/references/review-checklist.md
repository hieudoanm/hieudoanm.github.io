# Review checklist

Focused reference for **apache-airflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
