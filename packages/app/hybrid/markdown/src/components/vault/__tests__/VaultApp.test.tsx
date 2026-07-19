import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VaultApp } from '@/components/vault/VaultApp';
import { loadNotes } from '@/lib/storage';

jest.mock('@/hooks/useCodeMirror', () => ({
  useCodeMirror: () => ({
    view: null,
    setDoc: jest.fn(),
    getDoc: () => '',
    focus: jest.fn(),
  }),
}));

describe('VaultApp', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows the first note and vault chrome', async () => {
    render(<VaultApp />);

    const preview = await screen.findByTestId('markdown-preview');
    expect(
      await within(preview).findByRole('heading', { name: 'Home' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Notes' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Search notes')).toBeInTheDocument();
    expect(screen.getByLabelText('Notes graph')).toBeInTheDocument();
  });

  it('renders the markdown preview of the active note', async () => {
    render(<VaultApp />);

    const preview = await screen.findByTestId('markdown-preview');
    expect(preview).toContainHTML('strong');
    expect(preview.querySelector('ul')).toBeTruthy();
  });

  it('renders links from markdown in the preview', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('About'));

    const preview = await screen.findByTestId('markdown-preview');
    const link = await within(preview).findByRole('link', {
      name: 'Obsidian',
    });
    expect(link).toHaveAttribute('href', 'https://obsidian.md');
  });

  it('switches notes from the sidebar', async () => {
    const user = userEvent.setup();
    render(<VaultApp />);

    await user.click(await screen.findByText('About'));
    const preview = await screen.findByTestId('markdown-preview');
    expect(
      await within(preview).findByRole('heading', { name: 'About' })
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
});
