import { act, renderHook } from '@testing-library/react';
import { useAnnotation } from '@/hooks/useAnnotation';
import type { Annotation } from '@/types/annotation';

const annotation = (id: string): Annotation => ({
  id,
  kind: 'polygon',
  points: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ],
});

describe('useAnnotation', () => {
  it('removes several annotations as a single undo step', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    act(() => result.current.addAnnotation(annotation('a2')));
    act(() => result.current.addAnnotation(annotation('a3')));

    act(() => result.current.removeAnnotations(['a1', 'a2']));

    const ids = result.current.activeLayer?.annotations.map(
      (entry) => entry.id
    );
    expect(ids).toEqual(['a3']);
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());

    const restored = result.current.activeLayer?.annotations.map(
      (entry) => entry.id
    );
    expect(restored).toEqual(expect.arrayContaining(['a1', 'a2', 'a3']));
  });

  it('does not push history when nothing is removed', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.removeAnnotations(['missing']));
    const ids = result.current.activeLayer?.annotations.map(
      (entry) => entry.id
    );
    expect(ids).toEqual(['a1']);
    expect(result.current.activeLayer?.annotations).toHaveLength(1);
  });
});
