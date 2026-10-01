# Vectify

Raster to vector. Give it a PNG or a JPEG, get back an SVG made of real paths
and Bézier curves — small enough to scale, recolour, and animate, with no
raster data inside.

![A traced logo, reproduced from a raster source](examples/svg/vietinbank.svg)

Built as a classical computer-vision pipeline: threshold, median-cut
quantisation, flood-fill segmentation, contour tracing, Douglas–Peucker
simplification, and least-squares Bézier fitting. No machine learning, no model
weights, no network calls. The same input always produces byte-identical
output.

## Try it

The demo above is a real trace. Everything is also available as a CLI, an HTTP
service, and a Rust library.

```bash
vectify logo.png logo.svg
```

## Implementations

| Language | Status |
| --- | --- |
| [Rust](languages/rust) | Complete — CLI, HTTP server, library, measurement harness |

Rust is the reference implementation. Start with its
[README](languages/rust/README.md).

## What it is for

Vectorising a raster source — a logo exported as a bitmap, a screenshot, a
scanned mark — when the original vector file is gone or was never available.

The output is a genuine vector: each shape is a filled path with an outer
contour and any holes, emitted as `M`/`L`/`C`/`Z` with `fill-rule="evenodd"`.
Colours come from a median-cut palette, so the shapes can be restyled without
touching the geometry.

It is not a photo converter. A photograph has too much detail for any region
tracer to represent compactly; point Vectify at flat artwork.

## Accuracy is measured

Anyone can produce an SVG. Knowing whether it is *any good* takes a measurement,
so the tracer ships with a harness that rasterizes its own output with an
independent renderer and scores the result against the source:

```bash
vectify eval logo.png
```

```text
image                    mae%     psnr     ssim    edge   prims    bytes
vietinbank              1.133    23.49   0.9509  0.9758     364     7227
```

Those columns are complementary on purpose. MAE alone misses structural error,
SSIM alone misses colour error, and a file with zero error and four thousand
primitives has not been traced well. A committed baseline makes this a gate
rather than an opinion:

```bash
vectify baseline tests/golden/images   # exits 1 on any regression
```

The reasoning, including why an average is not enough, is in the
[optimization notes](languages/rust/.agents/OPTIMIZATION.md).

## Layout

```text
languages/rust/     The tracer
  src/preprocess/     Threshold, median cut, palette
  src/segment/        Flood fill, regions
  src/contour/        Boundaries, chaining, simplification
  src/pipeline/       Orchestration, config, debug artefacts
  src/vector/         Vector model, SVG serialisation
  src/eval/           Render-and-compare harness
  src/cli, src/server Two ways in
  docs/               Architecture, contributing, packaging
  tests/              API, end-to-end, artefacts, measurement
examples/
  images/             Sample inputs
  svg/                Reference outputs
public/               Demo assets and landing page
```

## Licence

GPL-3.0 — see [languages/rust/LICENSE](languages/rust/LICENSE).

Note: `languages/rust/Cargo.toml` declares `license = "MIT"`, which contradicts
that file. The `LICENSE` file is authoritative; the manifest should be corrected
to match.