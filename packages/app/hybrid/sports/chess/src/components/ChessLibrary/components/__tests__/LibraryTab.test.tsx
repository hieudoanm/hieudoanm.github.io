import { render, screen, act } from '@testing-library/react';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

jest.mock('../../utils/library', () => ({
  loadGames: jest.fn(() => []),
  persistGames: jest.fn(),
  deleteGame: jest.fn((games: { id: string }[], id: string) =>
    games.filter((g) => g.id !== id)
  ),
  filterGames: jest.fn((games: { id: string; name: string }[], q: string) =>
    q ? games.filter((g) => g.name.includes(q)) : games
  ),
  importGames: jest.fn((pgn: string) => {
    if (pgn.includes('[Event'))
      return { games: [{ id: '1', name: 'Test Game' }], skipped: 0 };
    return { games: [], skipped: 0 };
  }),
  encodeShare: jest.fn((s: string) => btoa(s)),
  studyMoves: jest.fn(() => []),
  downloadPgn: jest.fn(),
}));

jest.mock('../../utils/fetchers', () => ({
  fetchLichessPgn: jest.fn().mockResolvedValue('[Event "T"]\n1.e4'),
  fetchChessComPgn: jest.fn().mockResolvedValue('[Event "T"]\n1.d4'),
}));

import { LibraryTab } from '../LibraryTab';
import * as library from '../../utils/library';
import * as fetchers from '../../utils/fetchers';

const mockLoadGames = jest.mocked(library.loadGames);
const mockPersistGames = jest.mocked(library.persistGames);
const mockDeleteGame = jest.mocked(library.deleteGame);
const mockImportGames = jest.mocked(library.importGames);
const mockFetchLichess = jest.mocked(fetchers.fetchLichessPgn);
const mockFetchChessCom = jest.mocked(fetchers.fetchChessComPgn);

const click = (name: string | RegExp) =>
  act(() => screen.getByRole('button', { name }).click());

describe('LibraryTab', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders empty state', () => {
    render(<LibraryTab />);
    expect(screen.getByText(/No games yet/)).toBeTruthy();
    expect(screen.getByText('Import')).toBeTruthy();
    expect(screen.getByText('Fetch games')).toBeTruthy();
  });

  it('imports PGN text', () => {
    render(<LibraryTab />);
    const textarea = screen.getByPlaceholderText(/Paste a PGN/);
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    )!.set!;
    setter.call(textarea, '[Event "T"]\n1.e4');
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    click('Import');
    expect(mockPersistGames).toHaveBeenCalled();
  });

  it('shows error for invalid PGN', () => {
    mockImportGames.mockReturnValueOnce({ games: [], skipped: 0 });
    render(<LibraryTab />);
    const textarea = screen.getByPlaceholderText(/Paste a PGN/);
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    )!.set!;
    setter.call(textarea, 'bad pgn');
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    click('Import');
    expect(
      screen.getByText('No games found — paste a valid PGN.')
    ).toBeTruthy();
  });

  it('fetches lichess games', async () => {
    render(<LibraryTab />);
    const input = screen.getByPlaceholderText('Username');
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )!.set!;
    setter.call(input, 'alice');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await act(async () => {
      await screen.getByText('Fetch games').click();
    });
    expect(mockFetchLichess).toHaveBeenCalledWith('alice');
    expect(mockPersistGames).toHaveBeenCalled();
  });

  it('fetches chess.com games when source is chesscom', async () => {
    render(<LibraryTab />);
    const select = screen.getByLabelText('Import source');
    Object.getOwnPropertyDescriptor(
      HTMLSelectElement.prototype,
      'value'
    )!.set!.call(select, 'chesscom');
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const input = screen.getByPlaceholderText('Username');
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )!.set!.call(input, 'bob');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await act(async () => {
      await screen.getByText('Fetch games').click();
    });
    expect(mockFetchChessCom).toHaveBeenCalledWith('bob');
  });

  it('shows error when fetch returns empty games', async () => {
    mockImportGames.mockReturnValueOnce({ games: [], skipped: 0 });
    render(<LibraryTab />);
    const input = screen.getByPlaceholderText('Username');
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )!.set!.call(input, 'nobody');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await act(async () => {
      await screen.getByText('Fetch games').click();
    });
    expect(screen.getByText('No importable games returned.')).toBeTruthy();
  });

  it('shows error when fetch throws', async () => {
    mockFetchLichess.mockRejectedValueOnce(new Error('Network fail'));
    render(<LibraryTab />);
    const input = screen.getByPlaceholderText('Username');
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )!.set!.call(input, 'failuser');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await act(async () => {
      await screen.getByText('Fetch games').click();
    });
    expect(screen.getByText('Network fail')).toBeTruthy();
  });

  it('shows error for non-Error throw', async () => {
    mockFetchLichess.mockRejectedValueOnce('string error');
    render(<LibraryTab />);
    const input = screen.getByPlaceholderText('Username');
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )!.set!.call(input, 'failuser2');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await act(async () => {
      await screen.getByText('Fetch games').click();
    });
    expect(screen.getByText('Import failed')).toBeTruthy();
  });

  it('renders game list from loadGames', () => {
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'Test Game',
        white: 'White',
        black: 'Black',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    expect(screen.getByText('Test Game')).toBeTruthy();
    expect(screen.getByText(/White vs Black/)).toBeTruthy();
  });

  it('opens game in StudyView', () => {
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'Test Game',
        white: 'White',
        black: 'Black',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    click(/Open/);
    expect(screen.getByText('Back')).toBeTruthy();
  });

  it('deletes game from list', () => {
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'Test Game',
        white: 'White',
        black: 'Black',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    click(/Delete/);
    expect(mockDeleteGame).toHaveBeenCalled();
  });

  it('shares game via clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'Test Game',
        white: 'White',
        black: 'Black',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    await act(async () => {
      await screen.getByRole('button', { name: /Share Test Game/ }).click();
    });
    expect(writeText).toHaveBeenCalled();
  });

  it('handles clipboard error', async () => {
    const writeText = jest.fn().mockRejectedValue(new Error('no clipboard'));
    Object.assign(navigator, { clipboard: { writeText } });
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'Test Game',
        white: 'White',
        black: 'Black',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    await act(async () => {
      await screen.getByRole('button', { name: /Share Test Game/ }).click();
    });
    expect(writeText).toHaveBeenCalled();
  });

  it('disables fetch button when username is empty', () => {
    render(<LibraryTab />);
    expect(screen.getByText('Fetch games')).toBeDisabled();
  });

  it('shows import count header', () => {
    mockLoadGames.mockReturnValue([
      {
        id: 'g1',
        name: 'G1',
        white: 'W',
        black: 'B',
        result: '1-0',
        savedAt: Date.now(),
        pgn: '1.e4',
      },
    ]);
    render(<LibraryTab />);
    expect(screen.getByText('Library (1)')).toBeTruthy();
  });
});
