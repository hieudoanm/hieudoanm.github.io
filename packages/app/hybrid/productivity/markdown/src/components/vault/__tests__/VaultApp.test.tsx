import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VaultApp } from '@/components/vault/VaultApp';
import { exportHtmlFile, exportMarkdownFile, exportPdf } from '@/lib/export';
import { loadNotes } from '@/lib/storage';
import * as storage from '@/lib/storage';

let mockOnEditorChange: ((content: string) => void) | undefined;
let mockView: unknown = null;

jest.mock('@/hooks/useCodeMirror', () => ({
  useCodeMirror: (options: { onChange?: (content: string) => void }) => {
    mockOnEditorChange = options.onChange;
    return {
      view: mockView,
      setDoc: jest.fn(),
      getDoc: () => '',
      focus: jest.fn(),
    };
  },
}));

jest.mock('@/lib/export', () => ({
  exportMarkdownFile: jest.fn(),
  exportHtmlFile: jest.fn(),
  exportPdf: jest.fn(),
}));

describe('VaultApp', () => {
  const originalFileReader = global.FileReader;

  beforeEach(() => {
    window.localStorage.clear();
    mockOnEditorChange = undefined;
    mockView = null;
  });

  afterEach(() => {
    global.FileReader = originalFileReader;
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('shows a selected note and vault chrome', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('🤖 Agents'));

    const preview = await screen.findByTestId('markdown-preview');
    expect(
      await within(preview).findByRole('heading', { name: '🤖 Agents' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Notes' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search notes')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes graph')).toBeInTheDocument();
  });

  it('renders the markdown preview of the active note', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('🤖 Agents'));

    const preview = await screen.findByTestId('markdown-preview');
    expect(preview).toContainHTML('strong');
    expect(preview.querySelector('ul')).toBeTruthy();
  });

  it('renders links from markdown in the preview', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('Blockchain'));

    const preview = await screen.findByTestId('markdown-preview');
    const link = await within(preview).findByRole('link', {
      name: 'Bitcoin',
    });
    expect(link).toHaveAttribute('href', 'https://bitcoin.org');
  });

  it('switches notes from the sidebar', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('Chess'));
    const preview = await screen.findByTestId('markdown-preview');
    expect(
      await within(preview).findByRole('heading', { name: 'Chess' })
    ).toBeInTheDocument();
  });

  it('creates a new note from the toolbar', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getAllByLabelText('New note')[0]);

    const heading = await screen.findAllByRole('heading', {
      name: 'Untitled',
    });
    expect(heading.length).toBeGreaterThan(0);
  });

  it('opens the notes graph modal', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Notes graph'));

    expect(
      await screen.findByRole('heading', { name: 'Graph' })
    ).toBeInTheDocument();
    expect(screen.getByText(/notes · \d+ links/)).toBeInTheDocument();
  });

  it('persists new notes to localStorage after the save delay', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<VaultApp />);

    await user.click(screen.getAllByLabelText('New note')[0]);
    jest.advanceTimersByTime(500);

    const saved = loadNotes();
    expect(saved.some((note) => note.title === 'Untitled')).toBe(true);
    jest.useRealTimers();
  });

  it('writes editor changes back into the active note', async () => {
    render(<VaultApp />);

    act(() => {
      mockOnEditorChange?.('fresh content');
    });

    expect(await screen.findByText('fresh content')).toBeInTheDocument();
  });

  it('imports a markdown file as a new note', async () => {
    class FakeFileReader {
      result: string | null = null;
      onload: (() => void) | null = null;
      readAsText = jest.fn(() => {
        this.result = '# Imported';
        this.onload?.();
      });
    }
    global.FileReader = FakeFileReader as unknown as typeof FileReader;

    render(<VaultApp />);
    const fileInput = document.querySelector('input[type="file"]')!;
    fireEvent.change(fileInput, {
      target: { files: [new File(['# Imported'], 'note.md')] },
    });

    const headings = await screen.findAllByRole('heading', {
      name: 'Imported',
    });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('deletes the active note after confirmation', async () => {
    const user = userEvent.setup();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(<VaultApp />);

    const title = document.querySelector('header h1')!.textContent;
    await user.click(screen.getByLabelText('Delete note'));

    expect(confirmSpy).toHaveBeenCalled();
    expect(document.querySelector('header h1')!.textContent).not.toBe(title);
  });

  it('keeps the note when deletion is cancelled', async () => {
    const user = userEvent.setup();
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    render(<VaultApp />);

    const title = document.querySelector('header h1')!.textContent;
    await user.click(screen.getByLabelText('Delete note'));

    expect(document.querySelector('header h1')!.textContent).toBe(title);
  });

  it('reseeds the vault when the last note is deleted', async () => {
    window.localStorage.setItem(
      'markdown.vault.v2',
      JSON.stringify([
        {
          id: 'solo',
          title: 'Solo',
          content: 'solo',
          createdAt: 1,
          updatedAt: 1,
        },
      ])
    );
    const user = userEvent.setup();
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Delete note'));

    const nav = screen.getByRole('navigation', { name: 'Notes' });
    expect(await within(nav).findByText('🤖 Agents')).toBeInTheDocument();
  });

  it('exports the active note as markdown', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Export Markdown'));
    expect(exportMarkdownFile).toHaveBeenCalled();
  });

  it('exports the active note as html', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Export HTML'));
    await waitFor(() => expect(exportHtmlFile).toHaveBeenCalled());
  });

  it('exports the active note as pdf', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Export PDF'));
    await waitFor(() => expect(exportPdf).toHaveBeenCalled());
  });

  it('opens and closes the mobile sidebar', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Open sidebar'));
    expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Close sidebar'));
    expect(screen.queryByLabelText('Close sidebar')).not.toBeInTheDocument();
  });

  it('closes the mobile sidebar when the overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Open sidebar'));
    const overlay = document.querySelector('.bg-black\\/50')!;
    await user.click(overlay);

    expect(screen.queryByLabelText('Close sidebar')).not.toBeInTheDocument();
  });

  it('switches between editor and preview view modes', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByRole('button', { name: 'Preview' }));
    expect(screen.getByTestId('editor').parentElement).toHaveClass('hidden');

    await user.click(screen.getByRole('button', { name: 'Editor' }));
    expect(
      screen.getByTestId('markdown-preview').closest('.hidden')
    ).not.toBeNull();
  });

  it('closes the notes graph', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(screen.getByLabelText('Notes graph'));
    await user.click(await screen.findByLabelText('Close graph'));

    expect(
      screen.queryByRole('heading', { name: 'Graph' })
    ).not.toBeInTheDocument();
  });

  it('renders the empty vault state and ignores edits without a note', () => {
    jest.spyOn(storage, 'loadNotes').mockReturnValue([]);
    render(<VaultApp />);

    expect(
      screen.getByRole('heading', { name: 'Empty vault' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vault' })).toBeInTheDocument();
    expect(document.title).toBe('Markdown - Minimal Obsidian');

    act(() => {
      mockOnEditorChange?.('ignored');
    });
  });

  it('creates the first note from the empty vault state', async () => {
    jest.spyOn(storage, 'loadNotes').mockReturnValue([]);
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(
      within(screen.getByRole('main')).getByRole('button', { name: 'New note' })
    );

    const heading = await screen.findAllByRole('heading', {
      name: 'Untitled',
    });
    expect(heading.length).toBeGreaterThan(0);
  });

  it('tracks the editor scroll element when a view is present', () => {
    mockView = { scrollDOM: document.createElement('div') };
    render(<VaultApp />);

    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bold' })).toBeEnabled();
  });
});
