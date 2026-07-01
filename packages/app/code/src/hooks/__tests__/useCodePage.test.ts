import { renderHook, act, waitFor } from '@testing-library/react';
import { useCodePage } from '../useCodePage';

const mockReadDir = jest.fn();
const mockReadTextFile = jest.fn();
const mockWriteTextFile = jest.fn();
const mockRemove = jest.fn();
const mockRename = jest.fn();
const mockMkdir = jest.fn();
const mockDialogOpen = jest.fn();
const mockShowError = jest.fn();

jest.mock('@tauri-apps/plugin-fs', () => ({
  readDir: (...args: unknown[]) => mockReadDir(...args),
  readTextFile: (...args: unknown[]) => mockReadTextFile(...args),
  writeTextFile: (...args: unknown[]) => mockWriteTextFile(...args),
  remove: (...args: unknown[]) => mockRemove(...args),
  rename: (...args: unknown[]) => mockRename(...args),
  mkdir: (...args: unknown[]) => mockMkdir(...args),
}));

jest.mock('@tauri-apps/plugin-dialog', () => ({
  open: (...args: unknown[]) => mockDialogOpen(...args),
}));

jest.mock('../../components/ErrorModal', () => ({
  useErrorModal: jest.fn(() => ({
    error: null,
    showError: mockShowError,
    hideError: jest.fn(),
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCodePage', () => {
  it('has correct initial state', () => {
    const { result } = renderHook(() => useCodePage());

    expect(result.current.root).toBeNull();
    expect(result.current.tabs).toEqual([]);
    expect(result.current.activePath).toBeNull();
    expect(result.current.sidebarOpen).toBe(true);
    expect(result.current.showFilePrompt).toBe(false);
    expect(result.current.pendingDelete).toBeNull();
    expect(result.current.dirty).toBe(false);
    expect(result.current.dirtyTabs).toEqual([]);
    expect(result.current.activeTab).toBeUndefined();
  });

  it('addFile sets showFilePrompt to true', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.addFile());

    expect(result.current.showFilePrompt).toBe(true);
  });

  it('closeTab removes a tab and updates activePath', async () => {
    mockReadTextFile.mockResolvedValue('content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/a.ts');
    });

    await act(async () => {
      await result.current.openFileFromTree('/b.ts');
    });

    act(() => {
      result.current.closeTab('/a.ts');
    });

    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].path).toBe('/b.ts');
    expect(result.current.activePath).toBe('/b.ts');
  });

  it('closeTab clears activePath when last tab is closed', async () => {
    mockReadTextFile.mockResolvedValue('content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/a.ts');
    });

    act(() => {
      result.current.closeTab('/a.ts');
    });

    expect(result.current.tabs).toHaveLength(0);
    expect(result.current.activePath).toBeNull();
  });

  it('handleChange updates content of the active tab', async () => {
    mockReadTextFile.mockResolvedValue('content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/file.ts');
    });

    act(() => {
      result.current.handleChange('new content');
    });

    expect(result.current.tabs[0].content).toBe('new content');
    expect(result.current.dirty).toBe(true);
    expect(result.current.dirtyTabs[0].dirty).toBe(true);
  });

  it('sets sidebar state via setSidebarOpen', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.setSidebarOpen(false));
    expect(result.current.sidebarOpen).toBe(false);
  });

  it('sets cursor position via setCursorPos', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.setCursorPos({ line: 10, col: 5 }));
    expect(result.current.cursorPos).toEqual({ line: 10, col: 5 });
  });

  it('sets pendingDelete via setPendingDelete', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.setPendingDelete('/path/file.ts'));
    expect(result.current.pendingDelete).toBe('/path/file.ts');
  });

  it('sets showFilePrompt via setShowFilePrompt', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.setShowFilePrompt(true));
    expect(result.current.showFilePrompt).toBe(true);
  });

  it('openFileFromTree reads file and adds tab', async () => {
    mockReadTextFile.mockResolvedValueOnce('file content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/path/file.ts');
    });

    expect(mockReadTextFile).toHaveBeenCalledWith('/path/file.ts');
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].path).toBe('/path/file.ts');
    expect(result.current.tabs[0].content).toBe('file content');
    expect(result.current.tabs[0].original).toBe('file content');
    expect(result.current.activePath).toBe('/path/file.ts');
  });

  it('openFileFromTree reuses existing tab', async () => {
    mockReadTextFile.mockResolvedValue('content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/file.ts');
    });

    mockReadTextFile.mockClear();

    await act(async () => {
      await result.current.openFileFromTree('/file.ts');
    });

    expect(mockReadTextFile).not.toHaveBeenCalled();
    expect(result.current.tabs).toHaveLength(1);
  });

  it('saveFile writes file and updates original when dirty', async () => {
    mockReadTextFile.mockResolvedValue('initial');
    mockWriteTextFile.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/file.ts');
    });

    act(() => {
      result.current.handleChange('modified content');
    });

    expect(result.current.dirty).toBe(true);

    await act(async () => {
      await result.current.saveFile();
    });

    expect(mockWriteTextFile).toHaveBeenCalledWith(
      '/file.ts',
      'modified content'
    );
    expect(result.current.tabs[0].original).toBe('modified content');
    expect(result.current.dirty).toBe(false);
  });

  it('saveFile does nothing when not dirty', async () => {
    mockReadTextFile.mockResolvedValue('initial');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileFromTree('/file.ts');
    });

    await act(async () => {
      await result.current.saveFile();
    });

    expect(mockWriteTextFile).not.toHaveBeenCalled();
  });

  it('openFolder reads directory and builds tree', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([
      { name: 'src', isDirectory: true },
      { name: 'README.md', isDirectory: false },
    ]);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    expect(result.current.rootPath).toBe('/project');
    expect(result.current.root).not.toBeNull();
    expect(result.current.root!.name).toBe('project');
    expect(result.current.root!.children).toHaveLength(2);
    expect(result.current.root!.children![0].name).toBe('src');
    expect(result.current.root!.children![0].type).toBe('dir');
    expect(result.current.root!.children![1].name).toBe('README.md');
    expect(result.current.root!.children![1].type).toBe('file');
  });

  it('openFolder skips dot files and SKIP_DIRS', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([
      { name: '.git', isDirectory: true },
      { name: 'node_modules', isDirectory: true },
      { name: '.env', isDirectory: false },
      { name: 'src', isDirectory: true },
    ]);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    expect(result.current.root!.children).toHaveLength(1);
    expect(result.current.root!.children![0].name).toBe('src');
  });

  it('loadDirChildren reads subdirectory and merges into tree', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([{ name: 'src', isDirectory: true }]);
    mockReadDir.mockResolvedValueOnce([
      { name: 'index.ts', isDirectory: false },
      { name: 'app.ts', isDirectory: false },
    ]);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    await act(async () => {
      await result.current.loadDirChildren('/project/src');
    });

    const srcNode = result.current.root!.children![0];
    expect(srcNode.children).toHaveLength(2);
    expect(srcNode.children![0].name).toBe('app.ts');
    expect(srcNode.children![1].name).toBe('index.ts');
  });

  it('deleteFile removes file and tab', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([
      { name: 'a.ts', isDirectory: false },
      { name: 'b.ts', isDirectory: false },
    ]);
    mockRemove.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    const filePath = '/project/a.ts';

    await act(async () => {
      await result.current.openFileFromTree(filePath);
    });

    await act(async () => {
      await result.current.deleteFile(filePath);
    });

    expect(mockRemove).toHaveBeenCalledWith(filePath);
    expect(result.current.root!.children).toHaveLength(1);
    expect(result.current.root!.children![0].name).toBe('b.ts');
    expect(result.current.tabs).toHaveLength(0);
  });

  it('handleCreateFile creates file with writeTextFile', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([{ name: 'src', isDirectory: true }]);
    mockWriteTextFile.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    await act(async () => {
      await result.current.handleCreateFile('newfile.ts');
    });

    expect(mockWriteTextFile).toHaveBeenCalledWith('/project/newfile.ts', '');
    expect(result.current.root!.children).toHaveLength(2);
    expect(result.current.root!.children![0].name).toBe('src');
    expect(result.current.root!.children![0].type).toBe('dir');
    expect(result.current.root!.children![1].name).toBe('newfile.ts');
    expect(result.current.root!.children![1].type).toBe('file');
  });

  it('handleCreateFile shows error when file already exists', async () => {
    mockDialogOpen.mockResolvedValueOnce('/project');
    mockReadDir.mockResolvedValueOnce([
      { name: 'exists.ts', isDirectory: false },
    ]);

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFolder();
    });

    await act(async () => {
      await result.current.handleCreateFile('exists.ts');
    });

    expect(mockShowError).toHaveBeenCalledWith({
      message: '"exists.ts" already exists',
    });
    expect(mockWriteTextFile).not.toHaveBeenCalled();
  });

  it('openFileDialog opens dialog and loads file', async () => {
    mockDialogOpen.mockResolvedValueOnce('/selected/file.ts');
    mockReadTextFile.mockResolvedValueOnce('dialog file content');

    const { result } = renderHook(() => useCodePage());

    await act(async () => {
      await result.current.openFileDialog();
    });

    expect(mockDialogOpen).toHaveBeenCalledWith({ multiple: false });
    expect(result.current.tabs).toHaveLength(1);
    expect(result.current.tabs[0].path).toBe('/selected/file.ts');
    expect(result.current.tabs[0].content).toBe('dialog file content');
    expect(result.current.activePath).toBe('/selected/file.ts');
  });

  describe('new features', () => {
    it('toggleTheme toggles between dim and light', () => {
      const { result } = renderHook(() => useCodePage());
      expect(result.current.theme).toBe('dim');

      act(() => result.current.toggleTheme());
      expect(result.current.theme).toBe('light');

      act(() => result.current.toggleTheme());
      expect(result.current.theme).toBe('dim');
    });

    it('toggleTheme sets data-theme attribute on document', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => result.current.toggleTheme());
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      act(() => result.current.toggleTheme());
      expect(document.documentElement.getAttribute('data-theme')).toBe('dim');
    });

    it('toggleWordWrap toggles wordWrap state', () => {
      const { result } = renderHook(() => useCodePage());
      expect(result.current.wordWrap).toBe(false);

      act(() => result.current.toggleWordWrap());
      expect(result.current.wordWrap).toBe(true);

      act(() => result.current.toggleWordWrap());
      expect(result.current.wordWrap).toBe(false);
    });

    it('handleRename renames file in filesystem and updates tabs', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockRename.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.openFileFromTree('/project/a.ts');
      });

      act(() => result.current.startRename('/project/a.ts'));
      expect(result.current.renameTarget).toBe('/project/a.ts');
      expect(result.current.showRenamePrompt).toBe(true);

      await act(async () => {
        await result.current.handleRename('b.ts');
      });

      expect(mockRename).toHaveBeenCalledWith('/project/a.ts', '/project/b.ts');
      expect(result.current.tabs[0].path).toBe('/project/b.ts');
    });

    it('handleCreateDir creates directory with mkdir', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'src', isDirectory: true }]);
      mockMkdir.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.setShowDirPrompt(true));
      expect(result.current.showDirPrompt).toBe(true);

      await act(async () => {
        await result.current.handleCreateDir('new-folder');
      });

      expect(mockMkdir).toHaveBeenCalledWith('/project/new-folder');
    });

    it('handleDuplicate copies file content to new path', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockReadTextFile.mockResolvedValueOnce('file content');
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.startDuplicate('/project/a.ts'));
      expect(result.current.duplicateTarget).toBe('/project/a.ts');

      await act(async () => {
        await result.current.handleDuplicate('copy-a.ts');
      });

      expect(mockReadTextFile).toHaveBeenCalledWith('/project/a.ts');
      expect(mockWriteTextFile).toHaveBeenCalledWith(
        '/project/copy-a.ts',
        'file content'
      );
    });

    it('sets showQuickOpen via setShowQuickOpen', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => result.current.setShowQuickOpen(true));
      expect(result.current.showQuickOpen).toBe(true);
    });

    it('sets showGoToLine via setShowGoToLine', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => result.current.setShowGoToLine(true));
      expect(result.current.showGoToLine).toBe(true);
    });

    it('openContextMenu sets contextMenu state', () => {
      const { result } = renderHook(() => useCodePage());
      const mockEvent = {
        clientX: 100,
        clientY: 200,
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent;

      act(() =>
        result.current.openContextMenu(mockEvent, '/path', 'file.ts', false)
      );

      expect(result.current.contextMenu).toEqual({
        x: 100,
        y: 200,
        path: '/path',
        name: 'file.ts',
        isDir: false,
      });
    });

    it('closeContextMenu clears contextMenu state', () => {
      const { result } = renderHook(() => useCodePage());
      const mockEvent = {
        clientX: 100,
        clientY: 200,
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent;

      act(() =>
        result.current.openContextMenu(mockEvent, '/path', 'file.ts', false)
      );
      expect(result.current.contextMenu).not.toBeNull();

      act(() => result.current.closeContextMenu());
      expect(result.current.contextMenu).toBeNull();
    });

    it('globalSearching initial state is false', () => {
      const { result } = renderHook(() => useCodePage());
      expect(result.current.globalSearching).toBe(false);
    });

    it('showDirPrompt initial state is false', () => {
      const { result } = renderHook(() => useCodePage());
      expect(result.current.showDirPrompt).toBe(false);
    });
  });
});
