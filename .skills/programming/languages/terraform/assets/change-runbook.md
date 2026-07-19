# Terraform Change Runbook

1. Confirm repository instructions, target boundary, backend, identity, lock file, and approved change window.
2. Review source changes and run formatting, validation, static analysis, and policy checks.
3. Create a plan from the exact revision; inspect sensitive changes, replacements, deletes, and drift.
4. Obtain required review. Apply only the approved, current plan using the authorized pipeline.
5. Verify expected infrastructure, service health, outputs, and monitoring.
6. Record results and deviations. If apply fails, preserve logs safely and follow the documented recovery path; do not edit state speculatively.
