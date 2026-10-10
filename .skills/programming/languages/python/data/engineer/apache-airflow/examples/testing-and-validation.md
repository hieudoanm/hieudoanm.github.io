# Apache Airflow Best Practices: 6. CI & Testing

## Source guidance

This example applies the **6. CI & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **DAG validity CI: `python -c "from airflow.models import DAG; import glob; dag files import"` gate.**
- **Unit-test tasks with mocked hooks/APIs; run operator locally (`airflow tasks test dag task date`) for golden checks.**
- **Staging/schedule tests against the same Airflow version (`airflow==x.y.z` pinned in requirements).**
- **Pipeline changes reviewed as PRs; DAG id + params versioned; deploy via packaged DAGs/hooks.**

## Example

A team applying **6. CI & Testing** to a Apache Airflow Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****DAG validity CI: `python -c "from airflow.models import DAG; import glob; dag files import"` gate.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for apache-airflow-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
