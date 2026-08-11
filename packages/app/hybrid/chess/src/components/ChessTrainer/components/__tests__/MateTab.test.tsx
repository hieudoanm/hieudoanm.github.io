import { render, screen } from '@testing-library/react';
import { MateTab } from '../MateTab';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('MateTab', () => {
  it('falls back when no puzzles verify', () => {
    render(<MateTab />);
    expect(screen.getByText(/No verified mate puzzles/)).toBeInTheDocument();
  });
});
