# Diagram Syntax

The editor parses a plain-text description of a directed graph, line by line.
Each non-empty line must match one of the forms below. Lines that do not match
produce a parse error and are highlighted in the editor.

## Title

```text
title: Web App Architecture
```

Sets the diagram title shown at the top of the canvas. Optional; a blank
`title:` clears it. Only the first title line is used.

## Nodes

```text
node <id>: <label> [shape, icon=<name>]
```

- `<id>` — a lowercase identifier (`[a-z0-9_-]+`) used to reference the node in
  edges.
- `<label>` — the text shown inside the node. Anything after the `:` is kept
  verbatim (commas and special characters are allowed).
- `[shape, icon=<name>]` — optional comma-separated attributes; a bare
  `node x: X` uses the `rect` shape and no icon.

### Shapes

| Shape     | Syntax                 |
| --------- | ---------------------- |
| Rectangle | `node x: X`            |
| Round     | `node x: X [round]`    |
| Ellipse   | `node x: X [ellipse]`  |
| Diamond   | `node x: X [diamond]`  |
| Cylinder  | `node x: X [cylinder]` |

### Icons

An optional icon is drawn centered above the label inside the node, e.g.
`node x: X [icon=database]`. Unknown icon names are reported as parse errors.

| Icon     | Name       | Icon    | Name      |
| -------- | ---------- | ------- | --------- |
| Auth     | `auth`     | Mail    | `mail`    |
| Browser  | `browser`  | Message | `message` |
| Cache    | `cache`    | Queue   | `queue`   |
| Cloud    | `cloud`    | Search  | `search`  |
| Compute  | `compute`  | Server  | `server`  |
| Database | `database` | Shield  | `shield`  |
| File     | `file`     | Sync    | `sync`    |
|          |            | Users   | `users`   |
|          |            | Worker  | `worker`  |

## Edges

```text
edge <from> -> <to>: <label>
```

- `<from>` / `<to>` — node ids that must already be defined.
- `<label>` — optional text shown above the line; anything after the `->` is
  kept verbatim.

A second line with the same node as source and target (`edge x -> x`) creates a
self-loop.

## Example

```text
title: Web App Architecture

node web: Web Client [round, icon=browser]
node api: API Server [round, icon=server]
node auth: Auth Service [ellipse, icon=auth]
node db: PostgreSQL [cylinder, icon=database]

edge web -> api: HTTPS
edge api -> auth: tokens
edge api -> db: reads
edge auth -> db: reads
```

## Rules

- Lines are matched in order; a node must be declared before an edge uses it.
- Unknown lines, unknown shapes, or unknown icon names are reported as parse
  errors with the offending line number.
- Layout is deterministic: the same text always produces the same diagram.
- Layout hints (rank, alignment) are planned; see `docs/ROADMAP.md`.
