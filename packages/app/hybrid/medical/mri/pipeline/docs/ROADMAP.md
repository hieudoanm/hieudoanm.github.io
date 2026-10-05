# Pipeline Roadmap and Features

Project: predicting post-stroke aphasia outcome from lesion MRI plus clinical
data Basis: reproduces and extends White et al. (2024), NeuroImage: Clinical 43,
103638 Status: draft v0.1, 2026-10-05 Companion document: ../docs/ROADMAP.md (the
desktop app that drives this pipeline)

Week numbers below assume a 20-week project. Rescale them once the submission
date is known.

---

## 1. Goal

A reproducible, headless Python pipeline (library + CLI, optional server) that:

1. builds the paper's image representations (stitched MRI, ROI images, hybrid
   images) from public data,
2. trains and evaluates baselines and deep models under one rigorous protocol,
3. tests whether brain-specific pre-training improves on random and ImageNet
   initialisation,
4. writes every result to a self-describing run folder that the app or a script
   can read.

The main deliverable is a credible answer to "did it help?", with honest
uncertainty, including a clear negative result if that is what the data show.

## 2. Principles

- Evaluation before models. The harness and baselines come first.
- Participants, not scans or sessions, are the unit of splitting.
- The lock-box test set is touched rarely, and every touch is logged.
- Everything is config-driven and seeded. A run can be reproduced from its
  manifest.
- The same code runs on a laptop, a cluster, and (later) behind a server.
- Logic lives in `core/`. The CLI and the server are thin adapters.

## 3. Scope

In scope:

- ARC (OpenNeuro ds004884) as the primary public dataset
- ATLAS lesion masks, optionally, for stress tests and pre-training
- PLORAS, only if access is granted
- 2D models, classical baselines, statistics, explainability, gated pre-training

Out of scope:

- Any clinical use or clinical claim
- 3D models (only if time remains)
- CT or hospital-scanner data
- Training controls in the UI (the app only launches CLI runs)

## 4. Stack

| Layer              | Choice                                        |
| ------------------ | --------------------------------------------- |
| Environment        | Python 3.11/3.12, `uv`                        |
| Data access        | `openneuro-py` or DataLad, `pybids`           |
| Neuroimaging       | `nibabel`, `nilearn`, `SimpleITK` or `ANTsPy` |
| ML                 | PyTorch, `timm`, `torchvision`                |
| Classical models   | `scikit-learn`, XGBoost or LightGBM           |
| Statistics         | `scipy`, `statsmodels`                        |
| Explainability     | Captum or `pytorch-grad-cam`                  |
| Config and schemas | Pydantic + YAML, exported as JSON Schema      |
| Stage caching      | DVC (or Snakemake)                            |
| Tracking           | MLflow (local file store)                     |
| CLI                | Typer                                         |
| Optional server    | FastAPI + Server-Sent Events                  |
| Results storage    | Parquet + DuckDB (or SQLite)                  |
| Quality            | `pytest`, `ruff`, `pyright`, GitHub Actions   |

## 5. Facts to verify first (Phase 0)

These come from reading metadata files and papers, not from opening the images.
Confirm each locally before building on it.

- [ ] ARC participant count: `participants.tsv` appeared to have 300 rows, while
      the ARC paper describes 230 individuals. Count locally and identify the
      release.
- [ ] Which session `wab_days` and `wab_aq` refer to, since each person can have
      several sessions.
- [ ] How many people have a T1 scan, a lesion mask and a `wab_aq` score.
- [ ] Lesion mask space and source modality. One description says masks were
      drawn on T2 images from the first session, so alignment to the T1 must be
      checked.
- [ ] ARC has no obvious equivalent of PLORAS "initial severity". Decide the
      tabular feature set (candidates: `age_at_stroke`, `sex`, `wab_days`,
      lesion volume). Exclude `wab_type` (derived from the outcome test, so a
      leakage risk). Exclude `race` unless there is a clear justification.
- [ ] The outcome threshold for binarising `wab_aq`, with a literature
      justification. Keep the continuous score too.
- [ ] PLORAS access (supervisor).
- [ ] Compute: laptop specification and access to the university HPC service.
- [ ] Submission date.

## 6. Repository layout and run contract

```
repo/
  pipeline/
    src/pipeline/
      core/          # preprocess, images, models, train, evaluate, stats
      schemas/       # Pydantic models -> JSON Schema (shared with the app)
      runs.py        # create, list, read, cancel runs
      cli.py         # Typer commands
      server.py      # optional FastAPI adapter
    tests/
    configs/         # dev.yaml, full.yaml, per-experiment configs
  app/               # see ../docs/ROADMAP.md
  runs/              # outputs (git-ignored)
  docs/              # protocol, decisions, results log
```

Every run writes one folder:

```
runs/<run_id>/
  config.yaml          # resolved config
  manifest.json        # schema_version, git commit, config hash, data hash,
                       # seeds, device, library versions, start/end time
  events.jsonl         # one JSON object per line
  metrics.json         # summary metrics with confidence intervals
  predictions.parquet  # per-participant predictions and probabilities
  artifacts/           # weights, figures, tables
```

Example events (one per line):

```
{"type":"stage_start","stage":"train","run_id":"r_0042"}
{"type":"progress","stage":"train","seed":3,"fold":1,"epoch":12,"loss":0.41}
{"type":"metric","name":"val_balanced_accuracy","value":0.83,"fold":1}
{"type":"stage_end","stage":"train","status":"ok"}
```

CLI surface (target):

```
pipeline doctor                 # versions, device (CUDA / MPS / CPU), paths
pipeline data fetch|cohort|check
pipeline split
pipeline preprocess
pipeline images
pipeline baseline
pipeline train
pipeline evaluate
pipeline compare
pipeline report
pipeline serve                  # optional, Phase 7
```

## 7. Phases

### Phase 0: Decisions and access (weeks 0-1)

- [ ] Meet the supervisor: PLORAS access, compute, public dataset for
      pre-training, research question wording.
- [ ] Download ARC T1 scans, lesion masks and metadata only (check total size
      first).
- [ ] Scaffold the repository (`uv`, Typer, Pydantic, `pytest`, CI).
- [ ] Resolve the checklist in section 5.

Done when: the usable ARC sample size is known and the research question is
written in one sentence.

### Phase 1: Foundations (weeks 1-3)

- [ ] Cohort builder: one row per participant, with a documented rule for
      choosing a session.
- [ ] Participant-level splitter (`StratifiedGroupKFold`) with a fixed lock-box
      split saved to disk.
- [ ] Lock-box access counter and log (every evaluation on it is recorded).
- [ ] Run folder, manifest and JSONL event writer.
- [ ] Config schemas and `pipeline doctor`.
- [ ] Tests: no participant appears in both train and test; the split is
      reproducible from the seed.

Done when: `pipeline split` produces identical splits on two machines and the
tests pass in CI.

### Phase 2: Evaluation harness and baselines (weeks 3-6)

- [ ] Metrics: accuracy, balanced accuracy, AUC, F1, plus calibration (ECE,
      Brier).
- [ ] Corrected paired t-test and Benjamini-Hochberg FDR, ported from the
      paper's Appendix A1/A2.
- [ ] Null-simulation test that checks the type-I error rate of your own design
      (see the note in section 9).
- [ ] Baselines: logistic regression on tabular features; regularised models and
      gradient boosting on ROI lesion loads once available.
- [ ] Optional nested cross-validation or a second lock-box.
- [ ] Report tables as CSV and LaTeX.

Done when: baselines run end to end from the CLI and produce a table with
confidence intervals and a significance table.

### Phase 3: Imaging representations (weeks 4-8)

- [ ] Preprocessing: registration to MNI space (using the lesion mask to guard
      the fit), lesion volume, AAL atlas parcellation.
- [ ] Stitched MRI generator (64 axial slices tiled into one 2D image).
- [ ] ROI image generator with a configurable ROI list.
- [ ] Hybrid image generator with configurable encodings (shape, size,
      intensity, position) and configurable features.
- [ ] Caching and data hashing so each stage runs once per configuration.
- [ ] Visual spot checks on a sample of participants, saved as figures.

Done when: images for the whole cohort regenerate from one command and a spot
check shows correct alignment of masks and atlas.

### Phase 4: Deep models and reproduction check (weeks 7-11)

- [ ] ResNet-18 trainer: automatic device choice, seeds, early stopping on
      validation loss, class weighting, calibration.
- [ ] Reproduce the paper's pattern (hybrid ROI above stitched MRI above or near
      baselines). Compare against the paper's numbers as a plausibility check
      only, because the dataset and outcome differ.
- [ ] Ablations: blank the symbols, shuffle tabular features, vary the number of
      ROIs.
- [ ] Dev and full sweep configs (small sweeps locally, full sweeps on the
      cluster).
- [ ] Slurm job template, if a cluster is used.

Done when: a full sweep runs from one command and every run folder validates
against the schema.

### Phase 5: Pre-training (weeks 11-16, gated)

Gate: Phase 2 and Phase 4 are complete, a suitable public T1 dataset is
available, and GPU time is confirmed. Otherwise extend Phase 4 and Phase 6
instead.

- [ ] Choose the pre-training dataset and verify its access terms.
- [ ] Match preprocessing to the stroke pipeline.
- [ ] Pretext task: autoencoder or inpainting on 2D images, small proof of
      concept first.
- [ ] Fine-tune and compare random initialisation, ImageNet and brain-specific
      weights under the identical harness.

Done when: the three-way comparison is reported with confidence intervals and
corrected tests, whatever the result.

### Phase 6: Explainability and error analysis (weeks 9-17, parallel)

- [ ] Grad-CAM or Captum saliency per participant.
- [ ] ROI-level importance and agreement across methods.
- [ ] Per-participant error analysis, calibration plots, subgroup performance
      (lesion size, time since stroke).
- [ ] Check whether the model relies on the symbols or the brain pixels (links
      to the ablations).

Done when: figures for the dissertation are generated by `pipeline report`.

### Phase 7: Server mode (optional, any time after Phase 1)

- [ ] `pipeline serve` wrapping the same core, bound to localhost.
- [ ] Jobs run as subprocesses, with progress streamed from `events.jsonl`.
- [ ] Token check for any non-local use. Remote access through an SSH tunnel.

Done when: the app can launch and monitor a run through the server with no
pipeline code duplicated.

### Phase 8: Freeze and write-up (weeks 17-20)

- [ ] Freeze results: tag the code, lock configs, archive run folders.
- [ ] Reproducibility bundle: environment file, instructions, expected outputs.
- [ ] Export all dissertation tables and figures from run folders.

Done when: a clean clone reproduces the headline table from the documented
commands.

## 8. Feature list

| ID   | Feature                                            | Priority        | Phase |
| ---- | -------------------------------------------------- | --------------- | ----- |
| P-01 | Cohort builder with documented session rule        | MVP             | 1     |
| P-02 | Participant-level splitter and lock-box            | MVP             | 1     |
| P-03 | Lock-box access counter and log                    | MVP             | 1     |
| P-04 | Run folder, manifest, JSONL events                 | MVP             | 1     |
| P-05 | Config schemas exported as JSON Schema             | MVP             | 1     |
| P-06 | CLI skeleton and `pipeline doctor`                 | MVP             | 1     |
| P-07 | Metrics with calibration                           | MVP             | 2     |
| P-08 | Corrected t-test, FDR, null simulation             | MVP             | 2     |
| P-09 | Baselines (logistic regression, gradient boosting) | MVP             | 2     |
| P-10 | Report tables (CSV, LaTeX)                         | MVP             | 2     |
| P-11 | Preprocessing, lesion volume, atlas lesion loads   | MVP             | 3     |
| P-12 | Stitched, ROI and hybrid image generators          | MVP             | 3     |
| P-13 | Stage caching and data hashing                     | MVP             | 3     |
| P-14 | ResNet-18 trainer with calibration                 | MVP             | 4     |
| P-15 | Ablation runner                                    | Should          | 4     |
| P-16 | Nested CV or second lock-box                       | Should          | 2/4   |
| P-17 | Slurm templates                                    | Should          | 4     |
| P-18 | Explainability and ROI importance                  | Should          | 6     |
| P-19 | Error analysis, calibration, subgroup plots        | Should          | 6     |
| P-20 | Reproducibility bundle                             | Should          | 8     |
| P-21 | Pre-training module and comparison runner          | Stretch (gated) | 5     |
| P-22 | `pipeline serve`                                   | Stretch         | 7     |
| P-23 | Dataset adapters (ATLAS, PLORAS)                   | Stretch         | any   |
| P-24 | 3D models                                          | Stretch         | any   |

## 9. Evaluation protocol (fix before running experiments)

Write this into `docs/protocol.md` and commit it before the first model run.

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

Note on the corrected t-test: the paper's degrees-of-freedom scaling (0.45) was
calibrated by simulation for its own design (four folds, single lock-box).
Re-run the null simulation for your design before reusing that factor.

## 10. Lessons from the reference code (check, do not copy)

From reading the released scripts, not from running them:

- Paths, fonts and CUDA calls are hard-coded. Use config and automatic device
  selection.
- The scheduler step appears to be given accuracy where an epoch index is
  expected, and may be called twice per epoch. Test that learning-rate decay
  behaves as intended.
- A weighted sampler is created but not passed to the training loader.
- Subgroup metric code contains a block that looks duplicated. Unit-test
  subgroup metrics.
- Baseline results are hard-coded in the statistics scripts. Keep baselines in
  the same pipeline and format as every other model.
- Preprocessing is not included. Plan for it as real work.

## 11. Risks and fallbacks

| Risk                                             | Fallback                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| PLORAS access not granted                        | ARC only; state the limitation                                     |
| ARC sample smaller than expected after filtering | Report wide intervals; emphasise the evaluation framework          |
| No initial-severity feature in ARC               | Test other tabular features; drop the severity symbol              |
| Mask and T1 misalignment                         | Fix the registration step or use only verified cases               |
| Compute shortage                                 | Smaller sweeps locally; full sweeps on HPC or a short cloud rental |
| Differences between models too small to detect   | Report effect sizes and intervals honestly                         |
| Pre-training too costly                          | Replace Phase 5 with deeper ablations and explainability           |
| Scope creep                                      | Cut in this order: server, 3D, dataset adapters, pre-training      |

## 12. Definition of done

- A clean clone reproduces the main results table from documented commands.
- The evaluation protocol was written before the experiments and was followed.
- Every reported number traces to a run folder with a manifest.
- The lock-box access log shows how often the test set was used.
- Limitations are stated plainly, including that this is a research prototype
  and not a clinical tool.
