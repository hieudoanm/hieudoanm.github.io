````markdown id="7k2mqp"
# Gap Identification

## Purpose

This guide describes how to systematically identify candidate research gaps from an existing body of literature.

The central task is not to find a sentence containing the words "research gap."

It is to detect patterns in the evidence that reveal:

- What is established
- What is uncertain
- What is inconsistent
- What is missing
- What existing methods cannot answer
- What important questions remain unresolved

---

## Mental model

Think of the literature as a map.

```text
                    RESEARCH FIELD

       ┌──────────────┬──────────────┐
       ↓              ↓              ↓
   Established     Conflicting    Missing
   findings        findings       evidence
       │              │              │
       └──────────────┼──────────────┘
                      ↓
               Unresolved problem
                      ↓
                Candidate gap
```

A candidate gap emerges where the map contains an important unresolved region.

---

# 1. Define the scope first

Gap identification becomes unreliable when the research topic is too broad.

Define:

- Topic
- Population
- Phenomenon
- Context
- Methods
- Outcomes
- Time period
- Relevant disciplines

For example:

### Too broad

> How does the brain process language?

### More useful

> How do non-invasive neuroimaging methods represent speech meaning during naturalistic language comprehension in healthy adults?

The second question defines a literature that can actually be mapped.

---

# 2. Build an evidence matrix

Before searching explicitly for gaps, organise the literature.

A useful matrix is:

| Study   | Population | Data | Method         | Question                | Finding  | Limitation         | Relevance |
| ------- | ---------- | ---- | -------------- | ----------------------- | -------- | ------------------ | --------- |
| Study A | Adults     | fMRI | MVPA           | Semantic decoding       | Positive | Small sample       | High      |
| Study B | Adults     | MEG  | Encoding       | Semantic representation | Positive | Different paradigm | High      |
| Study C | Adults     | EEG  | Classification | Speech decoding         | Mixed    | Limited validation | Medium    |

The purpose is not administrative bookkeeping.

The matrix makes patterns visible.

---

# 3. Map what has been studied

Ask:

- Which populations dominate?
- Which methods dominate?
- Which datasets are reused?
- Which outcomes are measured?
- Which experimental paradigms are common?
- Which questions receive repeated attention?
- Which questions receive little attention?

Look for concentration.

For example:

```text
Population
Adults ████████████████████
Children ███
Clinical ██

Method
fMRI █████████████████
EEG █████
MEG ███
OPM-MEG █

Design
Cross-sectional ███████████████
Longitudinal ██
```

A concentration is not automatically a gap.

It becomes a candidate gap when the imbalance limits an important scientific conclusion.

---

# 4. Map what has been found

Group findings into:

```text
Consistent
    ↓
Moderately consistent
    ↓
Mixed
    ↓
Contradictory
    ↓
Unknown
```

For each major claim ask:

> How strong is the evidence?

Do not treat a highly cited result as automatically well established.

Consider:

- Number of studies
- Independent samples
- Sample sizes
- Methodological quality
- Replication
- Measurement consistency
- Effect consistency

---

# 5. Look for disagreement

Contradictory findings are often valuable sources of research gaps.

Suppose:

```text
Study A → positive relationship
Study B → positive relationship
Study C → no relationship
Study D → negative relationship
```

Do not immediately conclude:

> "The literature is inconsistent."

Investigate why.

Compare:

- Population
- Sample size
- Task
- Stimuli
- Measurement
- Preprocessing
- Statistical model
- Outcome definition
- Time point
- Experimental context

The disagreement itself may reveal the gap.

---

# 6. Look for methodological bottlenecks

Ask:

> What can current methods not tell us?

Examples:

### Temporal limitation

fMRI may provide useful spatial information but limited temporal resolution.

Potential gap:

> The temporal dynamics underlying the observed neural representation remain insufficiently characterised.

### Spatial limitation

EEG may provide high temporal resolution but weaker spatial localisation.

Potential gap:

> The anatomical organisation of the observed signal remains uncertain.

### Modelling limitation

A model may predict behaviour without explaining the underlying mechanism.

Potential gap:

> Predictive performance has been demonstrated, but the model's mechanistic interpretation remains unclear.

### Validation limitation

A model may perform well on one dataset.

Potential gap:

> Generalisation to independent datasets remains uncertain.

The gap is the **scientific consequence of the limitation**, not the limitation itself.

---

# 7. Look for population gaps

Create a population map.

```text
Population
───────────────
Healthy adults       █████████████████
Children             ████
Older adults         ██
Clinical groups      ███
Multilingual groups  █
```

Then ask:

1. Is the missing population scientifically important?
2. Could the phenomenon plausibly differ in that population?
3. Can findings from the dominant population reasonably generalise?

For example:

> Most language-neuroscience evidence comes from adults, but developmental changes in neural language representations may alter the relationship between speech processing and brain activity.

This is a stronger argument than simply:

> "Children have not been studied enough."

---

# 8. Look for data gaps

Ask:

- Are datasets large enough?
- Are datasets independent?
- Are important measurements missing?
- Are longitudinal data available?
- Are multimodal data available?
- Are clinical outcomes available?
- Are datasets publicly accessible?
- Are validation datasets available?

A data gap becomes important when missing data prevents a meaningful scientific question from being answered.

---

# 9. Look for replication gaps

Ask:

- Has the finding been independently reproduced?
- Is evidence based on one laboratory?
- Is one dataset reused across many publications?
- Does the result depend strongly on one analytical pipeline?
- Has the finding been tested in a new population?

Be careful with terminology.

### Reproduction

Same or original data and analysis.

```text
Original data
     ↓
Original analysis
     ↓
Published result
```

### Replication

New evidence testing the same finding.

```text
New data
     ↓
Comparable study
     ↓
Independent result
```

A lack of replication can itself be a research gap when the finding is scientifically important.

---

# 10. Look for theoretical gaps

Compare competing explanations.

Create a table:

| Theory   | Explains | Fails to explain | Prediction |
| -------- | -------- | ---------------- | ---------- |
| Theory A | X, Y     | Z                | P1         |
| Theory B | X, Z     | Y                | P2         |

Then ask:

> Is there an experiment that could distinguish the explanations?

If yes, the theoretical disagreement may define a strong research gap.

---

# 11. Look for integration gaps

Sometimes individual literatures are mature but poorly connected.

For example:

```text
Language psychology
        │
        │
        X   ← weak integration
        │
        │
Neuroimaging
```

Potential integration:

```text
Language psychology
        ↓
Computational model
        ↓
Neural measurement
        ↓
Behavioural prediction
```

An integration gap should provide a scientific reason why connecting the fields matters.

---

# 12. Look for longitudinal gaps

Ask whether the literature is predominantly:

- Cross-sectional
- Short-term
- Single-session
- Developmental snapshots

A longitudinal gap may be important when the research question concerns:

- Development
- Learning
- Recovery
- Disease progression
- Treatment response
- Adaptation

For example:

> Cross-sectional studies show differences between age groups, but they cannot determine whether those differences reflect developmental change within individuals.

This is a meaningful methodological distinction.

---

# 13. Look for causal gaps

Association does not establish causation.

If the literature primarily shows:

```text
X ↔ Y
```

ask whether it can establish:

```text
X → Y
```

Potential causal evidence includes:

- Randomised interventions
- Experimental manipulation
- Longitudinal designs
- Natural experiments
- Instrumental-variable approaches
- Causal modelling, where appropriate

Do not automatically claim a causal gap. The causal question must be scientifically meaningful and feasible.

---

# 14. Look for measurement gaps

Different studies may appear to investigate the same construct while measuring different things.

For example:

```text
"Language ability"
       ↓
Vocabulary test
Grammar test
Narrative production
Comprehension
Self-report
Neural decoding
```

These are not interchangeable.

Ask:

- What exactly is being measured?
- Are outcome measures comparable?
- Are constructs operationalised consistently?
- Could measurement differences explain disagreement?

A measurement gap may be more fundamental than an apparent theoretical disagreement.

---

# 15. Look for analysis gaps

Modern research often contains multiple reasonable analytical choices.

Check whether findings depend on:

- Preprocessing choices
- Feature selection
- Statistical thresholds
- Model architecture
- Hyperparameters
- Cross-validation strategy
- Multiple-comparison correction
- ROI definition
- Time-window selection

An analysis gap may exist when:

> An important conclusion has not been tested for robustness to reasonable analytical alternatives.

This can be particularly important in neuroimaging and machine learning.

---

# 16. Look for generalisation gaps

Ask:

> Where does the finding work?

Then ask:

> Where has it not been tested?

Possible dimensions:

- Participants
- Laboratories
- Datasets
- Tasks
- Stimuli
- Languages
- Environments
- Time points
- Measurement devices

For machine learning:

```text
Training dataset
       ↓
Internal validation
       ↓
External validation
       ↓
Real-world deployment
```

A result that succeeds at one level may fail at another.

---

# 17. Compare claims with evidence

For important papers, separate:

```text
AUTHOR CLAIM
     ↓
ACTUAL DATA
     ↓
ANALYSIS
     ↓
SUPPORTED CONCLUSION
```

Sometimes a paper's conclusion is broader than its evidence.

This can reveal a gap.

For example:

> A classifier performs well on one dataset.

The paper may discuss broad applicability.

But the evidence may only support:

> Performance on this dataset under this validation procedure.

The generalisation question may therefore remain unresolved.

---

# 18. Search the literature strategically

Do not use only one query.

For a candidate gap, search multiple formulations.

For example, if the candidate gap is:

> Limited independent validation of semantic decoding.

Search combinations such as:

```text
"semantic decoding" replication
"semantic decoding" independent dataset
"semantic decoding" generalization
"semantic decoding" cross-subject
"semantic decoding" external validation
"semantic decoding" robustness
```

Also search the opposite hypothesis:

```text
"semantic decoding" validation
"semantic decoding" generalization
```

The goal is to **try to disprove your own gap**.

If recent research has already addressed it, revise the candidate.

---

# 19. Use reviews as maps, not final evidence

Systematic reviews and meta-analyses are excellent for:

- Finding major studies
- Learning terminology
- Identifying disagreements
- Understanding historical development
- Finding methodological trends
- Locating known limitations

But verify important claims against primary research.

Use:

```text
Review
   ↓
Identify relevant studies
   ↓
Read primary studies
   ↓
Check recent studies
   ↓
Validate gap
```

---

# 20. Track temporal change

Research gaps can disappear.

For every important candidate, ask:

```text
Gap identified in older review
             ↓
Search papers published since review
             ↓
Has the gap been addressed?
       ┌─────┴─────┐
      Yes          No
       ↓            ↓
 Revise/reject    Continue
```

A gap should be described relative to a date when the literature is rapidly changing.

---

# 21. Compare candidate gaps

After generating several candidates, create a comparison table.

| Candidate | Evidence | Importance | Novelty | Persistence | Feasibility |
| --------- | -------- | ---------- | ------- | ----------- | ----------- |
| Gap A     | High     | High       | Medium  | High        | High        |
| Gap B     | Medium   | High       | High    | Medium      | Medium      |
| Gap C     | Low      | Medium     | High    | Low         | High        |

Do not automatically choose the most novel candidate.

Prefer the candidate with the strongest overall scientific justification.

---

# 22. Formulate the gap

A useful template is:

> **Existing evidence shows [what is known]. However, [specific uncertainty or limitation] remains unresolved. This matters because [scientific/practical consequence]. Therefore, [specific missing evidence or investigation] is needed.**

Example:

> Existing studies show that semantic information can be decoded from distributed neural activity during naturalistic language processing. However, it remains unclear whether these representations generalise across independently sampled participants and narrative contexts. This matters because poor generalisation would limit claims that the decoded representations reflect stable semantic structure rather than context-specific patterns. Independent cross-participant validation is therefore needed.

---

# 23. Convert the gap into a question

The research question should directly target the unresolved problem.

Weak:

> Can we use deep learning for language neuroscience?

Better:

> How accurately can neural representations of speech meaning be decoded from MEG data?

Stronger:

> To what extent do neural representations of speech meaning identified during naturalistic MEG recording generalise across independently sampled participants and narrative contexts?

The stronger question follows directly from a specific gap.

---

# 24. Common mistakes

## Mistake 1: Starting with a favourite method

> "I want to use an LLM, so I need to find a gap involving LLMs."

Instead:

```text
Scientific problem
      ↓
Current limitation
      ↓
Required capability
      ↓
Potential method
```

---

## Mistake 2: Treating novelty as importance

A completely new experiment may contribute little.

Ask:

> What would this study teach us that we currently cannot determine?

---

## Mistake 3: Treating a small sample as automatically a gap

A small sample can be appropriate for some studies.

Ask:

> Does sample size materially limit the conclusion?

---

## Mistake 4: Treating disagreement as a gap without investigation

Different findings may result from:

- Different populations
- Different tasks
- Different measurements
- Different preprocessing
- Different statistical models

The real gap may be understanding **why** the results differ.

---

## Mistake 5: Ignoring null findings

Null results can be informative.

They may indicate:

- Boundary conditions
- Measurement problems
- Weak effects
- Moderators
- Theoretical limitations

Do not treat positive results as inherently more informative.

---

## Mistake 6: Ignoring negative evidence

A gap analysis should actively search for evidence against the proposed gap.

The goal is not to prove that the gap exists.

The goal is to determine whether it actually exists.

---

# 25. Final checklist

Before moving a candidate gap into the validation stage:

- [ ] Scope is defined.
- [ ] Relevant studies are mapped.
- [ ] Major findings are identified.
- [ ] Evidence strength is considered.
- [ ] Contradictions have been investigated.
- [ ] Methodological limitations have been examined.
- [ ] Population coverage has been examined.
- [ ] Data availability has been examined.
- [ ] Replication status has been examined.
- [ ] Generalisation has been examined.
- [ ] Recent literature has been searched.
- [ ] The opposite hypothesis has been searched.
- [ ] The gap is more than a missing paper.
- [ ] The gap is more than a future-work suggestion.
- [ ] The gap has scientific importance.
- [ ] The gap can potentially be investigated.
- [ ] The gap can be expressed as a research question.

---

## Final principle

The strongest gap-identification process is adversarial.

Do not ask only:

> "Can I find evidence supporting my proposed gap?"

Also ask:

> "What evidence would show that my proposed gap is wrong?"

A gap that survives this process is much more defensible.
````
