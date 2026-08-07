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

### Banner

File: `src/components/molecules/Banner.tsx`

| Prop           | Type                                          | Default  | Description                |
| -------------- | --------------------------------------------- | -------- | -------------------------- |
| `title?`       | `string`                                      | —        | Bold headline              |
| `description?` | `ReactNode`                                   | —        | Supporting text            |
| `variant?`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Colour + default icon      |
| `icon?`        | `ReactNode`                                   | —        | Overrides the default icon |
| `action?`      | `ReactNode`                                   | —        | Right-aligned CTA          |
| `dismissible?` | `boolean`                                     | `false`  | Show the dismiss button    |
| `onClose?`     | `() => void`                                  | —        | Called on dismiss          |
| `children?`    | `ReactNode`                                   | —        | Extra body content         |
| `className?`   | `string`                                      | `''`     | Extra classes              |

MUI-style full-width status strip with a left accent border and icon; renders
`role="status"`. Unlike `Alert` it flows edge-to-edge and supports an action
slot.

```tsx
<Banner
  variant="warning"
  title="Storage almost full"
  action={<Button>Upgrade</Button>}
/>
```

### BottomNavigation

File: `src/components/molecules/BottomNavigation.tsx`

| Prop         | Type                                                   | Default    | Description           |
| ------------ | ------------------------------------------------------ | ---------- | --------------------- |
| `items`      | `{ label: string; value: string; icon?: ReactNode }[]` | —          | Tabs to render        |
| `value`      | `string`                                               | —          | Active tab value      |
| `onChange`   | `(value: string) => void`                              | —          | Called with new value |
| `position?`  | `'static' \| 'fixed'`                                  | `'static'` | Sticky vs in-flow     |
| `className?` | `string`                                               | `''`       | Extra classes         |

DaisyUI `btm-nav` bottom tab bar (MUI `BottomNavigation` equivalent). The active
item gets `active` plus `aria-current="page"`.

```tsx
<BottomNavigation items={tabs} value={tab} onChange={setTab} position="fixed" />
```

### Chip

File: `src/components/molecules/Chip.tsx`

| Prop         | Type                                                                                               | Default     | Description             |
| ------------ | -------------------------------------------------------------------------------------------------- | ----------- | ----------------------- |
| `label`      | `string`                                                                                           | —           | Chip text               |
| `color?`     | `'neutral' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | Badge colour            |
| `variant?`   | `'filled' \| 'outline'`                                                                            | `'filled'`  | Badge style             |
| `size?`      | `'sm' \| 'md'`                                                                                     | `'md'`      | Badge size              |
| `icon?`      | `ReactNode`                                                                                        | —           | Leading icon            |
| `avatar?`    | `ReactNode`                                                                                        | —           | Leading avatar          |
| `onClick?`   | `() => void`                                                                                       | —           | Makes the chip a button |
| `onDelete?`  | `() => void`                                                                                       | —           | Renders a remove button |
| `disabled?`  | `boolean`                                                                                          | `false`     | Disables interactions   |
| `className?` | `string`                                                                                           | `''`        | Extra classes           |

MUI-style `Chip` built on the DaisyUI badge; delete clicks call `onDelete`
without bubbling to `onClick`.

```tsx
<Chip label="React" color="primary" onDelete={removeTag} />
```

### ContextMenu

File: `src/components/molecules/ContextMenu.tsx` — client component.

| Prop      | Type                                                       | Default | Description              |
| --------- | ---------------------------------------------------------- | ------- | ------------------------ |
| `trigger` | `ReactNode`                                                | —       | Right-click target       |
| `items`   | `{ label: string; onClick: () => void; icon?; danger? }[]` | —       | Menu items (Radix-style) |

Opens a context menu on `onContextMenu`, positioned at the cursor. Closes on
outside click, `Escape`, or after invoking an item.

```tsx
<ContextMenu trigger={<NodeRow />} items={[{ label: 'Copy', onClick: copy }]} />
```

### Drawer

File: `src/components/molecules/Drawer.tsx` — client component.

| Prop          | Type                | Default  | Description             |
| ------------- | ------------------- | -------- | ----------------------- |
| `open`        | `boolean`           | —        | Controlled visibility   |
| `onClose`     | `() => void`        | —        | Called to dismiss       |
| `title?`      | `string`            | —        | Header title            |
| `side?`       | `'left' \| 'right'` | `'left'` | Slide edge              |
| `overlay?`    | `boolean`           | `true`   | Backdrop click-to-close |
| `widthClass?` | `string`            | `'w-80'` | Panel width             |
| `children?`   | `ReactNode`         | —        | Panel body              |
| `footer?`     | `ReactNode`         | —        | Sticky footer           |

DaisyUI `drawer` powered by a controlled `drawer-toggle` checkbox; closes via
the close button, overlay, or `Escape`. `side="right"` adds `drawer-end`.

```tsx
<Drawer open={open} onClose={close} title="Filters" side="right">
  Body
</Drawer>
```

### FloatingActionButton

File: `src/components/molecules/FloatingActionButton.tsx`

| Prop         | Type                                                           | Default          | Description         |
| ------------ | -------------------------------------------------------------- | ---------------- | ------------------- |
| `icon`       | `ReactNode`                                                    | —                | Button icon         |
| `label`      | `string`                                                       | —                | `aria-label`        |
| `onClick?`   | `() => void`                                                   | —                | Click handler       |
| `position?`  | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Fixed corner        |
| `size?`      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`           | Button size         |
| `variant?`   | `'primary' \| 'secondary' \| 'accent' \| 'neutral'`            | `'primary'`      | Colour variant      |
| `disabled?`  | `boolean`                                                      | `false`          | Disables the button |
| `className?` | `string`                                                       | `''`             | Extra classes       |

MUI-style circular `Fab` pinned to a viewport corner.

```tsx
<FloatingActionButton icon={<FiPlus />} label="Add" onClick={add} />
```

### HoverCard

File: `src/components/molecules/HoverCard.tsx`

| Prop          | Type                                     | Default    | Description        |
| ------------- | ---------------------------------------- | ---------- | ------------------ |
| `trigger`     | `ReactNode`                              | —          | Hover/focus target |
| `content`     | `ReactNode`                              | —          | Popover content    |
| `side?`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Placement          |
| `widthClass?` | `string`                                 | `'w-64'`   | Popover width      |
| `className?`  | `string`                                 | `''`       | Extra classes      |

Radix/shadcn-style `HoverCard` shown on `group-hover` and `group-focus-within`
(keyboard accessible via the `tabIndex={0}` wrapper).

```tsx
<HoverCard trigger={<Button>Hover</Button>} content={<p>Details</p>} />
```

### ScrollArea

File: `src/components/molecules/ScrollArea.tsx`

| Prop              | Type               | Default | Description            |
| ----------------- | ------------------ | ------- | ---------------------- |
| `children?`       | `ReactNode`        | —       | Scrollable content     |
| `maxHeight?`      | `number \| string` | `240`   | Max height (px or CSS) |
| `className?`      | `string`           | `''`    | Outer classes          |
| `innerClassName?` | `string`           | `''`    | Inner wrapper classes  |

Radix-style scroll container using `overflow-y-auto` with a configurable max
height.

```tsx
<ScrollArea maxHeight={300}>...</ScrollArea>
```

### SpeedDial

File: `src/components/molecules/SpeedDial.tsx` — client component.

| Prop          | Type                                                           | Default                 | Description      |
| ------------- | -------------------------------------------------------------- | ----------------------- | ---------------- |
| `triggerIcon` | `ReactNode`                                                    | —                       | Fab trigger icon |
| `actions`     | `{ label: string; onClick: () => void; icon?: ReactNode }[]`   | —                       | Expanded actions |
| `position?`   | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'`        | Fixed corner     |
| `openLabel?`  | `string`                                                       | `'Open quick actions'`  | Open label       |
| `closeLabel?` | `string`                                                       | `'Close quick actions'` | Close label      |

MUI-style `SpeedDial`: a floating trigger that expands into a vertical action
list; runs the action and collapses on selection.

```tsx
<SpeedDial triggerIcon={<FiPlus />} actions={actions} />
```

### ToggleGroup

File: `src/components/molecules/ToggleGroup.tsx`

| Prop         | Type                                  | Default | Description                |
| ------------ | ------------------------------------- | ------- | -------------------------- |
| `options`    | `{ label: string; value: string }[]`  | —       | Options                    |
| `value`      | `string[] \| string`                  | —       | Single or multi selection  |
| `onChange`   | `(value: string[] \| string) => void` | —       | Called with next selection |
| `multiple?`  | `boolean`                             | `false` | Multi-select mode          |
| `disabled?`  | `boolean`                             | `false` | Disables all buttons       |
| `className?` | `string`                              | `''`    | Extra classes              |

Radix `ToggleGroup`-style segmented control built on the DaisyUI `join`; active
buttons use `btn-primary` and `aria-pressed`.

```tsx
<ToggleGroup options={modes} value={mode} onChange={setMode} />
```

### DatePicker

File: `src/components/molecules/DatePicker.tsx` — client component.

| Prop           | Type                   | Default         | Description            |
| -------------- | ---------------------- | --------------- | ---------------------- |
| `value?`       | `Date`                 | —               | Selected date          |
| `onChange`     | `(date: Date) => void` | —               | Called with the pick   |
| `label?`       | `string`               | `'Pick a date'` | Accessible dialog name |
| `placeholder?` | `string`               | `'Select date'` | Empty trigger text     |
| `minDate?`     | `Date`                 | —               | Disables earlier days  |
| `maxDate?`     | `Date`                 | —               | Disables later days    |

Calendar popover (`aria-haspopup="dialog"`) with month navigation; disabled
cells are skipped via `isDisabled`.

```tsx
<DatePicker value={due} onChange={setDue} minDate={new Date()} />
```

### DateRange

File: `src/components/molecules/DateRange.tsx`

| Prop            | Type                      | Default        | Description              |
| --------------- | ------------------------- | -------------- | ------------------------ |
| `start`         | `string`                  | —              | Start value `YYYY-MM-DD` |
| `end`           | `string`                  | —              | End value                |
| `onStartChange` | `(value: string) => void` | —              | Start change             |
| `onEndChange`   | `(value: string) => void` | —              | End change               |
| `label?`        | `string`                  | `'Date range'` | Group label              |
| `min?`          | `string`                  | —              | Global minimum           |
| `max?`          | `string`                  | —              | Global maximum           |

Two native `input type="date"` fields; the start field clamps to `max=end` and
the end field clamps to `min=start` so ranges never invert.

```tsx
<DateRange start={from} end={to} onStartChange={setFrom} onEndChange={setTo} />
```

### Dialog

File: `src/components/molecules/Dialog.tsx` — client component.

| Prop               | Type         | Default | Description             |
| ------------------ | ------------ | ------- | ----------------------- |
| `open`             | `boolean`    | —       | Controlled visibility   |
| `onClose`          | `() => void` | —       | Called to dismiss       |
| `title?`           | `string`     | —       | Header title            |
| `description?`     | `string`     | —       | Muted subtitle          |
| `children?`        | `ReactNode`  | —       | Body content            |
| `footer?`          | `ReactNode`  | —       | Right-aligned actions   |
| `closeOnBackdrop?` | `boolean`    | `true`  | Backdrop click-to-close |

Centered modal (`role="dialog"`, `aria-modal="true"`) with a backdrop and close
button; `Escape` closes whenever `open`.

```tsx
<Dialog
  open={open}
  onClose={close}
  title="Confirm"
  footer={<Button>OK</Button>}>
  Body
</Dialog>
```

### FileUpload

File: `src/components/molecules/FileUpload.tsx` — client component.

| Prop             | Type                              | Default          | Description              |
| ---------------- | --------------------------------- | ---------------- | ------------------------ |
| `label?`         | `string`                          | `'Upload files'` | Dropzone heading         |
| `accept?`        | `string`                          | —                | Native `accept`          |
| `multiple?`      | `boolean`                         | `false`          | Allow several files      |
| `maxSize?`       | `number`                          | —                | Per-file byte limit      |
| `onFilesChange?` | `(files: UploadedFile[]) => void` | —                | Emits `{ name, size }[]` |
| `hint?`          | `string`                          | —                | Muted helper text        |

Drag-and-drop zone that filters files over `maxSize`, lists accepted files with
formatted sizes and per-file remove buttons.

```tsx
<FileUpload accept="image/*" multiple maxSize={5 * 1024 * 1024} />
```

### ImageGallery

File: `src/components/molecules/ImageGallery.tsx` — client component.

| Prop     | Type                             | Default           | Description             |
| -------- | -------------------------------- | ----------------- | ----------------------- |
| `images` | `{ src: string; alt: string }[]` | —                 | Images to browse        |
| `label?` | `string`                         | `'Image gallery'` | `aria-label` on wrapper |

Hero image plus a thumbnail strip (`aria-pressed` for the active thumb); returns
`null` for an empty list.

```tsx
<ImageGallery images={[{ src: '/a.png', alt: 'A' }]} />
```

### InfoList

File: `src/components/molecules/InfoList.tsx`

| Prop       | Type                             | Default | Description      |
| ---------- | -------------------------------- | ------- | ---------------- |
| `items`    | `{ key, label, value, icon? }[]` | —       | `dl` rows        |
| `title?`   | `string`                         | —       | Optional heading |
| `columns?` | `1 \| 2`                         | `1`     | Column count     |

A `dl` of label/value rows with optional leading icons.

```tsx
<InfoList
  items={[{ key: 'v', label: 'Version', value: '1.0.0' }]}
  columns={2}
/>
```

### InlineAlert

File: `src/components/molecules/InlineAlert.tsx`

| Prop       | Type                                          | Default  | Description         |
| ---------- | --------------------------------------------- | -------- | ------------------- |
| `variant?` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Accent colour       |
| `children` | `ReactNode`                                   | —        | Message text        |
| `onClose?` | `() => void`                                  | —        | Renders a dismiss × |

Compact status row (`role="status"`) with a leading icon and left accent border.

```tsx
<InlineAlert variant="success">Saved.</InlineAlert>
```

### InputStepper

File: `src/components/molecules/InputStepper.tsx` — client component.

| Prop       | Type                      | Default | Description     |
| ---------- | ------------------------- | ------- | --------------- |
| `label`    | `string`                  | —       | Field label     |
| `options`  | `string[]`                | —       | Ordered choices |
| `value`    | `string`                  | —       | Selected option |
| `onChange` | `(value: string) => void` | —       | Called on step  |

`−`/`+` stepper over an ordered option list; the previous/next buttons disable
at the ends and the current position shows as `n of m`.

```tsx
<InputStepper
  label="Period"
  options={['Day', 'Week']}
  value={period}
  onChange={setPeriod}
/>
```

### MenuGroup

File: `src/components/molecules/MenuGroup.tsx`

| Prop       | Type                                                                | Default | Description   |
| ---------- | ------------------------------------------------------------------- | ------- | ------------- |
| `sections` | `{ id, title, items: { id, label, icon?, active?, onClick? }[] }[]` | —       | Menu sections |

DaisyUI `menu` with `menu-title` groups; active items get `menu-active` and
`aria-current="page"`.

```tsx
<MenuGroup
  sections={[
    { id: 'acct', title: 'Account', items: [{ id: 'p', label: 'Profile' }] },
  ]}
/>
```

### NumberInput

File: `src/components/molecules/NumberInput.tsx`

| Prop           | Type                      | Default | Description                |
| -------------- | ------------------------- | ------- | -------------------------- |
| `label`        | `string`                  | —       | Visible label + `id`       |
| `value`        | `number`                  | —       | Controlled value           |
| `onChange`     | `(value: number) => void` | —       | Called with next value     |
| `min?`         | `number`                  | —       | Lower clamp                |
| `max?`         | `number`                  | —       | Upper clamp                |
| `step?`        | `number`                  | `1`     | Native step                |
| `placeholder?` | `string`                  | —       | Placeholder                |
| `error?`       | `string`                  | —       | Error text + `input-error` |
| `hint?`        | `string`                  | —       | Muted helper text          |
| `disabled?`    | `boolean`                 | `false` | Disables the input         |

Native `input type="number"` that clamps changes to `min`/`max` and reports
out-of-range values via `aria-invalid`.

```tsx
<NumberInput label="Seats" value={seats} onChange={setSeats} min={1} max={10} />
```

### Backdrop

File: `src/components/molecules/Backdrop.tsx` — client component.

| Prop         | Type         | Default | Description                                |
| ------------ | ------------ | ------- | ------------------------------------------ |
| `open`       | `boolean`    | —       | Render condition                           |
| `onClose?`   | `() => void` | —       | Called when the backdrop itself is clicked |
| `children?`  | `ReactNode`  | —       | Centered content                           |
| `className?` | `string`     | `''`    | Extra classes                              |
| `opaque?`    | `boolean`    | `false` | Solid `bg-base-100` instead of scrim       |

Full-viewport fixed overlay; clicks on the backdrop (not children) fire
`onClose`.

```tsx
<Backdrop open={busy} onClose={() => setBusy(false)}>
  <Card>…</Card>
</Backdrop>
```

### FilterGroup

File: `src/components/molecules/FilterGroup.tsx` — client component.

| Prop       | Type                                 | Default | Description                |
| ---------- | ------------------------------------ | ------- | -------------------------- |
| `name`     | `string`                             | —       | Shared input `name`        |
| `options`  | `{ value: string; label: string }[]` | —       | Toggle chips               |
| `selected` | `string[]`                           | —       | Controlled selected values |
| `onChange` | `(next: string[]) => void`           | —       | Called on toggle           |

DaisyUI `filter` with a `filter-reset` button shown only when something is
selected.

```tsx
<FilterGroup name="status" options={opts} selected={sel} onChange={setSel} />
```

### LoadingOverlay

File: `src/components/molecules/LoadingOverlay.tsx` — client component.

| Prop           | Type                                                              | Default     | Description            |
| -------------- | ----------------------------------------------------------------- | ----------- | ---------------------- |
| `open`         | `boolean`                                                         | —           | Render condition       |
| `label?`       | `string`                                                          | —           | Text under the spinner |
| `variant?`     | `'spinner' \| 'dots' \| 'ring' \| 'ball' \| 'bars' \| 'infinity'` | `'spinner'` | `Loading` variant      |
| `transparent?` | `boolean`                                                         | `false`     | Lighter scrim          |
| `onClose?`     | `() => void`                                                      | —           | Called when clicked    |

Blocking overlay built on the `Loading` atom, with an optional click-to-dismiss.

```tsx
<LoadingOverlay open={saving} label="Saving…" />
```

### Menubar

File: `src/components/molecules/Menubar.tsx` — client component.

| Prop         | Type                            | Default      | Description      |
| ------------ | ------------------------------- | ------------ | ---------------- |
| `items`      | `{ label, icon?, children? }[]` | —            | Buttons + panels |
| `ariaLabel?` | `string`                        | `'Menu bar'` | `nav` label      |

Desktop-style menu bar; each item with `children` opens a popover panel, closed
by click-outside or Escape.

```tsx
<Menubar items={[{ label: 'File', children: <Menu>…</Menu> }]} />
```

### MultiSelect

File: `src/components/molecules/MultiSelect.tsx` — client component.

| Prop           | Type                                 | Default     | Description          |
| -------------- | ------------------------------------ | ----------- | -------------------- |
| `options`      | `{ value: string; label: string }[]` | —           | Selectable options   |
| `value`        | `string[]`                           | —           | Controlled selection |
| `onChange`     | `(next: string[]) => void`           | —           | Called on toggle     |
| `label?`       | `string`                             | —           | Field label          |
| `placeholder?` | `string`                             | `'Select…'` | Empty-state text     |

Trigger button with chip summary and a `listbox` of checkboxes; closes on
click-outside.

```tsx
<MultiSelect options={roles} value={sel} onChange={setSel} label="Roles" />
```

### Resizable

File: `src/components/molecules/Resizable.tsx` — client component.

| Prop            | Type                         | Default        | Description         |
| --------------- | ---------------------------- | -------------- | ------------------- |
| `first`         | `ReactNode`                  | —              | Left/top pane       |
| `second`        | `ReactNode`                  | —              | Right/bottom pane   |
| `direction?`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Split axis          |
| `initialRatio?` | `number`                     | `0.5`          | Initial split ratio |
| `minRatio?`     | `number`                     | `0.2`          | Lower clamp         |
| `maxRatio?`     | `number`                     | `0.8`          | Upper clamp         |
| `className?`    | `string`                     | `''`           | Extra classes       |

Pointer-draggable split pane with a `separator` role; ratio is clamped to
`minRatio`/`maxRatio`.

```tsx
<Resizable first={<List … />} second={<Detail … />} initialRatio={0.4} />
```

### TimePicker

File: `src/components/molecules/TimePicker.tsx` — client component.

| Prop           | Type                     | Default | Description                |
| -------------- | ------------------------ | ------- | -------------------------- |
| `value`        | `string`                 | —       | `HH:mm` value              |
| `onChange`     | `(time: string) => void` | —       | Called on select           |
| `label?`       | `string`                 | —       | Field label                |
| `stepMinutes?` | `number`                 | `30`    | Minute step (clamped 1–60) |
| `format?`      | `'12h' \| '24h'`         | `'24h'` | Display format             |

`listbox` of times at a fixed step; 12h format renders `hh:mm AM/PM`.

```tsx
<TimePicker value="09:30" onChange={setTime} format="12h" stepMinutes={15} />
```

### TransferList

File: `src/components/molecules/TransferList.tsx` — client component.

| Prop          | Type                              | Default       | Description           |
| ------------- | --------------------------------- | ------------- | --------------------- |
| `left`        | `{ id: string; label: string }[]` | —             | Available items       |
| `right`       | `{ id: string; label: string }[]` | —             | Selected items        |
| `onChange`    | `(left, right) => void`           | —             | Called after any move |
| `leftTitle?`  | `string`                          | `'Available'` | Left legend           |
| `rightTitle?` | `string`                          | `'Selected'`  | Right legend          |

Two checkbox columns with move-left/right and move-all buttons; selection is
cleared after each move.

```tsx
<TransferList left={all} right={picked} onChange={(l, r) => setBoth(l, r)} />
```

### Checklist

File: `src/components/molecules/Checklist.tsx`

| Prop         | Type                     | Default | Description      |
| ------------ | ------------------------ | ------- | ---------------- |
| `items`      | `{ id, label, done? }[]` | —       | Checklist items  |
| `onToggle`   | `(id: string) => void`   | —       | Called on toggle |
| `className?` | `string`                 | `''`    | Extra classes    |

DaisyUI `checkbox` rows; completed items get `line-through`.

```tsx
<Checklist items={tasks} onToggle={(id) => toggle(id)} />
```

### FeatureList

File: `src/components/molecules/FeatureList.tsx`

| Prop         | Type                              | Default | Description   |
| ------------ | --------------------------------- | ------- | ------------- |
| `items`      | `{ icon, title, description? }[]` | —       | Feature cards |
| `columns?`   | `1 \| 2`                          | `1`     | Grid columns  |
| `className?` | `string`                          | `''`    | Extra classes |

Icon + title + optional description cards; two-column mode stacks on small
screens.

```tsx
<FeatureList columns={2} items={[{ icon: <FiZap />, title: 'Fast' }]} />
```

### Gauge

File: `src/components/molecules/Gauge.tsx`

| Prop         | Type        | Default     | Description         |
| ------------ | ----------- | ----------- | ------------------- |
| `value`      | `number`    | —           | Current value       |
| `max?`       | `number`    | `100`       | Maximum (min 1)     |
| `size?`      | `number`    | `6`         | Diameter in rem     |
| `thickness?` | `number`    | `0.6`       | Stroke in rem       |
| `label?`     | `string`    | —           | Caption text        |
| `showValue?` | `boolean`   | `false`     | Show percent inside |
| `variant?`   | theme color | `'primary'` | Ring color          |
| `className?` | `string`    | `''`        | Extra classes       |

DaisyUI `radial-progress` ring; value is clamped to `0..max`.

```tsx
<Gauge value={72} variant="success" showValue label="Score" />
```

### JsonViewer

File: `src/components/molecules/JsonViewer.tsx` — client component.

| Prop               | Type      | Default | Description            |
| ------------------ | --------- | ------- | ---------------------- |
| `data`             | `unknown` | —       | Value to inspect       |
| `name?`            | `string`  | —       | Root label             |
| `defaultExpanded?` | `boolean` | `false` | Expand nodes initially |
| `className?`       | `string`  | `''`    | Extra classes          |

Recursive `role="tree"` of expandable nodes with type-colored values (`null`,
numbers/booleans, strings, objects).

```tsx
<JsonViewer data={payload} name="response" defaultExpanded />
```

### Masonry

File: `src/components/molecules/Masonry.tsx`

| Prop         | Type                   | Default | Description            |
| ------------ | ---------------------- | ------- | ---------------------- |
| `items`      | `ReactNode[]`          | —       | Items to lay out       |
| `columns?`   | `2 \| 3 \| 4`          | `3`     | CSS multi-column count |
| `gap?`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | Column gap             |
| `className?` | `string`               | `''`    | Extra classes          |

CSS `columns-*` masonry with `break-inside-avoid` items.

```tsx
<Masonry items={cards} columns={4} gap="lg" />
```

### PasswordStrength

File: `src/components/molecules/PasswordStrength.tsx`

| Prop     | Type     | Default               | Description          |
| -------- | -------- | --------------------- | -------------------- |
| `value`  | `string` | —                     | Password to evaluate |
| `label?` | `string` | `'Password strength'` | Legend text          |

Scores 5 checks (length ≥ 8, lower, upper, number, symbol) into a 0–5 label
(Very weak…Excellent) with a segmented bar and a check list.

```tsx
<PasswordStrength value={password} />
```

### ReviewCard

File: `src/components/molecules/ReviewCard.tsx`

| Prop         | Type     | Default | Description               |
| ------------ | -------- | ------- | ------------------------- |
| `quote`      | `string` | —       | Review text               |
| `author`     | `string` | —       | Author name               |
| `role?`      | `string` | —       | Author role               |
| `rating?`    | `number` | —       | 0–5 star rating (clamped) |
| `initials?`  | `string` | —       | Avatar initials           |
| `className?` | `string` | `''`    | Extra classes             |

Star rating (`role="img"`), curly-quoted blockquote, and author caption.

```tsx
<ReviewCard quote="Loved it" author="Ada" rating={5} initials="A" />
```

### SkillBar

File: `src/components/molecules/SkillBar.tsx`

| Prop         | Type        | Default     | Description     |
| ------------ | ----------- | ----------- | --------------- |
| `label`      | `string`    | —           | Skill name      |
| `value`      | `number`    | —           | Skill level     |
| `max?`       | `number`    | `100`       | Maximum value   |
| `variant?`   | theme color | `'primary'` | Bar color       |
| `showValue?` | `boolean`   | `true`      | Show percentage |
| `className?` | `string`    | `''`        | Extra classes   |

Thin wrapper around the `Progress` atom (`size="sm"`).

```tsx
<SkillBar label="TypeScript" value={90} variant="success" />
```

### SocialLinks

File: `src/components/molecules/SocialLinks.tsx`

| Prop         | Type                           | Default | Description     |
| ------------ | ------------------------------ | ------- | --------------- |
| `items`      | `{ platform, href, label? }[]` | —       | Links to render |
| `size?`      | `'sm' \| 'md' \| 'lg'`         | `'md'`  | Icon size       |
| `className?` | `string`                       | `''`    | Extra classes   |

`platform` is one of `github`, `twitter`, `linkedin`, `instagram`, `youtube`,
`facebook`, `globe` (Feather icons) rendered as `btn-circle` links.

```tsx
<SocialLinks items={[{ platform: 'github', href: '/gh' }]} />
```

### StatTrend

File: `src/components/molecules/StatTrend.tsx`

| Prop         | Type        | Default | Description       |
| ------------ | ----------- | ------- | ----------------- |
| `label`      | `string`    | —       | Statistic label   |
| `value`      | `string`    | —       | Main value text   |
| `trend?`     | `number`    | —       | Percentage change |
| `icon?`      | `ReactNode` | —       | Optional icon     |
| `className?` | `string`    | `''`    | Extra classes     |

Trend renders `+x%` / `-x%` in success/error with up/down arrows.

```tsx
<StatTrend label="Revenue" value="$12k" trend={8.5} />
```

---

[Back to index](README.md)
