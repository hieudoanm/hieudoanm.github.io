import { fireEvent, render, screen } from '@testing-library/react';
import { MonopolyGame } from '../index';

const submitOutput = (q: string) => {
  fireEvent.change(screen.getByTestId('q-input'), {
    target: { value: q },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Set Output' }));
};

const playAllRounds = () => {
  for (let round = 0; round < 6; round++) {
    submitOutput('40');
    fireEvent.click(
      screen.getByRole('button', { name: /Next Round|See Results/ })
    );
  }
};

describe('MonopolyGame', () => {
  it('renders the output controls for the first round', () => {
    render(<MonopolyGame />);
    expect(screen.getByText(/Pick your output quantity/)).toBeInTheDocument();
    expect(screen.getByTestId('q-input')).toBeInTheDocument();
  });

  it('reveals profit and deadweight loss for the chosen output', () => {
    render(<MonopolyGame />);
    submitOutput('40');
    expect(screen.getByTestId('profit-callout')).toHaveTextContent('$1,600');
    expect(screen.getByTestId('dwl-callout')).toHaveTextContent('$800');
    expect(screen.getByText('Optimal')).toBeInTheDocument();
  });

  it('rejects an out-of-range output', () => {
    render(<MonopolyGame />);
    submitOutput('200');
    expect(
      screen.getByText(/Please enter an integer between 1 and 90/)
    ).toBeInTheDocument();
    expect(screen.queryByTestId('profit-callout')).toBeNull();
  });

  it('reaches the final summary after six rounds', () => {
    render(<MonopolyGame />);
    playAllRounds();
    expect(screen.getByText('Final results')).toBeInTheDocument();
    expect(screen.getByText('You played 6 rounds.')).toBeInTheDocument();
  });

  it('shows the Set P = MC comparison on the summary screen', () => {
    render(<MonopolyGame />);
    playAllRounds();
    expect(screen.queryByTestId('comparison-panel')).toBeNull();
    fireEvent.click(screen.getByTestId('comparison-toggle'));
    expect(screen.getByTestId('comparison-panel')).toBeInTheDocument();
    expect(screen.getByText('Competitive (P = MC)')).toBeInTheDocument();
    expect(screen.getByText('Monopoly (MR = MC)')).toBeInTheDocument();
  });
});
