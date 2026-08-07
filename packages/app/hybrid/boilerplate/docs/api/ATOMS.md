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

---

[Back to index](README.md)
