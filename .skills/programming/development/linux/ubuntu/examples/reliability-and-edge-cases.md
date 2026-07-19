# Ubuntu Best Practices: 6. Security & Firewall

## Scenario

A project is working on **6. security & firewall** for Ubuntu Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **UFW is the default front-end firewall and it is disabled on fresh images.** `ufw default deny incoming && ufw allow 22 && ufw allow OpenSSH && ufw enable` is the minimum for any public host.
- **Allow the SSH port before enabling UFW**, or you will lock yourself out. The `ufw allow OpenSSH` form survives a port change; the numeric one does not.
- **UFW only filters host traffic** — it does not protect a container or a load balancer in front of it. Security groups still belong in your cloud provider.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **6. Security & Firewall** section of [SKILL.md](../SKILL.md).
