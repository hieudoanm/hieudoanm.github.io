import type { Note } from '@/lib/types';
import seedJson from './seed.gen.json';

export const seedNotes = (): Note[] => seedJson.map((note) => ({ ...note }));
