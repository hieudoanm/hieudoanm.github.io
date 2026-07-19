# Visual Studio: Workflow Checklist

A practical run sheet for applying [Visual Studio](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Channels: **VS 2026 versions as 18.x** — 18.10.2 is current stable. Enterprise, Professional, and Community share the 18.x line; features are gated by licence, and Community's cap is a revenue/headcount threshold rather than a feature tier
- [ ] 1. Editions & Channels: **Two free alternatives are legitimate**: Community for individual/small-team work, and **Rider** for a genuinely better cross-platform experience. Neither is a compromise for most projects
- [ ] 2. Solution Structure: **A .sln is a container with build-configuration state inside it.** Prefer .slnx (the XML solution format) for new solutions: it is diff-friendly, generated-file friendly, and Microsoft is steering toward it
- [ ] 2. Solution Structure: **Folder items in a .sln are display-only** and do not create a directory or affect compilation. Use actual project folders or, better, a project generator
- [ ] 3. Build Configuration: **The IDE is a view over MSBuild.** If dotnet build and the IDE disagree, the cause is almost always a property the IDE set but CI does not — environment variables, user-level .props, or a machine-wide import
- [ ] 3. Build Configuration: **Put shared properties in Directory.Build.props**, not by editing each .csproj. Directory.Build.targets for targets. They are discovered by walking up from the project directory
- [ ] 4. Startup & Performance: **Startup cost is dominated by solution size and analyzer work**, not the IDE itself. A solution that takes minutes to load is a solution with too many projects or too many analyzers
- [ ] 4. Startup & Performance: **Disable unused workload components and extensions** at install time. Every installed component is loaded whether or not you use it
- [ ] 5. Debugging: **Hot Reload (Edit and Continue) is the feature to rely on for iteration.** It patches running managed code without a restart — but only for changes it can apply. Changing a method signature, adding a field, or editing a static constructor forces a restart
- [ ] 5. Debugging: **Turn on Hot Reload explicitly for .NET 6+ projects** if it is not offered; it is not always enabled for every project type, and it does not work for native or unsafe-heavy code

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
