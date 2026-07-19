import { loadNotes, saveNotes, STORAGE_KEY } from '@/lib/storage';
import { seedNotes } from '@/data/seed';
import type { Note } from '@/lib/types';

const customNote: Note = {
  id: 'custom',
  title: 'Custom',
  content: '# Custom\n\nSeeded from the test.',
  createdAt: 42,
  updatedAt: 43,
};

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns seed notes when nothing is stored', () => {
    expect(loadNotes()).toEqual(seedNotes());
  });

  it('round-trips saved notes', () => {
    saveNotes([customNote]);
    expect(loadNotes()).toEqual([customNote]);
  });

  it('seeds when the stored payload is corrupt', () => {
    window.localStorage.setItem(STORAGE_KEY, 'not-json{');
    expect(loadNotes()).toEqual(seedNotes());
  });

  it('seeds when the stored payload is an empty array', () => {
    window.localStorage.setItem(STORAGE_KEY, '[]');
    expect(loadNotes()).toEqual(seedNotes());
  });

  it('filters invalid entries out of the stored payload', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ nope: true }, customNote])
    );
    expect(loadNotes()).toEqual([customNote]);
  });

  it('seeds when every stored entry is invalid', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([{ nope: true }]));
    expect(loadNotes()).toEqual(seedNotes());
  });

  it('warns and keeps the vault when persisting fails', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota');
      });
    saveNotes([customNote]);
    expect(warn).toHaveBeenCalledWith(
      '[Storage] failed to save vault',
      expect.any(Error)
    );
    setItem.mockRestore();
    warn.mockRestore();
  });
});
