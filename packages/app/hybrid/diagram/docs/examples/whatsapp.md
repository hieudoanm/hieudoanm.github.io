# WhatsApp — Chat

Persistent WebSocket gateway, message queue, group chats, presence, media.

## Interview Questions

- Design WhatsApp / a chat application
- How do you deliver messages reliably (at-least-once vs exactly-once)?
- How do you support large group chats?
- How do you scale persistent WebSocket connections?
- Design presence (online/typing) status at scale

## Source

```text
title: WhatsApp Chat

node client: Client [round, icon=browser]
node gateway: WS Gateway [icon=server]
node chat: Chat Service [icon=message]
node queue: Message Queue [icon=queue]
node presence: Presence Service [icon=users]
node group: Group Service [icon=users]
node media: Media Service [icon=file]
node notify: Notifications [icon=mail]
node db: Messages DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> gateway: connect
edge gateway -> presence: online status
edge client -> gateway: send message
edge gateway -> chat: route
edge chat -> queue: enqueue
edge chat -> db: persist
edge queue -> gateway: deliver to peers
edge client -> gateway: read receipts
edge gateway -> notify: offline alert
edge chat -> group: broadcast
edge group -> queue: fan out
edge client -> media: attach
```
