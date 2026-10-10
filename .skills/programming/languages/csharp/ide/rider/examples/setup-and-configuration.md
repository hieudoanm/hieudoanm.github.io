# Rider: 2. Project & Solution Model

## Scenario

A project is working on **2. project & solution model** for Rider. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Rider generates a temporary MSBuild solution from the project's `.sln`/`.slnx` and build scripts — it is a view over MSBuild, not a replacement.** If Rider and `dotnet build` disagree, the cause is a property Rider set that CI does not.
- **`.slnx` is the XML solution format and is worth preferring for new solutions:** diff-friendly, no GUID churn, and it is what JetBrains and Microsoft are both steering toward.
- **`Folder` items in a `.sln` are display-only.** They create no directory and affect no compilation. Use real project folders, or a project generator.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Project & Solution Model** section of [SKILL.md](../SKILL.md).
