import { renderHook, act, waitFor } from '@testing-library/react';
import { useCodePage } from '../useCodePage';

const mockReadDir = jest.fn();
const mockReadTextFile = jest.fn();
const mockWriteTextFile = jest.fn();
const mockRemove = jest.fn();
const mockRename = jest.fn();
const mockMkdir = jest.fn();
const mockDialogOpen = jest.fn();
const mockDialogSave = jest.fn();
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
  save: (...args: unknown[]) => mockDialogSave(...args),
}));

jest.mock('../useErrorModal', () => ({
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
    expect(result.current.sidebarState).toBe('explorer');
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

  it('sets sidebar state via setSidebarState', () => {
    const { result } = renderHook(() => useCodePage());

    act(() => result.current.setSidebarState('closed'));
    expect(result.current.sidebarState).toBe('closed');
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
    it('toggleTheme toggles between dim and winter', () => {
      const { result } = renderHook(() => useCodePage());
      expect(result.current.theme).toBe('code-dark');

      act(() => result.current.toggleTheme());
      expect(result.current.theme).toBe('code-light');

      act(() => result.current.toggleTheme());
      expect(result.current.theme).toBe('code-dark');
    });

    it('toggleTheme sets data-theme attribute on document', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => result.current.toggleTheme());
      expect(document.documentElement.getAttribute('data-theme')).toBe(
        'code-light'
      );

      act(() => result.current.toggleTheme());
      expect(document.documentElement.getAttribute('data-theme')).toBe('code-dark');
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

  describe('tab lifecycle', () => {
    it('closeTab activates the neighboring tab when closing the active tab', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => {
        result.current.closeTab('/b.ts');
      });

      expect(result.current.tabs).toHaveLength(1);
      expect(result.current.tabs[0].path).toBe('/a.ts');
      expect(result.current.activePath).toBe('/a.ts');
    });

    it('closeAllTabs clears tabs and the active path', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => {
        result.current.closeAllTabs();
      });

      expect(result.current.tabs).toEqual([]);
      expect(result.current.activePath).toBeNull();
    });

    it('closeOthersTab keeps only the selected tab', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/c.ts');
      });

      act(() => {
        result.current.closeOthersTab('/b.ts');
      });

      expect(result.current.tabs).toHaveLength(1);
      expect(result.current.tabs[0].path).toBe('/b.ts');
      expect(result.current.activePath).toBe('/b.ts');
    });
  });

  describe('editor state', () => {
    it('toggleAutoSave toggles autoSave state', () => {
      const { result } = renderHook(() => useCodePage());

      expect(result.current.autoSave).toBe(true);
      act(() => result.current.toggleAutoSave());
      expect(result.current.autoSave).toBe(false);
      act(() => result.current.toggleAutoSave());
      expect(result.current.autoSave).toBe(true);
    });

    it('handleZoomIn caps at 40 and handleZoomOut floors at 8', () => {
      const { result } = renderHook(() => useCodePage());

      for (let i = 0; i < 30; i++) {
        act(() => {
          window.dispatchEvent(
            new KeyboardEvent('keydown', { key: '=', metaKey: true })
          );
        });
      }
      expect(result.current.fontSize).toBe(40);

      for (let i = 0; i < 40; i++) {
        act(() => {
          window.dispatchEvent(
            new KeyboardEvent('keydown', { key: '-', metaKey: true })
          );
        });
      }
      expect(result.current.fontSize).toBe(8);
    });

    it('registerTabAccess records recently accessed tabs', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => {
        result.current.registerTabAccess('/a.ts');
      });

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Tab', ctrlKey: true })
        );
      });

      expect(result.current.activePath).toBe('/b.ts');
    });

    it('handleGoToLine hides the go-to-line prompt', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => result.current.setShowGoToLine(true));
      expect(result.current.showGoToLine).toBe(true);

      act(() => {
        result.current.handleGoToLine(5);
      });
      expect(result.current.showGoToLine).toBe(false);
    });
  });

  describe('saveFileAs', () => {
    it('writes a copy of the active tab to the chosen path', async () => {
      mockReadTextFile.mockResolvedValue('content');
      mockDialogSave.mockResolvedValueOnce('/new/path.ts');
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      await act(async () => {
        await result.current.saveFileAs();
      });

      expect(mockDialogSave).toHaveBeenCalledWith({ defaultPath: 'a.ts' });
      expect(mockWriteTextFile).toHaveBeenCalledWith('/new/path.ts', 'content');
      expect(result.current.tabs).toHaveLength(2);
      expect(result.current.tabs[1].path).toBe('/new/path.ts');
      expect(result.current.tabs[1].original).toBe('content');
      expect(result.current.activePath).toBe('/new/path.ts');
    });

    it('does nothing without an active tab', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.saveFileAs();
      });

      expect(mockDialogSave).not.toHaveBeenCalled();
      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('does nothing when the save dialog is cancelled', async () => {
      mockReadTextFile.mockResolvedValue('content');
      mockDialogSave.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      await act(async () => {
        await result.current.saveFileAs();
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });
  });

  describe('saveFile edge cases', () => {
    it('does nothing without an active tab', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.saveFile();
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('skips writing when trimming trailing whitespace equals the original', async () => {
      mockReadTextFile.mockResolvedValue('abc');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => {
        result.current.handleChange('abc  ');
      });

      await act(async () => {
        await result.current.saveFile();
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
      expect(result.current.dirty).toBe(true);
    });
  });

  describe('prompt flows', () => {
    it('handleRename closes the prompt when the name is unchanged', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.startRename('/project/a.ts'));
      await act(async () => {
        await result.current.handleRename('a.ts');
      });

      expect(mockRename).not.toHaveBeenCalled();
      expect(result.current.showRenamePrompt).toBe(false);
      expect(result.current.renameTarget).toBeNull();
    });

    it('handleRename does nothing without a target or root path', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.handleRename('b.ts');
      });

      expect(mockRename).not.toHaveBeenCalled();
    });

    it('handleRename keeps the tab path when the rename fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockRename.mockRejectedValueOnce(new Error('denied'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      await act(async () => {
        await result.current.openFileFromTree('/project/a.ts');
      });

      act(() => result.current.startRename('/project/a.ts'));
      await act(async () => {
        await result.current.handleRename('b.ts');
      });

      expect(result.current.tabs[0].path).toBe('/project/a.ts');
      expect(result.current.showRenamePrompt).toBe(true);
    });

    it('handleDuplicate does nothing without a target or root path', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.handleDuplicate('x.ts');
      });

      expect(mockReadTextFile).not.toHaveBeenCalled();
    });

    it('handleDuplicate does nothing when reading the source fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockReadTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.startDuplicate('/project/a.ts'));
      await act(async () => {
        await result.current.handleDuplicate('copy.ts');
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('handleCreateDir does nothing without a root path', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.handleCreateDir('x');
      });

      expect(mockMkdir).not.toHaveBeenCalled();
    });

    it('handleCreateDir keeps the prompt open when mkdir fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([]);
      mockMkdir.mockRejectedValueOnce(new Error('denied'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.setShowDirPrompt(true));
      await act(async () => {
        await result.current.handleCreateDir('x');
      });

      expect(result.current.showDirPrompt).toBe(true);
    });

    it('handleCreateFile does nothing without a root path', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.handleCreateFile('a.ts');
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('handleCreateFile keeps the tree unchanged when writing fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([]);
      mockWriteTextFile.mockRejectedValueOnce(new Error('denied'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.handleCreateFile('a.ts');
      });

      expect(result.current.root!.children).toHaveLength(0);
      expect(mockShowError).toHaveBeenCalled();
    });

    it('deleteFile keeps the tree when removal fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockRemove.mockRejectedValueOnce(new Error('denied'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.deleteFile('/project/a.ts');
      });

      expect(result.current.root!.children).toHaveLength(1);
    });
  });

  describe('dialog cancellations', () => {
    it('openFolder does nothing when the dialog is cancelled', async () => {
      mockDialogOpen.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      expect(result.current.rootPath).toBeNull();
      expect(mockReadDir).not.toHaveBeenCalled();
    });

    it('openFileDialog does nothing when the dialog is cancelled', async () => {
      mockDialogOpen.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileDialog();
      });

      expect(result.current.tabs).toHaveLength(0);
    });

    it('openFileFromTree does not open a tab when reading fails', async () => {
      mockReadTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      expect(result.current.tabs).toHaveLength(0);
    });
  });

  describe('loadDirChildren edge cases', () => {
    it('does not merge children when root is not set', async () => {
      mockReadDir.mockResolvedValueOnce([{ name: 'x.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.loadDirChildren('/x');
      });

      expect(result.current.root).toBeNull();
    });
  });

  describe('searchFiles', () => {
    it('clears results for an empty query', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.searchFiles('   ');
      });

      expect(result.current.globalSearchResults).toEqual([]);
      expect(result.current.globalSearching).toBe(false);
    });

    it('clears results when no root path is set', async () => {
      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.searchFiles('foo');
      });

      expect(result.current.globalSearchResults).toEqual([]);
    });

    it('walks directories and returns matching lines', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([
          { name: 'src', isDirectory: true },
          { name: 'README.md', isDirectory: false },
        ])
        .mockResolvedValueOnce([
          { name: 'src', isDirectory: true },
          { name: 'node_modules', isDirectory: true },
          { name: 'README.md', isDirectory: false },
        ])
        .mockResolvedValueOnce([{ name: 'index.ts', isDirectory: false }]);
      mockReadTextFile
        .mockResolvedValueOnce('function search() {}')
        .mockResolvedValueOnce('Hello world');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.searchFiles('SEARCH');
      });

      expect(result.current.globalSearchResults).toEqual([
        {
          path: '/project/src/index.ts',
          line: 1,
          text: 'function search() {}',
        },
      ]);
      expect(result.current.globalSearching).toBe(false);
    });

    it('skips files that fail to read', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockReadTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.searchFiles('x');
      });

      expect(result.current.globalSearchResults).toEqual([]);
    });

    it('stops the walk when readDir fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.searchFiles('x');
      });

      expect(result.current.globalSearchResults).toEqual([]);
      expect(result.current.globalSearching).toBe(false);
    });
  });

  describe('keyboard shortcuts', () => {
    const press = (key: string, init: KeyboardEventInit = {}) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key, ...init }));
      });
    };

    it('toggles the sidebar with Mod+b', () => {
      const { result } = renderHook(() => useCodePage());

      press('b', { metaKey: true });
      expect(result.current.sidebarState).toBe('closed');

      press('b', { metaKey: true });
      expect(result.current.sidebarState).toBe('explorer');
    });

    it('opens quick open with Mod+p', () => {
      const { result } = renderHook(() => useCodePage());

      press('p', { metaKey: true });

      expect(result.current.showQuickOpen).toBe(true);
      expect(result.current.quickOpenQuery).toBe('');
    });

    it('toggles the shortcuts modal with Mod+/', () => {
      const { result } = renderHook(() => useCodePage());

      press('/', { metaKey: true });
      expect(result.current.showShortcuts).toBe(true);

      press('/', { metaKey: true });
      expect(result.current.showShortcuts).toBe(false);
    });

    it('closes the active tab with Mod+w', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      press('w', { metaKey: true });

      expect(result.current.tabs).toHaveLength(0);
    });

    it('opens save-as with Mod+Shift+s', async () => {
      mockReadTextFile.mockResolvedValue('content');
      mockDialogSave.mockResolvedValueOnce(null);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      press('s', { metaKey: true, shiftKey: true });

      await act(async () => {});

      expect(mockDialogSave).toHaveBeenCalled();
    });

    it('opens go-to-line with Mod+g', () => {
      const { result } = renderHook(() => useCodePage());

      press('g', { metaKey: true });

      expect(result.current.showGoToLine).toBe(true);
    });

    it('zooms with Mod+=, Mod+- and resets with Mod+0', () => {
      const { result } = renderHook(() => useCodePage());

      press('=', { metaKey: true });
      expect(result.current.fontSize).toBe(14);

      press('-', { metaKey: true });
      expect(result.current.fontSize).toBe(13);

      press('0', { metaKey: true });
      expect(result.current.fontSize).toBe(13);
    });

    it('ignores keydown events without a modifier', () => {
      const { result } = renderHook(() => useCodePage());

      press('b');

      expect(result.current.sidebarState).toBe('explorer');
    });

    it('ignores Mod+Shift+g and Mod+Alt+g', () => {
      const { result } = renderHook(() => useCodePage());

      press('g', { metaKey: true, shiftKey: true });
      expect(result.current.showGoToLine).toBe(false);

      press('g', { metaKey: true, altKey: true });
      expect(result.current.showGoToLine).toBe(false);
    });

    it('does nothing for Mod+w without an active tab', () => {
      const { result } = renderHook(() => useCodePage());

      press('w', { metaKey: true });

      expect(result.current.tabs).toHaveLength(0);
    });

    it('does nothing for Ctrl+Tab with fewer than two recent tabs', () => {
      const { result } = renderHook(() => useCodePage());

      press('Tab', { ctrlKey: true });

      expect(result.current.activePath).toBeNull();
    });

    it('does nothing for Ctrl+Tab when the next recent tab is closed', async () => {
      mockReadTextFile.mockResolvedValue('content');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => result.current.registerTabAccess('/b.ts'));
      act(() => result.current.registerTabAccess('/c.ts'));

      press('Tab', { ctrlKey: true });

      expect(result.current.activePath).toBe('/a.ts');
    });

    it('does nothing when the Shift key alone is pressed with a modifier', () => {
      const { result } = renderHook(() => useCodePage());

      press('Shift', { metaKey: true, shiftKey: true });

      expect(result.current.sidebarState).toBe('explorer');
    });
  });

  describe('sidebar drag', () => {
    it('resizes within bounds and cleans up listeners on mouseup', () => {
      const { result } = renderHook(() => useCodePage());

      act(() => {
        result.current.handleSidebarDragStart({
          preventDefault: jest.fn(),
          clientX: 100,
        } as unknown as React.MouseEvent);
      });

      act(() => {
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 300 }));
      });
      expect(result.current.leftSidebarWidth).toBe(520);

      act(() => {
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 10000 }));
      });
      expect(result.current.leftSidebarWidth).toBe(600);

      act(() => {
        document.dispatchEvent(
          new MouseEvent('mousemove', { clientX: -10000 })
        );
      });
      expect(result.current.leftSidebarWidth).toBe(160);

      act(() => {
        document.dispatchEvent(new MouseEvent('mouseup'));
      });
      const settled = result.current.leftSidebarWidth;

      act(() => {
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }));
      });
      expect(result.current.leftSidebarWidth).toBe(settled);
    });
  });

  describe('collectAllFiles', () => {
    it('returns all file paths recursively', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([
          { name: 'src', isDirectory: true },
          { name: 'a.ts', isDirectory: false },
        ])
        .mockResolvedValueOnce([
          { name: 'src', isDirectory: true },
          { name: 'a.ts', isDirectory: false },
        ])
        .mockResolvedValueOnce([{ name: 'nested', isDirectory: true }])
        .mockResolvedValueOnce([{ name: 'deep.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      let files: string[] = [];
      await act(async () => {
        files = await result.current.collectAllFiles();
      });

      expect(files).toEqual(['/project/src/nested/deep.ts', '/project/a.ts']);
    });

    it('returns an empty list without a root path', async () => {
      const { result } = renderHook(() => useCodePage());

      let files: string[] = ['x'];
      await act(async () => {
        files = await result.current.collectAllFiles();
      });

      expect(files).toEqual([]);
    });

    it('returns an empty list when readDir fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      let files: string[] = ['x'];
      await act(async () => {
        files = await result.current.collectAllFiles();
      });

      expect(files).toEqual([]);
    });

    it('skips dotfiles and SKIP_DIRS while walking', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([
          { name: '.env', isDirectory: false },
          { name: 'node_modules', isDirectory: true },
          { name: 'a.ts', isDirectory: false },
          { name: 'src', isDirectory: true },
        ])
        .mockResolvedValueOnce([{ name: 'index.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      let files: string[] = [];
      await act(async () => {
        files = await result.current.collectAllFiles();
      });

      expect(files).toEqual(['/project/a.ts', '/project/src/index.ts']);
    });
  });

  describe('autosave and directory watching', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('autosaves a dirty tab after 2 seconds', async () => {
      mockReadTextFile.mockResolvedValue('initial');
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => {
        result.current.handleChange('modified');
      });
      expect(result.current.dirty).toBe(true);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(mockWriteTextFile).toHaveBeenCalledWith('/a.ts', 'modified');
      expect(result.current.tabs[0].original).toBe('modified');
      expect(result.current.dirty).toBe(false);
    });

    it('does not autosave when autoSave is disabled', async () => {
      mockReadTextFile.mockResolvedValue('initial');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => result.current.toggleAutoSave());
      act(() => {
        result.current.handleChange('modified');
      });

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('clears the autosave timer when the tab is closed', async () => {
      mockReadTextFile.mockResolvedValue('initial');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => {
        result.current.handleChange('modified');
      });
      act(() => {
        result.current.closeTab('/a.ts');
      });

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(mockWriteTextFile).not.toHaveBeenCalled();
    });

    it('refreshes the tree when the watched directory gains entries', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([
          { name: 'a.ts', isDirectory: false },
          { name: 'b.ts', isDirectory: false },
        ])
        .mockResolvedValueOnce([
          { name: 'a.ts', isDirectory: false },
          { name: 'b.ts', isDirectory: false },
        ]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      expect(result.current.root!.children).toHaveLength(1);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });
      expect(mockReadDir).toHaveBeenCalledTimes(2);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });
      expect(mockReadDir).toHaveBeenCalledTimes(4);
      expect(result.current.root!.children).toHaveLength(2);
    });

    it('autosaves only the dirty tab when multiple tabs are open', async () => {
      mockReadTextFile.mockResolvedValueOnce('x').mockResolvedValueOnce('y');
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => result.current.handleChange('x2'));

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(mockWriteTextFile).toHaveBeenCalledWith('/b.ts', 'x2');
      expect(result.current.tabs.map((t) => t.original)).toEqual(['x', 'x2']);
    });

    it('ignores directory watch ticks that fail to read', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      mockReadDir.mockResolvedValueOnce(undefined);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(result.current.root!.children).toHaveLength(1);
    });

    it('does not refresh when the root is unset', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      expect(result.current.root).toBeNull();
      expect(result.current.rootPath).toBe('/project');

      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(result.current.root).toBeNull();
    });

    it('ignores dotfiles when detecting new entries', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([
          { name: '.env', isDirectory: false },
          { name: 'b.ts', isDirectory: false },
        ])
        .mockResolvedValueOnce([
          { name: 'a.ts', isDirectory: false },
          { name: 'b.ts', isDirectory: false },
        ]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      expect(result.current.root!.children).toHaveLength(1);

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      await act(async () => {
        await jest.runOnlyPendingTimersAsync();
      });

      expect(result.current.root!.children).toHaveLength(2);
    });
  });

  describe('error paths and edge cases', () => {
    it('openFolder names the root "root" when the path has no name', async () => {
      mockDialogOpen.mockResolvedValueOnce('/');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      expect(result.current.root!.name).toBe('root');
    });

    it('loadDirChildren does nothing when readDir fails', async () => {
      mockReadDir.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.loadDirChildren('/x');
      });

      expect(result.current.root).toBeNull();
    });

    it('loadDirChildren skips dotfiles and SKIP_DIRS and merges files and dirs', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir
        .mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }])
        .mockResolvedValueOnce([
          { name: '.env', isDirectory: false },
          { name: 'node_modules', isDirectory: true },
          { name: 'a.ts', isDirectory: false },
          { name: 'sub', isDirectory: true },
        ]);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      await act(async () => {
        await result.current.loadDirChildren('/project');
      });

      expect(result.current.root!.children!.map((c) => c.path)).toEqual([
        '/project/sub',
        '/project/a.ts',
      ]);
    });

    it('handleCreateFile leaves the tree null when the root is unset', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce(undefined);
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      expect(result.current.rootPath).toBe('/project');
      expect(result.current.root).toBeNull();

      await act(async () => {
        await result.current.handleCreateFile('new.ts');
      });

      expect(result.current.root).toBeNull();
    });

    it('deleteFile without a root path keeps the tree null', async () => {
      mockRemove.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.deleteFile('/a.ts');
      });

      expect(mockRemove).toHaveBeenCalledWith('/a.ts');
      expect(result.current.root).toBeNull();
    });

    it('saveFile keeps the tab dirty when writing fails', async () => {
      mockReadTextFile.mockResolvedValueOnce('original');
      mockWriteTextFile.mockRejectedValueOnce(new Error('disk full'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      act(() => result.current.handleChange('changed'));

      await act(async () => {
        await result.current.saveFile();
      });

      expect(result.current.dirty).toBe(true);
      expect(result.current.tabs[0].original).toBe('original');
    });

    it('saveFile updates only the active tab when multiple tabs are open', async () => {
      mockReadTextFile.mockResolvedValueOnce('a').mockResolvedValueOnce('b');
      mockWriteTextFile.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => result.current.handleChange('b-changed'));

      await act(async () => {
        await result.current.saveFile();
      });

      expect(mockWriteTextFile).toHaveBeenCalledWith('/b.ts', 'b-changed');
      expect(result.current.tabs.map((t) => t.original)).toEqual([
        'a',
        'b-changed',
      ]);
    });

    it('handleChange updates only the active tab when multiple tabs are open', async () => {
      mockReadTextFile.mockResolvedValueOnce('a').mockResolvedValueOnce('b');

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/b.ts');
      });

      act(() => result.current.handleChange('new'));

      expect(result.current.tabs.map((t) => t.content)).toEqual(['a', 'new']);
    });

    it('saveFileAs keeps the tab list unchanged when writing fails', async () => {
      mockReadTextFile.mockResolvedValueOnce('content');
      mockDialogSave.mockResolvedValueOnce('/copy.ts');
      mockWriteTextFile.mockRejectedValueOnce(new Error('no'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFileFromTree('/a.ts');
      });

      await act(async () => {
        await result.current.saveFileAs();
      });

      expect(result.current.tabs.map((t) => t.path)).toEqual(['/a.ts']);
    });

    it('handleRename updates only the renamed tab', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([
        { name: 'a.ts', isDirectory: false },
        { name: 'b.ts', isDirectory: false },
      ]);
      mockReadTextFile.mockResolvedValueOnce('x').mockResolvedValueOnce('y');
      mockRename.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });
      await act(async () => {
        await result.current.openFileFromTree('/project/a.ts');
      });
      await act(async () => {
        await result.current.openFileFromTree('/project/b.ts');
      });

      act(() => result.current.startRename('/project/a.ts'));

      await act(async () => {
        await result.current.handleRename('c.ts');
      });

      expect(result.current.tabs.map((t) => t.path)).toEqual([
        '/project/c.ts',
        '/project/b.ts',
      ]);
    });

    it('handleDuplicate keeps the tree unchanged when writing fails', async () => {
      mockDialogOpen.mockResolvedValueOnce('/project');
      mockReadDir.mockResolvedValueOnce([{ name: 'a.ts', isDirectory: false }]);
      mockReadTextFile.mockResolvedValueOnce('hello');
      mockWriteTextFile.mockRejectedValueOnce(new Error('no'));

      const { result } = renderHook(() => useCodePage());

      await act(async () => {
        await result.current.openFolder();
      });

      act(() => result.current.startDuplicate('/project/a.ts'));

      await act(async () => {
        await result.current.handleDuplicate('b.ts');
      });

      expect(result.current.root!.children!.map((c) => c.path)).toEqual([
        '/project/a.ts',
      ]);
    });
  });
});
