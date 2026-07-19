import { fireEvent, render, screen } from '@testing-library/react';
import { VariantsTab } from '../VariantsTab';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

describe('VariantsTab', () => {
  it('renders three-check by default', () => {
    render(<VariantsTab />);
    expect(
      screen.getByRole('heading', { name: 'Three-check' })
    ).toBeInTheDocument();
  });

  it('switches between variants', () => {
    render(<VariantsTab />);
    fireEvent.click(screen.getAllByText('Pawn Horde')[0]!);
    expect(
      screen.getByRole('heading', { name: 'Pawn Horde' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Crazyhouse')[0]!);
    expect(
      screen.getByRole('heading', { name: 'Crazyhouse (local)' })
    ).toBeInTheDocument();
  });
});
