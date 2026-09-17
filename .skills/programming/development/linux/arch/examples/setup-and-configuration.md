# Arch Linux Best Practices: 6. Config Files & Drift

## Source guidance

This example applies the **6. Config Files & Drift** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pacman never overwrites your edited config.** A changed upstream file arrives as `foo.conf.pacnew`, and your version stays. That is a deliberate safety net and also a permanent maintenance queue.
- **`pacdiff` from `pacman-contrib` is the right way to work through them** — it gives you a side-by-side merge instead of a raw diff.
- **Find the backlog with `find /etc -name '*.pac*'`**, and keep the mirrorlist one short, since it changes constantly.
- **`NoUpgrade` in `pacman.conf` stops a file you never want touched** from even generating a `.pacnew`. Use it for genuinely machine-local files.

## Example

```bash
sudo pacman -Syu pacman-contrib
find /etc -name '*.pacnew' -o -name '*.pacsave' | sort
sudo pacdiff                       # merge each one deliberately
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for arch-linux.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
