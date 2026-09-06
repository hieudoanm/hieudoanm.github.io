# TREE

```text
├── rust/
│   ├── crates/
│   │   ├── browserverless/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/browserverless/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/browserverless/Cargo.toml)
│   │   ├── cli/
│   │   │   ├── src/
│   │   │   │   ├── [headed.rs](./rust/crates/cli/src/headed.rs)
│   │   │   │   ├── [lib.rs](./rust/crates/cli/src/lib.rs)
│   │   │   │   ├── [main.rs](./rust/crates/cli/src/main.rs)
│   │   │   │   └── [serve.rs](./rust/crates/cli/src/serve.rs)
│   │   │   ├── tests/
│   │   │   │   └── [serve_api.rs](./rust/crates/cli/tests/serve_api.rs)
│   │   │   └── [Cargo.toml](./rust/crates/cli/Cargo.toml)
│   │   ├── css/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/css/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/css/Cargo.toml)
│   │   ├── dom/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/dom/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/dom/Cargo.toml)
│   │   ├── gui/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/gui/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/gui/Cargo.toml)
│   │   ├── headless/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/headless/src/lib.rs)
│   │   │   ├── tests/
│   │   │   │   └── [headless_rendering.rs](./rust/crates/headless/tests/headless_rendering.rs)
│   │   │   └── [Cargo.toml](./rust/crates/headless/Cargo.toml)
│   │   ├── html/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/html/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/html/Cargo.toml)
│   │   ├── layout/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/layout/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/layout/Cargo.toml)
│   │   ├── network/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/network/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/network/Cargo.toml)
│   │   ├── paint/
│   │   │   ├── src/
│   │   │   │   └── [lib.rs](./rust/crates/paint/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/paint/Cargo.toml)
│   │   ├── renderer/
│   │   │   ├── src/
│   │   │   │   ├── [font.rs](./rust/crates/renderer/src/font.rs)
│   │   │   │   └── [lib.rs](./rust/crates/renderer/src/lib.rs)
│   │   │   └── [Cargo.toml](./rust/crates/renderer/Cargo.toml)
│   │   └── style/
│   │       ├── src/
│   │       │   └── [lib.rs](./rust/crates/style/src/lib.rs)
│   │       └── [Cargo.toml](./rust/crates/style/Cargo.toml)
│   ├── docker/
│   │   └── [Dockerfile](./rust/docker/Dockerfile)
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./rust/docs/ARCHITECTURE.md)
│   │   ├── [COMPATIBILITY.md](./rust/docs/COMPATIBILITY.md)
│   │   ├── [CONTRIBUTING.md](./rust/docs/CONTRIBUTING.md)
│   │   ├── [DEVELOPMENT.md](./rust/docs/DEVELOPMENT.md)
│   │   ├── [DOWNLOADS.md](./rust/docs/DOWNLOADS.md)
│   │   ├── [FEATURES.md](./rust/docs/FEATURES.md)
│   │   ├── [HEADLESS.md](./rust/docs/HEADLESS.md)
│   │   ├── [PACKAGING.md](./rust/docs/PACKAGING.md)
│   │   ├── [ROADMAP.md](./rust/docs/ROADMAP.md)
│   │   ├── [SERVER.md](./rust/docs/SERVER.md)
│   │   ├── [openapi.json](./rust/docs/openapi.json)
│   │   └── [servo-patches.md](./rust/docs/servo-patches.md)
│   ├── tasks/
│   │   ├── [001-project-scaffolding.md](./rust/tasks/001-project-scaffolding.md)
│   │   ├── [002-dom.md](./rust/tasks/002-dom.md)
│   │   ├── [003-html-parser.md](./rust/tasks/003-html-parser.md)
│   │   ├── [004-css-parser.md](./rust/tasks/004-css-parser.md)
│   │   ├── [005-style-system.md](./rust/tasks/005-style-system.md)
│   │   ├── [006-block-layout.md](./rust/tasks/006-block-layout.md)
│   │   ├── [007-display-list.md](./rust/tasks/007-display-list.md)
│   │   ├── [008-software-renderer.md](./rust/tasks/008-software-renderer.md)
│   │   ├── [009-browser-orchestration.md](./rust/tasks/009-browser-orchestration.md)
│   │   ├── [010-cli.md](./rust/tasks/010-cli.md)
│   │   ├── [011-networking.md](./rust/tasks/011-networking.md)
│   │   ├── [012-integration-tests.md](./rust/tasks/012-integration-tests.md)
│   │   ├── [013-css-inheritance.md](./rust/tasks/013-css-inheritance.md)
│   │   ├── [014-http-networking.md](./rust/tasks/014-http-networking.md)
│   │   ├── [015-text-rendering.md](./rust/tasks/015-text-rendering.md)
│   │   ├── [016-style-tag-gui.md](./rust/tasks/016-style-tag-gui.md)
│   │   ├── [017-inline-layout.md](./rust/tasks/017-inline-layout.md)
│   │   ├── [018-gui-implementation.md](./rust/tasks/018-gui-implementation.md)
│   │   └── [session-summary-2026-08-27.md](./rust/tasks/session-summary-2026-08-27.md)
│   ├── tests/
│   │   ├── client/
│   │   │   ├── [localhost.http](./rust/tests/client/localhost.http)
│   │   │   └── [render.http](./rust/tests/client/render.http)
│   │   ├── css/
│   │   │   ├── [colors.html](./rust/tests/css/colors.html)
│   │   │   ├── [margin.html](./rust/tests/css/margin.html)
│   │   │   ├── [padding.html](./rust/tests/css/padding.html)
│   │   │   └── [selectors.html](./rust/tests/css/selectors.html)
│   │   ├── html/
│   │   │   ├── [attributes.html](./rust/tests/html/attributes.html)
│   │   │   ├── [basic.html](./rust/tests/html/basic.html)
│   │   │   ├── [malformed.html](./rust/tests/html/malformed.html)
│   │   │   └── [nested.html](./rust/tests/html/nested.html)
│   │   └── rendering/
│   │       ├── [block-layout.html](./rust/tests/rendering/block-layout.html)
│   │       ├── [mvp.html](./rust/tests/rendering/mvp.html)
│   │       └── [text.html](./rust/tests/rendering/text.html)
│   ├── [AGENTS.md](./rust/AGENTS.md)
│   ├── [Cargo.lock](./rust/Cargo.lock)
│   ├── [Cargo.toml](./rust/Cargo.toml)
│   ├── [Dockerfile](./rust/Dockerfile)
│   ├── [LICENSE](./rust/LICENSE)
│   ├── [Makefile](./rust/Makefile)
│   ├── [README.md](./rust/README.md)
│   ├── [TREE.md](./rust/TREE.md)
│   └── [docker-compose.yaml](./rust/docker-compose.yaml)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

36 directories, 86 files
