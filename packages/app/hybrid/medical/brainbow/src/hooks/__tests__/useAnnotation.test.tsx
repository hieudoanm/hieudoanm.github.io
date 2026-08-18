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

describe('useAnnotation layers', () => {
  it('adds a layer and makes it active', () => {
    const { result } = renderHook(() => useAnnotation());
    const before = result.current.layers.length;
    act(() => result.current.addLayer());
    expect(result.current.layers).toHaveLength(before + 1);
    expect(result.current.activeLayer?.name).toBe(`Layer ${before + 1}`);
  });

  it('removes the active layer and selects the first remaining', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addLayer());
    const second = result.current.layers[1].id;
    act(() => result.current.removeLayer(second));
    expect(result.current.layers).toHaveLength(1);
    expect(result.current.activeLayerId).toBe(result.current.layers[0].id);
  });

  it('keeps the current layer active when removing another one', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addLayer());
    const first = result.current.layers[0].id;
    const second = result.current.layers[1].id;
    act(() => result.current.setActiveLayer(second));
    act(() => result.current.removeLayer(first));
    expect(result.current.activeLayerId).toBe(second);
  });

  it('ignores removing the last remaining layer', () => {
    const { result } = renderHook(() => useAnnotation());
    const before = result.current.layers.length;
    act(() => result.current.removeLayer(result.current.activeLayerId!));
    expect(result.current.layers).toHaveLength(before);
  });

  it('toggles layer visibility and sets the color', () => {
    const { result } = renderHook(() => useAnnotation());
    const id = result.current.activeLayerId;
    act(() => result.current.toggleLayerVisibility(id, false));
    expect(result.current.activeLayer?.visible).toBe(false);
    act(() => result.current.setLayerColor(id, '#123456'));
    expect(result.current.activeLayer?.color).toBe('#123456');
  });

  it('selects a different active layer', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addLayer());
    const second = result.current.layers[1].id;
    act(() => result.current.setActiveLayer(second));
    expect(result.current.activeLayerId).toBe(second);
  });

  it('removes a single annotation as one history step', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    act(() => result.current.addAnnotation(annotation('a2')));
    act(() => result.current.removeAnnotation('a1'));
    expect(result.current.activeLayer?.annotations.map((a) => a.id)).toEqual([
      'a2',
    ]);
    act(() => result.current.undo());
    expect(result.current.activeLayer?.annotations).toHaveLength(2);
  });

  it('does nothing when removing an empty id list', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    act(() => result.current.removeAnnotations([]));
    expect(result.current.activeLayer?.annotations).toHaveLength(1);
    expect(result.current.canUndo).toBe(true);
  });

  it('replaces the layers and clears history', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    expect(result.current.canUndo).toBe(true);
    act(() =>
      result.current.replaceLayers([
        {
          id: 'fresh',
          name: 'Fresh',
          color: '#ffffff',
          visible: true,
          annotations: [],
        },
      ])
    );
    expect(result.current.layers).toHaveLength(1);
    expect(result.current.layers[0].id).toBe('fresh');
    expect(result.current.canUndo).toBe(false);
  });

  it('restores the default layer when replacing with an empty list', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.replaceLayers([]));
    expect(result.current.layers[0].id).toBe('layer-neurons');
  });

  it('does nothing when undoing with no history', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.undo());
    expect(result.current.canUndo).toBe(false);
  });

  it('redoes an undone step', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.addAnnotation(annotation('a1')));
    act(() => result.current.undo());
    expect(result.current.canRedo).toBe(true);
    act(() => result.current.redo());
    expect(result.current.activeLayer?.annotations).toHaveLength(1);
    expect(result.current.canRedo).toBe(false);
  });

  it('does nothing when redoing with no future', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.redo());
    expect(result.current.canRedo).toBe(false);
  });

  it('switches the drawing tool', () => {
    const { result } = renderHook(() => useAnnotation());
    act(() => result.current.setTool('polygon'));
    expect(result.current.tool).toBe('polygon');
  });
});
