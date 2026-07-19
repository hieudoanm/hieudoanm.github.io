# Project decisions and open questions

> Working log for the group. This is not assessed report prose.

## 2026-10-01

- ENNI remains the selected dataset candidate, based on the official TalkBank corpus and materials pages.
- Downloaded all 361 listed `.cha` transcripts to `data/raw/ENNI/` using `scripts/download_enni.py`. The files are retained as raw source data; no credentials are stored in the project.
- The local corpus has 75 SLI and 286 TD files. One TD transcript lacks age and group in its target-child header; folder labels agree with all non-blank group headers.
- Nearly all files contain the six A1–A3/B1–B3 story markers. Two have a repeated A1 marker. Age/group completeness and story-marker anomalies must be handled explicitly in any derived table.
- MLCU is a stronger feasibility candidate than the clause-based Complexity Index because the official MLCU guide provides word-count rules and raw transcripts contain `[+ bch]` markers. Do not treat those markers as a complete rule implementation until their coverage has been checked.
- The linked textbook repository contains chapters on permutation tests for differences in means, correlation, regression, and permutation inference for a single slope. The reviewed multiple-regression pages use additive predictors; no group-by-age interaction test was located.
- Proposed hierarchy, accepted by the user: primary question is whether age is associated with MLCU across the full sample, using the textbook's single-slope permutation procedure; secondary question is whether that slope differs between SLI and TD.
- The secondary slope-difference test remains conditional on instructor approval of a suitable method. Separate single-slope tests do not test the difference. If no taught/approved test is available, show group-specific slopes descriptively only.
- MLCU and the participant/story aggregation remain provisional until `[+ bch]` coverage and the two repeated-A1 transcripts are checked.
- The official MLCU guide confirms exclusions for question responses, broken-off utterances, maze words, unrelated utterances, and story-enders; it describes `[+ bch]` as the CLAN exclusion marker. The inventory shows that maze/filler markers are common, so simple `bch`-only automated scoring is not sufficient evidence of a valid MLCU.
- Added a reproducible inventory, an automated provisional score, and a manual review sheet. The automated parser excludes `[+ bch]` turns and explicit break-offs, strips selected CHAT maze/filler notation, counts main-tier words, and pools eligible turns across the six stories. It does not independently identify every question response or unrelated utterance.
- Age is converted from CHAT years;months.days to approximate years as years + months/12 + days/365.25.
- Provisional run: 360 age-complete children; pooled slope 0.3793 MLCU words per C-unit per year; two-sided, 10,000-shuffle permutation p-value 0.0001 (zero simulated slopes at least as extreme; plus-one correction). Descriptive SLI slope 0.4210 (n=75); TD slope 0.3726 (n=285). These values are conditional on approximate scoring and are not report-ready until reviewed.
- Rough sensitivity check excluding every child turn immediately after an examiner question gives pooled slope 0.3734 and permutation p=0.0001 (n=360). This simple rule may over-exclude story-elicitation responses; it is a robustness check, not a validated alternative scoring rule.
- Age coverage is similar across folder groups in this sample (SLI n=75, 4.17–9.75 years; TD age-complete n=285, 4.00–9.92 years). These are descriptions, not evidence of equal group distributions.

## Open questions

- Do `[+ bch]` annotations reliably represent the ENNI MLCU exclusions in these files? What exclusions are not marked?
- Why do two files repeat the A1 marker, and does this change their usable story sections?
- Should MLCU aggregate all six stories, or should A and B story sets be reported separately?
- Is a group-by-age interaction and an appropriate test of the slope difference within the taught methods? Ask the instructor because the reviewed textbook sections do not cover it.
- How should the single TD child with a missing age be treated in a relationship analysis?
