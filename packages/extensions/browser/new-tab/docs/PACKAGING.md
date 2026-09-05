# New Tab — Packaging Checklist

Checklist for shipping New Tab to users as a loadable extension: MV2/MV3
artifact builds, store submission (Chrome Web Store, Edge Add-ons, Mozilla
AMO), and the `web-ext` lint gate.

App: `new-tab`, version 0.0.1. Manifest IDs:
`new-tab-extension@hieudoanm.github.io` (Gecko).

## Common

- [ ] Bump `version` in `package.json` and both `public/manifest/*/manifest.json`
      in sync
- [ ] Run `pnpm build --filter=@hieudoanm.github.io/new-tab` and confirm
      `dist/v2` and `dist/v3` both emit `background.js` and `manifest.json`
- [ ] Run `make lint` (web-ext) on both `dist/v2` and `dist/v3` — resolve all
      errors before shipping
- [ ] Smoke-test the manual matrix from [CONTRIBUTING](CONTRIBUTING)
- [ ] Regenerate `docs/ROADMAP.md` release notes for the release tag

## Artifacts

- [ ] `make build` produces `download/v2/` and `download/v3/` containing
      `.zip`, `.xpi`, and `.crx` for each version
- [ ] `zip` — plain archive of each `dist/` directory
- [ ] `xpi` — Firefox package built via `pnpm web-ext build`
- [ ] `crx` — Chromium package via Chrome
      `--pack-extension` (skips gracefully when Chrome is absent)
- [ ] `download/README.md` copied alongside artifacts by `make build`
- [ ] Release assets uploaded under the tag
      `extensions-browser-new-tab-latest` with the naming scheme
      `new-tab-v{2|3}.{crx,xpi,zip}`

## Chrome Web Store (MV3)

- [ ] Publisher/developer account verified and developer identity checked
- [ ] Single-purpose description matches the manifest `description`
- [ ] `dist/v3` zip uploaded; store requires MV3 only
- [ ] Privacy: no user data is collected, transmitted, or sold — declare
      "no data collected" in the privacy tab
- [ ] Icons at 16/48/128 + a 440x280 promotional tile uploaded
- [ ] `<all_urls>` `host_permissions` justified — only used to detect and
      redirect the browser's own new-tab pages; `tabs` permission documented in
      the rationale

## Edge Add-ons

- [ ] Microsoft Partner Center developer account verified
- [ ] Same MV3 `dist/v3` zip submitted; list on Microsoft Edge Add-ons
- [ ] Privacy declarations mirror the Chrome Web Store listing

## Mozilla Add-ons (AMO)

- [ ] AMO developer account registered (personal use is free)
- [ ] Firefox uses MV2 — submit `dist/v2` zip
- [ ] `browser_specific_settings.gecko.id` matches
      `new-tab-extension@hieudoanm.github.io`
- [ ] `web-ext lint` clean before submission (AMO re-runs it and can reject)
- [ ] Source code linked to the open-source license (GPL-3.0)
- [ ] Answer review questions: no remote code, no data collection, permissions
      limited to `tabs` + `<all_urls>` for new-tab detection only

## Release Automation

- [ ] Tag a release `extensions-browser-new-tab-<version>` on GitHub
- [ ] Attach `download/v2/*` and `download/v3/*` artifacts to the release
- [ ] Keep the rolling `-latest` tag pointed at the newest artifacts so store
      download links (see [DOWNLOADS](DOWNLOADS)) stay current