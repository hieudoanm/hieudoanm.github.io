#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../src/notes', import.meta.url)));
const OUT = resolve(
  fileURLToPath(new URL('../src/data/seed.gen.json', import.meta.url))
);

const FRONTMATTER_RE = /^---[\s\S]*?---\s*\n?/;
const HEADING_RE = /^\s*#\s+(.+)$/m;

const stripFrontmatter = (content) => content.replace(FRONTMATTER_RE, '');

const resolveTitle = (content, fallback) => {
  const heading = content.match(HEADING_RE);
  if (heading) return heading[1].trim();
  const firstLine = content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  return firstLine ? firstLine.slice(0, 48) : fallback;
};

const collectFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectFiles(path);
    if (entry.isFile() && entry.name.endsWith('.md')) return [path];
    return [];
  });

const notes = collectFiles(ROOT).map((path) => {
  const stat = statSync(path);
  const rel = relative(ROOT, path).slice(0, -'.md'.length);
  const base = basename(path).slice(0, -'.md'.length);
  const content = stripFrontmatter(readFileSync(path, 'utf8'));
  return {
    path,
    rel,
    base,
    content,
    title: resolveTitle(content, rel),
    createdAt: stat.mtimeMs,
    updatedAt: stat.mtimeMs,
  };
});

const byBase = new Map();
for (const note of notes) {
  const group = byBase.get(note.base) ?? [];
  group.push(note);
  byBase.set(note.base, group);
}

for (const group of byBase.values()) {
  if (group.length === 1) {
    group[0].id = group[0].base;
  } else {
    group.sort(
      (a, b) =>
        a.rel.split('/').length - b.rel.split('/').length ||
        a.rel.localeCompare(b.rel)
    );
    group[0].id = group[0].base;
    for (const note of group.slice(1)) note.id = note.rel;
  }
}

notes.sort((a, b) => a.id.localeCompare(b.id));

const ids = new Set(notes.map((note) => note.id));
if (ids.size !== notes.length) {
  const duplicates = [
    ...new Set(
      notes
        .filter(
          (note, index) => notes.findIndex((o) => o.id === note.id) !== index
        )
        .map((note) => note.id)
    ),
  ];
  throw new Error(`Duplicate note ids: ${duplicates.join(', ')}`);
}

writeFileSync(
  OUT,
  `${JSON.stringify(
    notes.map(({ path: _path, base: _base, ...note }) => note),
    null,
    2
  )}\n`
);
console.log(`Generated ${OUT} with ${notes.length} notes.`);
