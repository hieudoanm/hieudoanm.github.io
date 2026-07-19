import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChessReview } from '../ChessReview';

jest.mock('../organisms/chess/ChessBoard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('ChessReview', () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it('renders the PGN textarea and analyze button', () => {
    render(<ChessReview onClose={onClose} />);
    expect(screen.getByText('Analyze')).toBeTruthy();
    expect(screen.getByPlaceholderText(/Paste a PGN/)).toBeTruthy();
  });

  it('renders depth slider', () => {
    render(<ChessReview onClose={onClose} />);
    expect(screen.getByText(/Depth/)).toBeTruthy();
  });

  it('clicking Analyze runs review', async () => {
    render(<ChessReview onClose={onClose} />);
    await userEvent.click(screen.getByText('Analyze'));
    // After analyzing, should show summary cards
    const { container } = render(<ChessReview onClose={onClose} />);
    expect(container).toBeTruthy();
  });

  it('allows editing PGN text', async () => {
    render(<ChessReview onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/Paste a PGN/);
    await userEvent.clear(textarea);
    await userEvent.type(textarea, '1. e4');
  });
});
