# Backbone — Disaster Recovery

## Scenarios

| Scenario                  | Recovery                                                 |
| ------------------------- | -------------------------------------------------------- |
| SQLite file corrupted     | Restore `data.db` from the most recent backup            |
| Binary lost               | Rebuild from source or re-download the static binary     |
| Secrets key lost          | Encrypted secrets become unrecoverable; rotate secrets   |
| Host unavailable          | Deploy the binary + data directory to an alternate host  |

## Acceptance criteria

- Recovery time bounded by restore + restart time.
- No data loss beyond the last backup of `~/.backbone/`.
