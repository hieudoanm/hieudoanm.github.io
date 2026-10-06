# MRI Pipeline

A reproducible, headless Python pipeline (library + CLI) that predicts
post-stroke aphasia outcome from lesion MRI plus clinical data.

Basis: reproduces and extends White et al. (2024), *NeuroImage: Clinical* 43,
103638. This is a research prototype, not a clinical tool.

## Status

Phase 2 is largely complete: the tabular evaluation harness runs end to end
from the CLI and writes a complete run folder. Imaging stages (preprocessing,
image generators) and deep models are deliberately not implemented yet — those
commands report what they would need instead of pretending to work.

See [`PROGRESS.md`](PROGRESS.md) for the full state and
[`docs/ROADMAP.md`](docs/ROADMAP.md) for the plan.

## Setup

Requires [`uv`](https://docs.astral.sh/uv/) and Python 3.14.8 (pinned).

```bash
make install     # uv sync --dev
make doctor      # interpreter, device and path status
```

Optional dependency groups: `pipeline[imaging]` (lesion-mask reading and the
not-yet-wired image stages), `pipeline[ml]`, `pipeline[stats]`, `pipeline[data]`,
`pipeline[all]`. Lesion masks are read through `pipeline[imaging]`; without it a
run that configures masks fails with the install hint rather than a raw
`ImportError`.

## Use

```bash
make demo                            # synthetic cohort + a dev run, from a clean clone

pipeline doctor                      # check the environment
pipeline data cohort                 # write data/synthetic/participants.tsv
pipeline data check                  # report the cohort the last command wrote
pipeline run --config configs/dev.yaml --output-dir runs/
pipeline list-runs
pipeline split                       # not yet implemented
```

`pipeline run` needs `data.participants_tsv` — a BIDS-style table with one row
per participant, plus the columns named in `data.features`. The real ARC cohort
is not redistributable, so `pipeline data cohort` writes a seeded synthetic table
with the same columns and `configs/dev.yaml` points at it; `data fetch` refuses
until you point `participants_tsv` at the real OpenNeuro table.

### Real ARC data

`configs/full.yaml` takes the dataset location from `ARC_DATA_PATH`, so no
machine-specific path is committed. Point it at a local `ds004884` checkout:

```bash
export ARC_DATA_PATH=/path/to/ds004884
uv sync --extra imaging                 # nibabel, for reading masks
pipeline run --config configs/full.yaml
```

With `data.lesion_mask_path` set, each participant's
`derivatives/lesion_masks/**/*_desc-lesion_mask.nii.gz` is measured and reduced
to a `lesion_volume_mm3` feature; participants without a readable mask are
dropped from the modelling cohort instead of treated as zero-lesion. The
feature must be listed in `data.features`, or the run refuses so the
measurements cannot be read and silently ignored.

A DataLad checkout only holds file placeholders until its content is fetched.
If the masks are unfetched the run fails with the path and a `datalad get` hint.
OpenNeuro mirrors the BIDS tree on public S3, so the masks alone can be fetched
without git-annex, for example by resolving each mask's symlink and downloading
`https://s3.amazonaws.com/openneuro.org/ds004884/<path-relative-to-dataset>`.

### Commands

| Command | State |
| ------- | ----- |
| `doctor`, `export-schemas`, `list-runs`, `run`, `compare`, `calibrate` | implemented |
| `data` | implemented (`cohort`, `check`); `data fetch` needs ARC access |
| `split`, `preprocess`, `images`, `baseline`, `train`, `evaluate`, `report`, `serve` | report what they would need, so a no-op is never recorded as a successful run |

## Development

```bash
make check       # lint + typecheck + test
make lint        # ruff check .
make typecheck   # pyright, strict
make test        # pytest
```

Current state: `ruff` clean, `pyright` strict at 0 errors, 213 tests passing.

## Layout

```
src/pipeline/
  core/          # cohort, split, metrics, stats, baselines, imaging, runner, reports
  schemas/       # Pydantic models, exported as JSON Schema
  cli.py         # Typer commands (thin adapters over core)
configs/         # dev.yaml, full.yaml
tests/
docs/            # ROADMAP.md, protocol.md
runs/            # outputs (git-ignored)
```

Every run writes one self-describing folder:

```
runs/<run_id>/
  config.yaml    manifest.json    events.jsonl    metrics.json
  splits/split.json    lockbox_access.json    artifacts/
```

## Conventions

- The participant is the splitting unit; no participant appears in two folds.
- The lock-box test set is touched rarely and every access is logged.
- Everything is config-driven and seeded; a run reproduces from its manifest.
- Decisions live in [`docs/protocol.md`](docs/protocol.md) and must be settled
  before the first model run.
- Logic lives in `core/`; the CLI is a thin adapter (no server: the workbench
  reads run folders directly).
