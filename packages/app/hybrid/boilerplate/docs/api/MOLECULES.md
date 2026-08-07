# Molecules

Composites of atoms in `src/components/molecules/`.

### Accordion

File: `src/components/molecules/Accordion.tsx` — client component.

| Prop        | Type                                                  | Default | Description              |
| ----------- | ----------------------------------------------------- | ------- | ------------------------ |
| `items`     | `{ id: string; title: string; content: ReactNode }[]` | —       | Rows to toggle           |
| `multiple?` | `boolean`                                             | `false` | Allow more than one open |

```tsx
<Accordion
  items={[{ id: 'a', title: 'What is this?', content: 'An accordion.' }]}
/>
```

### Alert

File: `src/components/molecules/Alert.tsx`

| Prop           | Type                                          | Default  | Description            |
| -------------- | --------------------------------------------- | -------- | ---------------------- |
| `variant?`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert color            |
| `title?`       | `string`                                      | —        | Bold title line        |
| `description?` | `ReactNode`                                   | —        | Muted body             |
| `dismissible?` | `boolean`                                     | `false`  | Renders a close button |
| `onClose?`     | `() => void`                                  | —        | Called on dismiss      |
| `className?`   | `string`                                      | `''`     | Extra classes          |
| `children?`    | `ReactNode`                                   | —        | Extra body content     |

Renders a DaisyUI `alert alert-*` with `role="alert"`.

### AvatarGroup

File: `src/components/molecules/AvatarGroup.tsx`

| Prop      | Type                                                 | Default | Description                          |
| --------- | ---------------------------------------------------- | ------- | ------------------------------------ |
| `avatars` | `{ src?: string; alt: string; fallback?: string }[]` | —       | Avatars to stack                     |
| `size?`   | `'sm' \| 'md' \| 'lg'`                               | `'md'`  | Avatar size                          |
| `max?`    | `number`                                             | —       | Cap shown avatars; renders `+N` chip |

Overlapping avatars with a `+N more members` overflow indicator.

### ChatBubble

File: `src/components/molecules/ChatBubble.tsx`

| Prop      | Type                    | Default | Description                        |
| --------- | ----------------------- | ------- | ---------------------------------- |
| `message` | `string`                | —       | Bubble text                        |
| `sender`  | `'user' \| 'assistant'` | —       | Aligns end (primary) or start side |
| `name?`   | `string`                | —       | Header label                       |
| `time?`   | `string`                | —       | Timestamp in the header            |
| `avatar?` | `ReactNode`             | —       | Small circle next to the bubble    |

Single message in a DaisyUI `chat` row; compose into a list for a thread.

### Breadcrumbs

File: `src/components/molecules/Breadcrumbs.tsx`

| Prop    | Type                                 | Default | Description                              |
| ------- | ------------------------------------ | ------- | ---------------------------------------- |
| `items` | `{ label: string; href?: string }[]` | —       | Trail; last item renders as current page |

```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ]}
/>
```

### Card

File: `src/components/molecules/Card.tsx`

| Prop           | Type        | Default | Description            |
| -------------- | ----------- | ------- | ---------------------- |
| `title?`       | `string`    | —       | `card-title`           |
| `description?` | `string`    | —       | Muted subtitle         |
| `action?`      | `ReactNode` | —       | Rendered right-aligned |
| `children`     | `ReactNode` | —       | Card body              |

```tsx
<Card title="Recent activity" description="Last 30 days" action={<FiPlus />}>
  ...
</Card>
```

### ButtonGroup

File: `src/components/molecules/ButtonGroup.tsx` — client component.

| Prop           | Type                                 | Default        | Description                |
| -------------- | ------------------------------------ | -------------- | -------------------------- |
| `options`      | `{ label: string; value: string }[]` | —              | Selectable options         |
| `value`        | `string`                             | —              | Active option value        |
| `onChange`     | `(value: string) => void`            | —              | Called with the new value  |
| `orientation?` | `'horizontal' \| 'vertical'`         | `'horizontal'` | `join-horizontal/vertical` |
| `size?`        | `'sm' \| 'md' \| 'lg'`               | `'md'`         | Button size                |
| `disabled?`    | `boolean`                            | `false`        | Disables all buttons       |

DaisyUI `join` button group. The active option is `btn-primary` with
`aria-pressed="true"`.

```tsx
<ButtonGroup
  options={[
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
  ]}
  value={range}
  onChange={setRange}
/>
```

### Carousel

File: `src/components/molecules/Carousel.tsx` — client component.

| Prop         | Type          | Default      | Description                   |
| ------------ | ------------- | ------------ | ----------------------------- |
| `slides`     | `ReactNode[]` | —            | Slides rendered one per view  |
| `ariaLabel?` | `string`      | `'Carousel'` | Accessible label of the track |

Horizontally scrollable DaisyUI `carousel` with `Previous slide` / `Next slide`
controls that scroll by the track width.

```tsx
<Carousel slides={[<div key="1">A</div>, <div key="2">B</div>]} />
```

### ConfirmDialog

File: `src/components/molecules/ConfirmDialog.tsx`

| Prop            | Type         | Default     | Description                  |
| --------------- | ------------ | ----------- | ---------------------------- |
| `open`          | `boolean`    | —           | When `false`, renders `null` |
| `title`         | `string`     | —           | Dialog heading               |
| `message?`      | `string`     | —           | Warning body with icon       |
| `confirmLabel?` | `string`     | `'Confirm'` | Confirm button text          |
| `cancelLabel?`  | `string`     | `'Cancel'`  | Cancel button text           |
| `danger?`       | `boolean`    | `false`     | Uses `btn-error`             |
| `loading?`      | `boolean`    | `false`     | Disables confirm + spinner   |
| `onConfirm`     | `() => void` | —           | Confirm click handler        |
| `onCancel?`     | `() => void` | —           | Cancel / backdrop handler    |

Wraps `Modal` for destructive confirmations.

```tsx
<ConfirmDialog
  open={open}
  title="Delete project?"
  danger
  confirmLabel="Delete"
  onConfirm={close}
  onCancel={close}
/>
```

### Dropdown

File: `src/components/molecules/Dropdown.tsx` — client component.

| Prop      | Type                                                                           | Default | Description                |
| --------- | ------------------------------------------------------------------------------ | ------- | -------------------------- |
| `trigger` | `ReactNode`                                                                    | —       | Button that opens the menu |
| `items`   | `{ label: string; onClick: () => void; icon?: ReactNode; danger?: boolean }[]` | —       | Menu items                 |

Closes on outside click and `Escape`. Renders `role="menu"`/`role="menuitem"`.
`danger` items use the error color.

### EmptyState

File: `src/components/molecules/EmptyState.tsx`

| Prop           | Type        | Default | Description         |
| -------------- | ----------- | ------- | ------------------- |
| `icon`         | `ReactNode` | —       | Large centered icon |
| `title`        | `string`    | —       | Heading text        |
| `description?` | `string`    | —       | Muted helper text   |
| `action?`      | `ReactNode` | —       | Optional CTA below  |

### Fieldset

File: `src/components/molecules/Fieldset.tsx`

| Prop           | Type        | Default | Description              |
| -------------- | ----------- | ------- | ------------------------ |
| `legend`       | `string`    | —       | Fieldset title           |
| `description?` | `string`    | —       | Muted helper text        |
| `disabled?`    | `boolean`   | `false` | Disables all descendants |
| `className?`   | `string`    | `''`    | Extra classes            |
| `children`     | `ReactNode` | —       | Form controls            |

### FormRow

File: `src/components/molecules/FormRow.tsx`

| Prop        | Type        | Default | Description                         |
| ----------- | ----------- | ------- | ----------------------------------- |
| `label`     | `string`    | —       | Label text; `htmlFor` when provided |
| `htmlFor?`  | `string`    | —       | Associates label with a control     |
| `hint?`     | `string`    | —       | Muted helper text (hidden on error) |
| `error?`    | `string`    | —       | Error text in `text-error`          |
| `required?` | `boolean`   | `false` | Adds a `*` marker after the label   |
| `children`  | `ReactNode` | —       | Form control                        |

### DangerZone

File: `src/components/molecules/DangerZone.tsx`

| Prop     | Type                                                                       | Default         | Description               |
| -------- | -------------------------------------------------------------------------- | --------------- | ------------------------- |
| `items`  | `{ id: string; label: string; description?: string; action: ReactNode }[]` | —               | Destructive settings rows |
| `title?` | `string`                                                                   | `'Danger zone'` | Section heading           |

Error-styled settings panel for destructive actions, with one action per row.

```tsx
<DangerZone
  items={[
    {
      id: 'delete',
      label: 'Delete account',
      description: 'Permanently remove everything.',
      action: (
        <Button variant="ghost" className="text-error">
          Delete
        </Button>
      ),
    },
  ]}
/>
```

### KeyValue

File: `src/components/molecules/KeyValue.tsx`

| Prop     | Type                                  | Default | Description            |
| -------- | ------------------------------------- | ------- | ---------------------- |
| `items`  | `{ key: string; value: ReactNode }[]` | —       | Pairs rendered as `dl` |
| `title?` | `string`                              | —       | Optional heading       |

Label/value list using `dl`/`dt`/`dd` with `divide-y` separators.

```tsx
<KeyValue
  items={[
    { key: 'Version', value: 'v1.2.3' },
    { key: 'Status', value: <span className="text-success">Healthy</span> },
  ]}
/>
```

### List

File: `src/components/molecules/List.tsx`

| Prop     | Type                                                                                             | Default | Description          |
| -------- | ------------------------------------------------------------------------------------------------ | ------- | -------------------- |
| `items`  | `{ id: string; title: string; description?: string; leading?: ReactNode; action?: ReactNode }[]` | —       | Rows                 |
| `title?` | `string`                                                                                         | —       | Optional header text |

DaisyUI `list list-row` items with optional leading node and trailing action.

```tsx
<List
  items={[
    {
      id: '1',
      title: 'Fix login bug',
      description: 'High priority',
      action: <Button size="sm">Open</Button>,
    },
  ]}
/>
```

### Menu

File: `src/components/molecules/Menu.tsx`

| Prop     | Type                                                                                              | Default | Description         |
| -------- | ------------------------------------------------------------------------------------------------- | ------- | ------------------- |
| `items`  | `{ label: string; icon?: ReactNode; active?: boolean; danger?: boolean; onClick?: () => void }[]` | —       | Menu items          |
| `title?` | `string`                                                                                          | —       | `menu-title` header |

Vertical DaisyUI `menu`. `active` items get `aria-current="page"`, `danger`
items use the error color.

```tsx
<Menu
  title="Account"
  items={[
    { label: 'Profile', icon: <FiUser />, onClick: goToProfile },
    { label: 'Log out', danger: true, onClick: logout },
  ]}
/>
```

### Modal

File: `src/components/molecules/Modal.tsx`

| Prop       | Type         | Default | Description                  |
| ---------- | ------------ | ------- | ---------------------------- |
| `open`     | `boolean`    | —       | When `false`, renders `null` |
| `onClose?` | `() => void` | —       | Clicking the backdrop        |
| `title?`   | `string`     | —       | Dialog heading               |
| `children` | `ReactNode`  | —       | Dialog body                  |
| `action?`  | `ReactNode`  | —       | `modal-action` footer        |

Renders a DaisyUI `dialog.modal.modal-open`.

### NavItem

File: `src/components/molecules/NavItem.tsx`

| Prop       | Type         | Default | Description                               |
| ---------- | ------------ | ------- | ----------------------------------------- |
| `label`    | `string`     | —       | Link text                                 |
| `href`     | `string`     | —       | Destination                               |
| `icon?`    | `ReactNode`  | —       | Leading icon                              |
| `badge?`   | `string`     | —       | Small count badge                         |
| `active?`  | `boolean`    | `false` | Highlights and sets `aria-current="page"` |
| `onClick?` | `() => void` | —       | Click handler                             |

Single sidebar-style `<li>` link; compose inside a `<ul>`.

### Pagination

File: `src/components/molecules/Pagination.tsx`

| Prop            | Type                     | Default | Description                         |
| --------------- | ------------------------ | ------- | ----------------------------------- |
| `current`       | `number`                 | —       | Active page (clamped to range)      |
| `total`         | `number`                 | —       | Total pages                         |
| `onChange`      | `(page: number) => void` | —       | Called with the selected page       |
| `siblingCount?` | `number`                 | `1`     | Pages shown around the current page |

Renders prev/next arrows plus numbered pages with `…` ellipsis for large ranges.

### SearchBar

File: `src/components/molecules/SearchBar.tsx` — client component.

| Prop           | Type                      | Default       | Description              |
| -------------- | ------------------------- | ------------- | ------------------------ |
| `value`        | `string`                  | —             | Controlled query         |
| `onChange`     | `(value: string) => void` | —             | Called on input/clear    |
| `placeholder?` | `string`                  | `'Search...'` | Placeholder text         |
| `size?`        | `'sm' \| 'md' \| 'lg'`    | `'md'`        | Input size               |
| `disabled?`    | `boolean`                 | `false`       | Disables input and clear |

Includes a leading search icon and a `Clear search` button when non-empty.

### Steps

File: `src/components/molecules/Steps.tsx`

| Prop      | Type                                        | Default | Description              |
| --------- | ------------------------------------------- | ------- | ------------------------ |
| `steps`   | `{ label: string; description?: string }[]` | —       | Steps to render          |
| `current` | `number`                                    | —       | Index of the active step |

Renders a DaisyUI `steps` progress bar; steps before `current` get
`step-primary`.

### Stat

File: `src/components/molecules/Stat.tsx`

| Prop           | Type                                                                        | Default     | Description        |
| -------------- | --------------------------------------------------------------------------- | ----------- | ------------------ |
| `label`        | `string`                                                                    | —           | Muted caption      |
| `value`        | `string`                                                                    | —           | Big value text     |
| `icon?`        | `ReactNode`                                                                 | —           | `stat-figure` icon |
| `description?` | `string`                                                                    | —           | Muted `stat-desc`  |
| `variant?`     | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Icon color         |

```tsx
<Stat label="Revenue" value="$12,480" icon={<FiBell />} variant="success" />
```

### Tabs

File: `src/components/molecules/Tabs.tsx` — client component.

| Prop       | Type                                 | Default | Description         |
| ---------- | ------------------------------------ | ------- | ------------------- |
| `tabs`     | `{ label: string; value: string }[]` | —       | Tab definitions     |
| `value`    | `string`                             | —       | Active tab `value`  |
| `onChange` | `(value: string) => void`            | —       | Called on tab click |

Underline-style tabs (active tab gets `text-primary border-primary border-b-2`).

### TagInput

File: `src/components/molecules/TagInput.tsx` — client component.

| Prop           | Type                       | Default                  | Description          |
| -------------- | -------------------------- | ------------------------ | -------------------- |
| `tags`         | `string[]`                 | —                        | Controlled tag list  |
| `onChange`     | `(tags: string[]) => void` | —                        | Called on add/remove |
| `placeholder?` | `string`                   | `'Type and press Enter'` | Input placeholder    |
| `disabled?`    | `boolean`                  | `false`                  | Disables the input   |

`Enter` adds the draft (ignoring duplicates/whitespace); `Backspace` with an
empty draft removes the last tag. Renders each tag via the `Tag` atom.

### Timeline

File: `src/components/molecules/Timeline.tsx`

| Prop    | Type                                                                         | Default | Description |
| ------- | ---------------------------------------------------------------------------- | ------- | ----------- |
| `items` | `{ title: string; description?: string; time?: string; icon?: ReactNode }[]` | —       | Events      |

Renders a DaisyUI `timeline-vertical`; events alternate start/end and show a
numbered (or `icon`) marker.

### Toast

File: `src/components/molecules/Toast.tsx` — client component.

| Prop        | Type                                          | Default  | Description       |
| ----------- | --------------------------------------------- | -------- | ----------------- |
| `message`   | `string`                                      | —        | Notification text |
| `variant?`  | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert color       |
| `duration?` | `number`                                      | `3000`   | Auto-dismiss ms   |
| `onClose?`  | `() => void`                                  | —        | Called on dismiss |

Fires the timer via `useEffect`; the close button dismisses immediately.

### TreeView

File: `src/components/molecules/TreeView.tsx` — client component.

| Prop    | Type                                                 | Default | Description          |
| ------- | ---------------------------------------------------- | ------- | -------------------- |
| `nodes` | `{ id: string; label: string; children?: Node[] }[]` | —       | Root nodes to render |

```tsx
<TreeView
  nodes={[
    { id: 'src', label: 'src', children: [{ id: 'atoms', label: 'atoms' }] },
  ]}
/>
```

Nodes with children toggle on click (`aria-expanded`); indentation is derived
from depth.

### CheckboxGroup

File: `src/components/molecules/CheckboxGroup.tsx` — client component.

| Prop        | Type                                                       | Default | Description                  |
| ----------- | ---------------------------------------------------------- | ------- | ---------------------------- |
| `options`   | `{ label: string; value: string; description?: string }[]` | —       | Checkbox definitions         |
| `value`     | `string[]`                                                 | —       | Selected values              |
| `onChange`  | `(value: string[]) => void`                                | —       | Called with the toggled list |
| `label?`    | `string`                                                   | —       | Group label                  |
| `error?`    | `string`                                                   | —       | Error text                   |
| `disabled?` | `boolean`                                                  | `false` | Disables all checkboxes      |
| `inline?`   | `boolean`                                                  | `false` | Rows items horizontally      |

Wraps the `Checkbox` atom; toggling adds/removes values.

```tsx
<CheckboxGroup options={options} value={selected} onChange={setSelected} />
```

### ColorPicker

File: `src/components/molecules/ColorPicker.tsx` — client component.

| Prop        | Type                      | Default               | Description             |
| ----------- | ------------------------- | --------------------- | ----------------------- |
| `value`     | `string`                  | —                     | Current hex colour      |
| `onChange`  | `(value: string) => void` | —                     | Called on pick / commit |
| `label?`    | `string`                  | `'Color'`             | Accessible label        |
| `swatches?` | `string[]`                | 8 default hex colours | Selectable palette      |
| `disabled?` | `boolean`                 | `false`               | Disables the controls   |

Swatches render as `aria-pressed` buttons; the hex `textbox` commits on blur or
Enter and reverts invalid values.

```tsx
<ColorPicker label="Brand color" value={color} onChange={setColor} />
```

### Combobox

File: `src/components/molecules/Combobox.tsx` — client component.

| Prop           | Type                                 | Default              | Description           |
| -------------- | ------------------------------------ | -------------------- | --------------------- |
| `options`      | `{ label: string; value: string }[]` | —                    | Selectable options    |
| `value`        | `string`                             | —                    | Selected option value |
| `onChange`     | `(value: string) => void`            | —                    | Called on selection   |
| `label?`       | `string`                             | —                    | Visible label         |
| `placeholder?` | `string`                             | `'Select an option'` | Trigger button text   |
| `emptyText?`   | `string`                             | `'No results.'`      | Empty-state message   |
| `disabled?`    | `boolean`                            | `false`              | Disables the control  |

Searchable combobox with `aria-haspopup="listbox"`, a `role="listbox"` list of
`role="option"` items, and `aria-selected` state.

```tsx
<Combobox options={options} value={value} onChange={setValue} />
```

### InputGroup

File: `src/components/molecules/InputGroup.tsx` — client component.

| Prop           | Type                      | Default  | Description            |
| -------------- | ------------------------- | -------- | ---------------------- |
| `value`        | `string`                  | —        | Input value            |
| `onChange`     | `(value: string) => void` | —        | Called on change       |
| `label?`       | `string`                  | —        | Visible label          |
| `leading?`     | `ReactNode`               | —        | Prefixed adornment     |
| `trailing?`    | `ReactNode`               | —        | Suffixed adornment     |
| `placeholder?` | `string`                  | —        | Placeholder text       |
| `type?`        | `string`                  | `'text'` | Native input `type`    |
| `error?`       | `string`                  | —        | Error text             |
| `hint?`        | `string`                  | —        | Muted helper text      |
| `disabled?`    | `boolean`                 | `false`  | Disables the input     |
| `id?`          | `string`                  | —        | Input id for the label |

DaisyUI `join` grouping a bordered input with leading/trailing adornments.

```tsx
<InputGroup
  label="Amount"
  leading={<span>$</span>}
  trailing={<span>USD</span>}
/>
```

### Popover

File: `src/components/molecules/Popover.tsx` — client component.

| Prop       | Type                                                             | Default   | Description                 |
| ---------- | ---------------------------------------------------------------- | --------- | --------------------------- |
| `trigger`  | `ReactElement<{ onClick?; 'aria-haspopup'?; 'aria-expanded'? }>` | —         | Element that opens the menu |
| `children` | `ReactNode`                                                      | —         | Panel content               |
| `align?`   | `'start' \| 'center' \| 'end'`                                   | `'start'` | Panel alignment             |

Clones `trigger` to inject `onClick`, `aria-haspopup="dialog"`, and
`aria-expanded`; closes on outside `mousedown`.

```tsx
<Popover trigger={<Button>Menu</Button>}>Content</Popover>
```

### RadioGroup

File: `src/components/molecules/RadioGroup.tsx` — client component.

| Prop        | Type                                                       | Default | Description             |
| ----------- | ---------------------------------------------------------- | ------- | ----------------------- |
| `name`      | `string`                                                   | —       | Shared radio `name`     |
| `options`   | `{ label: string; value: string; description?: string }[]` | —       | Radio definitions       |
| `value`     | `string`                                                   | —       | Selected value          |
| `onChange`  | `(value: string) => void`                                  | —       | Called on selection     |
| `label?`    | `string`                                                   | —       | Group label             |
| `error?`    | `string`                                                   | —       | Error text              |
| `disabled?` | `boolean`                                                  | `false` | Disables all radios     |
| `inline?`   | `boolean`                                                  | `false` | Rows items horizontally |

Wraps the `Radio` atom into a controlled group.

```tsx
<RadioGroup name="plan" options={options} value={plan} onChange={setPlan} />
```

### Sheet

File: `src/components/molecules/Sheet.tsx` — client component.

| Prop        | Type                                     | Default   | Description                 |
| ----------- | ---------------------------------------- | --------- | --------------------------- |
| `open`      | `boolean`                                | —         | Show the panel              |
| `onClose`   | `() => void`                             | —         | Called to dismiss           |
| `title?`    | `string`                                 | —         | Header title + `aria-label` |
| `side?`     | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Slide edge                  |
| `children?` | `ReactNode`                              | —         | Panel body                  |
| `footer?`   | `ReactNode`                              | —         | Sticky footer area          |

Fixed overlay with `role="dialog"` and `aria-modal="true"`; closes via the close
button, backdrop, or `Escape`.

```tsx
<Sheet open={open} onClose={close} title="Filters" side="right">
  Body
</Sheet>
```

### Table

File: `src/components/molecules/Table.tsx`

| Prop       | Type                                                                       | Default | Description             |
| ---------- | -------------------------------------------------------------------------- | ------- | ----------------------- |
| `columns`  | `{ key: string; header: string; align?: 'left' \| 'center' \| 'right' }[]` | —       | Column defs             |
| `rows`     | `Record<string, unknown>[]`                                                | —       | Data rows               |
| `caption?` | `string`                                                                   | —       | Table caption           |
| `striped?` | `boolean`                                                                  | `false` | `table-zebra` styling   |
| `compact?` | `boolean`                                                                  | `false` | `table-compact` styling |

Renders `table-zebra`/`table-compact` rows; missing cell values render `—`.

```tsx
<Table columns={columns} rows={rows} striped />
```

---

[Back to index](README.md)
