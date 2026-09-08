# Packaging

DOI ships as a Tauri 2 desktop app and a static web export.

## Desktop (Tauri)

```sh
pnpm build     # static export to out/
pnpm tauri build  # platform bundles into src-tauri/target/release/bundle/
```

CI builds every platform on pushes touching this app:

| Platform | Artifacts           |
| -------- | ------------------- |
| Linux    | `.AppImage`, `.deb` |
| macOS    | `.dmg` (aarch64)    |
| Windows  | `.msi` (x64)        |

Artifacts attach to the `app-hybrid-education-doi-latest` release tag with
versions stripped from filenames; `SHA256SUMS.txt` accompanies them.

## Updater

`tauri.conf.json` points the updater plugin at the rolling release:

https://github.com/hieudoanm/hieudoanm.github.io/releases/latest/download/latest.json

Releases must be signed with the key whose public half is embedded in
`tauri.conf.json` (`pubkey`).

## Web

The site's root post-build script rebuilds each hybrid app with
`BASE_PATH=/free/doi` and copies `out/` to `docs/free/doi/`.

## Icons

`src-tauri/icons` is generated from the web app icon (`public/icons/icon.svg`,
512x512) via `src-tauri/icons/create-icons.sh`. Re-run it whenever the app icon
changes, then re-verify the bundle.

## Checklist

1. `pnpm test` green (coverage >= 80%)
2. `pnpm lint` clean
3. `pnpm build` exports without errors
4. `pnpm tauri build` produces bundles for the current platform
5. Version bumped in `package.json` + `tauri.conf.json`
