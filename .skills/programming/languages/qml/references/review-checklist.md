# Review checklist

Focused reference for **qml-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Quick-Start Checklist

- [ ] `import QtQuick 2.15` (or appropriate version) at top
- [ ] One component per file
- [ ] `Item { }` as root when no specific visual type needed
- [ ] `Repeater` or `ListView` for lists — not JavaScript `for` loops
- [ ] Signals used for component communication
- [ ] `Loader` for on-demand component loading
