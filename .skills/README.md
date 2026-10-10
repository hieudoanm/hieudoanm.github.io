# Skills Library

This directory is a curated library of reusable expert knowledge for software engineering, design, and research workflows. Each skill is a focused, practical guide for a topic, tool, framework, or research method.

The goal is not to replace documentation, but to make it easier to find the right mental model, workflow, and conventions quickly.

## What this library contains

### Programming

A large collection of skill guides for languages, frameworks, infrastructure, tooling, architecture, security, and platform ecosystems.

Examples:

- [programming/languages/typescript](./programming/languages/typescript)
- [programming/devops/docker](./programming/devops/docker)
- [programming/languages/python](./programming/languages/python)
- [programming/database/sql/postgresql](./programming/database/sql/postgresql)

### Research

A structured set of research skills for literature review, writing, replication, meta-analysis, and evidence synthesis.

Examples:

- [research/literature-review](./research/literature-review)
- [research/paper-reading](./research/paper-reading)
- [research/research-writing](./research/research-writing)
- [research/meta-analysis](./research/meta-analysis)

## How to use this library

### Start with the problem, not the technology

Pick the task first:

- building an app?
- reviewing a codebase?
- writing a literature review?
- choosing a framework?
- debugging infrastructure?

Then navigate to the matching topic area.

### Recommended entry points

#### If you are building software

- [programming/languages/typescript](./programming/languages/typescript)
- [programming/development/architecture/hexagonal](./programming/development/architecture/hexagonal)
- [programming/development/security/jwt](./programming/development/security/jwt)
- [programming/devops/docker](./programming/devops/docker)

#### If you are learning or choosing a stack

- [programming/languages/typescript](./programming/languages/typescript)
- [programming/languages/python](./programming/languages/python)
- [programming/languages/go](./programming/languages/go)
- [programming/graphql](./programming/graphql)

#### If you are doing research

- [research/paper-reading](./research/paper-reading)
- [research/literature-review](./research/literature-review)
- [research/research-gap](./research/research-gap)
- [research/research-writing](./research/research-writing)

## Library structure

```text
.skills/
├── README.md
├── TREE.md
├── templates/
│   └── SKILL_TEMPLATE.md
├── programming/
│   ├── languages/
│   ├── database/
│   ├── devops/
│   ├── development/
│   ├── design/
│   └── ...
├── research/
│   ├── literature-review/
│   │   ├── SKILL.md
│   │   ├── README.md
│   │   ├── references/   # Four focused reference documents
│   │   ├── examples/     # Four topic-specific examples
│   │   └── assets/       # Four reusable supporting assets
│   └── ...
└── ...
```

Each skill has exactly four files under `references/`, `examples/`, and
`assets/`. Keep `examples/` as a sibling of `references/` rather than nesting
it inside the reference directory.

## Standard skill metadata

Every skill should follow a consistent structure so it is easier to scan, search, and compare across topics.

Use the standard template at [templates/SKILL_TEMPLATE.md](./templates/SKILL_TEMPLATE.md).

The recommended metadata fields are:

- `name`
- `description`
- `tags`
- `when_to_use`
- `prerequisites`
- `related_skills`
- `avoid_when`
- `status`

This keeps each skill consistent without making it rigid or repetitive.

## Skills design pattern

Each skill generally follows this structure:

- a focused purpose statement
- main principles or decision rules
- workflow or checklist
- domain-specific examples
- references or related topics

This keeps the library practical and easy to scan without turning every page into a long encyclopedia entry.

## Good practices for using skills

- Start with the most general relevant skill before going deeper.
- Use multiple related skills together when the task spans multiple domains.
- Prefer the skill that matches your goal, not the one matching your current tool.
- Treat these as decision aids and reference patterns, not rigid rules.

## Suggested workflow for a new task

```text
Define the task
    ↓
Choose the domain (programming, research, design, infra)
    ↓
Select the nearest foundational skill
    ↓
Use related skills to drill into specifics
    ↓
Apply the practices to the actual project or paper
```

## Maintenance

This library is most useful when it stays curated and navigable.

A good skill should:

- solve a real practical problem
- be specific enough to act on
- link to neighboring concepts
- avoid duplicating other materials unnecessarily

## Related indexes

- [TREE.md](./TREE.md) — structural overview of the skill tree
- [programming](./programming)
- [research](./research)

## Bottom line

This library is intended to help you move from "I need to do X" to "I know the right framework, workflow, and tradeoffs" with minimal friction.

Use it as a practical map of technical and research knowledge, not just a folder of notes.
