# Workflow notes

Focused reference for **atlassian-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

| Segment    | Values                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `property` | `background`, `text`, `border`, `icon`                                                                       |
| `role`     | `neutral`, `brand`, `information`, `success`, `warning`, `danger`, `discovery`, `accent`, `inverse`, `input` |
| `emphasis` | `subtlest`, `subtle`, (default), `bold`                                                                      |
| `state`    | `hovered`, `pressed`, `focused`, `selected`, `disabled`                                                      |

Real examples from the documented examples:

- `color.background.brand.bold` — the primary button fill
- `color.background.danger.bold.hovered` — a destructive button on hover
- `color.background.neutral.subtle.hovered` — an icon's hover treatment
- `color.text.inverse` — text on a bold background

**Read the token name out loud.** `color.background.danger.bold.hovered` tells you
more about correct usage than any value it holds, because the name is the decision.

- Choosing the right role is the whole job. The emphasis and state segments then
  follow from it.
- Do not use an `accent` color where color carries meaning. Accents are for
  expression, not signal.

---

## 4. Emphasis Levels

Emphasis is how much contrast a value has against the default surface. It is the
main lever for hierarchy inside a dense screen:

| Level      | Use                                                    |
| ---------- | ------------------------------------------------------ |
| `subtlest` | Least contrast — metadata, timestamps                  |
| `subtle`   | Supporting copy, secondary labels                      |
| default    | Body text and primary UI                               |
| `bold`     | Section headings, primary actions, high-attention rows |

- Emphasis replaces most of what layout hacks usually reach for. Before adding a
  border or a background to separate things, change the emphasis level.
- Bold text is not a heading style; it is a hierarchy step, used consistently.

---

## 5. Inverse Tokens on Bold Backgrounds

Bold backgrounds need their own ink, and one special case matters:

- Text, borders, and icons on bold backgrounds use `inverse` tokens.
- `warning.inverse` tokens exist specifically so **warning text passes WCAG AA on
  yellow**. Yellow is the one bold background where the default ink does not work.
- Do not put dark ink on a bold warning background "because it looks better" —
  it fails contrast, and it is precisely what those tokens exist to prevent.

---

## 6. Accent Colors Are Interchangeable
