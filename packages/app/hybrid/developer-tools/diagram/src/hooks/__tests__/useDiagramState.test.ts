import { act, renderHook } from '@testing-library/react';
import { useDiagramState } from '@/hooks/useDiagramState';
import { DEFAULT_DIAGRAM } from '@/lib/default';

describe('useDiagramState', () => {
  beforeEach(() => window.localStorage.clear());

  it('starts with the default diagram when nothing is stored', () => {
    const { result } = renderHook(() => useDiagramState());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
    expect(result.current.parsed.errors).toEqual([]);
    expect(result.current.parsed.diagram.nodes.length).toBeGreaterThan(0);
  });

  it('loads stored text and persists edits', () => {
    window.localStorage.setItem('diagram-editor:text', 'node a: A');
    const { result } = renderHook(() => useDiagramState());
    expect(result.current.text).toBe('node a: A');

    act(() => result.current.setText('node b: B'));
    expect(window.localStorage.getItem('diagram-editor:text')).toBe(
      'node b: B'
    );
    expect(result.current.parsed.diagram.nodes[0].id).toBe('b');
  });

  it('recomputes the parse result on text changes', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('not valid'));
    expect(result.current.parsed.errors.length).toBe(1);
  });

  it('resets to the default diagram', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    act(() => result.current.reset());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
  });

  it('imports external text', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.importText('title: New\nnode x: X'));
    expect(result.current.text).toContain('title: New');
    expect(result.current.parsed.diagram.title).toBe('New');
  });

  it('falls back to the default when localStorage is unavailable', () => {
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('storage denied');
      });
    const { result } = renderHook(() => useDiagramState());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
    spy.mockRestore();
  });

  it('ignores storage write errors', () => {
    const spy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota exceeded');
      });
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    expect(result.current.parsed.diagram.nodes[0].id).toBe('a');
    spy.mockRestore();
  });

  it('undoes and redoes edits', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    act(() => result.current.setText('node b: B'));

    expect(result.current.canUndo).toBe(true);
    act(() => result.current.undo());
    expect(result.current.text).toBe('node a: A');
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.text).toBe('node b: B');
    expect(result.current.canRedo).toBe(false);
  });

  it('does not undo when there is no history', () => {
    const { result } = renderHook(() => useDiagramState());
    expect(result.current.canUndo).toBe(false);
    act(() => result.current.undo());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
  });

  it('does not redo after a fresh edit clears the redo stack', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    act(() => result.current.setText('node b: B'));
    act(() => result.current.undo());
    expect(result.current.text).toBe('node a: A');

    act(() => result.current.setText('node c: C'));
    expect(result.current.canRedo).toBe(false);
    act(() => result.current.redo());
    expect(result.current.text).toBe('node c: C');
  });

  it('coalesces consecutive typing into a single undo step', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node'));
    act(() => result.current.setText('node a'));
    act(() => result.current.setText('node a:'));

    act(() => result.current.undo());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
    expect(result.current.canUndo).toBe(false);
  });

  it('treats a non-continuation edit as a distinct history entry', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    act(() => result.current.setText('node b: B'));

    act(() => result.current.undo());
    expect(result.current.text).toBe('node a: A');
    act(() => result.current.undo());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
  });

  it('resets leave a history entry and can be undone', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.setText('node a: A'));
    act(() => result.current.reset());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);

    act(() => result.current.undo());
    expect(result.current.text).toBe('node a: A');
  });

  it('imported text participates in undo history', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.importText('title: New\nnode x: X'));
    act(() => result.current.undo());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
    expect(result.current.parsed.diagram.title).toBe('Web App Architecture');
  });

  it('reset on the default diagram is a no-op', () => {
    const { result } = renderHook(() => useDiagramState());
    act(() => result.current.reset());
    expect(result.current.text).toBe(DEFAULT_DIAGRAM);
    expect(result.current.canUndo).toBe(false);
  });
});
