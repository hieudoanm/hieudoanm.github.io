# ENNI dataset notes

> Internal working notes. Do not copy this text into the assessed report.

## Source and retrieval

- Corpus: [CHILDES Clinical English ENNI](https://talkbank.org/childes/access/Clinical-Eng/ENNI.html), DOI [10.21415/T51G7V](https://doi.org/10.21415/T51G7V).
- Official materials: [ENNI materials](https://talkbank.org/childes/access/Clinical-Eng/ENNI-materials/) and [MLCU scoring guidance](https://talkbank.org/childes/access/Clinical-Eng/ENNI-materials/Complexity/mlcu.pdf).
- Retrieved 2026-10-01 as individual `.cha` files through the TalkBank transcript API. Raw files are under `data/raw/ENNI/`; credentials are not recorded here.
- There are 361 non-empty transcript files (about 9.5 MB): 75 under `SLI/` and 286 under `TD/`. The processed inventory and provisional candidate MLCU scores are generated from these raw files; see `data/processed/README.md` for their status.
- The downloader is `scripts/download_enni.py`. It prompts for account credentials, uses the public tree to find ENNI transcripts, retains the group/story folder layout, and skips existing files.

## Structure observed locally

- Each transcript has a target-child `@ID` record, an investigator record, and `*CHI` / `*EXA` speaker turns. Child turns are transcribed as C-units. `%mor` and `%gra` tiers occur frequently, but the corpus page states that original ENNI outcome codes are not included.
- Age is recorded in the target-child `@ID` field in CHAT form (`years;months.days`). It is present in 360 files; one TD file has no age or group value in its child header. Its folder says TD, but its age cannot be recovered from that header.
- Header group values agree with the `SLI` or `TD` folder wherever a value is present. Keep the corpus term `SLI` in data fields; describe the group as language impairment when explaining the corpus, as the corpus page cautions that IQ information was not collected.
- Each file contains story `@G:` markers for A1, A2, A3, B1, B2, and B3. Two files contain a repeated A1 marker, so these two transcripts need review before any story-level aggregation. The order of the A and B sets varies between files.
- Nine files are nested under `0noaudio/`; these remain transcript files and are included in the 361-file count.
- A child line may have dependent tiers on subsequent lines. Parse CHAT tiers explicitly; do not treat every physical line as an utterance.

## Measurement implications and open checks

- The official MLCU guide defines word-based MLCU and excludes responses to questions, interrupted/broken-off sentences, maze words, unrelated utterances, and story-enders. It describes `[+ bch]` as a marker for lines excluded from CLAN MLU. Such markers occur on 1,757 child lines and 28 examiner lines in these files. Verify their local use and coverage against the guide before relying on them.
- The [CHAT manual](https://talkbank.org/0info/manuals/CHAT.pdf) defines `[+ bch]` as an utterance-level exclusion marker. The MLCU guide describes adding it to utterances to omit from the count, so it is a promising annotation; its coverage for the ENNI exclusions still needs checking.
- The corpus has no supplied Complexity Index result. The ENNI Complexity Index requires identifying independent and dependent clauses, so a clause-based measure would need a transparent manual coding procedure and agreement checks.
- All six story sections appear in each transcript, which makes participant-level summaries possible, but aggregation across story complexity and the two story-set orders still needs an explicit rationale.
- The checked-in course-module notebooks are empty, but the user-provided textbook repository includes chapters on permutation, correlation, regression, and inference on a single slope. The relevant chapters do not establish that a group-by-age interaction test is in scope.
