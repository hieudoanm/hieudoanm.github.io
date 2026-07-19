import type { Note } from '@/lib/types';

const DAY = 86_400_000;
const NOW = 1_752_480_000_000;

export const seedNotes = (): Note[] => [
  {
    id: 'home',
    title: 'Home',
    content: `# Home

Welcome to your **vault**.

This is a minimal Obsidian-like notes app. Everything you write is stored
locally in your browser — nothing leaves your device.

## Getting started

- Create a note with the *New note* button.
- Link notes together with wikilinks like [[About]] or [[Philosophy]].
- Open the graph to see how your notes connect.
- Export any note as HTML, Markdown, or PDF.

## Try it

Head over to [[Markdown Basics]] for a formatting cheatsheet, or browse the
[[Vault]] to see the links from this note rendered as a graph.
`,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'about',
    title: 'About',
    content: `# About

This vault is a demonstration of a small but complete personal knowledge base.

It was inspired by [Obsidian](https://obsidian.md) and built as a hybrid
(web + desktop) app on top of Next.js, CodeMirror, and a force-directed graph
renderer.

See [[Philosophy]] for the ideas behind it, and [[Home]] to get oriented.
`,
    createdAt: NOW - DAY,
    updatedAt: NOW - DAY,
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    content: `# Philosophy

A knowledge base should make *thinking* easier, not harder.

## Principles

1. **Local first** — your notes belong to you, stored on your device.
2. **Plain text** — Markdown is portable, future-proof, and tool-friendly.
3. **Connected thinking** — wikilinks turn a pile of files into a web of
   ideas.

Read about the mechanics in [[Markdown Basics]] and the data model in
[[Vault]].
`,
    createdAt: NOW - 2 * DAY,
    updatedAt: NOW - 2 * DAY,
  },
  {
    id: 'markdown-basics',
    title: 'Markdown Basics',
    content: `# Markdown Basics

A quick cheatsheet for the syntax supported by this editor.

## Emphasis

- *italic*
- **bold**
- ~~strikethrough~~
- \`inline code\`

## Structure

### Headings

The table of contents panel is generated from headings like this one.

> A blockquote keeps a thought together.

1. Ordered lists
2. Stay in order

- Unordered lists
- Stay loose

---

## Links

External links look like [GitHub](https://github.com). Internal links use the
wikilink syntax and drive the graph: see [[Home]] or [[About]].

## Code

\`\`\`ts
const vault = 'local';
console.log(vault);
\`\`\`
`,
    createdAt: NOW - 3 * DAY,
    updatedAt: NOW - 3 * DAY,
  },
  {
    id: 'vault',
    title: 'Vault',
    content: `# Vault

The vault is a collection of plain-text Markdown notes, stored in a single
local JSON document.

## Structure

Every note has a title (derived from its first heading) and a body. Notes
reference each other through wikilinks — \`[[note title]]\` — which the graph
renders as edges between nodes.

## This note

It connects back to [[Home]], explains the format in [[Markdown Basics]], and
borrows ideas from [[Philosophy]].

Dangling links (targets that don't exist yet) are counted but not drawn, so
you always see what needs creating.
`,
    createdAt: NOW - 4 * DAY,
    updatedAt: NOW - 4 * DAY,
  },
  {
    id: 'todo',
    title: 'Todo',
    content: `# Todo

Things to explore next.

- [ ] Migrate the vault to the file system
- [ ] Add daily notes
- [ ] Write a plugin API
- [ ] Theme the reader in [[Markdown Basics]]
`,
    createdAt: NOW - 5 * DAY,
    updatedAt: NOW - 5 * DAY,
  },
  {
    id: 'ideas',
    title: 'Ideas',
    content: `# Ideas

A scratchpad for half-formed thoughts.

- A [[Philosophy]] page deserves a sequel.
- The [[Vault]] could support images.
- An offline [[Todo]] that syncs when you return.
`,
    createdAt: NOW - 6 * DAY,
    updatedAt: NOW - 6 * DAY,
  },
];
