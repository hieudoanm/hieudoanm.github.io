import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { resolveEmbed } from '@/components/templates/noteEmbeds';
import { parseNote } from '../note';
import { splitSegments } from '../markdown-segments';
import type { Note } from '../types';

const NOTES_DIR = join(process.cwd(), 'src', 'notes');

const collectNotes = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectNotes(path);
    }

    return entry.name.endsWith('.md') && entry.name !== 'TREE.md' ? [path] : [];
  });

const notes = collectNotes(NOTES_DIR).sort();

const readNote = (path: string): string => readFileSync(path, 'utf8');

const embedNames = (note: Note): string[] =>
  note.sections
    .flatMap((section) => splitSegments(section.body))
    .filter((segment) => segment.kind === 'embed')
    .map((segment) => (segment.kind === 'embed' ? segment.name : ''));

const DANGEROUS = /<script|<iframe|on[a-z]+\s*=|javascript:/i;

describe('every note on disk', () => {
  it('finds the full set of theory notes', () => {
    expect(notes.length).toBeGreaterThan(100);
  });

  it.each(notes)('%s parses into a complete note', (path) => {
    const note = parseNote(readNote(path));

    expect(note.title.trim()).not.toBe('');
    expect(note.sections.length).toBeGreaterThan(0);
  });

  it.each(notes)('%s references only registered embeds', (path) => {
    for (const name of embedNames(parseNote(readNote(path)))) {
      expect(() => resolveEmbed(name)).not.toThrow();
    }
  });

  it.each(notes)('%s carries no scriptable raw HTML', (path) => {
    expect(readNote(path)).not.toMatch(DANGEROUS);
  });

  it.each(notes)('%s keeps hrefs and labels non-empty', (path) => {
    const note = parseNote(readNote(path));
    const links = [...(note.links ?? []), ...(note.references ?? [])];

    for (const link of links) {
      expect(link.href.trim()).not.toBe('');
      expect(link.label.trim()).not.toBe('');
      expect(link.description.trim()).not.toBe('');
    }
  });

  it('names notes relatively so failures stay readable', () => {
    expect(relative(process.cwd(), notes[0])).toMatch(/^src\/notes\//);
  });
});
