# pagify — Risk Mitigation

| Risk                              | Mitigation                                                  |
| --------------------------------- | ----------------------------------------------------------- |
| Missed-change bugs in preview     | Rebuild on every request instead of filesystem watching     |
| Deleted pages surviving rebuild   | Replace `dist/` on each build                               |
| Path traversal in `serve` API     | Confine all file access to `--root` via `internal/workspace`|
| Flash of incorrect theme          | Persist theme preference; no FOUC                           |
| Large sites slow to build         | Sequential per-request rebuild; incremental later if needed |
| Dependency creep                  | Prefer Go standard library; evaluate each dependency        |
