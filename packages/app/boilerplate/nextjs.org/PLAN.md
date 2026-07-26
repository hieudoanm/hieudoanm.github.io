# Plan

- [Plan](#plan)
  - [Techstack](#techstack)
    - [01. TypeScript](#01-typescript)
    - [02. pnpm](#02-pnpm)
    - [03. ESLint](#03-eslint)
    - [04. Prettier](#04-prettier)
    - [05. Jest](#05-jest)
    - [06. Playwright](#06-playwright)
    - [07. Next.js](#07-nextjs)
    - [08. Tailwindcss](#08-tailwindcss)
    - [09. Daisyui](#09-daisyui)
    - [10. Tauri](#10-tauri)
  - [Pages](#pages)
  - [Styling](#styling)
    - [Base HTML](#base-html)

## Techstack

### 01. TypeScript

### 02. pnpm

### 03. ESLint

### 04. Prettier

### 05. Jest

### 06. Playwright

### 07. Next.js

### 08. Tailwindcss

### 09. Daisyui

### 10. Tauri

## Pages

1. `/about`
2. `/settings`
3. `/version`

## Styling

### Base HTML

```css
@layer base {
  /* Headings */
  h1 {
    @apply font-mono text-4xl font-light tracking-tight;
  }
  h2 {
    @apply font-mono text-2xl font-light tracking-tight;
  }
  h3 {
    @apply font-mono text-xl font-light tracking-tight;
  }
  h4 {
    @apply font-mono text-lg font-light;
  }
  h5 {
    @apply font-mono text-base font-light;
  }
  h6 {
    @apply font-mono text-sm font-light;
  }

  /* Text */
  p {
    @apply text-base leading-relaxed;
  }
  strong {
    @apply font-semibold;
  }
  em {
    @apply italic;
  }
  small {
    @apply text-sm;
  }
  sub {
    @apply text-xs;
  }
  sup {
    @apply text-xs;
  }
  mark {
    @apply rounded bg-yellow-500/20 px-0.5 text-yellow-500;
  }
  blockquote {
    @apply border-base-content/20 text-base-content/70 border-l-4 pl-4 italic;
  }

  /* Links */
  a {
    @apply text-primary hover:text-primary/80 underline underline-offset-4 transition-colors;
  }

  /* Lists */
  ul {
    @apply list-inside list-disc;
  }
  ol {
    @apply list-inside list-decimal;
  }
  li {
    @apply leading-relaxed;
  }

  /* Code */
  code {
    @apply bg-base-content/10 rounded px-1.5 py-0.5 font-mono text-sm;
  }
  pre {
    @apply bg-base-content/5 overflow-x-auto rounded-xl p-4 font-mono text-sm;
  }
  pre code {
    @apply bg-transparent p-0;
  }
  kbd {
    @apply bg-base-200 border-base-content/20 rounded border px-1.5 py-0.5 font-mono text-xs shadow-sm;
  }

  /* Tables */
  table {
    @apply w-full text-sm;
  }
  thead {
    @apply border-base-content/20 border-b;
  }
  tbody {
    @apply divide-base-content/10 divide-y;
  }
  th {
    @apply px-4 py-2 text-left font-medium;
  }
  td {
    @apply px-4 py-2;
  }

  /* Forms */
  input {
    @apply bg-transparent;
  }
  textarea {
    @apply bg-transparent;
  }
  select {
    @apply bg-transparent;
  }
  label {
    @apply text-sm font-medium;
  }
  fieldset {
    @apply border-base-content/20 rounded-xl border p-4;
  }
  legend {
    @apply px-2 text-sm font-medium;
  }

  /* Media */
  img {
    @apply h-auto max-w-full;
  }
  video {
    @apply max-w-full;
  }
  audio {
    @apply w-full;
  }
  figure {
    @apply flex flex-col;
  }
  figcaption {
    @apply text-base-content/50 mt-2 text-sm;
  }

  /* Semantic */
  header {
    @apply w-full;
  }
  footer {
    @apply w-full;
  }
  nav {
    @apply w-full;
  }
  main {
    @apply w-full;
  }
  section {
    @apply w-full;
  }
  article {
    @apply w-full;
  }
  aside {
    @apply w-full;
  }

  /* Misc */
  hr {
    @apply border-base-content/20 my-8;
  }
  details {
    @apply text-sm;
  }
  summary {
    @apply cursor-pointer font-medium;
  }
  dialog {
    @apply rounded-2xl p-6 shadow-xl;
  }
}
```
