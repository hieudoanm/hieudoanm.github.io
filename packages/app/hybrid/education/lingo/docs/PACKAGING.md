# Packaging

Lingo ships as a Tauri 2 desktop app and a static web export.

## Desktop (Tauri)

```bash
pnpm build          # static export to out/
pnpm tauri build    # platform bundles into src-tauri/target/release/bundle/
```

CI (`.github/workflows/ci-app-hybrid-education-lingo.yaml`) builds every
platform on pushes touching this app:

| Platform | Artifacts           |
| -------- | ------------------- |
| Android  | `.apk`, `.aab`      |
| Linux    | `.AppImage`, `.deb` |
| macOS    | `.dmg` (aarch64)    |
| Windows  | `.msi` (x64)        |

Artifacts attach to the `app-hybrid-education-lingo-latest` release tag with
versions stripped from filenames; `SHA256SUMS.txt` accompanies them.

## Updater

`tauri.conf.json` points the updater plugin at the rolling release:

```
https://github.com/hieudoanm/hieudoanm.github.io/releases/latest/download/latest.json
```

Releases must be signed with the key whose public half is embedded in
`tauri.conf.json` (`pubkey`).

## Web

The site's root post-build script rebuilds each hybrid app with
`BASE_PATH=/downloads/<slug>` and copies `out/` to `docs/downloads/<slug>/`. For
lingo this yields <https://hieudoanm.github.io/downloads/lingo/>.

Because of the base path:

- runtime asset URLs are prefixed via `src/lib/publicPaths.ts`
- CI builds never set `BASE_PATH`, so Tauri bundles use root-relative paths

## Checklist

1. `pnpm test` green (coverage ≥ 80%)
2. `pnpm lint` clean
3. `pnpm build` exports without errors
4. `python3 packages/app/hybrid/scripts/generate-downloads-md.py` up to date
5. Version bumped in `package.json` + `tauri.conf.json`
