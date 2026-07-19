# Implementation notes

Focused reference for **phpstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Debugging & Profiling

- **Xdebug 3 is the debugger, and it is slow — a 2–10x slowdown is normal.** Never run it in a production-like local environment you are timing; use it for logic, and the profiler or a sampling profiler for speed.
- **Configure Xdebug in `php.ini`/`.env`, not in the IDE alone** — the CLI SAPI, the web SAPI, and the IDE each need a matching mode and port.
- **Use step debugging for control flow and a profiler for hot paths; do not use step debugging to find a slow function.** It is the wrong tool and it is slow in a compounding way.
- **The bundled PhpStorm profiler (Xdebug profiler or a sampling profiler) is genuinely good:** a call tree with inline expansion, plus allocation and timeline views for slow requests and memory growth.
- **Profile with a realistic request,** ideally in a local environment with production-like data volume, or the profile describes your fixture set.
- **Set a breakpoint on throw for fatals**; PHP fatal errors surface at a line that is downstream of the cause.
- **Turn on "stop at first PHP error"** while developing: it stops at the warning that production would only log, and warnings are usually the real defect.

---

## 5. Code Style & Quality

- **Use the same formatter the repo enforces** (PHP-CS-Fixer, PHP_CodeSniffer, or Laravel Pint). PhpStorm's built-in formatter is a good default, but it must not fight the committed tool — a reformat-only commit every few weeks means two formatters are running.
- **Set the "PHP Code Sniffer"/fixer ruleset in the IDE to the committed config** so the inspections match CI.
- **Pre-commit hooks belong in the repo** (via `composer` scripts), not in the IDE's commit dialog; the hook is the shared rule.
- **Run the static analyser (PHPStan/Psalm) in CI as the authority** and treat the IDE's inspections as a fast local approximation. The IDE does not have the full project type inference.
- **`.env` is local and ignored; `.env.example` is committed.** The IDE's environment-file setting should point at `.env` and the diff should never include it.

---

## 6. JetBrains Shared Conventions
