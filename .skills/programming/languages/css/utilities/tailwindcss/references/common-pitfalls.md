# 6. Common Pitfalls

Focused reference for **tailwindcss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Missing `content` globs → classes silently dropped in production.
- Dynamic/concatenated class names break extraction.
- Overriding with CSS specificity fights instead of using config/theme.
- Forgetting dark-mode variant toggling setup (`class` vs `media`).
