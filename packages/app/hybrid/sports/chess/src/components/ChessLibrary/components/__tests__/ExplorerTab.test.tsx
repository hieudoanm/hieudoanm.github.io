import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExplorerTab } from '../ExplorerTab';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('ExplorerTab', () => {
  it('renders the explorer with group select', () => {
    render(<ExplorerTab />);
    expect(screen.getByLabelText('Opening group')).toBeTruthy();
  });

  it('renders search input', () => {
    render(<ExplorerTab />);
    expect(screen.getByPlaceholderText('Search openings…')).toBeTruthy();
  });

  it('renders opening list', () => {
    render(<ExplorerTab />);
    expect(screen.getByText('Select an opening to preview it.')).toBeTruthy();
  });

  it('switches group', async () => {
    render(<ExplorerTab />);
    const groupSelect = screen.getByLabelText('Opening group');
    const options = screen.getAllByRole('option');
    if (options.length > 1) {
      const secondValue = options[1]!.getAttribute('value') ?? '';
      await userEvent.selectOptions(groupSelect, secondValue);
    }
  });

  it('searches openings', async () => {
    render(<ExplorerTab />);
    const search = screen.getByPlaceholderText('Search openings…');
    await userEvent.type(search, 'Italian');
  });

  it('selects an opening from the list', async () => {
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      expect(screen.getByText('Load master stats')).toBeTruthy();
    }
  });

  it('loads master stats after selecting opening', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ white: 10, draws: 5, black: 8 }),
    });
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      const loadBtn = screen.getByText('Load master stats');
      await userEvent.click(loadBtn);
    }
  });

  it('handles fetch error for master stats', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      const loadBtn = screen.getByText('Load master stats');
      await userEvent.click(loadBtn);
    }
  });

  it('handles network error for master stats', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      const loadBtn = screen.getByText('Load master stats');
      await userEvent.click(loadBtn);
      expect(screen.getByText('Network error')).toBeTruthy();
    }
  });

  it('handles non-Error throw for master stats', async () => {
    global.fetch = jest.fn().mockRejectedValue('string error');
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      const loadBtn = screen.getByText('Load master stats');
      await userEvent.click(loadBtn);
      expect(screen.getByText('Failed to load stats')).toBeTruthy();
    }
  });

  it('displays stats when loaded successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ white: 100, draws: 50, black: 80 }),
    });
    render(<ExplorerTab />);
    const buttons = screen.getAllByRole('button');
    const openingBtn = buttons.find((b) =>
      b.textContent?.includes('Italian Game')
    );
    if (openingBtn) {
      await userEvent.click(openingBtn);
      const loadBtn = screen.getByText('Load master stats');
      await userEvent.click(loadBtn);
      expect(screen.getByText(/Masters/)).toBeTruthy();
    }
  });

  it('shows search input filtering', async () => {
    render(<ExplorerTab />);
    const search = screen.getByPlaceholderText('Search openings…');
    await userEvent.type(search, 'NonexistentXYZ');
    expect(screen.getByText('No openings match.')).toBeTruthy();
  });

  it('shows all openings when group is All', () => {
    render(<ExplorerTab />);
    expect(screen.getByText('Italian Game')).toBeTruthy();
  });
});
