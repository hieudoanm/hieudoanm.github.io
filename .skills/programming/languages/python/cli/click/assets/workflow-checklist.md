# Click Best Practices: Workflow Checklist

A practical run sheet for applying [Click Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Commands & Groups: **@click.group() for the root; @click.command() subcommands in the same module:**
- [ ] 1. Commands & Groups: **@click.group(chain=True) for composable pipelines** (a multi-step CLI where order matters) — only when the UX demands it
- [ ] 2. Options & Arguments: **Options = named flags, arguments = positional; typed via type=:**
- [ ] 2. Options & Arguments: **required=True for the never-optional; multiple=True for repeatable; count=True for -v -v.**
- [ ] 3. Types & Conversion: **Custom types via click.ParamType** for the genuinely repeated shapes:
- [ ] 3. Types & Conversion: **type=str default; ClickException for clean error messages over raw raises** — convert domain errors to click.UsageError/ClickException
- [ ] 4. Context & Shared State: **@click.pass_context to receive ctx; state shared via ctx.obj (a config object):**
- [ ] 4. Context & Shared State: **ctx.obj for request-scoped wiring only** — never business logic; subcommands read ctx.obj at the top:
- [ ] 5. Output & UX: **click.echo with err=True for diagnostics; click.style/click.secho for colored output where the platform supports it** — the user interface consistency matters:
- [ ] 5. Output & UX: **click.progressbar for long tasks; prompt/confirm for interactive gates — keep the non-interactive path first** (scriptable with flags, interactive as enhancement)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
