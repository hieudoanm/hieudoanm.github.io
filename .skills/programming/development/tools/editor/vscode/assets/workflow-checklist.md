# VS Code: Workflow Checklist

A practical run sheet for applying [VS Code](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Settings: Three Scopes: **Three scopes, and the difference matters.** User settings live in your profile; workspace settings in .vscode/settings.json (committed); folder settings per folder. A setting that belongs to the project belongs in workspace settings
- [ ] 1. Settings: Three Scopes: **settings.json supports language-scoped overrides** ("[typescript]": { "editor.defaultFormatter": ... }) — prefer these over one global formatter, which then has to be excluded for every other language
- [ ] 2. Extensions: **Install as few as possible, and prefer the language's own tool over an editor extension.** The TypeScript compiler, ESLint, and Prettier all ship CLIs that CI runs; an editor plugin that reimplements them will eventually disagree
- [ ] 2. Extensions: **Never let two formatters or two linters be active.** ESLint with a formatter rule plus Prettier is a classic conflict; pick Prettier for formatting and ESLint with eslint-config-prettier for everything else
- [ ] 3. TypeScript & JavaScript: **Point the TS server at the workspace's TypeScript** (typescript.tsdk) and keep strict in tsconfig.json. The editor's own TS version lags and will disagree with CI; this setting removes the disagreement
- [ ] 3. TypeScript & JavaScript: **The editor shows a file's problems via the TS server, but tsc --noEmit is the authority** — the editor skips some checks and only analyses the open project graph
- [ ] 4. Debugging: **.vscode/launch.json is worth committing** — it makes "how to run this" a reviewable file rather than tribal knowledge, and it works in every editor that implements the spec
- [ ] 4. Debugging: **Launch configurations need the right runtimeExecutable and env.** A Node app launched without the project's NODE_ENV or .env loaded will fail in a way that looks like an application bug
- [ ] 5. Remote & Containers: **The dev container is the strongest way to make a setup uniform,** because it pins the OS, toolchain, and extensions together. Prefer it over a long "install these 12 things" README
- [ ] 5. Remote & Containers: **Remote-SSH and Dev Containers both need the extensions installed on the remote side,** not locally; an extension that only exists locally does not apply to a remote file

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
