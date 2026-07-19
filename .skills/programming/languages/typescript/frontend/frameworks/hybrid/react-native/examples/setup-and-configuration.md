# React Native Best Practices: 2. Project Structure

## Source guidance

This example applies the **2. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Feature-based organization** — organize by feature or screen
- **Reusable components** — separate reusable UI components
- **TypeScript types** — centralize type definitions
- **Platform-specific code** — use platform-specific file extensions

## Example

A team applying **2. Project Structure** to a React Native Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Feature-based organization** — organize by feature or screen**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for react-native-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
