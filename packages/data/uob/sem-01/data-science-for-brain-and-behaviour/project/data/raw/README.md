# Raw source data

The ENNI TalkBank `.cha` transcripts are stored in `ENNI/`. There are 361 files, grouped under `SLI/` and `TD/`. The downloader and source information are documented in `scripts/download_enni.py` and `research/dataset.md`.

Treat these as immutable source files. Make cleaning or analysis changes in reproducible code and save derived outputs under `data/processed/`. Do not add account credentials, session cookies, or participant-identifying information to this directory.
