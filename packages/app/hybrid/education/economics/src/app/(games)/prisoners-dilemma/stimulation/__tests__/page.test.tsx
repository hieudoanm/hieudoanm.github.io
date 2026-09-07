import { fireEvent, render, screen } from '@testing-library/react';
import SimulationPage from '@/app/(games)/prisoners-dilemma/stimulation/page';
import { STRATEGIES } from '@/games/prisoners-dilemma/constants';

describe('SimulationPage', () => {
  it('runs a default tournament and shows rankings on mount', () => {
    render(<SimulationPage />);
    expect(
      screen.getByRole('heading', { name: 'Tournament Simulation' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('rounds-input')).toHaveValue(50);
    expect(screen.getAllByTestId(/^standing-(?!bot)/)).toHaveLength(
      STRATEGIES.length
    );
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/prisoners-dilemma');
  });

  it('re-runs the tournament with the configured round count', () => {
    render(<SimulationPage />);
    fireEvent.change(screen.getByTestId('rounds-input'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByTestId('run-tournament'));
    expect(screen.getByTestId('rounds-input')).toHaveValue(3);
    expect(screen.getAllByTestId(/^standing-(?!bot)/)).toHaveLength(
      STRATEGIES.length
    );
  });

  it('shows each bot description as a tooltip on its row', () => {
    render(<SimulationPage />);
    expect(screen.getByTestId('standing-bot-pavlov')).toHaveAttribute(
      'title',
      expect.stringContaining('Win-stay')
    );
    expect(screen.getByTestId('standing-bot-always-defect')).toHaveAttribute(
      'title',
      expect.stringContaining('Defects on every single round')
    );
  });
});
