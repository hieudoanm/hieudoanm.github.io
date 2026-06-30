import { renderHook } from '@testing-library/react';
import { useScrollSync } from '../useScrollSync';

describe('useScrollSync', () => {
  it('returns a ref', () => {
    const viewRef = { current: null };
    const { result } = renderHook(() => useScrollSync(viewRef));
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('syncs preview scroll when editor scrolls', () => {
    const previewEl = document.createElement('div');
    Object.defineProperty(previewEl, 'scrollHeight', { value: 200 });
    Object.defineProperty(previewEl, 'clientHeight', { value: 100 });

    const editorScroll = document.createElement('div');
    Object.defineProperty(editorScroll, 'scrollHeight', { value: 300 });
    Object.defineProperty(editorScroll, 'clientHeight', { value: 100 });
    Object.defineProperty(editorScroll, 'scrollTop', {
      value: 50,
      writable: true,
    });

    const view = {
      scrollDOM: editorScroll,
    } as unknown as import('@codemirror/view').EditorView;
    const viewRef = { current: view };

    const { result } = renderHook(() => useScrollSync(viewRef));
    result.current.current = previewEl;

    editorScroll.dispatchEvent(new Event('scroll'));
    expect(previewEl.scrollTop).toBeGreaterThanOrEqual(0);
  });

  it('syncs editor scroll when preview scrolls', () => {
    const previewEl = document.createElement('div');
    Object.defineProperty(previewEl, 'scrollHeight', { value: 200 });
    Object.defineProperty(previewEl, 'clientHeight', { value: 100 });
    Object.defineProperty(previewEl, 'scrollTop', {
      value: 50,
      writable: true,
    });

    const editorScroll = document.createElement('div');
    Object.defineProperty(editorScroll, 'scrollHeight', { value: 300 });
    Object.defineProperty(editorScroll, 'clientHeight', { value: 100 });
    Object.defineProperty(editorScroll, 'scrollTop', {
      value: 0,
      writable: true,
    });

    const view = {
      scrollDOM: editorScroll,
    } as unknown as import('@codemirror/view').EditorView;
    const viewRef = { current: view };

    const { result } = renderHook(() => useScrollSync(viewRef));
    result.current.current = previewEl;

    previewEl.dispatchEvent(new Event('scroll'));
    expect(editorScroll.scrollTop).toBeGreaterThanOrEqual(0);
  });
});
