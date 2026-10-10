# PHP Best Practices: Workflow Checklist

A practical run sheet for applying [PHP Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Strict Types & Type Safety: **declare(strict_types=1); at the top of every functional file** — scalar coercion is opt-in, not silent:
- [ ] 1. Strict Types & Type Safety: **Types on everything a boundary touches** — typed properties, params, returns:
- [ ] 2. Null Safety & Defaults: **?-> null-safe operator chains** and ??/??= for defaults over verbose null checks:
- [ ] 2. Null Safety & Defaults: **match over switch for value dispatch** — strict comparison and expression value:
- [ ] 3. Error Handling: **Exceptions for failures; typed exceptions per domain** (NotFoundException, ValidationException):
- [ ] 3. Error Handling: **throw specific types; catch narrowly** — a broad catch (\Exception $e) in the business layer is a code smell; catch (\Throwable) only at the true boundary
- [ ] 4. Classes, Inheritance & Design: **final classes by default; interfaces for polymorphism** — a class not meant to be extended says so with final:
- [ ] 4. Classes, Inheritance & Design: **Program to interfaces at seams** — constructor injection, no static service locators:
- [ ] 5. PSR Conventions: **PSR-12 coding style enforced by tooling** (php-cs-fixer/phpcs), not by memory:
- [ ] 5. PSR Conventions: **Autoloading via PSR-4** — namespace ⇔ directory layout exact (e.g., App\Domain\... → src/Domain/...)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
