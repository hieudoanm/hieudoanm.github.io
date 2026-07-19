import { fireEvent, render, screen } from '@testing-library/react';
import { TriangularArbitrageGame } from '../index';

const enterBudget = (value: string) =>
  fireEvent.change(screen.getByTestId('budget'), {
    target: { value },
  });

const playTriangle = (pathId: string, budget: string = '1000') => {
  fireEvent.click(screen.getByTestId(`path-${pathId}`));
  enterBudget(budget);
  fireEvent.click(screen.getByTestId('execute'));
};

const finishLab = () => {
  for (let round = 0; round < 5; round++) {
    playTriangle('usd_eur_jpy_usd');
    fireEvent.click(
      screen.getByRole('button', { name: /Next Triangle|See Results/ })
    );
  }
};

describe('TriangularArbitrageGame', () => {
  it('shows the FX quotes for the first triangle', () => {
    render(<TriangularArbitrageGame />);
    expect(screen.getByText('USD/EUR')).toBeInTheDocument();
    expect(screen.getByText('JPY/USD')).toBeInTheDocument();
    expect(screen.getByText('EUR/JPY quoted')).toBeInTheDocument();
    expect(screen.getByText('EUR/JPY implied')).toBeInTheDocument();
    expect(screen.getByTestId('arb-spread')).toHaveTextContent(
      /beyond tolerance/
    );
  });

  it('executes a profitable triangle and shows the profit', () => {
    render(<TriangularArbitrageGame />);
    playTriangle('usd_eur_jpy_usd');
    expect(screen.getByText('Captured the spread')).toBeInTheDocument();
    expect(screen.getByTestId('profit')).toHaveTextContent('+$9.00');
  });

  it('loses a small amount on the reversed triangle', () => {
    render(<TriangularArbitrageGame />);
    playTriangle('usd_jpy_eur_usd');
    expect(screen.getByText('Traded the wrong direction')).toBeInTheDocument();
    expect(screen.getByTestId('profit')).toHaveTextContent('-');
  });

  it('rejects an invalid budget', () => {
    render(<TriangularArbitrageGame />);
    playTriangle('usd_eur_jpy_usd', '0');
    expect(screen.queryByTestId('profit')).toBeNull();
    expect(screen.getByTestId('execute')).toBeInTheDocument();
  });

  it('finishes the lab with a history log and total profit', () => {
    render(<TriangularArbitrageGame />);
    finishLab();
    expect(screen.getByText('Lab results')).toBeInTheDocument();
    expect(screen.getByTestId('log')).toBeInTheDocument();
    expect(screen.getByTestId('log').children).toHaveLength(5);
    expect(screen.getByTestId('profit')).toHaveTextContent('+$22.00');
  });

  it('restarts the game from the results screen', () => {
    render(<TriangularArbitrageGame />);
    finishLab();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/Pick a triangle/)).toBeInTheDocument();
  });
});
