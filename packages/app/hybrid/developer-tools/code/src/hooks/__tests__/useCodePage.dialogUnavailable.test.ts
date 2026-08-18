import { renderHook, act } from '@testing-library/react';
import { useCodePage } from '../useCodePage';

jest.mock('@tauri-apps/plugin-dialog', () => {
  throw new Error('dialog plugin unavailable');
});

jest.mock('@tauri-apps/plugin-fs', () => ({
  readDir: jest.fn(() => Promise.resolve([])),
  readTextFile: jest.fn(() => Promise.resolve('hello')),
  writeTextFile: jest.fn(() => Promise.resolve()),
  remove: jest.fn(() => Promise.resolve()),
  rename: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
}));

jest.mock('../useErrorModal', () => ({
  useErrorModal: jest.fn(() => ({
    error: null,
    showError: jest.fn(),
    hideError: jest.fn(),
  })),
}));

describe('useCodePage when the dialog plugin fails to load', () => {
  it('openFolder does nothing', async () => {
    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    expect(result.current.rootPath).toBeNull();
  });

  it('openFileDialog does nothing', async () => {
    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileDialog();
    });

    expect(result.current.tabs).toHaveLength(0);
  });

  it('saveFileAs does nothing even with an active tab', async () => {
    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/a.ts');
    });
    expect(result.current.activePath).toBe('/a.ts');

    await act(async () => {
      await result.current.saveFileAs();
    });

    expect(result.current.tabs.map((t) => t.path)).toEqual(['/a.ts']);
  });
});
