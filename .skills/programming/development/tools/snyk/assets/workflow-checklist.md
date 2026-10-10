# Snyk: Workflow Checklist

A practical run sheet for applying [Snyk](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. What Each Scanner Actually Sees: **Four distinct products, one workflow.** snyk code (your source), snyk dep audit (the dependency tree), snyk iac (Terraform/K8s/etc.), snyk container (an image). They overlap and disagree; understanding which one produced a finding explains most of the inconsistency
- [ ] 1. What Each Scanner Actually Sees: **Snyk Code analyses your source for vulnerable patterns** — SQL injection, path traversal, insecure deserialisation. It reasons about dataflow within a function and is weakest where data crosses a boundary it cannot see (serialised payloads, reflection through a queue, native calls)
- [ ] 2. Triage: Reachability First: **A finding is a lead, not a defect.** Triage questions, in order: is this code reachable from untrusted input? is it in production? is the vulnerable path actually exercised? Then, and only then, how bad is it?
- [ ] 2. Triage: Reachability First: **snyk test and the IDE plugin are for the developer loop** — fast, noisy, and not authoritative. snyk monitor on the default branch is the record of what is actually deployed
- [ ] 3. Fixing: **Prefer the upgrade; the workaround is the exception.** A dependency bump resolves the finding and the class. A code workaround leaves the vulnerable code in the tree for the next person to use
- [ ] 3. Fixing: **Bump the version Renovate would have chosen, in the same PR.** A Snyk alert and a Renovate PR for the same package are the same fix arriving twice; suppress one
- [ ] 4. Infrastructure as Code: **snyk iac on Terraform/Kubernetes/CloudFormation is high-yield and low-noise,** because a misconfiguration is a fact about the file, not a judgement call. Fix it in the template, not in the console
- [ ] 4. Infrastructure as Code: **State files drift from templates** — a manual console change is invisible to IaC scanning and survives until the next apply. Treat a finding in IaC as possibly "the template says one thing and reality says another."
- [ ] 5. CI Integration: **Fail the build on new high/critical findings; report everything else.** The gate should stop a regression, not enumerate the backlog
- [ ] 5. CI Integration: **Scan the default branch in monitor mode continuously** — that is the record of production state. A per-PR test scan is a different and much smaller question

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
