# GitHub Actions Best Practices: 4. Job Configuration

## Source guidance

This example applies the **4. Job Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Configure jobs with appropriate runners:**
- **Use appropriate runners (ubuntu-latest, windows-latest, macos-latest).**
- **Set timeout limits to prevent runaway jobs.**
- **Use job dependencies with `needs`.**

## Example

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for github-actions-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
