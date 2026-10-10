# Antigravity: Worked Scenario

Best practices for the Antigravity editor — agent-first workflow boundaries, reviewing generated diffs, project rules, and when to fall back to a conventional editor. Use when configuring or working with agent-driven editing in Antigravity.

## Scenario

A project needs to apply **antigravity-best-practices** to a real design or implementation decision. Start from this context: Antigravity is a Google-built, agent-first editor: rather than autocomplete that suggests the next token, it is built around an agent that plans and executes multi-file work inside the editor, with a conventional editor underneath. Its premise is that **the agent is the primary author and you are the reviewer**, which inverts the usual arrangement. Practical Antigravity work is about **bounding what the agent is allowed to do, reviewing its output as code, and keeping the conventional editor and CLI checks as the authority**. VS Code conventions are in vscode.md; the closest other agent-first editor is cursor.md. _Verified against Antigravity's 2026 releases. The product changes quickly — features, model access, and the exact surface move between releases; the review and boundary practices below are the stable part._

## Apply the guidance

- **The default relationship is: the agent writes, you review.** That is the opposite of an autocomplete editor, and the discipline has to be different too — the review is the work, not a final step.
- **Because the agent writes more code per task, the review must be more thorough, not less.** A 300-line change generated in ten seconds is not ten seconds of work; it is a careful read.
- **Keep the conventional editor and the CLI in the loop.** The editor you already know is still there for the precise edit, and the compiler, linter, and tests are unchanged and still authoritative.
- **An agent-first editor is a tool choice, not a repository standard,** unless the team agrees to it deliberately. A mixed toolchain is a support cost; decide once.

## Expected outcome

Choose an approach that follows the skill’s recommendations, fits the project constraints, and can be reviewed against its quality and safety requirements.

## Source

Based on the guidance in [SKILL.md](../SKILL.md).
