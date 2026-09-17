# TREE

```text
├── languages/
│   ├── c/
│   │   ├── src/
│   │   │   ├── [main.c](./languages/c/src/main.c)
│   │   │   └── [test.c](./languages/c/src/test.c)
│   │   ├── [Dockerfile](./languages/c/Dockerfile)
│   │   ├── [LICENSE](./languages/c/LICENSE)
│   │   ├── [Makefile](./languages/c/Makefile)
│   │   └── [README.md](./languages/c/README.md)
│   ├── cpp/
│   │   ├── src/
│   │   │   ├── [main.cpp](./languages/cpp/src/main.cpp)
│   │   │   └── [test.cpp](./languages/cpp/src/test.cpp)
│   │   ├── [Dockerfile](./languages/cpp/Dockerfile)
│   │   ├── [LICENSE](./languages/cpp/LICENSE)
│   │   ├── [Makefile](./languages/cpp/Makefile)
│   │   └── [README.md](./languages/cpp/README.md)
│   ├── go/
│   │   ├── docs/
│   │   │   ├── [00-overview.md](./languages/go/docs/00-overview.md)
│   │   │   ├── [01-requirements.md](./languages/go/docs/01-requirements.md)
│   │   │   ├── [02-features.md](./languages/go/docs/02-features.md)
│   │   │   ├── [03-user-stories.md](./languages/go/docs/03-user-stories.md)
│   │   │   ├── [04-architecture.md](./languages/go/docs/04-architecture.md)
│   │   │   ├── [05-data-model.md](./languages/go/docs/05-data-model.md)
│   │   │   ├── [06-api-specification.md](./languages/go/docs/06-api-specification.md)
│   │   │   ├── [07-ui-ux-design.md](./languages/go/docs/07-ui-ux-design.md)
│   │   │   ├── [08-tech-stack.md](./languages/go/docs/08-tech-stack.md)
│   │   │   ├── [09-testing-strategy.md](./languages/go/docs/09-testing-strategy.md)
│   │   │   ├── [10-implementation-plan.md](./languages/go/docs/10-implementation-plan.md)
│   │   │   ├── [11-deployment.md](./languages/go/docs/11-deployment.md)
│   │   │   └── [12-operations.md](./languages/go/docs/12-operations.md)
│   │   ├── internal/
│   │   │   ├── db/
│   │   │   │   ├── [db.go](./languages/go/internal/db/db.go)
│   │   │   │   └── [db_test.go](./languages/go/internal/db/db_test.go)
│   │   │   └── server/
│   │   │       ├── [handler.go](./languages/go/internal/server/handler.go)
│   │   │       ├── [handler_test.go](./languages/go/internal/server/handler_test.go)
│   │   │       ├── [server.go](./languages/go/internal/server/server.go)
│   │   │       └── [server_test.go](./languages/go/internal/server/server_test.go)
│   │   ├── scripts/
│   │   │   └── [install.sh](./languages/go/scripts/install.sh)
│   │   ├── [AGENTS.md](./languages/go/AGENTS.md)
│   │   ├── [Dockerfile](./languages/go/Dockerfile)
│   │   ├── [LICENSE](./languages/go/LICENSE)
│   │   ├── [Makefile](./languages/go/Makefile)
│   │   ├── [README.md](./languages/go/README.md)
│   │   ├── [go.mod](./languages/go/go.mod)
│   │   └── [main.go](./languages/go/main.go)
│   ├── rust/
│   │   ├── benches/
│   │   │   └── [bench.rs](./languages/rust/benches/bench.rs)
│   │   ├── docs/
│   │   │   ├── [ARCHITECTURE.md](./languages/rust/docs/ARCHITECTURE.md)
│   │   │   ├── [CONTRIBUTING.md](./languages/rust/docs/CONTRIBUTING.md)
│   │   │   ├── [DOWNLOADS.md](./languages/rust/docs/DOWNLOADS.md)
│   │   │   ├── [PACKAGING.md](./languages/rust/docs/PACKAGING.md)
│   │   │   └── [ROADMAP.md](./languages/rust/docs/ROADMAP.md)
│   │   ├── src/
│   │   │   ├── db/
│   │   │   │   ├── [persist.rs](./languages/rust/src/db/persist.rs)
│   │   │   │   └── [ttl.rs](./languages/rust/src/db/ttl.rs)
│   │   │   ├── gui/
│   │   │   │   ├── [real.rs](./languages/rust/src/gui/real.rs)
│   │   │   │   └── [ui.slint](./languages/rust/src/gui/ui.slint)
│   │   │   ├── [cli.rs](./languages/rust/src/cli.rs)
│   │   │   ├── [db.rs](./languages/rust/src/db.rs)
│   │   │   ├── [gui.rs](./languages/rust/src/gui.rs)
│   │   │   ├── [handler.rs](./languages/rust/src/handler.rs)
│   │   │   ├── [lib.rs](./languages/rust/src/lib.rs)
│   │   │   ├── [main.rs](./languages/rust/src/main.rs)
│   │   │   └── [server.rs](./languages/rust/src/server.rs)
│   │   ├── tests/
│   │   │   ├── [handler.rs](./languages/rust/tests/handler.rs)
│   │   │   ├── [persist.rs](./languages/rust/tests/persist.rs)
│   │   │   └── [server.rs](./languages/rust/tests/server.rs)
│   │   ├── [AGENTS.md](./languages/rust/AGENTS.md)
│   │   ├── [Cargo.toml](./languages/rust/Cargo.toml)
│   │   ├── [Dockerfile](./languages/rust/Dockerfile)
│   │   ├── [LICENSE](./languages/rust/LICENSE)
│   │   ├── [Makefile](./languages/rust/Makefile)
│   │   ├── [README.md](./languages/rust/README.md)
│   │   └── [build.rs](./languages/rust/build.rs)
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

19 directories, 62 files
