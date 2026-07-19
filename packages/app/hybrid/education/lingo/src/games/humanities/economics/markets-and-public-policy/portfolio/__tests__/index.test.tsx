import { fireEvent, render, screen } from '@testing-library/react';
import { PortfolioGame } from '../index';

const playRound = () => {
  fireEvent.click(screen.getByTestId('check'));
  fireEvent.click(screen.getByTestId('next-round'));
};

describe('PortfolioGame', () => {
  it('renders the lab controls and live readouts', () => {
    render(<PortfolioGame />);
    expect(screen.getByTestId('weight-tech')).toBeInTheDocument();
    expect(screen.getByTestId('weight-property')).toBeInTheDocument();
    expect(screen.getByTestId('weight-bonds')).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-return')).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-risk')).toBeInTheDocument();
    expect(screen.getByTestId('diversification-benefit')).toBeInTheDocument();
    expect(screen.getByTestId('min-variance')).toBeInTheDocument();
  });

  it('updates the portfolio return from a preset', () => {
    render(<PortfolioGame />);
    fireEvent.click(screen.getAllByTestId('preset')[0]);
    const readout = screen.getByTestId('portfolio-return');
    expect(readout).toHaveTextContent('10.00%');
  });

  it('reflects slider changes in the readouts', () => {
    render(<PortfolioGame />);
    fireEvent.change(screen.getByTestId('weight-tech'), {
      target: { value: '100' },
    });
    const before = screen.getByTestId('portfolio-return').textContent;
    expect(before).not.toBe('6.00%');
  });

  it('shows the 1/√N risk splitting across assets', () => {
    render(<PortfolioGame />);
    fireEvent.change(screen.getByTestId('n-assets'), {
      target: { value: '4' },
    });
    expect(screen.getByTestId('sigma-n')).toHaveTextContent('10.00%');
  });

  it('reveals the challenge result after checking', () => {
    render(<PortfolioGame />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('result-score')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('shows the target return for a target-return round', () => {
    render(<PortfolioGame />);
    for (let round = 0; round < 2; round++) playRound();
    expect(screen.getByTestId('target-return')).toBeInTheDocument();
  });

  it('reaches the summary after all five rounds', () => {
    render(<PortfolioGame />);
    for (let round = 0; round < 5; round++) playRound();
    expect(screen.getByText(/Final score:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the summary screen', () => {
    render(<PortfolioGame />);
    for (let round = 0; round < 5; round++) playRound();
    fireEvent.click(screen.getByTestId('reset'));
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName === 'SPAN' && element?.textContent === 'Round 1 / 5'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('portfolio-risk')).toBeInTheDocument();
  });
});
