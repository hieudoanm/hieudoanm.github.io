# Google Docs — Collaboration

Real-time collaborative editing, OT/CRDT, presence, version history.

## Interview Questions

- Design Google Docs / real-time collaborative editing
- OT vs CRDT: which do you choose and why?
- How do you handle concurrent edits and conflicts?
- How do you broadcast edits to hundreds of collaborators?
- Design presence and cursors for live collaboration

## Source

```text
title: Google Docs Collaboration

node client: Client [round, icon=browser]
node ws: Collab Gateway [icon=server]
node collab: Collab Service [icon=message]
node crdt: OT / CRDT Engine [icon=compute]
node doc: Document Service [icon=file]
node presence: Presence Service [icon=users]
node history: Version History [icon=sync]
node db: Documents DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> ws: connect
edge ws -> presence: online
edge client -> ws: edit op
edge ws -> collab: apply op
edge collab -> crdt: transform / merge
edge crdt -> doc: apply
edge collab -> ws: broadcast op
edge ws -> client: peer edits
edge collab -> cache: snapshot
edge doc -> db: persist
edge doc -> history: snapshot
edge client -> doc: open
```
