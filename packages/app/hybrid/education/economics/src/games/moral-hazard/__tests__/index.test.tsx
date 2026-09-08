import { fireEvent, render, screen } from '@testing-library/react';
import { MoralHazardGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    isLossDraw: () => true,
  };
});

const playRound = (contract: string, effort: string) => {
  fireEvent.click(screen.getByTestId(`contract-${contract}`));
  fireEvent.click(screen.getByTestId(`effort-${effort}`));
  fireEvent.click(screen.getByTestId('submit-round'));
};

const playAllRounds = (contract: string, effort: string) => {
  for (let i = 0; i < 6; i++) {
    playRound(contract, effort);
    fireEvent.click(screen.getByTestId('next-round'));
  }
};

describe('MoralHazardGame', () => {
  it('renders round counter and total wealth', () => {
    render(<MoralHazardGame />);
    expect(screen.getByText(/Round/)).toBeInTheDocument();
    expect(screen.getAllByText(/Total wealth/).length).toBeGreaterThan(0);
  });

  it('lets the player pick a contract then effort and submit', () => {
    render(<MoralHazardGame />);
    playRound('full', 'low');
    expect(screen.getByTestId('reveal')).toBeInTheDocument();
    expect(screen.getByText('Loss occurred!')).toBeInTheDocument();
    expect(screen.getByText(/Net wealth this round/)).toBeInTheDocument();
  });

  it('shows expected payoff table in reveal', () => {
    render(<MoralHazardGame />);
    playRound('full', 'low');
    expect(screen.getByText(/Expected payoff under/)).toBeInTheDocument();
    expect(screen.getByText(/Low/)).toBeInTheDocument();
    expect(screen.getByText(/High/)).toBeInTheDocument();
  });

  it('shows moral hazard hint for full coverage', () => {
    render(<MoralHazardGame />);
    playRound('full', 'low');
    expect(
      screen.getByText(/Full coverage made your care worthless/)
    ).toBeInTheDocument();
  });

  it('advances to next round', () => {
    render(<MoralHazardGame />);
    playRound('none', 'high');
    fireEvent.click(screen.getByTestId('next-round'));
    expect(screen.getByText(/Round/)).toBeInTheDocument();
    expect(screen.getByTestId('contract-none')).toBeInTheDocument();
  });

  it('shows summary after 6 rounds', () => {
    render(<MoralHazardGame />);
    playAllRounds('full', 'low');
    expect(screen.getByTestId('summary')).toBeInTheDocument();
    expect(screen.getByText('Game Over')).toBeInTheDocument();
    expect(screen.getByText(/Moral hazard events/)).toBeInTheDocument();
    expect(screen.getByText(/Play Again/)).toBeInTheDocument();
  });

  it('shows moral hazard events count in summary', () => {
    render(<MoralHazardGame />);
    playAllRounds('full', 'low');
    const summary = screen.getByTestId('summary');
    expect(summary.textContent).toMatch(/Moral hazard events/);
    expect(summary.textContent).toMatch(/6/);
  });

  it('resets the game', () => {
    render(<MoralHazardGame />);
    playAllRounds('full', 'low');
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByTestId('contract-none')).toBeInTheDocument();
  });

  it('disable submit when no effort selected', () => {
    render(<MoralHazardGame />);
    fireEvent.click(screen.getByTestId('contract-none'));
    const btn = screen.getByTestId('submit-round');
    expect(btn).toBeDisabled();
  });
});
