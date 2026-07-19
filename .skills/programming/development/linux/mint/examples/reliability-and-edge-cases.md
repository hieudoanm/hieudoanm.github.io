# Linux Mint Best Practices: 9. Common Pitfalls

## Scenario

A project is working on **9. common pitfalls** for Linux Mint Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`sudo apt upgrade`,** which bypasses certification and is the most common way to break a Mint machine.
- **Treating timeshift as a backup**, and discovering that during a disk failure.
- **Running `mintupgrade` without snapshots,** or with held/third-party packages still installed.
- **DKMS modules failing silently under secure boot** because the key is not enrolled.
- **Mixing LMDE and Ubuntu-based advice,** which produces lockfile and repository confusion.
- **Expecting kernel `linux-headers` to follow a kernel update** automatically; they do not.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **9. Common Pitfalls** section of [SKILL.md](../SKILL.md).
