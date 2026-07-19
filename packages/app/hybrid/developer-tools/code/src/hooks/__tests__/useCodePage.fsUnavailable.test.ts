import { renderHook, act } from '@testing-library/react';
import { useCodePage } from '../useCodePage';

jest.mock('@tauri-apps/plugin-fs', () => {
  throw new Error('fs plugin unavailable');
});

jest.mock('@tauri-apps/plugin-dialog', () => ({
  open: jest.fn(() => Promise.resolve('/project')),
  save: jest.fn(),
}));

jest.mock('../useErrorModal', () => ({
  useErrorModal: jest.fn(() => ({
    error: null,
    showError: jest.fn(),
    hideError: jest.fn(),
  })),
}));

afterEach(() => {
  jest.useRealTimers();
});

describe('useCodePage when the fs plugin fails to load', () => {
  it('no-ops every fs-backed operation', async () => {
    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });
    expect(result.current.rootPath).toBe('/project');

    await act(async () => {
      await result.current.loadDirChildren('/project');
      await result.current.openFileFromTree('/a.ts');
      await result.current.deleteFile('/a.ts');
      await result.current.handleCreateFile('new.ts');
      await result.current.handleCreateDir('new-dir');
      await result.current.searchFiles('query');
      await result.current.collectAllFiles();
    });

    result.current.setRenameTarget('/project/a.ts');
    result.current.setShowRenamePrompt(true);
    await act(async () => {
      await result.current.handleRename('b.ts');
    });
    result.current.setDuplicateTarget('/project/a.ts');
    result.current.setShowDuplicatePrompt(true);
    await act(async () => {
      await result.current.handleDuplicate('c.ts');
    });

    expect(result.current.root).toBeNull();
    expect(result.current.tabs).toEqual([]);
  });

  it('skips directory watching when the fs plugin is unavailable', async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });
    expect(result.current.rootPath).toBe('/project');

    await act(async () => {
      await jest.runOnlyPendingTimersAsync();
    });

    expect(result.current.root).toBeNull();
  });
});
