# Evaluation Protocol

The decisions an experiment must not change after it has started. ROADMAP
section 9 asked for this file to exist and be committed before the first model
run; it is now the single source of truth, and ROADMAP points here.

**Status**: partially decided. The harness decisions are settled; the
statistical design decisions marked **TBD** are Phase 0 blockers and require the
supervisor or a literature search.

**Last updated**: 2026-10-06

---

## 1. Cohort and session rule — decided

One row per participant. The session rule is explicit and configured per run
(`SessionRule.FIRST`, `LAST`, `WITH_WAB_AQ`). A table with several sessions per
participant and no session column, or with duplicate participant ids, is refused
rather than silently pooled — one participant in two folds invalidates a split.

Source: `data.participants_tsv`.

## 2. Outcome — decided in code, not yet justified

Continuous outcome is `data.outcome_column` (`wab_aq`), kept alongside the
binary label. Binarisation is `>= data.outcome_threshold`, currently **50.0**.

**TBD**: the literature justification for 50.0. ROADMAP section 5 lists this as
a Phase 0 fact to verify. Until it is cited here, treat every thresholded
result as provisional.

## 3. Features — provisional

Configured per run as `data.features`; an empty list is refused at run time.
Candidates named in ROADMAP section 5: `age_at_stroke`, `sex`, `wab_days`,
lesion volume.

Excluded by default:

- `wab_type` — derived from the outcome test, so it is a leakage risk.
- `race` — no clear justification on record.

**TBD**: confirm the final set against the real `participants.tsv`, and confirm
the ARC column names. `configs/full.yaml` currently carries the candidates as a
placeholder.

## 4. Splits — decided

| Setting | Value |
| ------- | ----- |
| Unit | participant (`StratifiedGroupKFold`) |
| `split.n_folds` | 4 |
| `split.lock_box_fraction` | 0.2 |
| `split.seed` | 42 |
| `split.stratify_by` | `wab_aq` |

A continuous stratification column is binned into at most 5 quantile bins first,
because `StratifiedGroupKFold` rejects a continuous target. The lock-box
fraction is clamped to `0.1 <= f <= 0.4` by the schema.

Splits are written to `runs/<run_id>/splits/split.json` and reproduce from the
seed alone.

## 5. Metrics

Implemented and always reported: accuracy, balanced accuracy, AUC, F1,
precision, recall, Brier score, ECE (equal-width bins, alignment preserved),
and a 2x2 confusion matrix that stays 2x2 for a single class. Confidence
intervals use the Wilson score interval at 95%.

**TBD**: which of these is the **primary** metric and which are secondary. The
choice sets the headline number and the multiplicity burden, so it has to be
fixed before the first comparison.

## 6. Primary comparison — TBD

For example hybrid ROI against the best baseline. Not chosen yet.

## 7. Test and multiplicity — partly decided

Comparison uses the corrected paired t-test (Nadeau & Bengio variance
inflation, `1/K + (K - 1)` for K-fold) with Benjamini-Hochberg FDR across the
model family.

Degrees of freedom are scaled by `df_scaling`, defaulting to **0.45**. That
value comes from White et al. (2024), calibrated by simulation for *their*
design (four folds, single lock-box). It has **not** been calibrated for this
design. Re-derive it with `pipeline calibrate` (the CLI for
`pipeline.core.calibration.calibrate_df_scaling`) and record the result here
before quoting any p-value.

**TBD**: the number of models compared, which fixes the multiplicity burden.

## 8. Stopping rules — TBD

When to stop the sweep, and when to stop adding models.

## 9. Negative result — TBD

ROADMAP section 1 requires an honest negative result if that is what the data
show. What has to be observed before writing it up as negative — an equivalence
bound, an interval width, a power calculation — is not yet defined.

## 10. Lock-box policy — decided

- Held out before training; lock-box participants never appear in a fold.
- Scored once per run, after model selection is frozen.
- Every access is appended to `runs/<run_id>/lockbox_access.json`.
- The run records the access count; the access log is part of the artefact set.

A run that touches the lock-box more than once is a bug, not a result.

---

## Open decisions (Phase 0 blockers)

Items marked TBD above, plus the wider ROADMAP section 5 checklist: ARC
participant count, session semantics of `wab_days`/`wab_aq`, T1 + mask + outcome
completeness, lesion mask space, PLORAS access, compute, submission date.

## Change log

| Date       | Change                                                     |
| ---------- | ---------------------------------------------------------- |
| 2026-10-06 | First version, consolidated from ROADMAP section 9 and the PROGRESS.md decisions log |
| 2026-10-06 | Section 7 now names `pipeline calibrate` as the command that re-derives the df scaling |
