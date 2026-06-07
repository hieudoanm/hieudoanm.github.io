import { renderHook } from '@testing-library/react';
import { useDraftRestore, useDraftSave } from '../useDraftPersistence';
import { STORAGE_KEY, INITIAL_MARKDOWN } from '../../constants';

describe('useDraftRestore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('does not call onRestore when no data in localStorage', () => {
    const onRestore = jest.fn();
    renderHook(() => useDraftRestore(onRestore));
    expect(onRestore).not.toHaveBeenCalled();
  });

  it('calls onRestore when markdown differs from initial', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        markdown: '# Custom',
        fontId: 'sans',
        viewMode: 'split',
        fileName: 'doc.md',
        showLineNumbers: true,
      })
    );
    const onRestore = jest.fn();
    renderHook(() => useDraftRestore(onRestore));
    expect(onRestore).toHaveBeenCalledWith({
      markdown: '# Custom',
      fontId: 'sans',
      viewMode: 'split',
      fileName: 'doc.md',
      showLineNumbers: true,
      restored: true,
    });
  });

  it('does not call onRestore when markdown equals initial', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        markdown: INITIAL_MARKDOWN,
        fontId: 'sans',
        viewMode: 'split',
        fileName: 'untitled.md',
        showLineNumbers: false,
      })
    );
    const onRestore = jest.fn();
    renderHook(() => useDraftRestore(onRestore));
    expect(onRestore).not.toHaveBeenCalled();
  });

  it('handles corrupted JSON gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json');
    const onRestore = jest.fn();
    renderHook(() => useDraftRestore(onRestore));
    expect(onRestore).not.toHaveBeenCalled();
  });
});

describe('useDraftSave', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves markdown to localStorage', () => {
    renderHook(() => useDraftSave('# Hello', 'sans', 'split', 'doc.md', false));
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.markdown).toBe('# Hello');
  });

  it('does not save when markdown is empty', () => {
    renderHook(() => useDraftSave('', 'sans', 'split', 'doc.md', false));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
