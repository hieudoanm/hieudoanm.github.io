# TREE

```text
├── languages/
│   ├── rust/
│   │   ├── api/
│   │   │   └── [openapi.json](./languages/rust/api/openapi.json)
│   │   ├── crates/
│   │   │   ├── browserverless/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/browserverless/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/browserverless/Cargo.toml)
│   │   │   ├── cli/
│   │   │   │   ├── src/
│   │   │   │   │   ├── [headed.rs](./languages/rust/crates/cli/src/headed.rs)
│   │   │   │   │   ├── [lib.rs](./languages/rust/crates/cli/src/lib.rs)
│   │   │   │   │   ├── [main.rs](./languages/rust/crates/cli/src/main.rs)
│   │   │   │   │   └── [serve.rs](./languages/rust/crates/cli/src/serve.rs)
│   │   │   │   ├── tests/
│   │   │   │   │   └── [serve_api.rs](./languages/rust/crates/cli/tests/serve_api.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/cli/Cargo.toml)
│   │   │   ├── css/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/css/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/css/Cargo.toml)
│   │   │   ├── dom/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/dom/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/dom/Cargo.toml)
│   │   │   ├── gui/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/gui/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/gui/Cargo.toml)
│   │   │   ├── headless/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/headless/src/lib.rs)
│   │   │   │   ├── tests/
│   │   │   │   │   └── [headless_rendering.rs](./languages/rust/crates/headless/tests/headless_rendering.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/headless/Cargo.toml)
│   │   │   ├── html/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/html/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/html/Cargo.toml)
│   │   │   ├── layout/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/layout/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/layout/Cargo.toml)
│   │   │   ├── network/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/network/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/network/Cargo.toml)
│   │   │   ├── paint/
│   │   │   │   ├── src/
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/paint/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/paint/Cargo.toml)
│   │   │   ├── renderer/
│   │   │   │   ├── src/
│   │   │   │   │   ├── [font.rs](./languages/rust/crates/renderer/src/font.rs)
│   │   │   │   │   └── [lib.rs](./languages/rust/crates/renderer/src/lib.rs)
│   │   │   │   └── [Cargo.toml](./languages/rust/crates/renderer/Cargo.toml)
│   │   │   └── style/
│   │   │       ├── src/
│   │   │       │   └── [lib.rs](./languages/rust/crates/style/src/lib.rs)
│   │   │       └── [Cargo.toml](./languages/rust/crates/style/Cargo.toml)
│   │   ├── docker/
│   │   │   └── [Dockerfile](./languages/rust/docker/Dockerfile)
│   │   ├── docs/
│   │   │   ├── [ARCHITECTURE.md](./languages/rust/docs/ARCHITECTURE.md)
│   │   │   ├── [CONTRIBUTING.md](./languages/rust/docs/CONTRIBUTING.md)
│   │   │   ├── [DOWNLOADS.md](./languages/rust/docs/DOWNLOADS.md)
│   │   │   ├── [PACKAGING.md](./languages/rust/docs/PACKAGING.md)
│   │   │   └── [ROADMAP.md](./languages/rust/docs/ROADMAP.md)
│   │   ├── tasks/
│   │   │   ├── [001-project-scaffolding.md](./languages/rust/tasks/001-project-scaffolding.md)
│   │   │   ├── [002-dom.md](./languages/rust/tasks/002-dom.md)
│   │   │   ├── [003-html-parser.md](./languages/rust/tasks/003-html-parser.md)
│   │   │   ├── [004-css-parser.md](./languages/rust/tasks/004-css-parser.md)
│   │   │   ├── [005-style-system.md](./languages/rust/tasks/005-style-system.md)
│   │   │   ├── [006-block-layout.md](./languages/rust/tasks/006-block-layout.md)
│   │   │   ├── [007-display-list.md](./languages/rust/tasks/007-display-list.md)
│   │   │   ├── [008-software-renderer.md](./languages/rust/tasks/008-software-renderer.md)
│   │   │   ├── [009-browser-orchestration.md](./languages/rust/tasks/009-browser-orchestration.md)
│   │   │   ├── [010-cli.md](./languages/rust/tasks/010-cli.md)
│   │   │   ├── [011-networking.md](./languages/rust/tasks/011-networking.md)
│   │   │   ├── [012-integration-tests.md](./languages/rust/tasks/012-integration-tests.md)
│   │   │   ├── [013-css-inheritance.md](./languages/rust/tasks/013-css-inheritance.md)
│   │   │   ├── [014-http-networking.md](./languages/rust/tasks/014-http-networking.md)
│   │   │   ├── [015-text-rendering.md](./languages/rust/tasks/015-text-rendering.md)
│   │   │   ├── [016-style-tag-gui.md](./languages/rust/tasks/016-style-tag-gui.md)
│   │   │   ├── [017-inline-layout.md](./languages/rust/tasks/017-inline-layout.md)
│   │   │   ├── [018-gui-implementation.md](./languages/rust/tasks/018-gui-implementation.md)
│   │   │   └── [session-summary-2026-08-27.md](./languages/rust/tasks/session-summary-2026-08-27.md)
│   │   ├── tests/
│   │   │   ├── client/
│   │   │   │   ├── [localhost.http](./languages/rust/tests/client/localhost.http)
│   │   │   │   └── [render.http](./languages/rust/tests/client/render.http)
│   │   │   ├── css/
│   │   │   │   ├── [colors.html](./languages/rust/tests/css/colors.html)
│   │   │   │   ├── [margin.html](./languages/rust/tests/css/margin.html)
│   │   │   │   ├── [padding.html](./languages/rust/tests/css/padding.html)
│   │   │   │   └── [selectors.html](./languages/rust/tests/css/selectors.html)
│   │   │   ├── html/
│   │   │   │   ├── [attributes.html](./languages/rust/tests/html/attributes.html)
│   │   │   │   ├── [basic.html](./languages/rust/tests/html/basic.html)
│   │   │   │   ├── [malformed.html](./languages/rust/tests/html/malformed.html)
│   │   │   │   └── [nested.html](./languages/rust/tests/html/nested.html)
│   │   │   └── rendering/
│   │   │       ├── [block-layout.html](./languages/rust/tests/rendering/block-layout.html)
│   │   │       ├── [mvp.html](./languages/rust/tests/rendering/mvp.html)
│   │   │       └── [text.html](./languages/rust/tests/rendering/text.html)
│   │   ├── [AGENTS.md](./languages/rust/AGENTS.md)
│   │   ├── [Cargo.lock](./languages/rust/Cargo.lock)
│   │   ├── [Cargo.toml](./languages/rust/Cargo.toml)
│   │   ├── [Dockerfile](./languages/rust/Dockerfile)
│   │   ├── [LICENSE](./languages/rust/LICENSE)
│   │   ├── [Makefile](./languages/rust/Makefile)
│   │   ├── [README.md](./languages/rust/README.md)
│   │   ├── [TREE.md](./languages/rust/TREE.md)
│   │   └── [docker-compose.yaml](./languages/rust/docker-compose.yaml)
│   └── [README.md](./languages/README.md)
├── public/
│   ├── [demo-en-descriptions.vtt](./public/demo-en-descriptions.vtt)
│   ├── [demo.mp4](./public/demo.mp4)
│   ├── [demo.png](./public/demo.png)
│   ├── [demo.svg](./public/demo.svg)
│   └── [index.html](./public/index.html)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
└── [landify.yaml](./landify.yaml)
```

39 directories, 87 files
