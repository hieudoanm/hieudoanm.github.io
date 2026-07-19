# Overview

Focused reference for **atlassian-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Atlassian Design System (Atlassian)

Atlassian's design system covers productivity and collaboration surfaces: issue
tracking, project management, service management, and the admin tooling around
them. It is the right reference when many users live in the product all day and
learn its status language once.

**You buy:** a color model that scales across a large product surface, an explicit
role vocabulary, first-class light and dark themes, and an accent palette designed
to be swapped without loss of meaning.

**You pay:** the token namespace is verbose, Atlaskit is React-first, and some
foundations — radius in particular — are still beta and should not be leaned on.

---

## 1. Core Principles

- **Tokens encode intent.** A token says what a color _does_ in a situation, never
  what it looks like.
- **Meaning beats decoration.** Color is a signal first. If it is not carrying
  meaning, it should not be saturated.
- **The accent palette is swappable.** Any accent color can replace any other and
  the experience should remain unchanged.
- **Dense is normal.** Power users scan. Layout optimized for a first-time visitor
  wastes their day.
- **Status is a first-class vocabulary.** Shared language across products is a large
  part of the value.
- **Accessibility is a constraint, not a phase.** WCAG AA is where the design
  system meets the legal floor.

---

## 2. Foundations

The system's foundations are documented as: tokens, accessibility, content,
spacing, grid, color, typography, motion, iconography, illustrations, logos,
elevation, border, and radius (**beta**).

Two structural consequences:

- **Radius is beta.** Do not build visual identity on it; it may change.
- **Content and accessibility are foundations, not add-ons.** Content guidelines
  ship with the same weight as color.

---

## 3. The Color Token Anatomy

Atlassian color tokens read as a sentence:

```
color.{property}.{role}.{emphasis}.{state}
```
