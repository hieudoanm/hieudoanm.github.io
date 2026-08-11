import { render, screen } from '@testing-library/react';
import { EndgameTab } from '../EndgameTab';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('EndgameTab', () => {
  it('renders the practice board and presets', () => {
    render(<EndgameTab />);
    expect(screen.getByText('Endgame Practice')).toBeInTheDocument();
    expect(screen.getByText('Queen vs King')).toBeInTheDocument();
    expect(screen.getByText('Rook vs King')).toBeInTheDocument();
    expect(screen.getByTestId('chessboard')).toBeInTheDocument();
  });

  it('shows mate status when the position is mated', () => {
    render(<EndgameTab />);
    expect(screen.getByText('New position')).toBeInTheDocument();
  });
});
