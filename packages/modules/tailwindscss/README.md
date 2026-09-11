# TailwindSCSS

A static build of the Tailwind CSS default utility scale in plain Dart Sass partials. No framework, no engine — every utility is emitted into five precompiled tiers, each a strict superset of the tier before it (`nano ⊂ micro ⊂ lite ⊂ standard ⊂ full`). The `colors` palette is a shared data module (`src/colors/_colors.scss`) consumed by Background Color, Border Color, Text Color, and Text Decoration Color.

| Tier     | Entry                        | Output (expanded)                     |
| -------- | ---------------------------- | ------------------------------------- |
| Full     | `src/tailwind.scss`          | `dist/full/tailwind.css`              |
| Standard | `src/tailwind.standard.scss` | `dist/standard/tailwind.standard.css` |
| Lite     | `src/tailwind.lite.scss`     | `dist/lite/tailwind.lite.css`         |
| Micro    | `src/tailwind.micro.scss`    | `dist/micro/tailwind.micro.css`       |
| Nano     | `src/tailwind.nano.scss`     | `dist/nano/tailwind.nano.css`         |

## Table of Contents

- [TailwindSCSS](#tailwindscss)
  - [Table of Contents](#table-of-contents)
  - [Build](#build)
  - [Cache reality](#cache-reality)
  - [Nano](#nano)
    - [Backgrounds](#backgrounds)
    - [Borders](#borders)
    - [Effects](#effects)
    - [Flexbox \& Grid](#flexbox--grid)
    - [Interactivity](#interactivity)
    - [Layout](#layout)
    - [Sizing](#sizing)
    - [Spacing](#spacing)
    - [Typography](#typography)
  - [Micro](#micro)
    - [Backgrounds](#backgrounds-1)
    - [Effects](#effects-1)
    - [Flexbox \& Grid](#flexbox--grid-1)
    - [Interactivity](#interactivity-1)
    - [Layout](#layout-1)
    - [Sizing](#sizing-1)
    - [Tables](#tables)
    - [Transitions](#transitions)
    - [Transforms](#transforms)
    - [Typography](#typography-1)
  - [Lite](#lite)
    - [Filters](#filters)
    - [Interactivity](#interactivity-2)
    - [Layout](#layout-2)
  - [Standard](#standard)
    - [Effects](#effects-2)
    - [Filters](#filters-1)
    - [Interactivity](#interactivity-3)
  - [Full](#full)
    - [Interactivity](#interactivity-4)
    - [Transforms](#transforms-1)

---

## Build

```sh
pnpm run build
```

Runs `bash scripts/build.sh` (`prebuild` steps first to wipe `dist`), which compiles each tier entry (`tailwind.nano`, `tailwind.micro`, `tailwind.lite`, `tailwind.standard`, `tailwind`) into its own `dist/<tier>/` folder (expanded + compressed `.min` CSS plus source maps), then `ts-node scripts/post-build.ts` writes `dist/metadata.json` following `metadata.schema.json` with each artifact's size in bytes and kibibytes.

## Cache reality

`dist/<tier>/` folders are independent static files: a project drops in one, or switches tiers later, or preloads a tier you never use. There is no JIT; larger tiers are always larger files.

---

## Nano

Daily-driver skeleton — layout fundamentals, spacing, borders, base colors, core typography, and flex/grid basics. Every tier above inherits these.

### Backgrounds

1. Background Color
2. Background Image

### Borders

1. Border Color
2. Border Radius
3. Border Style
4. Border Width

### Effects

1. Opacity

### Flexbox & Grid

1. Align Items
2. Flex
3. Flex Direction
4. Flex Grow
5. Flex Shrink
6. Flex Wrap
7. Gap
8. Grid Template Columns
9. Justify Content

### Interactivity

1. Cursor

### Layout

1. Box Sizing
2. Clear
3. Display
4. Float
5. Inset
6. Overflow
7. Position
8. Visibility
9. Z Index

### Sizing

1. Height
2. Width

### Spacing

1. Margin
2. Padding

### Typography

1. Font Family
2. Font Size
3. Font Style
4. Font Weight
5. Line Height
6. Text Align
7. Text Color
8. Vertical Align
9. White Space

---

## Micro

Micro adds the complete background, typography and flex/grid sets, transitions, 2D transforms, tables, logical and min/max sizing, blend modes and shadows, and form-color utilities. Every tier above inherits these.

### Backgrounds

1. Background Attachment
2. Background Clip
3. Background Origin
4. Background Position
5. Background Repeat
6. Background Size

### Effects

1. Background Blend Mode
2. Box Shadow
3. Mix Blend Mode
4. Text Shadow

### Flexbox & Grid

1. Align Content
2. Align Self
3. Flex Basis
4. Grid Auto Columns
5. Grid Auto Flow
6. Grid Auto Rows
7. Grid Column
8. Grid Row
9. Grid Template Rows
10. Justify Items
11. Justify Self
12. Order
13. Place Content
14. Place Items
15. Place Self

### Interactivity

1. Accent Color
2. Appearance
3. Caret Color
4. Color Scheme
5. Pointer Events
6. Resize
7. Touch Action
8. User Select

### Layout

1. Aspect Ratio
2. Isolation
3. Object Fit
4. Object Position

### Sizing

1. Block Size
2. Inline Size
3. Max Block Size
4. Max Height
5. Max Inline Size
6. Max Width
7. Min Block Size
8. Min Height
9. Min Inline Size
10. Min Width

### Tables

1. Border Collapse
2. Border Spacing
3. Caption Side
4. Table Layout

### Transitions

1. Animation
2. Transition Behavior
3. Transition Delay
4. Transition Duration
5. Transition Property
6. Transition Timing Function

### Transforms

1. Rotate
2. Scale
3. Skew
4. Transform (base, cpu, gpu, none)
5. Transform Origin
6. Translate

### Typography

1. Content
2. Font Feature Settings
3. Font Smoothing
4. Font Stretch
5. Font Variant Numeric
6. Hyphens
7. Letter Spacing
8. Line Clamp
9. List Style Image
10. List Style Position
11. List Style Type
12. Overflow Wrap
13. Tab Size
14. Text Decoration Color
15. Text Decoration Line
16. Text Decoration Style
17. Text Decoration Thickness
18. Text Indent
19. Text Overflow
20. Text Transform
21. Text Underline Offset
22. Text Wrap
23. Word Break

---

## Lite

Lite adds the CSS filter family, scroll behavior and snap, scrollbars, page `break-*`/`columns`, `overscroll-behavior`, and `box-decoration-break`. Every tier above inherits these.

### Filters

1. Blur
2. Brightness
3. Contrast
4. Drop Shadow
5. Filter
6. Grayscale
7. Hue Rotate
8. Invert
9. Saturate
10. Sepia

### Interactivity

1. Scroll Behavior
2. Scroll Snap Align
3. Scroll Snap Stop
4. Scroll Snap Type
5. Scrollbar
6. Scrollbar Gutter

### Layout

1. Box Decoration Break
2. Break After
3. Break Before
4. Break Inside
5. Columns
6. Overscroll Behavior

---

## Standard

Standard adds the experimental mask and backdrop-filter families plus `field-sizing` and `will-change`. Every tier above inherits these.

### Effects

1. Mask Clip
2. Mask Composite
3. Mask Image
4. Mask Mode
5. Mask Origin
6. Mask Position
7. Mask Repeat
8. Mask Size
9. Mask Type

### Filters

1. Backdrop Blur
2. Backdrop Brightness
3. Backdrop Contrast
4. Backdrop Filter
5. Backdrop Grayscale
6. Backdrop Hue Rotate
7. Backdrop Invert
8. Backdrop Opacity
9. Backdrop Saturate
10. Backdrop Sepia

### Interactivity

1. Field Sizing
2. Will Change

---

## Full

Full adds everything remaining: `scroll-margin`/`scroll-padding`, the 3D transform family (`perspective-*`, `transform-style`, `backface-visibility`) and `zoom`.

### Interactivity

1. Scroll Margin
2. Scroll Padding

### Transforms

1. Backface Visibility
2. Perspective
3. Perspective Origin
4. Transform Style
5. Zoom

---
