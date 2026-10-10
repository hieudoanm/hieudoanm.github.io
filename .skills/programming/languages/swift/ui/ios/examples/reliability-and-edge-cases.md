# iOS Development: 8. Performance & Launch

## Source guidance

This example applies the **8. Performance & Launch** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Measure launch with Instruments**; a cold start over ~400ms reads as jank. Defer non-essential initialization past first frame.
- **Downsample images to the display size** — a full-resolution `UIImage` in a thumbnail is the most common iOS memory bug.
- **Keep view bodies pure and cheap.** A body that reads `Date()` or allocates a formatter invalidates on every pass.
- **Offload with actors or a background task**, never with `DispatchQueue.global()` plus a data race on a `@State`.
- **Profile on a real low-end device in Release.** Simulator and Debug builds hide most of what matters.

## Example

A team applying **8. Performance & Launch** to a iOS Development project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Measure launch with Instruments**; a cold start over ~400ms reads as jank. Defer non-essential initialization past first frame.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
