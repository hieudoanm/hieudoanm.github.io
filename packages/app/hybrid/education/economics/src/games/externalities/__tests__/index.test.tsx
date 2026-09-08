import { fireEvent, render, screen } from '@testing-library/react';
import { ExternalitiesGame } from '../index';

const pickQ = (q: number) => {
  fireEvent.change(screen.getByTestId('q-select'), {
    target: { value: String(q) },
  });
  fireEvent.click(screen.getByTestId('submit-q'));
};

describe('ExternalitiesGame', () => {
  it('renders the pick phase for round 1', () => {
    render(<ExternalitiesGame />);
    expect(screen.getByTestId('q-select')).toBeInTheDocument();
    expect(screen.getByTestId('round-label')).toHaveTextContent('Round 1 / 6');
    expect(screen.getByTestId('submit-q')).toBeInTheDocument();
  });

  it('shows profit, social welfare and the phase 1 callout after a pick', () => {
    render(<ExternalitiesGame />);
    pickQ(7);
    expect(screen.getByTestId('callout')).toHaveTextContent(
      "Your private optimum overshoots the social optimum — pollution isn't priced."
    );
    expect(screen.getByTestId('result-profit')).toHaveTextContent('$66.50');
    expect(screen.getByTestId('result-welfare')).toHaveTextContent('$38.50');
  });

  it('shows the phase 2 callout once the tax is active', () => {
    render(<ExternalitiesGame />);
    for (let round = 1; round <= 3; round++) {
      pickQ(7);
      fireEvent.click(screen.getByRole('button', { name: /Next Round/ }));
    }
    pickQ(5);
    expect(screen.getByTestId('callout')).toHaveTextContent(
      'With the tax your private optimum equals the social optimum (Q=5).'
    );
    expect(screen.getByTestId('result-profit')).toHaveTextContent('$42.50');
  });

  it('reaches the summary after six rounds and restarts', () => {
    render(<ExternalitiesGame />);
    for (let round = 1; round <= 6; round++) {
      pickQ(5);
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Summary/ })
      );
    }
    expect(screen.getByTestId('summary-title')).toBeInTheDocument();
    expect(screen.getByTestId('summary-phase1')).toBeInTheDocument();
    expect(screen.getByTestId('summary-phase2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('q-select')).toBeInTheDocument();
  });
});
