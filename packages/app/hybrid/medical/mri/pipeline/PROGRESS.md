# MRI Pipeline Development Progress

**Project**: Predicting post-stroke aphasia outcome from lesion MRI plus
clinical data **Reference**: White et al. (2024), NeuroImage: Clinical 43,
103638 **Status**: Phase 0 - Decisions and access **Last Updated**: 2026-10-05

---

## Phase 0: Decisions and access (weeks 0-1)

### Tasks

- [ ] Meet the supervisor: PLORAS access, compute, public dataset for
      pre-training, research question wording
- [ ] Download ARC T1 scans, lesion masks and metadata only (check total size
      first)
- [x] Scaffold the repository (`uv`, Typer, Pydantic, `pytest`, CI)
- [ ] Resolve the checklist in section 5 of ROADMAP.md

**Done when**: the usable ARC sample size is known and the research question is
written in one sentence.

### Completed

- [x] Repository scaffolded with uv
- [x] Typer CLI skeleton implemented
- [x] Pydantic configuration schemas created
- [x] pytest test suite set up
- [x] GitHub Actions CI configured
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
- [x] All 22 tests passing

---

## Phase 2: Evaluation harness and baselines (weeks 3-6)

### Tasks

- [ ] Metrics: accuracy, balanced accuracy, AUC, F1, plus calibration (ECE,
      Brier)
- [ ] Corrected paired t-test and Benjamini-Hochberg FDR, ported from the
      paper's Appendix A1/A2
- [ ] Null-simulation test that checks the type-I error rate of your own design
- [ ] Baselines: logistic regression on tabular features; regularised models and
      gradient boosting on ROI lesion loads once available
- [ ] Optional nested cross-validation or a second lock-box
- [ ] Report tables as CSV and LaTeX

**Done when**: baselines run end to end from the CLI and produce a table with
confidence intervals and a significance table.

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

| ID   | Feature                                            | Priority | Phase | Status |
| ---- | -------------------------------------------------- | -------- | ----- | ------ |
| P-01 | Cohort builder with documented session rule        | MVP      | 1     | ✅     | Complete |
| P-02 | Participant-level splitter and lock-box            | MVP      | 1     | ✅     | Complete |
| P-03 | Lock-box access counter and log                    | MVP      | 1     | ✅     | Complete |
| P-04 | Run folder, manifest, JSONL events                 | MVP      | 1     | ✅     | Complete |
| P-05 | Config schemas exported as JSON Schema             | MVP      | 1     | ✅     | Complete |
| P-06 | CLI skeleton and `pipeline doctor`                 | MVP      | 1     | ✅     | Complete |
| P-07 | Metrics with calibration                           | MVP      | 2     | 🔲     |
| P-08 | Corrected t-test, FDR, null simulation             | MVP      | 2     | 🔲     |
| P-09 | Baselines (logistic regression, gradient boosting) | MVP      | 2     | 🔲     |
| P-10 | Report tables (CSV, LaTeX)                         | MVP      | 2     | 🔲     |
| P-11 | Preprocessing, lesion volume, atlas lesion loads   | MVP      | 3     | 🔲     |
| P-12 | Stitched, ROI and hybrid image generators          | MVP      | 3     | 🔲     |
| P-13 | Stage caching and data hashing                     | MVP      | 3     | 🔲     |
| P-14 | ResNet-18 trainer with calibration                 | MVP      | 4     | 🔲     |
| P-15 | Ablation runner                                    | Should   | 4     | 🔲     |
| P-16 | Nested CV or second lock-box                       | Should   | 2/4   | 🔲     |
| P-17 | Slurm templates                                    | Should   | 4     | 🔲     |
| P-18 | Explainability and ROI importance                  | Should   | 6     | 🔲     |
| P-19 | Error analysis, calibration, subgroup plots        | Should   | 6     | 🔲     |
| P-20 | Reproducibility bundle                             | Should   | 8     | 🔲     |
| P-21 | Pre-training module and comparison runner          | Stretch  | 5     | 🔲     |
| P-22 | `pipeline serve`                                   | Stretch  | 7     | 🔲     |
| P-23 | Dataset adapters (ATLAS, PLORAS)                   | Stretch  | any   | 🔲     |
| P-24 | 3D models                                          | Stretch  | any   | 🔲     |

---

## Technology Stack Setup

| Component        | Status | Notes                         |
| ---------------- | ------ | ----------------------------- |
| Python 3.11/3.12 | ✅     | Using 3.14 (uv default)       |
| uv               | ✅     | Installed and configured      |
| Typer            | ✅     | CLI skeleton implemented      |
| Pydantic         | ✅     | Configuration schemas created |
| pytest           | ✅     | Test suite passing            |
| ruff             | ✅     | Configured in pyproject.toml  |
| pyright          | ✅     | Configured in pyproject.toml  |
| GitHub Actions   | ✅     | CI workflow created           |

---

## Decisions Log

### Evaluation Protocol (Section 9 of ROADMAP.md)

| Item                             | Decision                                      |
| -------------------------------- | --------------------------------------------- |
| Cohort and session rule          | TBD                                           |
| Outcome and threshold            | TBD (justify from the literature)             |
| Features                         | TBD                                           |
| Splits                           | k folds, lock-box fraction, seeds: TBD        |
| Metrics (primary / secondary)    | TBD                                           |
| Primary comparison               | TBD (for example hybrid ROI vs best baseline) |
| Test and correction              | corrected paired t-test, Benjamini-Hochberg   |
| Number of models compared        | TBD (sets the multiplicity burden)            |
| Stopping rules                   | TBD                                           |
| What counts as a negative result | TBD                                           |

---

## Notes

- All decisions must be documented in `docs/protocol.md` before the first model
  run
- Lock-box test set must be accessed rarely and every touch logged
- Everything is config-driven and seeded for reproducibility
- Logic lives in `core/`. The CLI and the server are thin adapters
