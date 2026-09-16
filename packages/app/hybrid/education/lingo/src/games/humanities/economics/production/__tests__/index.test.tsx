import { fireEvent, render, screen } from '@testing-library/react';
import { ProductionGame } from '../index';

describe('ProductionGame', () => {
  it('renders the lab controls and metrics', () => {
    render(<ProductionGame />);
    expect(screen.getByTestId('labor')).toBeInTheDocument();
    expect(screen.getByTestId('wage')).toBeInTheDocument();
    expect(screen.getByTestId('fixed-cost')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('output')).toBeInTheDocument();
    expect(screen.getByTestId('marginal-product')).toBeInTheDocument();
    expect(screen.getByTestId('average-product')).toBeInTheDocument();
    expect(screen.getByTestId('marginal-cost')).toBeInTheDocument();
    expect(screen.getByTestId('average-total-cost')).toBeInTheDocument();
    expect(screen.getByTestId('average-variable-cost')).toBeInTheDocument();
    expect(screen.getByTestId('profit-max-q')).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('updates output when the labor slider changes', () => {
    render(<ProductionGame />);
    const output = screen.getByTestId('output');
    expect(output.textContent).toBe('35');
    fireEvent.change(screen.getByTestId('labor'), { target: { value: '20' } });
    expect(screen.getByTestId('output').textContent).toBe('60');
  });

  it('draws the cost curves', () => {
    render(<ProductionGame />);
    expect(screen.getByTestId('cost-curves')).toBeInTheDocument();
  });

  it('gives feedback on the profit-max check', () => {
    render(<ProductionGame />);
    fireEvent.change(screen.getByTestId('price'), { target: { value: '4' } });
    fireEvent.change(screen.getByTestId('check-input'), {
      target: { value: '37' },
    });
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByText(/Correct!/)).toBeInTheDocument();
  });

  it('completes the quiz with a perfect score', () => {
    render(<ProductionGame />);
    fireEvent.click(screen.getByTestId('start-quiz'));
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('quiz-option-1'));
      fireEvent.click(screen.getByTestId('quiz-next'));
    }
    expect(screen.getByText(/Quiz complete/)).toBeInTheDocument();
    expect(screen.getByText(/You scored/)).toBeInTheDocument();
  });

  it('restarts from the results screen', () => {
    render(<ProductionGame />);
    fireEvent.click(screen.getByTestId('start-quiz'));
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('quiz-option-1'));
      fireEvent.click(screen.getByTestId('quiz-next'));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('labor')).toBeInTheDocument();
  });
});
