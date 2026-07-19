# Statsmodels Best Practices: 6. Reproducibility & Testing

## Source guidance

This example applies the **6. Reproducibility & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Seeded/`random_state` where applicable; export `params`/`conf_int`/diagnostics to parquet/CSV for reporting.**
- **Tests: assert coefficient sign/range on synthetic data; pytest-parametrize spec variants; snapshot summary outputs.**
- **Version-pin `statsmodels`; note formula strings in comments so the spec travels.**

## Example

A team applying **6. Reproducibility & Testing** to a Statsmodels Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Seeded/`random_state` where applicable; export `params`/`conf_int`/diagnostics to parquet/CSV for reporting.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for statsmodels-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
