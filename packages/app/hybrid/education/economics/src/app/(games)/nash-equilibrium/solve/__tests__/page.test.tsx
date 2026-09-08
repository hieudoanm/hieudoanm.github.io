import NashSolvePage from '@/app/(games)/nash-equilibrium/solve/page';
import { render, screen } from '@testing-library/react';

describe('NashSolvePage', () => {
  it('renders the Nash Solver heading and game selection', () => {
    render(<NashSolvePage />);
    expect(
      screen.getByRole('heading', { name: /Nash Solver/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('game-stag-hunt')).toBeInTheDocument();
  });
});
