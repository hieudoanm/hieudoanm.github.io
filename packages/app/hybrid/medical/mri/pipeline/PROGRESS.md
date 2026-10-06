# MRI Pipeline Development Progress

**Project**: Predicting post-stroke aphasia outcome from lesion MRI plus
clinical data **Reference**: White et al. (2024), NeuroImage: Clinical 43,
103638 **Status**: Phase 2 complete (the tabular evaluation harness, baselines, `pipeline compare` and `pipeline calibrate` all run end-to-end, and a clean clone runs `make demo` on a synthetic cohort); the imaging and deep-learning paths are explicitly deferred
**Last Updated**: 2026-10-06

---

## Phase 0: Decisions and access (weeks 0-1)

### Tasks

- [ ] Meet the supervisor: PLORAS access, compute, public dataset for
      pre-training, research question wording
- [ ] Download ARC T1 scans, lesion masks and metadata only (check total size
      first)
- [x] Scaffold the repository (`uv`, Typer, Pydantic, `pytest`, CI)
- [ ] Resolve the checklist in section 5 of ROADMAP.md
- [x] Write `docs/protocol.md` and point ROADMAP section 9 at it; the TBDs
      inside still block the first model run
- [x] Fill in the empty `README.md` and `Makefile` (`make install|check`)
- [x] Split every module over the 200-line limit (`runner`, `split`, `cli`,
      `null_test`, `baselines`, `cohort`, `dataset`, `metrics`, `experiment`
      and the two long test files); the largest file is now 198 lines
- [x] Resolve CI/lint/type-check/tooling compatibility and get tests passing (198/198) in Python 3.14.8 environment with locked deps
- [x] Clear `pyright` strict across `src` and `tests` (0 errors) and keep `ruff check` at 0 findings
- [x] Add `joblib>=1.4.0` (pinned `1.6.0`) and sync `ruff`/`pyright` into both
      dev dependency groups
- [x] Keep `requires-python` pinned to `==3.14.8` with fully exact dependency
      pins; `pyproject.toml` comments and `ruff`/`pyright` targets now say so
      instead of claiming a 3.11/3.12 range

**Done when**: the usable ARC sample size is known and the research question is
written in one sentence.

### Completed

- [x] Repository scaffolded with uv
- [x] Typer CLI skeleton implemented
- [x] Pydantic configuration schemas created
- [x] pytest test suite set up
- [x] GitHub Actions CI configured: `.github/workflows/ci-app-hybrid-medical-mri-pipeline.yaml`
      runs `uv sync --dev`, `ruff`, `pyright` and `pytest` on Python 3.14.8, on
      ubuntu and macos
- [x] `pipeline doctor` command implemented
- [x] Basic tests passing

---

## Phase 1: Foundations (weeks 1-3)

### Tasks

- [x] Cohort builder: one row per participant, with a documented rule for
      choosing a session
- [x] Participant-level splitter (`StratifiedGroupKFold`) with a fixed lock-box
      split saved to disk
- [x] Lock-box access counter and log (every evaluation on it is recorded)
- [x] Run folder, manifest and JSONL event writer
- [x] Config schemas and `pipeline doctor`
- [x] Tests: no participant appears in both train and test; the split is
      reproducible from the seed

**Done when**: `pipeline split` produces identical splits on two machines and
the tests pass in CI.

### Completed

- [x] Cohort builder with session selection rules implemented
- [x] Participant-level splitter with lock-box test set
- [x] Lock-box access logger with JSON persistence
- [x] Run folder system with manifest generation
- [x] JSONL event writer for tracking pipeline progress
- [x] Config schemas exported as JSON Schema
- [x] Tests for split reproducibility passing
- [x] Session rules actually reduce the table to one row per participant; a
      table without a session column and duplicate ids is refused rather than
      passed through, because one participant in two folds invalidates a split
- [x] A continuous stratification column is binned before `StratifiedGroupKFold`,
      which rejects a continuous target

---

## Phase 2: Evaluation harness and baselines (weeks 3-6)

### Tasks

- [x] Metrics: accuracy, balanced accuracy, AUC, F1, plus calibration (ECE,
      Brier)
- [x] Corrected paired t-test (Nadeau-Bengio variance inflation and degree-of-
      freedom scaling) and Benjamini-Hochberg FDR, with degenerate and empty
      inputs handled explicitly
- [x] Null-simulation machinery that checks the type-I error rate of the design,
      using common simulated data across candidates so they are comparable
- [x] `pipeline calibrate` exposes that sweep as a command, printing the best
      degrees-of-freedom scaling and writing the full sweep as JSON
- [x] Baselines: logistic regression and gradient boosting on tabular features
- [x] Report tables as CSV and LaTeX, without a Jinja2 dependency
- [x] `pipeline run` executes the stages end to end and writes a complete run
      folder: manifest, config, `events.jsonl`, `metrics.json`, the participant
      split, the lock-box access log and the artefacts
- [ ] Regularised models and ROI lesion loads once the imaging stages exist (deferred to Phase 3)
- [ ] Optional nested cross-validation or a second lock-box
- [x] Model comparison across two runs, with the corrected test and FDR in the
      report; `pipeline compare` pairs the folds of runs that share a split and
      writes the comparison, significance and JSON tables
- [x] `pipeline calibrate` exposes the degrees-of-freedom sweep that justifies
      the corrected test's scaling for this design

**Done when**: baselines run end to end from the CLI and produce a table with
confidence intervals and a significance table. Both halves hold: `pipeline run`
writes the interval table and `pipeline compare` writes the significance table.

### Completed

- [x] `pipeline run --config ... --output-dir ... [--run-id ...]`, matching the
      command the desktop workbench builds, so the workbench can launch a run
- [x] Lock-box participants are excluded from training and scored once, with the
      access recorded
- [x] ECE computed from raw samples with equal-width bins that keep their
      alignment, and a confusion matrix that stays 2x2 for a single class
- [x] Report and launch-form list fields (`data.features`) round-trip through the
      workbench instead of silently becoming a text field

### Deliberately not implemented

The commands below report what they would need rather than pretending to work.
Each is a no-op that would otherwise be recorded as a successful run:

- `preprocess`, `images`, `train` - imaging and deep-learning stages
- `serve` - the workbench reads run folders directly
- `data fetch` - no ARC access yet

---

## Phase 3: Imaging representations (weeks 4-8)

### Tasks

- [ ] Preprocessing: registration to MNI space (using the lesion mask to guard
      the fit), lesion volume, AAL atlas parcellation
- [ ] Stitched MRI generator (64 axial slices tiled into one 2D image)
- [ ] ROI image generator with a configurable ROI list
- [ ] Hybrid image generator with configurable encodings (shape, size,
      intensity, position) and configurable features
- [ ] Caching and data hashing so each stage runs once per configuration
- [ ] Visual spot checks on a sample of participants, saved as figures

**Done when**: images for the whole cohort regenerate from one command and a
spot check shows correct alignment of masks and atlas.

---

## Phase 4: Deep models and reproduction check (weeks 7-11)

### Tasks

- [ ] ResNet-18 trainer: automatic device choice, seeds, early stopping on
      validation loss, class weighting, calibration
- [ ] Reproduce the paper's pattern (hybrid ROI above stitched MRI above or near
      baselines)
- [ ] Ablations: blank the symbols, shuffle tabular features, vary the number of
      ROIs
- [ ] Dev and full sweep configs (small sweeps locally, full sweeps on the
      cluster)
- [ ] Slurm job template, if a cluster is used

**Done when**: a full sweep runs from one command and every run folder validates
against the schema.

---

## Phase 5: Pre-training (weeks 11-16, gated)

**Gate**: Phase 2 and Phase 4 are complete, a suitable public T1 dataset is
available, and GPU time is confirmed.

### Tasks

- [ ] Choose the pre-training dataset and verify its access terms
- [ ] Match preprocessing to the stroke pipeline
- [ ] Pretext task: autoencoder or inpainting on 2D images, small proof of
      concept first
- [ ] Fine-tune and compare random initialisation, ImageNet and brain-specific
      weights under the identical harness

**Done when**: the three-way comparison is reported with confidence intervals
and corrected tests, whatever the result.

---

## Phase 6: Explainability and error analysis (weeks 9-17, parallel)

### Tasks

- [ ] Grad-CAM or Captum saliency per participant
- [ ] ROI-level importance and agreement across methods
- [ ] Per-participant error analysis, calibration plots, subgroup performance
      (lesion size, time since stroke)
- [ ] Check whether the model relies on the symbols or the brain pixels (links
      to the ablations)

**Done when**: figures for the dissertation are generated by `pipeline report`.

---

## Phase 7: Server mode (optional, any time after Phase 1)

**Dropped, by choice** (see P-22): the desktop workbench reads run folders
directly, so a server would duplicate logic the CLI already owns. The tasks stay
recorded in case that changes.

### Tasks

- [ ] `pipeline serve` wrapping the same core, bound to localhost
- [ ] Jobs run as subprocesses, with progress streamed from `events.jsonl`
- [ ] Token check for any non-local use. Remote access through an SSH tunnel

**Done when**: the app can launch and monitor a run through the server with no
pipeline code duplicated.

---

## Phase 8: Freeze and write-up (weeks 17-20)

### Tasks

- [ ] Freeze results: tag the code, lock configs, archive run folders
- [ ] Reproducibility bundle: environment file, instructions, expected outputs
- [ ] Export all dissertation tables and figures from run folders

**Done when**: a clean clone reproduces the headline table from the documented
commands.

---

## Feature Implementation Status

| ID   | Feature                                            | Priority | Phase | Status              |
| ---- | -------------------------------------------------- | -------- | ----- | ------------------- |
| P-01 | Cohort builder with documented session rule        | MVP      | 1     | done                |
| P-02 | Participant-level splitter and lock-box            | MVP      | 1     | done                |
| P-03 | Lock-box access counter and log                    | MVP      | 1     | done                |
| P-04 | Run folder, manifest, JSONL events                 | MVP      | 1     | done                |
| P-05 | Config schemas exported as JSON Schema             | MVP      | 1     | done                |
| P-06 | CLI skeleton and `pipeline doctor`                 | MVP      | 1     | done                |
| P-07 | Metrics with calibration                           | MVP      | 2     | done                |
| P-08 | Corrected t-test, FDR, null simulation             | MVP      | 2     | done                |
| P-09 | Baselines (logistic regression, gradient boosting) | MVP      | 2     | done                |
| P-10 | Report tables (CSV, LaTeX)                         | MVP      | 2     | done                |
| P-25 | `pipeline run` writing a complete run folder        | MVP      | 2     | done                |
| P-26 | Model comparison across two runs                   | MVP      | 2     | done                |
| P-27 | `pipeline calibrate` df-scaling sweep              | MVP      | 2     | done                |
| P-28 | Synthetic cohort (`data cohort`) + `make demo`     | Should   | 2     | done                |
| P-11 | Preprocessing, lesion volume, atlas lesion loads   | MVP      | 3     | not started         |
| P-12 | Stitched, ROI and hybrid image generators          | MVP      | 3     | not started         |
| P-13 | Stage caching and data hashing                     | MVP      | 3     | not started         |
| P-14 | ResNet-18 trainer with calibration                 | MVP      | 4     | not started         |
| P-15 | Ablation runner                                    | Should   | 4     | not started         |
| P-16 | Nested CV or second lock-box                       | Should   | 2/4   | not started         |
| P-17 | Slurm templates                                    | Should   | 4     | not started         |
| P-18 | Explainability and ROI importance                  | Should   | 6     | not started         |
| P-19 | Error analysis, calibration, subgroup plots        | Should   | 6     | not started         |
| P-20 | Reproducibility bundle                             | Should   | 8     | not started         |
| P-21 | Pre-training module and comparison runner          | Stretch  | 5     | not started         |
| P-22 | `pipeline serve`                                   | Stretch  | 7     | dropped, by choice  |
| P-23 | Dataset adapters (ATLAS, PLORAS)                   | Stretch  | any   | not started         |
| P-24 | 3D models                                          | Stretch  | any   | not started         |

---

## Technology Stack Setup

| Component        | Status | Notes                         |
| ---------------- | ------ | ----------------------------- |
| Python 3.14.8    | done   | Pinned in `.python-version` and `pyproject.toml` |
| uv               | done   | Installed and configured      |
| Typer            | done   | CLI implemented               |
| Pydantic         | done   | Configuration schemas created |
| pytest           | done   | 198 tests passing             |
| ruff             | done   | `ruff check .` clean across src and tests |
| pyright          | done   | `pyright` strict clean: 0 errors in src and tests |
| joblib           | done   | Declared directly; used by the baselines |
| GitHub Actions   | done   | `ci-app-hybrid-medical-mri-pipeline.yaml`: ruff/pyright/pytest on 3.14.8 |

---

## Decisions Log

Evaluation-protocol decisions now live in [`docs/protocol.md`](docs/protocol.md),
the single source of truth (ROADMAP section 9 points there).

Decided: cohort and session rule, outcome column, splits, lock-box policy,
corrected t-test with Benjamini-Hochberg FDR.

Still TBD there: threshold justification, primary metric, primary comparison,
number of models compared, stopping rules, what counts as a negative result.

---

## Notes

- All decisions must be documented in `docs/protocol.md` before the first model
  run — the file exists; the TBDs listed above still block the first model run
- Lock-box test set must be accessed rarely and every touch logged
- Everything is config-driven and seeded for reproducibility
- Logic lives in `core/`. The CLI is a thin adapter (no server: P-22 dropped)
