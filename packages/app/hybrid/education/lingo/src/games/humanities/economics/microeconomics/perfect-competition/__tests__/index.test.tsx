import { fireEvent, render, screen } from '@testing-library/react';
import { CompetitiveFirmGame } from '../index';

describe('CompetitiveFirmGame', () => {
  it('renders the first round with a market price', () => {
    render(<CompetitiveFirmGame />);
    expect(screen.getByText(/Round/)).toBeInTheDocument();
    expect(screen.getByText(/Market price/)).toBeInTheDocument();
    expect(screen.getByTestId('q-input')).toBeInTheDocument();
  });

  it('reveals profit and P = MC guidance after choosing output', () => {
    render(<CompetitiveFirmGame />);
    fireEvent.click(screen.getByTestId('quick-q-6'));
    fireEvent.click(screen.getByTestId('submit-q'));
    expect(screen.getByTestId('profit-value')).toHaveTextContent('$-14');
    expect(screen.getByText(/Optimal \(P = MC\)/)).toBeInTheDocument();
  });

  it('shows P = MC miss guidance when output is not optimal', () => {
    render(<CompetitiveFirmGame />);
    fireEvent.click(screen.getByTestId('quick-q-30'));
    fireEvent.click(screen.getByTestId('submit-q'));
    expect(screen.getByText(/P = MC not met/)).toBeInTheDocument();
  });

  it('reaches the results screen after all six rounds', () => {
    render(<CompetitiveFirmGame />);
    for (let round = 0; round < 6; round++) {
      fireEvent.click(screen.getByTestId('submit-q'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<CompetitiveFirmGame />);
    for (let round = 0; round < 6; round++) {
      fireEvent.click(screen.getByTestId('submit-q'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('q-input')).toBeInTheDocument();
  });
});
