# Permutation-analysis notes

> Internal explanation from the linked course textbook. Not report text; the group should be able to explain every step.

## Procedures shown in the textbook

- **Difference in two means:** calculate the observed mean difference; pool the participant outcomes; repeatedly shuffle and split into the original group sizes; recompute the difference. This simulates a null distribution under no group-mean difference, assuming the pooled outcomes are exchangeable between groups.
- **Single regression slope:** calculate the observed simple-regression slope; repeatedly shuffle one variable's values to break its pairing with the other variable; refit the slope; compare the observed slope with the simulated null slopes. The worked page counts slopes at least as large as the observed slope, which is an upper-tail example.

The book chapters are [`permutation_idea`](https://github.com/olsonac/textbook/blob/main/permutation/permutation_idea.Rmd), [`permutation_and_t_test`](https://github.com/olsonac/textbook/blob/main/permutation/permutation_and_t_test.Rmd), and [`inference_on_slopes`](https://github.com/olsonac/textbook/blob/main/mean-slopes/inference_on_slopes.Rmd). Correlation and regression are introduced in [`Correlation`](https://github.com/olsonac/textbook/blob/main/mean-slopes/Correlation.Rmd) and [`multiple_regression`](https://github.com/olsonac/textbook/blob/main/mean-slopes/multiple_regression.Rmd).

## Fit to the proposed primary and secondary questions

- **Primary:** the pooled age–MLCU association can use the textbook's single-slope permutation procedure. This is a marginal association across the full sample; it can combine within-group age trends with differences between SLI and TD participants.
- The working notebook uses a two-sided statistic (`absolute simulated slope >= absolute observed slope`) and a plus-one Monte Carlo correction. The linked textbook's worked example illustrates an upper-tail test; the group should verify that the two-sided adaptation matches the class treatment and the chosen hypothesis.
- **Secondary:** the question whether the SLI and TD slopes differ is not answered by two separate single-slope tests. The reviewed multiple-regression pages show additive predictors, not a group-by-age interaction test. Ask the instructor whether a suitable interaction/permutation procedure is acceptable. Until then, group-specific slope estimates can be shown descriptively, without claiming a formal difference test.

Before implementation, agree on a directional versus non-directional hypothesis. The worked textbook examples use upper-tail comparisons; a two-sided procedure needs to be understood and agreed before coding. Also consider whether observational group labels are exchangeable after accounting for their age distributions.
