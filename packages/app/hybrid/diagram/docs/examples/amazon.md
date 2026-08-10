# Amazon — Checkout

Product catalog, cart, inventory, orders, payments, idempotency.

## Interview Questions

- Design Amazon / an e-commerce checkout flow
- How do you keep inventory consistent under high concurrency?
- Design an order service with idempotent retries
- How do you design a payment flow with exactly-once semantics?
- How do you handle cart → order → payment failure recovery?

## Source

```text
title: Amazon Checkout

node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node product: Product Service [icon=search]
node cart: Cart Service [icon=file]
node inventory: Inventory Service [icon=queue]
node order: Order Service [icon=compute]
node payment: Payment Service [icon=shield]
node notify: Notifications [icon=mail]
node search: Search Service [icon=search]
node db: Orders DB [cylinder, icon=database]
node cache: Catalog Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> search: query
edge api -> product: details
edge product -> cache: read / write
edge client -> api: add to cart
edge api -> cart: save
edge client -> api: checkout
edge api -> order: place order
edge order -> inventory: reserve
edge inventory -> order: ok / fail
edge order -> payment: charge
edge payment -> order: confirmation
edge order -> db: persist
edge order -> notify: email
```
