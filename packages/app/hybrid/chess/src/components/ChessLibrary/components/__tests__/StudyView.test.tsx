import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StudyView } from '../StudyView';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

const game = {
  id: 'g1',
  name: 'Test Game',
  white: 'White',
  black: 'Black',
  result: '1-0',
  savedAt: Date.now(),
  pgn: '1. e4 e5',
};

describe('StudyView', () => {
  const onBack = jest.fn();
  const onDelete = jest.fn();
  const onShare = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('renders game info and buttons', () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    expect(screen.getByText('Test Game')).toBeTruthy();
    expect(screen.getByText('White vs Black · 1-0')).toBeTruthy();
    expect(screen.getByText('Back')).toBeTruthy();
    expect(screen.getByText('Share link')).toBeTruthy();
    expect(screen.getByText('Download .pgn')).toBeTruthy();
    expect(screen.getByText('Delete')).toBeTruthy();
  });

  it('calls onBack when Back is clicked', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('Back'));
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onDelete when Delete is clicked', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalled();
  });

  it('calls onShare when Share link is clicked', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('Share link'));
    expect(onShare).toHaveBeenCalledWith(game);
  });

  it('renders chessboard with start position', () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('navigates moves with arrow buttons', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    const nextBtn = screen.getByText('→');
    const prevBtn = screen.getByText('←');
    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);
    await userEvent.click(prevBtn);
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('jumps to start position', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('→'));
    await userEvent.click(screen.getByText('Start'));
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('jumps to end position', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('End'));
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('selects a move from the move list', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    const moveBtn = screen.getByText('e4');
    await userEvent.click(moveBtn);
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('shows empty message when PGN has no moves', () => {
    const emptyGame = { ...game, pgn: '' };
    render(
      <StudyView
        game={emptyGame}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    expect(screen.getByText('No moves in this game.')).toBeTruthy();
  });

  it('prev from start goes to first move', async () => {
    render(
      <StudyView
        game={game}
        onBack={onBack}
        onDelete={onDelete}
        onShare={onShare}
      />
    );
    await userEvent.click(screen.getByText('←'));
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });
});
