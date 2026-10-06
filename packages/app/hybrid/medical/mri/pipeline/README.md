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

Optional dependency groups cover the not-yet-wired stages: `pipeline[imaging]`,
`pipeline[ml]`, `pipeline[stats]`, `pipeline[data]`, `pipeline[all]`.

## Use

```bash
pipeline doctor                      # check the environment
pipeline run --config configs/dev.yaml --output-dir runs/
pipeline list-runs
pipeline split                       # not yet implemented
```

`pipeline run` needs `data.participants_tsv` — a BIDS-style table with one row
per participant, plus the columns named in `data.features`.

### Commands

| Command | State |
| ------- | ----- |
| `doctor`, `export-schemas`, `list-runs`, `run` | implemented |
| `data` | implemented; `data fetch` needs ARC access |
| `split`, `preprocess`, `images`, `baseline`, `train`, `evaluate`, `compare`, `report`, `serve` | report what they would need, so a no-op is never recorded as a successful run |

## Development

```bash
make check       # lint + typecheck + test
make lint        # ruff check .
make typecheck   # pyright, strict
make test        # pytest
```

Current state: `ruff` clean, `pyright` strict at 0 errors, 133 tests passing.

## Layout

```
src/pipeline/
  core/          # cohort, split, metrics, stats, baselines, runner, reports
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
- Logic lives in `core/`; the CLI and the server are thin adapters.
