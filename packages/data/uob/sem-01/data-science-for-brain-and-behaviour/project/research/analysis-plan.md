# Draft analysis plan

> Planning notes only. Do not treat the method as selected or copy this into the report.

1. Preserve the 361 downloaded `.cha` files unchanged.
2. Build a participant-level metadata inventory from the target-child `@ID` record and folder labels. Report missing or conflicting metadata rather than silently filling it.
3. Inspect CHAT `@G` story boundaries and the two repeated-A1 cases before deciding how story data will be summarized.
4. Generate a provisional participant score with `scripts/analyse_enni.py`; verify its exclusions on a group-reviewed sample against the official MLCU guide. Correct or replace candidate scores if needed. The included question-response sensitivity is a coarse diagnostic, not the final scoring rule.
5. Document the final participant-level eligible word and C-unit totals, score notes, and aggregation across the six stories. Exclude the child with missing age from age analyses.
6. **Primary:** test the pooled age–MLCU slope with the textbook's single-slope permutation procedure after outcome scoring is confirmed.
7. **Secondary:** estimate and visualize SLI and TD slopes descriptively. Add a formal slope-difference test only if the instructor confirms an appropriate method is in scope and the group can explain its null model and permutation scheme.
8. Generate no more than four final figures, following the rubric and the group's own interpretation of the results.

## Open methodological risks

- MLCU excludes mazes and several types of utterances, not just all examiner turns; marker completeness is unverified.
- The six stories differ in complexity, and A/B story order is counterbalanced. A pooled outcome needs a clear justification.
- Age is absent for one participant. The effect of excluding that participant should be documented if age is essential.
- The textbook's slope example shows an upper-tail permutation calculation. If the group asks a non-directional question, confirm how to form and interpret a two-sided test before coding.
- A test that each group's age slope is individually non-zero does not test whether the two slopes differ.
- The pooled age slope is a marginal relationship and may reflect both within-group age patterns and between-group differences.
