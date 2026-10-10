# Workflow notes

Focused reference for **nothing-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

**Do not mix font sizes within a single use of NType82 Mono, NDot 55, or Lettera
Mono LL.** They behave like mechanical output, not flexible body copy.

| Face                 | Job                                 | Size     | Leading     | Tracking |
| -------------------- | ----------------------------------- | -------- | ----------- | -------- |
| **NType82 Headline** | Headlines, 1–2 words                | 40pt+    | 80%         | −20      |
| **NType82 Regular**  | Body, preamble, quotes              | 7.5pt+   | by size     | by size  |
| **NType82 Mono**     | Mechanical body passages            | 7.5–15pt | 145% / 140% | 0        |
| **NDot 55**          | Logotype and product names **only** | 10pt+    | 90%         | 0        |
| **Lettera Mono LL**  | Spec sheets, fine print             | 5–10pt   | 110%        | 0        |

NType82 Regular steps down with size: 7.5–15pt `+1%`/125% · 15–30pt `+1%`/115% ·
30–60pt `−1%`/115% · 60–120pt `−1%`/100% · 120pt+ `−1%`/85%.

- **Case is specified per face.** NType82 is **sentence case** — never all-caps,
  never all-lowercase, never hand-tuned letter-spacing. NDot 55 is mostly
  uppercase, but product names set in it are lowercase (`phone (2a)`).
- **NDot 55 never combines with another font in the same layout.**
- **NDot 57 is deprecated** — body text on nothing.tech in 2021–22, gone by Phone
  (1). Don't reach for it as "the authentic" pick.
- **Lettera Mono LL is 90% width, 5–10pt only** — spec-sheet texture, not UI.

### The three-layer hierarchy rule

Every screen has exactly **three** layers of importance. Not two, not five.

| Layer         | What                     | Treatment                                       |
| ------------- | ------------------------ | ----------------------------------------------- |
| **Primary**   | The ONE thing seen first | Display face at 48–96px, huge surrounding space |
| **Secondary** | Supporting context       | Body/subheading, grouped 8–16px from primary    |
| **Tertiary**  | Metadata, nav, system    | 11–12px mono, ALL CAPS, pushed to edges         |

**The test:** squint. If two things compete, one shrinks, fades, or moves. The
common failure is making _everything_ secondary — evenly sized elements with
even spacing read as flat. Be brave: the primary absurdly large, the tertiary
absurdly small. The contrast _is_ the hierarchy.

### The budget

Per screen: **max 2 font families**, **3 sizes**, **2 weights**.

```css
--display-xl: 72px/1/-0.03em; /* hero numbers, time */
--display-lg: 48px/1.05/-0.02em; /* section heroes, percentages */
--display-md: 36px/1.1/-0.02em; /* page titles */
--heading: 24px/1.2/-0.01em; /* section headings */
--subheading: 18px/1.3/0;
--body: 16px/1.5/0;
--body-sm: 14px/1.5/0.01em;
--caption: 12px/1.4/0.04em; /* timestamps, footnotes */
--label: 11px/1.2/0.08em; /* ALL CAPS mono, "instrument panel" */
```

**Rule of thumb: if you reach for a new font-size, it's probably a spacing
problem.** Add distance instead. Differentiate a label from its value with
colour, not size; a heading from body with size, not weight.

### Open substitutes — the real faces are licensed

Never commit them to a repo or ship them unlicensed (Colophon Foundry, Lineto).

| Official job                  | Open stack **[ADAPT]** | Note                                        |
| ----------------------------- | ---------------------- | ------------------------------------------- |
| NDot 55 / 57                  | **Doto**               | Variable round-dot; display use only, 36px+ |
| NType82 Headline / Regular    | **Space Grotesk**      | Colophon Foundry — same foundry, shared DNA |
| NType82 Mono, Lettera Mono LL | **Space Mono**         | Colophon Foundry; 11px ALL CAPS labels      |

Nothing OS 5.0 itself moved its functional UI to **Geist / Geist Mono**, so
`Geist` + `Geist Mono` + `Doto` is an equally defensible stack. Label every
substitution in the token layer — a dot-matrix imitation is a homage, not the asset.

---

## 4. Spacing Is Meaning

Spacing is the primary tool for communicating relationships. **[ADAPT]**

| Gap     | Meaning                                                 |
| ------- | ------------------------------------------------------- |
| 4–8px   | "These belong together" (icon + label, number + unit)   |
| 16px    | "Same group, different items" (list items, form fields) |
| 32–48px | "New group starts here" (section breaks)                |
| 64–96px | "This is a new context" (hero → content)                |

**If you need a divider line, the spacing is wrong.** Dividers are a symptom of
insufficient spacing contrast — use them only in data-dense lists whose rows are
structurally identical.
