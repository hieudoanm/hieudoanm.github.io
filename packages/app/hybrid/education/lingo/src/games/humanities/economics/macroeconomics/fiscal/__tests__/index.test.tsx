import { fireEvent, render, screen } from '@testing-library/react';
import { ROUNDS } from '../constants';
import { FiscalGame } from '../index';

const CLOSING_G = [20, 32, 60, 18, 38, 32];

const enactRound = (g: number) => {
  fireEvent.change(screen.getByTestId('spending-input'), {
    target: { value: String(g) },
  });
  fireEvent.click(screen.getByTestId('submit-fiscal'));
  fireEvent.click(
    screen.getByRole('button', { name: /Next Round|See Final Summary/ })
  );
};

describe('FiscalGame', () => {
  it('renders the first round profile and stimulus form', () => {
    render(<FiscalGame />);
    expect(screen.getByTestId('gap-amount')).toHaveTextContent('100');
    expect(screen.getByTestId('mpc-value')).toHaveTextContent('0.8');
    expect(screen.getByTestId('submit-fiscal')).toBeInTheDocument();
  });

  it('previews projected ΔY as the levers move', () => {
    render(<FiscalGame />);
    fireEvent.change(screen.getByTestId('spending-input'), {
      target: { value: '20' },
    });
    expect(screen.getByTestId('preview-y')).toHaveTextContent(/ΔY = 100/);
  });

  it('reveals the round result after enacting stimulus', () => {
    render(<FiscalGame />);
    fireEvent.change(screen.getByTestId('spending-input'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByTestId('submit-fiscal'));
    expect(screen.getByTestId('reveal-dy')).toHaveTextContent('100');
    expect(screen.getByTestId('reveal-residual')).toHaveTextContent('0');
    expect(screen.getByTestId('reveal-score')).toHaveTextContent('5');
    expect(screen.getByTestId('reveal-cost')).toHaveTextContent('20');
  });

  it('reaches the fiscal summary after all rounds', () => {
    render(<FiscalGame />);
    for (const g of CLOSING_G) enactRound(g);
    expect(screen.getByText('Fiscal summary')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1 + ROUNDS.length);
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the simulation from the summary', () => {
    render(<FiscalGame />);
    for (const g of CLOSING_G) enactRound(g);
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('gap-amount')).toHaveTextContent('100');
    expect(screen.getByTestId('submit-fiscal')).toBeInTheDocument();
  });
});
