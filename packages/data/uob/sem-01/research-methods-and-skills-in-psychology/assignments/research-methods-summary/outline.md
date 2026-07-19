# Drift diffusion model: planning outline

> **Planning notes, not submission-ready prose.** The assessment brief permits AI help with brainstorming and structure, but says AI-generated content cannot appear in the final submission. Use these prompts to write the summary yourself and check the module's AI-use rules before submitting.

> **Source-date rule:** Use only sources published in 2016 or later. Prefer sources from 2021 onward where suitable. All sources below meet the preferred date range.

> **Reference-count rule:** Include at least 5 and no more than 10 references. Cite each source in the text and list only sources actually cited.

## Suggested structure (target: 430–480 words including in-text citations)

### 1. What is the method? (about 60 words)

- In your own words, define the drift diffusion model (DDM) as an account of how people make a choice between two options when information is incomplete or noisy.
- Explain its core idea: evidence gradually accumulates until a response can be made. Use the recent practical overview by Myers et al. (2022).
  s

### 2. How does it work? (about 115 words)

- Choose a simple example, such as deciding whether a briefly shown image contains a left- or right-tilted line.
- Describe the evidence as a random, changing signal that tends to support one response or the other.
- Explain that the model treats the response as occurring when accumulated evidence reaches one of two decision limits.
- In plain language, connect the rate/direction of evidence accumulation with evidence quality; connect the distance between limits with cautious versus quick responding.
- Mention that observed response time also includes time for processes outside the decision itself, such as seeing the stimulus and making the motor response (Myers et al., 2022; Tran et al., 2021).

### 3. What can it be used for? (about 65 words)

- Name a few examples: perceptual choices, memory recognition, or word/non-word decisions.
- Say what researchers learn by fitting the model to both choices and response times: which aspects of performance may reflect evidence quality, response caution, or non-decision processes.
- Cite one or two recent reviews (Myers et al., 2022; Tran et al., 2021; Harris & Hutcherson, 2022).

### 4. Why is it useful? (about 65 words)

- Explain why accuracy alone or average response time alone can be incomplete.
- Describe the advantage of accounting for correct and incorrect responses and the spread of their response times together.
- Avoid claiming that model parameters directly reveal a single brain process; present them as model-based interpretations (Myers et al., 2022; Tran et al., 2021).
- If you use a real-world illustration, consider the multi-attribute dietary-choice example in Sullivan and Huettel (2021).
- For a caution about extending DDM claims in value-based choice, consult Mormann and Russo (2021); distinguish that attentional variant from the basic two-choice model.

### 5. Main limitations (about 65 words)

- Explain that the standard version is designed mainly for two-choice decisions and depends on assumptions about how evidence changes over time.
- Note that different parameter combinations or model assumptions can sometimes explain similar patterns, so conclusions depend on task design and model fit.
- State that parameters are not direct measurements of mental processes; interpretations require care (Tran et al., 2021).

### 6. Conclusion (about 35 words)

- In your own words, recap what the DDM helps researchers infer from choices and response times.
- End with a balanced judgment: what it adds to decision research and why its results still need interpretation in light of its assumptions.

## References

Harris, A., & Hutcherson, C. A. (2022). Temporal dynamics of decision making: A synthesis of computational and neurophysiological approaches. _Wiley Interdisciplinary Reviews: Cognitive Science, 13_(3), e1586. https://doi.org/10.1002/wcs.1586

Mormann, M., & Russo, J. E. (2021). Does attention increase the value of choice alternatives? _Trends in Cognitive Sciences, 25_(4), 305–315. https://doi.org/10.1016/j.tics.2021.01.004

Myers, C. E., Interian, A., & Moustafa, A. A. (2022). A practical introduction to using the drift diffusion model of decision-making in cognitive psychology, neuroscience, and health sciences. _Frontiers in Psychology, 13_, Article 1039172. https://doi.org/10.3389/fpsyg.2022.1039172

Sullivan, N. J., & Huettel, S. A. (2021). Healthful choices depend on the latency and rate of information accumulation. _Nature Human Behaviour, 5_, 1698–1706. https://doi.org/10.1038/s41562-021-01154-0

Tran, N.-H., van Maanen, L., Heathcote, A., & Matzke, D. (2021). Systematic parameter reviews in cognitive modeling: Towards a robust and cumulative characterization of psychological processes in the diffusion decision model. _Frontiers in Psychology, 11_, Article 608287. https://doi.org/10.3389/fpsyg.2020.608287

## DOI check

The DOI and bibliographic details above were cross-checked against Crossref-indexed metadata/search results and publisher, PubMed, or repository records. A direct Crossref REST API request could not be completed in this environment, so the API-specific check remains unverified. Before submission, confirm each DOI resolves and that the reference list matches the sources you actually cite. The list has 5 candidate references; cite only the sources you actually use and keep the final list within the 5–10 reference requirement.
