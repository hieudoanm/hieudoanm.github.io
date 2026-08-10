export interface DiagramExample {
  id: string;
  name: string;
  description: string;
  questions: string[];
  text: string;
}

export const EXAMPLES: readonly DiagramExample[] = [
  {
    id: 'uber',
    name: 'Uber — Ride Hailing',
    description:
      'Rider/driver apps, ride matching, dispatch, surge pricing, payments.',
    questions: [
      'Design Uber / Lyft ride matching and dispatch',
      'How would you handle 100k drivers coming online at rush hour?',
      'Design Uber surge pricing',
      'How do you run geospatial queries at scale (finding nearby drivers)?',
      'Design a ride payment + receipt flow',
    ],
    text: `title: Uber Ride Hailing
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
edge api -> cache: read / write`,
  },
  {
    id: 'twitter',
    name: 'Twitter / X — Feed',
    description:
      'Tweet ingestion, fanout, home timeline, media, search, notifications.',
    questions: [
      'Design Twitter / X home timeline',
      'Pull-based vs push-based fanout: when do you use which?',
      'How do you rank or order a news feed?',
      'Design Twitter search / trending topics',
      'How do you support a celebrity (supernode) with millions of followers?',
    ],
    text: `title: Twitter Feed
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node tweet: Tweet Service [icon=message]
node fanout: Fanout Worker [icon=worker]
node feed: Timeline Service [icon=compute]
node media: Media Service [icon=file]
node search: Search Service [icon=search]
node notify: Notification Service [icon=mail]
node db: Tweets DB [cylinder, icon=database]
node graph: Graph DB [cylinder, icon=users]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> cdn: static assets
edge client -> api: post / read
edge api -> tweet: publish
edge tweet -> db: persist
edge tweet -> fanout: push to followers
edge fanout -> graph: get followers
edge graph -> fanout: follower ids
edge fanout -> cache: push feeds
edge client -> api: home timeline
edge api -> feed: build
edge feed -> cache: cached feed
edge feed -> cache: write
edge api -> search: query
edge tweet -> notify: alerts`,
  },
  {
    id: 'netflix',
    name: 'Netflix — Streaming',
    description:
      'Video-on-demand, encoding pipeline, CDN delivery, catalog, watch history.',
    questions: [
      'Design Netflix / a video streaming service',
      'Why are CDNs essential for streaming? How do you pick edge servers?',
      'How do you encode and store videos at scale (transcoding pipeline)?',
      'Design a recommendation engine for movies',
      'How do you resume playback across devices?',
    ],
    text: `title: Netflix Streaming
node client: Player [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node drm: DRM / Auth [icon=shield]
node encode: Encoding Pipeline [icon=compute]
node recommend: Recommendations [icon=cache]
node history: Watch History [icon=file]
node analytics: Analytics [icon=worker]
node storage: Video Storage [cylinder, icon=file]
node db: Catalog DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> catalog: title metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> drm: license
edge client -> cdn: stream segments
edge upload: Studio -> encode: raw video
edge encode -> storage: encoded chunks
edge cdn -> storage: fetch
edge client -> api: playback start
edge api -> history: log
edge history -> recommend: personalize
edge api -> analytics: metrics`,
  },
  {
    id: 'instagram',
    name: 'Instagram — Photo Sharing',
    description:
      'Media upload pipeline, photo storage, feed, likes/comments, discovery.',
    questions: [
      'Design Instagram',
      'How do you store and serve billions of photos?',
      'Design the photo upload + processing pipeline',
      'How do you design the Instagram feed?',
      'How do you build a like/comment system with counters at scale?',
    ],
    text: `title: Instagram Photo Sharing
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node upload: Media Upload [icon=file]
node process: Media Processor [icon=compute]
node feed: Feed Service [icon=message]
node graph: User Graph [icon=users]
node social: Likes & Comments [icon=sync]
node notify: Notifications [icon=mail]
node storage: Photo Storage [cylinder, icon=file]
node db: Media DB [cylinder, icon=database]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> api: upload photo
edge api -> upload: accept
edge upload -> process: transcode / thumbnail
edge process -> storage: store
edge process -> db: index
edge client -> api: view feed
edge api -> feed: build feed
edge feed -> graph: follow graph
edge feed -> cache: cached feed
edge api -> social: like / comment
edge social -> notify: push
edge api -> cache: read`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp — Chat',
    description:
      'Persistent WebSocket gateway, message queue, group chats, presence, media.',
    questions: [
      'Design WhatsApp / a chat application',
      'How do you deliver messages reliably (at-least-once vs exactly-once)?',
      'How do you support large group chats?',
      'How do you scale persistent WebSocket connections?',
      'Design presence (online/typing) status at scale',
    ],
    text: `title: WhatsApp Chat
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
edge client -> media: attach`,
  },
  {
    id: 'amazon',
    name: 'Amazon — Checkout',
    description:
      'Product catalog, cart, inventory, orders, payments, idempotency.',
    questions: [
      'Design Amazon / an e-commerce checkout flow',
      'How do you keep inventory consistent under high concurrency?',
      'Design an order service with idempotent retries',
      'How do you design a payment flow with exactly-once semantics?',
      'How do you handle cart → order → payment failure recovery?',
    ],
    text: `title: Amazon Checkout
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
edge order -> notify: email`,
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description:
      'Shorten + redirect at scale, ID generation, analytics, caching.',
    questions: [
      'Design a URL shortening service like bit.ly',
      'How do you generate unique short IDs at scale (base62 vs UUID)?',
      'How do you handle ~10M redirects/sec?',
      'How do you track click analytics?',
      'Design the storage schema and cache strategy',
    ],
    text: `title: URL Shortener
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node shorten: Shorten Service [icon=compute]
node redirect: Redirect Service [icon=sync]
node ids: ID Generator [icon=cache]
node analytics: Analytics Worker [icon=worker]
node cache: Redirect Cache [cylinder, icon=cache]
node db: Links DB [cylinder, icon=database]

edge client -> api: POST /shorten
edge api -> shorten: create
edge shorten -> ids: next id
edge ids -> shorten: short code
edge shorten -> db: persist
edge client -> api: GET /code
edge api -> redirect: resolve
edge redirect -> cache: lookup
edge redirect -> db: miss fallback
edge redirect -> client: 301
edge api -> analytics: log click
edge analytics -> db: aggregate`,
  },
  {
    id: 'google-docs',
    name: 'Google Docs — Collaboration',
    description:
      'Real-time collaborative editing, OT/CRDT, presence, version history.',
    questions: [
      'Design Google Docs / real-time collaborative editing',
      'OT vs CRDT: which do you choose and why?',
      'How do you handle concurrent edits and conflicts?',
      'How do you broadcast edits to hundreds of collaborators?',
      'Design presence and cursors for live collaboration',
    ],
    text: `title: Google Docs Collaboration
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
edge client -> doc: open`,
  },
];

export const findExample = (id: string): DiagramExample | undefined =>
  EXAMPLES.find((example) => example.id === id);
