# Windows App Development: 3. Architecture

## Source guidance

This example applies the **3. Architecture** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Four layers, dependencies pointing down only:** Views (XAML + code-behind, no business logic) → ViewModels (commands, presentation state) → Services (business rules, orchestration) → Repositories (data access, caching).
- **A ViewModel must never reference a UI type** — no `Page`, `Window`, `ContentDialog`, or `DispatcherQueue`. That single rule is what makes the layer testable without a window.
- **Put ViewModels and Services in a separate class library** so the test project can reference them without pulling in the WinUI project. A test project that references a WinUI app project inherits its build complexity for no benefit.

## Example

A team applying **3. Architecture** to a Windows App Development project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Four layers, dependencies pointing down only:** Views (XAML + code-behind, no business logic) → ViewModels (commands, presentation state) → Services (business rules, orchestration) → Repositories (data access, caching).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for windows-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
