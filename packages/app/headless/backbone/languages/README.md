# Languages

1. [Go][go]
2. [Kotlin][kotlin]
3. [Rust][rust]

Each port ships the HTTP server and an MCP server reachable with
`<binary> mcp serve` over stdio.

All three ports expose the same eleven tools, so a client can switch languages
without editing its prompts:

| Tool                          | Does                                          |
| ----------------------------- | --------------------------------------------- |
| `backbone_health`             | Report the server and database are reachable  |
| `backbone_collections_create` | Create a collection and its backing table     |
| `backbone_collections_delete` | Drop a collection and its records             |
| `backbone_collections_list`   | List collections and their schemas            |
| `backbone_records_create`     | Insert a record, generating an id if absent   |
| `backbone_records_get`        | Fetch one record by id                        |
| `backbone_records_update`     | Replace a record's body                       |
| `backbone_records_delete`     | Remove one record                             |
| `backbone_records_list`       | Page and search a collection's records        |
| `backbone_export`             | Export every collection, record, bucket, file |
| `backbone_import`             | Import a previously exported payload          |

Export and import speak JSON only. Asking for another format is reported rather
than silently substituted.

Logging goes to stderr in every port, because stdout carries the JSON-RPC
frames and a stray log line there would be read as a malformed frame.

[go]: https://go.dev
[kotlin]: https://kotlinlang.org
[rust]: https://www.rust-lang.org
