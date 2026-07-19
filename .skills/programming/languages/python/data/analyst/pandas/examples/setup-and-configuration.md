# Pandas Best Practices: 1. Reading & Clean Types

## Source guidance

This example applies the **1. Reading & Clean Types** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Declare dtypes at read — `dtype=`, `parse_dates=`, `usecols=` minimize post-import fixing:**
- **`pd.read_parquet`/`to_parquet` for storage efficiency; explicit `dtype` maps for schema.**
- **Validate the first thousand rows: `.dtypes`, `df.head()`, `df["col"].unique()` — schema before transformation.**

## Example

```python
import pandas as pd
df = pd.read_csv("events.csv", parse_dates=["ts"], dtype={"user_id": "string"})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for pandas-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
