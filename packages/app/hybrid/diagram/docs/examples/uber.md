# Uber — Ride Hailing

Rider/driver apps, ride matching, dispatch, surge pricing, payments.

## Interview Questions

- Design Uber / Lyft ride matching and dispatch
- How would you handle 100k drivers coming online at rush hour?
- Design Uber surge pricing
- How do you run geospatial queries at scale (finding nearby drivers)?
- Design a ride payment + receipt flow

## Source

```text
title: Uber Ride Hailing

node rider: Rider App [round, icon=browser]
node driver: Driver App [round, icon=browser]
node api: API Gateway [icon=server]
node matching: Ride Matching [icon=compute]
node dispatch: Dispatch Queue [icon=queue]
node surge: Surge Pricing [icon=cache]
node geo: Geo Index [icon=search]
node trip: Trip Service [icon=worker]
node pay: Payment Service [icon=shield]
node notify: Notifications [icon=message]
node db: Trips DB [cylinder, icon=database]
node cache: Driver Locations Cache [cylinder, icon=cache]

edge rider -> api: request ride
edge driver -> api: go online
edge api -> matching: rider + nearby drivers
edge matching -> geo: find nearby
edge geo -> matching: candidates
edge matching -> dispatch: assignment
edge dispatch -> driver: accept
edge surge -> api: dynamic price
edge rider -> trip: start / end
edge trip -> pay: charge
edge pay -> notify: receipt
edge trip -> db: store
edge api -> cache: read / write
```
