import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { CodePage } from '../CodePage';

const mockReadDir = jest.fn();
const mockReadTextFile = jest.fn();
const mockWriteTextFile = jest.fn();
const mockRemove = jest.fn();
const mockRename = jest.fn();
const mockMkdir = jest.fn();
const mockDialogOpen = jest.fn();
const mockDialogSave = jest.fn();

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

jest.mock('../../components/CodeEditor', () => {
  const React = require('react');
  type MockEditorProps = {
    content: string;
    onChange: (content: string) => void;
    onCursorChange: (line: number, col: number) => void;
    onSelectionChange: (count: number) => void;
    onGoToLine: () => void;
  };
  return {
    CodeEditor: React.forwardRef(
      (
        props: MockEditorProps,
        ref: React.Ref<{ goToLine: (line: number) => void }>
      ) => {
        React.useImperativeHandle(
          ref,
          () => ({ goToLine: () => props.onGoToLine() }),
          [props.onGoToLine]
        );
        return React.createElement('input', {
          'data-testid': 'code-editor',
          defaultValue: props.content,
          onFocus: () => {
            props.onCursorChange(1, 1);
            props.onSelectionChange(3);
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value),
        });
      }
    ),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

type DirEntry = { name: string; isDirectory: boolean };

const openFolder = async (listing: DirEntry[]) => {
  mockDialogOpen.mockResolvedValue('/project');
  mockReadDir.mockResolvedValue(listing);
  render(<CodePage />);
  fireEvent.click(screen.getByText('Open Folder'));
  fireEvent.click(await screen.findByText('project'));
  await screen.findByText(listing[0].name);
};

describe('CodePage', () => {
  it('renders the editor title', () => {
    render(<CodePage />);
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('renders the Open Folder button in the main area', () => {
    render(<CodePage />);
    expect(screen.getByText('Open Folder')).toBeInTheDocument();
  });

  it('renders the Open File button in the main area', () => {
    render(<CodePage />);
    expect(screen.getByText('Open File')).toBeInTheDocument();
  });

  it('shows the placeholder message', () => {
    render(<CodePage />);
    expect(
      screen.getByText('Open a folder or file to start editing')
    ).toBeInTheDocument();
  });

  it('renders the activity bar with explorer toggle', () => {
    render(<CodePage />);
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons.find(
      (b) =>
        b.getAttribute('title') === 'Close Explorer' ||
        b.getAttribute('title') === 'Open Explorer'
    );
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders the sidebar with explorer panel', () => {
    render(<CodePage />);
    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });

  it('opens a folder and renders the file tree', async () => {
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'src', isDirectory: true },
    ]);

    expect(screen.getByText('a.ts')).toBeInTheDocument();
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(mockDialogOpen).toHaveBeenCalled();
  });

  it('opens a file from the tree and shows the editor', async () => {
    mockReadTextFile.mockResolvedValue('hello');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByText('a.ts'));

    expect(await screen.findByText('Ln 1, Col 1')).toBeInTheDocument();
    expect(
      screen.queryByText('Open a folder or file to start editing')
    ).not.toBeInTheDocument();
    expect(mockReadTextFile).toHaveBeenCalledWith('/project/a.ts');
  });

  it('opens a file via the Open File dialog', async () => {
    mockDialogOpen.mockResolvedValue('/notes.txt');
    mockReadTextFile.mockResolvedValue('hi');
    render(<CodePage />);

    fireEvent.click(screen.getByText('Open File'));

    expect(await screen.findByText('Ln 1, Col 1')).toBeInTheDocument();
    expect(mockReadTextFile).toHaveBeenCalledWith('/notes.txt');
  });

  it('toggles the sidebar via the activity bar explorer button', () => {
    render(<CodePage />);

    fireEvent.click(screen.getByTitle('Close Explorer'));

    expect(screen.getByTitle('Open Explorer')).toBeInTheDocument();
    expect(screen.queryByText('Explorer')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Open Explorer'));

    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });

  it('toggles the theme via the activity bar palette button', () => {
    render(<CodePage />);

    expect(screen.getByTitle('Switch to winter theme')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Switch to winter theme'));

    expect(screen.getByTitle('Switch to dim theme')).toBeInTheDocument();
  });

  it('searches files with debounce and opens a result', async () => {
    mockReadTextFile.mockResolvedValue('alpha content');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('Search (Cmd+Shift+F)'));
    expect(screen.getByPlaceholderText('Search files...')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search files...'), {
      target: { value: 'alp' },
    });

    const result = await screen.findByText('alpha content');
    fireEvent.click(result);

    await waitFor(() => {
      expect(screen.getByText('Explorer')).toBeInTheDocument();
    });
    expect(
      screen.queryByPlaceholderText('Search files...')
    ).not.toBeInTheDocument();
    expect(await screen.findByText('Ln 1, Col 1')).toBeInTheDocument();
  });

  it('opens quick open with Cmd+P and selects a file', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'b.ts', isDirectory: false },
    ]);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'p', metaKey: true })
      );
    });

    expect(
      screen.getByPlaceholderText('Search files by name...')
    ).toBeInTheDocument();
    expect(await screen.findByText('/project/a.ts')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search files by name...'), {
      target: { value: 'b' },
    });
    expect(screen.getByText('/project/b.ts')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByPlaceholderText('Search files by name...'), {
      key: 'Enter',
    });

    expect(await screen.findByText('Ln 1, Col 1')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Search files by name...')
    ).not.toBeInTheDocument();
  });

  it('opens the go-to-line prompt with Cmd+G and submits a line', async () => {
    mockReadTextFile.mockResolvedValue('one\ntwo\nthree');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByText('a.ts'));
    await screen.findByText('Ln 1, Col 1');

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'g', metaKey: true })
      );
    });

    expect(screen.getByText('Go to Line')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter line number...'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByText('Go'));

    await waitFor(() => {
      expect(screen.queryByText('Go to Line')).not.toBeInTheDocument();
    });
  });

  it('shows the keyboard shortcuts modal with Cmd+/ and closes it', () => {
    render(<CodePage />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: '/', metaKey: true })
      );
    });

    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();

    fireEvent.click(screen.getByText('×'));

    expect(screen.queryByText('Keyboard Shortcuts')).not.toBeInTheDocument();
  });

  it('creates a new file from the explorer toolbar', async () => {
    mockWriteTextFile.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('New File'));
    expect(screen.getByText('New file')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('filename.txt'), {
      target: { value: 'new.ts' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockWriteTextFile).toHaveBeenCalledWith('/project/new.ts', '');
    });
  });

  it('creates a new folder from the explorer toolbar', async () => {
    mockMkdir.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('New Folder'));
    expect(screen.getByText('New folder')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('folder-name'), {
      target: { value: 'assets' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockMkdir).toHaveBeenCalledWith('/project/assets');
    });
  });

  it('canceling a new-file prompt closes it', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('New File'));
    expect(screen.getByText('New file')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('New file')).not.toBeInTheDocument();
  });

  it('creates a file inside a directory via the context menu', async () => {
    mockWriteTextFile.mockResolvedValue(undefined);
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'src', isDirectory: true },
    ]);

    fireEvent.contextMenu(screen.getByText('src'));
    fireEvent.click(screen.getByText('New File'));
    expect(screen.getByText('New file')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('filename.txt'), {
      target: { value: 'x.ts' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockWriteTextFile).toHaveBeenCalledWith('/project/src/x.ts', '');
    });
  });

  it('creates a folder inside a directory via the context menu', async () => {
    mockMkdir.mockResolvedValue(undefined);
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'src', isDirectory: true },
    ]);

    fireEvent.contextMenu(screen.getByText('src'));
    fireEvent.click(screen.getByText('New Folder'));
    expect(screen.getByText('New folder')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('folder-name'), {
      target: { value: 'deep' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockMkdir).toHaveBeenCalledWith('/project/src/deep');
    });
  });

  it('renames a file via the context menu', async () => {
    mockRename.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Rename'));

    const input = screen.getByPlaceholderText('new-name');
    expect((input as HTMLInputElement).value).toBe('a.ts');

    fireEvent.change(input, { target: { value: 'b.ts' } });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockRename).toHaveBeenCalledWith('/project/a.ts', '/project/b.ts');
    });
  });

  it('duplicates a file via the context menu', async () => {
    mockReadTextFile.mockResolvedValue('copy me');
    mockWriteTextFile.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Duplicate'));

    const input = screen.getByPlaceholderText('new-filename');
    expect((input as HTMLInputElement).value).toBe('copy-of-a.ts');

    fireEvent.change(input, { target: { value: 'copy-of-a.ts' } });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockWriteTextFile).toHaveBeenCalledWith(
        '/project/copy-of-a.ts',
        'copy me'
      );
    });
  });

  it('deletes a file via the context menu after confirming', async () => {
    mockRemove.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByText('Delete File')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete "a.ts"?')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledWith('/project/a.ts');
    });
    expect(screen.queryByText('Delete File')).not.toBeInTheDocument();
  });

  it('deletes a file via the tree trash button', async () => {
    mockRemove.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('Delete file'));
    expect(screen.getByText('Delete File')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledWith('/project/a.ts');
    });
  });

  it('closes a tab, closes others, and closes all tabs', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'b.ts', isDirectory: false },
    ]);

    fireEvent.click(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('b.ts'));
    await screen.findByText('Ln 1, Col 1');

    const tabBar =
      screen.getByTitle('Close all tabs').parentElement!.parentElement!;
    expect(within(tabBar).getByText('a.ts')).toBeInTheDocument();
    expect(within(tabBar).getByText('b.ts')).toBeInTheDocument();

    const tabADiv = within(tabBar).getByText('a.ts').closest('div')!;
    fireEvent.click(within(tabADiv).getByRole('button'));
    await waitFor(() => {
      expect(within(tabBar).queryByText('a.ts')).not.toBeInTheDocument();
    });
    expect(within(tabBar).getByText('b.ts')).toBeInTheDocument();

    fireEvent.contextMenu(within(tabBar).getByText('b.ts'));
    fireEvent.click(screen.getByText('Close Others'));
    await waitFor(() => {
      expect(within(tabBar).getByText('b.ts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTitle('Close all tabs'));
    expect(
      await screen.findByText('Open a folder or file to start editing')
    ).toBeInTheDocument();
  });

  it('shows the error modal when creating a file fails', async () => {
    mockWriteTextFile.mockRejectedValue(new Error('disk full'));
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('New File'));
    fireEvent.change(screen.getByPlaceholderText('filename.txt'), {
      target: { value: 'x.ts' },
    });
    fireEvent.click(screen.getByText('Create'));

    expect(
      await screen.findByText('Failed to create file')
    ).toBeInTheDocument();
    expect(screen.getByText('disk full')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(
        screen.queryByText('Failed to create file')
      ).not.toBeInTheDocument();
    });
  });

  it('closes the search panel with Escape', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('Search (Cmd+Shift+F)'));
    const input = screen.getByPlaceholderText('Search files...');

    fireEvent.keyDown(input, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.getByText('Explorer')).toBeInTheDocument();
    });
  });

  it('closes the search panel by clicking the search button again', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('Search (Cmd+Shift+F)'));
    expect(screen.getByPlaceholderText('Search files...')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Search (Cmd+Shift+F)'));

    expect(
      screen.queryByPlaceholderText('Search files...')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Explorer')).not.toBeInTheDocument();
  });

  it('closes the sidebar from the explorer toolbar', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('Close sidebar'));

    expect(screen.queryByText('Explorer')).not.toBeInTheDocument();
  });

  it('switches tabs by clicking the tab bar', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([
      { name: 'a.ts', isDirectory: false },
      { name: 'b.txt', isDirectory: false },
    ]);

    fireEvent.click(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('b.txt'));
    await screen.findByText('TXT');

    const tabBar =
      screen.getByTitle('Close all tabs').parentElement!.parentElement!;
    fireEvent.click(within(tabBar).getByText('a.ts'));

    expect(await screen.findByText('TS')).toBeInTheDocument();
  });

  it('tracks cursor and selection reported by the editor', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByText('a.ts'));
    await screen.findByText('Ln 1, Col 1');

    fireEvent.focus(screen.getByTestId('code-editor'));

    expect(await screen.findByText('(3 sel)')).toBeInTheDocument();
  });

  it('toggles the sidebar from the status bar', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByText('a.ts'));
    await screen.findByText('Ln 1, Col 1');

    const statusBar = screen
      .getByText('Ln 1, Col 1')
      .closest('div')!.parentElement!;
    fireEvent.click(within(statusBar).getAllByRole('button')[0]);

    expect(screen.queryByText('Explorer')).not.toBeInTheDocument();

    fireEvent.click(within(statusBar).getAllByRole('button')[0]);

    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });

  it('cancels deleting a file from the confirm modal', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete File')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Delete File')).not.toBeInTheDocument();
    expect(mockRemove).not.toHaveBeenCalled();
  });

  it('canceling a new-folder prompt closes it', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByTitle('New Folder'));
    expect(screen.getByText('New folder')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('New folder')).not.toBeInTheDocument();
  });

  it('cancels renaming a file', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Rename'));
    expect(screen.getByPlaceholderText('new-name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByPlaceholderText('new-name')).not.toBeInTheDocument();
    expect(mockRename).not.toHaveBeenCalled();
  });

  it('cancels duplicating a file', async () => {
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('a.ts'));
    fireEvent.click(screen.getByText('Duplicate'));
    expect(screen.getByPlaceholderText('new-filename')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(
      screen.queryByPlaceholderText('new-filename')
    ).not.toBeInTheDocument();
    expect(mockWriteTextFile).not.toHaveBeenCalled();
  });

  it('cancels the go-to-line prompt', async () => {
    mockReadTextFile.mockResolvedValue('hi');
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.click(screen.getByText('a.ts'));
    await screen.findByText('Ln 1, Col 1');

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'g', metaKey: true })
      );
    });
    expect(screen.getByText('Go to Line')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Go to Line')).not.toBeInTheDocument();
  });

  it('creates a file at the project root from the root context menu', async () => {
    mockWriteTextFile.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('project'));
    fireEvent.click(screen.getByText('New File'));
    expect(screen.getByText('New file')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('filename.txt'), {
      target: { value: 'x.ts' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockWriteTextFile).toHaveBeenCalledWith('/project/x.ts', '');
    });
  });

  it('creates a folder at the project root from the root context menu', async () => {
    mockMkdir.mockResolvedValue(undefined);
    await openFolder([{ name: 'a.ts', isDirectory: false }]);

    fireEvent.contextMenu(screen.getByText('project'));
    fireEvent.click(screen.getByText('New Folder'));
    expect(screen.getByText('New folder')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('folder-name'), {
      target: { value: 'assets' },
    });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockMkdir).toHaveBeenCalledWith('/project/assets');
    });
  });
});
