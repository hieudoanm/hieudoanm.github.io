# Causal Diagrams

A directed acyclic graph (DAG) represents hypothesized causal relationships. Use it to make assumptions visible and reason about adjustment; it cannot prove the graph is correct or discover causal structure from data alone.

## Build and review

- Define nodes as meaningful variables with time ordering where relevant.
- Draw arrows for plausible causal effects, including selection and measurement processes.
- Distinguish pre-exposure confounders from mediators and colliders.
- Include causes of selection or missingness when they affect the analysis sample.
- Ask domain experts to challenge omitted paths and temporal assumptions.

Adjusting for a mediator can change a total-effect target; conditioning on a collider can open a noncausal path. Instruments and proxies require separate justification. Document alternative plausible DAGs when the structure is uncertain and assess their consequences.
