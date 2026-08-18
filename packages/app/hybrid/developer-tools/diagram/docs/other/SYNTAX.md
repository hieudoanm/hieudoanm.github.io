# Diagram Syntax

The editor parses a plain-text description of a graph, line by line. Each
non-empty line must match one of the forms below. Lines that do not match
produce a parse error and are highlighted in the editor.

## Title

```text
title: Web App Architecture
```

Sets the diagram title shown at the top of the canvas. Optional; a blank
`title:` clears it. Only the first title line is used.

## Kind

```text
kind: flow
kind: sequence
```

Selects the diagram type. `flow` (the default) renders nodes on a layered
canvas; `sequence` renders participants, dashed lifelines, and time-ordered
message arrows. See the `login-flow` example.

## Nodes

```text
node <id>: <label> [shape, icon=<name>, rank=<n>, color=<name>]
```

- `<id>` — a lowercase identifier (`[a-z0-9_-]+`) used to reference the node in
  edges.
- `<label>` — the text shown inside the node. Anything after the `:` is kept
  verbatim (commas and special characters are allowed).
- `[shape, icon=<name>, rank=<n>, color=<name>]` — optional comma-separated
  attributes; a bare `node x: X` uses the `rect` shape, no icon, and the theme
  color.

### Node colors

A `color=<name>` attribute fills the node and its border with a named color:

```text
node api: Payments API [icon=server, color=blue]
node db: Ledger [cylinder, icon=database, color=purple]
```

Valid colors: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `teal`,
`cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `pink`, `gray`.

### Shapes

| Shape         | Syntax                      |
| ------------- | --------------------------- |
| Rectangle     | `node x: X`                 |
| Round         | `node x: X [round]`         |
| Ellipse       | `node x: X [ellipse]`       |
| Diamond       | `node x: X [diamond]`       |
| Cylinder      | `node x: X [cylinder]`      |
| Hexagon       | `node x: X [hexagon]`       |
| Parallelogram | `node x: X [parallelogram]` |
| Cloud         | `node x: X [cloud]`         |
| Note          | `node x: X [note]`          |
| Actor         | `node x: X [actor]`         |

### Icons

An optional icon is drawn centered above the label inside the node, e.g.
`node x: X [icon=database]`. Unknown icon names are reported as parse errors.

| Icon     | Name          | Icon     | Name       |
| -------- | ------------- | -------- | ---------- |
| Alert    | `alert`       | Key      | `key`      |
| Archive  | `archive`     | Link     | `link`     |
| Auth     | `auth`        | Mail     | `mail`     |
| Bell     | `bell`        | Map      | `map`      |
| Box      | `box`         | Message  | `message`  |
| Browser  | `browser`     | Monitor  | `monitor`  |
| Cache    | `cache`       | Music    | `music`    |
| Camera   | `camera`      | Phone    | `phone`    |
| Chart    | `chart`       | Queue    | `queue`    |
| Check    | `check`       | Search   | `search`   |
| Clock    | `clock`       | Server   | `server`   |
| Cloud    | `cloud`       | Settings | `settings` |
| Code     | `code`        | Shield   | `shield`   |
| Compute  | `compute`     | Star     | `star`     |
| Card     | `credit-card` | Sync     | `sync`     |
| Database | `database`    | Users    | `users`    |
| Eye      | `eye`         | Video    | `video`    |
| File     | `file`        | Worker   | `worker`   |
| Globe    | `globe`       |          |            |
| Heart    | `heart`       |          |            |

### Custom icon glyphs

Instead of a named icon you can pass raw SVG path data:

```text
node x: X [icon=glyph:M 10 20 L 20 5]
```

The path is drawn in a 24×24 viewBox with the current stroke color, so any
single-path (or space-separated) stroke data works. Glyph data may contain
letters, digits, dots, commas, `+`, `-` and spaces.

### Rank hints

Flow layout ranks nodes left-to-right using longest-path ordering. A `rank=<n>`
attribute pins a node to a specific rank for fine control:

```text
node a: A [rank=0]
node b: B [rank=2]
```

Ranks are still resolved deterministically and edges may move nodes forward when
a hint would otherwise create a backwards edge.

## Edges

```text
edge <from> -> <to>: <label>
edge <from> -- <to>: <label>
```

- `<from>` / `<to>` — node ids that must already be defined.
- `<label>` — optional text shown above the line; anything after the connector
  is kept verbatim.
- `->` draws a directed arrow; `--` draws an undirected line (useful for ER
  relationships).

A second line with the same node as source and target (`edge x -> x`) creates a
self-loop.

### Edge styles

Styles are attached to an edge in square brackets, either right after the target
or after the label:

```text
edge a -> b [dashed, color=red, width=2]
edge a -> b: approve [dotted]
edge a -> b [arrow=no]
```

| Attribute   | Effect                                   |
| ----------- | ---------------------------------------- |
| `dashed`    | Dashed line                              |
| `dotted`    | Dotted line                              |
| `color=<n>` | Stroke color (same palette as nodes)     |
| `width=<n>` | Stroke width in px (default `1.5`)       |
| `arrow=no`  | Suppress the arrowhead on directed edges |

Undirected (`--`) edges never draw an arrowhead. Unknown attributes are reported
as parse errors.

## Subgraphs

Group nodes into a labeled container box — useful for deployment zones, layers,
or swimlane-style grouping:

```text
subgraph web: Web Tier [color=blue]
node api: API
node web: Web Server
end
subgraph data: Data Tier [color=purple]
node db: PostgreSQL
end
edge api -> db: reads
```

- `subgraph <id>: <label> [color=<name>]` opens a group; `end` closes it.
- Nodes declared inside a group are contained by its box. Subgraphs may nest
  (open another `subgraph` before the inner `end`).
- Every group participates in layout ranking: grouped nodes are laid out
  together and the whole cluster advances across ranks with its edges.
- A bare `subgraph <id>:` defaults the label to the id. Unclosed or
  double-closed groups are reported as parse errors.

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
  Edge endpoints that are never declared are created implicitly with the rect
  shape.
- Unknown lines, unknown shapes, or unknown icon names are reported as parse
  errors with the offending line number.
- Layout is deterministic: the same text always produces the same diagram.
- Layout can be switched between left-to-right and top-to-bottom from the
  toolbar, and nodes can be dragged on the canvas.
