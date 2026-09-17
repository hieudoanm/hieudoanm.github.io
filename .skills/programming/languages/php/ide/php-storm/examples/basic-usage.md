# PhpStorm: Basic Usage

Best practices for working in PhpStorm — Composer as the dependency source, the Laravel and Symfony plugins, Xdebug/PhpStorm profiler, code style, and JetBrains shared conventions. Use when setting up, debugging, or profiling a PHP project in PhpStorm.

## Scenario

Use this example as a starting point when applying **phpstorm-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Editions & Project Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```json
{
  "require": {
    "php": "^8.3",
    "laravel/framework": "^12.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^11.0",
    "larastan/larastan": "^3.0"
  },
  "config": { "sort-packages": true }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
