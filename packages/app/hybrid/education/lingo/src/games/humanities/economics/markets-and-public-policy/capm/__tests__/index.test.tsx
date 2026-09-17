import { fireEvent, render, screen } from '@testing-library/react';
import { CapmGame } from '../index';

const submitWeight = (w: string) => {
  fireEvent.change(screen.getByTestId('weight-input'), {
    target: { value: w },
  });
  fireEvent.click(screen.getByTestId('submit-weight'));
};

const playPortfolioRounds = () => {
  for (let round = 0; round < 5; round++) {
    submitWeight('0.40');
    fireEvent.click(screen.getByTestId('next-round'));
  }
};

const roundHeader = (round: number) =>
  screen.getByText(
    (_, element) =>
      element?.tagName === 'SPAN' &&
      element.textContent === `Round ${round} / 7`
  );

describe('CapmGame', () => {
  it('shows live portfolio stats while choosing', () => {
    render(<CapmGame />);
    expect(roundHeader(1)).toBeInTheDocument();
    expect(screen.getByTestId('live-er')).toBeInTheDocument();
    expect(screen.getByTestId('live-sigma')).toBeInTheDocument();
    expect(screen.getByTestId('live-sharpe')).toBeInTheDocument();
  });

  it('reveals the portfolio result after submitting a weight', () => {
    render(<CapmGame />);
    submitWeight('0.40');
    expect(
      screen.getByText('On target — this mix sits on the efficient frontier.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('result-sigma')).toBeInTheDocument();
    expect(screen.getByTestId('result-score')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('rejects a weight outside the allowed range', () => {
    render(<CapmGame />);
    submitWeight('2.00');
    expect(screen.getByTestId('live-sigma')).toBeInTheDocument();
    expect(screen.queryByTestId('result-score')).toBeNull();
  });

  it('moves to a CAPM beta round after five portfolio rounds', () => {
    render(<CapmGame />);
    playPortfolioRounds();
    expect(roundHeader(6)).toBeInTheDocument();
    expect(screen.getByText(/This stock has beta/)).toBeInTheDocument();
    expect(screen.getByTestId('beta-input')).toBeInTheDocument();
  });

  it('reveals the model return after submitting a beta', () => {
    render(<CapmGame />);
    playPortfolioRounds();
    fireEvent.change(screen.getByTestId('beta-input'), {
      target: { value: '0.065' },
    });
    fireEvent.click(screen.getByTestId('submit-beta'));
    expect(screen.getByTestId('result-model')).toBeInTheDocument();
    expect(screen.getByTestId('result-score')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('reaches the summary after all seven rounds', () => {
    render(<CapmGame />);
    playPortfolioRounds();
    fireEvent.change(screen.getByTestId('beta-input'), {
      target: { value: '0.065' },
    });
    fireEvent.click(screen.getByTestId('submit-beta'));
    fireEvent.click(screen.getByTestId('next-round'));
    fireEvent.change(screen.getByTestId('beta-input'), {
      target: { value: '0.135' },
    });
    fireEvent.click(screen.getByTestId('submit-beta'));
    fireEvent.click(screen.getByTestId('next-round'));
    expect(screen.getByText(/Final score:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the summary screen', () => {
    render(<CapmGame />);
    playPortfolioRounds();
    fireEvent.change(screen.getByTestId('beta-input'), {
      target: { value: '0.065' },
    });
    fireEvent.click(screen.getByTestId('submit-beta'));
    fireEvent.click(screen.getByTestId('next-round'));
    fireEvent.change(screen.getByTestId('beta-input'), {
      target: { value: '0.135' },
    });
    fireEvent.click(screen.getByTestId('submit-beta'));
    fireEvent.click(screen.getByTestId('next-round'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(roundHeader(1)).toBeInTheDocument();
    expect(screen.getByTestId('live-sigma')).toBeInTheDocument();
  });
});
