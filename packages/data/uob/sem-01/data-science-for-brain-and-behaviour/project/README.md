# ENNI project workspace

This folder contains working materials for the MSc Data Science for Brain and Behaviour group project. The assessed report must be written by the group; AI-generated text must not be included in the final submission.

## Project map

- `requirements/` — assignment instructions and marking rubric.
- `research/` — internal dataset, measure, question, and decision notes. These are planning documents, not report text.
- `data/raw/ENNI/` — original TalkBank CHAT transcripts, organized by group and story-set/order folder. Keep these files unchanged.
- `data/processed/` — generated inventory, provisional MLCU approximation, and manual review sheet.
- `scripts/download_enni.py` — resumable downloader; prompts for TalkBank login and does not store credentials.
- `notebooks/analysis.ipynb` — transcript audit plus the gated primary slope-permutation workflow.
- `report/` and `submission/` — report planning and submission scaffolds.

## Current status

The dataset has been downloaded and structurally inspected. The notebook and script now run a **provisional** pooled age–MLCU permutation analysis. The scoring approximation requires group review against the official MLCU rules before its results are used. Comparing SLI and TD slopes is descriptive unless an appropriate formal test is confirmed as in scope; see `research/permutation-analysis.md`.

The report outline is a scaffold, not a completed report. The provisional age–MLCU result is positive (slope 0.3793; permutation p=0.0001; n=360), but depends on automated exclusion rules that need review. The assessment prohibits AI-generated content in the final submission, so the group must write the assessed prose itself and understand and verify the code and results.

To repeat the download, run `python3 scripts/download_enni.py` from this directory and enter an authorized TalkBank account when prompted. Existing transcript files are skipped.
