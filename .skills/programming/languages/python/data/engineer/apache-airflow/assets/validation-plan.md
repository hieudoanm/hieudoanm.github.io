# Apache Airflow Best Practices: Validation Plan

Use this plan to verify work guided by [Apache Airflow Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **DAG validity CI: python -c "from airflow.models import DAG; import glob; dag files import" gate.**
- [ ] **Unit-test tasks with mocked hooks/APIs; run operator locally (airflow tasks test dag task date) for golden checks.**
- [ ] **Staging/schedule tests against the same Airflow version (airflow==x.y.z pinned in requirements).**
- [ ] **Pipeline changes reviewed as PRs; DAG id + params versioned; deploy via packaged DAGs/hooks.**

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
