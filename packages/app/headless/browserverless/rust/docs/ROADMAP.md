# Roadmap / phase status

Tracks `AGENTS.md` §46. Status as of 2026-08-28.

| Phase | Name                    | Status                                                                                              |
| ----- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| 0     | Repository bootstrap    | ✅ `cargo check/test/fmt/clippy` green (workspace of 3 crates)                                      |
| 1     | Servo smoke test        | ✅ Servo embeds; WebView + SoftwareRenderingContext; local HTML renders                             |
| 2     | Headed browser          | ✅ winit window + `WindowRenderingContext` + paint/present loop                                     |
| 3     | Navigation shell        | ⚠️ minimal: scroll + resize forwarded; no back/forward/reload/address-bar                           |
| 4     | Headless rendering      | ✅ offscreen PNG; verified against mvp + real URLs (see `COMPATIBILITY.md`)                         |
| 5     | Deterministic rendering | ⚠️ fixed viewport + scale; fixtures exist; no image-diff comparison yet, no local HTTP test server  |
| 6     | CLI                     | ⚠️ subcommands `open`/`headless`/`screenshot`/`scrape`/`memory`/`serve`; `--script`/`--user-agent`/`--version` not wired |
| 7     | Server                  | ⚠️ `serve` subcommand live (health/version/html over one serialized worker) — see `SERVER.md`; separate server crate + hardening deferred |
| 8     | Server hardening        | ❌                                                                                                  |
| 9     | Browser state           | ❌                                                                                                  |
| 10    | Multiple pages/tabs     | ❌ (blocked: multi-page in one context is unreliable — see `servo-patches.md` #6)                   |
| 11+   | Product features        | ❌                                                                                                  |

## Verified milestone (Phase 4 acceptance)

```bash
cargo run -p browserverless-cli -- screenshot \
  file://$(pwd)/tests/rendering/mvp.html \
  --output /tmp/mvp.png --width 800 --height 600 --timeout 60000
```

## Immediate next work (priority order)

1. **Server hardening** (Phase 8) — separate `server` crate/bin, SSRF protections,
   concurrency/response limits, JSON + PNG render endpoints, graceful shutdown.
2. **Deterministic rendering** (Phase 5) — local HTTP test server + image-diff golden tests
   for the existing fixtures.
3. **Cleanup** — delete stale engine crates (`css`/`dom`/`html`/`layout`/`network`/`paint`/
   `renderer`/`style`/`gui`), stale `tests/css`/`tests/html` fixtures, stale `tasks/*`, and
   fix the `Makefile` `screenshot` target (uses `-p cli`). See `DEVELOPMENT.md`.
4. **Headless CLI flags** (Phase 6) — `--script`, `--user-agent`, `--version`, and honoring
   the `open` URL argument.
5. **Diagnose multi-page contamination** (Phase 10 prerequisite) — second `new_page()` in a
   process renders the first page's content; needs a Servo-internals trace before tabs/pools.
