# Rider: Workflow Checklist

A practical run sheet for applying [Rider](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Positioning: **Rider is commercial, with free student, open-source, and 30-day trial licences.** There is no Community edition; the free licences are per-user and require verification
- [ ] 1. Editions & Positioning: **Rider and Visual Studio are peers for .NET work.** Neither is deprecated, and JetBrains/Microsoft co-maintain the ReSharper engine, so analysis quality is close. Choose on platform, licence, and preference
- [ ] 2. Project & Solution Model: **Rider generates a temporary MSBuild solution from the project's .sln/.slnx and build scripts — it is a view over MSBuild, not a replacement.** If Rider and dotnet build disagree, the cause is a property Rider set that CI does not
- [ ] 2. Project & Solution Model: **.slnx is the XML solution format and is worth preferring for new solutions:** diff-friendly, no GUID churn, and it is what JetBrains and Microsoft are both steering toward
- [ ] 3. Inspection & Refactoring: **ReSharper's inspections are the reason to use Rider** — deeper semantic analysis than the compiler, including nullability flow, LINQ, and async correctness
- [ ] 3. Inspection & Refactoring: **Set the inspection profile to "Project" (not "Solution")** so it lives in .idea/ and is shared, and adjust severity there. The "Solution" profile is a local choice that silently overrides the project one
- [ ] 4. Debugging & Profiling: **The debugger reads real PDBs and can attach to a running .NET process,** including a child process, which is what you need for anything with a queue or a spawned worker
- [ ] 4. Debugging & Profiling: **Use the debugger's exception breakpoint on throw,** not on catch — the throw site is the diagnosis; the caught frame is a symptom
- [ ] 5. Refactoring & AI: **The AI Assistant provides completion, chat, and generation; Junie is the agentic counterpart** that plans and applies multi-file changes. Both are integrated into the IDE and the difference matters: Assistant answers, Junie acts
- [ ] 5. Refactoring & AI: **Treat agent-produced changes like any other change:** review the diff, require tests, and never accept a whole-file rewrite you have not read. The main failure mode is a plausible-looking edit that drops an edge case

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
