# TREE

```text
├── examples/
│   ├── images/
│   │   └── [vietinbank.png](./examples/images/vietinbank.png)
│   └── svg/
│       ├── [vietinbank-bold.svg](./examples/svg/vietinbank-bold.svg)
│       ├── [vietinbank-bw.svg](./examples/svg/vietinbank-bw.svg)
│       └── [vietinbank.svg](./examples/svg/vietinbank.svg)
├── languages/
│   ├── rust/
│   │   ├── docs/
│   │   │   ├── [ARCHITECTURE.md](./languages/rust/docs/ARCHITECTURE.md)
│   │   │   ├── [CONTRIBUTING.md](./languages/rust/docs/CONTRIBUTING.md)
│   │   │   ├── [DOWNLOADS.md](./languages/rust/docs/DOWNLOADS.md)
│   │   │   ├── [PACKAGING.md](./languages/rust/docs/PACKAGING.md)
│   │   │   └── [ROADMAP.md](./languages/rust/docs/ROADMAP.md)
│   │   ├── src/
│   │   │   ├── bin/
│   │   │   │   └── [vectify.rs](./languages/rust/src/bin/vectify.rs)
│   │   │   ├── cli/
│   │   │   │   ├── [args.rs](./languages/rust/src/cli/args.rs)
│   │   │   │   ├── [baseline.rs](./languages/rust/src/cli/baseline.rs)
│   │   │   │   ├── [measure.rs](./languages/rust/src/cli/measure.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/cli/mod.rs)
│   │   │   │   └── [sweep.rs](./languages/rust/src/cli/sweep.rs)
│   │   │   ├── contour/
│   │   │   │   ├── [bezier.rs](./languages/rust/src/contour/bezier.rs)
│   │   │   │   ├── [boundary.rs](./languages/rust/src/contour/boundary.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/contour/mod.rs)
│   │   │   │   └── [simplify.rs](./languages/rust/src/contour/simplify.rs)
│   │   │   ├── core/
│   │   │   │   ├── [color.rs](./languages/rust/src/core/color.rs)
│   │   │   │   ├── [error.rs](./languages/rust/src/core/error.rs)
│   │   │   │   ├── [geometry.rs](./languages/rust/src/core/geometry.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/core/mod.rs)
│   │   │   │   └── [raster.rs](./languages/rust/src/core/raster.rs)
│   │   │   ├── eval/
│   │   │   │   ├── [artifacts.rs](./languages/rust/src/eval/artifacts.rs)
│   │   │   │   ├── [baseline.rs](./languages/rust/src/eval/baseline.rs)
│   │   │   │   ├── [complexity.rs](./languages/rust/src/eval/complexity.rs)
│   │   │   │   ├── [diff.rs](./languages/rust/src/eval/diff.rs)
│   │   │   │   ├── [difference.rs](./languages/rust/src/eval/difference.rs)
│   │   │   │   ├── [fixtures.rs](./languages/rust/src/eval/fixtures.rs)
│   │   │   │   ├── [golden.rs](./languages/rust/src/eval/golden.rs)
│   │   │   │   ├── [metrics.rs](./languages/rust/src/eval/metrics.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/eval/mod.rs)
│   │   │   │   ├── [perceptual.rs](./languages/rust/src/eval/perceptual.rs)
│   │   │   │   ├── [render.rs](./languages/rust/src/eval/render.rs)
│   │   │   │   ├── [report.rs](./languages/rust/src/eval/report.rs)
│   │   │   │   ├── [shapes.rs](./languages/rust/src/eval/shapes.rs)
│   │   │   │   ├── [ssim.rs](./languages/rust/src/eval/ssim.rs)
│   │   │   │   ├── [suite.rs](./languages/rust/src/eval/suite.rs)
│   │   │   │   └── [sweep.rs](./languages/rust/src/eval/sweep.rs)
│   │   │   ├── pipeline/
│   │   │   │   ├── [config.rs](./languages/rust/src/pipeline/config.rs)
│   │   │   │   ├── [debug.rs](./languages/rust/src/pipeline/debug.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/pipeline/mod.rs)
│   │   │   │   ├── [options.rs](./languages/rust/src/pipeline/options.rs)
│   │   │   │   └── [trace.rs](./languages/rust/src/pipeline/trace.rs)
│   │   │   ├── preprocess/
│   │   │   │   ├── [label.rs](./languages/rust/src/preprocess/label.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/preprocess/mod.rs)
│   │   │   │   └── [quantize.rs](./languages/rust/src/preprocess/quantize.rs)
│   │   │   ├── segment/
│   │   │   │   ├── [mod.rs](./languages/rust/src/segment/mod.rs)
│   │   │   │   └── [regions.rs](./languages/rust/src/segment/regions.rs)
│   │   │   ├── server/
│   │   │   │   ├── [decode.rs](./languages/rust/src/server/decode.rs)
│   │   │   │   ├── [handlers.rs](./languages/rust/src/server/handlers.rs)
│   │   │   │   ├── [mod.rs](./languages/rust/src/server/mod.rs)
│   │   │   │   └── [types.rs](./languages/rust/src/server/types.rs)
│   │   │   ├── vector/
│   │   │   │   ├── [mod.rs](./languages/rust/src/vector/mod.rs)
│   │   │   │   ├── [model.rs](./languages/rust/src/vector/model.rs)
│   │   │   │   └── [svg.rs](./languages/rust/src/vector/svg.rs)
│   │   │   └── [lib.rs](./languages/rust/src/lib.rs)
│   │   ├── tests/
│   │   │   ├── golden/
│   │   │   │   ├── baselines/
│   │   │   │   ├── images/
│   │   │   │   │   ├── [circle.png](./languages/rust/tests/golden/images/circle.png)
│   │   │   │   │   ├── [ellipse.png](./languages/rust/tests/golden/images/ellipse.png)
│   │   │   │   │   ├── [letter-o.png](./languages/rust/tests/golden/images/letter-o.png)
│   │   │   │   │   ├── [palette.png](./languages/rust/tests/golden/images/palette.png)
│   │   │   │   │   ├── [ring.png](./languages/rust/tests/golden/images/ring.png)
│   │   │   │   │   ├── [square.png](./languages/rust/tests/golden/images/square.png)
│   │   │   │   │   ├── [star.png](./languages/rust/tests/golden/images/star.png)
│   │   │   │   │   ├── [triangle.png](./languages/rust/tests/golden/images/triangle.png)
│   │   │   │   │   ├── [two-color.png](./languages/rust/tests/golden/images/two-color.png)
│   │   │   │   │   └── [wave.png](./languages/rust/tests/golden/images/wave.png)
│   │   │   │   └── [baseline.json](./languages/rust/tests/golden/baseline.json)
│   │   │   ├── [api.rs](./languages/rust/tests/api.rs)
│   │   │   ├── [artifacts.rs](./languages/rust/tests/artifacts.rs)
│   │   │   ├── [end_to_end.rs](./languages/rust/tests/end_to_end.rs)
│   │   │   └── [eval.rs](./languages/rust/tests/eval.rs)
│   │   ├── [AGENTS.md](./languages/rust/AGENTS.md)
│   │   ├── [Cargo.lock](./languages/rust/Cargo.lock)
│   │   ├── [Cargo.toml](./languages/rust/Cargo.toml)
│   │   ├── [Dockerfile](./languages/rust/Dockerfile)
│   │   ├── [LICENSE](./languages/rust/LICENSE)
│   │   ├── [Makefile](./languages/rust/Makefile)
│   │   └── [README.md](./languages/rust/README.md)
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

22 directories, 89 files
