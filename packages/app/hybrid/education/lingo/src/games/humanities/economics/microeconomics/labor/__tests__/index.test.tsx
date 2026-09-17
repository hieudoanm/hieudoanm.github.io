import { fireEvent, render, screen } from '@testing-library/react';
import { LaborMarketLab } from '../index';
import { TOTAL_QUIZ_ROUNDS } from '../constants';

describe('LaborMarketLab explore mode', () => {
  it('renders the curve sliders and baseline market readouts', () => {
    render(<LaborMarketLab />);
    expect(screen.getByTestId('min-wage')).toBeInTheDocument();
    expect(screen.getByTestId('a-slider')).toBeInTheDocument();
    expect(screen.getByTestId('b-slider')).toBeInTheDocument();
    expect(screen.getByTestId('c-slider')).toBeInTheDocument();
    expect(screen.getByTestId('d-slider')).toBeInTheDocument();
    expect(screen.getByTestId('equilibrium-wage')).toHaveTextContent('$30');
    expect(screen.getByTestId('employment')).toHaveTextContent('40');
    expect(screen.getByTestId('labor-demand')).toHaveTextContent('40');
    expect(screen.getByTestId('labor-supply')).toHaveTextContent('40');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('0');
    expect(screen.getByTestId('surplus')).toHaveTextContent('$1,200');
    expect(screen.getByTestId('deficit')).toHaveTextContent('$0');
    expect(screen.getByTestId('reset')).toBeInTheDocument();
    expect(screen.getByTestId('start-quiz')).toBeInTheDocument();
  });

  it('creates unemployment when the floor rises above the equilibrium wage', () => {
    render(<LaborMarketLab />);
    fireEvent.change(screen.getByTestId('min-wage'), {
      target: { value: '35' },
    });
    expect(screen.getByTestId('employment')).toHaveTextContent('30');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('15');
    expect(screen.getByTestId('labor-demand')).toHaveTextContent('30');
    expect(screen.getByTestId('labor-supply')).toHaveTextContent('45');
    expect(screen.getByTestId('surplus')).toHaveTextContent('$1,125');
    expect(screen.getByTestId('deficit')).toHaveTextContent('$75');
  });

  it('has no effect when the floor sits below the equilibrium wage', () => {
    render(<LaborMarketLab />);
    fireEvent.change(screen.getByTestId('min-wage'), {
      target: { value: '20' },
    });
    expect(screen.getByTestId('employment')).toHaveTextContent('40');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('0');
    expect(screen.getByTestId('deficit')).toHaveTextContent('$0');
  });

  it('resets sliders back to the baseline', () => {
    render(<LaborMarketLab />);
    fireEvent.change(screen.getByTestId('min-wage'), {
      target: { value: '35' },
    });
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('employment')).toHaveTextContent('40');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('0');
  });
});

describe('LaborMarketLab quiz mode', () => {
  const playRound = (): void => {
    fireEvent.click(screen.getByTestId('quiz-option-0'));
    fireEvent.click(screen.getByTestId('check'));
  };

  it('answers one round and reveals the outcome', () => {
    render(<LaborMarketLab />);
    fireEvent.click(screen.getByTestId('start-quiz'));
    expect(screen.getByText(/Quiz round/)).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeDisabled();
    fireEvent.click(screen.getByTestId('quiz-option-0'));
    expect(screen.getByTestId('check')).toBeEnabled();
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('employment')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('completes all rounds and shows the final score', () => {
    render(<LaborMarketLab />);
    fireEvent.click(screen.getByTestId('start-quiz'));
    for (let round = 0; round < TOTAL_QUIZ_ROUNDS; round++) {
      playRound();
      fireEvent.click(screen.getByTestId('next'));
    }
    expect(screen.getByText('Quiz complete')).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });
});
