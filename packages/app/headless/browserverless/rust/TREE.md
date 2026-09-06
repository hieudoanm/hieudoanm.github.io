# TREE

```text
├── crates/
│   ├── browserverless/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/browserverless/src/lib.rs)
│   │   └── [Cargo.toml](./crates/browserverless/Cargo.toml)
│   ├── cli/
│   │   ├── src/
│   │   │   ├── [headed.rs](./crates/cli/src/headed.rs)
│   │   │   ├── [lib.rs](./crates/cli/src/lib.rs)
│   │   │   ├── [main.rs](./crates/cli/src/main.rs)
│   │   │   └── [serve.rs](./crates/cli/src/serve.rs)
│   │   ├── tests/
│   │   │   └── [serve_api.rs](./crates/cli/tests/serve_api.rs)
│   │   └── [Cargo.toml](./crates/cli/Cargo.toml)
│   ├── css/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/css/src/lib.rs)
│   │   └── [Cargo.toml](./crates/css/Cargo.toml)
│   ├── dom/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/dom/src/lib.rs)
│   │   └── [Cargo.toml](./crates/dom/Cargo.toml)
│   ├── gui/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/gui/src/lib.rs)
│   │   └── [Cargo.toml](./crates/gui/Cargo.toml)
│   ├── headless/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/headless/src/lib.rs)
│   │   ├── tests/
│   │   │   └── [headless_rendering.rs](./crates/headless/tests/headless_rendering.rs)
│   │   └── [Cargo.toml](./crates/headless/Cargo.toml)
│   ├── html/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/html/src/lib.rs)
│   │   └── [Cargo.toml](./crates/html/Cargo.toml)
│   ├── layout/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/layout/src/lib.rs)
│   │   └── [Cargo.toml](./crates/layout/Cargo.toml)
│   ├── network/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/network/src/lib.rs)
│   │   └── [Cargo.toml](./crates/network/Cargo.toml)
│   ├── paint/
│   │   ├── src/
│   │   │   └── [lib.rs](./crates/paint/src/lib.rs)
│   │   └── [Cargo.toml](./crates/paint/Cargo.toml)
│   ├── renderer/
│   │   ├── src/
│   │   │   ├── [font.rs](./crates/renderer/src/font.rs)
│   │   │   └── [lib.rs](./crates/renderer/src/lib.rs)
│   │   └── [Cargo.toml](./crates/renderer/Cargo.toml)
│   └── style/
│       ├── src/
│       │   └── [lib.rs](./crates/style/src/lib.rs)
│       └── [Cargo.toml](./crates/style/Cargo.toml)
├── docker/
│   └── [Dockerfile](./docker/Dockerfile)
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [COMPATIBILITY.md](./docs/COMPATIBILITY.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DEVELOPMENT.md](./docs/DEVELOPMENT.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [FEATURES.md](./docs/FEATURES.md)
│   ├── [HEADLESS.md](./docs/HEADLESS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   ├── [ROADMAP.md](./docs/ROADMAP.md)
│   ├── [SERVER.md](./docs/SERVER.md)
│   ├── [openapi.json](./docs/openapi.json)
│   └── [servo-patches.md](./docs/servo-patches.md)
├── tasks/
│   ├── [001-project-scaffolding.md](./tasks/001-project-scaffolding.md)
│   ├── [002-dom.md](./tasks/002-dom.md)
│   ├── [003-html-parser.md](./tasks/003-html-parser.md)
│   ├── [004-css-parser.md](./tasks/004-css-parser.md)
│   ├── [005-style-system.md](./tasks/005-style-system.md)
│   ├── [006-block-layout.md](./tasks/006-block-layout.md)
│   ├── [007-display-list.md](./tasks/007-display-list.md)
│   ├── [008-software-renderer.md](./tasks/008-software-renderer.md)
│   ├── [009-browser-orchestration.md](./tasks/009-browser-orchestration.md)
│   ├── [010-cli.md](./tasks/010-cli.md)
│   ├── [011-networking.md](./tasks/011-networking.md)
│   ├── [012-integration-tests.md](./tasks/012-integration-tests.md)
│   ├── [013-css-inheritance.md](./tasks/013-css-inheritance.md)
│   ├── [014-http-networking.md](./tasks/014-http-networking.md)
│   ├── [015-text-rendering.md](./tasks/015-text-rendering.md)
│   ├── [016-style-tag-gui.md](./tasks/016-style-tag-gui.md)
│   ├── [017-inline-layout.md](./tasks/017-inline-layout.md)
│   ├── [018-gui-implementation.md](./tasks/018-gui-implementation.md)
│   └── [session-summary-2026-08-27.md](./tasks/session-summary-2026-08-27.md)
├── tests/
│   ├── client/
│   │   ├── [localhost.http](./tests/client/localhost.http)
│   │   └── [render.http](./tests/client/render.http)
│   ├── css/
│   │   ├── [colors.html](./tests/css/colors.html)
│   │   ├── [margin.html](./tests/css/margin.html)
│   │   ├── [padding.html](./tests/css/padding.html)
│   │   └── [selectors.html](./tests/css/selectors.html)
│   ├── html/
│   │   ├── [attributes.html](./tests/html/attributes.html)
│   │   ├── [basic.html](./tests/html/basic.html)
│   │   ├── [malformed.html](./tests/html/malformed.html)
│   │   └── [nested.html](./tests/html/nested.html)
│   └── rendering/
│       ├── [block-layout.html](./tests/rendering/block-layout.html)
│       ├── [mvp.html](./tests/rendering/mvp.html)
│       └── [text.html](./tests/rendering/text.html)
├── [AGENTS.md](./AGENTS.md)
├── [Cargo.lock](./Cargo.lock)
├── [Cargo.toml](./Cargo.toml)
├── [Dockerfile](./Dockerfile)
├── [LICENSE](./LICENSE)
├── [Makefile](./Makefile)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
└── [docker-compose.yaml](./docker-compose.yaml)
```

35 directories, 84 files
