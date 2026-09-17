# Implementation notes

Focused reference for **clion-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Sanitisers & Profiling

- **AddressSanitizer and UndefinedBehaviorSanitizer are the first tool, not the last.** Add them to a debug preset: `-fsanitize=address,undefined -fno-omit-frame-pointer -g`.
- **Keep sanitised and profiling builds separate** — a sanitised binary is 2–20x slower and its timings are meaningless.
- **CLion's bundled profiler covers CPU, allocations, and memory.** A flame chart is the fastest way to find a hot path, and the call tree under it is more useful than `perf` output because it links straight to the source.
- **`-O2 -g` for profiling work.** Optimising away the code you are measuring produces a profile of a program you do not ship.
- **Sanitiser reports are not approximate.** An ASan finding is a real memory error, often one that would corrupt state far from the reported site.
- **`Debug` vs `Release` confusion is the most common false bug report.** Check the active profile in the build output before investigating the code.

---

## 6. Version Control & Team Work

- **Commit `.run/`, `inspectionProfiles/`, and `.editorconfig`; ignore the rest of `.idea/`.** A shared-code-style file settles a class of diff noise permanently.
- **Use a `.gitignore` that excludes `.idea/` wholesale, then re-include the three shared paths** — the ordering matters, since git does not re-include files under an ignored directory without it.
- **JetBrains client-side code review (`Code → Code Review`) gives a shared comment vocabulary** and threads resolved inline, which plain PR comments do not.
- **Commit the `CMakePresets.json` before the IDE run configurations** when the two disagree; the presets are the portable part.

```gitignore
.idea/
!.idea/run/
!.idea/codeStyles/
!.idea/inspectionProfiles/
cmake-build-*/
compile_commands.json
```

---

## 7. Performance & Refactoring

- **CLion's refactorings are reliable for semantic changes** — extract function, introduce parameter, change signature — because they are backed by the real index. Use them rather than hand-editing signatures across a codebase.
- **The ReSharper C++ engine does most of the work,** so keeping the project fully indexed matters more than in other JetBrains IDEs. Excluding a generated directory with a full-project search will slow it noticeably; exclude narrow paths only.
- **Run inspections as a batch (Inspect Code → Whole solution) before large refactors,** not after, so the baseline is known.
- **Memory: check the size of what you assume is small.** `sizeof` in a watch, or a static assert, replaces a guess.
- **For large codebases, build only the target you are changing.** Building everything because there is one run configuration defeats the incremental build the IDE was designed around.
