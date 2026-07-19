# nvm: 1. Install

## Source guidance

This example applies the **1. Install** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Install via the official script, not npm.** nvm is a shell library sourced from `nvm.sh`; the `nvm` npm package is deprecated and does not do this job.
- **Review the script before piping it to bash.** It edits your shell profile; that deserves a read, especially on a work machine.
- **nvm requires bash, zsh, or ksh.** It is not a binary and will not work from `sh`, from a Makefile, or from a non-interactive CI shell that has not sourced your profile.
- **On macOS, install the Xcode Command Line Tools first** (`xcode-select --install`) — the installer checks for `cc` and fails confusingly without it.

## Example

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nvm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
