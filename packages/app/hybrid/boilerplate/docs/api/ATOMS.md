# Atoms

Small, presentational, dependency-free building blocks in
`src/components/atoms/`.

### Avatar

File: `src/components/atoms/Avatar.tsx`

| Prop        | Type                   | Default | Description                           |
| ----------- | ---------------------- | ------- | ------------------------------------- |
| `src?`      | `string`               | —       | Image source; absent renders initials |
| `alt?`      | `string`               | `''`    | Alt text, also used for initials      |
| `size?`     | `'sm' \| 'md' \| 'lg'` | `'md'`  | Circle size                           |
| `fallback?` | `string`               | —       | Explicit initials override            |

Without `src` it renders a DaisyUI `avatar placeholder` circle with up to two
uppercase initials derived from `alt` (or `fallback`).

```tsx
<Avatar src="/me.png" alt="Jane Doe" size="lg" />
<Avatar alt="Alex Chen" size="sm" />
```

### Badge

File: `src/components/atoms/Badge.tsx`

| Prop       | Type                                                                                               | Default     | Description          |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `variant?` | `'neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | DaisyUI badge color  |
| `outline?` | `boolean`                                                                                          | `false`     | Adds `badge-outline` |
| `children` | `ReactNode`                                                                                        | —           | Badge content        |

```tsx
<Badge variant="success">Paid</Badge>
```

### Button

File: `src/components/atoms/Button.tsx`

| Prop         | Type                                                                     | Default     | Description                |
| ------------ | ------------------------------------------------------------------------ | ----------- | -------------------------- |
| `variant?`   | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'link'` | `'primary'` | DaisyUI button color       |
| `size?`      | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`      | Button size                |
| `loading?`   | `boolean`                                                                | `false`     | Renders spinner + disables |
| `disabled?`  | `boolean`                                                                | `false`     | Disables the button        |
| `onClick?`   | `() => void`                                                             | —           | Click handler              |
| `type?`      | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  | Native type                |
| `className?` | `string`                                                                 | `''`        | Extra classes              |
| `children`   | `ReactNode`                                                              | —           | Button content             |

```tsx
<Button variant="outline" size="sm" onClick={save}>
  Save
</Button>
```

### Checkbox

File: `src/components/atoms/Checkbox.tsx`

| Prop        | Type                         | Default | Description              |
| ----------- | ---------------------------- | ------- | ------------------------ |
| `label`     | `string`                     | —       | Accessible label text    |
| `checked`   | `boolean`                    | —       | Controlled checked state |
| `onChange`  | `(checked: boolean) => void` | —       | Called with next value   |
| `size?`     | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Checkbox size            |
| `disabled?` | `boolean`                    | `false` | Disables the input       |

Renders a DaisyUI `checkbox checkbox-primary` with a wrapping `label`.

### CodeBlock

File: `src/components/atoms/CodeBlock.tsx` — client component.

| Prop        | Type      | Default | Description                          |
| ----------- | --------- | ------- | ------------------------------------ |
| `code`      | `string`  | —       | Source text to display               |
| `language?` | `string`  | —       | Shown in the header when no title    |
| `title?`    | `string`  | —       | Header label; defaults to `language` |
| `showCopy?` | `boolean` | `true`  | Renders a copy-to-clipboard button   |

```tsx
<CodeBlock code="const x = 1;" language="tsx" title="App.tsx" />
```

### CopyButton

File: `src/components/atoms/CopyButton.tsx` — client component.

| Prop       | Type                                               | Default     | Description                            |
| ---------- | -------------------------------------------------- | ----------- | -------------------------------------- |
| `text`     | `string`                                           | —           | Text written to the clipboard          |
| `label?`   | `string`                                           | `'Copy'`    | Accessible label shown when not copied |
| `variant?` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'outline'` | Button variant                         |
| `size?`    | `'sm' \| 'md' \| 'lg'`                             | `'sm'`      | Button size                            |
| `onCopy?`  | `() => void`                                       | —           | Called after a successful write        |

Writes `text` to `navigator.clipboard` and swaps its label to `Copied` for two
seconds.

```tsx
<CopyButton text="pnpm install" label="Copy command" />
```

### Divider

File: `src/components/atoms/Divider.tsx`

| Prop         | Type     | Default | Description                   |
| ------------ | -------- | ------- | ----------------------------- |
| `label?`     | `string` | —       | Centered text inside the rule |
| `className?` | `string` | `''`    | Extra classes                 |

Thin wrapper over the DaisyUI `divider` class.

```tsx
<Divider label="OR" />
```

### FileInput

File: `src/components/atoms/FileInput.tsx`

| Prop        | Type                        | Default | Description                  |
| ----------- | --------------------------- | ------- | ---------------------------- |
| `label`     | `string`                    | —       | Visible label + `aria-label` |
| `onChange?` | `(files: FileList) => void` | —       | Called with selected files   |
| `accept?`   | `string`                    | —       | Native `accept` attribute    |
| `multiple?` | `boolean`                   | `false` | Allow multi-file selection   |
| `hint?`     | `string`                    | —       | Muted helper text            |

Renders a DaisyUI `file-input file-input-bordered`.

### Icon

File: `src/components/atoms/Icon.tsx`

| Prop         | Type                                                                                                       | Default | Description            |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ------- | ---------------------- |
| `name`       | `'bell' \| 'calendar' \| 'check' \| 'heart' \| 'home' \| 'lock' \| 'mail' \| 'search' \| 'star' \| 'user'` | —       | Feather icon to render |
| `size?`      | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                                             | `'md'`  | Icon size              |
| `className?` | `string`                                                                                                   | `''`    | Extra classes          |

Thin wrapper over `react-icons/fi` glyphs so the demo code can reference icons
by name.

### IconButton

File: `src/components/atoms/IconButton.tsx`

| Prop        | Type                                                         | Default     | Description         |
| ----------- | ------------------------------------------------------------ | ----------- | ------------------- |
| `icon`      | `ReactNode`                                                  | —           | Icon content        |
| `label`     | `string`                                                     | —           | `aria-label`        |
| `onClick?`  | `() => void`                                                 | —           | Click handler       |
| `variant?`  | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'link'` | `'primary'` | Button variant      |
| `size?`     | `'sm' \| 'md' \| 'lg'`                                       | `'md'`      | Button size         |
| `disabled?` | `boolean`                                                    | `false`     | Disables the button |

Renders a circular `btn btn-circle` button with an accessible label.

```tsx
<IconButton icon={<Icon name="star" />} label="Favorite" />
```

### Indicator

File: `src/components/atoms/Indicator.tsx`

| Prop        | Type                                                         | Default     | Description     |
| ----------- | ------------------------------------------------------------ | ----------- | --------------- |
| `badge`     | `ReactNode`                                                  | —           | Badge content   |
| `children`  | `ReactNode`                                                  | —           | Wrapped content |
| `position?` | `'top-end' \| 'top-start' \| 'bottom-end' \| 'bottom-start'` | `'top-end'` | Corner position |

Overlays a DaisyUI `indicator-item` badge on its children.

```tsx
<Indicator badge="3">
  <IconButton icon={<Icon name="bell" />} label="Inbox" />
</Indicator>
```

### Kbd

File: `src/components/atoms/Kbd.tsx`

| Prop       | Type        | Default | Description     |
| ---------- | ----------- | ------- | --------------- |
| `children` | `ReactNode` | —       | Key combination |

Renders a DaisyUI `<kbd>` keycap.

### NumberField

File: `src/components/atoms/NumberField.tsx` — client component.

| Prop        | Type                      | Default | Description                |
| ----------- | ------------------------- | ------- | -------------------------- |
| `label`     | `string`                  | —       | Visible label              |
| `value`     | `number`                  | —       | Current value              |
| `onChange`  | `(value: number) => void` | —       | Called with the next value |
| `min?`      | `number`                  | —       | Lower clamp                |
| `max?`      | `number`                  | —       | Upper clamp                |
| `step?`     | `number`                  | `1`     | Increment amount           |
| `disabled?` | `boolean`                 | `false` | Disables input and buttons |

Number input with `−`/`+` steppers (DaisyUI `join`). Values are clamped to
`min`/`max` regardless of how they are entered.

```tsx
<NumberField
  label="Quantity"
  value={2}
  onChange={setQuantity}
  min={0}
  max={10}
/>
```

### PasswordField

File: `src/components/atoms/PasswordField.tsx` — client component.

| Prop            | Type                      | Default              | Description                     |
| --------------- | ------------------------- | -------------------- | ------------------------------- |
| `label`         | `string`                  | —                    | Visible label                   |
| `value`         | `string`                  | —                    | Current value                   |
| `onChange`      | `(value: string) => void` | —                    | Called with the next value      |
| `error?`        | `string`                  | —                    | Error text + `input-error`      |
| `placeholder?`  | `string`                  | —                    | Placeholder                     |
| `disabled?`     | `boolean`                 | `false`              | Disables input and toggle       |
| `autoComplete?` | `string`                  | `'current-password'` | Native `autocomplete` attribute |

Password input with a show/hide toggle button (`Show Password` /
`Hide Password`).

```tsx
<PasswordField label="Password" value={password} onChange={setPassword} />
```

### Progress

File: `src/components/atoms/Progress.tsx`

| Prop         | Type                                                                        | Default     | Description              |
| ------------ | --------------------------------------------------------------------------- | ----------- | ------------------------ |
| `value`      | `number`                                                                    | —           | Current value (clamped)  |
| `max?`       | `number`                                                                    | `100`       | Maximum value            |
| `size?`      | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`      | Bar height               |
| `variant?`   | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Bar color                |
| `label?`     | `string`                                                                    | —           | Optional label above bar |
| `showValue?` | `boolean`                                                                   | `false`     | Renders a `NN%` readout  |
| `className?` | `string`                                                                    | `''`        | Extra classes            |

```tsx
<Progress value={72} label="Disk" showValue variant="accent" />
```

### Radio

File: `src/components/atoms/Radio.tsx`

| Prop        | Type                         | Default | Description              |
| ----------- | ---------------------------- | ------- | ------------------------ |
| `label`     | `string`                     | —       | Accessible label text    |
| `name`      | `string`                     | —       | Radio group name         |
| `checked`   | `boolean`                    | —       | Controlled checked state |
| `onChange`  | `(checked: boolean) => void` | —       | Called with next value   |
| `size?`     | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Radio size               |
| `disabled?` | `boolean`                    | `false` | Disables the input       |

Renders a DaisyUI `radio radio-primary`; group radios by the same `name`.

### Rating

File: `src/components/atoms/Rating.tsx`

| Prop        | Type                      | Default | Description                     |
| ----------- | ------------------------- | ------- | ------------------------------- |
| `value`     | `number`                  | —       | Number of filled stars          |
| `max?`      | `number`                  | `5`     | Total star count                |
| `onChange?` | `(value: number) => void` | —       | When set, renders radio buttons |
| `size?`     | `'sm' \| 'md' \| 'lg'`    | `'md'`  | Star size                       |

Star shapes use the DaisyUI `mask mask-star-2` mask.

### Select

File: `src/components/atoms/Select.tsx`

| Prop           | Type                                 | Default | Description               |
| -------------- | ------------------------------------ | ------- | ------------------------- |
| `label`        | `string`                             | —       | Visible label             |
| `value`        | `string`                             | —       | Controlled selected value |
| `onChange`     | `(value: string) => void`            | —       | Called on change          |
| `options`      | `{ label: string; value: string }[]` | —       | Options                   |
| `placeholder?` | `string`                             | —       | Disabled empty option     |
| `size?`        | `'sm' \| 'md' \| 'lg'`               | `'md'`  | Select size               |
| `disabled?`    | `boolean`                            | `false` | Disables the select       |

Renders a DaisyUI `select select-bordered`.

### Separator

File: `src/components/atoms/Separator.tsx`

| Prop         | Type     | Default | Description   |
| ------------ | -------- | ------- | ------------- |
| `className?` | `string` | `''`    | Extra classes |

Renders an `<hr>` with `border-base-content/20 my-4`.

### Skeleton

File: `src/components/atoms/Skeleton.tsx`

| Prop         | Type     | Default | Description                          |
| ------------ | -------- | ------- | ------------------------------------ |
| `className?` | `string` | `''`    | Size/shape classes (e.g. `h-4 w-24`) |

Renders a DaisyUI `skeleton` loading placeholder.

### Slider

File: `src/components/atoms/Slider.tsx`

| Prop         | Type                      | Default | Description                         |
| ------------ | ------------------------- | ------- | ----------------------------------- |
| `label`      | `string`                  | —       | Visible label                       |
| `value`      | `number`                  | —       | Controlled value                    |
| `onChange`   | `(value: number) => void` | —       | Called with new value               |
| `min?`       | `number`                  | `0`     | Range minimum                       |
| `max?`       | `number`                  | `100`   | Range maximum                       |
| `step?`      | `number`                  | `1`     | Increment step                      |
| `showValue?` | `boolean`                 | `false` | Renders the value next to the label |
| `disabled?`  | `boolean`                 | `false` | Disables the slider                 |

Renders a DaisyUI `range range-primary` range input.

### Spinner

File: `src/components/atoms/Spinner.tsx`

| Prop    | Type                   | Default | Description          |
| ------- | ---------------------- | ------- | -------------------- |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Loading spinner size |

Renders a DaisyUI `loading loading-spinner`.

### StatusDot

File: `src/components/atoms/StatusDot.tsx`

| Prop     | Type                                        | Default | Description         |
| -------- | ------------------------------------------- | ------- | ------------------- |
| `status` | `'online' \| 'away' \| 'busy' \| 'offline'` | —       | Dot color           |
| `label?` | `string`                                    | —       | Optional text label |

Small colored presence dot (`bg-success` / `bg-warning` / `bg-error` /
`bg-base-content/30`).

### Swap

File: `src/components/atoms/Swap.tsx` — client component.

| Prop         | Type                      | Default    | Description                |
| ------------ | ------------------------- | ---------- | -------------------------- |
| `first`      | `ReactNode`               | —          | Shown when `on` is `true`  |
| `second`     | `ReactNode`               | —          | Shown when `on` is `false` |
| `on`         | `boolean`                 | —          | Controlled active state    |
| `onToggle`   | `(next: boolean) => void` | —          | Called with the next state |
| `ariaLabel?` | `string`                  | `'Toggle'` | Accessible label           |

Animated DaisyUI `swap` toggle between two contents. The active face is
controlled by `on`.

```tsx
<Swap
  first={<Icon name="star" />}
  second={<Icon name="bell" />}
  on={on}
  onToggle={setOn}
/>
```

### Switch

File: `src/components/atoms/Switch.tsx`

| Prop           | Type                         | Default | Description            |
| -------------- | ---------------------------- | ------- | ---------------------- |
| `label`        | `string`                     | —       | Accessible label       |
| `checked`      | `boolean`                    | —       | Controlled state       |
| `onChange`     | `(checked: boolean) => void` | —       | Called with next value |
| `size?`        | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Toggle size            |
| `disabled?`    | `boolean`                    | `false` | Disables the toggle    |
| `description?` | `string`                     | —       | Muted helper text      |

Renders a DaisyUI `toggle toggle-primary` with `role="switch"`.

### Tag

File: `src/components/atoms/Tag.tsx`

| Prop        | Type                                                                                               | Default     | Description                 |
| ----------- | -------------------------------------------------------------------------------------------------- | ----------- | --------------------------- |
| `label`     | `string`                                                                                           | —           | Tag text                    |
| `variant?`  | `'neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | Badge color                 |
| `onRemove?` | `() => void`                                                                                       | —           | Renders a remove (×) button |

Renders a DaisyUI `badge badge-lg`; combine with `TagInput` for editable lists.

### Textarea

File: `src/components/atoms/Textarea.tsx`

| Prop       | Type                                          | Default | Description                                     |
| ---------- | --------------------------------------------- | ------- | ----------------------------------------------- |
| `label`    | `string` (required)                           | —       | Visible label; derives `id` when `id` is absent |
| `error?`   | `string`                                      | —       | Error text; adds `textarea-error`               |
| `...props` | `TextareaHTMLAttributes<HTMLTextAreaElement>` | —       | Passed to the `<textarea>`                      |

### TextField

File: `src/components/atoms/TextField.tsx`

| Prop       | Type                                    | Default | Description                                     |
| ---------- | --------------------------------------- | ------- | ----------------------------------------------- |
| `label`    | `string` (required)                     | —       | Visible label; derives `id` when `id` is absent |
| `error?`   | `string`                                | —       | Error text; adds `input-error`                  |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` | —       | Passed to the `<input>`                         |

```tsx
<TextField
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Required"
/>
```

### Tooltip

File: `src/components/atoms/Tooltip.tsx`

| Prop        | Type                                     | Default | Description      |
| ----------- | ---------------------------------------- | ------- | ---------------- |
| `content`   | `string`                                 | —       | Tooltip text     |
| `children`  | `ReactNode`                              | —       | Hover target     |
| `position?` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |

Renders a DaisyUI `tooltip` wrapper using `data-tip`.

### ButtonLink

File: `src/components/atoms/ButtonLink.tsx`

| Prop         | Type                                                                     | Default     | Description        |
| ------------ | ------------------------------------------------------------------------ | ----------- | ------------------ |
| `href`       | `string`                                                                 | —           | `next/link` target |
| `children`   | `ReactNode`                                                              | —           | Link content       |
| `variant?`   | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'link'` | `'primary'` | Button variant     |
| `size?`      | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`      | Button size        |
| `className?` | `string`                                                                 | `''`        | Extra classes      |

Renders a `next/link` styled as a DaisyUI `btn`, for client-side navigation.

```tsx
<ButtonLink href="/signup" variant="outline" size="sm">
  Sign up
</ButtonLink>
```

### Collapse

File: `src/components/atoms/Collapse.tsx` — client component.

| Prop         | Type                      | Default | Description                         |
| ------------ | ------------------------- | ------- | ----------------------------------- |
| `title`      | `string`                  | —       | Always-visible header text          |
| `children`   | `ReactNode`               | —       | Hidden body content                 |
| `open?`      | `boolean`                 | `false` | Controlled open state               |
| `onChange?`  | `(open: boolean) => void` | —       | Called when the toggle would change |
| `className?` | `string`                  | `''`    | Extra classes                       |

DaisyUI `collapse collapse-arrow` driven by a visually-hidden checkbox labelled
with `title`.

```tsx
<Collapse title="What is this?">Content</Collapse>
```

### Countdown

File: `src/components/atoms/Countdown.tsx`

| Prop         | Type     | Default | Description         |
| ------------ | -------- | ------- | ------------------- |
| `value`      | `number` | —       | Number to display   |
| `minDigits?` | `number` | `2`     | Minimum digit count |
| `className?` | `string` | `''`    | Extra classes       |

DaisyUI `countdown` digits driven by the `--value` CSS variable. Negative values
clamp to `0`.

```tsx
<Countdown value={12} />
```

### Mask

File: `src/components/atoms/Mask.tsx`

| Prop         | Type                                                                                     | Default      | Description        |
| ------------ | ---------------------------------------------------------------------------------------- | ------------ | ------------------ |
| `src`        | `string`                                                                                 | —            | Image source       |
| `alt`        | `string`                                                                                 | —            | Image alt text     |
| `shape?`     | `'squircle' \| 'heart' \| 'hexagon' \| 'hexagon-2' \| 'decagon' \| 'triangle' \| 'star'` | `'squircle'` | DaisyUI mask shape |
| `className?` | `string`                                                                                 | `''`         | Extra classes      |

Renders an `<img>` with the DaisyUI `mask mask-<shape>` classes.

```tsx
<Mask src="/avatar.png" alt="Profile" shape="hexagon" />
```

### OTPInput

File: `src/components/atoms/OTPInput.tsx` — client component.

| Prop        | Type                      | Default           | Description             |
| ----------- | ------------------------- | ----------------- | ----------------------- |
| `value`     | `string`                  | —                 | Current digits          |
| `onChange`  | `(value: string) => void` | —                 | Called with digits only |
| `length?`   | `number`                  | `6`               | Number of digit boxes   |
| `label?`    | `string`                  | `'One-time code'` | Accessible name         |
| `disabled?` | `boolean`                 | `false`           | Disables the input      |

Renders `length` DaisyUI digit boxes plus an `sr-only` textbox
(`role="textbox"`) that filters non-digits. Controlled via `value`/`onChange`.

```tsx
<OTPInput label="One-time code" value={code} onChange={setCode} />
```

### ProgressRing

File: `src/components/atoms/ProgressRing.tsx`

| Prop           | Type      | Default | Description                 |
| -------------- | --------- | ------- | --------------------------- |
| `value`        | `number`  | —       | Progress 0–100 (clamped)    |
| `size?`        | `number`  | `64`    | Diameter in pixels          |
| `strokeWidth?` | `number`  | `6`     | Ring thickness in pixels    |
| `showValue?`   | `boolean` | `false` | Renders `NN%` in the center |
| `className?`   | `string`  | `''`    | Extra classes               |

SVG progress ring with `role="progressbar"` and `aria-valuenow` clamped to
0–100. Value over `50` uses the `text-primary` accent colour.

```tsx
<ProgressRing value={75} showValue />
```

### Stack

File: `src/components/atoms/Stack.tsx`

| Prop         | Type                         | Default      | Description      |
| ------------ | ---------------------------- | ------------ | ---------------- |
| `items`      | `ReactNode[]`                | —            | Cards to overlap |
| `direction?` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction  |
| `className?` | `string`                     | `''`         | Extra classes    |

DaisyUI `stack` for overlapping cards.

```tsx
<Stack items={[cardA, cardB]} direction="horizontal" />
```

### Text

File: `src/components/atoms/Text.tsx`

| Prop         | Type                                                                                               | Default     | Description   |
| ------------ | -------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| `as?`        | `'p' \| 'span' \| 'div' \| 'small' \| 'strong' \| 'em' \| 'label' \| 'h1' \| 'h2' \| 'h3' \| 'h4'` | `'p'`       | Tag to render |
| `size?`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                    | `'md'`      | Font size     |
| `weight?`    | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                                                     | `'normal'`  | Font weight   |
| `color?`     | `'default' \| 'muted' \| 'primary' \| 'error' \| 'success'`                                        | `'default'` | Text colour   |
| `className?` | `string`                                                                                           | `''`        | Extra classes |
| `children`   | `ReactNode`                                                                                        | —           | Content       |

Polymorphic text rendered via `createElement` with mapped DaisyUI classes.

```tsx
<Text as="h3" size="lg" weight="semibold">
  Heading
</Text>
```

### AspectRatio

File: `src/components/atoms/AspectRatio.tsx`

| Prop         | Type        | Default  | Description                |
| ------------ | ----------- | -------- | -------------------------- |
| `ratio?`     | `number`    | `16 / 9` | Width-to-height ratio      |
| `className?` | `string`    | `''`     | Extra classes              |
| `children?`  | `ReactNode` | —        | Content clipped to the box |

Wraps content in a `position: relative` box with a CSS `aspect-ratio`; children
fill it via `absolute inset-0`. Clips overflow so media never breaks the ratio.

```tsx
<AspectRatio ratio={1}>
  <img src="/thumb.png" alt="Thumbnail" />
</AspectRatio>
```

### Artboard

File: `src/components/atoms/Artboard.tsx`

| Prop         | Type                            | Default     | Description            |
| ------------ | ------------------------------- | ----------- | ---------------------- |
| `title?`     | `string`                        | —           | Accessible group label |
| `size?`      | `'phone-1' \| ... \| 'phone-6'` | `'phone-1'` | DaisyUI artboard size  |
| `className?` | `string`                        | `''`        | Extra classes          |
| `children?`  | `ReactNode`                     | —           | Artboard content       |

Renders a DaisyUI `artboard artboard-demo` phone frame. `title` is used as the
`aria-label` of the `role="group"` wrapper.

```tsx
<Artboard size="phone-4" title="Mobile preview">
  <p>App content</p>
</Artboard>
```

### BrowserMockup

File: `src/components/atoms/BrowserMockup.tsx`

| Prop         | Type        | Default | Description              |
| ------------ | ----------- | ------- | ------------------------ |
| `url?`       | `string`    | —       | Address shown in the bar |
| `className?` | `string`    | `''`    | Extra classes            |
| `children?`  | `ReactNode` | —       | Page content             |

DaisyUI `browser-mockup` with three traffic-light dots and an optional address
bar.

```tsx
<BrowserMockup url="https://example.com">Page</BrowserMockup>
```

### Label

File: `src/components/atoms/Label.tsx`

| Prop         | Type                  | Default | Description             |
| ------------ | --------------------- | ------- | ----------------------- |
| `children`   | `ReactNode`           | —       | Label text              |
| `htmlFor?`   | `string`              | —       | Associated control id   |
| `className?` | `string`              | `''`    | Extra classes           |
| `...`        | `LabelHTMLAttributes` | —       | Native label attributes |

Base label styled with `text-sm font-medium`, mirroring the Radix/shadcn
`Label`.

```tsx
<Label htmlFor="email">Email</Label>
```

### LetterAvatar

File: `src/components/atoms/LetterAvatar.tsx`

| Prop         | Type                                                | Default     | Description            |
| ------------ | --------------------------------------------------- | ----------- | ---------------------- |
| `name`       | `string`                                            | —           | Name for initials      |
| `color?`     | `'neutral' \| 'primary' \| 'secondary' \| 'accent'` | `'primary'` | Placeholder background |
| `size?`      | `'xs' \| 'sm' \| 'md' \| 'lg'`                      | `'md'`      | Avatar size            |
| `className?` | `string`                                            | `''`        | Extra classes          |

DaisyUI `avatar-placeholder` circle that derives initials from `name` — two
initials for multi-word names, the first two letters for single words.

```tsx
<LetterAvatar name="Jane Doe" color="accent" size="lg" />
```

### PhoneMockup

File: `src/components/atoms/PhoneMockup.tsx`

| Prop         | Type        | Default | Description           |
| ------------ | ----------- | ------- | --------------------- |
| `camera?`    | `boolean`   | `true`  | Show the notch camera |
| `className?` | `string`    | `''`    | Extra classes         |
| `children?`  | `ReactNode` | —       | Screen content        |

DaisyUI `phone-mockup` frame with an optional `.camera` notch and `.display`.

```tsx
<PhoneMockup>Screen</PhoneMockup>
```

### WindowMockup

File: `src/components/atoms/WindowMockup.tsx`

| Prop         | Type        | Default | Description            |
| ------------ | ----------- | ------- | ---------------------- |
| `title?`     | `string`    | —       | Title shown in the bar |
| `className?` | `string`    | `''`    | Extra classes          |
| `children?`  | `ReactNode` | —       | Window content         |

DaisyUI `window-mockup` with traffic-light dots and an optional window title.

```tsx
<WindowMockup title="Terminal">$ pnpm build</WindowMockup>
```

### Clock

File: `src/components/atoms/Clock.tsx` — client component.

| Prop           | Type             | Default | Description   |
| -------------- | ---------------- | ------- | ------------- |
| `format?`      | `'12h' \| '24h'` | `'24h'` | Hour format   |
| `showSeconds?` | `boolean`        | `true`  | Render `:SS`  |
| `className?`   | `string`         | `''`    | Extra classes |

Renders a live `<time>` in mono tabular numerals, updating every second.

```tsx
<Clock format="12h" />
```

### Cube

File: `src/components/atoms/Cube.tsx`

| Prop         | Type                           | Default    | Description           |
| ------------ | ------------------------------ | ---------- | --------------------- |
| `size?`      | `number`                       | `96`       | Edge length in pixels |
| `speed?`     | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Spin duration         |
| `className?` | `string`                       | `''`       | Extra classes         |

CSS 3D cube with six shaded `primary` faces, `role="img"` and
`aria-label="Spinning cube"`.

```tsx
<Cube size={64} speed="slow" />
```

### Dock

File: `src/components/atoms/Dock.tsx`

| Prop         | Type                                        | Default  | Description     |
| ------------ | ------------------------------------------- | -------- | --------------- |
| `items`      | `{ key, label, icon, active?, onClick? }[]` | —        | Dock entries    |
| `label?`     | `string`                                    | `'Dock'` | Accessible name |
| `className?` | `string`                                    | `''`     | Extra classes   |

macOS-style dock of icon buttons; active items get a `primary` fill and hover
lifts the tile up.

```tsx
<Dock
  items={[
    { key: 'home', label: 'Home', icon: <Icon name="home" />, active: true },
  ]}
/>
```

### EditableText

File: `src/components/atoms/EditableText.tsx` — client component.

| Prop           | Type                      | Default           | Description               |
| -------------- | ------------------------- | ----------------- | ------------------------- |
| `value`        | `string`                  | —                 | Current text              |
| `onChange`     | `(value: string) => void` | —                 | Called on commit          |
| `label?`       | `string`                  | —                 | Accessible input name     |
| `placeholder?` | `string`                  | `'Click to edit'` | Empty/editing placeholder |
| `className?`   | `string`                  | `''`              | Extra classes             |

Inline-editable text: click to turn into an input, `Enter`/blur commits,
`Escape` cancels.

```tsx
<EditableText label="Project name" value={name} onChange={setName} />
```

### EmptyPlaceholder

File: `src/components/atoms/EmptyPlaceholder.tsx`

| Prop           | Type        | Default              | Description   |
| -------------- | ----------- | -------------------- | ------------- |
| `icon?`        | `ReactNode` | —                    | Large icon    |
| `title?`       | `string`    | `'Nothing here yet'` | Heading text  |
| `description?` | `string`    | —                    | Muted copy    |
| `action?`      | `ReactNode` | —                    | CTA area      |
| `className?`   | `string`    | `''`                 | Extra classes |

Dashed-border empty-state box; combine with `EmptyState` for richer variants.

```tsx
<EmptyPlaceholder
  icon={<Icon name="bell" />}
  title="No notifications"
  action={<Button size="sm">Clear</Button>}
/>
```

### LinkButton

File: `src/components/atoms/LinkButton.tsx`

| Prop         | Type                                                                     | Default     | Description        |
| ------------ | ------------------------------------------------------------------------ | ----------- | ------------------ |
| `href`       | `string`                                                                 | —           | `next/link` target |
| `children`   | `ReactNode`                                                              | —           | Link content       |
| `variant?`   | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'link'` | `'primary'` | Button variant     |
| `size?`      | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`      | Button size        |
| `className?` | `string`                                                                 | `''`        | Extra classes      |

`next/link` styled as a DaisyUI `btn` — the same contract as `ButtonLink` with a
canonical name.

```tsx
<LinkButton href="/signup" variant="outline">
  Sign up
</LinkButton>
```

### MiniMap

File: `src/components/atoms/MiniMap.tsx`

| Prop         | Type                              | Default | Description                |
| ------------ | --------------------------------- | ------- | -------------------------- |
| `sections`   | `{ id: string; label: string }[]` | —       | Page sections              |
| `active?`    | `string`                          | —       | Id of the highlighted item |
| `className?` | `string`                          | `''`    | Extra classes              |

Compact page overview (`aria-label="Page overview"`); the active section gets a
`primary` fill and `aria-current="location"`.

```tsx
<MiniMap sections={[{ id: 'intro', label: 'Intro' }]} active="intro" />
```

### TagCloud

File: `src/components/atoms/TagCloud.tsx`

| Prop         | Type                                  | Default | Description                  |
| ------------ | ------------------------------------- | ------- | ---------------------------- |
| `tags`       | `{ label: string; weight: number }[]` | —       | Tags with relative weights   |
| `minSize?`   | `number`                              | `12`    | Smallest font size in pixels |
| `maxSize?`   | `number`                              | `28`    | Largest font size in pixels  |
| `className?` | `string`                              | `''`    | Extra classes                |

Sizes tag labels proportionally to their `weight` between `minSize` and
`maxSize`; returns `null` for an empty list.

```tsx
<TagCloud tags={[{ label: 'React', weight: 9 }]} />
```

### Container

File: `src/components/atoms/Container.tsx`

| Prop         | Type                                                       | Default | Description      |
| ------------ | ---------------------------------------------------------- | ------- | ---------------- |
| `size?`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'xl'`  | Max-width step   |
| `className?` | `string`                                                   | `''`    | Extra classes    |
| `children`   | `ReactNode`                                                | —       | Centered content |

Centres content with a responsive max-width and horizontal padding.

```tsx
<Container size="lg">…</Container>
```

### Grid

File: `src/components/atoms/Grid.tsx`

| Prop         | Type                                             | Default | Description       |
| ------------ | ------------------------------------------------ | ------- | ----------------- |
| `cols?`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                     | `1`     | Base column count |
| `smCols?`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                     | —       | Columns at `sm`+  |
| `lgCols?`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                     | —       | Columns at `lg`+  |
| `gap?`       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Gap               |     |
| `className?` | `string`                                         | `''`    | Extra classes     |
| `children`   | `ReactNode`                                      | —       | Grid cells        |

Tailwind `grid` with optional responsive column overrides.

```tsx
<Grid cols={2} lgCols={4} gap="lg">
  …
</Grid>
```

### Hover3D

File: `src/components/atoms/Hover3D.tsx`

| Prop         | Type        | Default | Description     |
| ------------ | ----------- | ------- | --------------- |
| `children`   | `ReactNode` | —       | Content to tilt |
| `className?` | `string`    | `''`    | Extra classes   |

DaisyUI `hover-3d` wrapper — content lifts with a 3D perspective on hover.

```tsx
<Hover3D>
  <Card>…</Card>
</Hover3D>
```

### HoverGallery

File: `src/components/atoms/HoverGallery.tsx`

| Prop         | Type                             | Default | Description     |
| ------------ | -------------------------------- | ------- | --------------- |
| `images`     | `{ src: string; alt: string }[]` | —       | Images to stack |
| `className?` | `string`                         | `''`    | Extra classes   |

DaisyUI `hover-gallery` — stacked images that fan out on hover.

```tsx
<HoverGallery images={[{ src: '/a.png', alt: 'A' }]} />
```

### Loading

File: `src/components/atoms/Loading.tsx`

| Prop         | Type                                                              | Default     | Description         |
| ------------ | ----------------------------------------------------------------- | ----------- | ------------------- |
| `variant?`   | `'spinner' \| 'dots' \| 'ring' \| 'ball' \| 'bars' \| 'infinity'` | `'spinner'` | DaisyUI `loading-*` |
| `size?`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | `'md'`      | Size                |
| `className?` | `string`                                                          | `''`        | Extra classes       |

Standalone DaisyUI `loading` indicator — the raw spinner without Button wiring.

```tsx
<Loading variant="dots" size="lg" />
```

### Portal

File: `src/components/atoms/Portal.tsx` — client component.

| Prop         | Type                                  | Default | Description                   |
| ------------ | ------------------------------------- | ------- | ----------------------------- |
| `children`   | `ReactNode`                           | —       | Content to portal             |
| `container?` | `Element \| DocumentFragment \| null` | —       | Target (else `document.body`) |

Renders children into a container via `createPortal`; returns `null` during SSR.

```tsx
<Portal>…</Portal>
```

### Slot

File: `src/components/atoms/Slot.tsx` — client component.

| Prop         | Type              | Default | Description                 |
| ------------ | ----------------- | ------- | --------------------------- |
| `children`   | `ReactElement`    | —       | Child element to decorate   |
| `className?` | `string`          | `''`    | Class merged onto child     |
| `onClick?`   | `(event) => void` | —       | Handler chained after child |

Merges `className` and chains `onClick` onto its single child — the Radix `Slot`
pattern.

```tsx
<Slot className="btn btn-primary">
  <a href="/signup">Sign up</a>
</Slot>
```

### Spacer

File: `src/components/atoms/Spacer.tsx`

| Prop         | Type                         | Default        | Description          |
| ------------ | ---------------------------- | -------------- | -------------------- |
| `axis?`      | `'horizontal' \| 'vertical'` | `'horizontal'` | Which axis to expand |
| `size?`      | `number`                     | —              | Fixed size (px)      |
| `className?` | `string`                     | `''`           | Extra classes        |

Invisible flex filler: grows to fill free space, or reserves a fixed pixel size.

```tsx
<Spacer />
<Spacer axis="vertical" size={24} />
```

### TextRotate

File: `src/components/atoms/TextRotate.tsx`

| Prop         | Type       | Default | Description            |
| ------------ | ---------- | ------- | ---------------------- |
| `words`      | `string[]` | —       | Words to cycle through |
| `duration?`  | `number`   | `3000`  | Cycle duration in ms   |
| `className?` | `string`   | `''`    | Extra classes          |

DaisyUI `text-rotate` — vertically stacked words that rotate on an interval.

```tsx
<TextRotate words={['build', 'ship', 'scale']} />
```

### ThemeController

File: `src/components/atoms/ThemeController.tsx` — client component.

| Prop        | Type                                        | Default | Description            |
| ----------- | ------------------------------------------- | ------- | ---------------------- |
| `theme`     | `string`                                    | —       | DaisyUI theme name     |
| `checked?`  | `boolean`                                   | `false` | Controlled check state |
| `label?`    | `string`                                    | —       | Optional text label    |
| `onChange?` | `(checked: boolean, theme: string) => void` | —       | Change callback        |

DaisyUI `theme-controller` checkbox that carries a theme value for the global
`data-theme` swap.

```tsx
<ThemeController theme="night" label="Night" />
```

### Validator

File: `src/components/atoms/Validator.tsx` — client component.

| Prop         | Type        | Default | Description               |
| ------------ | ----------- | ------- | ------------------------- |
| `children`   | `ReactNode` | —       | Single form child         |
| `hint?`      | `string`    | —       | Muted helper text         |
| `error?`     | `string`    | —       | Error text + `text-error` |
| `className?` | `string`    | `''`    | Extra classes             |

Adds DaisyUI `validator` / `validator-hint` to a single input child
(non-textarea) and reflects `error` via `aria-invalid`.

```tsx
<Validator hint="8+ characters" error={error}>
  <input type="password" />
</Validator>
```

### VisuallyHidden

File: `src/components/atoms/VisuallyHidden.tsx`

| Prop         | Type        | Default | Description        |
| ------------ | ----------- | ------- | ------------------ |
| `children`   | `ReactNode` | —       | Screen-reader text |
| `className?` | `string`    | `''`    | Extra classes      |

`sr-only` wrapper for accessible, invisible text.

```tsx
<VisuallyHidden>Loading…</VisuallyHidden>
```

---

[Back to index](README.md)
