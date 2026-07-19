import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChessLibrary } from '../index';
import { importGames } from '../utils/library';
import { StudyView } from '../components/StudyView';
import { LibraryTab } from '../components/LibraryTab';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

const SAMPLE = `[Event "Test Match"]
[White "Alice"]
[Black "Bob"]
[Result "1-0"]

1. e4 e5 2. Nf3 1-0`;

describe('ChessLibrary', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders both tabs and switches to the explorer', () => {
    render(<ChessLibrary onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Library' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Explorer' }));
    fireEvent.click(screen.getByText('Alekhine Defense: Balogh Variation'));
    expect(
      screen.getByRole('button', { name: /master stats/i })
    ).toBeInTheDocument();
  });

  it('hydrates a shared game from the URL', () => {
    const encoded = btoa(SAMPLE);
    window.history.replaceState(null, '', `?g=${encoded}`);
    render(<ChessLibrary onClose={jest.fn()} />);
    expect(screen.getByText(/shared game is open/i)).toBeInTheDocument();
    window.history.replaceState(null, '', '/');
  });
});

describe('LibraryTab', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('imports a pasted PGN into the library', () => {
    render(<LibraryTab />);
    fireEvent.change(screen.getByPlaceholderText(/Paste a PGN/), {
      target: { value: SAMPLE },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));
    expect(screen.getByText('Test Match')).toBeInTheDocument();
    expect(screen.getByText(/Alice vs Bob · 1-0/)).toBeInTheDocument();
  });

  it('shows an error for invalid PGNs', () => {
    render(<LibraryTab />);
    fireEvent.change(screen.getByPlaceholderText(/Paste a PGN/), {
      target: { value: 'not a game' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));
    expect(screen.getByText(/No games found/)).toBeInTheDocument();
  });

  it('opens a game in the study view', () => {
    const { games } = importGames(SAMPLE);
    const saved = [{ ...games[0], pgn: SAMPLE }];
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(saved));
    render(<LibraryTab />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Share link')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('deletes a saved game', () => {
    const { games } = importGames(SAMPLE);
    const saved = [{ ...games[0], pgn: SAMPLE }];
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(saved));
    render(<LibraryTab />);
    fireEvent.click(screen.getByRole('button', { name: /Delete/ }));
    expect(screen.getByText(/No games yet/)).toBeInTheDocument();
    spy.mockRestore();
  });

  it('filters the library by player name', () => {
    const { games } = importGames(SAMPLE);
    const saved = [{ ...games[0], pgn: SAMPLE }];
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(saved));
    render(<LibraryTab />);
    fireEvent.change(screen.getByPlaceholderText(/Search player/), {
      target: { value: 'zoe' },
    });
    expect(screen.getByText(/No games yet/)).toBeInTheDocument();
    spy.mockRestore();
  });
});

describe('StudyView', () => {
  const { games } = importGames(SAMPLE);
  const game = { ...games[0], pgn: SAMPLE };

  it('shows a back button and renders the board', () => {
    render(
      <StudyView
        game={game}
        onBack={jest.fn()}
        onDelete={jest.fn()}
        onShare={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByTestId('chessboard')).toBeInTheDocument();
  });

  it('navigates through moves and reports positions', () => {
    render(
      <StudyView
        game={game}
        onBack={jest.fn()}
        onDelete={jest.fn()}
        onShare={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Nf3'));
    expect(screen.getByText('End')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
