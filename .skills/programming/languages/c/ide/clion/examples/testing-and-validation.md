# CLion: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for CLion. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `CMake_EXPORT_COMPILE_COMMANDS ON` in the top-level `CMakeLists.txt`
- [ ] `CMAKE_CXX_STANDARD` set explicitly, not left to the compiler default
- [ ] `CMakePresets.json` committed; CI and IDE both consume it
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Toolchain selected explicitly; GDB/LLDB matched to the compiler
- [ ] Warnings-as-errors behind a cache option for CI
- [ ] Sanitiser and profile presets defined separately from the debug build

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
