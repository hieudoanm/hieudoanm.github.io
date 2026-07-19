export const DEFAULT_DIAGRAM = `# Diagram source file (.diagram)
# Lines starting with # are comments.
#
#   title: <diagram title>
#   kind: <flow | sequence>
#   node <id>: <label> [shape, icon=<name>]
#   edge <from> -> <to>: <label>      (use -- for an undirected line)
#
# Shapes: rect, round, ellipse, diamond, cylinder, hexagon,
#         parallelogram, cloud, note, actor
# Icons: alert, archive, auth, bell, box, browser, cache, camera, chart,
#        check, clock, cloud, code, compute, credit-card, database, eye,
#        file, globe, heart, key, link, mail, map, message, monitor, music,
#        phone, queue, search, server, settings, shield, star, sync, users,
#        video, worker

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
