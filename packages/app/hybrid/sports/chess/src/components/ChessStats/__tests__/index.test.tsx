import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChessStats } from '../index';

jest.mock('../utils/sql', () => ({
  useSQLite: jest.fn(() => ({
    db: { exec: jest.fn() },
    dbLoading: false,
    dbError: null,
  })),
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="chart" />,
}));

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  BarElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

jest.mock('../components/Percentile', () => ({
  Percentile: ({ username, tabs }: { username: string; tabs: unknown[] }) => (
    <div data-testid="percentile">
      <span data-testid="percentile-username">{username}</span>
      <span data-testid="percentile-tab-count">{tabs.length}</span>
    </div>
  ),
}));

const mockFetch = (ok: boolean, body?: object, status = 404) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body ?? {}),
  });
};

const useSQLite = require('../utils/sql').useSQLite;

describe('ChessStats', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    mockFetch(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders heading and search bar', () => {
    render(<ChessStats onClose={onClose} />);
    expect(screen.getByText('Chess Insights')).toBeTruthy();
    expect(screen.getByPlaceholderText('chess.com username')).toBeTruthy();
  });

  it('shows total players stat card', () => {
    render(<ChessStats onClose={onClose} />);
    expect(screen.getByText('Total Players')).toBeTruthy();
  });

  it('passes dbLoading to SearchBar', () => {
    useSQLite.mockReturnValue({ db: null, dbLoading: true, dbError: null });
    render(<ChessStats onClose={onClose} />);
    expect(screen.getByText(/Loading database/)).toBeTruthy();
  });

  it('passes dbError to SearchBar', () => {
    useSQLite.mockReturnValue({
      db: null,
      dbLoading: false,
      dbError: new Error('DB failed'),
    });
    render(<ChessStats onClose={onClose} />);
    expect(screen.getByText(/DB error: DB failed/)).toBeTruthy();
  });

  it('disables search button when dbLoading', () => {
    useSQLite.mockReturnValue({ db: null, dbLoading: true, dbError: null });
    render(<ChessStats onClose={onClose} />);
    const btn = screen.getByRole('button', { name: /Compare/i });
    expect(btn).toBeDisabled();
  });

  it('disables search button when username is empty', () => {
    render(<ChessStats onClose={onClose} />);
    const btn = screen.getByRole('button', { name: /Compare/i });
    expect(btn).toBeDisabled();
  });

  it('calls fetch with correct URL on search', async () => {
    const user = userEvent.setup();
    mockFetch(true, {
      chess_bullet: { last: { rating: 1500 }, best: { rating: 1600 } },
      chess_blitz: { last: { rating: 1400 }, best: { rating: 1500 } },
      chess_rapid: { last: { rating: 1300 }, best: { rating: 1400 } },
    });
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'magnuscarlsen');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.chess.com/pub/player/magnuscarlsen/stats'
      );
    });
  });

  it('skips fetch when db is null', async () => {
    const user = userEvent.setup();
    useSQLite.mockReturnValue({ db: null, dbLoading: false, dbError: null });
    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'magnuscarlsen');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('shows search error when fetch fails', async () => {
    const user = userEvent.setup();
    mockFetch(false);
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'baduser');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.getByText('Player not found (404)')).toBeTruthy();
    });
  });

  it('shows search error when fetch throws', async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'magnuscarlsen');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeTruthy();
    });
  });

  it('shows Percentile after successful search', async () => {
    const user = userEvent.setup();
    mockFetch(true, {
      chess_bullet: { last: { rating: 1500 }, best: { rating: 1600 } },
      chess_blitz: { last: { rating: 1400 }, best: { rating: 1500 } },
      chess_rapid: { last: { rating: 1300 }, best: { rating: 1400 } },
    });
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'player1');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.getByTestId('percentile')).toBeTruthy();
    });
  });

  it('handles nullish coalescing for missing stats', async () => {
    const user = userEvent.setup();
    mockFetch(true, {
      chess_bullet: null,
      chess_blitz: undefined,
      chess_rapid: { last: { rating: 1300 }, best: { rating: 1400 } },
    });
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'player1');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.getByTestId('percentile')).toBeTruthy();
    });
  });

  it('clears searchError on successful search', async () => {
    const user = userEvent.setup();
    mockFetch(false);
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'baduser');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.getByText('Player not found (404)')).toBeTruthy();
    });

    mockFetch(true, {
      chess_bullet: { last: { rating: 1500 }, best: { rating: 1600 } },
      chess_blitz: { last: { rating: 1400 }, best: { rating: 1500 } },
      chess_rapid: { last: { rating: 1300 }, best: { rating: 1400 } },
    });
    await user.clear(input);
    await user.type(input, 'gooduser');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(screen.queryByText('Player not found (404)')).toBeNull();
    });
  });

  it('trims username before building fetch URL', async () => {
    const user = userEvent.setup();
    mockFetch(true, {
      chess_bullet: { last: { rating: 1500 }, best: { rating: 1600 } },
      chess_blitz: { last: { rating: 1400 }, best: { rating: 1500 } },
      chess_rapid: { last: { rating: 1300 }, best: { rating: 1400 } },
    });
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, '  magnuscarlsen  ');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.chess.com/pub/player/magnuscarlsen/stats'
      );
    });
  });

  it('shows searching state then resolves', async () => {
    let resolveFetch!: (v: unknown) => void;
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );
    const db = { exec: jest.fn().mockReturnValue([]) };
    useSQLite.mockReturnValue({ db, dbLoading: false, dbError: null });

    const user = userEvent.setup();
    render(<ChessStats onClose={onClose} />);
    const input = screen.getByPlaceholderText('chess.com username');
    await user.clear(input);
    await user.type(input, 'player');
    await user.click(screen.getByRole('button', { name: /Compare/i }));

    resolveFetch!({
      ok: true,
      json: () =>
        Promise.resolve({
          chess_bullet: { last: { rating: 0 }, best: { rating: 0 } },
          chess_blitz: { last: { rating: 0 }, best: { rating: 0 } },
          chess_rapid: { last: { rating: 0 }, best: { rating: 0 } },
        }),
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Compare/i })).toBeTruthy();
    });
  });
});
