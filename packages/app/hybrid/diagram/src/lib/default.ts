export const DEFAULT_DIAGRAM = `# Diagram source file (.diagram)
# Lines starting with # are comments.
#
#   title: <diagram title>
#   node <id>: <label> [shape, icon=<name>]
#   edge <from> -> <to>: <label>
#
# Shapes: rect, round, ellipse, diamond, cylinder
# Icons: auth, browser, cache, cloud, compute, database, file, mail,
#        message, queue, search, server, shield, sync, users, worker

title: Web App Architecture

node client: Browser [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Server [icon=server]
node auth: Auth Service [icon=auth]
node db: PostgreSQL [cylinder, icon=database]
node cache: Redis [cylinder, icon=cache]

edge client -> cdn: static
edge client -> api: JSON
edge api -> auth: verify
edge auth -> api: token
edge api -> db: read / write
edge api -> cache: cache
edge cache -> api: hit
edge db -> api: rows
`;
