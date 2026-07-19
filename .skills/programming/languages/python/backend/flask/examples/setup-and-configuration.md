# Flask Best Practices: 2. Configuration

## Source guidance

This example applies the **2. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Config objects by environment; env-vars override; secrets external:**
- **Never ship secrets in config; `instance_relative_config`/`.env` for local only.**
- **`DEBUG`/`TESTING` per env; logging configured in the factory.**

## Example

```python
class ProdConfig:
    SECRET_KEY = os.environ["FLASK_SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for flask-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
