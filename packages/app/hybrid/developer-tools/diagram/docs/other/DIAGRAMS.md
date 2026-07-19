# Diagrams

A tour of the most popular diagram types and how to express each one in the
editor's DSL. Every example below parses cleanly, so you can paste it straight
into the editor. See [`docs/SYNTAX.md`](./SYNTAX.md) for the full language
reference and the [posts library](/posts/) for real system-design diagrams.

| Type                     | Kind       | Key syntax                                | Built-in example      |
| ------------------------ | ---------- | ----------------------------------------- | --------------------- |
| Flow / architecture      | `flow`     | nodes + `edge a -> b`                     | `uber`, `slack`       |
| Sequence                 | `sequence` | `kind: sequence` + message edges          | `login-flow`          |
| State machine            | `flow`     | `round`/`ellipse` states + transitions    | `order-state-machine` |
| Flowchart                | `flow`     | `diamond` decisions + branch labels       | `checkout-flowchart`  |
| ER / entity relationship | `flow`     | `cylinder` tables + undirected `--` edges | `user-data-model`     |
| Use case                 | `flow`     | `actor` + `ellipse` use cases             | —                     |
| Class (UML)              | `flow`     | `rect` classes + `--` associations        | —                     |
| Activity (UML)           | `flow`     | `round`/`diamond` + action `rect`s        | —                     |
| Component (UML)          | `flow`     | icon nodes + dependency edges             | —                     |
| Deployment (UML)         | `flow`     | device nodes + communication paths        | —                     |
| Data flow (DFD)          | `flow`     | `ellipse` processes + `cylinder` stores   | —                     |
| Network topology         | `flow`     | server/cloud/switch icons                 | —                     |
| Decision tree            | `flow`     | root + `yes`/`no` branches                | —                     |
| Org chart / hierarchy    | `flow`     | `rect` nodes + tree edges                 | —                     |
| Mind map                 | `flow`     | central node + radiating edges            | —                     |
| C4 model                 | `flow`     | user → container → component → data       | —                     |
| BPMN-style process       | `flow`     | `round` events + `diamond` gateways       | —                     |
| Package diagram          | `flow`     | `note`/`rect` packages + dependencies     | —                     |
| Communication (UML)      | `sequence` | numbered message edges                    | —                     |

---

## Flow / Architecture diagram

The default diagram kind. Nodes represent components or services, and directed
edges show dependencies or data flow. Auto-layout ranks nodes left-to-right (or
top-to-bottom) so the reading order follows the flow.

```text
title: Web App Architecture

node client: Browser [round, icon=browser]
node api: API Server [icon=server]
node auth: Auth Service [ellipse, icon=auth]
node db: PostgreSQL [cylinder, icon=database]

edge client -> api: HTTPS
edge api -> auth: tokens
edge api -> db: reads
```

Good for: system design, architecture reviews, dependency graphs.

## Sequence diagram

Use `kind: sequence` to render participants as headers with dashed lifelines and
time-ordered message arrows from top to bottom.

```text
kind: sequence
title: Login Flow

node client: Client [round, icon=browser]
node auth: Auth Service [icon=auth]
node db: Users DB [cylinder, icon=database]

edge client -> auth: POST /login
edge auth -> db: verify credentials
edge db -> auth: user row
edge auth -> client: set cookie
```

Good for: request/response flows, OAuth handshakes, API call sequences. Edge
order is message order — list messages top-to-bottom as they are sent.

## State machine diagram

Model states as `round` or `ellipse` nodes and transitions as labeled edges. Use
`rank=<n>` to pin a state to a specific column when the automatic ordering is
not what you want.

```text
title: Order State Machine

node created: Created [ellipse, icon=clock]
node pending: Payment Pending [round, icon=credit-card]
node paid: Paid [round, icon=check]
node cancelled: Cancelled [ellipse, icon=alert]

edge created -> pending: place
edge pending -> paid: pay
edge pending -> cancelled: cancel
edge paid -> cancelled: refund
```

Good for: order lifecycles, workflow rules, protocol state, auth flows.

## Flowchart

Use `diamond` nodes for decisions and `round`/`rect` nodes for actions. Label
each branch so decision points are readable; `--` draws an undirected line for
branches with no directional meaning.

```text
title: Checkout Flowchart

node start: Start [round, icon=clock]
node cart: Cart Valid? [diamond, icon=check]
node pay: Charge Payment [icon=credit-card]
node fail: Payment Failed [ellipse, icon=alert]
node ship: Fulfill Order [icon=box]

edge start -> cart: begin
edge cart -> pay: valid
edge cart -> cart: fix
edge pay -> ship: success
edge pay -> fail: declined
```

Good for: decision logic, retry loops, onboarding steps, audit flows.

## ER / entity-relationship diagram

Model tables as `cylinder` nodes and relationships as undirected `--` edges so
the diagram reads as a schema, not a data-flow pipeline.

```text
title: User Data Model

node users: Users [cylinder, icon=users]
node accounts: Accounts [cylinder, icon=key]
node orders: Orders [cylinder, icon=box]
node line_items: Line Items [cylinder, icon=file]

edge users -- accounts: has
edge users -- orders: places
edge orders -- line_items: contains
```

Good for: database schema reviews, data modeling, join-path discussions. Put
multiplicity (`1`, `1..*`, `0..*`) in the relationship label.

## Use case diagram

Actors are the `actor` shape; use cases are `ellipse`s. Because the editor
cannot draw a system boundary box, use a `rect` node (or a `note`) to stand in
for the system and connect the actors to it.

```text
title: Online Shopping

node customer: Customer [actor]
node system: Shopping System [rect, icon=monitor]
node browse: Browse Catalog [ellipse, icon=search]
node order: Place Order [ellipse, icon=box]
node pay: Pay [ellipse, icon=credit-card]

edge customer -> browse: browse
edge customer -> order: checkout
edge customer -> pay: pay
edge browse -> system: catalog
edge order -> system: order service
```

Good for: capturing who does what from the outside; requirements and stakeholder
scoping.

## Class diagram (UML)

Represent classes as `rect` nodes and relationships as edges. Because labels are
single-line, keep attributes compact (or describe the fields in a `note` node).
Multiplicity goes in the relationship label.

```text
title: Ordering Domain

node customer: Customer
node order: Order
node lineitem: Line Item
node product: Product

edge customer -- order: 1..* owns
edge order -- lineitem: 1..* contains
edge lineitem -- product: references 1
```

Good for: domain models, API resource schemas, object graphs.

## Activity diagram (UML)

Flowchart-style with `round` start/end nodes, `diamond` decisions, and `rect`
actions. `rank=<n>` pins steps to columns so forks and joins read cleanly.

```text
title: Order Fulfillment Activity

node start: Start [round, icon=clock]
node pay: Charge Card [icon=credit-card]
node check: Check Stock? [diamond, icon=box]
node ship: Ship Order [icon=box]
node cancel: Cancel Order [ellipse, icon=alert]
node end: Done [round, icon=check]

edge start -> pay: begin
edge pay -> check: charged
edge check -> ship: in stock
edge check -> cancel: out of stock
edge ship -> end: shipped
```

Good for: business processes, workflow logic, concurrency boundaries
(approximated with branch labels since true parallel forks are not drawn).

## Component diagram (UML)

Use node icons to suggest the component type (`server`, `database`, `cache`,
`queue`) and edges for dependencies. Undirected `--` edges read as "uses".

```text
title: Payments Platform

node api: Payments API [rect, icon=server]
node svc: Payments Service [rect, icon=compute]
node ledger: Ledger [rect, icon=compute]
node cache: Idempotency Cache [cylinder, icon=cache]
node db: Transactions DB [cylinder, icon=database]

edge api -- svc: delegates
edge svc -- ledger: writes
edge svc -- cache: read / write
edge svc -- db: persist
```

Good for: module boundaries, service dependencies, packaging.

## Deployment diagram (UML)

Nodes are physical or runtime environments — use `monitor`/`server` icons for
hosts and `cloud` for external platforms. Edges are communication paths.

```text
title: Production Deployment

node browser: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node web: Web Server [rect, icon=server]
node app: App Server [rect, icon=server]
node db: Database Server [cylinder, icon=database]

edge browser -> cdn: HTTPS
edge cdn -> web: edge cache
edge web -> app: RPC
edge app -> db: TCP 5432
```

Good for: infrastructure diagrams, on-call runbooks, release topologies.

## Data flow diagram (DFD)

Processes are `ellipse`s, data stores are `cylinder`s, and external entities are
`rect`s. Arrows are the data movements between them.

```text
title: DFD — Order Processing

node customer: Customer [rect, icon=users]
node validate: Validate Order [ellipse, icon=compute]
node store: Orders [cylinder, icon=database]
node notify: Send Confirmation [ellipse, icon=mail]

edge customer -> validate: order
edge validate -> store: validated order
edge validate -> customer: receipt
edge store -> notify: new order
edge notify -> customer: email
```

Good for: data pipelines, batch jobs, ingestion flows.

## Network topology diagram

The icon set maps well onto network building blocks: `server` for hosts, `cloud`
for external services, `database` for storage, `queue` for brokers. Arrows are
the traffic between tiers.

```text
title: Load-Balanced Web Tier

node users: Users [round, icon=users]
node lb: Load Balancer [rect, icon=server]
node web1: Web Node 1 [rect, icon=server]
node web2: Web Node 2 [rect, icon=server]
node db: Primary DB [cylinder, icon=database]
node replica: Read Replica [cylinder, icon=database]

edge users -> lb: HTTPS
edge lb -> web1: round robin
edge lb -> web2: round robin
edge web1 -> db: writes
edge web2 -> db: writes
edge web1 -> replica: reads
edge web2 -> replica: reads
```

Good for: network diagrams, HA / failover plans, capacity reviews.

## Decision tree

A single root question with `yes`/`no` (or value-labeled) branches fanning out
to outcomes. Use `rank=<n>` to push branches into aligned columns.

```text
title: Is this a system design question?

node root: Project has a single node? [diamond, icon=search]
node split: Split into services? [diamond, icon=compute]
node event: Use a message queue [ellipse, icon=queue]
node keep: Keep it simple [ellipse, icon=check]

edge root -> split: yes
edge root -> keep: no
edge split -> event: yes
edge split -> keep: no
```

Good for: trade-off analysis, decision frameworks, interview drills.

## Org chart / hierarchy

Rect nodes with tree edges. Undirected `--` edges keep the chart read as a
structure instead of a data flow.

```text
title: Engineering Organization

node cto: CTO [rect, icon=users]
node backend: Backend [rect, icon=compute]
node frontend: Frontend [rect, icon=browser]
node infra: Infrastructure [rect, icon=server]
node team1: Payments [rect, icon=credit-card]
node team2: Growth [rect, icon=chart]

edge cto -- backend: leads
edge cto -- frontend: leads
edge cto -- infra: leads
edge backend -- team1: owns
edge backend -- team2: owns
```

Good for: team structures, reporting lines, ownership maps.

## Mind map

One central topic with branches radiating outward. `round` for the core, `rect`
for branches, and edge labels as the relationship.

```text
title: System Design Topics

node core: System Design [round, icon=star]
node scale: Scalability [rect, icon=compute]
node data: Data Storage [rect, icon=database]
node realtime: Realtime [rect, icon=message]
node cache: Caching [rect, icon=cache]
node queue: Queues [rect, icon=queue]

edge core -> scale: throughput
edge core -> data: persistence
edge core -> realtime: WebSockets
edge core -> cache: latency
edge core -> queue: decoupling
```

Good for: brainstorming, study maps, feature breakdowns.

## C4 model

The C4 approach decomposes a system into context, container, component, and code
levels. Each level is a normal flow diagram; keep one diagram per level.

```text
title: C4 — Container View

node user: User [actor]
node spa: Single-Page App [rect, icon=browser]
node api: API Server [rect, icon=server]
node db: Database [cylinder, icon=database]

edge user -> spa: HTTPS
edge spa -> api: JSON/HTTPS
edge api -> db: SQL
```

Good for: walking from "what talks to what" down to "how is it built". See the
[posts library](/posts/) for ready-made architecture diagrams.

## BPMN-style process

Approximate BPMN with `round` events, `rect` tasks, and `diamond` gateways. True
pools/lanes are not drawn — use edge labels or `note` nodes to indicate
ownership instead.

```text
title: Invoice Approval

node start: Start [round, icon=clock]
node submit: Submit Invoice [rect, icon=file]
node review: Approve? [diamond, icon=check]
node pay: Pay Invoice [rect, icon=credit-card]
node reject: Reject [ellipse, icon=alert]
node end: Done [round, icon=check]

edge start -> submit: begin
edge submit -> review: submitted
edge review -> pay: approved
edge review -> reject: rejected
edge pay -> end: paid
edge reject -> end: closed
```

Good for: approval workflows, onboarding, incident response steps.

## Package diagram (UML)

Use `note` (folder-like) or `rect` nodes for packages and arrows for
dependencies between them. `rank=<n>` keeps layers aligned.

```text
title: Monorepo Packages

node web: app/web [note, icon=browser]
node api: app/api [note, icon=server]
node shared: packages/shared [note, icon=box]
node cli: packages/cli [note, icon=code]

edge web -> shared: depends
edge api -> shared: depends
edge cli -> shared: depends
edge cli -> api: depends
```

Good for: module boundaries, dependency direction, layering rules.

## Communication diagram (UML)

A sequence diagram variant that numbers messages. Participants are the same
`kind: sequence` headers; message order follows edge order, and the number in
the label preserves the original call sequence.

```text
kind: sequence
title: Payment Call Graph

node client: Client [round, icon=browser]
node api: Payments API [icon=server]
node svc: Payments Service [icon=compute]
node ledger: Ledger [icon=compute]

edge client -> api: 1: charge
edge api -> svc: 2: process
edge svc -> ledger: 3: record
edge ledger -> svc: 4: ok
edge svc -> api: 5: result
edge api -> client: 6: 201
```

Good for: call graphs, debug traces, dependency ordering.

## Not yet supported

These popular diagram types cannot be expressed in the editor yet. They are
tracked as roadmap items in [`docs/ROADMAP.md`](./ROADMAP.md).

| Type                        | Why it does not work today                                        | What it would need                                     |
| --------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| Timeline / Gantt            | Layout ranks by graph order, never by dates                       | A `kind: timeline` with date columns and bars          |
| Venn / set diagram          | The renderer draws discrete nodes and edges, no overlapping areas | Set/overlap regions in the layout engine               |
| Subgraph / cluster grouping | Nodes are flat; no nesting for containers, zones, or lanes        | `subgraph`-style containment + group rendering         |
| Full UML sequence           | Lifelines and arrows only; no activation bars or fragments        | Activation bars, `alt`/`opt`/`loop` combined fragments |
| Edge styles                 | All edges are solid, one color, one width                         | Per-edge dash/dot/color/thickness/arrowhead options    |
| Node fill colors            | Nodes share one theme color                                       | A `color=` / `style=` attribute on nodes               |
| Force-directed layout       | Only layered ranking exists                                       | A force-directed / arbitrary-graph layout option       |
| Multi-line / rich labels    | Labels are single-line; class bodies and notes cannot span lines  | Multi-line node labels in the parser + renderer        |

---

## Tips and limitations

- **Single-line labels.** Attributes and fields go on one line; use compact
  notation or a `note` node when a node needs a body.
- **Avoid `[` in labels.** A label ending in `[...]` is parsed as shape/icon
  attributes, so keep brackets out of node text.
- **`kind: sequence` is all-or-nothing.** Sequence diagrams are messages
  top-to-bottom; everything else uses the layered `flow` layout.
- **Self-loops and cycles are fine.** A node that points to itself draws a loop;
  back edges are routed as curves so they never overlap forward flow.
- **Custom glyphs.** `icon=glyph:<svg path data>` lets you draw any symbol the
  built-in icons do not cover.
- **Picking a kind.** Sequence diagrams keep edge order as message order. For
  everything else, switch the whole canvas between left-to-right and
  top-to-bottom from the toolbar.
