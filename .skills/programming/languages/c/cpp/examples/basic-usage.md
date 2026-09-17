# C++ Best Practices: Basic Usage

Best practices for writing C++ — the language conventions for modern C++ (C++20/23) code. Use when writing, structuring, or reviewing C++ — covers RAII, ownership, move semantics, const correctness, error handling, templates, STL, concurrency, and tooling.

## Scenario

Use this example as a starting point when applying **cpp-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. RAII & Resource Ownership** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```cpp
void process(const fs::path& p) {
    std::ifstream in(p);              // RAII: closes on scope exit
    // cannot leak: no manual close, no naked new
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
