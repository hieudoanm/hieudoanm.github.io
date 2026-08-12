# Diagrams

A short tour of the most popular diagram types and how to express each one in
the editor's DSL. Every example below parses cleanly, so you can paste it
straight into the editor. See [`docs/SYNTAX.md`](./SYNTAX.md) for the full
language reference.

| Type          | Default kind | Key syntax                                        | Built-in example           |
| ------------- | ------------ | ------------------------------------------------- | -------------------------- |
| Flow          | `flow`       | nodes + `edge a -> b`                             | `uber`, `twitter`, `slack` |
| Sequence      | `sequence`   | `kind: sequence` + message edges                  | `login-flow`               |
| State machine | `flow`       | `round`/`ellipse` states + labeled transitions    | `order-state-machine`      |
| Flowchart     | `flow`       | `diamond` decisions + `->`/`--` branches          | `checkout-flowchart`       |
| ER (entity)   | `flow`       | `cylinder` tables + undirected `--` relationships | `user-data-model`          |

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

Good for: system design, architecture reviews, dependency graphs. Browse the
[posts library](/posts/) for real system-design examples.

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

Good for: request/response flows, OAuth handshakes, API call sequences. See the
`login-flow` example.

## State machine diagram

Model states as `round` or `ellipse` nodes and transitions as labeled edges. The
flow layout places states deterministically; use `rank=<n>` to pin a state to a
specific column when the automatic ordering is not what you want.

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

Good for: order lifecycles, workflow rules, protocol state, auth flows. See the
`order-state-machine` example.

## Flowchart

Use `diamond` nodes for decisions and `round`/`rect` nodes for actions. Label
each branch (e.g. `valid`, `out of stock`) so the decision points are readable.
`--` draws an undirected line for branches that carry no directional meaning.

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

Good for: decision logic, retry loops, onboarding steps, audit flows. See the
`checkout-flowchart` example.

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

Good for: database schema reviews, data modeling, join-path discussions. See the
`user-data-model` example.

---

## Picking a kind

- Same-node `->` loops express _self-loops_ (a retry or a state that feeds back
  into itself).
- Back edges (cycles) are routed as curved lines so they never overlap the
  forward flow.
- Sequence diagrams keep `edge` order as message order, so list messages in the
  order they are sent.
- Everything else is a `flow` layout; switch the whole canvas between
  left-to-right and top-to-bottom from the toolbar.
