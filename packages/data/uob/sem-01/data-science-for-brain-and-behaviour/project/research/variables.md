# Candidate variables and measurement checks

> Internal working notes, not assessed report text. Measures are candidates until checked and agreed by the group.

| Concept | Candidate representation | What the files show / what remains to decide |
| --- | --- | --- |
| Participant | One transcript file, using its relative path as a local key | 361 files for 361 corpus participants. Do not use names or dates of birth in project outputs. |
| Age | Target-child age from `@ID`, converted from `years;months.days` to a documented numeric unit | Present for 360 children; one TD header is missing age. Decide how the missing case is handled and whether to use exact age or completed months. |
| Group | `SLI` or `TD` from the first folder; retain source labels in data | Counts are 75 SLI and 286 TD. One TD header has a blank group; folder and corpus totals identify its group, but do not silently rewrite the raw header. |
| Story | `@G:` story label A1–A3 or B1–B3 | All six labels occur in the 361 files; two files repeat A1. Story order varies. Review anomalies and decide whether to aggregate all stories or retain story-level summaries. |
| Communication unit | A child `*CHI:` C-unit, with any CHAT continuation lines attached | The ENNI corpus describes transcripts as C-unit segmented. Exclude examiner `*EXA:` turns from child outcomes. |
| Candidate outcome: MLCU | Eligible child words / eligible child C-units, at a stated story or participant level | The official guide gives explicit exclusions. `[+ bch]` markers exist, but their coverage and exact local meaning need confirmation before using them as automated exclusions. |
| Candidate outcome: clause-based complexity | ENNI Complexity Index, if clauses can be coded reliably | The corpus does not include the original score codes. The measure requires clause identification; do not infer it automatically from `%mor` or `%gra`. |

## Questions before the analysis is fixed

- Can the MLCU rules be applied consistently from the CHAT main tier, and do existing `[+ bch]` markers cover the intended exclusions?
- Do the two repeated-A1 story markers reflect a transcription issue or intentional structure?
- Should the participant outcome combine eligible words and C-units across all six stories, or should outcomes be kept separate by story/set?
- Which age/group analysis and permutation design are actually taught in the module? The checked-in module notebooks are empty.
