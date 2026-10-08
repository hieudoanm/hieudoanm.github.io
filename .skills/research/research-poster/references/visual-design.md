# Research Poster Visual Design

## Purpose

A research poster should use visual design to make scientific information easier to understand.

The purpose of visual design is not decoration.

It should help the viewer answer:

- What is this research about?
- What is the main question?
- What was done?
- What was found?
- What should I remember?

---

## 1. Visual Hierarchy

Visual hierarchy determines what the viewer notices first, second, and third.

A useful hierarchy is:

```text id="q8m1pk"
TITLE
  ↓
MAIN FINDING
  ↓
RESEARCH QUESTION
  ↓
PRIMARY FIGURE
  ↓
METHODS / INTERPRETATION
  ↓
SUPPORTING DETAILS
```

The most scientifically important information should generally receive the strongest visual emphasis.

Visual hierarchy can be created using:

- Size
- Position
- Weight
- Spacing
- Contrast
- Colour
- Borders
- Whitespace

Do not make every element equally prominent.

---

## 2. Design for Distance

A conference poster may initially be viewed from several metres away.

The title and main message therefore need to remain recognisable at a distance.

As the viewer moves closer, more detailed information can become available.

This creates a natural information hierarchy:

```text id="4v5w3e"
Far away
    ↓
Title / topic / main finding

Medium distance
    ↓
Research question / figures / methods

Close
    ↓
Statistics / captions / references
```

Do not make the viewer stand directly in front of the poster before they can identify its topic.

---

## 3. The Poster Grid

Use a consistent layout grid.

CSS Grid is usually well suited to HTML research posters.

A grid provides:

- Alignment
- Predictability
- Consistent spacing
- Visual rhythm
- Easier modification

For example:

```text id="t3v4bh"
┌────────────┬────────────┬────────────┐
│            │            │            │
│ Column 1   │ Column 2   │ Column 3   │
│            │            │            │
├────────────┼────────────┼────────────┤
│            │            │            │
│ Section    │ Figure     │ Finding    │
│            │            │            │
└────────────┴────────────┴────────────┘
```

The grid should support the scientific story rather than constrain it.

---

## 4. Alignment

Alignment creates visual relationships.

Align:

- Section headings
- Cards
- Figures
- Text blocks
- Tables
- Captions
- Footer elements

Avoid arbitrary placement.

For example, if three cards represent three methodological stages, their left edges and internal spacing should normally align.

---

## 5. Whitespace

Whitespace is not wasted space.

It helps separate concepts and prevents cognitive overload.

Use whitespace:

- Between sections
- Around figures
- Around headings
- Around important findings
- Between unrelated groups of information

A crowded poster is difficult to scan even when all individual components are well designed.

---

## 6. Section Cards

Cards can help group related content.

For example:

```text id="7d9g0p"
┌─────────────────────────────┐
│ METHODS                     │
│                             │
│ Participants: N = 120       │
│ Task: lexical decision      │
│ Analysis: mixed-effects     │
│                             │
└─────────────────────────────┘
```

Cards should support grouping, not turn every sentence into a separate visual box.

Too many cards can make the poster visually fragmented.

---

## 7. Typography

Use a small and consistent typography system.

A typical hierarchy might be:

```text id="9i6h0d"
Title        64–96 px
Section      32–48 px
Subheading   24–32 px
Body         18–24 px
Caption      14–18 px
```

These are starting points.

The actual size depends on:

- Poster dimensions
- Viewing distance
- Typeface
- Content density
- Display method

Never reduce body text to an unreadable size simply to fit more information.

---

## 8. Typeface Selection

Prefer simple, highly legible typefaces.

Suitable categories include:

- Sans-serif
- Humanist sans-serif
- Modern grotesk
- System fonts

For example:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Avoid using many different typefaces.

A simple system might use:

```text id="bqj3cw"
One typeface
    +
Bold weight
    +
Size hierarchy
    +
Spacing
```

This is usually sufficient.

---

## 9. Font Weight

Use weight strategically.

For example:

- Regular → body text
- Medium → labels
- Semibold → headings
- Bold → major findings

Avoid making entire paragraphs bold.

Too much emphasis removes the meaning of emphasis.

---

## 10. Line Length

Long lines reduce readability.

Poster text should generally be broken into reasonably narrow blocks.

Avoid a full-width paragraph spanning the entire poster.

Use columns, cards, or narrower text blocks to create manageable reading lengths.

---

## 11. Paragraph Length

Poster paragraphs should be shorter than paper paragraphs.

Prefer:

> Speech complexity increased with age. This pattern was consistent across the primary analysis and permutation test.

over a long paragraph explaining every detail.

Use:

- Short paragraphs
- Bullets
- Labels
- Callouts
- Figures

when they improve comprehension.

---

## 12. Colour System

Use a limited palette.

A typical system can contain:

```text id="1d8h6j"
Background
Surface
Text
Muted text
Primary
Secondary
Accent
```

Colour should communicate structure or meaning.

For example:

- Primary colour → main headings
- Accent → key finding
- Muted colour → supporting information

Avoid using many unrelated colours.

---

## 13. Contrast

Text must have sufficient contrast with its background.

Avoid:

- Light grey text on white
- Bright text on saturated backgrounds
- Low-contrast captions
- Thin fonts on textured backgrounds

The viewer should not need to strain to read scientific information.

---

## 14. Colour as Meaning

Do not rely solely on colour to communicate important information.

For example, instead of:

```text id="6m0d0r"
Group A = blue
Group B = red
```

also provide:

- Labels
- Symbols
- Direct annotations
- Patterns where appropriate

This improves accessibility and makes figures easier to interpret when printed.

---

## 15. Main Finding Callouts

A key finding can be visually highlighted.

For example:

```text id="w4n3qk"
┌────────────────────────────────┐
│ KEY FINDING                    │
│                                │
│ Speech complexity increased    │
│ with age.                      │
│                                │
│ β = 0.42, 95% CI [0.31, 0.53] │
└────────────────────────────────┘
```

The callout should contain the actual finding rather than marketing language.

Avoid:

> AMAZING DISCOVERY!

Scientific communication should remain precise.

---

## 16. Figures as Visual Anchors

Figures often become the primary visual anchors of a poster.

A good figure should be:

- Large enough to inspect
- Scientifically accurate
- Clearly labelled
- Directly relevant
- Easy to interpret

A figure that contains tiny text is not useful merely because it occupies a large area.

---

## 17. Figure Captions

Captions should explain what the viewer needs to know.

A useful caption can answer:

1. What does the figure show?
2. What are the variables?
3. What is the important pattern?

Example:

> **Figure 1.** Speech-complexity scores increased with participant age. Each point represents one participant; the line represents the fitted regression model.

Avoid writing a complete interpretation that belongs in the Discussion.

---

## 18. Direct Annotation

Directly labelling important elements can reduce the need for legends.

Instead of:

```text id="0k5j8m"
Legend:
Blue = Condition A
Orange = Condition B
```

consider directly labelling the relevant curves or groups.

This reduces visual search.

However, direct labels should not overcrowd the figure.

---

## 19. Data-Ink Principle

Remove visual elements that do not communicate useful information.

Question every element:

> Does this help the viewer understand the research?

Consider removing:

- Decorative borders
- Excessive gridlines
- Unnecessary icons
- 3D effects
- Decorative gradients
- Redundant legends
- Heavy shadows

Scientific figures should prioritise the data.

---

## 20. Tables

Tables should be compact and readable.

Use:

- Clear headers
- Consistent alignment
- Minimal borders
- Appropriate decimal precision
- Units

Avoid reproducing raw statistical software output.

The viewer should immediately understand what each column represents.

---

## 21. Diagrams

Diagrams are particularly useful for:

- Experimental procedures
- Data pipelines
- Neural models
- Computational architectures
- Study timelines
- Conceptual frameworks

A good diagram should have a clear directional structure.

For example:

```text id="p1y0km"
Stimulus
   ↓
Neural response
   ↓
Preprocessing
   ↓
Feature extraction
   ↓
Decoder
   ↓
Prediction
```

Avoid diagrams containing excessive explanatory text.

---

## 22. Icons

Icons can help communicate concepts quickly.

Use them sparingly.

Good uses include:

- Participant
- Dataset
- Brain
- Computer
- Experiment
- Clock
- Location

Avoid replacing scientifically meaningful information with decorative icons.

---

## 23. Images

Use images when they contribute to scientific understanding.

Examples:

- Experimental setup
- Brain anatomy
- Recording hardware
- Participant task
- Study environment

Avoid generic stock photography that does not contribute to the research story.

---

## 24. Visual Flow

The viewer's eye should move through the poster naturally.

A common flow is:

```text id="j7j0gq"
TOP
 ↓
Question
 ↓
Methods
 ↓
Main figure
 ↓
Interpretation
 ↓
Conclusion
BOTTOM
```

Use:

- Alignment
- Arrows
- Section ordering
- Consistent spacing
- Figure placement

to reinforce this flow.

Do not add arrows everywhere.

---

## 25. Content-to-Visual Ratio

Not every section needs the same ratio of text to visuals.

For example:

### Background

Mostly concise text.

### Methods

Text + diagrams.

### Results

Mostly figures + short explanations.

### Discussion

Short text + key implications.

### Conclusion

Very short text + prominent takeaway.

This creates visual variation while maintaining consistency.

---

## 26. Avoid the "Wall of Text"

A wall of text occurs when:

- Paragraphs are long
- Headings are weak
- Figures are small
- Whitespace is limited
- Everything has similar visual weight

Fix it by:

```text id="2xv9j4"
Long paragraph
      ↓
Short explanation
      +
Bullet points
      +
Figure
      +
Key finding
```

Do not simply shrink the font.

---

## 27. Avoid the "Dashboard" Problem

The opposite problem is excessive visual fragmentation.

A poster can become a collection of:

- Cards
- Badges
- Numbers
- Icons
- Charts
- Labels

without a coherent story.

The viewer should understand how the components relate to each other.

Scientific narrative should remain the organising principle.

---

## 28. Visual Consistency

Repeat design decisions.

For example:

```text id="n4x9rc"
Section heading
→ same size

Card
→ same radius

Spacing
→ same scale

Figure caption
→ same typography

Accent
→ same colour
```

Consistency reduces cognitive load.

---

## 29. Spacing System

Use a small spacing scale.

For example:

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
}
```

Avoid arbitrary spacing values throughout the stylesheet.

A consistent spacing system makes the poster easier to refine.

---

## 30. Borders and Shadows

Use borders and shadows to establish grouping.

Do not use them everywhere.

A subtle border can distinguish:

- A methods card
- A key finding
- A figure
- A supplementary result

Heavy shadows and thick borders can make a scientific poster look like a commercial dashboard.

---

## 31. Backgrounds

A simple background usually works best.

Prefer:

- White
- Very light neutral
- Subtle solid colour

A slightly darker surface can distinguish cards from the main background.

Avoid complex backgrounds that compete with figures and text.

---

## 32. Print Considerations

A poster may look different on a screen and when printed.

Check:

- Contrast
- Font size
- Figure resolution
- Colour reproduction
- Border visibility
- Background colours
- White space

Do not depend on extremely subtle colours that may disappear during printing.

---

## 33. Screenshot Considerations

For screenshot-based output:

- Use a fixed poster size.
- Avoid browser-dependent layout changes.
- Avoid animations.
- Avoid dynamic content.
- Ensure all content is visible.
- Keep the poster background separate from the browser background.
- Ensure the complete poster fits inside the capture region.

The screenshot should look like a finished poster rather than a webpage.

---

## 34. Final Visual Checklist

### Hierarchy

- [ ] Is the title immediately visible?
- [ ] Is the research question easy to find?
- [ ] Is the main finding visually dominant?
- [ ] Are secondary details subordinate?

### Layout

- [ ] Are sections aligned?
- [ ] Is spacing consistent?
- [ ] Is the reading flow obvious?
- [ ] Is there enough whitespace?

### Typography

- [ ] Is the body text readable?
- [ ] Are headings clearly differentiated?
- [ ] Are captions readable?
- [ ] Is typography consistent?

### Figures

- [ ] Are figures large enough?
- [ ] Are labels readable?
- [ ] Are captions concise?
- [ ] Are visual encodings accessible?

### Colour

- [ ] Is the palette limited?
- [ ] Is contrast sufficient?
- [ ] Is colour used purposefully?
- [ ] Does the poster remain understandable without colour alone?

### Scientific communication

- [ ] Does visual emphasis match scientific importance?
- [ ] Are claims accurately represented?
- [ ] Are figures free from unnecessary decoration?
- [ ] Does the design support rather than distract from the research?

---

## Core Principle

**Good poster design reduces the amount of visual effort required to understand the science.**

Every visual decision should make the research easier to see, understand, or remember.
