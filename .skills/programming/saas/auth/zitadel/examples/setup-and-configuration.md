# ZITADEL Best Practices: 2. Isolation & Project Model

## Scenario

A project is working on **2. isolation & project model** for ZITADEL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **One project per logical service scope**; align `aud` with the project/application
- Use **grants** to delegate org membership to projects — don't flatten every org into one role bag
- **Instances separate prod/stage/dev** and even different customers/clusters
- Configure **project roles** and have clients assert them via OIDC claims (userinfo/access token)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Isolation & Project Model** section of [SKILL.md](../SKILL.md).
