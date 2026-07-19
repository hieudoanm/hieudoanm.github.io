# Matplotlib Best Practices: 2. Style

## Source guidance

This example applies the **2. Style** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Aesthetic consistency — a named palette + coherent ticks/grid:**
- **`cycler`/`Set2`-style colormaps over the default rainbow; labels + legend on every plot.**
- **Tick formatting via `matplotlib.ticker.FuncFormatter` where scale matters (sparse + readable).**

## Example

```python
fig, ax = plt.subplots()
ax.set_facecolor("white")
ax.grid(True, which="both", axis="y", color="#eee")
ax.tick_params(axis="both", labelsize=9)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for matplotlib-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
